(function () {
    var controllerId = _shared.dialogs.define('formColumn', '/App/_shared_mobile/component/inform/formcolumn/formcolumn.dialog.html');
    angular.module('app.shared').controller(controllerId, [
        'params', '$scope', 'mabp.app.table',
        function (params, $scope, tableService) {
            var vm = this;
            vm.params = params;

            vm.wfBusinessTable = [];

            vm.data = $scope || {};
            vm.model = [];

            //vm.task = [
            //{
            //    schemaName: "InstTask",
            //    c_SchemaName: "WfdCategoryId",
            //    c_Name:"流程分类"
            //},
            //{
            //    schemaName: "InstTask",
            //    c_SchemaName: "WfdWorkflowId",
            //    c_Name: "流程名称"
            //},
            //{
            //    schemaName: "InstTask",
            //    c_SchemaName: "CreateBy",
            //    c_Name: "发起人"
            //},
            //{
            //    schemaName: "InstTask",
            //    c_SchemaName: "CreateByJobId",
            //    c_Name: "发起人岗位"
            //},
            //{
            //    schemaName: "InstTask",
            //    c_SchemaName: "CreateByGroupId",
            //    c_Name: "发起人组织"
            //},
            //{
            //    schemaName: "InstTask",
            //    c_SchemaName: "ApplicantId",
            //    c_Name: "申请人"
            //},
            //{
            //    schemaName: "InstTask",
            //    c_SchemaName: "ApplicantJobId",
            //    c_Name: "申请人岗位"
            //},
            //{
            //    schemaName: "InstTask",
            //    c_SchemaName: "ApplicantGroupId",
            //    c_Name: "申请人组织"
            //},
            //{
            //    schemaName: "InstTask",
            //    c_SchemaName: "CreationTime",
            //    c_Name: "创建时间"
            //},
            //{
            //    schemaName: "InstTask",
            //    c_SchemaName: "Status",
            //    c_Name: "状态"
            //},
            //{
            //    schemaName: "InstTask",
            //    c_SchemaName: "Sn",
            //    c_Name: "流水号"
            //}
            //];

            //数据Load 处理
            vm.beforeShow = function () {
                tableService.getInformColums({
                    workflowId: params.workflowId,
                    nodeId: params.nodeId,
                    informLevel: params.informLevel,
                    informLinkId: params.informLinkId,
                    columnLinkId: params.columnLinkId
                }).then(function (result) {
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

            if (params.informLevel !== 1) {
                vm.beforeShow();
            }

        }
    ]);
})();