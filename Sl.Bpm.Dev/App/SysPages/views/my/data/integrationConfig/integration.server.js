(function () {
    var controllerId = app.dialogs.define('integrationServerConfig', '/App/SysPages/views/my/data/integrationConfig/integration.server.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.bpm', '$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.model = params;
            vm.save = function () {
                vm.isSaving = true;
                vm.model.enterpriseId = $stateParams.enterpriseId;
                service.editInterfaceServerConfig(vm.model).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                    vm.isSaving = false;
                }, function () {
                    vm.isSaving = false;
                });
            };

            vm.delete = function () {
                service.deleteInterfaceServerConfig(vm.model).then(function () {
                    mabp.notify.success(L("DeleteSuccessfully"));
                    $scope.$close(true);
                });
            }

        }
    ]);
})();