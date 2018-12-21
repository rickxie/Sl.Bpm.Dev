(function () {
    var controllerId = app.dialogs.define('agentEdit', '/App/SysPages/views/user/agent.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'dialog', 'mabp.app.bpm', 'mabp.app.workflow',
        function ($scope, params, dialog, service, flowservice) {
            var vm = this;
            vm.model = params || {};

            _shared.initialPage(vm);
            vm.paging.pageSize = 50;
            flowservice.getAllCategory(vm.paging).then(function (result) {
                var cats = result.model;
                //枚举 
                vm.flowcategory = { ALL: { text: "ALL", value: "ALL" } };
                for (var i = 0; i < cats.length ; i++) {
                    vm.flowcategory[cats[i].code] = { text: cats[i].name, value: cats[i].id };
                }
            });
            //读取流程
            vm.changeCategory = function () {
                vm.paging.filters = [{ name: 'CategoryId', value: vm.model.wfdCategoryId }];
                flowservice.getAllWorkflow(vm.paging).then(function (result) {
                    var wf = result.model;
                    //枚举 
                    vm.flows = { ALL: { text: "ALL", value: "ALL" } };
                    for (var i = 0; i < wf.length ; i++) {
                        vm.flows[wf[i].code] = { text: wf[i].name, value: wf[i].id };
                    }
                });
            }
            if (params != null)
                vm.changeCategory();
            else
                vm.model.enable = true;
            //读取岗位
            service.getJobsFromUser("").then(function (result) {
                var jobs = result;
                vm.jobs = {};
                //枚举 
                for (var i = 0; i < jobs.length ; i++) {
                    vm.jobs[i.toString()] = { text: jobs[i].jobName, value: jobs[i].id };
                }
            });

            //打开选择用户岗位
            vm.selectAgent = function (index) {
                var agent = index == 1 ? vm.model.firstUserId : vm.model.secondUserId;
                dialog.open(_shared.dialogs.jobUserDialog, { value: agent, enterpriseId: vm.enterpriseId }).then(function (data) {
                    if (!!data) {
                        if (index == 1) {
                            vm.model.firstUserId = data[0].userId;
                            vm.model.firstName = data[0].userName;
                            vm.model.firstJobId = data[0].jobId;
                        }
                        if (index == 2) {
                            vm.model.secondUserId = data[0].userId;
                            vm.model.secondName = data[0].userName;
                            vm.model.secondJobId = data[0].jobId;
                        }
                    }
                });
            }

            vm.selectAuthorizer = function () {
                dialog.open(_shared.dialogs.jobUserDialog, { value: vm.model.delegateUserId, enterpriseId: vm.enterpriseId }).then(function (data) {
                    if (!!data) {
                        vm.model.delegateUserId = data[0].userId;
                        vm.model.delegateName = data[0].userName;
                        //vm.model.firstJobId = data[0].jobId;
                    }
                });
            }

            vm.doValidate = function () {
                if (vm.model.isSuperAdmin) {
                    var delegateName = $("input[name='delegateName']").val();
                    if (!delegateName) {
                        mabp.notify.error("授权人必填");
                        return false;
                    }
                }

                var startDateTime = $("input[name='startDateTime']").val();
                if (!startDateTime) {
                    mabp.notify.error("开始时间必填");
                    return false;
                }
                var endDateTime = $("input[name='endDateTime']").val();
                if (!endDateTime) {
                    mabp.notify.error("结束时间必填");
                    return false;
                }
                return true;
            }

            vm.save = function () {
                if (!vm.doValidate()) return;
                mabp.ui.setSaving('agentEdit', service.editAgent(vm.model).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            };


            vm.delete = function () {
                mabp.ui.setSaving('advance', service.deleteAgent(vm.model).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Delete"));
            }


        }
    ]);
})();