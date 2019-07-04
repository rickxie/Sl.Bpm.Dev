/*===================================================
 * 类名称: AutoProcessingByTimeout
 * 文件名: \Schedule\AutoProcessingByTimeout
 * 类描述: 超时自动处理调度代码
 * 创建人: 胡张胜
 * 创建时间: 2019-01-23 19:03:19
 * CodeItemId : 70654ba9-d645-42bc-a2bc-8907b5be2ddb
 * 版本： @version 1.0
 *===================================================*/
using Sl.Bpm.Application.Base;
using Sl.Bpm.Application.Module;
using Sl.Bpm.Engine.Api;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Sl.Bpm.AppPages.Schedule
{
    /// <summary>
    /// 超时自动处理
    /// </summary>
    public class AutoProcessingByTimeout : ScheduleModuleBase
    {
        #region sql语句集合 executeSql insertSql

        /// <summary>
        /// 插入提醒记录表
        /// </summary>
        private static string insertSql = @"
         INSERT INTO InstNodeTimeoutProcessingRecord(Id,WfdNodeId,ProcId,ProcessingConfigId,Status,DisplayOrder,StartProcId,[Content],CreationTime,CreatorUserId)
         VALUES(NEWID(),@WfdNodeId,@ProcId,@ProcessingConfigId,@Status,@DisplayOrder,@StartProcId,@Content,GETDATE(),@CreatorUserId);
        ";

        /// <summary>
        /// 获取当前处理人的领导
        /// </summary>
        private static string getParentUserSql = @"
        SELECT * FROM V_GetParentUser WHERE UserId=@ProcUser
";

        /// <summary>
        /// 获取所有待提醒列表
        /// </summary>
        private static string executeSql = @"
 
   DECLARE @CurrentDate DATETIME
  SET @CurrentDate=GETDATE();  
  
   --1.获取所有单项处理的数据   
 SELECT 1 AS LevelType, t1.* FROM (
	 SELECT ip.TaskId, ip.RecvTime, --接收时间                                
	[dbo].[func_DateAdd](ip.RecvTime,rc.RemindDateType,rc.TimeoutRange,rc.TimeoutRangeUnit) AS  TimeoutStartDate, --超时开始时间                                 
	 ip.Id AS procId,ip.WfdWorkflowNodeId,ISNULL(ip.StartProcId,ip.Id) AS StartProcId,ip.ProcUser,
	 rc.Id AS ProcessingConfigId,
	 rc.RemindDateType, rc.TimeoutRange, rc.TimeoutRangeUnit,rc.IsResetRemindRange,rc.ProcessingType,rc.DataValue,
	 rc.DisplayOrder,  rc.IsEnabled, rc.IsDeleted
	   FROM InstProc AS ip
	 INNER JOIN WfdWorkflowNode AS wwn ON ip.WfdWorkflowNodeId=wwn.Id 
	 AND wwn.IsOvertimeActionEnable=1 --配置了超时处理                                                                                                
	INNER JOIN 
	(
		SELECT * FROM WfdWorkflowNodeTimeoutProcessingConfig  AS wfdrc
		WHERE wfdrc.IsEnabled=1 AND wfdrc.IsDeleted=0 
                                                                                        
	) AS rc ON ip.WfdWorkflowNodeId=rc.WfdNodeId
	 WHERE ip.[Status] = 0 --未审批
	 AND ISNULL(ip.StartProcId,'')='' --没有转发或加签    
     
     --获取所有未处理的配置项
     AND rc.DisplayOrder>ISNULL ((SELECT MAX(DisplayOrder) FROM InstNodeTimeoutProcessingRecord AS intpr WHERE intpr.WfdNodeId=ip.WfdWorkflowNodeId AND intpr.StartProcId =ip.Id )  ,0)
        
 ) AS t1 
WHERE  
  TimeoutStartDate<= @CurrentDate  --并且当前时间已经超时
                          
 UNION ALL 
  
   --2.获取所有多次处理并且不重新计时的数据   
 SELECT 2 AS LevelType, t1.* FROM (
	 SELECT ip.TaskId,orgIprc.RecvTime, --原始接收时间                                
	[dbo].[func_DateAdd](orgIprc.RecvTime,rc.RemindDateType,rc.TimeoutRange,rc.TimeoutRangeUnit) AS  TimeoutStartDate, --超时开始时间                                 
	 ip.Id AS procId,orgIprc.WfdWorkflowNodeId,ISNULL(ip.StartProcId,ip.Id) AS StartProcId,orgIprc.ProcUser,
	 rc.Id AS ProcessingConfigId, 
	 rc.RemindDateType, rc.TimeoutRange, rc.TimeoutRangeUnit,rc.IsResetRemindRange,rc.ProcessingType,rc.DataValue,
	 rc.DisplayOrder,  rc.IsEnabled, rc.IsDeleted
	 FROM
	 InstProc AS ip
	 INNER JOIN InstProc AS orgIprc  ON ip.StartProcId=orgIprc.Id    --原始起始处理项
	 INNER JOIN WfdWorkflowNode AS wwn ON ip.WfdWorkflowNodeId=wwn.Id  AND wwn.IsOvertimeActionEnable=1 --配置了超时处理                                                                                          
		INNER JOIN 
		(
			SELECT * FROM WfdWorkflowNodeTimeoutProcessingConfig  AS wfdrc
			WHERE wfdrc.IsEnabled=1 AND wfdrc.IsDeleted=0 AND wfdrc.IsResetRemindRange=0                                                                                          
		) AS rc ON ip.WfdWorkflowNodeId=rc.WfdNodeId
     --获取所有未处理的配置项
	 WHERE rc.DisplayOrder>ISNULL ((SELECT MAX(DisplayOrder) FROM InstNodeTimeoutProcessingRecord AS intpr WHERE intpr.WfdNodeId=ip.WfdWorkflowNodeId AND intpr.StartProcId =ip.StartProcId )  ,0)
	 AND ip.[Status] = 0 --未审批
	 AND ISNULL(ip.StartProcId,'')!='' --有转发或加签      
 ) AS t1 
 WHERE 
  TimeoutStartDate<= @CurrentDate  --并且当前时间已经超时
 UNION ALL 
  
   --3.获取所有多次处理并且重新计时的数据   
 SELECT 3 AS LevelType, t1.* FROM (
	 SELECT ip.TaskId,ip.RecvTime, --接收时间                                
	[dbo].[func_DateAdd](ip.RecvTime,rc.RemindDateType,rc.TimeoutRange,rc.TimeoutRangeUnit) AS  TimeoutStartDate, --超时开始时间                                 
	 
	 ip.Id AS procId,ip.WfdWorkflowNodeId,ip.StartProcId,orgIprc.ProcUser,
	 rc.Id AS ProcessingConfigId, 
	 rc.RemindDateType, rc.TimeoutRange, rc.TimeoutRangeUnit,rc.IsResetRemindRange,rc.ProcessingType,rc.DataValue,
	 rc.DisplayOrder,  rc.IsEnabled, rc.IsDeleted
	   FROM InstProc AS ip  
	  INNER JOIN InstProc AS orgIprc  ON ip.StartProcId=orgIprc.Id    --原始起始处理项
	 INNER JOIN WfdWorkflowNode AS wwn ON ip.WfdWorkflowNodeId=wwn.Id  AND wwn.IsOvertimeActionEnable=1 --配置了超时处理                                                                                          
	INNER JOIN 
	(
		SELECT * FROM WfdWorkflowNodeTimeoutProcessingConfig  AS wfdrc
		WHERE wfdrc.IsEnabled=1 AND wfdrc.IsDeleted=0 AND wfdrc.IsResetRemindRange=1                                                                                                     
	) AS rc ON ip.WfdWorkflowNodeId=rc.WfdNodeId
	 WHERE ip.[Status] = 0 --未审批
	 AND ISNULL(ip.StartProcId,'')!='' --有转发或加签      
	 --获取所有未处理的配置项
	 AND rc.DisplayOrder>ISNULL ((SELECT MAX(DisplayOrder) FROM InstNodeTimeoutProcessingRecord AS intpr WHERE intpr.WfdNodeId=ip.WfdWorkflowNodeId AND intpr.StartProcId =ip.StartProcId )  ,0)
 ) AS t1 
 WHERE 
  TimeoutStartDate<= @CurrentDate  --并且当前时间已经超时                      
ORDER BY t1.procId,t1.DisplayOrder 


 
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
                //获取所有超时需要处理的项,默认按照处理项顺序进行排序
                var dt = _db.GetTable(executeSql);

                ScheduleApi taskApi = new ScheduleApi();
                int count = 0; //统计执行成功次数

                var executeProc = new List<string>();

                //遍历执行
                foreach (DataRow dr in dt.Rows)
                {
                    //获取参数
                    var nodeId = Convert.ToString(dr["WfdWorkflowNodeId"]);
                    var processingConfigId = Convert.ToString(dr["ProcessingConfigId"]);
                    var taskId = Convert.ToString(dr["TaskId"]);
                    var procId = Convert.ToString(dr["procId"]);

                    var displayOrder = Convert.ToString(dr["DisplayOrder"]);
                    var startProcId = Convert.ToString(dr["StartProcId"]);
                    var content = string.Empty; //处理描述方式
                    var procUser = Convert.ToString(dr["ProcUser"]);
                    var executeStatus = 1; //状态,默认成功
                    var processingType = Convert.ToInt32(dr["ProcessingType"]);


                    //判断当前Proc是否已经执行,如果已经执行,则不做操作,等待下一次轮循处理
                    if (executeProc.Contains(procId)) continue;
                    executeProc.Add(procId);

                    try
                    {
                        //根据处理类型进行处理 1.自动退回到发起人 2.自动提交流程  3.自动转直接领导 4.自动转间接领导 5.自动转指定人 6.自动退回到某个节点 7.自动结束
                        switch (processingType) {
                            case 1: {
                                    var parameter = new ApiApproveParameter();
                                    parameter.ProcId = procId;
                                    content = parameter.Note = "节点超时,系统自动退回发起人!";
                                    taskApi.AutoRestart(parameter);
                                    break;
                                }
                            case 2:
                                {
                                    var parameter = new ApiApproveParameter();
                                    parameter.ProcId = procId;
                                    content = parameter.Note = "节点超时,系统自动提交下一步!";
                                    taskApi.AutoApprove(parameter);
                                    break;
                                }
                            case 3:
                                {
                                    var parameter = new ApiForwardParameter();
                                    parameter.ProcId = procId;
                                    
                                    //获取当前处理人对应的领导人信息
                                    var dtUser = _db.GetTable(getParentUserSql, new { ProcUser = procUser });
                                    if (dtUser.Rows.Count > 0)
                                    {
                                        content = parameter.Note = "节点超时,系统自动转发直接领导!";
                                        parameter.ForwardToJobUserId = Convert.ToString(dtUser.Rows[0]["ParentJobUserId"]);
                                        taskApi.AutoForward(parameter);
                                    }
                                    else {
                                        executeStatus = 0;//未执行成功
                                        content = "节点超时,系统转发直接领导时,找不到对应的直接领导人!";
                                    }
                                   
                                    break;
                                }
                            case 4:
                                {
                                    var parameter = new ApiForwardParameter();
                                    parameter.ProcId = procId;
                                    //获取当前处理人对应的领导人信息
                                    var dtUser = _db.GetTable(getParentUserSql, new { ProcUser = procUser });
                                    if (dtUser.Rows.Count > 0)
                                    {
                                        content = parameter.Note = "节点超时,系统自动转发间接领导!";
                                        parameter.ForwardToJobUserId = Convert.ToString(dtUser.Rows[0]["GrandJobUserId"]);
                                        taskApi.AutoForward(parameter);
                                    }
                                    else
                                    {
                                        executeStatus = 0;//未执行成功
                                        content = "节点超时,系统转发间接领导时,找不到对应的间接领导人!";
                                    }
                                    break;
                                }
                            case 5:
                                {
                                    var parameter = new ApiForwardParameter();
                                    parameter.ProcId = procId;

                                     
                                    var forwardToUserId = Convert.ToString(dr["DataValue"]);
                                    if (string.IsNullOrWhiteSpace(forwardToUserId) == false)
                                    {
                                        content = parameter.Note = "节点超时,系统自动转发!";
                                        parameter.ForwardToJobUserId = forwardToUserId;
                                        taskApi.AutoForward(parameter);
                                    }
                                    else
                                    {
                                        executeStatus = 0;//未执行成功
                                        content = "节点超时,系统转发指定用户时,找不到对应用户!";
                                    }
                                    break;
                                }
                            case 6:
                                {
                                    var parameter = new ApiReturnToAnyStepParameter();
                                    parameter.ProcId = procId;
                                    var returnNodeId = Convert.ToString(dr["DataValue"]);
                                    if (string.IsNullOrWhiteSpace(returnNodeId) == false)
                                    {
                                        content = parameter.Note = "节点处理超时,系统自动退回预设节点!";
                                        parameter.ReturnToNodes = new List<string>() { returnNodeId };
                                        taskApi.ReturnToAnyStep(parameter);
                                    }
                                    else
                                    {
                                        executeStatus = 0;//未执行成功
                                        content = "节点超时,系统转发指定用户时,找不到对应用户!";
                                    }
                                    break;
                                }
                            case 7:
                                {
                                    var parameter = new ApiApproveParameter();
                                    parameter.ProcId = procId;
                                    content = parameter.Note = "节点处理超时,系统自动结束!";
                                    taskApi.AutoEnd(parameter);  
                                    break;
                                }
                            default: {
                                    executeStatus = 0;//未执行成功
                                    content = "节点超时,异常的处理分类,只做日志记录!";
                                    break;
                                }    
                        }

                        count++;
                    }
                    catch (Exception ex)
                    {
                        executeStatus = 0;//未执行成功
                        content = ex.Message;
                    }
 

                    //记录已处理的信息
                    _db.Execute(insertSql, new { WfdNodeId = nodeId, ProcId=procId, ProcessingConfigId=processingConfigId, Status= executeStatus, DisplayOrder = displayOrder, StartProcId = startProcId, Content = content,  CreatorUserId = procUser });
                }

                context.Result = JobResult.Success;
                context.Output = string.Format("执行超时处理,共{0}项,成功执行{1}项.",dt.Rows.Count,count);
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