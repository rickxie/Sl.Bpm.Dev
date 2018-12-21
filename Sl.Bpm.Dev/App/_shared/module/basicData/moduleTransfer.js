//模块跳转器
_shared.service('basicDataModuleTransfer', [
    'asdialog', 'dialog', 'mabp.app.module', 'appSession', '$state', '$rootScope',
 function (asdialog, dialog, service, session, $state, $rootScope) {
     var moduleTransfer = {}
     //获取页面相关信息 并且跳转
     /*
         data 页面的基本数据收集存放*/

     //内嵌
     function embedded(module) {
         $state.go('my.datamodule', { moduleId: module.id });
     }

     //新窗口
     function newWindow(module) {
         window.open("/BasicData/BasicDataModule?moduleId={0}".fill(
             module.id
         ));
     }

     function getPageAndJump(module) {
         debugger;
         var d = $.Deferred();

         if (module.openType === 0) {
             if ($rootScope.basicDataGlobalOpenType === '1')
                 embedded(module);
             else if ($rootScope.basicDataGlobalOpenType === '2') {
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