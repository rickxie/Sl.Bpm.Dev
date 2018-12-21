(function () {
    var controllerId = _shared.dialogs.define('organizationDialog', '/App/_shared/component/group/organization.dialog.html');
    angular.module('app.shared').controller(controllerId, ['mabp.app.bpm', 'params', '$scope', 'treeTool',
        function (groupService, params, $scope, treeTool) {
            var vm = this;
            vm.selectedGroupId = "";

            groupService.getGroupTree().then(function (data) {
                vm.groupArray = data;
                //肯定只会有一个根节点
                var groupsJson = treeTool.toFormatTreeJson(_.filter(data, { isRoot: true }), vm.selectedGroupId)[0];
                vm.allGroups = treeTool.toFormatTreeJson(_.filter(data, { isRoot: false }), vm.selectedGroupId);
                vm.allGroups.push(groupsJson);
            });

            $scope.$watch("vm.selectedGroupId", function (newvalue, oldvalue) {
                if (!!newvalue) {
                    var result = treeTool.GetValueOfId(vm.groupArray, newvalue);
                    $scope.$close(result);
                }
            });
        }
    ]);
})();