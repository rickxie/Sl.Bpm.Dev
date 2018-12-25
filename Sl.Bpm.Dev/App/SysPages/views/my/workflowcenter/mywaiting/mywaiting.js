(function () {
    'use strict';
    var controllerId = "syspages.views.my.workflowcenter.mywaiting";
    angular.module('app').controller(controllerId, [
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
            vm.paging = _shared.initialPage(vm, 1, 13, 'refId', false);
            vm.paging.filters = [{ name: 'moduleType', value: '10' }];
            vm.moduleId = null;

			function getDataTable() {
                return service.getMyWaitedTasksDataTable(vm.paging).then(function (data) {
                    vm.models = data.data;
                    _.forEach(vm.models, function (data) {
                        $scope.getTaskStatus(data);
                    });
                    vm.paging.totalCount = data.totalCount;
                });
            }

            vm.load = function (isRefresh) {
				vm.paging.filters = [{ name: 'workflowId', value: vm.workflowId }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '10' }];
                vm.paging.filters = vm.paging.filters.concat(mabp.toArray(vm.filter));

                if (isRefresh)
					mabp.ui.setLoading(".panel-body", getDataTable());
                else
					getDataTable();
            }


			vm.loadModuleType = function () {
				service.workFlowCountGroup({ type: 10 }).then(function (data) {
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
						vm.columnLists = [];
						vm.workflowId = null;
						if (node.depth === 1) {
							vm.paging.filters = [{ name: 'workflowId', value: node.data.workflowId }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '2' }];
							getDataTable();
						}
						else if (node.depth === 2) {
							vm.paging.filters = [{ name: 'workflowId', value: node.data.workflowId }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '2' }];
							vm.loadColumnConfig(node.data.workflowId, function () {
								getDataTable();
							});
						}
						else {
							vm.paging.filters = [{ name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '2' }];
							getDataTable();
						}

					}
					$("#phMenu").flowMenu(root, option);
				}).then(function () {
					vm.load(true);
				});
			}

			vm.loadColumnConfig = function (workflowId, callback) {
				vm.workflowId = workflowId;
				
				service.getColumnConfigs(workflowId).then(function (data) {
					vm.columnLists = _.filter(data[0].colimnConfigs, function (data) {
						return data.value = data.value.lowerFirst();
					});
				}).then(function () {
					vm.filter = {
						//searchStartTime: moment(new Date()).days(0 - 30).format('YYYY-MM-DD') + " 00:00:00",
						//searchEndTime: moment(new Date()).format("YYYY-MM-DD") + " 23:59:59",
						currentStatus: ''
					}
					vm.paging.currentPage = 1;
					callback();
				});
			}

            vm.loadModuleType();

            vm.edit = function (wf) {
                module.approve(wf.appPageId, wf.wfdWorkflowNodeId, wf).then(function (result) {
                    if (result)
                        vm.loadModuleType();
                });
            }

            vm.submit = function (wf) {
                mabp.notify.info("同意方法未完成");
            }

            vm.reject = function (wf) {
                mabp.notify.info("拒绝方法未完成");
            }

            vm.mark = function (m) {
                m.isMarked = m.isMarked === null ? true : false;
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

            vm.waiting = function (m) {
                m.isWaiting = m.isWaiting === 1 ? 0 : 1;
                service.event_Waiting(m).then(function () {
                    if (m.isWaiting == 1) {
                        mabp.notify.success("挂起成功，请到我挂起的流程中查看！");
                    } else {
                        mabp.notify.success("启动成功，请到待办流程中处理！");
                    }
                    vm.loadModuleType();
                }, function () {
                    vm.loadModuleType();
                });
            }

            vm.filter = {
                //searchStartTime: moment(new Date()).days(0 - 30).format('YYYY-MM-DD') + " 00:00:00",
                //searchEndTime: moment(new Date()).format("YYYY-MM-DD") + " 23:59:59",
                currentStatus: ''
            }

            vm.selectS = function () {
                vm.paging.currentPage = 1;
                vm.load();
            }

            vm.clearS = function () {
                vm.filter = {
                    //searchStartTime: moment(new Date()).days(0 - 30).format('YYYY-MM-DD') + " 00:00:00",
                    //searchEndTime: moment(new Date()).format("YYYY-MM-DD") + " 23:59:59",
                    currentStatus: ''
                }
                vm.paging.currentPage = 1;
                vm.load();
            }

            vm.exportExcel = function () {
                vm.pagingExport = {};
                vm.pagingExport.filters = [{ name: 'moduleIds', value: vm.moduleIds }, { name: 'moduleType', value: '10' }];
                vm.pagingExport.filters = vm.pagingExport.filters.concat(mabp.toArray(vm.filter));
                vm.pagingExport.pageSize = 2147483647;
                vm.pagingExport.currentPage = 1;
                vm.pagingExport.orderByProperty = "refId";
                vm.pagingExport.ascending = false;
                jQuery.download('/File/DownloadWorkflow', vm.pagingExport);
            }



        }
    ]);
})();