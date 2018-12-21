(function () {
    var controllerId = app.dialogs.define('groupExtensionEdit', '/App/SysPages/views/my/data/groupExtension/groupExtension.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.bpm', '$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.model = params;

            vm.save = function () {
                vm.model.enterpriseId = $stateParams.enterpriseId;
                mabp.ui.setSaving('GroupExtensionEdit', service.editGroupExtension(vm.model).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            };

            vm.delete = function () {
                mabp.ui.setSaving('Delete', service.deleteGroupExtension(vm.model).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Delete"));
            }


        }
    ]);
})();