using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Sl.Bpm.Application.Base;
using Sl.Bpm.Application.Module;
using Sl.Bpm.Engine;
using System;

namespace Sl.Bpm.AppPages.Workflow.pur01_e19011576d9843c68c7d4e4ab5f1a898
{
    /// <summary>
    /// 采购数据维护流程 \\Workflow\\pur01\\pur01.cs
    /// </summary>
    public class nda0 : WorkflowModuleBase
    {
        //TODO:自定义模块需要使用的方法
        //所有输入参数必须为 ArgsInput
        //输出参数可以为DataTable 和 简单类型

        public string GetQAD(ArgsInput args)
        {
            //var res = new result();
            try
            {
                var spuId = args["spuId"];//供应商代码
                var supPn = args["supPn"];//供应商零件号
                var type = args["type"];
                var materialType= args["materialType"];
                //if (type == "0")
                //{
                //    var pnName = args["pnName"];//
                //    var standardUnit = args["standardUnit"];//
                //    var taskId = args["taskId"];//
                //    //根据规则生成零件号，备件9开头，辅料8开头，包材7开头，长度8位。
                //    if (materialType == "18601d04-cd2a-45a3-b069-328c4181b0b9")
                //    {
                //        //获取最大QAD辅料零件号
                //        var qadnum = GetQADMax("8", spuId, supPn, pnName, standardUnit, taskId);
                //        return qadnum;
                //    }
                //    else if (materialType == "e87e3115-9107-4a03-b79b-f4d2a527a573")
                //    {
                //        //获取最大QAD备件零件号
                //        var qadnum = GetQADMax("9", spuId, supPn, pnName, standardUnit, taskId);
                //        return qadnum;
                //    }
                //    else if (materialType == "50b79276-141c-461f-884e-750c4e473e73")
                //    {
                //        //获取最大QAD包材零件号
                //        var qadnum = GetQADMax("7", spuId, supPn, pnName, standardUnit, taskId);
                //        return qadnum;
                //    }
                //    return "";
                //}
                //else
                if (type == "1"|| type == "0") {
                    //获取QAD零件号 
                    var sqlScript = @"select QadPartNum,StandardUnit,PartName from Qad_Parts
                             WHERE SupcCode='{0}' and SupPartNum='{1}' and Status!='7'";
                    sqlScript = string.Format(sqlScript, spuId, supPn);
                    DataTable dt = _db.GetDataTable(sqlScript);
                    if (dt.Rows.Count < 1)
                    {
                        //res.Type = "";
                        //res.StandardUnit ="";
                        //res.PartName = "";
                        //res.QadPartNum = "";
                        //return res;
                        return "";
                     }
                    else
                    {
                        //返回零件号
                        //res.Type = "";
                        //res.StandardUnit = "";
                        //res.PartName = "";
                        //res.QadPartNum = dt.Rows[0][0].ToString();
                        //return res;
                        return dt.Rows[0][0].ToString();
                    }
                }
                else if (type == "2")
                {
                        //获取QAD零件号 状态为7的为删除的数据，显示新增
                        var sqlScript = @"select QadPartNum,StandardUnit,PartName from Qad_Parts
                             WHERE SupcCode='{0}' and SupPartNum='{1}' and Status!='7'";
                        sqlScript = string.Format(sqlScript, spuId, supPn);
                        DataTable dt = _db.GetDataTable(sqlScript);
                        if (dt.Rows.Count < 1)
                        {
                        //res.Type = "新增";
                        //res.StandardUnit = "";
                        //res.PartName = "";
                        //res.QadPartNum = "";
                        //return res;
                        return "新增";

                    }
                        else
                        {
                        //res.Type = "重复申请";
                        //res.StandardUnit = dt.Rows[0]["StandardUnit"].ToString();
                        //res.PartName = dt.Rows[0]["PartName"].ToString();
                        //res.QadPartNum = dt.Rows[0]["QadPartNum"].ToString();
                        //return res;
                        return "重复申请";
                    }
                }
                else
                {
                    //res.Type = "";
                    //res.StandardUnit = "";
                    //res.PartName = "";
                    //res.QadPartNum = "";
                    //return res;
                    return "";
                }               
            }
            catch
            {
                //res.Type = "";
                //res.StandardUnit = "";
                //res.PartName = "";
                //res.QadPartNum = "";
                //return res;
                return "";
            }
        }
        //判断是否有零件组合在审批中
        public string GetUnderApproval(ArgsInput args)
        {

            try
            {
                var spuId = args["spuId"];//供应商代码
                var supPn = args["supPn"];//供应商零件号
                DataTable dt = _db.GetDataTable("select* from [dbo].[A0_T_01_det] a1d left join InstTask ins on ins.id=a1d.TaskId where ins.WfdWorkflowId = 'e42137dc-1c57-452a-854e-155edafe2aa7' and ins.Status = '0' and a1d.SpuId = '" + spuId + "' and a1d.SupPn = '" + supPn + "'");//供应商零件号
                if (dt.Rows.Count > 0)
                {
                    return "审批中";
                }
                return "";
            }
            catch
            {
                return "";
            }
        }
        //提交之后将数据插入Qad_Price
        public override EventParameter Event_Submit_After(EventParameter args)
        {
            DataTable dt = _db.GetDataTable("select * from [dbo].[A0_T_01_det] where TaskId = '" + args.TaskId + "' and TheImportStatus='新增'");
            if (dt.Rows.Count > 0)
            {
                var materialType = args.Fields.GetOneFieldValueByName("A0_T_01.materialType");
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    var qadnum = "";
                    //插入数据 状态为0未生效
                    //根据规则生成零件号，备件9开头，辅料8开头，包材7开头，长度8位。
                    if (materialType == "18601d04-cd2a-45a3-b069-328c4181b0b9"|| materialType == "422111f3-10b3-449f-86b3-87925c800899")
                    {
                        //获取最大QAD辅料零件号
                        qadnum = GetQADMax("8", dt.Rows[i]["spuId"].ToString(), dt.Rows[i]["supPn"].ToString(), dt.Rows[i]["pnName"].ToString(), dt.Rows[i]["standardUnit"].ToString(), dt.Rows[i]["taskId"].ToString());
                    }
                    else if (materialType == "e87e3115-9107-4a03-b79b-f4d2a527a573"|| materialType == "48ce3364-bcd3-4608-b12c-297c63d1545b")
                    {
                        //获取最大QAD备件零件号
                        qadnum = GetQADMax("9", dt.Rows[i]["spuId"].ToString(), dt.Rows[i]["supPn"].ToString(), dt.Rows[i]["pnName"].ToString(), dt.Rows[i]["standardUnit"].ToString(), dt.Rows[i]["taskId"].ToString());
                    }
                    else if (materialType == "50b79276-141c-461f-884e-750c4e473e73"|| materialType == "908d1b1d-dcb1-4fcb-8761-05031af7b6a3")
                    {
                        //获取最大QAD包材零件号
                        qadnum = GetQADMax("7", dt.Rows[i]["spuId"].ToString(), dt.Rows[i]["supPn"].ToString(), dt.Rows[i]["pnName"].ToString(), dt.Rows[i]["standardUnit"].ToString(), dt.Rows[i]["taskId"].ToString());
                        
                    }
                    if (qadnum != "") {
                        _db.Execute("INSERT INTO Qad_Parts (Id,QadPartNum,SupPartNum,SupcCode,PartName,StandardUnit,Status,ATaskId)VALUES (Newid(),'" + qadnum + "','" + dt.Rows[i]["supPn"].ToString() + "','" + dt.Rows[i]["spuId"].ToString() + "','" + dt.Rows[i]["pnName"].ToString() + "','" + dt.Rows[i]["standardUnit"].ToString() + "','0','" + dt.Rows[i]["taskId"].ToString() + "')");
                    }
                }
                return base.Event_Agree_After(args);
            }

