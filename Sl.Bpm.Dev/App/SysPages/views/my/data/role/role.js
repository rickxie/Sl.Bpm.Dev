(function () {
    'use strict';
    var controllerId = "syspages.views.my.data.role";
    angular.module('app').controller(controllerId, [
        '$scope', 'dialog', 'mabp.app.bpm', 'treeTool', function ($scope, dialog, service, treeTool) {
            CheckPermission("SysModule_Data_Role");
            var vm = this;
            vm.rootRole = { id: null, text: L("RootRole") };
            vm.filterText = "";

            //加载角色树信息
            vm.load = function () {
                mabp.ui.setLoading('.role_tree',
                service.getRoleTree().then(function (data) {
                    vm.roleArray = data;
                    //肯定只会有一个根节点
                    vm.allRoles = treeTool.toFormatTreeJson(_.filter(data, { isRoot: true }), vm.selectedRoleId);
                    vm.loadRoleJob(vm.selectedRoleId);
                }));
            }

            vm.loadRoleJob = function (roleId) {
                mabp.ui.setLoading('.rolejob_table',
                service.getAllRoleJob({ id: roleId }).then(function (data) {
                    vm.allList = data;
                    vm.list = data;
                }));
            }

            //vm.test1 = function () {
            //    service.insertRole().then(function () {
            //    });
            //};

            //vm.test2 = function () {
            //    service.insertRoleUser().then(function () {
            //    });
            //};


            //选择某个角色
            $scope.$watch("vm.selectedRoleId", function (newvalue, oldvalue) {
                vm.loadRoleJob(newvalue);
            });

            //新增角色
            vm.addRole = function () {
                dialog.open(app.dialogs.roleEdit, { parentId: vm.selectedRoleId }).then(function (result) {
                    if (result) {
                        vm.load();
                    }
                });
            }
            //新增岗位
            vm.addJob = function () {
                //vm.filter = { groupId: '8a46cb5c-db94-449f-a05c-6e32720da27b' };
                //dialog.open(_shared.dialogs['formSelect'], { datacode: "GellAllJobsUnderGroupId", datatype: "view", filter: vm.filter, valueMember: "id" }).then(function (data) {
                //    debugger;
                //    if (data !== null && data !== undefined) {
                //        vm.items = data.items;
                //        vm.IsSelectData = true;
                //        var jobId = data.selectItem;
                //        if (vm.selectedRoleId == null) {
                //            mabp.notify.error(L("ChooseARoleFirstly"));
                //        }
                //        service.saveRoleJob({ jobId: jobId, roleId: vm.selectedRoleId }).then(function (data) {
                //            vm.loadRoleJob(vm.selectedRoleId);
                //        });
                //    } else if (data === null) {
                //    }
                //});

                dialog.open(_shared.dialogs.jobDialog, { enterpriseId: vm.enterpriseId }).then(function (data) {
                    if (!!data) {
                        var jobId = data.id;
                        if (vm.selectedRoleId == null) {
                            mabp.notify.error(L("ChooseARoleFirstly"));
                        }
                        service.saveRoleJob({ jobId: jobId, roleId: vm.selectedRoleId }).then(function (data) {
                            vm.loadRoleJob(vm.selectedRoleId);
                        });
                    }
                });
            }
            //新增岗位
            vm.editJob = function (item) {
                service.saveRoleJobArea({ id: item.id, areaCode: item.areaCode, memo: item.memo }).then(function (data) {
                    mabp.notify.success(L("OperationSucceeded"));
                }, function (data) { });
            }
            vm.clickRoleJob = function (item) {
                //Role Clicked
                if (item.type == 1) {
                    vm.selectedRoleId = item.id;
                }
            }
            vm.editRole = function (item) {
                dialog.open(app.dialogs.roleEdit, item).then(function (result) {
                    if (result) {
                        vm.load();
                    }
                });
            }
            vm.delete = function (item) {
                if (item.type == 1) {
                    service.deleteRole({ id: item.id }).then(function () {
                        vm.load();
                    });
                }
                if (item.type == 2) {
                    service.deleteRoleJob({ id: item.id }).then(function () {
                        vm.load();
                    });
                }
            }

            vm.select = function () {
                vm.list = [];
                var filter = vm.filterText.toLowerCase();
                for (var i = 0; i < vm.allList.length; i++) {
                    if (filter == "") {
                        vm.list.push(vm.allList[i]);
                    } else {
                        if ((vm.allList[i].areaCode || "").toLowerCase().indexOf(filter) >= 0 || (vm.allList[i].description || "").toLowerCase().indexOf(filter) >= 0 || (vm.allList[i].name || "").toLowerCase().indexOf(filter) >= 0)
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

            //初始化调用数据
            vm.load();
        }
    ]);
})();