using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Sl.Bpm.Application.Module;
using Sl.Bpm.Engine.Db;
using System;
using System.Globalization;
using System.Text;

namespace Sl.Bpm.AppPages.Func.food01_8b52bbe6052e409d94a137327f2ba0ab
{
    /// <summary>
    /// 员工订餐 \\Function\\food01\\food01.cs
    /// </summary>
    public class food01 : PageModuleBase
    {
        //TODO:自定义模块需要使用的方法
        //所有输入参数必须为 ArgsInput
        //输出参数可以为DataTable 和 简单类型
        public int NormalPkgType = 99999;
        public bool DebugCode = true;//是否调试代码
        public string NormalPkgTypeName = "默认套餐";
        public int historyDays = 90;//三个月内
        public Dictionary<DayOfWeek, string> dayOfWeekDict = new Dictionary<DayOfWeek, string>() {
            {DayOfWeek.Monday,"周一" },
            {DayOfWeek.Tuesday,"周二" },
            {DayOfWeek.Wednesday,"周三" },
            {DayOfWeek.Thursday,"周四" },
            {DayOfWeek.Friday,"周五" },
            {DayOfWeek.Saturday,"周六" },
            {DayOfWeek.Sunday,"周日" }
        };
        IFormatProvider ifp = new CultureInfo("zh-CN", true);
        public DateTime testDateTimeNow = DateTime.Now.AddDays(-1);// 测试调试代码
        double deadline = 20;//截止时间，比如今天晚上八点后就不能修改订单了，则设定为20 
        public food01()
        {
            if (this.DebugCode)
            {
                this.testDateTimeNow = DateTime.Now.AddDays(-20);
            }
        }
        public List<string> GetAvailableDate()
        {
            List<string> result = new List<string>();
            var now = testDateTimeNow;//DateTime.Now.AddDays(-55);//调试代码.AddDays(-15)
            var week = now.DayOfWeek;
            var startDate = now.AddDays(1);//默认，订餐日期为下一个工作日,
            var endDate = startDate;//
            switch (week)
            {
                case DayOfWeek.Monday:
                    {
                        endDate = now.AddDays(6);
                        break;
                    }
                case DayOfWeek.Tuesday:
                    {
                        endDate = now.AddDays(5);
                        break;
                    }
                case DayOfWeek.Wednesday:
                    {
                        endDate = now.AddDays(4);
                        break;
                    }
                case DayOfWeek.Thursday:
                    {
                        endDate = now.AddDays(3);
                        break;
                    }
                case DayOfWeek.Friday:
                    {
                        endDate = now.AddDays(2);
                        break;
                    }
                case DayOfWeek.Saturday:
                    {
                        startDate = now.AddDays(2);//下一周的星期一开始
                        endDate = now.AddDays(1 + 7);// 结束于下一周的周日
                        break;
                    }
                case DayOfWeek.Sunday:
                    {
                        startDate = now.AddDays(1);//下一周的星期一开始
                        endDate = now.AddDays(7);// 结束于下一周的周日
                        break;
                    }
            }
            if (DebugCode)
            {
                startDate = now.AddDays(1);//调试的当前日期
                endDate = startDate.AddDays(7);// 7个自然日往后的工作日
            }
            var sql = @"select Day from [dbo].[BpmCalendar] where Day between '"+startDate.ToString("yyyy-MM-dd")+"' and '"+endDate.ToString("yyyy-MM-dd")+"'"+" and type=1 order by day";
            var data = DBHelper.RunDataTableSQL(sql);
            foreach (DataRow day in data.Rows)
            {
                DateTime date = (DateTime)day["Day"];
                result.Add(date.ToString("yyyy-MM-dd"));
            }
            return result;
        }
        public object GetCurUserAvailableOrdFood(ArgsInput args)
        {
            string errMsg = null;
            var employeeId = args["employeeId"];
            var userId = args["userId"];
            List<FoodOrder> result = new List<FoodOrder>();
            List<Pkgs> pkgs = new List<Pkgs>();
            try
            {
                if (DebugCode)
                {
                    var orderStartDate = args["orderStartDate"] ?? DateTime.Now.ToString("yyyy-MM-dd");
                    this.testDateTimeNow = DateTime.ParseExact(orderStartDate, "yyyy-MM-dd", ifp);
                    var deadlineTime = DateTime.ParseExact(args["deadline"] ?? DateTime.Now.ToString("yyyy-MM-dd HH:mm"), "yyyy-MM-dd HH:mm", ifp);
                    this.deadline = deadlineTime.Hour + deadlineTime.Minute / 60.0;
                }
                List<string> dateList = GetAvailableDate();
                if (dateList.Count == 0)
                {
                    throw new Exception("暂无可用订餐日期");
                }
                string orderSql = @"select * from t_orderfood where userId='"+userId+"'"+" and TargetDate between '"+dateList.FirstOrDefault()+"'"+" and '"+dateList.LastOrDefault()+"' and status in (0,1)";// 选择该用户在这个时间段内已经下过单的记录
                var existOrders = DBHelper.RunDataTableSQL(orderSql);// 
                var date2ExistOrdersDict = new Dictionary<string, List<PkgOrder>>();
                foreach (DataRow row in existOrders.Rows)
                {
                    string date = ((DateTime)row["TargetDate"]).ToString("yyyy-MM-dd");
                    pkgs = GetPackages(date);
                    var pkgType = row["PackageType"].ToString();
                    var pkgObj = pkgs.FirstOrDefault(pkg => pkg.PkgType == pkgType);
                    var pkgOrder = new PkgOrder()
                    {
                        pkgType = pkgType,
                        pkgTypeName = pkgObj!=null?pkgObj.PkgTypeName:NormalPkgTypeName,
                        quantity = int.Parse(row["Quantity"].ToString()),
                        targetDate = date
                    };
                    if (date2ExistOrdersDict.ContainsKey(date))
                    {
                        date2ExistOrdersDict[date].Add(pkgOrder);
                    }
                    else
                    {
                        date2ExistOrdersDict.Add(date, new List<PkgOrder>() { pkgOrder });
                    }
                }
                foreach (var date in dateList)
                {
                    DateTime oneDayBeforeTargetDate = DateTime.ParseExact(date, "yyyy-MM-dd", ifp).AddDays(-1);//预定日期前一天
                    var now = testDateTimeNow;
                    var deadTime = oneDayBeforeTargetDate.AddHours(deadline);
                    if (date2ExistOrdersDict.ContainsKey(date))
                    {// 这一天的是要修改的数据
                        if (deadTime > now)
                        {// 还可以修改，否则不能修改
                            result.Add(new FoodOrder()
                            {
                                statusName = "已预订",
                                targetDate = date,
                                dayOfWeek= dayOfWeekDict[DateTime.ParseExact(date, "yyyy-MM-dd", ifp).DayOfWeek],
                                status = 1,
                                pkgOrders = date2ExistOrdersDict[date],
                                total = date2ExistOrdersDict[date].Sum(pkgO => pkgO.quantity)
                            });
                        }
                    }
                    else
                    {// 这一天的还没有下过订单


                        if (deadTime > now)
                        {// 如果还没到达截止时间，还可以下单
                            pkgs = GetPackages(date);
                            result.Add(new FoodOrder()
                            {
                                statusName = "未预定",
                                targetDate = date,
                                dayOfWeek = dayOfWeekDict[DateTime.ParseExact(date, "yyyy-MM-dd", ifp).DayOfWeek],
                                status = 0,
                                pkgOrders = pkgs.Select(pkg => {
                                    return new PkgOrder()
                                    {
                                        pkgType = pkg.PkgType,
                                        pkgTypeName = pkg.PkgTypeName,
                                        quantity = 0,
                                        targetDate = date
                                    };
                                }).ToList()
                            });
                        }
                    }

                }
                var delSql = @"delete from t_orderfood where UserId='"+userId+"' and TargetDate < '"+testDateTimeNow.ToString("yyyy-MM-dd")+"' and Quantity=0";//删除当前用户，在当前日期之前的无效(订餐数量是0)订餐记录
                DBHelper.ExecuteSql(delSql);
            }
            catch (Exception e)
            {
                errMsg = e.Message;
            }
            return new
            {
                success = errMsg == null,
                result = new
                {
                    pkgs,
                    orders = result,
                    sum = result.Where(order => order.status != 0)// 已经订餐的
                    .Select(o => o.pkgOrders.Sum(pkgo => pkgo.quantity)).Sum(n => n)// 各个套餐类型的总数
                },
                errMsg
            };

        }
        public object GetOrderReports(ArgsInput args)
        {
            List<OrderReport> reports = new List<OrderReport>();
            var userId = args["userId"];
            bool hasReport = true;
            //if (userId != "")
            //{//没有权限，直接返回
            //    return new
            //    {
            //        reports,
            //        hasReport=false
            //    };
            //}
            try
            {
                List<string> dateList = GetAvailableDate();
                string date = dateList.FirstOrDefault();
                var startDate = args["startDate"] ?? date;
                var endDate = args["endDate"] ?? startDate;
                var data = _db.GetTable(@"with _T as 
                                        ( SELECT SUM(Quantity) Quantity,TargetDate,PackageType FROM [Yfss.Bpm].[dbo].[t_orderfood] 
                                            where Status not in (0,1) --非已预定和未预定的 
                                            group by PackageType,TargetDate
                                            having TargetDate between @startDate and @endDate
                                        )
                                        select Quantity,TargetDate,PkgTypeName,PackageType
                                        from _T 
                                        left join
                                        t_ord_packages
                                        on PackageType = PkgType", new { startDate, endDate });
                foreach (DataRow row in data.Rows)
                {
                    var pkgType = row["PackageType"].ToString();
                    var targetDate = ((DateTime)row["TargetDate"]).ToString("yyyy-MM-dd");
                    var pkgTypeName = row["PkgTypeName"].ToString();
                    int quantity = int.Parse(row["quantity"].ToString());
                    var report = reports.FirstOrDefault(r => r.TargetDate == targetDate);

                    var pkgOrder = new PkgOrder()
                    {
                        pkgType = pkgType,
                        quantity = quantity,
                        pkgTypeName = pkgTypeName,
                        targetDate = targetDate
                    };
                    if (int.Parse(pkgType) == NormalPkgType)
                    {//默认类型
                        if (report != null)
                        {
                            // 直接汇总
                            report.PkgOrders[0].quantity += quantity;
                        }
                        else
                        {// 分类型汇总
                            reports.Add(new OrderReport()
                            {
                                TargetDate = targetDate,
                                PkgOrders = new List<PkgOrder>() { pkgOrder }
                            }
                            );
                        }
                    }
                    else
                    {//多个套餐类型
                        if (report != null)
                        {
                            report.PkgOrders.Add(pkgOrder);
                        }
                        else
                        {
                            reports.Add(new OrderReport()
                            {
                                TargetDate = targetDate,
                                PkgOrders = new List<PkgOrder>() {
                                pkgOrder
                            }
                            }
                            );
                        }
                    }


                }
            }
            catch
            {
                //Client.Controllers.Utils.LogIntoDb("get-order-food-report", "获取报表失败，" + e.Message);
                hasReport = false;
            }

            return new
            {
                reports,
                hasReport//如果没有权限，返回false
            };

        }
        [Serializable]
        public class OrderReport : MarshalByRefObject
        {
            public string TargetDate { set; get; }
            public List<PkgOrder> PkgOrders { set; get; }
        }
        [Serializable]
        public class PkgOrder : MarshalByRefObject
        {
            public string pkgType { set; get; }
            public string pkgTypeName { set; get; }
            public int quantity { set; get; }
            public string targetDate { set; get; }
        }
        [Serializable]
        public class FoodOrder : MarshalByRefObject
        {
            public string statusName { set; get; }
            public string targetDate { set; get; }
            public int status { set; get; }
            public List<PkgOrder> pkgOrders { set; get; }
            public int total { set; get; }
            public string dayOfWeek { set; get; }

        }
        public List<Pkgs> GetPackages(string date)
        {//只要往数据库中插入一条固定类型的套餐数据，如果当天没有套餐可以选择，则选择这条特殊套餐类型
            List<Pkgs> res = new List<Pkgs>();
            // 选取这一天的套餐类型 2018-09-14
            var week = DateTime.ParseExact(date, "yyyy-MM-dd", ifp).DayOfWeek;
            string sql = null;
            if (week == DayOfWeek.Friday)
            {// 星期五有套餐可以选择
                sql = @"SELECT 
                               [Id]
                              ,[TaskId]
                              ,[SnNumber]
                              ,[CreationTime]
                              ,[PkgType]
                              ,[PkgTypeName]
                              ,[IsEnable]
                          FROM [Yfss.Bpm].[dbo].[t_ord_packages] where IsEnable='1' and [PkgType] <> 99999";


            }
            else
            {
                //[PkgType]=99999是特殊类型的套餐 ,可以自行配置
                sql = @"SELECT 
                               [Id]
                              ,[TaskId]
                              ,[SnNumber]
                              ,[CreationTime]
                              ,[PkgType]
                              ,[PkgTypeName]
                              ,[IsEnable]
                          FROM [Yfss.Bpm].[dbo].[t_ord_packages] where IsEnable='1' and [PkgType]=99999";
            }
            var data = DBHelper.RunDataTableSQL(sql);
            foreach (DataRow r in data.Rows)
            {
                res.Add(new Pkgs()
                {
                    PkgType = r["PkgType"].ToString(),
                    PkgTypeName = r["PkgTypeName"].ToString()
                });
            }
            return res;
        }

