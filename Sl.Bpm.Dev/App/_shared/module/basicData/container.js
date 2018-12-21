(function () {
    _shared.controller('app.shared.datamodule', [
        '$stateParams', '$compile', '$scope', 'formHelper', '$rootScope',
        function (params, $compile, $scope, formHelper, $rootScope) {
            var vm = this;
            //表单数据
            vm.pageInfo = params;
            vm.pageInfo.close = function () {
                $scope.$close();
            }

            //初始化容器对象
            var base = $scope.base = formHelper.buildBasicDataBase(vm.pageInfo);

            //初始化表单对象
            var form = $scope.form = formHelper.buildBasicDataForm($scope, base);
            formHelper.basicDataStart(base, form, $scope, $rootScope);

        }
    ]);
})();
