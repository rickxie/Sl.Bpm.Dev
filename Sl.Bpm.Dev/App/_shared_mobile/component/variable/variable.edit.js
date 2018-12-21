(function () {
    var controllerId = _shared.dialogs.define('variableEdit', '/App/_shared/component/variable/variable.edit.html');
    angular.module('app.shared').controller(controllerId, [
        'params', '$scope', 'mabp.app.workflow', '$stateParams',
        function (params, $scope, service, $stateParams) {
            var vm = this;

            vm.data = $scope || {};
            vm.model = [];
            //数据Load 处理
            vm.beforeShow = function () {
                vm.data = "<%sysCurrentTime,Date%><%sysInitiator,String%><%sysTaskID,String%><%sysToday,Date%><%sysApplicant,String%><%sysApprovers,String%><%sysInitiatorGroupCode,String%><%sysApplicantGroupCode,String%><%sysInitiatorJobLevel,String%><%sysApplicantJobLevel,String%><%sysCurrentJobLevel,String%><%sysLocation,String%>";
                var list = vm.data.match(/([^%>|^<%])+/g);
                vm.model = [];
                list.map(function(item) {
                    var arr = item.split(",");
                    vm.model.push({name:arr[0],type:arr[1]});
                });

                service.getAllWorkflowVariable({ id: $stateParams.workflowId }).then(function (data) {
                    var variableType = [ L("Text"),  L("Number")];
                    for (var i = 0; i < data.length; i++) {
                        vm.model.push({ name: data[i].name, type: variableType[data[i].type] });
                    }
                });
            }
            //数据Save 处理
            vm.afterShow = function () {
                
            }
            //一级弹窗保存
            vm.save = function (data) {
                vm.afterShow();
                $scope.$close(data.name);
            };

            vm.cancel = function () {
                $scope.$close();
            };
            vm.beforeShow();

        }
    ]);
})();