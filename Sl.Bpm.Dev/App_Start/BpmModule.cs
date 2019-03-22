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
using System.Collections.Generic;
using MiniAbp.Domain.Entities;
using System.Linq;

namespace Sl.Bpm.Client
{
    [DependsOn(typeof(ApplicationModule))]
    public class ClientModule : MabpModule
    {
        public static string AuditingConn = ConfigurationManager.ConnectionStrings["AuditingConn"]?.ConnectionString;
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = true;
            Configuration.Database.ConnectionString = ConfigurationManager.ConnectionStrings["Default"].ConnectionString;
            Configuration.Database.Dialect = Dialect.SqlServer;

            Configuration.Localization.Sources.Add(new LocalizationSource("Bpm", new LocalJsonProvider(AppPath.RootPath + "\\Content\\Custom\\Localization")));
            // #region 加载数据库层全局多语言
            var dbLanguage = new Dictionary<string, List<NameValue>>();
            IEnumerable<AppLanguage> languages = new List<AppLanguage>();
            languages = DbDapper.Query<AppLanguage>("SELECT * FROM dbo.AppLanguage WHERE EntityId = 'GlobalLanguage'");


            var langKeys = languages.GroupBy(r => r.LanguageCulture);
            foreach (var item in langKeys)
            {
                var curKeyLangs = languages.Where(r => r.LanguageCulture == item.Key).Select(r => new NameValue() { Name = r.Key, Value = r.Value }).ToList();
                dbLanguage.Add(item.Key, curKeyLangs);
            }
            Configuration.Localization.Sources.Add(new LocalizationSource("Bpm", new LocalNameValuesProvider(dbLanguage)));
            // #endregion 结束数据库多语言

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