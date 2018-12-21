(function () {
    var controllerId = app.dialogs.define('moduleEdit', '/App/SysPages/views/system/module/module.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.module', '$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.model = params && (params.model || {});
            vm.types = enums.get('moduleType');
            vm.save = function () {
                vm.isSaving = true;
                vm.model.enterpriseId = $stateParams.enterpriseId;
                mabp.ui.setSaving('moduleEdit',
                service.editModule(vm.model).then(function() {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            };
            vm.delete = function () {
                service.deleteModule(vm.model).then(function () {
                    mabp.notify.success(L("DeleteSuccessfully"));
                    $scope.$close(true);
                });
            }

            //模块打开方式
            vm.moduleOpenTypes = enums.get("moduleOpenType");
        }
    ]);
})();