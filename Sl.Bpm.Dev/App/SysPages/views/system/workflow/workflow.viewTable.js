(function () {
    var controllerId = app.dialogs.define('workflowViewTable', '/App/SysPages/views/system/workflow/workflow.viewTable.html');
    app.controller(controllerId, ['$scope', 'mabp.app.table', '$stateParams', 'dialog', 
        function ($scope, service, $stateParams, dialog) {
            CheckPermission("Menu_Sys_TableAndView");
            var vm = this;
            
            _shared.initialPage(vm);

            vm.load = function () {
                vm.paging.filters = [{ name: 'filterText', value: vm.selectTxt }];
                service.getAllViewTable(vm.paging).then(function (data) {
                    vm.models = data.model;
                    vm.paging.totalCount = data.totalCount;
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

            vm.load();

            vm.open = function (m) {
                var n = {};
                n.view = m;
                dialog.open(app.dialogs.workflowViewTableColumn, m).then(function (data) {
                    n.viewColumn = data;
                    $scope.$close(n);
                });
            }


        }
    ]);
})();