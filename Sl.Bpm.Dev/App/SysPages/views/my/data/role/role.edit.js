(function () {
    var controllerId = app.dialogs.define('roleEdit', '/App/SysPages/views/my/data/role/role.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.bpm', '$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.model = params;

            vm.save = function () {
                vm.isSaving = true;
                mabp.ui.setSaving('enterpriseRoleEdit',
                service.editEnterpriseRole(vm.model).then(function() {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            };
             
        }
    ]);
})();