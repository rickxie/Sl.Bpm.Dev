(function () {
    var controllerId = _shared.dialogs.define('fmGroupSelectDialog', '/App/_shared_mobile/component/group/group.dialog.html');
    angular.module('app.shared').controller(controllerId, ['$modalInstance', '$scope',
        function ($modalInstance, $scope) {
            var vm = this;
            $scope.remove = function (scope) {
                scope.remove();
            };

            $scope.toggle = function (scope) {
                scope.toggle();
            };

            vm.model = $scope.selectedModel || {};
            vm.people = [];
            vm.selectedCode = "";
            vm.selectedGroup = {};
        
            vm.organizeClick = function (organize) {
                vm.selectedCode = organize.code;
                vm.selectedGroup = organize;
            }
            //abp.ui.setBusy(
            //   null,
            //       cdService.getCurrentUserOrganize()
            //            .success(function (data) {
            //                vm.model = data; 
            //            })
            //    );



            vm.save = function () {
                $modalInstance.close(vm.selectedGroup);
            };

            vm.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ]); 
 
})();