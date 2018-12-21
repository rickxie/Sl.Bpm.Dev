(function () {
    'use strict';
    var controllerId = "syspages.views.system.chart.wfprocess";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'mabp.app.chart',
        function ($scope, service) {
            var vm = this;
            vm.taskStatus = enums.get("taskStatus");
            vm.taskStatus2 = enums.get("taskStatus");
            vm.filter = {
                status: '',
                wfId: '',
                //开始时间
                searchStartTime: moment(new Date()).days(0 - 30).format('YYYY-MM-DD') + " 00:00:00",
                //结束时间
                searchEndTime: moment(new Date()).format("YYYY-MM-DD") + " 23:59:59"
            };

            service.getAllWorkflows().then(function (result) {
                if (!!result) {
                    vm.flows = result;
                    //vm.filter.wfId = result[0].id;
                }
            });

            vm.paging = _shared.initialPage(vm, 1, 8, 'CreationTime', false);

            vm.load = function() {
                vm.paging.filters = mabp.toArray(vm.filter);
                service.getWdProcess(vm.paging).then(function (result) {
                    if (!!result) {
                        vm.models = result.data;
                        vm.paging.totalCount = result.totalCount;
                    }
                });
            }
            
            vm.checkAll = function (ischecked, items) {
                if (!!items && items.length > 0) for (var i = 0; i < items.length; i++) items[i].checked = !!ischecked;
            }

            vm.clear = function() {
                vm.filter = {
                    status: '',
                    wfId: '',
                    //开始时间
                    searchStartTime: moment(new Date()).days(0 - 30).format('YYYY-MM-DD') + " 00:00:00",
                    //结束时间
                    searchEndTime: moment(new Date()).format("YYYY-MM-DD") + " 23:59:59"
                };
                vm.load();
            }


            vm.value = 25;
            vm.style = 'progress-bar-info';
            vm.showLabel = true;
            vm.striped = true;


            vm.add = function() {
                vm.value += 5;
            }

            vm.ddd = function() {
                vm.value -= 5;
            }


        }
    ]);
})();
