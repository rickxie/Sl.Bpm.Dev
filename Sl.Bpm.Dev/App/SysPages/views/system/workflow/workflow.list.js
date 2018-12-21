(function () {
    var controllerId = app.dialogs.define('workflowList', '/App/SysPages/views/system/workflow/workflow.list.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.enterpriseInfoSync', 
        function ($scope, params, service) {
            var vm = this;
            vm.models = {};
            vm.paging = _shared.initialPage(vm, 0, 8, 'Id', false);
            vm.load = function () {
                service.getWorkflowShowList(vm.paging).then(function (data) {
                    vm.models = data.model;
                    vm.paging.totalCount = data.totalCount;
                    if (data.totalCount == 0) {
                        mabp.notify.error("没有数据");
                    }
                    //var pagedItems = [];

                    //for (var i = 0; i < vm.models.length; i++) {
                    //    var start = (vm.paging.currentPage - 1) * vm.paging.pageSize;
                    //    var end = start + vm.paging.pageSize;
                    //    if (i >= start && i < end) {
                    //        pagedItems.push(vm.models[i]);
                    //    }
                    //}
                    vm.pagedItems = vm.models;
                });
            }

            vm.load();
            vm.keyDown = function (event) {
                if (event.keyCode == 13) {
                    vm.paging.filters = [{ name: 'Code', value: vm.filterText }];
                    vm.load();
                }
            }
            vm.getSelected = function () {
                var idsObj = _.filter(vm.pagedItems, 'checked');
                var ids = [];
                _.forEach(idsObj, function (value) {
                    ids.push(value.workflowId);
                });
                if (ids.length > 0) {
                    mabp.ui.setSaving('getSelected',
                    service.getSelectedWorkflows(ids).then(function (data) {
                        if (data) {
                            mabp.notify.success(L("SynchronizedSuccess"));
                            vm.load();
                        }
                    }), L("GetChoosedWorkflow"));
                }
            }

            vm.getAll = function () {
                mabp.ui.setSaving('getAll',
                service.getWorkflows().then(function (data) {
                    if (data) {
                        mabp.notify.success(L("SynchronizedSuccess"));
                        vm.load();
                    }
                }), ("getAll"));
            };
        }
    ]);

})();
