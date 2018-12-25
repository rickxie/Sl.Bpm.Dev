using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sl.Bpm.Application.Caches;
using Sl.Bpm.Repository.Dto;
using MiniAbp.Web;
using MiniAbp.Dependency;
using Sl.Bpm.Application.Service.Interface;
using System.Dynamic;
using Sl.Bpm.Application.Service;
using MiniAbp.Extension;

namespace Sl.Bpm.Client.Controllers
{
    [Authorize]
    public class SharedController : BaseController
    {
        private MenuCache Menu = IocManager.Instance.Resolve<MenuCache>(new { code = "cRoot" });
        private IModuleSv _service;
        private readonly PermissionSv _permissionSv;
        private readonly SystemSv _systemSv;
        public SharedController(IModuleSv sv, PermissionSv permissionSv, SystemSv system)
        {
            _service = sv;
            _permissionSv = permissionSv;
            _systemSv = system;

        }
        private void BuildMenu(AppMenuDev menu, IEnumerable<AppPageShortDto> dt)
        {
            foreach (var d in dt)
            {
                var m = new AppMenuDev();
                m.Id = d.Id;
                m.Name = d.Name;
                m.Link = "/Pages/Code/" + d.FileName;
                m.OpenType = 3;
                m.Target = "_main";
                // 添加完整.
                menu.Children.Add(m);
            }
        }
        public ActionResult RenderMenu( )
        {
            // 三种类型页面
            dynamic a = new ExpandoObject();
            a.pageType = "1";
            var gn1 = _service.GetOtherPage(a);
            a.pageType = "4";
            var gn2 = _service.GetOtherPage(a);
            a.pageType = "2";
            var gn4 = _service.GetOtherPage(a);

            var sub1 = new AppMenuDev()
            {
                Id = "1.1",
                Name = "所有数据",
                OpenType = 0,
                Children = new List<AppMenuDev>()
            };
            var menu1 = new AppMenuDev()
            {
                Id = "data",
                Name = "数据",
                IconClass = "icon-database",
                OpenType = 1,
                Link = "/home/double/1",
                Children = new List<AppMenuDev>() {
                    sub1
                },
            };
            // 1 基础数据, 2 报表, 3 流程 4 功能
            BuildMenu(sub1, gn1);
            var sub2 = new AppMenuDev()
            {
                Id = "4.1",
                Name = "所有功能",
                OpenType = 0,
                Children = new List<AppMenuDev>()
            };
            var menu2 = new AppMenuDev()
            {
                Id = "func",
                Name = "功能",
                IconClass = "icon-tasks",
                OpenType = 1,
                Link = "/home/double/4",
                Children = new List<AppMenuDev>() {
                    sub2
                },
            };
            BuildMenu(sub2, gn2);

            var sub4 = new AppMenuDev()
            {
                Id = "2.1",
                Name = "所有报表",
                OpenType = 0,
                Children = new List<AppMenuDev>()
            };
            // 报表
            var menu4 = new AppMenuDev()
            {
                Id = "report",
                Name = "报表",
                IconClass = "icon-pie-chart",
                OpenType = 1,
                Link = "/home/double/2",
                Children = new List<AppMenuDev>() { sub4 },
            };
            BuildMenu(sub4, gn4);

            var newMenu = new AppMenuDev()
            {
                Children = new List<AppMenuDev>()
                {
                     new AppMenuDev()
                     {
                         Id = "workflow",
                         Name = "流程中心",
                         IconClass = "icon-sitemap",
                         OpenType = 1,
                         Link = "/home/double/3",
                         Children = new List<AppMenuDev>(){
                           new AppMenuDev()
                           {
                               Id = "4.1", Name = "流程处理", OpenType = 0, Children = new List<AppMenuDev>()
                               {
                                    new AppMenuDev(){ Id = "4.1.1", Name = "发起",      OpenType = 3, Target = "_main", IconClass = "icon-sitemap",      Link = "/Pages/WfCenter/#/raise",  },
                                    new AppMenuDev(){ Id = "4.1.2", Name = "代办流程",  OpenType = 3, Target = "_main", IconClass = "icon-copy",         Link = "/Pages/WfCenter/#/pendinghandle",  },
                                    new AppMenuDev(){ Id = "4.1.3", Name = "待阅流程",  OpenType = 3, Target = "_main", IconClass = "icon-newspaper-o",  Link = "/Pages/WfCenter/#/pendingread",  },
                               }
                           },
                           new AppMenuDev()
                           {
                               Id = "4.2", Name = "流程查询", OpenType = 0, Children = new List<AppMenuDev>()
                               {
                                    new AppMenuDev(){ Id = "4.2.1", Name = "我标记的流程",  OpenType = 3, Target = "_main", IconClass = "icon-checked",  Link = "/Pages/WfCenter//#/mymarked"},
                                    new AppMenuDev(){ Id = "4.2.2", Name = "我草拟的流程",  OpenType = 3, Target = "_main", IconClass = "icon-edit",  Link = "/Pages/WfCenter/#/mydraft"  },
                                    new AppMenuDev(){ Id = "4.2.3", Name = "我发起的流程",  OpenType = 3, Target = "_main", IconClass = "icon-share",  Link = "/Pages/WfCenter/#/myraised"},
                                    new AppMenuDev(){ Id = "4.2.4", Name = "我处理的流程",  OpenType = 3, Target = "_main", IconClass = "icon-paste",  Link = "/Pages/WfCenter//#/myhandled"},
                                    new AppMenuDev(){ Id = "4.2.5", Name = "我挂起的流程",  OpenType = 3, Target = "_main", IconClass = "icon-history",  Link = "/Pages/WfCenter/#/mywaiting"},
                                    new AppMenuDev(){ Id = "4.2.6", Name = "抄送我的流程",  OpenType = 3, Target = "_main", IconClass = "icon-flag",  Link = "/Pages/WfCenter//#/mycopied"},
                                    new AppMenuDev(){ Id = "4.2.7", Name = "我授权的流程",  OpenType = 3, Target = "_main", IconClass = "icon-hand-right",  Link = "/Pages/WfCenter//#/myauthorized"},
                                    new AppMenuDev(){ Id = "4.2.8", Name = "我代理的流程",  OpenType = 3, Target = "_main", IconClass = "icon-paint-brush",  Link = "/Pages/WfCenter//#/mydelegated"},
                                    new AppMenuDev(){ Id = "4.2.9", Name = "流程高级查询",  OpenType = 3, Target = "_main", IconClass = "icon-link",  Link = "/Pages/WfCenter//#/wfadvancedsearch"},
                               }
                           },
                         },
                     },
                }
            };
            newMenu.Children.Add(menu1);
            newMenu.Children.Add(menu2);
            newMenu.Children.Add(menu4);
            return PartialView("~/Views/Home/_Menu.cshtml", newMenu);
        }

