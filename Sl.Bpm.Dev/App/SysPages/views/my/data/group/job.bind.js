(function () {
    var controllerId = app.dialogs.define('jobBind', '/App/SysPages/views/my/data/group/job.bind.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.bpm','$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.enterpriseId = $stateParams.enterpriseId;
            var input = params || {};
            vm.models = [];
            vm.selectedGroupId = null;
            $scope.$watch("vm.selectedGroupId", function(newValue, oldValue, scope) {
                service.getJobs({ groupId: newValue, enterpriseId: vm.enterpriseId }).then(function(rtnData) {
                    vm.jobs = rtnData;
                });
            });

            service.getNoAssignedGroup({ enterpriseId: $stateParams.enterpriseId }).then(function (result) {
                vm.models = result;
            });
             
            vm.save = function () {
                mabp.ui.setSaving("jobBindOrg", service.jobBindGroup({ id: input.sourceJobId, selectedId: vm.selectedGroupId }).then(function (data) {
                     $scope.$close(true);
                }), L("Saveing"));
            }

        }
    ]);
})();