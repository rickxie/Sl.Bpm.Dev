(function () {
    var controllerId = 'app.sysdesigner.views.dialogs.node.tabs.processor';
    angular.module('sysdesigner').controller(controllerId, [
       '$scope', 'dialog', 'mabp.app.workflow', '$stateParams',
        function ($scope, dialog, service, $stateParams) {
            var vm = this;
            vm.node = $scope.model;
            vm.changeProcessType = function () {
                service.editProcessType(vm.node);
            }
        }
    ]);
})();