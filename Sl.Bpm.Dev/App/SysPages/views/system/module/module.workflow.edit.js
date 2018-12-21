(function () {
    var controllerId = app.dialogs.define('moduleWorkflowEdit', '/App/SysPages/views/system/module/module.workflow.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.module', function ($scope, params, service) {
        var vm = this;
        vm.module = params && (params.model || {});
        vm.paging = _shared.initialPage(vm, 1, 12, "CreationTime");
        //加载数据
        vm.load = function () {
            service.getEmptyWorkflowForModule(vm.paging).then(function (data) {
                vm.model = data.model;
                vm.paging.totalCount = data.totalCount;
            });
        }

        vm.load();

        //保存数据
        vm.save = function (w) {
            vm.module.wfdWorkflowId = w.id;
            $scope.$close(vm.module);
        }
        //关闭页面
        vm.close = function () {
            $scope.$close();
        }

    }]);
})();