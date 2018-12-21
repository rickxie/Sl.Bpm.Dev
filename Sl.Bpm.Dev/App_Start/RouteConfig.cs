using System.Web.Mvc;
using System.Web.Routing;

namespace Sl.Bpm.Client
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("SysPages/{resource}.aspx/{*pathInfo}");
            //routes.MapRoute(
            //    name: "Data",
            //    url: "page/{id}",
            //    defaults: new { controller = "Pages", action = "Index", id = UrlParameter.Optional });

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
