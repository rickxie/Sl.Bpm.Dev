(function() {
    'use strict';
    var controllerId = app.dialogs.define('checkPassword', '/App/SysPages/views/user/checkPassword.html');
    angular.module('syspages').controller(controllerId, [
        '$scope', 'params', 'mabp.app.system', function ($scope, params, sysService) {
            var vm = this;
            vm.user = params;
            vm.model = [];
            vm.confirmPwd = function () {
                mabp.ui.setSaving('confirmPassword',
                    sysService.checkPassword(vm.model.password).then(function(data) {
                        if (data) {
                            $scope.$close(data);
                        }
                    }), L("ConfirmAndContinue"));
            }

            vm.cancel = function() {
                $scope.$close(false);
            }

        }
    ]);
})();