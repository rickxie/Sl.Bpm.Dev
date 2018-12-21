using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Sl.Bpm.Application.Base;
using Sl.Bpm.Application.Module;
using Sl.Bpm.Engine;
namespace Sl.Bpm.AppPages.Workflow.nd50_65da439b3a8d42268ca1e747bfa5cd8f
{
    /// <summary>
    /// 计划数据维护流程 \\Workflow\\nd50\\nd50.cs
    /// </summary>
    public class nd50 : WorkflowModuleBase
    {
        //TODO:自定义模块需要使用的方法
        //所有输入参数必须为 ArgsInput
        //输出参数可以为DataTable 和 简单类型
       
             public override EventParameter Event_Agree_After(EventParameter args)
        {
            //审批完成
            if (args.Parameter.NextProces.HaveEndProc)
            {
                DataTable dt = _db.GetTable("select * from [Yfss.Bpm].[dbo].[Qad_jh2] where TaskId = '" + args.TaskId + "'");
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        //插入数据
                        _db.Execute("INSERT into [Yfss.Bpm].[dbo].[Qad_jh2](Id,PartNumber,PartName,StandardUnit,Supplier,QoOpacking,QoOpackage,Place,PartState,PullMode,Shkw,Time)VALUES(NEWID(),'" + dt.Rows[i]["PartNumber"].ToString() + "','" + dt.Rows[i]["PartName"].ToString() + "','" + dt.Rows[i]["StandardUnit"].ToString() + "','" + dt.Rows[i]["Supplier"].ToString() + "','" + dt.Rows[i]["QoOpacking"].ToString() + "','" + dt.Rows[i]["QoOpackage"].ToString() + "','" + dt.Rows[i]["Place"].ToString() + "','" + dt.Rows[i]["PartState"].ToString() + "','" + dt.Rows[i]["PullMode"].ToString() + "','" + dt.Rows[i]["Shkw"].ToString() + "','" + dt.Rows[i]["Time"].ToString() + "')");
                    }
                    return base.Event_Agree_After(args);
                }
            }
            return base.Event_Agree_After(args);
        }
    }

    }
   
