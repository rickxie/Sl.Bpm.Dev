(function () {
    app.controller('system.database.viewcolumn', ['$scope', 'mabp.app.table', '$stateParams', '$timeout',
        function ($scope, service, $stateParams, $timeout) {
            var vm = this;
            vm.model = $stateParams;
            vm.models = [];
            vm.paging = _shared.initialPage(vm, 1, 8, 'DisplayOrder', true);
            vm.paging.pageSize = 2147483647;

            vm.load = function () {
                vm.paging.filters = [{ name: 'filterText', value: vm.selectTxt }, { name: 'tableId', value: $stateParams.id }];
                service.getAllViewTableColumns(vm.paging).then(function (result) {
                    vm.isLoaded = true;
                    $timeout(function () {
                        vm.models = result.model;
                        vm.paging.totalCount = result.totalCount;
                    });
                });
            }
            vm.load();
            vm.saveLang = function(model) {
                service.editViewTableColumn(model).then(function () {

                });
            }
            vm.saveColumn = function (model) {
                service.editViewTableColumn(model).then(function() {
                    
                });
            }

            vm.barConfig = {
                animation: 150,
                ghostClass: "selectitem",
                handle: ".handle",
                onSort: function (evt) {
                    if (evt.oldIndex != evt.newIndex) {
                        service.updateViewTableColumnDisplayOrder(vm.models);
                    }
                },
                orderMember: "displayOrder"
            };


            vm.select = function () {
                vm.paging.currentPage = 1;
                vm.load();
            }

            vm.event_Keydown = function (event) {
                if (event.keyCode == 13) {
                    vm.select();
                }
            }

        }
    ]);
})();