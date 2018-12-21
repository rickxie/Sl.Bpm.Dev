(function () {
    app.controller('system.database.mappingedit', ['$scope', 'mabp.app.table', '$stateParams', '$timeout',
        function ($scope, service, $stateParams, $timeout) {
            var vm = this;

            service.getAllInterfaceServerConfigs($stateParams.id).then(function (data) {
                vm.servers = data;
            });

            service.getMappingFileConfig($stateParams.id).then(function (data) {
                vm.model = data;
                if (!vm.model.integrationFile)
                    vm.model.integrationFile = {};
                vm.model.integrationFile.configLinkId = $stateParams.id;
                vm.model.integrationFile.enterpriseId = vm.model.viewTable.enterpriseId;
            });

            vm.save = function () {
                vm.isSaving = true;
                mabp.ui.setSaving('variableEdit',
                service.editMappingFileConfig(vm.model).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                }), L("Saveing"));
            };

            vm.allViewType = enums.get("viewType");

            vm.delete = function () {
                vm.isDeleting = true;
                service.deleteViewTable(vm.model).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    vm.isDeleting = false;
                }, function () {
                    vm.isDeleting = false;
                });
            }
        }
    ]);
})();