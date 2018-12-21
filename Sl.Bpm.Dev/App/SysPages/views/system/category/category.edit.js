(function () {
    var controllerId = app.dialogs.define('categoryEdit', '/App/SysPages/views/system/category/category.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.workflow','$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.model = params;

            vm.save = function () {
                vm.isSaving = true;
                vm.model.enterpriseId = $stateParams.enterpriseId;
                mabp.ui.setSaving('categoryEdit',
                service.editCategory(vm.model).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            };
             
        }
    ]);
})();