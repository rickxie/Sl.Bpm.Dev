using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Owin.Security.OAuth;
using MiniAbp.Runtime;

namespace Sl.Bpm.Client
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {            
            //TODO:  认证客户端访问
            context.Validated();
            return base.ValidateClientAuthentication(context);
        }

        /// <summary>
        /// Called when a request to the Token endpoint arrives with a "grant_type" of "password". This occurs when the user has provided name and password
        ///             credentials directly into the client application's user interface, and the client application is using those to acquire an "access_token" and 
        ///             optional "refresh_token". If the web application supports the
        ///             resource owner credentials grant type it must validate the context.Username and context.Password as appropriate. To issue an
        ///             access token the context.Validated must be called with a new ticket containing the claims about the resource owner which should be associated
        ///             with the access token. The application should take appropriate measures to ensure that the endpoint isn’t abused by malicious callers.
        ///             The default behavior is to reject this grant type.
        ///             See also http://tools.ietf.org/html/rfc6749#section-4.3.2
        /// </summary>
        /// <param name="context">The context of the event carries information in and results out.</param>
        /// <returns>
        /// Task to enable asynchronous execution
        /// </returns>
#pragma warning disable 1998
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
#pragma warning restore 1998
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            var result = ValidateUser(context.UserName, context.Password);
            if (!result.Pass)
            {
                context.SetError("invalid_grant", "invalid username or password");
                return;
            }
            context.Validated(GetClaimsPrincipal(result.User));
        }

        private dynamic ValidateUser(string userName, string password)
        {
            //查找数据库的逻辑
            if (userName != "MC" && password != "123456")
            {
                return new { Pass = false };
            }
            return new {Pass = true, User = new { UserId = "123", Name = "XiaoLe" } };
        }

        internal static ClaimsIdentity GetClaimsPrincipal(dynamic user)
        {
            var claims = new List<Claim>();
            //claims.Add(new Claim(ClaimTypes.Name, user.Name));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.UserId));
            claims.Add(new Claim(YConst.LanguageCultrue, user.LanguageCulture));
            var identity = new ClaimsIdentity(claims, "ApplicationCookie");
            ClaimsPrincipal principal = new ClaimsPrincipal(identity);
            HttpContext.Current.User = principal;
            return identity;
        }
    }
} 