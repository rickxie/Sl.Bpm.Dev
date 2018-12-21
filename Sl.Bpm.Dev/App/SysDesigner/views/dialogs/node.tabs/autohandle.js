(function () {
    var controllerId = 'app.sysdesigner.views.dialogs.node.tabs.autohandle';
    angular.module('sysdesigner').controller(controllerId, [
       '$scope', 'dialog', 'mabp.app.workflow', '$stateParams',
        function ($scope, dialog, service, $stateParams) {
            var vm = this;
            vm.node = $scope.model;
            vm.model = {};
            vm.model.id = vm.node.id;
            vm.model.autoCallType = vm.node.autoCallType;
            vm.model.autoCallValue = vm.node.autoCallValue;

            vm.autoCallType = [{ id: "2", displayName: "Sql" }, { id: "1", displayName: "Dll" }, { id: "3", displayName: "Intergration" }];

            vm.setVariable = function () {
                dialog.open(_shared.dialogs.variableEdit).then(function (data) {
                    if (!!data) {
                        vm.model.autoCallValue = (vm.model.autoCallValue || "") + "<%" + data + "%>";
                    }
                });
            }

            vm.changeHandle = function () {
                service.editAutoHandle(vm.model);
            };
        }
    ]);
})();