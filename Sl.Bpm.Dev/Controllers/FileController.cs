using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net;
using System.Security.AccessControl;
using System.Web;
using System.Web.Mvc;
using MiniAbp.Domain.Entities;
using Newtonsoft.Json;
using Sl.Bpm.Application.Base;
using Sl.Bpm.Application.Base.Excel;
using Sl.Bpm.Application.Config;
using Sl.Bpm.Application.Service;
using Sl.Bpm.Model.Tables;
using Sl.Bpm.Repository;
using Sl.Bpm.Repository.Dto;
using FileInfo = MiniAbp.Domain.Entities.FileInfo;

namespace Sl.Bpm.Client.Controllers
{
    [Authorize]
    public class FileController : BaseController
    {
        public InstFileRp InstFileRp { get; set; }
        public ModuleSv ModuleSv { get; set; }
        public TaskSv TaskSv { get; set; }
        public ColumnConfigRp ColumnConfigRp { get; set; }
        public ConfigCache CacheManager { get; set; }
        public FileSv FileSv { get; set; }

        protected string FileAddress => CacheManager.Ftp.Host;

        protected string FileAccount => CacheManager.Ftp.Account;

        protected string FilePassword => CacheManager.Ftp.Password;

        public ActionResult UploadDataNew()
        {
            if (Request.Files == null || Request.Files.Count == 0)
                return Json(new { type = false, message = "请选择文件" }, JsonRequestBehavior.AllowGet);

            HttpPostedFileBase fileSave = Request.Files[0];
            if (fileSave == null) return Json(new { success = false, message = "请选择文件" }, JsonRequestBehavior.AllowGet);

            var instFile = new InstFile();
            instFile.RefreshId();
            instFile.ContentType = fileSave.ContentType;

            var newName = instFile.Id + '.' +
                          fileSave.FileName.Substring(fileSave.FileName.LastIndexOf('.') + 1).ToLower();

            var fileAddress = FileAddress.EndsWith("/") ? FileAddress : FileAddress.Substring(0, FileAddress.Length - 1);
            string uri = $"{fileAddress}/{newName}";


            instFile.Name = fileSave.FileName;
            instFile.Path = uri;
            // 根据uri创建FtpWebRequest对象
            var reqFtp = (FtpWebRequest)WebRequest.Create(new Uri(uri));
            // ftp用户名和密码
            reqFtp.Credentials = new NetworkCredential(FileAccount, FilePassword);
            // 默认为true，连接不会被关闭
            // 在一个命令之后被执行
            reqFtp.KeepAlive = false;
            // 指定执行什么命令
            reqFtp.Method = WebRequestMethods.Ftp.UploadFile;
            // 指定数据传输类型
            reqFtp.UseBinary = true;
            // 上传文件时通知服务器文件的大小
            reqFtp.ContentLength = fileSave.ContentLength;

            byte[] buff = new byte[fileSave.ContentLength];

            // 把上传的文件写入流
            Stream strm = reqFtp.GetRequestStream();
            strm.Write(buff, 0, buff.Length);

            strm.Close();

            InstFileRp.Insert(instFile);

            return Json(new { type = true, fileId = instFile.Id }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Download(string fileId)
        {
            var file = InstFileRp.Get(fileId);

            if (file == null)
                return null;
            var uri = (FileAddress.StartsWith("ftp://") ? FileAddress : "ftp://" + FileAddress) + "/" + file.Path;
            var reqFtp = (FtpWebRequest)WebRequest.Create(new Uri(uri));
            reqFtp.Method = WebRequestMethods.Ftp.DownloadFile;
            reqFtp.UseBinary = true;
            reqFtp.Credentials = new NetworkCredential(FileAccount, FilePassword);
            FtpWebResponse response = (FtpWebResponse)reqFtp.GetResponse();

            Stream ftpStream = response.GetResponseStream();

            return File(ftpStream, file.ContentType, file.Name);
        }

        public ActionResult DownloadViewData(string para)
        {
            QueryDto dto = JsonConvert.DeserializeObject<QueryDto>(HttpUtility.UrlDecode(para));
            var viewValue = ModuleSv.GetViewTable(dto);
            var dt = viewValue.ViewTable;
            var colNames = new List<string>();
            foreach (var columList in viewValue.DisplayColumList)
            {
                if (columList.IsDisplayEnable)
                {
                    dt.Columns[columList.DisplayColumn].ColumnName = columList.Name;
                    colNames.Add(columList.Name);
                }
            }
            var dt1 = dt.Clone();
            foreach (DataColumn dc in dt1.Columns)
            {
                if (!colNames.Contains(dc.ColumnName))
                {
                    dt.Columns.Remove(dc.ColumnName);
                }
            }
            MemoryStream stream = (new ExcelManager()).ExportToStream(dt, true);
            stream.Seek(0, SeekOrigin.Begin);
            return File(stream, "application/vnd.ms-excel", DateTime.Now.ToString("yyyyMMddhhmmss") + ".xls");
        }

        public ActionResult DownloadWorkflow(string para)
        {
            PageInput dto = JsonConvert.DeserializeObject<PageInput>(HttpUtility.UrlDecode(para));
            var moduleType = dto["moduleType"] ?? "";
            var moduleId = dto["moduleIds"] ?? "";

            var dt = TaskSv.GetPageDataTableTasks(dto, moduleType);
            if (dt.TotalCount == 0) return null;

            dt.Data.Columns.Add("Status");
            var colNames = new List<string>();
            foreach (DataRow dr in dt.Data.Rows)
            {
                if (dt.Data.Columns.Contains("TaskStatus"))
                {
                    if (dr["TaskStatus"].ToString() == "0")
                    {
                        dr["Status"] = dr["ProcUserName"].ToString();
                    }
                    if (dr["TaskStatus"].ToString() == "1")
                    {
                        dr["Status"] = "审批完成";
                    }
                    if (dr["TaskStatus"].ToString() == "7")
                    {
                        dr["Status"] = "拒绝";
                    }
                    if (dr["TaskStatus"].ToString() == "9")
                    {
                        dr["Status"] = "申请已取消";
                    }
                }
            }

            var columns = TaskSv.SetColumn(moduleType);
            foreach (var column in columns)
            {
                dt.Data.Columns[column.Name].ColumnName = column.Value;
                colNames.Add(column.Value);
            }

            var columnConfigs = ColumnConfigRp.GetColumnConfigsByModuleId(moduleId);
            foreach (var config in columnConfigs)
            {
                dt.Data.Columns[config.ColumnKey].ColumnName = config.Name;
                colNames.Add(config.Name);
            }

            //移除不需要的列
            var dt1 = dt.Data.Clone();
            foreach (DataColumn dc in dt1.Columns)
            {
                if (!colNames.Contains(dc.ColumnName))
                {
                    dt.Data.Columns.Remove(dc.ColumnName);
                }
            }

            MemoryStream stream = (new ExcelManager()).ExportToStream(dt.Data, true);
            stream.Seek(0, SeekOrigin.Begin);
            return File(stream, "application/vnd.ms-excel", DateTime.Now.ToString("yyyyMMddhhmmss") + ".xls");
        }


        public JsonResult AdvanceFileUpload()
        {
            if (Request.Files == null || Request.Files.Count == 0)
                return Json(new { isSuccess = false, message = "请选择上传文件" }, JsonRequestBehavior.AllowGet);


            HttpPostedFileBase fileSave = Request.Files[0];

            var directoryPath = Server.MapPath("~/AppPages/File/Temp/");
            string fileName = DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + fileSave.FileName;

            //文件夹权限 FullControl
            DirectorySecurity dirsecurity = new DirectorySecurity();
            //dirsecurity.AddAccessRule(new FileSystemAccessRule("ASPNET", FileSystemRights.FullControl, InheritanceFlags.ContainerInherit, PropagationFlags.InheritOnly, AccessControlType.Allow));

            if (!Directory.Exists(directoryPath))
                Directory.CreateDirectory(directoryPath, dirsecurity);
            fileSave.SaveAs(directoryPath + fileName);

            ////给Excel文件所在目录添加"Everyone,Users"用户组的完全控制权限  
            //DirectoryInfo di = new DirectoryInfo(directoryPath);
            //DirectorySecurity dirSecurity = di.GetAccessControl();
            //dirSecurity.AddAccessRule(new FileSystemAccessRule("Everyone", FileSystemRights.FullControl, AccessControlType.Allow));
            //dirSecurity.AddAccessRule(new FileSystemAccessRule("Users", FileSystemRights.FullControl, AccessControlType.Allow));
            //di.SetAccessControl(dirSecurity);

            //把文件保存到FTP
            var fileInfo =
                FileSv.UploadFiles(new FileInput()
                {
                    Files = new List<FileInfo> {
                        new FileInfo {
                            ContentType = fileSave.ContentType,
                            ContentLength = fileSave.ContentLength,
                            ExtensionName = fileSave.FileName.EndsWith(".xls")?".xls":"xlsx",
                            FileName = fileSave.FileName,
                            FileBytes = IOManager.StreamToBytes(fileSave.InputStream)
                        } }
                });

            return Json(new { IsSuccess = true, FilePath = directoryPath + fileName, FileModel = fileInfo[0] });
        }

    }
}