(function () {
    var controllerId = _shared.dialogs.define('treeSelectMenu', '/App/_shared_mobile/component/data/tree.menu.html');
    angular.module('app.shared').controller(controllerId, ['fmTool', 'params', '$scope', 'dialog', '$http', 'mabp.app.module', 'mabp.app.bpm',
        function (fmTool, params, $scope, dialog, $http, service, bpmService) {
            var vm = this;
            vm.params = params;
            vm.tree = vm.params;


        }
    ]);
})();