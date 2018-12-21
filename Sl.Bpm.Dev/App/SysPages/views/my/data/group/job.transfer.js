(function () {
    var controllerId = app.dialogs.define('jobTransfer', '/App/SysPages/views/my/data/group/job.transfer.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.bpm','$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.enterpriseId = $stateParams.enterpriseId;
            var input = params || {};
            vm.allGroups = input.allGroups;
            vm.sourceGroupId = input.sourceGroupId;
            vm.name = input.name;
            vm.souceJobId = input.sourceJobId;
            vm.targetJobId = "";
            vm.selectedGroupId = null;
            vm.activeType = 1;
            vm.selectedJobs = [];
            vm.jobs = null;
            $scope.$watch("vm.selectedGroupId", function(newValue, oldValue, scope) {
                service.getJobs({ groupId: newValue, enterpriseId: vm.enterpriseId }).then(function(rtnData) {
                    vm.jobs = rtnData;
                });
            });

             
            $scope.$watchCollection("vm.selectedJobs", function (a, b, c) {
                // your logic goes here
                vm.targetJobId = a[0] && a[0].id;
            });

            vm.save = function() {
                if (vm.selectedJobs == null || vm.selectedJobs.length === 0) {
                    mabp.message.info(L("ChooseOneJobAtLeast"));
                    return;
                }
                mabp.ui.setSaving('jobTransfer', service.hasChildNode({ sourceJobId: vm.souceJobId }).then(function (result) {
                    if (result.data) {
                        mabp.message.confirm(L("WhetherToMoveTheChildJobTogether"), L("JobChange"), function (data) {
                            if (data) {
                                service.moveNode({ sourceJobId: vm.souceJobId, targetJobId: vm.targetJobId, includeChildrenJob: true, selectedId: vm.sourceGroupId }).then(function (result) {
                                    $scope.$close(true);
                                });
                            } else {
                                service.moveNode({ sourceJobId: vm.souceJobId, targetJobId: vm.targetJobId, includeChildrenJob: false, selectedId: vm.sourceGroupId }).then(function (result) {
                                    $scope.$close(true);
                                });
                            }
                        });
                    } else {
                        service.moveNode({ sourceJobId: vm.souceJobId, targetJobId: vm.targetJobId, includeChildrenJob: false, selectedId: vm.sourceGroupId }).then(function (result) {
                            $scope.$close(true);
                        });
                    }
                }), L("Saveing"));
                
            }

        }
    ]);
})();