        [Serializable]
        public class Pkgs : MarshalByRefObject
        {
            public string PkgType { set; get; }
            public string PkgTypeName { set; get; }

        }
        public object PlaceOrders(ArgsInput args)
        {
            string errMsg = null;
            try
            {
                string jsonStr = args["orders"];
                List<FoodOrder> orders = new List<FoodOrder>();
                try
                {
                    orders = Deserialize<List<FoodOrder>>(jsonStr);

                }
                catch 
                {
                    throw new Exception("订单填写有误,请检查订餐数量格式");
                }
                if (DebugCode)
                {
                    var placeOrderTime = args["placeOrderTime"] ?? DateTime.Now.ToString("yyyy-MM-dd HH:mm");
                    this.testDateTimeNow = DateTime.ParseExact(placeOrderTime, "yyyy-MM-dd HH:mm", ifp);
                    var deadlineTime = DateTime.ParseExact(args["deadline"] ?? DateTime.Now.ToString("yyyy-MM-dd HH:mm"), "yyyy-MM-dd HH:mm", ifp);
                    this.deadline = deadlineTime.Hour + deadlineTime.Minute / 60.0;
                }
                string empNumber = args["employeeId"];
                string userId = args["userId"];
               DataTable wxUserData= _db.GetTable(@"select wxUserId from [Yfss.Bpm].[dbo].[t_wx_oauth_login_users] where UserId=@UserId", new { UserId =userId});
                if (wxUserData.Rows.Count==0) {
                    throw new Exception("您的身份无法下单");
                }
                string wxUserId = wxUserData.Rows[0]["wxUserId"].ToString();
                List<string> invalidOrders = new List<string>();
                List<string> availableDate = GetAvailableDate();
                foreach (FoodOrder order in orders)
                {
                    //2018-09-13
                    var pkgs = GetPackages(order.targetDate);
                    DateTime oneDayBeforeTargetDate = DateTime.ParseExact(order.targetDate, "yyyy-MM-dd", ifp).AddDays(-1);//预定日期前一天
                    var now = testDateTimeNow;// DateTime.Now;
                    var deadTime = oneDayBeforeTargetDate.AddHours(deadline);
                    if (deadTime < now || !availableDate.Contains(order.targetDate))
                    {// 预定日期前一天晚上八点之后，或者该日期已经不能下单
                        if (deadTime < now)// 预定日期前一天晚上8点钟前可以修改，否则不能修改
                        {// 这个订单,如果是订单状态为已下单，应该改变状态为处理中了
                            _db.Query<dynamic>(@"update t_orderfood set status=2,statusName='处理中' where convert(varchar(100),targetDate,111)=@targetDate and userId=@userId and status=1 and Quantity>0", new { targetDate = order.targetDate.Replace("-", "/"), userId, });

                        }
                        //删除改用户对应日期的无效单子      // 订单无效
                        _db.Query<dynamic>(@"delete from t_orderfood  where convert(varchar(100),targetDate,111)=@targetDate and userId=@userId and status in(0,1) and Quantity=0", new { targetDate= order.targetDate.Replace("-", "/") , userId });
                        invalidOrders.Add(order.targetDate);
                    }
                    else
                    {// 订单有效
                        foreach (PkgOrder pkgO in order.pkgOrders)
                        {// 更新每一条记录
                            _db.Query<dynamic>(@"
            if exists (
                select *
                    from t_orderfood o
                where userId=@UserId
                    and PackageType=@PackageType
                    and convert(varchar(100),targetDate,111)=@TargetDate
                    and status in (0,1)
                )
            begin
                update t_orderfood set quantity=@Quantity,                                                        status=@Status,statusName=@StatusName where userId=@userId and PackageType=@PackageType
                    and convert(varchar(100),targetDate,111)=@TargetDate
                    and status in (0,1)
            end
        else
            begin
                insert into t_orderfood
                    (Id,TaskId,SnNumber,CreationTime,EmployeeId,Department,Remarks,Quantity,PackageType,[Status],StatusName,TargetDate,UserId,XUserId)
                values(NEWID(), NEWID(), NEWID(), GETDATE(), @EmpNumber, '', '下单备注', @Quantity, @PackageType, @Status, @StatusName, @TargetDate, @UserId, @XUserId)
            end
",
                            new
                            {
                                UserId = userId,
                                PackageType = pkgO.pkgType,
                                TargetDate = order.targetDate.Replace("-", "/"),
                                Quantity = pkgO.quantity,
                                Status= pkgO.quantity != 0 ? 1 : 0,
                                StatusName= pkgO.quantity != 0 ? "已预订" : "未预定",
                                EmpNumber= empNumber,
                                XUserId=wxUserId
                            });

                        }
                    }


                }
                if (invalidOrders.Count > 0)
                {
                    throw new Exception(string.Join("，", invalidOrders) + " 的订单已过期！" + string.Join("，", availableDate.Except(invalidOrders)) + " 下单成功!");
                }
            }
            catch (Exception e)
            {
                errMsg = e.Message;
            }
            return new
            {
                success = errMsg == null,
                errMsg
            };
        }
        public List<OrderClass> GetHistoryOrders(ArgsInput args)
        {
            List<OrderClass> hOrders = new List<OrderClass>();
            string defaultPkgName = "默认套餐";
            string userId = args["userId"];
            int pageSize = int.Parse(args["pageSize"] ?? "15");
            int currentPage = int.Parse(args["currentPage"] ?? "1");
            if (DebugCode)
            {
                var orderStartDate = args["orderStartDate"] ?? DateTime.Now.ToString("yyyy-MM-dd");
                testDateTimeNow = DateTime.ParseExact(orderStartDate, "yyyy-MM-dd", ifp);
            }
            var now = testDateTimeNow;// DateTime.Now;
            string errMsg = null;
            try
            {
                var data = _db.GetTable(@"SELECT * FROM(SELECT ROW_NUMBER() OVER(ORDER BY TargetDate) AS RowNum, *   FROM t_orderfood WHERE UserId=@UserId and Quantity>0 and status not in(0,1) and TargetDate between @StartTime and @EndTime ) AS RowConstrainedResult WHERE  RowNum >= @StartRowNumber AND RowNum <= @EndRowNumber  ORDER BY RowNum", 
                    new { UserId =userId,StartTime= now.AddDays(-historyDays),EndTime= DateTime.Now.AddDays(1) ,StartRowNumber= (currentPage - 1) * pageSize + 1 , EndRowNumber = currentPage * pageSize });
                foreach (DataRow r in data.Rows)
                {
                    int Quantity;
                    int Status;
                    string targetDate = ((DateTime)r["TargetDate"]).ToString("yyyy-MM-dd");
                    var pkgs = GetPackages(targetDate);
                    var pkgObj = pkgs.FirstOrDefault(pkg => pkg.PkgType == r["PackageType"].ToString());
                    string pkgName = pkgObj!=null? pkgObj.PkgTypeName: defaultPkgName;
                    if (int.TryParse(r["Quantity"].ToString(), out Quantity) && int.TryParse(r["Status"].ToString(), out Status))
                    {
                        int pkgType;
                        int.TryParse(r["PackageType"].ToString(), out pkgType);
                        hOrders.Add(new OrderClass()
                        {
                            Quantity = Quantity,
                            Status = Status,
                            PackageType = pkgType,
                            StatusName = r["StatusName"].ToString(),
                            Remark = r["Remarks"].ToString(),
                            PackageTypeName = pkgName,
                            TargetDate = targetDate,
                            DayOfWeek = dayOfWeekDict[DateTime.ParseExact(targetDate, "yyyy-MM-dd", ifp).DayOfWeek],
                        });
                    }
                }
            }
            catch (Exception e)
            {
                errMsg = e.Message;
            }

            return hOrders;
        }

        [Serializable]
        public class OrderClass: MarshalByRefObject
        {
            //"quantity":1,"statusName":"未预定","status":0,"packageType":"6","targetDate":"2018-09-05"
            public int? Quantity { set; get; }
            public int? Status { set; get; }
            public int? PackageType { set; get; }
            public string PackageTypeName { set; get; }
            public string StatusName { set; get; }
            public string TargetDate { set; get; }
            public string Remark { set; get; }
            public string DayOfWeek { set; get; }

        }
    }
}