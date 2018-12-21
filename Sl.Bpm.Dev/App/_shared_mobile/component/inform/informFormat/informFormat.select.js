(function () {
    var controllerId = _shared.dialogs.define('informFormatSelect', "/App/_shared_mobile/component/inform/informFormat/informFormat.select.html");
    angular.module('app.shared').controller(controllerId, [
         'params', '$scope', 'dialog', '$stateParams', 'mabp.app.workflow',
        function(params, $scope, dialog, $stateParams, service) {
            var vm = this;
            vm.model = params.model || {};
            vm.column = params.data || {};

            vm.cancel = function () {
                $scope.$close();
            }

            vm.save = function () {
                $scope.$close(vm.model);
            }

            vm.openColumn = function () {
                dialog.open(_shared.dialogs.formColumn, params.data).then(function (data) {
                    if (!!data) {
                        for (var i = 0; i < vm.model.langTemplateList.length; i++) {
                            var temp = vm.model.langTemplateList[i];
                            vm.model.langTemplateList[i].value = (temp.value || "") + "<%" + data.schemaName + "." + data.c_SchemaName + "%>";
                        }

                    }
                });
            }

            vm.watch = function () {
                //service.getFormattedResult({ data: vm.model.langTemplate }).then(function (output) {
                //    vm.formatedData = output.data;
                //});
            }

        }
    ]);
})();