(function () {
    'use strict';
    var controllerId = "syspages.views.enterprise.category";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'mabp.app.workflow', 'asdialog', '$state', '$stateParams',function ($scope, service, asdialog, $state, $stateParams) {
            var vm = this;
            vm.models = [];
            _shared.initialPage(vm);
            vm.load = function () {
                vm.paging.pageSize = 12;
                vm.paging.filters = [{ name: "EnterpriseId", value: $stateParams.enterpriseId }];
                service.getAllCategory(vm.paging).then(function (result) {
                    vm.models = result.model;
                    vm.isLoaded = true;
                });
            }

            vm.edit = function (m) {
                asdialog.open(app.dialogs["categoryEdit"], m).then(function (result) {
                    if(result)
                    vm.load();
                });
            };
            vm.detail = function(m) {
                $state.go('enterprise.workflow', { id: m.id});
            }


            vm.delete = function (m) {
                       service.deleteCategory(m).then(function () {
                           mabp.notify.success(L("OperationSucceeded"));
                        vm.load();
                    }); 
            }
            vm.load();
        }
    ]);
})();