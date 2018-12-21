(function () {
    var controllerId = app.dialogs.define('modulePageEdit', '/App/SysPages/views/system/module/module.page.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.module', function ($scope, params, service) {
        var vm = this;
        vm.module = params && (params.model || {});
        vm.paging = _shared.initialPage(vm, 1, 12, "Id");
        //加载数据
        vm.load = function () {
            vm.paging.filters = [{ name: "moduleType", value: vm.module.type }, { name: "filterText", value: vm.filterText }];
            service.getEmptyPagesForModule(vm.paging).then(function (data) {
                vm.model = data.model;
                vm.paging.totalCount = data.totalCount;
            });
        }

        vm.load();

        vm.select = function () {
            vm.paging.currentPage = 1;
            vm.load();
        }

        //vm.event_Keydown = function (event) {
        //    if (event.keyCode == 13) {
        //        vm.select();
        //    }
        //}


        //保存数据
        vm.save = function () {
            vm.page = _.find(vm.model, 'checked');
            vm.module.indexPageId = vm.page.id;
            service.addPageForModule(vm.module).then(function () {
                $scope.$close(true);
            });
        }
        //关闭页面
        vm.close = function () {
            $scope.$close();
        }
    }]);
})();