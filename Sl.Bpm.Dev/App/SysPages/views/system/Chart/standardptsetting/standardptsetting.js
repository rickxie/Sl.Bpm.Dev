(function () {
    'use strict';
    var controllerId = "syspages.views.system.chart.standardptsetting";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'mabp.app.chart',
        function ($scope, service) {
            var vm = this;

            service.getAllWorkflows().then(function (result) {
                if (!!result) {
                    vm.allList = result;
                    vm.list = result;
                }
            });

            vm.save = function (item) {
                item.standardTime = parseFloat(item.standardTime || 0).getPrecision(1).pushZero(1);
                service.updateWfStandardTime({ Id: item.id, StandardTime: item.standardTime }).then(function (result) {
                    console.log(result);
                });
            }
            
            vm.select = function () {
                vm.list = [];
                var filter = vm.filterText.toLowerCase();
                for (var i = 0; i < vm.allList.length; i++) {
                    if (filter == "") {
                        vm.list.push(vm.allList[i]);
                    } else {
                        if ((vm.allList[i].text || "").toLowerCase().indexOf(filter) >= 0 || (vm.allList[i].standardTime.toString() || "").toLowerCase().indexOf(filter) >= 0)
                            vm.list.push(vm.allList[i]);
                    }
                }
                return vm.list;
            }

            vm.event_Keydown = function (event) {
                if (event.keyCode == 13) {
                    vm.select();
                }
            }


        }
    ]);
})();
