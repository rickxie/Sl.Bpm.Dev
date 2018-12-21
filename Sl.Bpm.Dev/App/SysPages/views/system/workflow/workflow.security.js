(function () {
    var controllerId = app.dialogs.define('workflowSecurity', '/App/SysPages/views/system/workflow/workflow.security.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.workflow', '$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.model = params.model || {};
          
        }
    ]);
})();