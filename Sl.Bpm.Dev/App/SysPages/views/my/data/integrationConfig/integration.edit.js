(function () {
    var controllerId = app.dialogs.define('integrationEdit', '/App/SysPages/views/my/data/integrationConfig/integration.edit.html');
    angular.module('app').controller(controllerId,
        ['$scope', 'params', 'mabp.app.bpm', function ($scope, params, service) {
            var vm = this;
            vm.model = params;

            vm.types = [
                { value: 1, text: "文件" },
                { value: 2, text: "WebService" },
                { value: 3, text: "中间表" }
            ];

            vm.save = function () {
                vm.isSaving = true;
                mabp.ui.setSaving('integrationEdit',
                service.editIntegration(vm.model).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            };

        }]);
})();