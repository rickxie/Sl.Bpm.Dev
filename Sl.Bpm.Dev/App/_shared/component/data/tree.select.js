(function () {
    var controllerId = _shared.dialogs.define('treeSelect', '/App/_shared/component/data/tree.select.html');
    angular.module('app.shared').controller(controllerId, ['fmTool', 'params', '$scope', 'dialog', '$http', 'mabp.app.module',
        function (fmTool, params, $scope, dialog, $http, service) {
            var vm = this;
            vm.params = params;
            vm.model = {};
            vm.size = params.size;
            vm.ismulti = params.ismulti;

            //if (!params.data || params.data.length == 0) {
            switch (vm.params.datatype) {
                case "group":
                    fmTool.getGroupTree(vm.params.filter, function (data) {
                        vm.title = data[0].text;
                        vm.tree = data;
                        for (var i = 0; i < vm.tree.length; i++) {
                            vm.tree[i].$$isExpend = true;
                        }
                    });
                    break;
                case "dataitem":
                    fmTool.getBasicdata(vm.params.datacode, vm.params.filter, function (data) {
                        vm.title = data.name;
                        vm.tree = data.data;
                    });
                    break;
                default:

            }
            //} else {
            //    vm.title = vm.params.title;
            //    vm.tree = vm.params.data;
            //}
            vm.mustleaf = vm.params.mustleaf !== undefined ? Boolean(vm.params.mustleaf) : true;
            vm.selectNodes = vm.params.selectData || [];

            vm.save = function () {
                $scope.$close({ items: vm.tree, selectItem: vm.selectNodes });
            };

            vm.itemClicked = function (item) {
                $scope.$close({ items: vm.tree, selectItem: [item] });
            }

            $scope.saveData = function () {
                $scope.$close({ items: vm.tree, selectItem: vm.selectNodes });
            }

            vm.cancel = function () {
                $scope.$close(null);
            };
        }
    ]);
})();