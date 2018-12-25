(function () {
    'use strict';
    var controllerId = "syspages.views.my.data.groupExtension";
    angular.module('app').controller(controllerId, [
        '$scope', 'treeTool', 'mabp.app.bpm', 'asdialog', '$stateParams', 'dialog',
        function ($scope, treeTool, service, asdialog, $stateParams, dialog) {
            CheckPermission("SysModule_Data_GroupExtension");
            var vm = this;
            vm.paging = _shared.initialPage(vm, 1, 10, "DisplayOrder", false);
            vm.filter = {};
            vm.load = function () {
                vm.paging.pushFilter({ name: "Name", value: vm.filter.name });
                vm.paging.pushFilter({ name: "AreaCode", value: vm.filter.areaCode });
                vm.paging.pushFilter({ name: "Fax", value: vm.filter.fax });
                vm.paging.pushFilter({ name: "Address", value: vm.filter.address });
                service.getGroupExtension(vm.paging).then(function (result) {
                    vm.models = result.data;
                    vm.paging.totalCount = result.totalCount;
                });
            }

            vm.showSearch = false;
            vm.show = function () {
                vm.showSearch = !vm.showSearch;
            }


            vm.edit = function(m) {
                asdialog.open(app.dialogs.groupExtensionEdit, m).then(function (result) {
                        vm.load();
                });
            }


            vm.selectS = function () {
                vm.load();
            }

            vm.clearS = function() {
                vm.filter = {};
                vm.load();
            }

            vm.load();

        }
    ]);
})();