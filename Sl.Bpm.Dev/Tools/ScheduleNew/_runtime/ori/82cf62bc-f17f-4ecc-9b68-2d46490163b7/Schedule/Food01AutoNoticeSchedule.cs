/*===================================================
 * 类名称: Food01AutoNoticeSchedule
 * 文件名: \Schedule\Food01AutoNoticeSchedule
 * 类描述: 订餐到时自动通知
 * 创建人: MC
 * 创建时间: 2018-09-24 21:08:04
 * 修改人: 
 * 修改时间:
 * 版本： @version 1.0
 *===================================================*/
using Senparc.CO2NET;
using Senparc.CO2NET.RegisterServices;
using Senparc.Weixin;
using Senparc.Weixin.Entities;
using Senparc.Weixin.Work.AdvancedAPIs;
using Senparc.Weixin.Work.Containers;
using Sl.Bpm.Application.Module;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Web;

namespace Sl.Bpm.AppPages.Schedule
{
    public class Food01AutoNoticeSchedule : ScheduleModuleBase
    {
        IFormatProvider ifp = new CultureInfo("zh-CN", true);
        bool DebugCode = true;
        DateTime testDateTimeNow = DateTime.Now;
        public string CorpId;
        public string OdfAppAgentId;
        public string OdfAppSecret;
 
        public override void Intialize()
        {
            CorpId = this.Config.Get("QiyeWeixin.CorpId");
            OdfAppSecret = this.Config.Get("QiyeWeixin.OdfAppSecret");
            OdfAppAgentId = this.Config.Get("QiyeWeixin.OdfAppAgentId");
            // 微信sdkQiyeWeixin.OdfAppAgentId
            var isGLobalDebug = false;//设置全局 Debug 状态
            var register = RegisterService.Start(new SenparcSetting(isGLobalDebug)).UseSenparcGlobal();//CO2NET全局注册，必须！
            var senparcWeixinSetting = SenparcWeixinSetting.BuildFromWebConfig(isGLobalDebug);
            register.UseSenparcWeixin(senparcWeixinSetting, new SenparcSetting(isGLobalDebug));
        }

        public override JobContext Execute(JobContext parameter)
        {
            string a = "";
            var b = a?.ToString();
            parameter.Output = b;
            parameter.Result = JobResult.Success;
            parameter.Message = "测试订餐消息发送";
            int year = DateTime.Now.Year;
            int m = DateTime.Now.Month;
            int d = DateTime.Now.Day;
            //if (DateTime.Now < new DateTime(year, m, d).AddHours(17))
            //{// 五点钟前发送消息给未预定的员工
                SendMsgToEmployee();
            //}
            //if(DateTime.Now >= new DateTime(year, m, d).AddHours(20))
            //{// 先将状态改变，然后将第二天的订餐统计发送给后厨人员
            //    FoodOrderStatus2Proc();// 处理中
            //    SendMsgToSupportStaff();
            //}
            //if(DateTime.Now>new DateTime(year,m,d).AddHours(12))
            //{
            //    FoodOrderStatus2Finish();//将今天之前的处理中定的餐，今天中午过后，将状态设置为完成
            //}
            return base.Execute(parameter);
        }
        public bool SendMsgToSupportStaff()
        {
            return true;
        }
        public bool SendMsgToEmployee()
        {
            var result = GetAvailableDate();
            var odfDate = result.FirstOrDefault();
            if (odfDate != null)
            {
                // 如果第二天有订餐
                // 选择没有订餐的人员，得到userId(同步人员时候，将人员的id做wxUserId，如果企业微信已经有人员，appUser没有匹配到，可以用电话号码匹配)
                string sql = @"select distinct id from AppUser where id 
                                in(select id from AppUser
                                where EmployeeNumber!='' and  EmployeeNumber!='_' and 
                                id not in 
                                (select UserId from (select EmployeeId,TargetDate,Qut,UserId from 
                                (select EmployeeId,TargetDate,Qut=SUM(Quantity),UserId from t_orderfood where TargetDate=@targetDate  group by TargetDate,EmployeeId,UserId) s
                                where Qut!=0) fod)
                                group by id)";
                var data = _db.GetTable(sql, new { targetDate = odfDate });
                List<string> toUsers = new List<string>();
                // 金
                //toUsers.Add("kim");
                toUsers.Add("mc");
                //--李紫薇
                toUsers.Add("71440F2E-92A4-4EA2-A8B0-A88B98917DC9");
                toUsers.Add("HuangManBiao");  
                //foreach (DataRow row in data.Rows)
                //{
                //    toUsers.Add(row["UserId"].ToString());
                //}

                if (toUsers.Count > 0)
                {// 发送消息给未预定的员工
                    SendMsg("温馨提示:  今天是工作日您尚未预定明日用餐，如有需要请在工作台中点击预定。", toUsers);
                }
            }
            return true;
        }
        public void SendMsg(string content,List<string>users)
        {
            if (users == null || users.Count == 0)
            {
                return;
            }
            string accessToken = AccessTokenContainer.TryGetToken(CorpId, OdfAppSecret);
            MassApi.SendText(accessToken, OdfAppAgentId, content, string.Join("|", users), null, null, 0);// 保密发送
        }
        public bool FoodOrderStatus2Proc()
        {
            List<string> dateList = GetAvailableDate();
            if (dateList.Count > 0)
            {
                string sql = $@"update t_orderfood set status=2,statusName='处理中' where targetDate='{dateList.FirstOrDefault()}' and status=1 and quantity>0";// 每天八点定期执行，将今天的订餐，就是明天的订单修改为处理中
                _db.Query<dynamic>(sql);
            }
            return true;
        }
        public bool FoodOrderStatus2Finish()
        {

            string sql = $@"update t_orderfood set status=3,statusName='已完成' where targetDate<='{DateTime.Now.ToString("yyyy-MM-dd")}' and status=2 and quantity>0";// 每天定期执行，将今天的处理中的订餐记录修改为已完成，就是明天的订单修改为处理中
            _db.Query<dynamic>(sql);

            return true;
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
            var data = _db.GetTable(@"select Day from [dbo].[BpmCalendar] where Day between @startDate and @endDate and type=1 order by day", new
            {
                startDate= startDate.ToString("yyyy-MM-dd"),
                endDate= endDate.ToString("yyyy-MM-dd")
            });
            foreach (DataRow day in data.Rows)
            {
                DateTime date = (DateTime)day["Day"];
                result.Add(date.ToString("yyyy-MM-dd"));
            }
            return result;
        }
    }
}