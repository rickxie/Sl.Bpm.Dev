(function () {
    var controllerId = 'app.sysdesigner.views.dialogs.node.tabs.accessCondition';
    angular.module('sysdesigner').controller(controllerId, [
       '$scope', 'dialog', 'mabp.app.workflow', '$stateParams',
        function ($scope, dialog, service, $stateParams) {
            var vm = this;
            vm.node = $scope.model;

            vm.changeEntryEnable = function () {
                service.editEntryEnable(vm.node);
            }
            vm.changeEntryCondition = function () {
                service.editEntryCondition(vm.node);
            }

            vm.setVariable = function () {
                if (!vm.node.isEntryEnable) {
                    return;
                }
                dialog.open(_shared.dialogs.variableEdit).then(function (data) {
                    if (!!data) {
                        vm.node.entryCondition = (vm.node.entryCondition || "") + "<%" + data + "%>";
                    }
                });
            }

            vm.openColumn = function () {
                if (!vm.node.isEntryEnable) {
                    return;
                }
                dialog.open(_shared.dialogs.businessTableColumn, { workflowId: $stateParams.workflowId }).then(function (data) {
                    if (!!data) {
                        vm.node.entryCondition = (vm.node.entryCondition || "") + "<%" + data.schemaName + "." + data.c_SchemaName + "%>";
                    }
                });
            }

            vm.watch = function() {
                service.getFormattedResult({ data: vm.node.entryCondition }).then(function(output) {
                    vm.formatedData = output.data;
                });
            }
        }
    ]);
})();