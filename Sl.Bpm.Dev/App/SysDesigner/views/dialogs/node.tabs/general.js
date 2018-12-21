/// <reference path="../../../../_shared/enums.js" />

(function () {
    var controllerId = 'app.sysdesigner.views.dialogs.node.tabs.general';
    angular.module('sysdesigner').controller(controllerId, [
       '$scope', 'dialog', 'mabp.app.workflow', '$stateParams',
        function ($scope, dialog, service, $stateParams) {
            var vm = this;
            vm.node = $scope.model;

            vm.load = function () {
                service.getPageByNodeId({ Id: vm.node.id }).then(function(data) {
                    vm.page = data;
                });
            }

            vm.save = function () {

            }

            vm.load();
        }
    ]);
})();