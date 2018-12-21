using MiniAbp.Dependency;
using Sl.Bpm.Application.Experts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sl.Bpm.TestConsole
{
    public static class AutoPostTest
    {
        public static void Execute()
        {
            CodeExpert expert = IocManager.Instance.Resolve<CodeExpert>();
            var result = expert.MethodExecuteByCodeItemId("c5bdcbcc-775b-4a8d-9c50-f4f36f07f472", 
                new Model.Tables.JobTaskQueue() {
                    CodeItemId = "c5bdcbcc-775b-4a8d-9c50-f4f36f07f472",
                    Input = "",
                    ParaA = "Test"
                });
            

        }
    }
}
