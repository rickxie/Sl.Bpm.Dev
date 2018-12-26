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

        /// <summary>
        /// 增加预算流水
        /// </summary>
        /// <param name="budgetType"></param>
        /// <param name="businessType"></param>
        /// <param name="associatedSn"></param>
        /// <param name="associatedTaskId"></param>
        /// <param name="totalAmt"></param>
        protected void AddBudgetFee(BudgetType budgetType, BusinessType businessType, string associatedSn, string associatedTaskId, decimal totalAmt, string note = null)
        {
            var newBudget = new t_budget_fee();
            newBudget.RefreshId();
            newBudget.BudgetType = budgetType;
            newBudget.BusinessType = businessType;
            newBudget.Amount = totalAmt;
            newBudget.AssociateSn = associatedSn;
            newBudget.AssociatedTaskId = associatedTaskId;
            newBudget.Note = note;
            newBudget.CreatorName = _db.GetSingle("SELECT dbo.L(LangName,'zh-CN') FROM dbo.AppUser WHERE Id = @userId", new { userId = newBudget.CreatorUserId });
            _db.Insert(newBudget);
        }
    }

    public enum BusinessType
    {
        /// <summary>
        /// 暂估 
        /// </summary>
        AccruedRevenue = 8000,
        /// <summary>
        /// 冲暂估             
        /// </summary>
        OffsetAccruedRevenue = 8001,
        /// <summary>
        /// 开票               
        /// </summary>
        Invoice = 8002,
        /// <summary>
        /// 销售退回           
        /// </summary>
        SalesReturn = 8003,
        /// <summary>
        /// 业务招待费预申请   
        /// </summary>
        BusinessInvitation = 8004,
        /// <summary>
        /// 差旅交通费预申请   
        /// </summary>
        Travel = 8005,
        /// <summary>
        /// 招聘培训费预申请   
        /// </summary>
        Recruitment = 8006,
        /// <summary>
        /// 其它费用预申请     
        /// </summary>
        Other = 8007,
        /// <summary>
        /// 费用报销           
        /// </summary>
        Reimbursement = 8008,
        /// <summary>
        /// 暂支抵冲费用报销   
        /// </summary>
        ReimbursementForCashAdvance = 8009,
        /// <summary>
        /// 业务招待反还       
        /// </summary>
        RecyleBusinessInvitation = 8010,
        /// <summary>
        /// 差旅交通费反还     
        /// </summary>
        RecyleTravel = 8011,
        /// <summary>
        /// 招聘培训费反还     
        /// </summary>
        RecyleRecruitment = 8012,
        /// <summary>
        /// 其它费用反还       
        /// </summary>
        RecyleOther = 8013,
        /// <summary>
        /// 个人垫付           
        /// </summary>
        PersonalAdvance = 8014,
        /// <summary>
        /// 个人垫付归还       
        /// </summary>
        RecylePersonalAdvance = 8015,
        /// <summary>
        /// 简易报销           
        /// </summary>
        SimpleReimbursement = 8016,
        /// <summary>
        /// 采购预申请         
        /// </summary>
        Purchase = 8017,
        /// <summary>
        /// 采购预申请归还     
        /// </summary>
        RecylePurchase = 8018,
        /// <summary>
        /// 采购合同           
        /// </summary>
        PurchaseContract = 8019,
        /// <summary>
        /// 人员工资           
        Staff = 8020,
        /// </summary>
        /// <summary>
        /// 资产月租           
        /// </summary>
        Utilities = 8021,
        /// <summary>
        /// 业务招待费暂支     
        /// </summary>
        CashAdvanceInvitation = 8022,
        /// <summary>
        /// 差旅交通费暂支     
        /// </summary>
        CashAdvanceTravel = 8023,
        /// <summary>
        /// 招聘培训费暂支     
        /// </summary>
        CashAdvanceRecruitment = 8024,
        /// <summary>
        /// 资产使用费暂支     
        /// </summary>
        CashAdvanceUtilities = 8025,
        /// <summary>
        /// 其他成本暂支       
        /// </summary>
        CashAdvanceOther = 8026,
        /// <summary>
        /// 保证金暂支         
        /// </summary>
        CashAdvanceCashPledge = 8027,
        /// <summary>
        /// 押金暂支           
        /// </summary>
        CashAdvanceCashDeposit = 8028,
        /// <summary>
        /// 业务招待费冲还     
        /// </summary>
        OffsetInvitation = 8029,
        /// <summary>
        /// 差旅交通费冲还     
        /// </summary>
        OffsetTravel = 8030,
        /// <summary>
        /// 招聘培训费冲还     
        /// </summary>
        OffsetRecruitment = 8031,
        /// <summary>
        /// 资产使用费冲还     
        /// </summary>
        OffsetUtilities = 8032,
        /// <summary>
        /// 其他成本冲还       
        /// </summary>
        OffsetOther = 8033,
        /// <summary>
        /// 保证金冲还         
        /// </summary>
        OffsetCashPledge = 8034,
        /// <summary>
        /// 押金冲还           
        /// </summary>
        OffsetCashDeposit = 8035,
        /// <summary>
        /// 业务招待费归还     
        /// </summary>
        ReturnInvitation = 8036,
        /// <summary>
        /// 差旅交通费归还     
        /// </summary>
        ReturnTravel = 8037,
        /// <summary>
        /// 招聘培训费归还     
        /// </summary>
        ReturnRecruitment = 8038,
        /// <summary>
        /// 资产使用费归还     
        /// </summary>
        ReturnUtilities = 8039,
        /// <summary>
        /// 其他成本归还       
        /// </summary>
        ReturnOther = 8040,
        /// <summary>
        /// 保证金归还         
        /// </summary>
        ReturnCashPledge = 8041,
        /// <summary>
        /// 押金归还           
        /// </summary>
        ReturnCashDeposit = 8042,
        /// <summary>
        /// 培训团建费
        /// </summary>
        Training = 8043,
        /// <summary>
        /// 培训团建反还
        /// </summary>
        RecyleTraining = 8044,
        /// <summary>
        /// 培训团建借支
        /// </summary>
        CashAdvanceTraining = 8045,
        /// <summary>
        /// 培训团建冲还
        /// </summary>
        OffsetTraining = 8046,
    }
    public enum BudgetType
    {
        /// <summary>   
        /// 服务收入 
        /// </summary> 
        RevenueService = 1000,
        /// <summary>
        /// 产品收入 
        /// </summary> 
        RevenueProduct = 1100,
        /// <summary>
        /// 其它收入 
        /// </summary> 
        RevenueOther = 1200,    
        /// <summary>
        /// 押金 </summary> 
        CashDeposit = 2000, 
        /// <summary>
        /// 保证金 </summary> 
        CashPledge = 2100, 
        /// <summary>
        /// 人力成本 
        /// </summary> 
        CostStaff = 3000,  
        ///<summary>
        ///产品成本 
        ///</summary> 
        CostProduct = 3100,
        ///<summary>
        ///外包成本 
        ///</summary> 
        CostOutsourcing = 3200, 
        ///<summary>
        ///业务招待费 
        ///</summary> 
        CostEntertinment = 3300,  
        ///<summary>
        ///差旅交通费 
        ///</summary> 
        CostTravel = 3400, 
        ///<summary>
        ///招聘培训费 
        ///</summary> 
        CostRecruiting = 3500,
        ///<summary>
        ///资产维护费 
        ///</summary> 
        CostUtilities = 3600,  
        ///<summary>
        ///其它成本 
        ///</summary> 
        CostOther = 3700,  
        ///<summary>
        ///税金 
        ///</summary> 
        CostTax = 3800,
        ///<summary>
        ///业务暂支 
        ///</summary> 
        BusinessCashAdvance = 4000,

    }
}