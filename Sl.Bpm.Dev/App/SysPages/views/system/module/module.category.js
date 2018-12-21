(function () {
    var controllerId = app.dialogs.define('moduleCategory', '/App/SysPages/views/system/module/module.category.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.module', '$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.model = params && (params.model || {});
            vm.save = function () {
                vm.isSaving = true;
                vm.model.enterpriseId = $stateParams.enterpriseId;
                mabp.ui.setSaving('moduleEdit',
                service.editModuleCategory(vm.model).then(function() {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            };
            vm.delete = function () {
                service.deleteModuleCategory(vm.model).then(function () {
                    mabp.notify.success(L("DeleteSuccessfully"));
                    $scope.$close(true);
                });
            } 
        }
    ]);
})();