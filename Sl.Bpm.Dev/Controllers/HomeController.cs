using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MiniAbp.Extension;
using Microsoft.AspNet.Identity;

namespace Sl.Bpm.Client.Controllers
{
    [Authorize]
    public class HomeController : BaseController
    {
        private readonly MiniAbp.Logging.ILogger _logger;
        public HomeController(MiniAbp.Logging.ILogger logger)
        {
            _logger = logger;
        }
        // GET: Home
        public ActionResult Index()
        {
            ViewBag.hasSubMenu = true;
            return View();
        }
        public ActionResult Template1()
        {
            return View();
        }

        public ActionResult Manage()
        {
            ViewBag.hasSubMenu = true;
            return View();
        }

        [Authorize]
        public ActionResult Workflow()
        {
            ViewBag.hasSubMenu = true;
            return View();
        }

        [Authorize]
        public ActionResult Business()
        {
            ViewBag.hasSubMenu = true;
            return View();
        }

        [Authorize]
        public ActionResult Calendar()
        {

            ViewBag.hasSubMenu = false;
            return View();
        }

        public ActionResult Popup()
        {
            return View();
        }

        public ActionResult Portals()
        {
            return View();
        }
        public ActionResult PersonalData()
        {
            return View();
        }
        public ActionResult Synergism()
        {
            return View();
        }
        public ActionResult SetUp()
        {
            return View();
        }
        [Authorize]
        public ActionResult Management()
        {

            ViewBag.hasSubMenu = false;
            return View();
        }
        [Authorize]
        public ActionResult ReportCenter()
        {
           

            ViewBag.hasSubMenu = false;
            return View();
        }
    }
}