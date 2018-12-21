using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using MiniAbp;
using MiniAbp.DataAccess;
using MiniAbp.Extension;
using MiniAbp.Identity.Application;
using MiniAbp.Web;
using Sl.Bpm.Application;
using Sl.Bpm.Application.Authorization;
using Sl.Bpm.Application.Service;
using Sl.Bpm.Application.Service.Interface;
using Sl.Bpm.Model.Tables;
using Sl.Bpm.Repository;
using System;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Sl.Bpm.Client.Controllers
{

    //[Authorize]
    public class PagesController : BaseController
    {
        private IAuthenticationManager AuthenticationManager => HttpContext.GetOwinContext().Authentication;
        private IPageSv _pageSv;
        private ITaskReadSv _taskSv;
        private AppMenuRp _menuRp;
        private AppPageRp _pageRp;
        private PermissionExpert _pm;
        public PagesController(IPageSv pageSv, ITaskReadSv task, AppMenuRp menuRp, AppPageRp pageRp, PermissionExpert pm)
        {
            _pageSv = pageSv;
            _taskSv = task;

            _menuRp = menuRp;
            _pageRp = pageRp;
            _pm = pm;
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var userName = filterContext.HttpContext.Request["username"];
            GetUser(userName);
            base.OnActionExecuting(filterContext);
        }

        public ActionResult MobileCheck(string nodeId, string pageId, string jobId, string taskId, string procId,
            string draftId, string areaCode, string topic = null, string isPrint = "0", string param = null,
            string displayLanguages = null, string isPdf = "0", string isWaiting = "0")
        {
            ViewBag.pageId = pageId;
            ViewBag.jobId = jobId;
            ViewBag.nodeId = nodeId;
            ViewBag.taskId = taskId;
            ViewBag.procId = procId;
            ViewBag.draftId = draftId;
            ViewBag.isPrint = isPrint;
            ViewBag.areaCode = areaCode;
            ViewBag.param = Server.UrlEncode(ToBase64String(param));
            ViewBag.isPdf = isPdf;
            ViewBag.displayLanguages = displayLanguages;
            ViewBag.topic = topic;
            ViewBag.isWaiting = isWaiting;
            return View();
        }



        /// <summary>
        /// 设计器视图
        /// </summary>
        /// <returns></returns>
        public ActionResult Designer()
        {
            return View("~/App/SysDesigner/Layout.cshtml");
        }


        /// <summary>
        /// 基础数据、报表、功能页面
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult Code(string id)
        {
            try
            {
                var pageInfo = _pageSv.GetPage(new Repository.Dto.ModulePageArgs() { PageCode = id, QueryString = ToDiconary(Request.QueryString) });
                return View("~/Views/Pages/Index.cshtml", pageInfo);
            }
            catch (UserFriendlyException ex)
            {
                return RedirectToAction("ErrorMessage", "Account", new { error = ex.Message });
            }
        }
        /// <summary>
        /// 基础数据、报表、功能页面
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult CodeMobile(string id)
        {
            try
            {
                var pageInfo = _pageSv.GetPage(new Repository.Dto.ModulePageArgs() { PageCode = id, QueryString = ToDiconary(Request.QueryString) });
                return View("~/Views/Pages/IndexMobile.cshtml", pageInfo);
            }
            catch (UserFriendlyException ex)
            {
                return RedirectToAction("ErrorMessage", "Account", new { error = ex.Message });
            }
        }


        /// <summary>
        /// 流程中心页面
        /// </summary>
        /// <returns></returns>
        public ActionResult WfCenter()
        {
            return View("~/App/SysPages/Layout.cshtml");
        }


        /// <summary>
        /// 流程页面
        /// </summary>
        /// <param name="nodeId"></param>
        /// <param name="pageId"></param>
        /// <param name="jobId"></param>
        /// <param name="taskId"></param>
        /// <param name="procId"></param>
        /// <param name="draftId"></param>
        /// <param name="areaCode"></param>
        /// <param name="topic"></param>
        /// <param name="isPrint"></param>
        /// <param name="param"></param>
        /// <param name="displayLanguages"></param>
        /// <param name="isPdf"></param>
        /// <param name="isWaiting"></param>
        /// <returns></returns>
        [Authorize]
        public ActionResult Wf(string nodeId, string pageId, string jobId, string taskId, string procId,
            string draftId, string areaCode, string topic = null, string isPrint = "0", string param = null,
            string displayLanguages = null, string isPdf = "0", string isWaiting = "0")
        {
            if (string.IsNullOrWhiteSpace(nodeId))
            {
                return RedirectToAction("Wft", "Pages", new
                {
                    nodeId,
                    pageId,
                    jobId,
                    taskId,
                    procId,
                    draftId,
                    areaCode,
                    topic,
                    isPrint,
                    param,
                    displayLanguages,
                    isPdf,
                    isWaiting
                });
            }
            var node = DbDapper.Get<WfdWorkflowNode>(nodeId);
            if (node == null)
            {
                return new JsonResult() { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = "节点信息错误或不存在,节点Id:" + node.Id };
            }
            if (string.IsNullOrWhiteSpace(node.AppPageId))
            {
                return new JsonResult() { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = "当前节点未绑定页面,节点Id:" + node.Id };
            }
            try
            {
                var pageInfo = _pageSv.GetPage(new Repository.Dto.ModulePageArgs()
                {
                    NodeId = nodeId,
                    TaskId = taskId,
                    PageId = pageId,
                    JobId = jobId,
                    ProcId = procId,
                    DraftId = draftId,
                    AreaCode = areaCode,
                    Topic = topic,
                    IsPrint = isPrint,
                    Param = param,
                    DisplayLanguages = displayLanguages,
                    IsPdf = isPdf,
                    IsWaiting = isWaiting,
                    QueryString = ToDiconary(Request.QueryString)
                });
                return View(pageInfo);
            }
            catch (UserFriendlyException ex)
            {
                return RedirectToAction("ErrorMessage", "Account", new { error = ex.Message });
            }
        }


        public ActionResult Wft(string nodeId, string pageId, string jobId, string taskId, string procId,
            string draftId, string areaCode, string topic = null, string isPrint = "0", string param = null,
            string displayLanguages = null, string isPdf = "0", string isWaiting = "0")
        {
            return View(new
            {
                nodeId,
                pageId,
                jobId,
                taskId,
                procId,
                draftId,
                areaCode,
                topic,
                isPrint,
                param,
                displayLanguages,
                isPdf,
                isWaiting
            });
        }


        /// <summary>
        /// 流程手机端页面
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public ActionResult WfMobile(string nodeId, string pageId, string jobId, string taskId, string procId,
            string draftId, string areaCode, string topic = null, string isPrint = "0", string param = null,
            string displayLanguages = null, string isPdf = "0", string isWaiting = "0")
        {
            var node = DbDapper.Get<WfdWorkflowNode>(nodeId);
            if (node == null)
            {
                return new JsonResult() { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = "节点信息错误或不存在,节点Id:" + node.Id };
            }
            if (string.IsNullOrWhiteSpace(node.AppPageId))
            {
                return new JsonResult() { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = "当前节点未绑定页面,节点Id:" + node.Id };
            }
            try
            {
                var pageInfo = _pageSv.GetPage(new Repository.Dto.ModulePageArgs()
                {
                    NodeId = nodeId,
                    TaskId = taskId,
                    PageId = pageId,
                    JobId = jobId,
                    ProcId = procId,
                    DraftId = draftId,
                    AreaCode = areaCode,
                    Topic = topic,
                    IsPrint = isPrint,
                    Param = UnBase64String(param),
                    DisplayLanguages = displayLanguages,
                    IsPdf = isPdf,
                    IsWaiting = isWaiting,
                    QueryString = ToDiconary(Request.QueryString)
                });
                return View(pageInfo);
            }
            catch (UserFriendlyException ex)
            {
                return RedirectToAction("ErrorMessage", "Account", new { error = ex.Message });
            }
        }


        public ActionResult Sn(string id, string topic = null, string param = null,
            string displayLanguages = null, string isPdf = "0", string isWaiting = "0")
        {
            var table = db.GetTable(@"SELECT TOP(1) b.WfdWorkflowNodeId,c.AppPageId,b.TaskId,a.AreaCode FROM dbo.InstTask a
                INNER JOIN dbo.InstProc b ON a.Id = b.TaskId
                INNER JOIN dbo.WfdWorkflowNode c ON b.WfdWorkflowNodeId = c.Id
                WHERE Sn = @SnNumber AND b.NodeType IN (0,1)
                ORDER BY b.ProcTime DESC", new { SnNumber = id });

            if (table.Rows.Count > 0)
            {
                return Redirect("/Pages/Wf/?nodeId={0}&pageId={1}&taskId={2}&areaCode={3}&displayLanguages={4}&param={5}&isPdf={6}&topoc={7}"
                    .Fill(table.Rows[0]["WfdWorkflowNodeId"].ToString(),
                        table.Rows[0]["AppPageId"].ToString(),
                        table.Rows[0]["TaskId"].ToString(),
                        table.Rows[0]["AreaCode"].ToString(),
                        displayLanguages,
                        param,
                        isPdf,
                        topic,
                        isWaiting));
            }

            return RedirectToAction("ErrorMessage", "Account", new { error = "该表单在本系统中不存在" });
        }


        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="userName"></param>
        private void GetUser(string userName)
        {
            var hasUser = DbDapper.First<AppUser>(new { Account = userName });
            if (hasUser != null)
            {
                var identity = UserManager.GetClaimsPrincipal(new UserIdentity() { LanguageCulture = hasUser.Language, UserId = hasUser.Id });
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                AuthenticationManager.SignIn(new AuthenticationProperties { IsPersistent = true }, identity);
            }
        }




        [Authorize]
        public ActionResult Menu(string id)
        {
            if (id != null)
            {
                var menu = _menuRp.GetBindMenu(id);
                if (menu != null)
                {
                    var page = _pageRp.GetPageById(menu.LinkId);
                    if (page != null)
                    {

                        var pmDic = _pm.GetUserPermissions(Session.GetUserId());

                        if (pmDic.ContainsKey(menu.Id))
                        {
                            if (pmDic[menu.Id])
                            {
                                var pageInfo = _pageSv.GetPage(new Repository.Dto.ModulePageArgs() { PageCode = page.FileName });
                                pageInfo.QueryString = ToDiconary(Request.QueryString);
                                return View("~/Views/Pages/Index.cshtml", pageInfo);
                            }
                        }

                    }
                }
            }
            return RedirectToAction("ErrorMessage", "Account", new { error = "该表单在本系统中不存在或没有权限" });
        }
        #region
        /// <summary>
        /// base64编码
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string ToBase64String(string value)
        {
            if (value == null || value == "")
            {
                return "";
            }
            byte[] bytes = Encoding.UTF8.GetBytes(value);
            return Convert.ToBase64String(bytes);
        }
        #endregion
        #region
        /// <summary>
        /// base64解码
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string UnBase64String(string value)
        {
            if (value == null || value == "")
            {
                return "";
            }
            byte[] bytes = Convert.FromBase64String(value);
            return Encoding.UTF8.GetString(bytes);
        }

        #endregion
    }

}