(function () {
    var controllerId = app.dialogs.define('workflowControl', '/App/SysPages/views/system/workflow/workflow.control.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.permission', '$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.model = _.cloneDeep(params);
            vm.detail = [];
            vm.newItem = {};
            vm.load = function () {
                if (vm.model != null && vm.model.id != null)
                    service.getAllPermissionControlGroupItem(vm.model.id).then(function(data) {
                        vm.detail = data;
                    });
            }
            vm.save = function () {
                vm.isSaving = true;
                if (vm.model.displayOrder == null) {
                    vm.model.displayOrder = 0;
                }
                mabp.ui.setSaving('enterpriseRoleEdit',
                service.savePermissionGroupControl({ master: vm.model, detail: vm.detail }).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            };
            vm.delete = function () {
                if (vm.model.id != null)
                    service.deleteControlGroup(vm.model.id).then(function() {
                        mabp.notify.success("删除成功");
                        $scope.$close(true);
                    });
            }
            vm.deleteItem = function (item) {
                if (item.id == null) {
                    _.remove(vm.detail, item);
                } else {
                    service.removePermissionGroupControlItem(item.id).then(function () {
                        _.remove(vm.detail, item);
                    });
                }
            }
            vm.saveItem = function () {
                if (!vm.newItem.value && vm.newItem.type != "60")
                    return;
                //公司多选，拆分
                if (vm.newItem.type == 50) {
                    var values = vm.newItem.value.split(',');
                    for (var i = 0; i < values.length; i++) {
                        vm.detail.push({
                            type: 50,
                            value: values[i]
                        });
                    }
                } else {
                    vm.detail.push(vm.newItem);
                }
                vm.newItem = {};
            }

            vm.load();
        }
    ]);
})();