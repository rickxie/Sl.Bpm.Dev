(function () {
    'use strict';
    var controllerId = "syspages.views.my.data.group";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'treeTool', 'mabp.app.bpm', 'asdialog', '$stateParams', 'dialog', function ($scope, treeTool, service, asdialog, $stateParams, dialog) {
            CheckPermission("SysModule_Data_Group");
            var vm = this;
            vm.enterpriseId = $stateParams.enterpriseId;
            // 已分配的Group & 未分配的Group
            vm.allGroups = [];
            //岗位数组 用于画图
            //vm.jobs = [];
            //左侧树中被选中的某个项的  Id
            vm.selectedGroupId = null;
            //生成的岗位树Json
            vm.jobsJson = {};
            vm.jobUsers = []; // [{jobId : xx, UserName}, {jobId : xxx, UserName: xxx}]
            vm.groupArray = [];
            /*
                从数据库加载数据,以下情况会被调用
                1.页面初次加载
                2.岗位被删除
                3.岗位被移动
                4.新增组织
            */
            vm.load = function () {
                mabp.ui.setLoading('.org_tree_container',
                service.getGroupTree({ id: vm.enterpriseId }).then(function (result) {
                    vm.groupArray = result;
                    //肯定只会有一个根节点
                    var groupsJson = treeTool.toFormatTreeJson(_.filter(result, { isRoot: true }), vm.selectedGroupId)[0];
                    vm.allGroups = treeTool.toFormatTreeJson(_.filter(result, { isRoot: false }), vm.selectedGroupId);
                    vm.allGroups.push(groupsJson);
                    if (vm.selectedGroupId != null) {
                        vm.selectGroup(vm.selectedGroupId);
                    }
                }));


            };
            //被选中的某个组织后获取岗位树
            vm.selectGroup = function (groupId) {
                if (groupId == null) {
                    return;
                }
                mabp.ui.setLoading(".org_chart",
                service.getJobTreeAndUser({ groupId: groupId, enterpriseId: vm.enterpriseId }).then(function (result) {
                    vm.jobsJson = result.jobTree[0];
                    vm.jobUsers = result.jobTreeUser;
                }));
            };



            //将拖放到某个岗位下
            vm.dropTo = function (parsedObj) {
                var sourceId = parsedObj.sourceId;
                var targetId = parsedObj.targetId;
                var type = parsedObj.type;
                var name = parsedObj.name;
                //若对某个岗位添加 用户类型岗位
                if (type === "ADD_USER") {
                    asdialog.open(app.dialogs.jobUserEdit, { targetJobId: targetId, groupId: vm.selectedGroupId }).then(function (result) {
                        if (result != null)
                            vm.load();
                    });
                }
                    //若对某个岗位添加  组织类型岗位
                else if (type === "ADD_GROUP") {
                    asdialog.open(app.dialogs.jobGroupEdit, { targetJobId: targetId, groupId: vm.selectedGroupId }).then(function (result) {
                        if (result != null)
                            vm.load();
                    });
                }
                    //若为节点之间的拖动
                else if (type === "NODE") {
                    //拖放检查
                    //TODO: 如果拖放至自身的父节点 应该直接返回 
                    //TODO: 如果包含子节点 给出提示是否需要拖家带口
                    if (targetId === sourceId) {
                        return;
                    }
                    service.moveNode({ sourceJobId: sourceId, targetJobId: targetId, selectedId: vm.selectedGroupId, enterpriseId: vm.enterpriseId }).then(function (result) {
                        vm.load();

                    });
                }
                else if (type === "TRANSFER") { //移动岗位
                    dialog.open(app.dialogs.jobTransfer, { sourceJobId: sourceId, allGroups: vm.allGroups, name: name, sourceGroupId: vm.selectedGroupId }).then(function (result) {
                        if (result != null) vm.load();
                    });
                }
                else if (type === "BIND") { //绑定组织
                    dialog.open(app.dialogs.jobBind, { sourceJobId: sourceId, allGroups: vm.allGroups, name: name }).then(function (result) {
                        if (result != null) {
                            vm.load();
                            mabp.notify.success(L("BindSuccessfully"));
                        }
                    });
                }
                else if (type === "UNBIND") { //移除绑定组织
                    service.jobUnBindGroup({ id: sourceId }).then(function (data) {
                        mabp.notify.success(L("UnBindSuccessfully"));
                        vm.load();
                    });
                }
                else {
                    return;
                }
            };
            //将某个岗位删除
            vm.deleteJob = function (jobId) {
                service.deleteNode({ preDeletedId: jobId, selectedId: vm.selectedGroupId, enterpriseId: vm.enterpriseId }).then(function (result) {
                    vm.load();
                });
            };

            //新增组织
            //vm.newGroup = function () {
            //    asdialog.open(app.dialogs.groupEdit, {}).then(function () { vm.load(); });
            //};
            //删除左侧的组织
            vm.deleteGroup = function (groupId) {
                service.deleteUserGroup({ id: groupId }).then(function () {
                    vm.jobsJson = {};
                    vm.selectedGroupId = null;
                    vm.load();
                });
            }

            //编辑左侧的组织
            /*
                groupId is the group being edited.
                CallBack is a function to update the name of the group
            */
            //vm.editGroup = function (groupId, callBack) {
            //    asdialog.open(app.dialogs.groupEdit, { id: groupId }, callBack);
            //}
            //双击岗位图 或者组织
            vm.dbClick = function (id, clickType, callBack) {
                if (clickType === "JOB") {
                    asdialog.open(app.dialogs.jobUserEdit, { id: id, groupId: vm.selectedGroupId }).then(function (result) {
                        if (result != null) vm.load();
                    });
                }
                else if (clickType === "GROUP") {
                    service.getJobTreeByJobId({ id: id }).then(function (result) {
                        vm.selectedGroupId = result;
                        //$scope.$apply();
                    });
                }
            }
            //进入子组织
            vm.groupJobProperty = function (jobId) {
                asdialog.open(app.dialogs.jobGroupEdit, { id: jobId, groupId: vm.selectedGroupId }).then(function (result) {
                    if (result != null) vm.load();
                });

            };

            //加载树形结构图，左边的值被选中后触发 
            $scope.$watch('vm.selectedGroupId', function () {
                vm.selectGroup(vm.selectedGroupId);
            });

            //页面初次加载
            vm.load();
        }
    ]);
})();