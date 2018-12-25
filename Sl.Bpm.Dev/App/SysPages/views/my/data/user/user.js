(function () {
    'use strict';
    var controllerId = "syspages.views.my.data.user";
    angular.module('app').controller(controllerId, [
        '$scope', 'asdialog', 'mabp.app.bpm', '$stateParams', function ($scope, asdialog, service, $stateParams) {
            CheckPermission("SysModule_Data_User");
            var vm = this;
            vm.models = [];
            vm.paging = _shared.initialPage(vm, 1, 18);
            vm.load = function () {
                vm.paging.filters = [{ name: 'filterText', value: vm.selectTxt }];
                service.getAllEnterpriseUser(vm.paging).then(function (data) {
                    vm.models = data.model;
                    vm.paging.totalCount = data.totalCount;
                    vm.isLoaded = true;
                });
            }

            vm.event_KeyDown_SelectUser = function (event) {
                if (event.keyCode == 13) {
                    vm.load();
                }
            }

            vm.edit = function (m) { asdialog.open(app.dialogs["userEdit"], m).then(function (data) { if (data) vm.load(); }); }

            vm.delete = function (m) {
                service.deleteEnterpriseUser(m).then(function (data) {
                    mabp.notify.success(L("DeleteUserSuccessfully"));
                    vm.load();
                });
            }
            vm.load();
        }
    ]);
})();