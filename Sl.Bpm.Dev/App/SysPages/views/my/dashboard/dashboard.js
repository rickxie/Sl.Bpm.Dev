(function () {
    'use strict';
    var controllerId = "syspages.views.my.dashboard";
    angular.module('syspages').controller(controllerId, [
		'$scope', '$modal', 'dialog', 'asdialog', 'mabp.app.module', 'moduleHandler', 'mabp.app.bpm', 'mabp.app.task', '$interval','$filter',
		function ($scope, $modal, dialog, asdialog, service, module, bpmService, taskService, $interval, $filter) {
			
			var vm = this;

			vm.jump = function (menu) {
				window.location.href = menu.link;
			}

            vm.filter = {
                searchStartTime: moment(new Date(2016, 5, 28)).startOf('month').format("YYYY-MM-DD") + " 00:00:00"
            }
			function getFavouriteMenu() {
				return service.getFavouriteMenu({ maxNumber: 10 }).then(function (list) {
					vm.favouriteMenuList = list;
				});
			}
			function getLastMenu() {
				return service.getLastMenu({ maxNumber: 10}).then(function (list) {
					list.splice(0, 1);//去除当前菜单
					vm.lastMenuList = list;
				});
			}
			function getAllFavouriteWorkflowModules() {
				return service.getAllFavouriteMenu().then(function (result) {
					vm.favouriteList = result;
				});
			}
		
			function getPendingHandleTasks() {
				//待我审批的流程（取前10条
				vm.paging = _shared.initialPage(vm, 1, 10, 'recvTime', false);
				vm.paging.filters = [];
				vm.paging.filters = vm.paging.filters.concat(mabp.toArray(vm.filter));
				return taskService.getPendingHandleTasksDataTable(vm.paging).then(function (data) {
					vm.pendinghandleList = data.data;
				});
			}

            function getMyRaisedTasks() {
                vm.paging = _shared.initialPage(vm, 1, 10, 'creationTime', false);
                //我发起的流程（取前10条
                vm.paging.filters = [{ name: "currentStatus", value: vm.currentStatus}];
                vm.paging.filters = vm.paging.filters.concat(mabp.toArray(vm.filter));
                return taskService.getMyRaisedTasksDataTable(vm.paging).then(function (data) {
                    vm.myraisedList = data.data;
				});
            }
			function getMyLastTasks() {
				return service.getLastWorkflow().then(function (data) {
					vm.myLastWorkflowList = data;
					
				});
			}
            //五秒一刷
            //var refreshPending = $interval(function () {
            //    getPendingHandleTasks();
            //    getMyRaisedTasks();
            //}, 5000);
            //$scope.$on('$destroy', function() {
            //    $interval.cancel(refreshPending);
            //}); 
            vm.load = function (isRefresh) {
                if (!isRefresh) {
                    mabp.ui.setLoading(".load_1", getAllFavouriteWorkflowModules());
                    mabp.ui.setLoading(".load_2", getPendingHandleTasks());
					mabp.ui.setLoading(".load_3", getMyRaisedTasks());
					mabp.ui.setLoading(".load_4", getMyLastTasks());
					mabp.ui.setLoading(".load_5", getFavouriteMenu());
					mabp.ui.setLoading(".load_6", getLastMenu());
                } else {
                    getAllFavouriteWorkflowModules();
                    getPendingHandleTasks();
					getMyRaisedTasks();
					getFavouriteMenu();
					getLastMenu();

                }
                
            }
			vm.openModule = function (m) {
				m.type = 3;
                mabp.ui.setBusying('.load_1',
                module.open(m).then(function (result) {
                    vm.load(true);
                }));
            }

            vm.approveWorkflow = function (wf) {
                wf.reloadTasks = reloadTasks;
                module.approve(wf.appPageId, wf.wfdWorkflowNodeId, wf).then(function (result) {
                    //getPendingHandleTasks();
                    vm.load(true);
                });
            }
            vm.checkoutWorkflow = function (wf) {
                module.checkout(wf.appPageId, wf.wfdWorkflowNodeId, wf).then(function (result) {
                    //getPendingHandleTasks();
                    vm.load(true);
                });
            }
			vm.showEditMenu = function (isWorkflow) {
				var $modalScope = $scope.$new(true);
				$modalScope.title = $filter('translate')('CommonWorkflow');
				if (isWorkflow) {
					$modalScope.type = 1;
				}
				else {
					$modalScope.type = 0;
					$modalScope.code = "cRoot";
				}
				
				var info = app.dialogs["popupDialog"];
				var m = $modal({
					templateUrl: info.templateUrl,
					scope: $modalScope,
					controller: '{0} as vm'.fill(info.controller),
					size: info.size || "md"
				});
				m.result.then(function () {
					if (isWorkflow) {
						getAllFavouriteWorkflowModules()
					}
					else {
						getFavouriteMenu();
					}
					
				});
				
            };


            vm.load();

            function reloadTasks() {
                getPendingHandleTasks();
                getMyRaisedTasks();
            }
            //默认处理中
            vm.currentStatus = "0";
            vm.taskStatus = enums.get("taskStatus");
            vm.statusChange = function() {
                getMyRaisedTasks();
            }

			vm.userInfo = {
				name: $currentUser.name || $currentUser.account,
				employeeNumber: $currentUser.employeeNumber
			};
        }
    ]);
    
})();
