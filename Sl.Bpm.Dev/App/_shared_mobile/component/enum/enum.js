var controllerId = _shared.dialogs.define('enum', '/App/_shared_mobile/component/enum/enum.html');
_shared.controller(controllerId, ['$scope', 'params', 'mabp.app.system', '$stateParams',
    function ($scope, params, service, $stateParams) {
        var vm = this;
        vm.enterpriseId = $stateParams.enterpriseId;
        var input = params || {};
        vm.enum = input.enum;
        vm.models = [];
        vm.newItem = {};
        vm.load = function () {
            var param = {
                filters: [
                { name: "EnterpriseId", value: $stateParams.enterpriseId },
                { name: "Enum", value: vm.enum }
                ]
            }
            service.getAllEnumsByName(param).then(function (result) {
                vm.models = result;
            });
        }

        vm.cancel = function (item, $index) {
            if (item.id == null)
                vm.models.splice($index, 1);
            else {
                item.$edit = false;
            }
        }
        vm.choose = function (item) {
            $scope.$close(item);
        }
        vm.load();
    }
]);