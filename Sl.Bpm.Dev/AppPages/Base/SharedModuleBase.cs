/*===================================================
 * 类名称: SharedModuleBase
 * 文件名: \Base\SharedModuleBase
 * 类描述: 组织结构基类
 * 创建人: MC
 * 创建时间: 2018-12-05 14:01:40
 * CodeItemId : 770747e1-a57b-405c-905c-aaf3fdf014e0
 * 版本： @version 1.0
 *===================================================*/
using Sl.Bpm.Application.Module;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Sl.Bpm.AppPages.Base
{
    public class SharedModuleBase : WorkflowModuleBase
    {


        /// <summary>
        /// 保存组织快照,成功返回对应的快照Id，其他返回null
        /// </summary>
        /// <returns></returns>
        public string SaveOrgPathSnapshoot(string pmId)
        {
            //如果获取到多个组织架构,直接抛出异常
            string sql = @"
select DISTINCT pj.ProjectNo,pj.id ProjectId,pj.ProjectCnName ProjectName,pj.ProjectEnName,pj.PmId PmUserId,pj.PmName PmUserName,
Gro.CcName,Gro.CcLangName,Gro.CcId,Gro.CcNo,Gro.CcUname,Gro.CcULangName,Gro.CcUid,
Gro.BuName,Gro.BuLangName,Gro.BuId,Gro.BuNo,Gro.BuUname,Gro.BuULangName,Gro.BuUid,
Gro.CoName,Gro.CoLangName,Gro.CoId,Gro.CoNo,Gro.CoUname,Gro.CoULangName,Gro.CoUid,
dbo.L(ba.[LangName],'zh-CN') AreaName,ba.LangName AreaLangName,ba.AreaCode
from dbo.t_project pj 
left join dbo.BpmArea ba on ba.Id = pj.EntityId
left join 
(select dbo.L(bg.[LangName],'zh-CN') CcName,bg.LangName CcLangName,bg.Id CcId,bg.Code CcNo,dbo.L(au.[LangName],'zh-CN') CcUname,au.LangName CcULangName,au.id CcUid,
dbo.L(bg2.[LangName],'zh-CN') BuName,bg2.LangName BuLangName,bg.ParentGroupId BuId,bg2.Code BuNo,dbo.L(au2.[LangName],'zh-CN') BuUname,au2.LangName BuULangName,au2.id BuUid,
dbo.L(bg3.[LangName],'zh-CN') CoName,bg3.LangName CoLangName,bg3.Id CoId,bg3.Code CoNo,dbo.L(au3.[LangName],'zh-CN') CoUname,au3.LangName CoULangName,au3.id CoUid
from BpmGroup bg
left join BpmJob bj on bg.id=bj.GroupId
left join BpmJobUser bju on bju.JobId=bj.Id
left join AppUser au on bju.UserId=au.Id
left join BpmGroup bg2 on bg2.id=bg.ParentGroupId
left join BpmJob bj2 on bg2.id=bj2.GroupId
left join BpmJobUser bju2 on bju2.JobId=bj2.Id
left join AppUser au2 on bju2.UserId=au2.Id
left join BpmGroup bg3 on bg3.id=bg2.ParentGroupId
left join BpmJob bj3 on bg3.id=bj3.GroupId
left join BpmJobUser bju3 on bju3.JobId=bj3.Id
left join AppUser au3 on bju3.UserId=au3.Id
where bg.EnumGroupLevel='3') Gro on Gro.CcNo=pj.CcNo
where pj.id=@pmId

";

            try
            {
                var model = _db.QueryFirst<OrgModel>(sql, new { pmId });
                if (model != null)
                {

                    model.UniqueId = model.GetUniqueIdByMd5();
                    var orgSsId = _db.QueryFirst<string>("SELECT Id FROM [dbo].[t_org_snapshoot] WHERE UniqueId='" + model.UniqueId + "' ");

                    //判断是否存在
                    if (string.IsNullOrEmpty(orgSsId))
                    {
                        orgSsId = Guid.NewGuid().ToString();

                        //执行新增
                        sql = @"
INSERT INTO [dbo].[t_org_snapshoot]
           ([Id]
           ,[UniqueId]
           ,[ProjectId]
           ,[ProjectNo]
           ,[ProjectName]
           ,[PmUserId]
           ,[PmUserName]
           ,[CcName]
           ,[CcLangName]
           ,[CcId]
           ,[CcNo]
           ,[CcUid]
           ,[CcUname]
           ,[CcULangName]
           ,[BuName]
           ,[BuLangName]
           ,[BuId]
           ,[BuNo]
           ,[BuUid]
           ,[BuUname]
           ,[BuULangName]
           ,[CoName]
           ,[CoLangName]
           ,[CoId]
           ,[CoNo]
           ,[CoUid]
           ,[CoUname]
           ,[CoULangName]
           ,[AreaName]
           ,[AreaLangName]
           ,[AreaCode])
     VALUES(
            @Id
           ,@UniqueId
           ,@ProjectId
           ,@ProjectNo
           ,@ProjectName
           ,@PmUserId
           ,@PmUserName
           ,@CcName
           ,@CcLangName
           ,@CcId
           ,@CcNo
           ,@CcUid
           ,@CcUname
           ,@CcULangName
           ,@BuName
           ,@BuLangName
           ,@BuId
           ,@BuNo
           ,@BuUid
           ,@BuUname
           ,@BuULangName
           ,@CoName
           ,@CoLangName
           ,@CoId
           ,@CoNo
           ,@CoUid
           ,@CoUname
           ,@CoULangName
           ,@AreaName
           ,@AreaLangName
           ,@AreaCode
)";
                        _db.Execute(sql, new
                        {
                            Id = orgSsId,
                            model.UniqueId
                               ,
                            model.ProjectId
                               ,
                            model.ProjectNo,
                            model.ProjectName
                               ,
                            model.PmUserId
                               ,
                            model.PmUserName
                               ,
                            model.CcName
                               ,
                            model.CcLangName
                               ,
                            model.CcId
                               ,
                            model.CcNo
                               ,
                            model.CcUid
                               ,
                            model.CcUname
                               ,
                            model.CcULangName
                               ,
                            model.BuName
                               ,
                            model.BuLangName
                               ,
                            model.BuId
                               ,
                            model.BuNo
                               ,
                            model.BuUid
                               ,
                            model.BuUname
                               ,
                            model.BuULangName
                               ,
                            model.CoName
                               ,
                            model.CoLangName
                               ,
                            model.CoId
                               ,
                            model.CoNo
                               ,
                            model.CoUid
                               ,
                            model.CoUname
                               ,
                            model.CoULangName
                               ,
                            model.AreaName
                               ,
                            model.AreaLangName
                               ,
                            model.AreaCode
                        });

                    }

                    return orgSsId;

                }

                throw new Exception("根据对应的项目Id获取不到对应的组织结构.");
            }
            catch
            {
                return null;
            }
        }


        /// <summary>
        /// 获取组织快照
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        protected string GetOrgPathSnapshoot(string orgSsId)
        {
            //根据快照Id返回一条数据
            var model= _db.QueryFirst<OrgModel>("SELECT * FROM [dbo].[t_org_snapshoot] WHERE  Id=@Id ",new { Id = orgSsId });
            return SerializeCamelCase(model);
        }

        protected string GetSingleOrgPathByUserId(string userId)
        {
            //获取当前用户所在项目路径,一般只有一个,如果多个就抛出异常

            //如果获取到多个组织架构,直接抛出异常
            string sql = @"
select DISTINCT pj.ProjectNo,pj.id ProjectId,pj.ProjectCnName ProjectName,pj.ProjectEnName,pj.PmId PmUserId,pj.PmName PmUserName,
Gro.CcName,Gro.CcLangName,Gro.CcId,Gro.CcNo,Gro.CcUname,Gro.CcULangName,Gro.CcUid,
Gro.BuName,Gro.BuLangName,Gro.BuId,Gro.BuNo,Gro.BuUname,Gro.BuULangName,Gro.BuUid,
Gro.CoName,Gro.CoLangName,Gro.CoId,Gro.CoNo,Gro.CoUname,Gro.CoULangName,Gro.CoUid,
dbo.L(ba.[LangName],'zh-CN') AreaName,ba.LangName AreaLangName,ba.AreaCode
from t_project_users pu 
left join dbo.t_project pj on pu.ProjectID=pj.id
left join dbo.BpmArea ba on ba.Id = pj.EntityId
left join 
(select dbo.L(bg.[LangName],'zh-CN') CcName,bg.LangName CcLangName,bg.Id CcId,bg.Code CcNo,dbo.L(au.[LangName],'zh-CN') CcUname,au.LangName CcULangName,au.id CcUid,
dbo.L(bg2.[LangName],'zh-CN') BuName,bg2.LangName BuLangName,bg.ParentGroupId BuId,bg2.Code BuNo,dbo.L(au2.[LangName],'zh-CN') BuUname,au2.LangName BuULangName,au2.id BuUid,
dbo.L(bg3.[LangName],'zh-CN') CoName,bg3.LangName CoLangName,bg3.Id CoId,bg3.Code CoNo,dbo.L(au3.[LangName],'zh-CN') CoUname,au3.LangName CoULangName,au3.id CoUid
from BpmGroup bg
left join BpmJob bj on bg.id=bj.GroupId
left join BpmJobUser bju on bju.JobId=bj.Id
left join AppUser au on bju.UserId=au.Id
left join BpmGroup bg2 on bg2.id=bg.ParentGroupId
left join BpmJob bj2 on bg2.id=bj2.GroupId
left join BpmJobUser bju2 on bju2.JobId=bj2.Id
left join AppUser au2 on bju2.UserId=au2.Id
left join BpmGroup bg3 on bg3.id=bg2.ParentGroupId
left join BpmJob bj3 on bg3.id=bj3.GroupId
left join BpmJobUser bju3 on bju3.JobId=bj3.Id
left join AppUser au3 on bju3.UserId=au3.Id
where bg.EnumGroupLevel='3') Gro on Gro.CcNo=pj.CcNo
where pu.AppUserId=@userId
 
";
            var model = _db.QueryFirst<OrgModel>(sql, new { userId });
            return SerializeCamelCase(model);
        }
        protected string GetSingleOrgPathByProjectNo(string ProjectNo)
        {
            //如果获取到多个组织架构,直接抛出异常
            string sql = @"
select DISTINCT pj.ProjectNo,pj.id ProjectId,pj.ProjectCnName ProjectName,pj.ProjectEnName,pj.PmId PmUserId,pj.PmName PmUserName,
Gro.CcName,Gro.CcLangName,Gro.CcId,Gro.CcNo,Gro.CcUname,Gro.CcULangName,Gro.CcUid,
Gro.BuName,Gro.BuLangName,Gro.BuId,Gro.BuNo,Gro.BuUname,Gro.BuULangName,Gro.BuUid,
Gro.CoName,Gro.CoLangName,Gro.CoId,Gro.CoNo,Gro.CoUname,Gro.CoULangName,Gro.CoUid,
dbo.L(ba.[LangName],'zh-CN') AreaName,ba.LangName AreaLangName,ba.AreaCode
from dbo.t_project pj 
left join dbo.BpmArea ba on ba.Id = pj.EntityId
left join 
(select dbo.L(bg.[LangName],'zh-CN') CcName,bg.LangName CcLangName,bg.Id CcId,bg.Code CcNo,dbo.L(au.[LangName],'zh-CN') CcUname,au.LangName CcULangName,au.id CcUid,
dbo.L(bg2.[LangName],'zh-CN') BuName,bg2.LangName BuLangName,bg.ParentGroupId BuId,bg2.Code BuNo,dbo.L(au2.[LangName],'zh-CN') BuUname,au2.LangName BuULangName,au2.id BuUid,
dbo.L(bg3.[LangName],'zh-CN') CoName,bg3.LangName CoLangName,bg3.Id CoId,bg3.Code CoNo,dbo.L(au3.[LangName],'zh-CN') CoUname,au3.LangName CoULangName,au3.id CoUid
from BpmGroup bg
left join BpmJob bj on bg.id=bj.GroupId
left join BpmJobUser bju on bju.JobId=bj.Id
left join AppUser au on bju.UserId=au.Id
left join BpmGroup bg2 on bg2.id=bg.ParentGroupId
left join BpmJob bj2 on bg2.id=bj2.GroupId
left join BpmJobUser bju2 on bju2.JobId=bj2.Id
left join AppUser au2 on bju2.UserId=au2.Id
left join BpmGroup bg3 on bg3.id=bg2.ParentGroupId
left join BpmJob bj3 on bg3.id=bj3.GroupId
left join BpmJobUser bju3 on bju3.JobId=bj3.Id
left join AppUser au3 on bju3.UserId=au3.Id
where bg.EnumGroupLevel='3') Gro on Gro.CcNo=pj.CcNo
where pj.id=@pmId

";
            var model = _db.QueryFirst<OrgModel>(sql, new { ProjectNo });
            return SerializeCamelCase(model);
        }
    }

    /// <summary>
    /// 组织快照实体
    /// </summary>
    public class OrgModel
    {
        public string Id { get; set; }
        public string UniqueId { get; set; }
        public string ProjectId { get; set; }
        public string ProjectNo { get; set; }
        
        public string ProjectName { get; set; }
        public string PmUserId { get; set; }
        public string PmUserName { get; set; }
        public string CcName { get; set; }
        public string CcLangName { get; set; }
        public string CcId { get; set; }
        public string CcNo { get; set; }
        public string CcUid { get; set; }
        public string CcUname { get; set; }
        public string CcULangName { get; set; }
        public string BuName { get; set; }
        public string BuLangName { get; set; }
        public string BuId { get; set; }
        public string BuNo { get; set; }
        public string BuUid { get; set; }
        public string BuUname { get; set; }
        public string BuULangName { get; set; }
        public string CoName { get; set; }
        public string CoLangName { get; set; }
        public string CoId { get; set; }
        public string CoNo { get; set; }
        public string CoUid { get; set; }
        public string CoUname { get; set; }
        public string CoULangName { get; set; }
        public string AreaName { get; set; }
        public string AreaLangName { get; set; }
        public string AreaCode { get; set; }
        public DateTime? CreationTime { get; set; }

        public string GetUniqueIdByMd5() {
            string tempValue = "-"+ ProjectId + "-" + ProjectNo+ "-" + ProjectName + "-" + PmUserId + "-" + PmUserName + "-" + CcId + "-" + CcUid + "-" + CcULangName + "-" + BuId + "-" + BuLangName + "-" + BuUid + "-" + BuULangName + "-" + CoId + "-" + CoLangName + "-" + CoUid + "-" + CoULangName + "-" + AreaCode + "-" + AreaLangName;
            return GetMd5_32byte(tempValue);
        }

        /// <summary>
        /// 获取MD5加密后的数据
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        private string GetMd5_32byte(string str)
        {
            string pwd = string.Empty;

            //实例化一个md5对像
            System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create();

            // 加密后是一个字节类型的数组，这里要注意编码UTF8/Unicode等的选择　
            byte[] s = md5.ComputeHash(System.Text.Encoding.UTF8.GetBytes(str));

            // 通过使用循环，将字节类型的数组转换为字符串，此字符串是常规字符格式化所得
            for (int i = 0; i < s.Length; i++)
            {
                // 将得到的字符串使用十六进制类型格式。格式后的字符是小写的字母，如果使用大写（X）则格式后的字符是大写字符 
                pwd = pwd + s[i].ToString("X");
            }

            return pwd;
        }

    }


}