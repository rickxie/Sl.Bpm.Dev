using MiniAbp;
using MiniAbp.Configuration;
using MiniAbp.DataAccess;
using MiniAbp.DataAccess.Dapper;
using MiniAbp.Extension;
using MiniAbp.Logging;
using Sl.Bpm.Client;
using Sl.Bpm.Model.Tables;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Sl.Bpm.TestConsole
{
    [DependsOn(typeof(ClientModule))]
    public class TestModule : MabpModule
    {
        public static string AuditingConn = ConfigurationManager.ConnectionStrings["AuditingConn"]?.ConnectionString;

        /// <summary>
        /// 执行之前
        /// </summary>
        public override void PreInitialize()
        {
            Configuration.Database.ConnectionString = ConfigurationManager.ConnectionStrings["Default"].ConnectionString;
            Configuration.Database.Dialect = Dialect.SqlServer;
            //是否开启审计
            var enableAuditing = Convert.ToBoolean(ConfigurationManager.AppSettings["EnableAuditing"]);
            if (enableAuditing)
            {
                Configuration.Auditing.Behaviours = AuditBehaviours.All;
                Configuration.Auditing.Save = delegate (AuditInfo info)
                {
                    if (AuditingConn == null)
                    {
                        AuditingConn = Configuration.Database.ConnectionString;
                    }
                    using (var db = new SqlConnection(AuditingConn))
                    {
                        db.Open();
                        var preInsert = info.MapTo<AppAuditLog>();
                        preInsert.RefreshId();
                        db.Insert<string>(preInsert);
                        db.Close();
                    }
                };
            }
        }
        /// <summary>
        /// 执行注册
        /// </summary>
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());

        }


    }
}
