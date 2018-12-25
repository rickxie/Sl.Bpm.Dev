(function() {
    'use strict';
    var controllerId = "syspages.views.my.data.enum";
    angular.module('app').controller(controllerId, [
        '$scope', 'asdialog', 'mabp.app.system', '$stateParams', function ($scope, asdialog, service, $stateParams) {
            CheckPermission("SysModule_Data_Enum");
            var vm = this;
            vm.models = [];
            vm.enmus = [];
            vm.newModel = {};
            vm.menu = [
                {
                    name: "GroupLevel",//L("GroupLevel"),
                    id: 'GroupLevel'
                },
                {
                    name: "GroupType",//L("GroupType"),
                    id: 'GroupType'
                },
                {
                    name: "JobLevel",//L("JobLevel"),
                    id: 'JobLevel'
                }
            ];
            vm.langChange= function(item) {
                console.log('langChange' + JSON.stringify(item.langNameList));
            }
            vm.activeMenu = vm.menu[0];
            vm.resetNewModel = function () {
                vm.newModel.langName = vm.newModel.langName != null ? null : '';
                vm.newModel = {
                    langName: null,
                    value: null,
                    'enum': vm.activeMenu.id,
                    $edit: true
                };
            }
            vm.switch = function(menu) {
                vm.activeMenu = menu;
                vm.models = _.filter(vm.enmus, { 'enum': vm.activeMenu.id });
                vm.resetNewModel();
            }

            vm.load = function () {
                service.getAllEnums(_shared.initialPage(vm)).then(function (result) {
                    vm.enmus = result;
                    vm.models = _.filter(vm.enmus, { 'enum': vm.activeMenu.id });
                    vm.resetNewModel();
                });
            }
            //新增
            vm.add = function(m) {
                if (!!m && m.langNameList.length < 2) {
                    mabp.notify.error(L("NameCannotBeNull"));
                    vm.isSaving = false;
                    return false;
                }
                else if (!m.value) {
                    mabp.notify.error(L("ValueCannotBeNull"));
                    vm.isSaving = false;
                    return false;
                }
                return true;
            }

            //保存
            vm.save = function (m) {
                vm.isSaving = true;
                if (vm.add(m)) {
                    service.editEnum(m).then(function (data) {
                        vm.isSaving = false;
                        vm.load();
                    });
                }
            }

            vm.delete = function (model) {
                service.deleteEnum(model).then(function (data) {
                    vm.load();
                });
            } 
            vm.cancel = function (item, $index) {
                if (item.id == null)
                    vm.models.splice($index, 1);
                else {
                    item.$edit = false;
                }
            } 
            vm.load();
        }
    ]);
})();