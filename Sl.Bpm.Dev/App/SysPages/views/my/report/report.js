(function () {
    'use strict';
    var controllerId = "syspages.views.my.report";
    angular.module('app').controller(controllerId, [
        '$scope', 'asdialog', 'mabp.app.module', '$state', 'moduleHandler', 'appSession',
        function ($scope, asdialog, service, $state, module, session) {
            CheckPermission("Menu_My_Report");
            var vm = this;
            vm.load = function () {
                mabp.ui.setLoading('.data_load',
                 service.loadModuleCategoryWithPage(2).then(function (result) {
                     vm.categorys = _.groupBy(result, 'categoryId');
                     vm.categoryList = [];
                     for (var a in vm.categorys) {
                         _.remove(vm.categorys[a], function (item) { return !session.permissions[item.id] });
                         if (vm.categorys[a].length > 0) {
                             vm.categoryList.push({ name: _.find(result, { categoryId: a }).categoryName, id: a });
                         }
                     }
                     if (vm.activeCategoryId == null && vm.categoryList[0] != null) {
                         vm.activeCategoryId = vm.categoryList[0].id;
                     }
                 }));
            }

            vm.openModule = function (m) {
                module.open(m);
            }

            vm.setFavourite = function (m, event) {
                module.setFavourite(m, event);
            }

            vm.load();
        }
    ]);
})();