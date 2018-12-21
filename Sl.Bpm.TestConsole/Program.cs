using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Sl.Bpm.TestConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            // 加载框架环境
            MiniAbp.MiniAbp.StartWithSqlServer("Default", () =>
            {
                var assemNames = Assembly.GetExecutingAssembly().GetReferencedAssemblies();
                var ass = new List<Assembly>();
                foreach (var item in assemNames)
                {
                    ass.Add(Assembly.Load(item));
                }
                return ass;
            });

            // 执行结果 
            AutoPostTest.Execute();



            Console.ReadLine();
        }
    }
}
