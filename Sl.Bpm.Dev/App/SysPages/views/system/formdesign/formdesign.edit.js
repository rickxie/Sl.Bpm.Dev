(function () {
    var controllerId = app.dialogs.define('formdesignEdit', '/App/SysPages/views/system/formdesign/formdesign.edit.html');
    app.controller(controllerId, ['$scope', 'mabp.app.bpm', '$stateParams','$state', 'mabp.app.module',
        function ($scope, service, $stateParams, $state, mdService) {
           
            var vm = this;
            $scope.vm = this;
            vm.allType = enums.get("formDesignType");
            var id = $stateParams.id;


            $scope.reload = function () {
                $state.go("appPageEdit", { id: id }, { reload: true });
            };

           
            if (id) {
                service.getPageOfId({ id: id }).then(function (data) {
                    $scope.vm.model = data;
                    return service.getDatatable({ Id: id });
                }).then(function (data) {

                    vm.model.dataTableName = data;
                });
            }

            vm.switchPage = function (m) {
                var isEnable = m.isEnable;
                mdService.switchPage(m).then(function (result) {
                    if (result && isEnable) {
                        mabp.notify.success(L("OpenSuccessfully"));
                    } else {
                        mabp.notify.success(L("CloseSuccessfully"));
                    }
                }, function () {
                    m.isEnable = !isEnable;
                });
            }

        }
    ]);
})();