(function () {
    var controllerId = app.dialogs.define('jobGroupEdit', '/App/SysPages/views/my/data/group/jobGroup.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.bpm','$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.enterpriseId = $stateParams.enterpriseId;
            vm.input = params || {};
            vm.model = { job: {} };

            vm.save = function () {
                vm.isSaving = true;
                vm.model.targetJobId = vm.input.targetJobId;
                vm.model.job.enterpriseId = vm.enterpriseId;
                vm.model.job.type = 32;
                vm.model.groupId = vm.input.groupId;
                vm.model.users = null;
                mabp.ui.setSaving('groupBasic', service.updateJob(vm.model).then(function (data) {
                    mabp.notify.success(L("UpdateSuccessfully"));
                    $scope.$close(true);
                }), L("Saveing"));
            };
            vm.convertJob = function() {
                service.jobGroupToUser({ id: vm.input.id }).then(function(data) {
                    $scope.$close(true);
                });
            }
            vm.load = function () {
                if (vm.input.id == null) {
                    return;
                }
                service.selectJob({ jobId: vm.input.id, enterpriseId: vm.enterpriseId, type: 32 }).then(function(result) {
                    vm.model = result;
                });
            }
            vm.delete =function() {
                service.deleteNode({ id: vm.input.id }).then(function() {
                    $scope.$close(true);
                });
            }
            vm.load();
        }
    ]);
})();