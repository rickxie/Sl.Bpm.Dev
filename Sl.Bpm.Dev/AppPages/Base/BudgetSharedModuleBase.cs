/*===================================================
 * 类名称: WorkflowSharedBase
 * 文件名: \Base\WorkflowSharedBase
 * 类描述: 财务、项目相关公共方法
 * 创建人: MC
 * 创建时间: 2018-11-27 13:07:15
 * 修改人: 
 * 修改时间:
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
    public class BudgetSharedModuleBase: SharedModuleBase
    {
        /// <summary>
        /// 保存预算快照信息
        /// </summary>
        /// <returns></returns>
        public string SaveBudgetSnapshot(string BudgetJson,string taskId)
        {
            //执行新增
            string Id = Guid.NewGuid().ToString();
            DateTime CreationTime = DateTime.Now;
            string sql = @"INSERT INTO [dbo].[t_bud_snapshoot]
                           ([Id]
                           ,[TaskId]
                           ,[BudgetJson]
                           ,[ProjectNo]
                           ,[CreationTime])
                     VALUES
                           (@Id
                           ,@TaskId
                           ,@BudgetJson
                           ,null
                           ,@CreationTime)";
            _db.Execute(sql,new {
                @Id=Id
                           ,
                @TaskId= taskId
                           ,
                @BudgetJson= BudgetJson
                           ,
                @CreationTime= CreationTime
            });
            return Id;
        }
        /// <summary>
        /// 根据项目号获取最新预算快照
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        protected string GetSnapshotByProjectNo(string ProjectNo)
        {
            //根据快照ProjectNo返回一条数据
            DataTable dt = _db.GetTable(@"select * from [t_bud_snapshoot] where ProjectNo=@ProjectNo and CreationTime=(select max(CreationTime) from [t_bud_snapshoot] where ProjectNo=@ProjectNo)", new { @ProjectNo = ProjectNo });
            //将BudgetJson转DataTable
            //DataTable Bud = _db.QueryFirst<DataTable>(dt.Rows[0]["BudgetJson"].ToString());
            return dt.Rows[0]["BudgetJson"].ToString();
        }
        /// <summary>
        /// 根据快照Id获取预算快照
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        protected string GetSnapshotById(string Id)
        {
            //根据快照Id返回一条数据
            DataTable dt = _db.GetTable(@"select * from [t_bud_snapshoot] where Id=@Id", new { @Id = Id });
            //DataTable Bud = _db.QueryFirst<DataTable>(dt.Rows[0]["BudgetJson"].ToString());
            return dt.Rows[0]["BudgetJson"].ToString();
        }
        /// <summary>
        /// 获取当前预算分类是否超预算
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        protected string IsCurClassBeyondBudget(string Id)
        {
            //根据快照Id返回一条数据
            DataTable dt = _db.GetTable(@"select * from [t_bud_snapshoot] where Id=@Id", new { @Id = Id });
            return dt.Rows[0]["BudgetJson"].ToString();
        }
        /// <summary>
        /// 插入预算流水
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        protected string AddBudgetUsageRecord(string Id)
        {
            //根据快照Id返回一条数据
            DataTable dt = _db.GetTable(@"select * from [t_bud_snapshoot] where Id=@Id", new { @Id = Id });
            return dt.Rows[0]["BudgetJson"].ToString();
        }
    }
}