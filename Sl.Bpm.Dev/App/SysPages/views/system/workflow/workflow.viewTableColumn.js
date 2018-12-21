(function () {
    var controllerId = app.dialogs.define('workflowViewTableColumn', '/App/SysPages/views/system/workflow/workflow.viewTableColumn.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.table', '$stateParams', 'dialog',
        function ($scope, params, service, $stateParams, dialog) {
            var vm = this;
            vm.params = params || {};

            vm.paging = _shared.initialPage(vm, 1, 8, 'DisplayOrder', false);

            vm.load = function () {
                vm.paging.filters = [{ name: 'filterText', value: vm.selectTxt },{name:'tableId',value:params.id}];
                service.getAllViewTableColumns(vm.paging).then(function (result) {
                    vm.models = result.model;
                    vm.paging.totalCount = result.totalCount;
                });

            }

            vm.select = function() {
                vm.paging.currentPage = 1;
                vm.load();
            }

            //点击回车搜索
            vm.event_Keydown = function (event) {
                if (event.keyCode == 13) {
                    vm.select();
                }
            }

            vm.save = function(i) {
                $scope.$close(i);
            }

            vm.load();

        }
    ]);
})();