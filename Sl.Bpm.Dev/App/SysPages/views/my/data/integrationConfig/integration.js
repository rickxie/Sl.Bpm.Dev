(function () {
    'use strict';
    var controllerId = "syspages.views.my.data.integration";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'dialog', 'mabp.app.bpm', '$stateParams', function ($scope, dialog, service, $stateParams) {
            var vm = this;
            vm.menu = [{ id: 1, name: "接口配置" }, { id: 2, name: "服务器配置" }];
            vm.activeMenuId = 1;
            vm.activeMenu = {};
            vm.models = [];
            vm.modelServer = [];

            vm.switch = function (i) {
                vm.activeMenuId = i.id;
                vm.activeMenu = i;
                vm.showDiv();

                switch (vm.activeMenuId) {
                    case 1:
                        vm.loadIntegration();
                        break;
                    case 2:
                        vm.loadIntegrationServer();
                        break;
                }
            }
            
            vm.showDiv = function () {
                if (vm.activeMenuId == 1) {
                    angular.element("#div_server").hide();
                    angular.element("#div_integration").show();
                }
                else if (vm.activeMenuId == 2) {
                    angular.element("#div_integration").hide();
                    angular.element("#div_server").show();
                }
            }

            vm.showDiv();

            //系统集成
            vm.paging = _shared.initialPage(vm, 1, 12, "Id", false);
            vm.loadIntegration = function () {
                service.getAllIntegrations({ pageInput: vm.paging, codeOrDescription: vm.codeOrDescription }).then(function (data) {
                    if (!!data) {
                        vm.models = data.model;
                        vm.paging.totalCount = data.totalCount;
                    }
                });
            }
            vm.loadIntegration();

            vm.editIntegration = function (item) {
                dialog.open(app.dialogs.integrationEdit, item).then(function () {
                    vm.loadIntegration();
                });
            }

            vm.editIntegrationConfig = function (item) {
                dialog.open(app.dialogs.integrationEditConfig, item).then(function () {

                });
            }

            vm.editIntegrationMapping = function (item) {
                dialog.open(app.dialogs.integrationEditMapping, item).then(function () {

                });
            }

            vm.loadIntegrationServer = function () {
                service.getAllInterfaceServerConfigs().then(function (data) {
                    if (!!data) {
                        vm.modelServer = data;
                    }
                });
            }
            vm.editIntegrationServer = function (item) {
                dialog.open(app.dialogs.integrationServerConfig, item).then(function () {

                });
            }
        }
    ]);
})();