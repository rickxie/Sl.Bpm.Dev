/// <reference path="../../../../_shared/enums.js" />

(function () {
    var controllerId = 'app.sysdesigner.views.dialogs.node.tabs.preprocessor';
    angular.module('sysdesigner').controller(controllerId, [
       '$scope', 'dialog', 'mabp.app.workflow', '$stateParams',
        function ($scope, dialog, service, $stateParams) {
            var vm = this;
            vm.node = $scope.model;
            vm.preprocessor = [];
            vm.actions = [];
            vm.informType = enums.informType;

            vm.load = function () {
                service.getNodeActions({ id: vm.node.actionLinkId }).then(function (data) {
                    vm.actions = _.filter(data, function(item) {
                        return item.type === 'event_Submit' || item.type === "event_AdditionalSigner" || item.type === "event_Agree";
                    });
                });
                service.getPreProcessorConfigs(vm.node.preProcessorLinkId).then(function (data) {
                    vm.preprocessor = data;
                });
            }
            
            //直接在界面上新增一条数据
            vm.add = function () {
                service.editPreProcessorConfig({ preProcessorLinkId: vm.node.preProcessorLinkId, fixType: 1 }).then(function (result) {
                    vm.load();
                });
            };

            //改变
            vm.change = function (item) {
                
                service.editPreProcessorConfig(item).then(function (result) {
//                    mabp.notify.success(L("Saved"));
                });
            }

            vm.edit = function (item) {
                dialog.open(_shared.dialogs.actionEditDialog, { data: vm.node, model: item }).then(function (data) {
                });
            }

            vm.remove = function (item) {
                service.deletePreProcessorConfig(item).then(function (result) {
                    vm.load();
                });
            }

            vm.setVariable = function (item) {
                dialog.open(_shared.dialogs.variableEdit, item).then(function (data) {
                    item.variableName = "<%" + data + "%>";
                    service.editPreProcessorConfig(item).then(function (result) {
                    });
                });
            }

            vm.load();
        }
    ]);
})();