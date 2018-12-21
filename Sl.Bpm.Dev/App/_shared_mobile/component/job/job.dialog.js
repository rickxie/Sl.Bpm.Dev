(function () {
    var controllerId = _shared.dialogs.define('jobDialog', '/App/_shared_mobile/component/job/job.dialog.html');
    angular.module('app.shared').controller(controllerId, ['mabp.app.bpm', 'params', '$scope',
        function (groupService, params, $scope) {
            var vm = this;
            vm.selectedGroupId = "";
            vm.jobs = [];
            //查询文本
            vm.selectTxt = "";

            vm.myKeyup = function(e){
                if (window.event.keyCode == 13) {
                    vm.loadJobList();
                }
            };

            //保存并返回
            vm.save = function (data) {
                $scope.$close(data);
            };

            groupService.getGroupTree().then(function (data) {
                vm.groupArray = data;
                console.log("groupService.getGroupTree()",data);
                //肯定只会有一个根节点
                //var groupsJson = treeTool.toFormatTreeJson(_.filter(data, { isRoot: true }), vm.selectedGroupId)[0];
                //vm.allGroups = treeTool.toFormatTreeJson(_.filter(data, { isRoot: false }), vm.selectedGroupId);
                vm.allGroups.push([]);
            });

            $scope.$watch("vm.selectedGroupId", function (newvalue, oldvalue) {
                vm.selectTxt = "";
                if (!!newvalue) {
                    groupService.getJobs({ GroupId: vm.selectedGroupId, EnterpriseId: params.enterpriseId }).then(function (data) {
                        debugger;
                        vm.jobList = data;
                    });
                }
            });

           
            vm.loadJobList = function () {
                groupService.getAllJobs({ GroupId: vm.selectedGroupId, EnterpriseId: params.enterpriseId, Filter: { name: 'filter', value: vm.selectTxt } }).then(function (data) {
                    vm.jobList = data;
                }); 
            }

        }
    ]);
})();