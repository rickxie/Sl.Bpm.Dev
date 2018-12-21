(function() {
    'use strict';
    var controllerId = app.dialogs.define('basicDataTypeEdit', '/App/SysPages/views/my/data/basicDataConfig/basicDataType.edit.html');
    angular.module('syspages').controller(controllerId, [
        '$scope', 'mabp.app.system', 'params',
        function ($scope, service, params) {
            var vm = this;
            vm.model = params || {};

            vm.save = function () {
                mabp.ui.setSaving('dataTypeEdit',
                service.editBasicDataType(vm.model).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            }

            vm.delete = function() {
                service.deleteBasicDataType(vm.model).then(function () {
                    $scope.$close(true);
                });
            }


        }
    ]);
})();