(function () {
    app.controller('system.database.column', ['$scope', 'mabp.app.table', '$stateParams',
        function ($scope, service, $stateParams) {
            var vm = this;
            vm.model = $stateParams;
            vm.paging = _shared.initialPage(vm, 1, 200, 'DisplayOrder', true);
            vm.alignment = [
                { text: "左", value: "L" },
                { text: "中", value: "M" },
                { text: "右", value: "R" }
            ];

            vm.sourceTypes = enums.get("sourceType");

            vm.load = function () {
                vm.paging.filters = [{ name: "BusinessTableId", value: vm.model.id }, { name: 'filterText', value: vm.selectTxt }];
                service.getAllBusinessTableColumns(vm.paging).then(function (data) {
                    vm.models = data.model;
                    vm.paging.totalCount = data.totalCount;

                });
            }

            vm.load();

            vm.saveColumn = function (model) {
                service.editBusinessTableColumn(model).then(function (data) {

                });
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

            vm.barConfig = {
                animation: 150,
                ghostClass: "selectitem",
                handle: ".handle",
                onSort: function (evt) {
                    if (evt.oldIndex != evt.newIndex) {
                        service.updateBusinessTableColumnDisplayOrder(vm.models);
                    }
                },
                orderMember: "displayOrder"
            };

        }
    ]);
})();