(function () {
    var controllerId = app.dialogs.define('userEdit', '/App/SysPages/views/my/data/user/user.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.bpm', '$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.model = params;
            //是否加载
            vm.loaded = { roleJobLoaded: false, jobGroupLoaded: false };
            vm.activePanel = 'basic';
            vm.save = function () {
                vm.isSaving = true;
                vm.model.enterpriseId = $stateParams.enterpriseId;
                mabp.ui.setSaving('enterpriseUserEdit',
                service.editEnterpriseUser(vm.model).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            };

            vm.loadJobGroup = function () {
                if (vm.loaded.jobGroupLoaded) return;
                if (vm.model) {
                    service.getSelectedUserJobs({ Id: vm.model.id }).then(function (data) {
                        vm.jobGroups = data;
                    });
                }
            }

            vm.loadRoleJob = function () {
                if (vm.loaded.roleJobLoaded) return;
                if (vm.model) {
                    service.getSelectedRoleJobs({ Id: vm.model.id }).then(function (data) {
                        vm.roleJobs = data;
                    });
                }
            }
            // 监控Tab变化加载
            $scope.$watch('vm.activePanel', function (newV, oldV) {
                switch (newV) {
                    case 'job': vm.loadRoleJob(); break;
                    case 'group': vm.loadJobGroup();break;
                    default:
                }

            })
            
            
        }
    ]);
})();