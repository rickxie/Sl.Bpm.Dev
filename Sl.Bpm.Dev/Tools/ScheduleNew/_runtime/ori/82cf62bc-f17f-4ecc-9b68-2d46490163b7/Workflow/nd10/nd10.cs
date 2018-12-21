using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Sl.Bpm.Application.Base;
using Sl.Bpm.Application.Module;
using Sl.Bpm.Engine;
namespace Sl.Bpm.AppPages.Workflow.nd10_be1d39dad3ad49669465629cce33f521
{
    /// <summary>
    /// 采购数据新增流程 \\Workflow\\nd10\\nd10.cs
    /// </summary>
    public class nd10 : WorkflowModuleBase
    {
        public override EventParameter Event_Agree_After(EventParameter args)
        {
            //审批完成
            if (args.Parameter.NextProces.HaveEndProc)
            {
                DataTable dt = _db.GetTable("select * from [dbo].[ND_T_10_det] where TaskId = '" + args.TaskId + "'");
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        //插入数据
                        _db.Execute("INSERT into Purchasing_Data(Id,Pnumber,Pname,Sunit,Supplier,UuPrice,Currency,Punit,Uconversion,Rate,Sdate,Enddate,MoPayment,MoQuantity,ToPackage,QoOpacking,QoOpackage,Traytype,BpPallet,Status,ATaskId)VALUES(NEWID(),'" + dt.Rows[i]["Pnumber"].ToString() + "','" + dt.Rows[i]["Pname"].ToString() + "','" + dt.Rows[i]["Sunit"].ToString() + "','" + dt.Rows[i]["Supplier"].ToString() + "','" + dt.Rows[i]["UuPrice"].ToString() + "','" + dt.Rows[i]["Currency"].ToString() + "','" + dt.Rows[i]["Punit"].ToString() + "','" + dt.Rows[i]["Uconversion"].ToString() + "','" + dt.Rows[i]["Rate"].ToString() + "','" + dt.Rows[i]["Sdate"].ToString() + "','" + dt.Rows[i]["Enddate"].ToString() + "','" + dt.Rows[i]["MoPayment"].ToString() + "','" + dt.Rows[i]["MoQuantity"].ToString() + "','" + dt.Rows[i]["ToPackage"].ToString() + "','" + dt.Rows[i]["QoOpacking"].ToString() + "','" + dt.Rows[i]["QoOpackage"].ToString() + "','" + dt.Rows[i]["Traytype"].ToString() + "','" + dt.Rows[i]["BpPallet"].ToString() + "',1,'" + args.TaskId + "')");
                    }
                    return base.Event_Agree_After(args);
                }
            }
            return base.Event_Agree_After(args);
        }
        //时间区间判断
        public int GetTimeStatus(ArgsInput args)
        {
            var res = 0;
            var supplier = args["supplier"];//供应商代码
            var pnumber = args["pnumber"];//供应商零件号
            var sdate = args["sdate"];//开始时间 
            var enddate = args["enddate"];//结束时间 

            var sqlstrA = @"select * from Purchasing_Data  where   Pnumber = '{0}' and supplier= '{1}' and
                            (('{2}'<=Sdate  and '{3}'>=Sdate and '{4}' between Sdate and Enddate) or 
                            ('{5}'<=Enddate  and '{6}'>=Enddate and  '{7}' between Sdate and Enddate)) ";
            DataTable dt = _db.GetTable(string.Format(sqlstrA, pnumber, supplier,sdate, enddate, enddate, sdate, enddate , sdate ));
            if (dt.Rows.Count > 0)
            { res = 1; }
            else { res = 0; }
            return res;
        }
    }
     
}

















