(function () {
    var controllerId = app.dialogs.define('workflowVariable', '/App/SysPages/views/system/workflow/workflow.variable.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.workflow',
        function ($scope, params, service) {
            var vm = this;
            vm.model = {};
            
            vm.variableType = [
               { displayName: L("Text"), id: 0 },
               { displayName: L("Number"), id: 1 }
            ];

            vm.newColumn = {
                name: "",
                type: 0,
                displayOrder: -1,
                enterpriseId: params.enterpriseId,
                wfdWorkflowId: params.id
            }

            vm.add = function() {
                vm.newColumn = {
                    name: "",
                    type: 0,
                    displayOrder: vm.model ? vm.model.length + 2 : 1,
                    enterpriseId: params.enterpriseId,
                    wfdWorkflowId: params.id
                }
            }

            vm.load = function() {
                service.getAllWorkflowVariable(params).then(function (data) {
                    vm.model = data;
                    vm.add();
                });
            }



            vm.save = function (m) {
                if (!m.name) {
                    mabp.notify.warn(L("PleaseInputVariableName"));
                } else {
                    m.enterpriseId = params.enterpriseId;
                    m.wfdWorkflowId = params.id;
                    service.editWorkflowVariable(m).then(function () {
                        mabp.notify.success(L("UpdateSuccessfully"));
                        vm.load();
                    });
                }
            }

            vm.remove = function(m) {
                service.deleteWorkflowVariable(m).then(function () {
                    mabp.notify.success(L("DeleteSuccessfully"));
                    vm.load();
                });
            }



            vm.load();


        }
    ]);
})();