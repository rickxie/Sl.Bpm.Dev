(function () {
    //app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    //    $stateProvider
    //        .state('my.datamodule', {
    //            url: '/datamodule/{moduleId:[0-9|a-z|-]{36,36}}',
    //            views: {
    //                '': {
    //                    templateUrl: _turl('/App/_shared/module/basicData/container.html')
    //                }
    //            },
    //            params: {
    //                moduleId: null
    //            },
    //            parentMenu: 'my.data'
    //        })
    //}]);
    _shared.controller('app.shared.reportmodule', [
        'mabp.app.module', 'mabp.app.task', '$compile'
        , '$scope', '$timeout', 'formHelper', '$rootScope',
        function (service, taskService, $compile, $scope, $timeout, formHelper, $rootScope) {

            function queryString(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }
            var vm = this;
            //表单数据
            vm.pageInfo = { moduleId: queryString("moduleId")};
            vm.pageInfo.close = function () {
                $scope.$close();
            }

            //初始化容器对象
            var base = $scope.base = formHelper.buildReportBase(vm.pageInfo);
            //初始化表单对象
            var form = $scope.form = formHelper.buildReportForm($scope);
            formHelper.reportStart(base, form, $scope, $rootScope);

        }
    ]);
})();
