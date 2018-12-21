(function () {
    'use strict';
    var controllerId = "syspages.views.my.data.basicDataConfig";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'mabp.app.system', 'dialog', 'treeTool', '$stateParams', 'asdialog',
        function ($scope, service, dialog, treeTool, $stateParams, asdialog) {
            CheckPermission("SysModule_Data_BasicData");
            var vm = this;
            vm.menu = {};
            vm.models = [];
            vm.model = {};
            vm.configs = [];
            vm.activeMenu = {};
            vm.rootMenuId = null;
            vm.allDataConfigs = {};
            vm.filterText = "";
            vm.rootDataConfig = { id: null, text: "根数据" };
            vm.breadcrumb = [];
            vm.paging = _shared.initialPage(vm, 1, 12, "id", true);

            vm.load = function () {
                vm.paging.filters = null;
                service.getAllBasicData(vm.paging).then(function (data) {
                    vm.menu = data;
                    if (!!vm.menu) {
                        vm.switch(vm.menu[0]);
                        vm.buildXPath(vm.rootMenuId);
                    }
                });
            }
            vm.switch = function (i) {
                service.getBreadCrumbData(i.id).then(function (result) {
                    vm.rootMenuId = i.id;
                    vm.activeMenu = i;
                    //data, idField, parentIdField, displayField, selectedId
                    vm.allDataConfigs = treeTool.treeJson(result, "id", "parentId", "name", vm.activeMenu.id);
                });

            }

            vm.buildXPath = function (selectedDataId) {
                if (selectedDataId == null) {
                    return;
                }
                service.getBreadCrumbData(selectedDataId).then(function (result) {
                    //data, idField, parentIdField, displayField, selectedId
                    vm.allDataConfigs = treeTool.treeJson(result, "id", "parentId", "name", vm.activeMenu.id);
                });
            }
            vm.loadCurrentData = function (parentId) {
                if (parentId == null) {
                    return;
                }
                vm.paging.filters = [{ name: "parentId", value: parentId }];
                service.getAllBasicData(vm.paging).then(function (result) {
                    vm.models = result;
                    vm.selectModels = result;
                });
            }

            vm.editDataType = function (m) {
                asdialog.open(app.dialogs.basicDataTypeEdit, m).then(function (result) {
                    if (result) {
                        vm.load();
                    }
                });
            }

            vm.output = function (item) {
                console.log(item.name + ":" + item.id);
            }
            vm.edit = function (m) {
                if (!m) {
                    m = {};
                    m.parentId = vm.activeMenu.id;
                }
                dialog.open(app.dialogs.basicDataConfigEdit, m).then(function (result) {
                    if (result) {
                        vm.loadCurrentData(vm.activeMenu.id);
                    }
                });
            }

            //加载树形结构图，左边的值被选中后触发 
            $scope.$watch('vm.activeMenu.id', function (newvalue, oldvalue) {
                if (newvalue == null) {
                    return;
                }
                vm.buildXPath(newvalue);
                vm.loadCurrentData(newvalue);
                //$stateParams.parentId = vm.activeMenu.id;
            });

            $scope.$watch('vm.breadcrumb', function (newValue) {
                vm.xPath = _.join(_.map(newValue, 'value'), '>');
            });
            vm.goToChildren = function (m) {
                vm.activeMenu = m;
            }

            vm.delete = function (m) {
                service.deleteBasicDataConfig(m).then(function () {
                    vm.loadCurrentData(vm.activeMenu.id);
                });
            }

            vm.load();

            vm.barConfig = {
                animation: 150,
                ghostClass: "selectitem",
                handle: ".handle",
                onSort: function (evt) {
                    if (evt.oldIndex != evt.newIndex) {
                        service.updateBasicDataOrder(vm.models);
                    }
                },
                orderMember: "displayOrder"
            };

            vm.select = function () {
                vm.models = [];
                for (var i = 0; i < vm.selectModels.length; i++) {
                    if (vm.filterText == "") {
                        vm.models.push(vm.selectModels[i]);
                    } else {
                        if ((vm.selectModels[i].value || "").indexOf(vm.filterText) >= 0 || (vm.selectModels[i].name || "").indexOf(vm.filterText) >= 0)
                            vm.models.push(vm.selectModels[i]);
                    }
                }
                return vm.models;
            }

            vm.event_Keydown = function (event) {
                if (event.keyCode == 13) {
                    vm.select();
                }
            }

            vm.import = function (m) {
                if (!m) {
                    m = {};
                    m.parentId = vm.activeMenu.id;
                }
                dialog.open(app.dialogs.basicDataConfigImport, m).then(function (data) {
                    if (!!data) {
                        vm.loadCurrentData(vm.activeMenu.id);
                    }
                });
            }
        }
    ]);
})();