            return base.Event_Submit_After(args);
        }
        public string GetQADMax(string type, string spuId, string supPn, string pnName, string standardUnit,string taskId)
        {
            try
            {
                DataTable dt = _db.GetDataTable("select max(QadPartNum) as QadPartNum from Qad_Parts where QadPartNum like '" + type+"%' and len(QadPartNum)=8");
                if (dt.Rows[0]["QadPartNum"].ToString()==""|| dt.Rows[0]["QadPartNum"].ToString()==null)
                {
                    //首个零件号
                    return type +"0000001";
                }
                else {
                    int qadnum=int.Parse(dt.Rows[0]["QadPartNum"].ToString());
                    qadnum += 1;
                    return qadnum.ToString();
                }
            }
            catch
            {
                return "";
            }
        }

        public override EventParameter Event_Agree_After(EventParameter args)
        {
            //流程删除后判断在‘当前组合’是否存在在‘当前流程’后发起的流程中，如果存在判断流程是否有已审批完成的和正在审批中的，有则不做任何操作，无将把零件状态置为‘7’
            //if (args.NodeCode == "NDA0-03")//ERP数据员入录后将数据状态修改
            if (args.Parameter.NextProces.HaveEndProc)//流程结束后修改数据
                {
                DataTable dt = _db.GetDataTable("select QadPnId, SupPn, SpuId, PnName, StandardUnit from A0_T_01_det where TaskId = '"+ args.TaskId + "'");
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        //查询QAD零件表中是否已保存过
                        //DataTable dt1 = _db.GetDataTable("select * from Qad_Parts where QadPartNum='" + dt.Rows[i]["QadPnId"].ToString() + "'");
                        //if (dt1.Rows.Count > 0)
                        //{
                        //    continue;
                        //}
                        //else
                        //{
                        //    _db.Execute("INSERT INTO Qad_Parts (Id,QadPartNum,SupPartNum,SupcCode,PartName,StandardUnit)VALUES (Newid(),'" + dt.Rows[i]["QadPnId"].ToString() + "','" + dt.Rows[i]["SupPn"].ToString() + "','" + dt.Rows[i]["SpuId"].ToString() + "','" + dt.Rows[i]["PnName"].ToString() + "','" + dt.Rows[i]["StandardUnit"].ToString() + "')");                            
                        //}

                        //修改零件状态
                        _db.Execute("update Qad_Parts set [Status]='1' where QadPartNum='"+ dt.Rows[i]["QadPnId"].ToString() + "'");
                    }
                    return base.Event_Agree_After(args);
                }
            }
            return base.Event_Agree_After(args);
        }

        public List<DataTable> GetUmAndSup(string type, string spuId, string supPn, string pnName, string standardUnit)
        {
            //获取供应商零件号，标准单位
                List<DataTable> ls = new List<DataTable>();
                ls.Add (_db.GetDataTable("select distinct ad_addr from [pub].[supplier]"));
                ls.Add(_db.GetDataTable("select distinct um_um as id from pub.um_mstr"));
            return ls;
        }

    }
    //public class result:MarshalByRefObject
    //{
    //    public struct sampleType
    //    {
    //        public string name { get; set; }
    //    }
    //    public sampleType st { get; set; }
    //    public string Type { get; set; }
    //    public string StandardUnit { get; set; }
    //    public string PartName { get; set; }
    //    public string QadPartNum { get; set; }
    //}
}