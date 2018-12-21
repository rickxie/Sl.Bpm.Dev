(function () {
    var controllerId = _shared.dialogs.define('preProcessorDialog', '/App/_shared/component/preProcessor/preprocessor.dialog.html');
    angular.module('app.shared').controller(controllerId, [
        'params', '$scope', 'mabp.app.taskRead', 'dialog',
        function (params, $scope, serviceRead, dialog) {
            var vm = this;
            vm.data = $scope || {};
            vm.models = params || [];
            vm.currentStep = 0;
            //分步处理 全部放入vm.models中。 当前步为vm.model
            vm.model = vm.models[0];
            //如果为全部则设置的人为动态添加。

            //当前处于哪一步
            $scope.$watch('vm.currentStep', function (newV, oldV) {
                //需要选择的数据来源
                vm.model = vm.models[newV];
                vm.refreshSelectedUser();
            });

            //从组织中去选人
            vm.selectGroupUser = function (item) {
                //默认被选中的人
                dialog.open(_shared.dialogs.jobUserDialog, { value: '', enterpriseId: vm.enterpriseId, ismulti: !item.singleSelected }).then(function (data) {
                    if (!!data) {
                        if (Array.isArray(data)) {
                            for (var i = 0; i < data.length; i++) {
                                var item = { id: data[i].jobUserId, userName: data[i].userName, $checked: true, jobName: data[i].jobName };
                                vm.pushUserInGroup(item);
                            }
                        } else {
                            var selectedItem = { id: data.jobUserId, userName: data.userName, $checked: true, jobName: data.jobName };
                            vm.pushUserInGroup(selectedItem);
                        }
                    }
                });
            }
            //将人加入当前组
            vm.pushUserInGroup = function (item) {
                if (vm.model.singleSelected) {
                    vm.model.$checkedId = item.id;
                }
                var userList = vm.model.processors;
                var existUser = _.filter(userList, { id: item.id });
                if (existUser != null && existUser.length !== 0) {
                    existUser.$checked = true;
                } else {
                    userList.push(item);
                    vm.refreshSelectedUser();
                }
            }
            //一级弹窗保存
            vm.finish = function (data) {
                var varGroup = [];
                _.forEach(vm.models, function (item) {
                    if (item.variableName == null || item.variableName == '') return;
                    var nv = {
                        name: item.variableName,
                        value: _.join(_.map(_.filter(item.processors, function (item) { return item.$checked; }), 'id'), ",")
                    }
                    varGroup.push(nv);
                });
                $scope.$close(varGroup);
            };

            //勾选
            vm.checked = function (item) {
                var hasChecked = item.$checked;
                if (vm.model.singleSelected) {
                    _.forEach(vm.model.processors, function (item) {
                        item.$checked = false;
                    });
                    var it = _.filter(vm.model.processors, { id: item.id });
                    it[0].$checked = !hasChecked;
                    vm.model.$checkedId = it[0].$checked ? it[0].id : '';
                } else {
                    item.$checked = !hasChecked;
                }
                vm.refreshSelectedUser();
            }

            //移除被选中的用户
            vm.removeSelectedUser = function (i) {
                //                for (var j = 0; j < vm.model.processors.length; j++) {
                //                    if (i.id === vm.model.processors[j].id) {
                //                        vm.model.processors[j].$checked = false;
                //                    }
                //                }
                //                 
                //                //新被选中的人
                //                var newItems = [];
                //                _.map(vm.selected, function (item) {
                //                    if (i.id !== item.id) {
                //                        newItems.push(item);
                //                    }
                //                });
                //                vm.selected = newItems;
                vm.checked(i);
            }

            vm.refreshSelectedUser = function () {
                //被选中的人列表
                vm.selected = _.filter(vm.model.processors, { $checked: true });
            }
            vm.currentDisabled = function () {
                return _.findIndex(vm.model.processors, { $checked: true }) == -1;
            }
            vm.cancel = function () {
                $scope.$close();
            };
        }
    ]);
})();