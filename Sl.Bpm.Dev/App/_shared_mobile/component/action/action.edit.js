/// <reference path="../../../_shared/enums.js" />
/// <reference path="G:\Project\Yooya.Bpm\Sl.Bpm\Content/Lib/miniAbp/framework/mabp.js" />

(function () {
    var controllerId = _shared.dialogs.define('actionEditDialog', '/App/_shared_mobile/component/action/action.edit.html');
    angular.module('app.shared').controller(controllerId, [
       '$scope', 'dialog', 'mabp.app.workflow', '$stateParams', 'params',
        function ($scope, dialog, service, $stateParams, params) {
            var vm = this;
            vm.node = params.data;
            vm.model = {
                isEnable: true,
                displayOrder: 0,
                actionLinkId: vm.node.actionLinkId
            };
            if (!!params.model) {
                vm.model = params.model;
                var vars = !!vm.model.variableValue ? vm.model.variableValue.split("=") : ''.split("=");
                vm.variableName = vars[0];
                vm.variableValue = vars[1];
            }
            //初始化默认动作按钮组
            vm.actorList = _.filter(enums.actionButtons, function(item) {
                return item.nodeRestrict == vm.node.type;
            });

            service.getOtherStepNodes({ id: vm.node.id, selectedId: vm.node.wfdWorkflowId }).then(function (result) {
                vm.model.workflowNodes = result;
            });

            vm.save = function () {
                if (vm.model.type != 'event_RecedeToSepcificStep') vm.model.returnToNodes = "";
                vm.model.variableValue = !!vm.variableValue ? (vm.variableName || "") + "=" + vm.variableValue : "";
                service.editNodeAction(vm.model).then(function (data) {
                    $scope.$close();
                });
            }
            vm.cancel = function () { $scope.$close(); }

            vm.selectVariable = function () {
                dialog.open(_shared.dialogs.variableEdit, vm.variableName).then(function (data) {
                    if (!!data) {
                        vm.variableName = "<%" + data + "%>";
                    }
                });
            }
        }
    ]);
})();