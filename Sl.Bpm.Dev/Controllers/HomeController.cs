using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sl.Bpm.Client.Controllers
{
    [Authorize]
    public class HomeController : BaseController
    {
        // GET: Home
        public ActionResult Index()
        {
            ViewBag.hasSubMenu = true;
            return View();
        }

        [Authorize]
        public ActionResult Double()
        {
            ViewBag.hasSubMenu = true;
            return View();
        }


        public ActionResult Popup()
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

        public ActionResult MessageCenter()
        {

            ViewBag.hasSubMenu = true;
            return View();
        }
    }
}