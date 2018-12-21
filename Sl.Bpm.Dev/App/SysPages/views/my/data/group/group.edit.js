(function () {
    var controllerId = app.dialogs.define('groupEdit', '/App/SysPages/views/my/data/group/group.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.bpm','$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.model = params;

            vm.save = function () {
                vm.isSaving = true;
                vm.model.enterpriseId = $stateParams.enterpriseId;
                mabp.ui.setSaving('OrganizeEdit', service.editEnterpriseUser(vm.model).then(function() {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            };
             
        }
    ]);
})();