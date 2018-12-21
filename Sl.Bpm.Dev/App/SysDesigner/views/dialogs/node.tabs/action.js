(function () {
    var controllerId = 'app.sysdesigner.views.dialogs.node.tabs.action';
    angular.module('sysdesigner').controller(controllerId, [
       '$scope', 'dialog', 'mabp.app.workflow', '$stateParams',
        function ($scope, dialog, service, $stateParams) {
            var vm = this;
            vm.node = $scope.model;

            //整合标准值
            vm.initialize = function () {
                //被选中的返回节点
                vm.selectedNodes = [];
                //所有可被选中的节点
                vm.otherNodes = [];
                vm.newButtons = [];
                //初始化默认动作按钮组
                var btnEvents = enums.actionButtons;
                vm.standardButtons = _.filter(btnEvents, function (item) {
                    if (!!vm && vm.node) return item.nodeRestrict == vm.node.type;
                });

                vm.isLoaded = false;

                service.getNodeActions({ id: vm.node.actionLinkId }).then(function (result) {
                    var newButtons = angular.copy(result);
                    _.forEach(newButtons, function (item) {
                        var findedItem = {};
                        findedItem = _.find(vm.standardButtons, { type: item.type });
                        if (findedItem != null) {
                            vm.newButtons.push(angular.extend(item, { displayText: findedItem.displayText, nodeRestrict: findedItem.nodeRestrict, style: findedItem.style, type: findedItem.type }));
                        }
                    });

                    //获取返回到指定节点的按钮值
                    var nodeAction = _.find(newButtons, { type: 'Event_RecedeToSepcificStep' });
                    if (nodeAction != null && nodeAction.returnToNodes != null)
                        vm.selectedNodes = nodeAction.returnToNodes.split(',');
                    service.getOtherStepNodes({ id: vm.node.id, selectedId: vm.node.wfdWorkflowId }).then(function (result) {
                        vm.otherNodes = _.forEach(result, function (item) { item.text = item.displayName });
                        vm.isLoaded = true;
                    });
                });
            }



            //按钮变化后更新数据库值
            vm.change = function (item) {
                item.enterpriseId = vm.node.enterpriseId;
                item.actionLinkId = vm.node.actionLinkId;
                service.editActionEnable(item).then(function () {
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

            //打开动作编辑界面
            vm.open = function () {
                dialog.open(_shared.dialogs.actionEditDialog, { data: vm.node }).then(function (data) {
                    vm.initialize();
                });
            };

            vm.editActor = function (item) {
                dialog.open(_shared.dialogs.actionEditDialog, { data: vm.node, model: item }).then(function (data) {
                    vm.initialize();
                });
            }

            vm.remove = function (item) {
                service.deleteActionReturnToNodes(item).then(function (result) {
                    vm.initialize();
                });
            }

            vm.barConfig = {
                animation: 150,
                ghostClass: "selectitem",
                handle: ".handle",
                onSort: function (evt) {
                    if (evt.oldIndex != evt.newIndex) {
                        service.editNodeActions(vm.newButtons);
                    }
                },
                orderMember: "displayOrder"
            };
        }
    ]);
})();