using System;
using System.Configuration;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;
using Castle.Core;
using MiniAbp.Configuration;
using MiniAbp.DataAccess;
using MiniAbp.DataAccess.Dapper;
using MiniAbp.Dependency;
using MiniAbp.Domain;
using MiniAbp.Extension;
using MiniAbp.Localization;
using MiniAbp.Logging;
using MiniAbp.Reflection;
using MiniAbp.Web.Auditing;
using Sl.Bpm.Application;
using Sl.Bpm.Application.Base;
using Sl.Bpm.Application.Dto;
using Sl.Bpm.Application.Module;
using Sl.Bpm.Application.Service;
using Sl.Bpm.Model;
using Sl.Bpm.Model.Tables;

namespace Sl.Bpm
{
    [DependsOn(typeof(ApplicationModule))]
    public class DesignerModule : MabpModule
    {
        public static string AuditingConn = ConfigurationManager.ConnectionStrings["AuditingConn"]?.ConnectionString;
        public override void PreInitialize()
        {
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
            //配置Redis 内存缓存
            Configuration.Custom.Set("RedisServerAddress", ConfigurationManager.AppSettings["RedisServerAddress"]);

            //模块dll 引用配置
            var baseDirectory = AppDomain.CurrentDomain.BaseDirectory + "bin\\";
            Configuration.Custom.Set(CustomConfig.ModuleDllReference, new string[]{
                            //加载所有依赖的程序集
                            "mscorlib.dll",
                            "System.dll",
                            "System.Core.dll",
                            "System.Data.dll",
                            "System.Web.dll",
                            "System.Linq.dll",
                            "System.Xml.dll",
                            baseDirectory + "Sl.Bpm.Application.dll",
                            baseDirectory + "Sl.Bpm.Engine.dll",
                            baseDirectory + "NPOI.dll",
                            baseDirectory + "Sl.Bpm.Model.dll",
                            baseDirectory + "MiniAbp.dll",
                            baseDirectory + "Sl.Plugin.dll"
                        });

            //模块dll 自动生成的 using 配置
            Configuration.Custom.Set(CustomConfig.ModuleUsingReference, @"
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Sl.Bpm.Application.Base;
using Sl.Bpm.Application.Module;
using Sl.Bpm.Engine;");
//            ModelModule.CreateDatabaseIfNotExists<Sl.Bpm.DbUpgrade.DbContext>();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly()); 

        }


    }
}