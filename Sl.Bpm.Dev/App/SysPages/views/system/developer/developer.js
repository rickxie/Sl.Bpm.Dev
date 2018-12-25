(function () {
    'use strict';
    var controllerId = "syspages.views.system.developer";
    angular.module('app').controller(controllerId, [
        '$scope', 'mabp.app.task', 'mabp.app.bpm', 'workflowModuleTransfer', 'dialog', 'mabp.app.file', 'mabp.app.data','asdialog',
        function ($scope, service, bpmservice, module, dialog, fileService, dataService, asdialog) {
            //CheckPermission("Menu_Sys_Developer");
            var vm = this;
            vm.activeTab = 0;
            vm.selectModel = {};
            vm.pageOne = {};

            $scope.$watch('vm.activeTab', function (newValue, oldValue) {
                if (newValue && newValue == 1)
                    vm.loadIntegration();
            });
            vm.pageOne.paging = _shared.initialPage(vm.pageOne, 1, 12, "RefId", false);

            vm.load = function () {
                service.getMyAdvancedTasks({ pageInput: vm.pageOne.paging, TaskSelectDto: vm.selectModel }).then(function (data) {
                    if (!!data) {
                        debugger;
                        vm.models = data.model;
                        //vm.paging.totalCount = data.totalCount;
                    }
                });
            }
            vm.dataService_load = function () {
                dataService.getTableData(vm.ChangeData.sn).then(function (data) {
                    if (!!data) {
                        vm.ChangeData.datas = data;
                    }
                });
            }

            vm.check = function (wf) {
                module.checkout(wf.appPageId, wf.wfdWorkflowNodeId, wf);
            }

            vm.edit = function (item) {
                dialog.open(app.dialogs.wfProcessorChange, item).then(function () {
                    vm.load();
                });
            }

            //获取所有数据库中的文件 加载到table上
            vm.code_loadAllFiles = function() {
                fileService.getCodeFiles().then(function(data) {
                    vm.codeFiles = data;
                });
            }
            //更新某个具体的文件
            vm.code_refresh = function (item) {
                fileService.updateCodeFile({ data: item.fileRelativePath }).then(function(data) {
                    item = data;
                    mabp.notify.success("更新成功");
                });
            }

            //编辑某个代码文件
            vm.code_edit = function(item) {
                mabp.message.info("<div class='col-lg-12'> <pre>"+item.content+"</pre></div>", null, {size:"lg", html: true});
            }

            //更新所有文件
            vm.code_refreshAllFiles = function() {
                fileService.refreshAllFiles().then(function() {
                    vm.code_loadAllFiles();
                    mabp.notify.success("更新成功");
                });
            }
            vm.code_loadAllFiles();


            /*****代理管理*****/

            vm.approvers = [];
            vm.submitters = [];
            vm.authorizerFilter = {};
            vm.approvePaging = _shared.initialPage(vm.approvers, 1, 6, "CreationTime", false);
            vm.subbmitPaging = _shared.initialPage(vm.submitters, 1, 6, "CreationTime", false);

            vm.editAgent = function(m) {
                var n = {};
                if (m === 1) {
                    n.isSubmitterOrApprover = true;
                } else if (m === 2) {
                    n.isSubmitterOrApprover = false;
                } else {
                    n = m;
                }

                n.isSuperAdmin = true;
                asdialog.open(app.dialogs["agentEdit"], n).then(function (data) {
                    if (data)
                        vm.loadAgent();
                });
            }

            vm.loadAgent = function () {
                vm.approvePaging.pushFilter({ name: 'delegateName', value: vm.authorizerFilter.delegateName });
                vm.subbmitPaging.pushFilter({ name: 'delegateName', value: vm.authorizerFilter.delegateName });

                vm.loadSubmitAgent();
                vm.loadApproveAgent();
            }

            vm.loadSubmitAgent = function () {
                vm.subbmitPaging.pushFilter({ name: 'isSubmitAgent', value: 1 });
                bpmservice.getUserAgentBySuperAdmin(vm.subbmitPaging).then(function (result) {
                    vm.submitters = result.data;
                    vm.subbmitPaging.totalCount = result.totalCount;
                });
            }

            vm.loadApproveAgent = function () {
                vm.approvePaging.pushFilter({ name: 'isSubmitAgent', value: 0 });
                bpmservice.getUserAgentBySuperAdmin(vm.approvePaging).then(function (result) {
                    vm.approvers = result.data;
                    vm.approvePaging.totalCount = result.totalCount;
                });
            }

            vm.loadAgent();
            /*****代理管理*****/


        }]);
})();