        public ActionResult RenderLang()
        {
            return PartialView("~/Views/Home/_Lang.cshtml", Session.GetUserLanguage() ?? "zh-CN");
        }

        public string GetSelectStatus(string link, AppMenuDev menu, string path,bool strict=false)
        {
            if (link == path || (path.StartsWith(link + "/") && path != "/") && !strict)
            {
                return "select";
            }
            else if (path.EndsWith("index"))
            {
                if (link.StartsWith(path))
                {
                    return "select";
                }
            }
            else if (path == "/" || path == "/home" || path == "/home/")
            {
                if (link == "/home/index")
                {
                    return "select";
                }
            }


            return "";
        }


        public ActionResult Permissions()
        {
            var html = string.Empty;
            try

            {
                var permissions = _permissionSv.GetUserPermissions();
                ViewBag.Permissions = permissions;
                ViewBag.User = _systemSv.GetUserInfo().SerializeJsonCamelCase();
                html = this.RenderView("~/Views/Shared/Permissions.cshtml", this.ViewData, this.TempData);
            }
            catch (Exception ex)
            {
                html = @"window.location.href='/Account/logout';";
            }
            return Content(html);
        }
    }

    public class AppMenuDev
    {
        public AppMenuDev() { }

        public string FId { get; set; }
        public int LinkType { get; set; }
        public string LinkId { get; set; }
        public int MenuType { get; set; }
        public List<AppMenuDev> Children { get; set; }
        public string Remark { get; set; }
        public int MenuIndex { get; set; }
        public int MenuDepth { get; set; }
        public string ParentId { get; set; }
        public bool IsFavourite { get; set; }
        public string Target { get; set; }
        public int OpenType { get; set; }
        public string Icon { get; set; }
        public string LanguageCulture { get; set; }
        public string IconClass { get; set; }
        public string LangName { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Id { get; set; }
        public string Link { get; set; }
        public bool IsBindLink { get; set; }
    }
}