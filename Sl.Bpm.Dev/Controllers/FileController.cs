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
using Sl.Bpm.Application.Experts.FileService;
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
        public FileExpert fileExpert { get; set; }

        protected string FileAddress => CacheManager.Ftp.Host;

        protected string FileAccount => CacheManager.Ftp.Account;

        protected string FilePassword => CacheManager.Ftp.Password;

        public ActionResult UploadDataNew()
        {
            if (Request.Files == null || Request.Files.Count == 0)
                return Json(new { type = false, message = "请选择文件" }, JsonRequestBehavior.AllowGet);

            HttpPostedFileBase fileSave = Request.Files[0];
            if (fileSave == null) return Json(new { success = false, message = "请选择文件" }, JsonRequestBehavior.AllowGet);


            var savedFile = fileExpert.SaveFile(
                new FileInfo()
                {
                    FileName = fileSave.FileName,
                    ContentType = fileSave.ContentType,
                    ContentLength = fileSave.ContentLength,
                    ExtensionName = Path.GetExtension(fileSave.FileName),
                    FileBytes = FileExpert.StreamToBytes(fileSave.InputStream)
                });

            return Json(new { type = true, fileId = savedFile.Id }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 下载文件
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns></returns>
        public ActionResult Download(string fileId)
        {
            var fileInfo = fileExpert.GetFile(fileId);
            return File(fileInfo.FileBytes, fileInfo.ContentType, fileInfo.FileName);
        }

        /// <summary>
        /// 下载模版文件
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns></returns>
        public ActionResult Template(string filePath)
        {
            // 模版文件存储于 EnterpriseId / Template
            var path = Path.Combine(_globalCache.EnterpriseId, "Template", filePath);
            var fileName = Path.GetFileName(filePath);
            string contentType = MimeMapping.GetMimeMapping(fileName);
            var stream = fileExpert.GetFileStreamByPath(path);
            return File(stream, contentType, fileName);
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
            var workflowId = dto["workflowId"] ?? "";

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

            var columnConfigs = ColumnConfigRp.GetColumnConfigsByModuleId(workflowId);
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
            var savedFile = fileExpert.SaveFile(
                         new FileInfo()
                         {
                             FileName = fileSave.FileName,
                             ContentType = fileSave.ContentType,
                             ContentLength = fileSave.ContentLength,
                             ExtensionName = Path.GetExtension(fileSave.FileName),
                             FileBytes = FileExpert.StreamToBytes(fileSave.InputStream)
                         }, "Temp");

            return Json(new { IsSuccess = true, FilePath = savedFile.Path, FileModel = savedFile });
        }

        public ActionResult UeditorFileUpload()
        {
            if (Request.Files == null || Request.Files.Count == 0)
                return Json(new { isSuccess = false, message = "请选择上传文件" }, JsonRequestBehavior.AllowGet);

            HttpPostedFileBase fileSave = Request.Files[0];

            string path = "/Editor/" + DateTime.Now.ToString("yyyyMM");
            var savedFile = fileExpert.SaveFile(
                         new FileInfo()
                         {
                             FileName = fileSave.FileName,
                             ContentType = fileSave.ContentType,
                             ContentLength = fileSave.ContentLength,
                             ExtensionName = Path.GetExtension(fileSave.FileName),
                             FileBytes = FileExpert.StreamToBytes(fileSave.InputStream)
                         }, path);
            //{"originalName":"ad_01.jpg","name":"201901161757534544157.jpg","url":"upload/20190116/201901161757534544157.jpg","size":50939,"state":"SUCCESS","type":".jpg"}
            var img = new { originalName = fileSave.FileName, name = savedFile.FileName, url = "/File/GetImage?fileId=" + savedFile.Id, size = fileSave.ContentLength, state = "SUCCESS", type = savedFile.ExtensionName };
            return Content(JsonConvert.SerializeObject(img));
        }

    }
}