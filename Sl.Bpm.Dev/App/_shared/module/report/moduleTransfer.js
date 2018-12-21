//模块跳转器
_shared.service('reportModuleTransfer', [
    'asdialog', 'dialog', 'mabp.app.module', 'appSession', '$state', '$rootScope',
 function (asdialog, dialog, service, session, $state, $rootScope) {
     var moduleTransfer = {}
     //获取页面相关信息 并且跳转
     /*
         data 页面的基本数据收集存放*/

     //内嵌
     function embedded(module) {
         $state.go('my.reportmodule', { moduleId: module.id });
     }

     //新窗口
     function newWindow(module) {
         window.open("/Report/ReportModule?moduleId={0}".fill(
             module.id
         ));
     }

     function getPageAndJump(module) {
         var d = $.Deferred();

         if (module.openType === 0) {
             if ($rootScope.reportGlobalOpenType === '1')
                 embedded(module);
             else if ($rootScope.reportGlobalOpenType === '2') {
                 newWindow(module);
                 d.resolve(true);
             } else
                 embedded(module);
         }
         else if (module.openType === 1) {
             embedded(module);
         }
         else if (module.openType === 2) {
             newWindow(module);
             d.resolve(true);
         } else
             embedded(module);

         return d.promise();
     }


     moduleTransfer.open = function (module) {
         return getPageAndJump(module);
     }

     return moduleTransfer;
 }
]);