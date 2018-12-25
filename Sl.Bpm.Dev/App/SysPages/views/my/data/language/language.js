(function() {
    'use strict';
    var controllerId = "syspages.views.my.data.user";
    angular.module('app').controller(controllerId, [
        '$scope', 'asdialog', 'mabp.app.bpm', '$stateParams', function($scope, asdialog, service, $stateParams) {
            var vm = this;
            vm.models = [];
            vm.load = function () {
                var param = {filters: [{ name: 'EnterpriseId', value: $stateParams.enterpriseId }]}
                service.getAllBpmLanguage(param).then(function(data) {
                    vm.models = data;
                    vm.isLoaded = true;
                });
            }

            vm.add = function() {
                var newLang = { key : '', value:''};
            }
            
            vm.delete = function (m) {
                service.deleteBpmLanguage(m).then(function (data) {
                    mabp.notify.success(L("DeleteUserSuccessfully"));
                vm.load();
            })}


            vm.load();
        }
    ]);
})();