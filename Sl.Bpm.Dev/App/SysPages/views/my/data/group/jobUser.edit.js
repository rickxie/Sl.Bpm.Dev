(function () {
    var controllerId = app.dialogs.define('jobUserEdit', '/App/SysPages/views/my/data/group/jobUser.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.bpm','$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.enterpriseId = $stateParams.enterpriseId;
            vm.input = params || {};
            vm.model = { job: {}, users: [] };
            vm.newGroup = {};
            vm.paging = _shared.initialPage(vm, 1, 12);
            vm.save = function () {
                vm.isSaving = true;
                vm.model.targetJobId = vm.input.targetJobId;
                vm.model.job.enterpriseId = vm.enterpriseId;
                vm.model.job.type = 2;
                vm.model.groupId = vm.input.groupId;
                vm.model.users = _.map(vm.model.users, "id");
                mabp.ui.setSaving('jobUserEdit',
                service.updateJob(vm.model).then(function (data) {
                    mabp.notify.success(L("UpdateSuccessfully"));
                    vm.model.allUsers = vm.allUsers;
                    $scope.$close(vm.model);
                }), L("Saveing"));
            };



            vm.load = function() {
                vm.isLoaded = false;
                
                service.getAllEnterpriseUser(vm.paging).then(function (result) {
                    vm.allUsers = _.forEach(result.model, function(item) { item.text = '{0}({1})'.fill(item.name, item.account); });
                    if (vm.input.id != null) {
                        service.selectJob({ jobId: vm.input.id, enterpriseId: vm.enterpriseId, type: 2 }).then(function(result) {
                            vm.model = result;
                            vm.model.usernames = _.join(_.map(result.users, 'name'), ',');
                            vm.isLoaded = true;
                        });
                    } else {
                        vm.isLoaded = true;
                    }
                });
            }

            vm.delete = function () {
                service.deleteNode({ id: vm.input.id }).then(function () {
                    $scope.$close(true);
                });
            }

            vm.jobConvert = function() {
                if (vm.newGroup.langNameList == null) {
                    mabp.notify.error(L("PleaseInputNewGroupName"));
                    return;
                }
                service.jobUserToGroup({ jobId: vm.input.id, langName: vm.newGroup.langName, langNameList: vm.newGroup.langNameList }).then(function() {
                    $scope.$close(true);
                });
            }
            vm.load();

            vm.func = function (selectItem) {
                console.log(selectItem);
            };
        }
    ]);
})();