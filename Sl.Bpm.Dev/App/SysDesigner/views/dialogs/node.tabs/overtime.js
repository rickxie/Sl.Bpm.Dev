(function () {
    var controllerId = 'app.sysdesigner.views.dialogs.node.tabs.overtime';
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
            $scope.informConfig.informLinkId = vm.node.overtimeInformLinkId;

            vm.informType = enums.informType;
            vm.overtimes = [];
            var m = {
                informLevel: 3,
                informLinkId: vm.node.overtimeInformLinkId
            };

            vm.load = function () {
                service.getNodeActions({ id: vm.node.actionLinkId }).then(function (data) {
                    vm.actions = data;
                });
               
                service.getAllByInformConfigLinkId(m).then(function (data) {
                    vm.overtimes = data;
                });
            }

            //直接在界面上新增一条数据
            vm.add = function () {
                service.editNodeInformConfig(m).then(function (result) {
                    vm.load();
                });
            };

            vm.remove = function (item) {
                service.deleteNodeInformConfig(item).then(function (result) {
                    vm.load();
                });
            };

            

            //改变按钮
            vm.changeType = function (item) {
                service.editNodeInformConfig(item).then(function (result) {
                });
            }

            vm.edit = function (item) {
                dialog.open(_shared.dialogs.actionEditDialog, { data: vm.node, model: item }).then(function (data) {
                });
            }

            vm.changeInformEnable = function () {
                service.editIsOvertimeInformEnable(vm.node);
            }
            vm.changeActionEnable = function () {
                service.editIsOvertimeActionEnable(vm.node);
            }

            vm.changeAutoType = function () {
                service.editOvertimeActionType(vm.node);
            }

            vm.changeBeginTime = function () {
                service.editOvertimeBeginTime(vm.node);
            }

            vm.changeIntervalTime = function () {
                service.editOvertimeIntervalTime(vm.node);
            }

            vm.changeOvertimeActionTime = function () {
                service.editOvertimeActionTime(vm.node);
            }

            vm.load();
        }
    ]);
})();