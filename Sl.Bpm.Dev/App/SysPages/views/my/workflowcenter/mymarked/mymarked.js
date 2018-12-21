(function () {
    'use strict';
    var controllerId = "syspages.views.my.workflowcenter.mymarked";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'workflowModuleTransfer', 'mabp.app.task',
        function ($scope, module, service) {
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
            vm.paging = _shared.initialPage(vm, 1, 13, 'refId', false);

            vm.load = function () {
                vm.loadModuleType();
                vm.paging.filters = [{ name: 'moduleIds', value: vm.moduleIds }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '2' }];
                getDataTable();
               
            }

            function getDataTable() {
                service.getMyMarkedTasks(vm.paging).then(function (data) {
                    vm.models = data.model;
                    _.forEach(vm.models, function (data) {
                        $scope.getTaskStatus(data);
                    });
                    vm.paging.totalCount = data.totalCount;
                });
            }

            vm.loadModuleType = function () {
                service.workFlowCountGroup({ type: 2 }).then(function (data) {
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
                            vm.paging.filters = [{ name: 'workflowId', value: node.data.workflowId }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '2' }];
                            getDataTable();
                        }
                        else if (node.depth === 2) {
                            vm.paging.filters = [{ name: 'workflowId', value: node.data.workflowId }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '2' }];
                            getDataTable();
                        }
                        else {
                            vm.paging.filters = [{ name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '2' }];
                            getDataTable();
                        }

                    }
					$("#phMenu").flowMenu(root, option);
                });
            }

            vm.load();

            vm.edit = function (wf) {
                module.checkout(wf.appPageId, wf.wfdWorkflowNodeId, wf);
            }

            vm.select = function () {
                vm.paging.filters = [{ name: 'filterText', value: vm.filterText }];
                vm.paging.currentPage = 1;
                vm.load();
            }

            vm.event_Keydown = function (event) {
                if (event.keyCode == 13) {
                    vm.select();
                }
            }

            vm.mark = function (m) {
                m.isMarked = m.isMarked === false ? true : false;
                service.markTask(m).then(function () {
                    if (m.isMarked) {
                        mabp.notify.success("标记成功");
                    } else {
                        mabp.notify.success("取消标记成功");
                    }
                    vm.load();
                }, function () {
                    vm.load();
                });
            }

        }
    ]);
})();