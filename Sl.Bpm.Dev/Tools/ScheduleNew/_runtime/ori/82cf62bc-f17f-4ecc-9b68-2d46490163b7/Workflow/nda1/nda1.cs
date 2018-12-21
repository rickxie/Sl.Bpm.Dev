using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Sl.Bpm.Application.Base;
using Sl.Bpm.Application.Module;
using Sl.Bpm.Engine;
using System;

namespace Sl.Bpm.AppPages.Workflow.nda1_8f6553237b024c2f941cf93a807072db
{
    /// <summary>
    /// 备件/辅料价格维护流程 \\Workflow\\nda1\\nda1.cs
    /// </summary>
    public class nda1 : WorkflowModuleBase
    {
        //TODO:自定义模块需要使用的方法
        //所有输入参数必须为 ArgsInput
        //输出参数可以为DataTable 和 简单类型
        //获取状态
        public result GetStatus(ArgsInput args)
        {
            var res = new result();
            try
            {
                var spuId = args["spuId"];//供应商代码
                var supPn = args["supPn"];//供应商零件号
                var standardUnit= args["standardUnit"];//标准单位 
                var monetaryUnit= args["monetaryUnit"];//货币单位
                var startDate= args["startDate"];//开始日期
                var dateClosed= args["dateClosed"];//结束日期
                var materialType= args["materialType"];//物料类型
                
                //判断供应商零件号、标准单位、货币单位、供应商代码系统中是否存在；
                DataTable dt = _db.GetDataTable("select * from Qad_Price where SupPartNum='"+ supPn + "'");//供应商零件号
                DataTable dt1 = _db.GetDataTable("select * from [pub].[supplier] where ad_addr='" + spuId + "'");//供应商编号
                DataTable dt2 = _db.GetDataTable("select * from [pub].[um_mstr] where um_um='" + standardUnit + "'");//标准单位 
                DataTable dt3 = _db.GetDataTable("select * from Qad_Price where Rouble='" + monetaryUnit + "'");//货币单位
                if (dt.Rows.Count < 1|| dt1.Rows.Count < 1 || dt2.Rows.Count < 1 || dt3.Rows.Count < 1|| Convert.ToDateTime(startDate)>= Convert.ToDateTime(dateClosed))
                {
                    //不存在
                    res.theImportStatus = "错误";
                    res.qadPnId = GetQad(materialType, spuId, supPn);
                    return res;
                }
                else {
                    //判断是否有包含新时间区间的时间区间
                    var sqlScript = @"select * from Qad_Price where SupPartNum='{0}'and SupcCode='{1}'and StandardUnit='{2}'and Rouble='{3}' and StartDate<='{4}' and EndDate>='{5}'";
                    sqlScript = string.Format(sqlScript, supPn , spuId, standardUnit, monetaryUnit, startDate, dateClosed);
                    DataTable dt4 = _db.GetDataTable(sqlScript);
                    if (dt4.Rows.Count < 1)
                    {
                        //没有包含时继续判断，新时间区间是否包含已有时间区间
                        var sqlScript5 = @"select distinct * from (select * from Qad_Price where SupPartNum='{0}'and SupcCode='{1}'and StandardUnit='{2}'and Rouble='{3}' 
                                        and (StartDate>='{4}' and StartDate<='{5}' )
                                        UNION ALL 
                                        select * from Qad_Price where SupPartNum='{0}'and SupcCode='{1}'and StandardUnit='{2}'and Rouble='{3}'
                                        and (EndDate>='{4}' and EndDate<='{5}')) a";
                        sqlScript5 = string.Format(sqlScript5, supPn, spuId, standardUnit, monetaryUnit, startDate, dateClosed);
                        DataTable dt5 = _db.GetDataTable(sqlScript5);
                        if (dt5.Rows.Count < 1)
                        {
                            //新增：组合是完全全新的，区间不在系统中
                            res.theImportStatus = "新增";
                            res.qadPnId = GetQad(materialType, spuId, supPn);
                            return res;
                        }
                        else {
                            res.theImportStatus = "错误";
                            res.qadPnId = GetQad(materialType, spuId, supPn);
                        }
                    }
                    else
                    {
                        //找到包含的最大组合
                        var StartDate1 = Convert.ToDateTime(dt4.Rows[0]["StartDate"].ToString());
                        var EndDate = Convert.ToDateTime(dt4.Rows[0]["EndDate"].ToString());
                        for (int i = 0; i < dt4.Rows.Count; i++)
                        {
                            if (Convert.ToDateTime(dt4.Rows[i]["StartDate"].ToString()) <= StartDate1 && Convert.ToDateTime(dt4.Rows[i]["EndDate"].ToString()) >= EndDate)
                            {
                                StartDate1 = Convert.ToDateTime(dt4.Rows[i]["StartDate"].ToString());
                                EndDate = Convert.ToDateTime(dt4.Rows[i]["EndDate"].ToString());
                            } else{
                                continue;
                            }
                        }
                        //查询最大组合中的所有组合
                        var sqlScript6 = @"select * from Qad_Price where SupPartNum='{0}'and SupcCode='{1}'and StandardUnit='{2}'and Rouble='{3}' and StartDate>='{4}' and EndDate<='{5}'";
                        sqlScript6 = string.Format(sqlScript6, supPn, spuId, standardUnit, monetaryUnit, StartDate1, EndDate);
                        DataTable dt6 = _db.GetDataTable(sqlScript6);
                        if (dt6.Rows.Count > 0)
                        {
                            for (int i = 1; i < dt6.Rows.Count; i++)
                            {
                                if (Convert.ToDateTime(startDate) < Convert.ToDateTime(dt6.Rows[i]["StartDate"].ToString()) && Convert.ToDateTime(dateClosed) > Convert.ToDateTime(dt6.Rows[i]["StartDate"].ToString()))
                                {
                                    //开始时间小于当前开始时间&&结束时间大于当前结束时间则区间重合‘错误’
                                    res.theImportStatus = "错误";
                                    res.qadPnId = GetQad(materialType, spuId, supPn);
                                    return res;
                                }
                                else if (Convert.ToDateTime(startDate) < Convert.ToDateTime(dt6.Rows[i]["EndDate"].ToString()) && Convert.ToDateTime(dateClosed) > Convert.ToDateTime(dt6.Rows[i]["EndDate"].ToString())) {
                                    //开始时间小于当前结束时间&&结束时间大于当前结束时间则区间重合‘错误’
                                    res.theImportStatus = "错误";
                                    res.qadPnId = GetQad(materialType, spuId, supPn);
                                    return res;
                                }
                                else
                                {
                                    continue;
                                }
                            }
                            res.theImportStatus = "更新";
                            res.qadPnId = GetQad(materialType, spuId, supPn);
                            return res;
                        }
                        else {
                            res.theImportStatus = "异常";
                            res.qadPnId = "";
                            return res;
                        }
                        
                    }
                }
                return res;
            }
            catch
            {
                res.theImportStatus = "异常";
                res.qadPnId = "";
                return res;
            }
        }
        //获取QAD零件号
        public string GetQad(string materialType, string spuId, string supPn)
        {
            
            try
            {
                //备品备件和生产性辅料需翻译出第一列的“QAD零件号”，其它不用翻译 
                if (materialType == "6b7de3f1-bff1-4939-a8b2-c3e689fa446d" || materialType == "c58bf04b-00ca-44bc-98cb-72d4d9e7ee80")
                {
                    //获取QAD零件号
                    var sqlScript = @"select QadPartNum from Qad_Parts
                             WHERE SupcCode='{0}' and SupPartNum='{1}'";
                    sqlScript = string.Format(sqlScript, spuId, supPn);
                    DataTable dt = _db.GetDataTable(sqlScript);
                    return dt.Rows[0][0].ToString();
                }
                else
                {
                    return "";
                }
            }
            catch
            {
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
                DataTable dt = _db.GetDataTable("select* from[dbo].[A1_T_01_det] a1d left join InstTask ins on ins.id=a1d.TaskId where ins.WfdWorkflowId = '96f0e070-6d46-493d-b9aa-4bd029e376a5' and ins.Status = '0' and a1d.SpuId='"+ spuId + "' and a1d.SupPn='"+ supPn + "'");//供应商零件号
                if (dt.Rows.Count > 0) {
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
        //public override EventParameter Event_Submit_After(EventParameter args)
        //{
        //    DataTable dt = _db.GetDataTable("select * from [dbo].[A1_T_01_det] where TaskId = '" + args.TaskId + "'");
        //    if (dt.Rows.Count > 0)
        //    {
        //        for (int i = 0; i < dt.Rows.Count; i++)
        //        {
        //            //插入数据 状态为0未生效
        //            _db.Execute("INSERT into Qad_Price(Id,QadPartNum,SupPartNum,SupcCode,PartName,StandardUnit,StartDate,EndDate,Rouble,Price,Status,ATaskId)VALUES(NEWID(),'" + dt.Rows[i]["QadPnId"].ToString() + "','"+ dt.Rows[i]["SupPn"].ToString() + "','"+ dt.Rows[i]["SpuId"].ToString() + "','"+ dt.Rows[i]["PnName"].ToString() + "','"+ dt.Rows[i]["StandardUnit"].ToString() + "','"+ dt.Rows[i]["StartDate"].ToString() + "','"+ dt.Rows[i]["DateClosed"].ToString() + "','"+ dt.Rows[i]["MonetaryUnit"].ToString() + "','"+ dt.Rows[i]["Price"].ToString() + "',0,'"+ args.TaskId + "')");
        //        }
        //        return base.Event_Submit_After(args);
        //    }
        //    return base.Event_Submit_After(args);
        //}
        //同意之后，判断流程是否结束，将数据插入Qad_Price
        public override EventParameter Event_Agree_After(EventParameter args)
        {
            //审批完成
            if (args.Parameter.NextProces.HaveEndProc)
            {
                //修改状态
                //_db.Execute("update Qad_Price set Status='1' WHERE ATaskId='" + args.TaskId + "'");
                //DataTable dt = _db.GetDataTable("select * from [dbo].[A1_T_01_det] where TaskId = '" + args.TaskId + "'");
                //if (dt.Rows.Count > 0)
                //{
                //    for (int i = 0; i < dt.Rows.Count; i++)
                //    {
                //        _db.Execute("update Qad_Price set Status='1' WHERE ATaskId='" + args.TaskId + "'");
                //    }

                //}
                DataTable dt = _db.GetDataTable("select * from [dbo].[A1_T_01_det] where TaskId = '" + args.TaskId + "'");
                if (dt.Rows.Count > 0)
                {
                    //判断是否有完全重叠的价格区间，重叠的区间做价格更新
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        //插入数据
                        _db.Execute("INSERT into Qad_Price(Id,QadPartNum,SupPartNum,SupcCode,PartName,StandardUnit,StartDate,EndDate,Rouble,Price,Status,ATaskId)VALUES(NEWID(),'" + dt.Rows[i]["QadPnId"].ToString() + "','" + dt.Rows[i]["SupPn"].ToString() + "','" + dt.Rows[i]["SpuId"].ToString() + "','" + dt.Rows[i]["PnName"].ToString() + "','" + dt.Rows[i]["StandardUnit"].ToString() + "','" + dt.Rows[i]["StartDate"].ToString() + "','" + dt.Rows[i]["DateClosed"].ToString() + "','" + dt.Rows[i]["MonetaryUnit"].ToString() + "','" + dt.Rows[i]["Price"].ToString() + "',1,'" + args.TaskId + "')");
                    }
                    return base.Event_Agree_After(args);
                }
            }
            return base.Event_Agree_After(args);
        }
        public List<DataTable> GetDate(string type, string spuId, string supPn, string pnName, string standardUnit)
        {
            //获取供应商零件号，标准单位
            List<DataTable> ls = new List<DataTable>();
            ls.Add(_db.GetDataTable("select distinct ad_addr from [pub].[supplier]"));
            ls.Add(_db.GetDataTable("select distinct um_um as id from pub.um_mstr"));
            return ls;
        }
    }
    public class result : MarshalByRefObject
    {
        public struct sampleType
        {
            public string name { get; set; }
        }
        public sampleType st { get; set; }
        public string theImportStatus { get; set; }
        public string qadPnId { get; set; }
    }
}