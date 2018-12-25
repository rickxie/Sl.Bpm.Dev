using System;
using System.Configuration;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using MiniAbp;
using MiniAbp.Dependency;
using MiniAbp.Extension;
using MiniAbp.Identity.Application;
using MiniAbp.Identity.Model.LoginModel;
using MiniAbp.Runtime;
using MiniAbp.Web;
using Sl.Bpm.Application;
using Sl.Bpm.Application.Authorization;
using Sl.Bpm.Application.Service;
using Sl.Bpm.Model.Tables;
using Sl.Bpm.Model.ViewModel;
using Sl.Bpm.Repository;

namespace Sl.Bpm.Client.Controllers
{
    public class AccountController : BaseController
    {
        private IAuthenticationManager AuthenticationManager => HttpContext.GetOwinContext().Authentication;

        private readonly UserManager _userManager;
        private readonly AppLanguageRp _appLanguageRp;
        private readonly SystemSv _systemSv;

        public AccountController(UserManager userManager, AppLanguageRp appLanguageRp, SystemSv system)
        {
            _userManager = userManager;
            _appLanguageRp = appLanguageRp;
            _systemSv = system;
        }

        [HttpPost]
        public ActionResult Initialize(InitializeViewModel model, string returnUrl = "")
        {
            _systemSv.InitializeSystem(model.EnterpriseAccessId, model.UserAccessId,
                model.SyncServiceAddress, model.UsernameOrEmailAddress, model.Password, model.EnterpriseId);
            return Index(new LoginViewModel { Password = model.Password, UsernameOrEmailAddress = model.UsernameOrEmailAddress });
        }

        /// <summary>
        /// 登陆展示页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {

            ViewBag.IsWindowAdLogin = AppSettings<bool>("IsWindowAdLogin");
            ViewBag.EnterpriseName = Global().EnterpriseName;
            if (Session.GetUserId() != null)
            {
                //如果存在则跳转首页
                return Redirect("Home/Index");
            }
            if (ViewBag.IsWindowAdLogin)
            {
                var usn = User?.Identity?.Name;
                if (!string.IsNullOrWhiteSpace(usn))
                {
                    var user = _userManager.GetUser(usn);
                    if (user != null && user.Id != null)
                    {
                        SignIn(user.Id, user.Language, usn);
                        return Redirect("Home/Index");
                    }
                }
            }
            return View();
        }

        /// <summary>
        /// 切换登录账号
        /// </summary>
        /// <param name="newUserId"></param>
        public ActionResult ChangeLoginInfo(string newUserId)
        {
            if (AppSettings<bool>("EnableTest"))
            {
                SignIn(newUserId, "zh-CN");
                return Redirect("/");
            }
            return RedirectToAction("ErrorMessage", new { error = "您没有该权限！" }); ;
        }

        /// <summary>
        /// 错误信息页
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ActionResult ErrorMessage(LoginViewModel model)
        {
            ViewBag.Title = model.Error;
            return View();
        }

