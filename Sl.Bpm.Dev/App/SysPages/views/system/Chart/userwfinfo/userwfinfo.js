(function () {
    'use strict';
    var controllerId = "syspages.views.system.chart.userwfinfo";
    angular.module('app').controller(controllerId, [
        '$scope', 'mabp.app.chart',
        function ($scope, service) {
            var vm = this;
            vm.test = 0;

            service.getUsers().then(function (result) {
                if (!!result) {
                    vm.users = result;
                    vm.userId = result[0].id;
                }
            });

            vm.select = function (selectItem) {
                debugger;
                vm.user = selectItem[0];
                if (!!vm.userId) {
                    vm.selectWfByUserId();
                    vm.selectTskAvgHourByUserId();
                }
            }

            vm.selectWfByUserId = function () {
                service.getChartWfDataByUserId(vm.userId).then(function (result) {
                    if (!!result) {
                        vm.models = result;
                    }
                });
            }

            vm.selectTskAvgHourByUserId = function () {
                service.getChartTskAvgHourByUserId(vm.userId).then(function (result) {
                    if (!!result) {
                        vm.tskAvgHours = result;
                    }
                });
            }

        }
    ]);
})();
