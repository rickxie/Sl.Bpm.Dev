/*===================================================
 * 类名称: AutoRemindByTimeout
 * 文件名: \Schedule\AutoRemindByTimeout
 * 类描述: 流程节点超时自动提醒
 * 创建人: 胡张胜
 * 创建时间: 2019-01-16 17:06:17
 * CodeItemId : 57ddad6a-f9d8-40a0-8248-52b8758dc3cc
 * 版本： @version 1.0
 *===================================================*/
using MiniAbp.Dependency;
using Sl.Bpm.Application;
using Sl.Bpm.Application.Base;
using Sl.Bpm.Application.Module;
using Sl.Bpm.Repository;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Sl.Bpm.AppPages.Schedule
{
    /// <summary>
    /// 超时通知提醒
    /// </summary>
    public class AutoRemindByTimeout : ScheduleModuleBase
    {
        #region sql语句集合 executeSql insertSql

        /// <summary>
        /// 插入提醒记录表
        /// </summary>
        private static string insertSql = @"
         INSERT INTO InstNodeTimeoutRemindRecord(Id, ProcId,Status, StartProcId,RemindConfigId,Content, CreationTime)
            VALUES(NEWID(), @ProcId,@Status,@StartProcId, @RemindConfigId,@Content, GETDATE())
        ";

        /// <summary>
        /// 获取所有待提醒列表
        /// </summary>
        private static string executeSql = @"
 
  
 DECLARE @CurrentDate DATETIME
  SET @CurrentDate=GETDATE();  
  
   --1.获取所有单项处理的数据   
 SELECT 1 AS LevelType,t1.*,wif.SendWay, wif.InformLevel  FROM (
	 SELECT ip.TaskId, ip.RecvTime, --接收时间                                
	[dbo].[func_DateAdd](ip.RecvTime,rc.RemindDateType,rc.TimeoutRange,rc.TimeoutRangeUnit) AS  TimeoutStartDate, --超时开始时间                                 
	(CASE WHEN rc.IndateType=2  THEN [dbo].[func_DateAdd](ip.RecvTime,rc.RemindDateType,rc.IndateRange,rc.IndateRangeUnit) ELSE '2099-01-01' END) AS  IndateEndDate, --有效期截止时间(按照自然日计算)
	(CASE 
	--1.不重复提醒  2.为提醒过
	WHEN rc.IsRepeatRemind=0 AND NOT EXISTS(SELECT 1 FROM InstNodeTimeoutRemindRecord WHERE StartProcId=ip.Id AND RemindConfigId=rc.Id) THEN 1
	-- 1.重复提醒  2.最大可提醒数大于已提醒次数   3.上一次提醒时间加上间隔时间小于当前时间,则进行提醒 
	WHEN rc.IsRepeatRemind=1 AND (SELECT COUNT(1) FROM InstNodeTimeoutRemindRecord WHERE StartProcId=ip.Id AND RemindConfigId=rc.Id) < rc.MaxRemindCount
	AND [dbo].[func_DateAdd](ISNULL((SELECT MAX(CreationTime) FROM InstNodeTimeoutRemindRecord WHERE StartProcId=ip.Id AND RemindConfigId=rc.Id),ip.RecvTime),rc.RemindDateType,rc.RepeatRemindRange,rc.RepeatRemindRangeUnit)<= @CurrentDate  THEN 1 ELSE 0 END ) AS IsRemindCount, --是否还有剩余提醒 
	 ip.Id AS procId,ip.WfdWorkflowNodeId,ISNULL(ip.StartProcId,ip.Id) AS StartProcId,
	 rc.Id AS RemindConfigId,
	 rc.RemindDateType, rc.TimeoutRange, rc.TimeoutRangeUnit, rc.IndateType,
	 rc.IndateRange, rc.IndateRangeUnit,
	 rc.IsRepeatRemind, rc.RepeatRemindRange, rc.RepeatRemindRangeUnit,
	 rc.MaxRemindCount,rc.IsEnabled, rc.IsDeleted
	   FROM InstProc AS ip
	 INNER JOIN WfdWorkflowNode AS wwn ON ip.WfdWorkflowNodeId=wwn.Id 
	 AND wwn.IsOvertimeInformEnable=1 --配置了超时提醒的                                                                                                
	INNER JOIN 
	(
		SELECT * FROM WfdWorkflowNodeTimeoutRemindConfig  AS wfdrc
		WHERE wfdrc.IsEnabled=1 AND wfdrc.IsDeleted=0                                                                                                
	) AS rc ON ip.WfdWorkflowNodeId=rc.WfdNodeId
	 WHERE ip.[Status] = 0 --未审批
	 AND ISNULL(ip.StartProcId,'')='' --并且未转发和加签      
        
 ) AS t1 
 INNER JOIN WfdWorkflowNodeInformConfig AS wif ON t1.RemindConfigId=wif.InformLinkId
WHERE t1.IndateEndDate>=@CurrentDate --获取有效期以内
AND  TimeoutStartDate<= @CurrentDate  --并且当前时间已经超时
AND IsRemindCount=1 --获取当前还可提醒的数据                           
 UNION ALL 
  
   --2.获取所有多次处理的数据   
 SELECT 2 AS LevelType, t1.*,wif.SendWay, wif.InformLevel FROM (
	 SELECT ip.TaskId,orgIprc.RecvTime, --接收时间                                
	[dbo].[func_DateAdd](orgIprc.RecvTime,rc.RemindDateType,rc.TimeoutRange,rc.TimeoutRangeUnit) AS  TimeoutStartDate, --超时开始时间                                 
	(CASE WHEN rc.IndateType=2  THEN [dbo].[func_DateAdd](orgIprc.RecvTime,1,rc.IndateRange,rc.IndateRangeUnit) ELSE '2099-01-01' END) AS  IndateEndDate, --有效期截止时间(按照自然日计算)
	(CASE 
	--1.不重复提醒  2.为提醒过
	WHEN rc.IsRepeatRemind=0 AND NOT EXISTS(SELECT 1 FROM InstNodeTimeoutRemindRecord WHERE StartProcId=ip.StartProcId AND RemindConfigId=rc.Id) THEN 1
	-- 1.重复提醒  2.最大可提醒数大于已提醒次数   3.上一次提醒时间加上间隔时间小于当前时间,则进行提醒 
	WHEN rc.IsRepeatRemind=1 AND (SELECT COUNT(1) FROM InstNodeTimeoutRemindRecord WHERE StartProcId=ip.StartProcId AND RemindConfigId=rc.Id) < rc.MaxRemindCount
	AND [dbo].[func_DateAdd](ISNULL((SELECT MAX(CreationTime) FROM InstNodeTimeoutRemindRecord WHERE StartProcId=ip.StartProcId AND RemindConfigId=rc.Id),orgIprc.RecvTime),rc.RemindDateType,rc.RepeatRemindRange,rc.RepeatRemindRangeUnit)<= @CurrentDate  THEN 1 ELSE 0 END ) AS IsRemindCount, --是否还有剩余提醒  
	 ip.Id AS procId,ip.WfdWorkflowNodeId,ISNULL(ip.StartProcId,ip.Id) AS StartProcId,
	 rc.Id AS RemindConfigId, 
	 rc.RemindDateType, rc.TimeoutRange, rc.TimeoutRangeUnit, rc.IndateType,
	 rc.IndateRange, rc.IndateRangeUnit,
	 rc.IsRepeatRemind, rc.RepeatRemindRange, rc.RepeatRemindRangeUnit,
	 rc.MaxRemindCount,rc.IsEnabled, rc.IsDeleted
	 
	 FROM InstProc AS ip
	 INNER JOIN InstProc AS orgIprc  ON ip.StartProcId=orgIprc.Id    --原始起始处理项
	 INNER JOIN WfdWorkflowNode AS wwn ON ip.WfdWorkflowNodeId=wwn.Id 
	 AND wwn.IsOvertimeInformEnable=1 --配置了超时提醒的                                                                                                
	INNER JOIN 
	(
		SELECT * FROM WfdWorkflowNodeTimeoutRemindConfig  AS wfdrc
		WHERE wfdrc.IsEnabled=1 AND wfdrc.IsDeleted=0                                                                                                
	) AS rc ON ip.WfdWorkflowNodeId=rc.WfdNodeId
    WHERE ip.[Status] = 0 --未审批
    AND ISNULL(ip.StartProcId,'')!='' --转发或加签  
 ) AS t1 
 INNER JOIN WfdWorkflowNodeInformConfig AS wif ON t1.RemindConfigId=wif.InformLinkId
WHERE t1.IndateEndDate>=@CurrentDate --获取有效期以内
AND  TimeoutStartDate<= @CurrentDate  --并且当前时间已经超时
AND IsRemindCount=1 --获取当前还可提醒的数据                           
ORDER BY t1.procId,t1.RemindConfigId  
  
 
        ";

        #endregion


        /// <summary>
        /// 执行调度
        /// </summary>
        /// <param name="parameter"></param>
        /// <returns></returns>
        public override JobContext Execute(JobContext context)
        {

            //获取所有已经超时的处理项
            try
            {
                var dt = _db.GetTable(executeSql);
                var informManager = IocManager.Instance.Resolve<InformExpert>();
                 
                //遍历执行
                foreach (DataRow dr in dt.Rows)
                {
                    //获取参数
                    var nodeId = Convert.ToString(dr["WfdWorkflowNodeId"]);
                    var linkId = Convert.ToString(dr["RemindConfigId"]);
                    var taskId = Convert.ToString(dr["TaskId"]);
                    var sendWay = Convert.ToInt32(dr["SendWay"]);
                    var startProcId = Convert.ToString(dr["StartProcId"]);
                    var executeStatus = 1; //状态,默认成功
                    var content = string.Empty; //处理描述方式
                    try
                    {
                        //发送邮件
                        if (sendWay == 1)
                        {
                            var informLevel = Convert.ToInt32(dr["InformLevel"]);
                            //发送邮件
                            informManager.SendEmailForLinkId(linkId, informLevel, taskId, nodeId);
                            content = "成功提醒,taskId:" + taskId+ "  nodeId:"+ nodeId;
                        }
                        //发短信
                        else if (sendWay == 2)
                        {
                            //TODO 短信发送暂时不支持
                            executeStatus = 0;
                            content = "暂不支持短信接口,taskId:" + taskId + "  nodeId:" + nodeId;
                        }
                        
                    }
                    catch (Exception ex)
                    {
                        executeStatus = 0;
                        content = "超时提醒出现异常:"+ex.Message;
                    }
                    
                    //记录已发送信息
                    _db.Execute(insertSql, new { ProcId = Convert.ToString(dr["procId"]), RemindConfigId = linkId , Status = executeStatus , StartProcId= startProcId ,Content = content });
                }

                context.Result = JobResult.Success;
            }
            catch (Exception ex)
            {

                context.Result = JobResult.Exception;
                context.Message = "执行超时通知时发生了异常:" + ex.Message;
            }
 
            return context;
        }

    }
}