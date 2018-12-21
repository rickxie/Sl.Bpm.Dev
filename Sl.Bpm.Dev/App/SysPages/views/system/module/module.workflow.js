(function () {
    var controllerId = app.dialogs.define('moduleWorkflow', '/App/SysPages/views/system/module/module.workflow.html');
    app.controller(controllerId, ['$scope', 'params', 'dialog', 'mabp.app.module', function ($scope, params, dialog, service) {
        var vm = this;
        vm.module = params && (params.model || {});

        vm.load = function () {
            service.getWorkflowForModule(vm.module).then(function (data) {
                vm.model = data;
            });
        }

        vm.load();

        vm.edit = function () {
            dialog.open(app.dialogs["moduleWorkflowEdit"], { model: vm.module }).then(function (result) {
                if (result) {
                    vm.module = result;
                    vm.load();
                }
                
            });
        };

        vm.save= function() {
            service.addWorkflowForModule(vm.module).then(function () {
                $scope.$close(true);
            });
        }

        vm.remove = function () {
            service.removeWorkflowForModule(vm.module).then(function () {
                vm.load();
            });
        }

    }]);
})();