(function () {
    var controllerId = _shared.dialogs.define('workflowNodeDialog', '/App/_shared/component/workflownode/workflownode.dialog.html');
    angular.module('app.shared').controller(controllerId, [
        'params', '$scope', 'mabp.app.workflow', 
        function (params, $scope, service) {
            var vm = this;
            vm.data = $scope || {};
            vm.model = [];

            vm.loadData = params.noLoadData || false;

            //数据Load 处理
            vm.beforeShow = function () {
                service.getOtherStepNodes({ id: params.node.id, selectedId: params.node.wfdWorkflowId }).then(function (result) {
                    vm.model = result;
                });
            }

            //一级弹窗保存
            vm.save = function (data) {
                $scope.$close(data);
            };

            vm.cancel = function () {
                $scope.$close();
            };


            if (vm.loadData) {
                vm.model = params.data;
            } else {
                vm.beforeShow();
            }

        }
    ]);
})();