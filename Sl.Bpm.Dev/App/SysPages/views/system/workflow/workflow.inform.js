(function () {
    var controllerId = app.dialogs.define('workflowInformEdit', '/App/SysPages/views/system/workflow/workflow.inform.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.workflow', '$stateParams', 'dialog',
        function ($scope, params, service, $stateParams, dialog) {
            var vm = this;
            vm.model = params.data || {};
            $stateParams.workflowId = vm.model.id;
            vm.informs = [];
            vm.actions = [];
            vm.informType = enums.informType;
            vm.model.informLevel = 2;

            vm.load = function () {
                service.getWorkflowActions({ id: vm.model.id }).then(function (data) {
                    vm.actions = data;
                });
                service.getAllByInformConfigLinkId(vm.model).then(function (data) {
                    vm.informs = data;
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

            //直接在界面上新增一条数据
            vm.add = function () {
                service.editNodeInformConfig({ informLinkId: vm.model.informLinkId, informLevel: vm.model.informLevel }).then(function (result) {
                    vm.load();
                });
            };

            //改变按钮
            vm.changeType = function (item) {
                service.editNodeInformConfig(item).then(function (result) {
                });
            }

            vm.edit = function (item) {
                dialog.open(_shared.dialogs.actionEditDialog, { data: vm.model, model: item }).then(function (data) {
                });
            }

            vm.remove = function (item) {
                service.deleteNodeInformConfig(item).then(function (result) {
                    vm.load();
                });
            }

            vm.setInformTemplate = function (item) {
                vm.model.informLevel = 2;
                dialog.open(_shared.dialogs.informFormatSelect, { data: vm.model, model: item }).then(function (data) {
                    if (!!data) {
                        item.langTemplateList = data;
                        vm.changeType(item);
                    }
                });
            }

            vm.load();



        }
    ]);
})();