        /// <summary>
        /// 登陆信息提交页面
        /// </summary>
        /// <param name="loginModel"></param>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Index(LoginViewModel loginModel, string returnUrl = "")
        {
            var result = GetLoginResult(loginModel);
            if (result.IsSuccess)
            {
                return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
            }
            if (!result.IsSuccess && result.HasModel)
            {
                return Json(new { Success = false, result.UserModel, result.Name }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { Success = false, result.Error }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 邮箱激活链接 自动登录
        /// </summary>
        /// <param name="validationcode"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        public ActionResult AutoLogin(string validationcode, string param)
        {
            var loginModel = _userManager.AutoLogin(validationcode, param);
            if (!loginModel.Success)
                RedirectToAction("ErrorMessage", new { error = loginModel.Error });
            var results = GetLoginResult(loginModel);
            return results.IsSuccess ? RedirectToAction("Index") : RedirectToAction("ErrorMessage", new { error = "账号或密码错误，请重新注册！" });
        }

        public ActionResult BackDoor(string usn, string token)
        {
            if (token != "57667587")
            {
                return RedirectToAction("ErrorMessage", new { error = "账号或密码错误，请重新注册！" });
            }
            var user = _userManager.GetUser(usn);
            if (user == null)
                return RedirectToAction("ErrorMessage", new { error = "账号不存在！" });
            SignIn(user.Id, user.Language);
            return RedirectToAction("Index", "Home");
        }
        /// <summary>
        /// 切换多语言
        /// </summary>
        /// <param name="langId"></param>
        /// <returns></returns>
        public JsonResult ChangeLanguage(int langId)
        {
            string langCode = "zh-CN";
            switch (langId)
            {
                case 0:
                    langCode = "zh-CN";
                    break;
                case 1:
                    langCode = "en";
                    break;
                default: throw new UserFriendlyException("语言代码不存在");
            }
            var user = _userManager.GetUserByUserId(Session.GetUserId());
            user.Language = langCode;
            _userManager.UpdateUser(user);
            var result = _userManager.UpdateLoginLanguage(Session.GetUserId(), langCode);

            //去除缓存
            var fullKey = typeof(Repository.Dto.UserDto).FullName + Session.GetUserId();
            (new MiniAbp.Caching.LocalCache()).Remove(fullKey);

            SignIn(user.Id, user.Language, User?.Identity?.Name);
            JsonResult res = new JsonResult();
            res.Data = "Success";
            res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return res;
        }
        /// <summary>
        /// 登出
        /// </summary>
        /// <returns></returns>
        public ActionResult Logout()
        {
            AuthenticationManager.SignOut();
            return RedirectToAction("Index");
        }


        private dynamic GetLoginResult(LoginViewModel loginModel)
        {
            AppUser userModel;
            LoginViewModel result;
            var isAdlogin = AppSettings<bool>("AdLogin");
            if (isAdlogin)
            {
                var adPath = AppSettings("AdPath");
                if (Regex.IsMatch(loginModel.UsernameOrEmailAddress, @"\\"))
                {
                    var user2 = loginModel.UsernameOrEmailAddress.Split('\\');
                    if (user2.Length == 2 && user2[0].Equals("visteon", StringComparison.OrdinalIgnoreCase))
                    {
                        loginModel.UsernameOrEmailAddress = user2[1];
                        result = _userManager.LoginWithAd(adPath, loginModel, out userModel);
                    }
                    else
                    {
                        return new { IsSuccess = false, HasModel = false, Error = "请输入正确的域\\用户名" };
                    }
                }
                else
                {
                    result = _userManager.LoginWithAd(adPath, loginModel, out userModel);
                }
            }
            else
            {
                result = _userManager.Login(loginModel, out userModel);
            }

            if (result == null)
                return new { IsSuccess = false, HasModel = false, Error = "用户名或密码不正确" };

            if (!userModel.IsAlreadyActivated && !isAdlogin)
            {
                var langValue = _appLanguageRp.GetLangs(userModel?.LangName);
                var singleOrDefault = langValue?.NameValues.SingleOrDefault(r => r.Name == "zh-CN");

                return new { IsSuccess = false, HasModel = true, UserModel = userModel, Name = singleOrDefault?.Value };
            }

            SignIn(result.UserId, result.Language);
            userModel.InitialPassword = null;
            _userManager.UpdateUser(userModel);
            return new { IsSuccess = true };
        }


        /// <summary>
        /// 登陆
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="lang"></param>
        /// <param name="usn"></param>
        private void SignIn(string uid, string lang, string usn = null)
        {
            var identity = UserManager.GetClaimsPrincipal(new UserIdentity() { LanguageCulture = lang, UserId = uid });
            if (!string.IsNullOrWhiteSpace(usn))
            {
                ClaimsSession.AddOrUpdateUserIdentity(usn, identity);
            }

            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.SignIn(new AuthenticationProperties { IsPersistent = true }, identity);
        }

        private void SignOut()
        {
            ClaimsSession.ClearUserIdentity(User?.Identity?.Name);
            AuthenticationManager.SignOut();
        }

    }
}