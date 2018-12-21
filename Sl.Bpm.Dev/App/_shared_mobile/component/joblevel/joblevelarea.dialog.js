(function () {
    var controllerId = _shared.dialogs.define('jobLevelAreaDialog', '/App/_shared/component/joblevel/joblevelarea.dialog.html');
    angular.module('app.shared').controller(controllerId, [
        'mabp.app.bpm', 'params', '$scope', 'mabp.app.system', '$stateParams', 'treeTool',
        function (groupService, params, $scope, service, $stateParams, treeTool) {
            var vm = this;
            vm.data = $scope || {};
            vm.model = [];
            vm.selectData = {
                startJobLevelId: "",
                startJobLevelName: "",
                endJobLevelId: "",
                endJobLevelName: ""
            };

            //数据Load 处理
            vm.beforeShow = function () {
                service.getEnums({ id: "JobLevel" }).then(function (result) {
                    vm.model = result;
                });
            }

            groupService.getGroupTree().then(function (data) {
                vm.groupArray = data;
                //肯定只会有一个根节点
                var groupsJson = treeTool.toFormatTreeJson(_.filter(data, { isRoot: true }), vm.selectedGroupId)[0];
                vm.allGroups = treeTool.toFormatTreeJson(_.filter(data, { isRoot: false }), vm.selectedGroupId);
                vm.allGroups.push(groupsJson);
            });

            $scope.$watch("vm.selectedGroupId", function (newvalue, oldvalue) {
                if (!!newvalue) {
                    var obj = treeTool.GetValueOfId(vm.groupArray, newvalue);
                    vm.selectData.groupId = obj.id;
                    vm.selectData.groupName = obj.text;
                }
            });

            vm.selectStartJobLevel = function (data) {
                vm.selectData.startJobLevelId = data.value;
                vm.selectData.startJobLevelName = data.name;
            }

            vm.selectEndJobLevel = function (data) {
                vm.selectData.endJobLevelId = data.value;
                vm.selectData.endJobLevelName = data.name;
            }

            //一级弹窗保存
            vm.save = function () {
                $scope.$close(vm.selectData);
            };

            vm.cancel = function () {
                $scope.$close();
            };

            vm.beforeShow();
        }
    ]);
})();