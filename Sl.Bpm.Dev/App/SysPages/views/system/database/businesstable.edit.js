(function () {
    app.controller('system.database.businesstableedit', ['$scope', 'mabp.app.table', '$stateParams', '$timeout',
        function ($scope, service, $stateParams, $timeout) {
            var vm = this;

            service.getBusinessTablesByTableId($stateParams.id).then(function (data) {
                vm.model = data[0];
            });

            vm.allTableType = enums.get("businessTableType");
        }
    ]);
})();