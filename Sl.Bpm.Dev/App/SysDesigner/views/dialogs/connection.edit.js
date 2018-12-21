(function () {
    var controllerId = app.dialogs.define('connectionEdit', '/App/sysdesigner/views/dialogs/connection.edit.html');
    angular.module('sysdesigner').controller(controllerId, [
        'params', '$scope', 'mabp.app.workflow', 'dialog', '$stateParams',
        function (params, $scope, service, dialog, $stateParams) {
            var vm = this;

            vm.model = params || {};

            //数据Load 处理
            vm.initialize = function () {
                service.getLink({ id: params.id }).then(function (result) {
                    vm.model = result;
                });
            }
            //数据Save 处理
            vm.afterShow = function () {
                vm.model.useCondition = parseInt(vm.model.useCondition);
            }
            //一级弹窗保存
            vm.save = function () {
                service.saveSingleLink(vm.model).then(function(result) {
                    $scope.$close(vm.model);
                });
            };

            vm.openVar = function () {
                if (!vm.model.useCondition) {
                    return;
                }
                dialog.open(_shared.dialogs.variableEdit).then(function (data) {
                    if (!!data) {
                        vm.model.conditionValue = (vm.model.conditionValue || "") + "<%" + data + "%>";
                    }
                });
            }
            vm.openColumn = function () {
                if (!vm.model.useCondition) {
                    return;
                }
                dialog.open(_shared.dialogs.businessTableColumn, { workflowId: $stateParams.workflowId }).then(function (data) {
                    if (!!data) {
                        vm.model.conditionValue = (vm.model.conditionValue || "") + "<%" + data.schemaName + "." + data.c_SchemaName + "%>";
                    }
                });
            }
            vm.cancel = function () {
                $scope.$close(null);
            };
            vm.initialize();
            vm.watch = function () {
                service.getFormattedResult({ data: vm.model.conditionValue }).then(function (output) {
                    vm.formatedData = output.data;
                });
            }
           

        }
    ]);
})();