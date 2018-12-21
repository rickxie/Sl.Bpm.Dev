(function () {
    var controllerId = _shared.dialogs.define('businessTableColumn', '/App/_shared/component/businesstablecolumn/businesstablecolumn.dialog.html');
    angular.module('app.shared').controller(controllerId, [
        'params', '$scope', 'mabp.app.table',
        function (params, $scope, tableService) {
            var vm = this;
            vm.wfBusinessTable = [];

            vm.data = $scope || {};
            vm.model = [];
            //数据Load 处理
            vm.beforeShow = function () {
                tableService.getWfBusinessTableAndColumns(params.workflowId).then(function (result) {
                    var tbs = ",";
                    for (var i = 0; i < result.length; i++) {
                        if (tbs.indexOf(result[i].id) == -1) {
                            tbs += result[i].id + ",";
                            vm.wfBusinessTable.push(result[i]);
                            vm.wfBusinessTable[vm.wfBusinessTable.length - 1].Columns = [];
                        }
                    }
                    for (var i = 0; i < result.length; i++) {
                        for (var o = 0; o < vm.wfBusinessTable.length; o++) {
                            if (result[i].id == vm.wfBusinessTable[o].id) {
                                vm.wfBusinessTable[o].Columns.push(result[i]);
                            }
                        }
                    }
                    if (result == null || result.length === 0) {
                        mabp.notify.info("还没有数据表");
                    }
                });
            }
            //数据Save 处理
            vm.afterShow = function () {
                
            }
            //一级弹窗保存
            vm.save = function (data) {
                vm.afterShow();
                $scope.$close(data);
            };

            vm.cancel = function () {
                $scope.$close();
            };
            vm.beforeShow();

        }
    ]);
})();