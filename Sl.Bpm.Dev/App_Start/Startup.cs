using System;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Security.Claims;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Logging;
using Microsoft.Owin;
using Microsoft.Owin.Logging;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Interop;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Security.WsFederation;
using MiniAbp.Dependency;
using MiniAbp.Runtime;
using MiniAbp.Web;
using Owin;
using Sl.Bpm.Application.Authorization;
using Sl.Bpm.Client;

[assembly: OwinStartup(typeof(Startup))]
namespace Sl.Bpm.Client
{
    public class Startup
    {
        private static string realm = ConfigurationManager.AppSettings["ida:Wtrealm"];
        private static string adfsMetadata = ConfigurationManager.AppSettings["ida:ADFSMetadata"];
        private static string enableAdLogin = ConfigurationManager.AppSettings["AdLogin"];
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void Configuration(IAppBuilder app)
        {
            var startLoadBanance = Convert.ToBoolean(ConfigurationManager.AppSettings["LoadBalance"]);
            //Enable the application to use a cookie to store information for the signed in user
            if (startLoadBanance)
            {
                var path = ConfigurationManager.AppSettings["LoadBalanceCookiePath"].ToString();
                app.UseCookieAuthentication(new CookieAuthenticationOptions
                {
                    AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                    LoginPath = new PathString(@"/Account/Index"),
                    TicketDataFormat = new AspNetTicketDataFormat(
                    new DataProtectorShim(
                        DataProtectionProvider.Create(new DirectoryInfo(path))
                        .CreateProtector("Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationMiddleware",
                        "Cookies", "v2")))
                });
            }
            else
            {
                app.UseCookieAuthentication(new CookieAuthenticationOptions
                {
                    AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                    LoginPath = new PathString(@"/Account/Index"),
                    ExpireTimeSpan = TimeSpan.FromDays(30),
                    //CookieDomain = ".shalu.com"
                });
            }

            // OAuth身份信息存储
            // Use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);
            var oAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/token"),
                Provider = new AuthorizationServerProvider(),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(30),
                AllowInsecureHttp = true
            };
            app.UseOAuthAuthorizationServer(oAuthOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            // 开启ADSL自动登陆
            if (enableAdLogin == "true")
            {
                var option = new CookieAuthenticationOptions
                {
                    AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                    Provider = new CookieAuthenticationProvider
                    {
                        OnResponseSignIn = context =>
                        {
                            var log = IocManager.Instance.Resolve<MiniAbp.Logging.ILogger>();
                            log.Debug("Logged In");
                            context.Properties.ExpiresUtc = DateTimeOffset.UtcNow.AddDays(30);
                            context.Properties.IsPersistent = true;
                            string acc = context.Identity.Name;
                            acc = @"yfco\" + acc;
                            var userManager = IocManager.Instance.Resolve<UserManager>();
                            var user = userManager.GetUser(acc);
                            if (user != null)
                            {
                                var claims = context.Identity as ClaimsIdentity;
                                claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id));
                                claims.AddClaim(new Claim(YConst.LanguageCultrue, user.Language));
                            }
                        }
                    }
                };
                app.UseCookieAuthentication(option);
                app.UseWsFederationAuthentication(
                    new WsFederationAuthenticationOptions
                    {
                        Wtrealm = realm,
                        MetadataAddress = adfsMetadata,
                        //AuthenticationType = "adfs",
                        UseTokenLifetime = false,
                         
                    });
                app.SetDefaultSignInAsAuthenticationType(DefaultAuthenticationTypes.ApplicationCookie);
            }

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UserMiniAbp();
        }
    }
}
