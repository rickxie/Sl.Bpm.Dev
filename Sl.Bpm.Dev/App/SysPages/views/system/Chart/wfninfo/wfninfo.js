(function () {
    'use strict';
    var controllerId = "syspages.views.system.chart.wfninfo";
    angular.module('app').controller(controllerId, [
        '$scope', 'mabp.app.chart',
        function ($scope, service) {
            var vm = this;


            service.getWfId().then(function (result) {
                if (!!result) {
                    vm.wfs = result;
                    vm.wfId = result[0].id;
                }
            });

            vm.selectWfn = function (selectItem) {
                if (!!vm.wfId) {
                    vm.wf = selectItem;
                    service.getChartWfnData(vm.wfId).then(function (result) {
                        vm.models = result;
                    });
                }
            }

        }
    ]);
})();
