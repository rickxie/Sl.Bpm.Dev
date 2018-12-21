(function () {
    var controllerId = 'app.sysdesigner.views.dialogs.node.tabs.jumpWay';
    angular.module('sysdesigner').controller(controllerId, [
       '$scope', 'dialog', 'mabp.app.workflow', '$stateParams',
        function ($scope, dialog, service, $stateParams) {
            var vm = this;
            vm.node = $scope.model;
            vm.jumpWay = {};

            vm.load = function () {
                service.getOtherStepNodes({ id: vm.node.id, selectedId: vm.node.wfdWorkflowId }).then(function (result) {
                    vm.processNodes = result;
                });

                if (vm.node.jumpTypeBinary == null) {
                    vm.node.jumpTypeBinary = "00000";
                }
                var na = vm.node.jumpTypeBinary;
                vm.jumpWay.nonPerson = Boolean(parseInt(na[0]));
                vm.jumpWay.anySame = Boolean(parseInt(na[1]));
                vm.jumpWay.oneStepPersonSame = Boolean(parseInt(na[2]));
                vm.jumpWay.prePersonSame = Boolean(parseInt(na[3]));
                vm.jumpWay.submitPersonSame = Boolean(parseInt(na[4]));
            }
            vm.changeJumpTypeBinary = function() {
                vm.node.jumpTypeBinary = "" + Number(vm.jumpWay.nonPerson)
                                        + Number(vm.jumpWay.anySame)
                                        + Number(vm.jumpWay.oneStepPersonSame)
                                        + Number(vm.jumpWay.prePersonSame)
                                        + Number(vm.jumpWay.submitPersonSame);
                service.editJumpTypeBinary(vm.node);
            }
            vm.changeJumpNode = function() {
                service.editJumpNodeId(vm.node);
            }
        }
    ]);
})();