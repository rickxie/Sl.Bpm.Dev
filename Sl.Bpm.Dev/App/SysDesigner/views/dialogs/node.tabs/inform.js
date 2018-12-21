
(function () {
    var controllerId = 'app.sysdesigner.views.dialogs.node.tabs.inform';
    angular.module('sysdesigner').controller(controllerId, [
       '$scope', 'dialog', 'mabp.app.workflow', '$stateParams',
        function ($scope, dialog, service, $stateParams) {
            var vm = this;
            vm.node = $scope.model;
            $scope.informConfig = {};
            $scope.informConfig.workflowId = vm.node.wfdWorkflowId;
            $scope.informConfig.nodeId = vm.node.id;
            $scope.informConfig.informLevel = 3;
            $scope.informConfig.nodeType = vm.node.type;
            $scope.informConfig.actionLinkId = vm.node.actionLinkId;
            $scope.informConfig.informLinkId = vm.node.informLinkId;
        }
    ]);
})();