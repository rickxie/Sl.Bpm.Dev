(function () {
	'use strict';
	var controllerId = "syspages.views.my.workflowcenter.pendinghandle";
	angular.module('app').controller(controllerId, [
        '$scope', '$modal', 'dialog', 'asdialog', 'mabp.app.task', 'workflowModuleTransfer', '$interval', '$timeout', 'treeTool',
        function ($scope, $modal, dialog, asdialog, service, module, $interval, $timeout, treeTool) {
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
        	vm.paging.filters = [{ name: 'moduleType', value: '1' }];
        	vm.moduleId = null;
        	vm.allThDom = [];
        	vm.allGroups = [];
        	vm.groupArray = [];
        	vm.selectedGroupId = null;
        	//设置排序样式
        	function setClass(dm, addedClass) {
        		vm.allThDom.removeClass('up');
        		vm.allThDom.removeClass('down');
        		vm.allThDom.addClass('both');
        		dm.removeClass('up');
        		dm.removeClass('down');
        		dm.removeClass('both');
        		dm.addClass(addedClass);
        	}

        	function setOrderByAscending(dom) {
        		if (dom == null) return true;
        		if (dom.hasClass('up')) {
        			setClass(dom, 'down');
        			return false;
        		} else if (dom.hasClass('down')) {
        			setClass(dom, 'up');
        			return true;
        		} else if (dom.hasClass('both')) {
        			setClass(dom, 'up');
        			return true;
        		}
        		return true;
        	}

        	vm.bindedDom = false;
        	vm.bindSort = function () {
        		if (vm.bindedDom) return;
        		vm.bindedDom = true;
        		vm.allThDom = $('th.order');
        		vm.allThDom.on('click', function (event) {
        			var dom = $(this);
        			var propName = dom.attr('name');
        			vm.paging.orderByProperty = propName;
        			vm.paging.ascending = setOrderByAscending(dom);;
        			vm.load();
        		});

        		//todo:多列排序，正反序；2个参数，排序字段，排序正反
        		//                vm.paging.orderByProperty = dd;
        		//                vm.paging.ascending = true;
        		//                vm.load();
        	}



        	vm.showSearch = false;
        	vm.show = function () {
        		vm.showSearch = !vm.showSearch;
        	}

        	function getPendingHandleTasksDataTable() {


        		return service.getPendingHandleTasksDataTable(vm.paging).then(function (data) {
        			vm.models = data.data;
        			_.forEach(vm.models, function (data) {
        				$scope.getTaskStatus(data);
        			});
        			vm.paging.totalCount = data.totalCount;
        			$timeout(function () {
        				vm.bindSort();
        			}, 100);
        		});
        	}
        	//五秒一刷
        	var refreshPending = $interval(function () {
        		vm.load();
        	}, 500000);
        	$scope.$on('$destroy', function () {
        		$interval.cancel(refreshPending);
        	});

        	//$scope.$watch('vm.selectedGroupId', function () {

        	//	if ($("#" + vm.selectedGroupId).children('ul').length > 0)
        	//	{
        	//		return;
        	//	}
        	//	vm.paging.filters = [{ name: 'moduleIds', value: vm.selectedGroupId }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '1' }];
        	//	getPendingHandleTasksDataTable();

        	//});

        	vm.load = function (isRefresh) {
				vm.paging.filters = [{ name: 'workflowId', value: vm.workflowId }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '1' }];
        		vm.paging.filters = vm.paging.filters.concat(mabp.toArray(vm.filter));

                if (isRefresh) {
                    mabp.ui.setLoading(".panel-body", getPendingHandleTasksDataTable());
                }
                else {
                    getPendingHandleTasksDataTable();
                }

           
               

        	//	mabp.ui.setLoading('.role_tree',
         //           service.workFlowCountGroup().then(function (result) {
							  //	//vm.groupArray = result;
							  //	//vm.allGroups = treeTool.toFormatTreeJson(_.filter(result, { isRoot: true }), vm.selectedGroupId);
							  	
							  //}));

        		//service.getPendingHandleTasks(vm.paging).then(function (data) {
        		//    vm.models = data.model;
        		//    vm.paging.totalCount = data.totalCount;
        		//    _.forEach(vm.models, function (item) {
        		//        //item.tasks = mabp.toObject(item.columnValueList);
        		//        item.tasks = JSON.parse(item.columnJson);
        		//    });
        		//});
        	}
        	//            window._$refresh = function () {
        	//                vm.load();
        	//            }
        	vm.loadModuleType = function () {
                service.workFlowCountGroup({ type: 1 }).then(function (data) {
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

					root.text = root.text ;
					root.instCount = allCount;
					var option = {
						badge: { text: 'instCount', class: 'danger', hideByText: true },
						event: {}
					};
                    option.event.nodedblClick = function (e, node) {
						vm.workflowId = null;
						vm.columnLists = null;
                        if (node.depth === 1) {
							vm.paging.filters = [{ name: 'workflowId', value: node.data.workflowId }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '1' }];
                            getPendingHandleTasksDataTable();
                        }
						else if (node.depth === 2) {
                            vm.paging.filters = [{ name: 'workflowId', value: node.data.workflowId }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '1' }];
							vm.loadColumnConfig(node.data.workflowId, function () {
								getPendingHandleTasksDataTable();
							});
						
                        }
                        else {
                            vm.paging.filters = [{ name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '1' }];
                            getPendingHandleTasksDataTable();
                        }

                    }
					$("#phMenu").flowMenu(root, option);
                });
        	}


			vm.loadColumnConfig = function (workflowId, callback) {
				vm.filter = {
					currentStatus: ''
				}
				vm.paging.currentPage = 1;
				vm.workflowId = workflowId;
				service.getColumnConfigs(workflowId).then(function (data) {
        			vm.columnLists = _.filter(data[0].colimnConfigs, function (data) {
        				return data.value = data.value.lowerFirst();
        			});
				}).then(function () {
					vm.paging.currentPage = 1;
					callback();

					});
        	
        		
        	
        	}

        	vm.loadModuleType();
        	vm.load(true);

        	vm.edit = function (wf) {
        		wf.reloadTasks = vm.loadModuleType;
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
        		vm.pagingExport.filters = [{ name: 'moduleIds', value: vm.moduleIds }, { name: 'moduleType', value: '1' }];
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