(function () {
    var controllerId = app.dialogs.define('integrationDispatchConfig', '/App/SysPages/views/my/data/integrationDispatchConfig/integrationDispatchConfig.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.bpm', '$stateParams', 'mabp.app.table',
        function ($scope, params, service, $stateParams, tableService) {
            var vm = this;

            vm.server = params.server;
            vm.model = params.model;
            if (vm.model) {
                if (vm.model.execTime) {
                    vm.model.execTimeStr = new Date("1980/01/01 " + vm.model.execTime);
                }
                //    if (vm.model.startTime) {
                //        vm.model.startTime = new Date(vm.model.startTime);
                //    }
            }

            tableService.getAllBusinessTable().then(function (data) {
                vm.tables = data;
            });

            vm.processType = enums.get("interfaceConfigProcessType");
            vm.loopTypes = enums.get("interfaceConfigLoopType");
            vm.save = function () {
                vm.isSaving = true;
                vm.model.enterpriseId = $stateParams.enterpriseId;
                if (vm.model.execTimeStr) {
                    vm.model.execTime = moment(vm.model.execTimeStr).format("HH:mm"); //new Date(vm.model.execTimeStr).format("hh:mm");
                }
                vm.model.serverId = vm.server.id;
                service.editInterfaceConfig(vm.model).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }, function () {

                });
            };

            vm.delete = function () {
                service.deleteInterfaceConfig(vm.model).then(function () {
                    mabp.notify.success(L("DeleteSuccessfully"));
                    $scope.$close(true);
                });
            }

        }
    ]);
})();