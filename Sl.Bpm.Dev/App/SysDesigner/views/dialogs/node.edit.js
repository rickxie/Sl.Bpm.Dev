(function() {
    var controllerId = app.dialogs.define('nodeEdit', '/App/sysdesigner/views/dialogs/node.edit.html');
    angular.module('sysdesigner').controller(controllerId, [
       '$scope', 'dialog','params', 'mabp.app.workflow', '$stateParams',
        function($scope, dialog, params, service, $stateParams) {
            var vm = this;
            //传递过来的参数
            var param = params || {};

            $scope.model = param;
            //转换之前
            vm.initialize = function() {

                service.getNode({ id: param.id }).then(function(result) {
                    $scope.model = vm.model = result;
                    
                    //自动处理
                    if (vm.model.type === 2 && vm.model.autoCallType == null)
                        vm.model.autoCallType = 0;
                  
                    //自动处理文本
                    vm.model.autoCallValue = vm.model.autoCallValue || "";
                    vm.setVisibility();
                });
            }

            vm.autoCallType = [
                { displayName: L("StoredProcedure"), id: 0 },
                { displayName: L("DllProgram"), id: 1 },
                { displayName: L("SqlScript"), id: 2 }
            ];
//            //不同节点的显示控制
//            //start = 0, handle = 1, autoHandle = 2, and =3, or =4 , judge =5, end = 6 
//            //杂项 Tab start, handle
            vm.setVisibility = function() {
                var tabSeeExamination = [0, 1];
               
                //常规tab
                var tabGeneral = [0, 1, 2, 3, 4, 5, 6, 7];
                var type = vm.model.type;
                vm.visible = {
                    canSeeExamination: $.inArray(type, tabSeeExamination) > -1,
                    canSeeAutoHandle: type === 2,
                    canSeeGeneral: $.inArray(type, tabGeneral) > -1,
                    canSeeProcess: type === 1,
                    isStartNode: type === 0,
                    isEndNode: type === 6,
                    isHandleNode: type === 1,
                    canSeeColumnConfig:type === 1
                }
            }
  
            $scope.copyAction = [{ actionText: L("Arrive"), actionValue: 15, nodeRestrict: 1 }];
            //动作 End
            vm.initialize();
        }
    ]);
})();