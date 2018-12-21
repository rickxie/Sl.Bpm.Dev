using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Reflection;
using MiniAbp.Configuration;
using MiniAbp.DataAccess;
using MiniAbp.DataAccess.Dapper;
using MiniAbp.Extension;
using MiniAbp.Logging;
using MiniAbp.Reflection;
using Sl.Bpm.Application;
using Sl.Bpm.Model;
using Sl.Bpm.Model.Tables;
using MiniAbp;
using Sl.Bpm.Application.Base;
using MiniAbp.Localization;
using MiniAbp.Runtime;

namespace Sl.Bpm.Client
{
    [DependsOn(typeof(ApplicationModule))]
    public class ClientModule : MabpModule
    {
        public static string AuditingConn = ConfigurationManager.ConnectionStrings["AuditingConn"]?.ConnectionString;
        public override void PreInitialize()
        {
            Configuration.Localization.Sources.Add(new LocalizationSource("Bpm", new LocalJsonProvider(AppPath.RootPath + "\\App_Start\\Localization")));
            Configuration.Database.ConnectionString = ConfigurationManager.ConnectionStrings["Default"].ConnectionString;
            Configuration.Database.Dialect = Dialect.SqlServer;
            //是否开启审计
            var enableAuditing = Convert.ToBoolean(ConfigurationManager.AppSettings["EnableAuditing"]);
            if (enableAuditing)
            {
                Configuration.Auditing.Behaviours = AuditBehaviours.All;
                Configuration.Auditing.Save = delegate(AuditInfo info)
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

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly()); 

        }


    }
}