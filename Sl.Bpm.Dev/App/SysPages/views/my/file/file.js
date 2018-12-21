(function () {
    'use strict';
    var controllerId = "syspages.views.my.file";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'asdialog', 'mabp.app.file', '$timeout',
        function ($scope, asdialog, service, $timeout) {
            CheckPermission("Menu_My_File");
            var vm = this;
            vm.paging = _shared.initialPage(vm, 1, 8, 'CreationTime DESC ,  DownloadTimes', true);

            vm.filter = {
                searchStartTime: moment(new Date()).days(0 - 30).format('YYYY-MM-DD') + " 00:00:00",
                searchEndTime: moment(new Date()).format("YYYY-MM-DD") + " 23:59:59"
            }

            vm.load = function () {
                vm.paging.filters = mabp.toArray(vm.filter);
                service.getUserFilesByUserId(vm.paging).then(function (result) {
                    vm.models = result.data;
                    vm.paging.totalCount = result.totalCount;
                });
            }

            vm.downLoadFile = function (item) {
                service.updateUserFileDownloadTimes(item, { responseType: 'blob' });

                $timeout(function () {
                    vm.load();
                }, 500);

            }

            vm.load();
        }
    ]);
})();