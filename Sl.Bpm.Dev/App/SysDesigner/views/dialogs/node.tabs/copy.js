/// <reference path="../../../../_shared/enums.js" />

(function () {
    var controllerId = 'app.sysdesigner.views.dialogs.node.tabs.copy';
    angular.module('sysdesigner').controller(controllerId, [
       '$scope', 'dialog', 'mabp.app.workflow', '$stateParams',
        function ($scope, dialog, service, $stateParams) {
            var vm = this;
            vm.node = $scope.model;
            vm.copys = [];
            vm.actions = [];

            vm.load = function () {
                service.getNodeActions({ id: vm.node.actionLinkId }).then(function (data) {
                    vm.actions = data;
                });
                service.getAllNodeCopyConfigsByCopyLinkId(vm.node.copyLinkId).then(function (data) {
                    vm.copys = data;
                });
            }

            //按钮变化后更新数据库值
            vm.change = function (item) {
                item.enterpriseId = vm.node.enterpriseId;
                item.actionLinkId = vm.node.actionLinkId;
                service.editActionEnable(item).then(function() {
                    mabp.notify.success(L("StateHasBeenSaved"));
                });
            }

            //多语言设置后更新数值
            vm.changeLang = function (item) {
                item.enterpriseId = vm.node.enterpriseId;
                item.actionLinkId = vm.node.actionLinkId;
                service.editActionLang(item).then(function () {
                    mabp.notify.success(L("MultiLanguageHasBeenSaved"));
                });
            }

            vm.changeNode = function (item) {
                item.returnToNodes = vm.selectedNodes.join(',');
                service.editActionReturnToNodes(item);
            }
            
            //直接在界面上新增一条数据
            vm.add = function () {
                service.addOrUpdateNodeCopyConfig({ copyLinkId: vm.node.copyLinkId }).then(function (result) {
                    vm.load();
                });
            };

            //改变按钮
            vm.changeType = function (item) {
                service.addOrUpdateNodeCopyConfig(item).then(function (result) {
                });
            }

            vm.edit = function (item) {
                dialog.open(_shared.dialogs.actionEditDialog, { data: vm.node, model: item }).then(function (data) {
                });
            }

            vm.remove = function (item) {
                service.deleteCopyConfig(item).then(function (result) {
                    vm.load();
                });
            }

            vm.load();
        }
    ]);
})();