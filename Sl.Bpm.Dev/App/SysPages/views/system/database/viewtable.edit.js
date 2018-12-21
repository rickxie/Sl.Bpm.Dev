(function () {
    app.controller('system.database.viewtableedit', ['$scope', 'mabp.app.table', '$stateParams', '$timeout',
        function ($scope, service, $stateParams, $timeout) {
            var vm = this;

            service.getViewTableById($stateParams.id).then(function (data) {
                vm.model = data[0];
            });

            vm.save = function () {
                vm.isSaving = true;
                mabp.ui.setSaving('variableEdit',
                service.editViewTable(vm.model).then(function () {
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