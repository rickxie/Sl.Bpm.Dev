(function () {
    'use strict';
    var controllerId = "syspages.views.my.workflowcenter.mydraft";
    angular.module('syspages').controller(controllerId, [
        '$scope', '$modal', 'dialog', 'asdialog', 'mabp.app.task', 'workflowModuleTransfer',
        function ($scope, $modal, dialog, asdialog, service, module) {
			var vm = this;
			$scope.getTaskStatus = function (item) {
				if (item.taskStatus == 1) {
					item.taskTitle = L('TaskFinishStatus');
				}
				if (item.taskStatus == 7) {
					item.taskTitle = L('TaskRejectStatus');
				}
				if (item.taskStatus == 9) {
					item.taskTitle = L('TaskCanceled');
				}
				if (item.taskStatus == 0) {
					item.taskTitle = item.procUserName;
				}
			}
            vm.paging = _shared.initialPage(vm, 1, 13, 'lastModificationTime', false);

            vm.load = function () {
                vm.loadModuleType();
                vm.paging.filters = [{ name: 'moduleIds', value: vm.moduleIds }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '3' }];
                getDataTable();
               
            }
            function getDataTable() {
                service.getMyDraftTasks(vm.paging).then(function (data) {
                    vm.models = data.model;
                    vm.paging.totalCount = data.totalCount;
                });
            }
            vm.loadModuleType = function () {
                service.workFlowCountGroup({ type: 3 }).then(function (data) {
					var root = { text: '所有流程', children: [], icon: 'icon-random' };
					var dic = {};
					angular.forEach(data, function (v) {
						if (!dic[v.category]) {
							dic[v.category] = { text: v.category, children: [], icon: 'icon-bars', instCount: 0 };
						}
						var arr = dic[v.category].children;
						dic[v.category].instCount += v.instCount;
						arr.push({
							text: v.workFlowName,
							instCount: v.instCount,
							categoryId: v.categoryId,
							icon: 'icon-paper-clip',
							workflowId: v.wfdWorkflowId
						});
					});
					var allCount = 0;
					angular.forEach(dic, function (v, k) {
						allCount += v.instCount;
						v.text = v.text;
						var arr = [];
						angular.forEach(v.children, function (child) {
							arr.push(child.workflowId);
						});
						v.workflowId = arr.join(",");
						root.children.push(v);
					});

					root.text = root.text;
					root.instCount = allCount;
					var option = {
						badge: { text: 'instCount', class: 'danger', hideByText: true },
						event: {}
					};
                    option.event.nodedblClick = function (e, node) {
                        if (node.depth === 1) {
                            vm.paging.filters = [{ name: 'workflowId', value: node.data.workflowId }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '3' }];
                            getDataTable();
                        }
                        else if (node.depth === 2) {
                            vm.paging.filters = [{ name: 'workflowId', value: node.data.workflowId }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '3' }];
                            getDataTable();
                        }
                        else {
                            vm.paging.filters = [{ name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '3' }];
                            getDataTable();
                        }

                    }
					$("#phMenu").flowMenu(root, option);
                });
            }

            vm.load();

            vm.edit = function (wf) {
                var jobs = [{ jobId: wf.createByJobId }];
                if (wf.procId != null) {
                    //单纯保存表单 是无需从草稿箱打开的 这段代码待删除。
                    module.approve(wf.appPageId, wf.wfdWorkflowNodeId, wf).then(function () {
                        vm.load();
                    });
                } else {
                    module.openDraft(wf.appPageId, wf.wfdWorkflowNodeId, jobs, wf).then(function () {
                        vm.load();
                    });
                }
            }

            vm.delete = function (m) {
                service.event_DeleteDraft(m).then(function () {
                    mabp.notify.success("删除草稿成功");
                    vm.load();
                });
            }

        }
    ]);
})();