(function () {
    var controllerId = _shared.dialogs.define('roleDialog', '/App/_shared/component/role/role.dialog.html');
    angular.module('app.shared').controller(controllerId, ['mabp.app.bpm', 'params', '$scope', 'treeTool',
        function (roleService, params, $scope, treeTool) {
            var vm = this;
            vm.selectedRoleId = "";

            roleService.getRoleTree().then(function (data) {
                vm.allRoles = data; 
            });

            $scope.$watch("vm.selectedRoleId", function (newvalue, oldvalue) {
                if (!!newvalue) {
                    var result = treeTool.GetValueOfId(vm.allRoles, newvalue);
                    $scope.$close(result);
                }
            });
        }
    ]);
})();