(function () {
    app.controller('system.database.mappingcolumn', ['$scope', 'mabp.app.table', '$stateParams', '$timeout',
        function ($scope, service, $stateParams, $timeout) {
            var vm = this;
            vm.model = $stateParams;
            vm.models = [];
            vm.paging = _shared.initialPage(vm, 1, 8, 'DisplayOrder', true);
            vm.paging.pageSize = 2147483647;
            
            vm.datatypes = [{ id: 1, text: 'Int' }, { id: 2, text: 'Nvarchar' }, { id: 3, text: 'Real' }, { id: 4, text: 'Bit' }, { id: 5, text: 'Decimal' }, { id: 6, text: 'DateTime' }];

            vm.load = function () {
                vm.paging.filters = [{ name: 'filterText', value: vm.selectTxt }, { name: 'linkId', value: $stateParams.id }];
                service.getAllMappingColumns(vm.paging).then(function (result) {
                    vm.isLoaded = true;
                    $timeout(function () {
                        vm.models = result.model;
                        vm.paging.totalCount = result.totalCount;
                    });
                });
            }
            vm.load();
            vm.saveLang = function(model) {
                service.editMappingColumn(model).then(function () {

                });
            }
            vm.saveColumn = function (model) {
                service.editMappingColumn(model).then(function () {
                    
                });
            }

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