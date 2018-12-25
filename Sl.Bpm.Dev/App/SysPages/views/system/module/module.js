(function () {
    'use strict';
    var controllerId = "syspages.views.enterprise.module";
    angular.module('app').controller(controllerId, [
        '$scope', 'mabp.app.module', 'mabp.app.permission', 'dialog', '$state', '$stateParams', function ($scope, service, permissonservice, dialog, $state, $stateParams) {
            CheckPermission("Menu_Sys_Module");
            var vm = this;
            vm.menu = angular.extend({}, enums.moduleType);
            vm.activeMenu = vm.menu[0];
            vm.list = [];
            vm.filterText = "";
            vm.models = [];
            vm.paging = _shared.initialPage(vm);
            vm.load = function () {
                vm.paging.pageSize = 12;
                mabp.ui.setLoading('.module_content',
                service.getAllModule(vm.paging).then(function (result) {
                    vm.models = result;
                    vm.preSelectModels = _.map(result, function (item) { item.name = (item.description || '') + ' / ' + item.name });
                    vm.switch('TYPE', vm.activeMenu);
                    vm.loadCountNumber();
                    vm.isLoaded = true;

                    service.loadModuleCategory().then(function (result) {
                        vm.moduleCategory = result;
                    });
                }));


            }
            vm.loadCountNumber = function () {
                var nonItems = _.filter(vm.models, { type: 0 });
                var masterdataItems = _.filter(vm.models, { type: 1 });
                var reportItems = _.filter(vm.models, { type: 2 });
                var workflowItems = _.filter(vm.models, { type: 3 });
                vm.menu[0].count = _.filter(masterdataItems, { isEnable: true }).length + '/' + masterdataItems.length;
                vm.menu[1].count = _.filter(reportItems, { isEnable: true }).length + '/' + reportItems.length;
                vm.menu[2].count = _.filter(workflowItems, { isEnable: true }).length + '/' + workflowItems.length;
                vm.menu[3].count = _.filter(nonItems, { isEnable: true }).length + '/' + nonItems.length;
            }
            //新增修改模块
            vm.edit = function (m) {
                dialog.open(app.dialogs["moduleEdit"], { model: m }).then(function (result) {
                    if (result)
                        vm.load();
                });
            };

            //新增修改分类
            vm.editCategory = function (m) {
                dialog.open(app.dialogs["moduleCategory"], { model: m }).then(function (result) {
                    if (result)
                        vm.load();
                });
            }
            vm.switchModule = function (m) {
                var isEnable = m.isEnable;
                service.switchModule(m).then(function (result) {
                    if (result && isEnable) {
                        mabp.notify.success(L("OpenSuccessfully"));
                    } else {
                        mabp.notify.success(L("CloseSuccessfully"));
                    }
                    vm.loadCountNumber();
                }, function () {
                    m.isEnable = !isEnable;
                });
            }

            vm.delete = function (m) {
                service.deleteModule(m).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    vm.load();
                });
            }

            vm.switch = function (type, i) {
                //面板列表展示为模块分类 或者是模块类型
                vm.panelShowType = type;
                vm.activeMenu = i;
                vm.listUpdated = !vm.listUpdated;
                if (type === 'TYPE') {
                    vm.allList = _.filter(vm.models, { type: i.id });
                    vm.list = _.filter(vm.models, { type: i.id });
                } else if (type === "CATEGORY") {
                    //加载所有绑定的模块
                    service.loadModuleCategoryMap(vm.activeMenu.id).then(function (result) {
                        vm.moduleCategoryDetail = result;
                        vm.refreshPreSelectedModel();
                    });
                }
            }

            vm.load();

            //关联页面
            vm.page = function (p) {
                dialog.open(app.dialogs["modulePage"], { model: p }).then(function (result) {
                    if (!!result)
                        vm.load();
                });
            }
            //关联流程
            vm.associateWorkflow = function (p) {
                dialog.open(app.dialogs["moduleWorkflow"], { model: p }).then(function (result) {
                    if (!!result)
                        vm.load();
                });
            }

            vm.editCg = function (p) {
                permissonservice.getPermissionControlGroupByEntityId(p.id).then(function (result) {
                    if (result != undefined && result != null) {
                        dialog.open(app.dialogs.cgEdit, result);
                    }
                    else {
                        dialog.open(app.dialogs.cgEdit, permissonservice.addAndGetGroupControl({ Name: p.name, EntityId: p.id })).then(function (result) {
                            if (!!result) {
                                vm.load();
                            }
                        });
                    }
                })
            }

            vm.associatePage = function () {
                dialog.open(app.dialogs["modulePageEdit"], { model: vm.module }).then(function (result) {
                    if (result) { }
                });
            };
            vm.listUpdated = false;
            vm.barConfig = {
                animation: 150,
                ghostClass: "selectitem",
                handle: ".handle",
                onSort: function (evt) {
                    if (evt.oldIndex != evt.newIndex) {
                        service.updateModuleOrder(vm.list);
                    }
                },
                orderMember: "displayOrder"
            };
            vm.catConfig = {
                animation: 150,
                ghostClass: "selectitem",
                handle: ".handle",
                onSort: function (evt) {
                    if (evt.oldIndex != evt.newIndex) {
                        service.updateModuleCategoryItemOrder(vm.moduleCategoryDetail);
                    }
                },
                orderMember: "displayOrder"
            };
            vm.catParentConfig = {
                animation: 150,
                ghostClass: "selectitem",
                handle: ".handle",
                onSort: function (evt) {
                    if (evt.oldIndex != evt.newIndex) {
                        service.updateModuleCategoryOrder(vm.moduleCategory);
                    }
                },
                orderMember: "displayOrder"
            };

            vm.select = function () {
                vm.list = [];
                var filter = vm.filterText.toLowerCase();
                for (var i = 0; i < vm.allList.length; i++) {
                    if (filter == "") {
                        vm.list.push(vm.allList[i]);
                    } else {
                        if ((vm.allList[i].description || "").toLowerCase().indexOf(filter) >= 0 || (vm.allList[i].name || "").toLowerCase().indexOf(filter) >= 0 || (vm.allList[i].wfdWorkflowName || "").toLowerCase().indexOf(filter) >= 0)
                            vm.list.push(vm.allList[i]);
                    }
                }
                return vm.list;
            }

            vm.event_Keydown = function (event) {
                if (event.keyCode == 13) {
                    vm.select();
                }
            }
            vm.newCategoryDetail = {};
            //分类 
            //新增或删除 分类明细
            vm.addModuleCategoryMap = function () {
                var m = vm.newCategoryDetail;
                var inIt = _.findIndex(vm.moduleCategoryDetail, { moduleId: m.moduleId }) > -1;
                if (inIt) {
                    mabp.notify.error("已经绑定过啦");
                    vm.newCategoryDetail = {};
                } else {
                    var module = _.find(vm.models, { id: m.moduleId });
                    var dto = { moduleId: m.moduleId, moduleCategoryId: vm.activeMenu.id };
                    service.addOrDeleteModuleCategoryMap(dto).then(function (result) {
                        mabp.notify.success("添加成功");
                        result.name = module.name;
                        result.description = module.description;
                        vm.moduleCategoryDetail.push(result);
                        vm.refreshPreSelectedModel();
                    });
                }
            }
            vm.deleteModuleCategoryMap = function (m) {

                service.addOrDeleteModuleCategoryMap(m).then(function () {
                    mabp.notify.error("移除成功");
                    _.remove(vm.moduleCategoryDetail, m);
                    vm.refreshPreSelectedModel();
                });
            }

            //排除已经被选择过的候选项
            vm.refreshPreSelectedModel = function () {
                vm.preSelectModels = _.filter(vm.models, function (item) { return _.findIndex(vm.moduleCategoryDetail, { moduleId: item.id }) == -1 });
            }
        }
    ]);
})();