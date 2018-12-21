(function () {
    var controllerId = 'app.sysdesigner.views.dialogs.node.tabs.examination';
    angular.module('sysdesigner').controller(controllerId, [
       '$scope', 'dialog', 'mabp.app.workflow', '$stateParams',
        function ($scope, dialog, service, $stateParams) {
            var vm = this;
            vm.node = $scope.model;
           
            vm.changeExamineEnable = function() {
                service.editExamineEnable(vm.node);
            }
            vm.changeExamineStandardTime = function() {
                service.editExamineStandardTime(vm.node);
            }

        }
    ]);
})();