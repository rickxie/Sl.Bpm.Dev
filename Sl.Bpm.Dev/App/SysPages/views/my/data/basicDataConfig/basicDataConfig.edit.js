(function() {
    'use strict';
    var controllerId = app.dialogs.define('basicDataConfigEdit', '/App/SysPages/views/my/data/basicDataConfig/basicDataConfig.edit.html');
    angular.module('syspages').controller(controllerId, [
        '$scope', 'mabp.app.system', 'params',
        function ($scope, service, params) {
            var vm = this;
            vm.model = params || {};

            vm.save = function () {
                mabp.ui.setSaving('dataConfigEdit',
                service.editBasicDataConfig(vm.model).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            }

            vm.cancel = function () {
                $scope.$close();
            }

        }
    ]);
})();