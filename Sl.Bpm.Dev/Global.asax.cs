using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using MiniAbp.Identity.Application;
using MiniAbp.Web;
using Sl.Bpm.Application.Authorization;

namespace Sl.Bpm.Client
{
    public class MvcApplication : YApplication
    {

        protected override void Application_Start(object sender, EventArgs e)
        {
            base.Application_Start(sender, e);
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes); 
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }


        protected override void Application_BeginRequest(object sender, EventArgs e)
        {
            base.Application_BeginRequest(sender, e);
        }

        protected override void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            //if (Context.User != null && Context.User.Identity != null)
            //{
            //    var userName = Context.User.Identity.GetUserName();
            //    if (!userName.IsNullOrWhiteSpace())
            //    {
            //        var account = userName.Split('\\');

            //        var hasUser = DbDapper.First<AppUser>(new {Account = account[1]});
            //        if (hasUser != null)
            //        {
            //            var identity = MabpUserManager<AppUser>.GetClaimsPrincipal(new UserIdentity()
            //            {
            //                LanguageCulture = hasUser.Language,
            //                UserId = hasUser.Id
            //            });
            //            ClaimsPrincipal principal = new ClaimsPrincipal(identity);
            //            Context.User = principal;
            //        }
            //        else
            //        {
            //            Response.ContentType = "application/json; charset=utf-8";
            //            Response.Write("访问拒绝,用户信息不存在与系统中");
            //            Response.End();
            //        }
            //    }
            //}

            //if (Request.IsAuthenticated)
            //{
            //    //var user = Context.User;
            //    //var userId = user.Identity.GetUserId();
            //    //var hasUser = DbDapper.GetSingle<AppUser>(userId);
            //    //if (hasUser == null)
            //    //{
            //    //    Context.User = null;
            //    //}
            //}
            //else 
            if (Request.Cookies["pdfuser"] != null)
            {
                string lang = Request.Cookies["lang"]?.Value ?? "zh-CN";
                var identity = UserManager.GetClaimsPrincipal(new UserIdentity() { LanguageCulture = lang, UserId = "d8bdbee9-7323-4381-b67f-9934d5606539" });
                IAuthenticationManager AuthenticationManager = HttpContext.Current.GetOwinContext().Authentication;
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                AuthenticationManager.SignIn(new AuthenticationProperties { IsPersistent = true }, identity);
            }
            base.Application_AuthenticateRequest(sender, e);
        }
    }
}
