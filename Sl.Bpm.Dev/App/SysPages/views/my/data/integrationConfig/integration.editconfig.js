(function () {
    var controllerId = app.dialogs.define('integrationEditConfig', '/App/SysPages/views/my/data/integrationConfig/integration.editconfig.html');
    angular.module('app').controller(controllerId,
        ['$scope', 'params', 'mabp.app.bpm', function ($scope, params, service) {
            var vm = this;
            vm.type = params.type;
            vm.title = params.description;
            vm.configId = params.configLinkId;
            vm.model = {};
            vm.servers = [];
            
            vm.load = function () {
                if (vm.type == 1) {
                    service.getIntegrationFileByConfigId(vm.configId).then(function (data) {
                        if (!!data) {
                            vm.model = data;
                        } 
                        vm.model.configLinkId = vm.configId;
                    });
                }
                if (vm.type == 2) {
                    service.getIntegrationFileByConfigId(vm.configId).then(function (data) {
                        if (!!data) {
                            vm.model = data;
                        }
                        vm.model.configLinkId = vm.configId;
                    });
                }
                if (vm.type == 3) {
                    service.getIntegrationFileByConfigId(vm.configId).then(function (data) {
                        if (!!data) {
                            vm.model = data;
                        }
                        vm.model.configLinkId = vm.configId;
                    });
                }
                service.getAllInterfaceServerConfigs().then(function (data) {
                    if (!!data) {
                        vm.servers = data;
                    }
                });
            };

            vm.load();

            vm.save = function () {
                vm.isSaving = true;
                if (vm.type == 1) {
                    mabp.ui.setSaving('integrationEditFile',
                    service.editIntegrationFile(vm.model).then(function () {
                        mabp.notify.success(L("OperationSucceeded"));
                        $scope.$close(true);
                    }), L("Saveing"));
                }
                if (vm.type == 2) {
                    mabp.ui.setSaving('integrationEditConfig',
                    service.editIntegrationFile(vm.model).then(function () {
                        mabp.notify.success(L("OperationSucceeded"));
                        $scope.$close(true);
                    }), L("Saveing"));
                }
                if (vm.type == 3) {
                    mabp.ui.setSaving('integrationEditConfig',
                    service.editIntegrationFile(vm.model).then(function () {
                        mabp.notify.success(L("OperationSucceeded"));
                        $scope.$close(true);
                    }), L("Saveing"));
                }
            };

        }]);
})();