(function () {
    'use strict';
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
     
       
        $stateProvider
            .state('raise', {
                url: '/raise',
                templateUrl: _turl('/App/SysPages/views/my/workflowcenter/raise/raise.html')
            })
            .state('pendinghandle', {
                url: '/pendinghandle',
                templateUrl: _turl('/App/SysPages/views/my/workflowcenter/pendinghandle/pendinghandle.html')
            })
            .state('mywaiting', {
                url: '/mywaiting',
                templateUrl: _turl('/App/SysPages/views/my/workflowcenter/mywaiting/mywaiting.html')
            })
            .state('pendingread', {
                url: '/pendingread',
                templateUrl: _turl('/App/SysPages/views/my/workflowcenter/pendingread/pendingread.html')
            })
            .state('mymarked', {
                url: '/mymarked',
                templateUrl: _turl('/App/SysPages/views/my/workflowcenter/mymarked/mymarked.html')
            })
            .state('mydraft', {
                url: '/mydraft',
                templateUrl: _turl('/App/SysPages/views/my/workflowcenter/mydraft/mydraft.html')
            })
            .state('myraised', {
                url: '/myraised',
                templateUrl: _turl('/App/SysPages/views/my/workflowcenter/myraised/myraised.html')
            })
            .state('myhandled', {
                url: '/myhandled',
                templateUrl: _turl('/App/SysPages/views/my/workflowcenter/myhandled/myhandled.html')
            })
            .state('mycopied', {
                url: '/mycopied',
                templateUrl: _turl('/App/SysPages/views/my/workflowcenter/mycopied/mycopied.html')
            })
            .state('myauthorized', {
                url: '/myauthorized',
                templateUrl: _turl('/App/SysPages/views/my/workflowcenter/myauthorized/myauthorized.html')
            })
            .state('mydelegated', {
                url: '/mydelegated',
                templateUrl: _turl('/App/SysPages/views/my/workflowcenter/mydelegated/mydelegated.html')
            })
            .state('wfadvancedsearch', {
                url: '/wfadvancedsearch',
                templateUrl: _turl('/App/SysPages/views/my/workflowcenter/wfadvancedsearch/wfadvancedsearch.html')
            });
      
        
    }]);
   
   
    var controllerId = "syspages.views.my.workflowcenter";
    angular.module('syspages').controller(controllerId, [
        '$scope', '$modal', 'dialog', '$rootScope', '$timeout', '$state', 'appSession',
        function ($scope, $modal, dialog, $rootScope, $timeout, $state, appSession) {
            if (!location.hash) {
                $state.go("raise");
            }
            else {
                $state.go(location.hash.substring(2));
            }

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

            var vm = this;

            //流程中心菜单配置
            vm.nav = [
                {
                    displayName: "WorkflowHandle",
                    icon: 'icon-cogs',
                    isDispaly: true,
                    //menu: 'workflowcenter.handle',
                    children: [
                        { displayName: "LaunchWorkflow", menu: 'raise', icon: 'icon-paint-brush', isDispaly: true },
                        { displayName: "MyPendingHandleWf", menu:'pendinghandle', icon: 'icon-inbox', isDispaly: true },
                        { displayName: "MyPendingReadWf", menu: 'pendingread', icon: 'icon-bell-alt', isDispaly: true }
                    ]
                },
                {
                    displayName: "WfSearch",
                    //menu: 'workflowcenter.search',
                    icon: 'icon-search',
                    isDispaly: true,
                    children: [
                        { displayName: "MyMarkedWf", menu: 'mymarked', icon: 'icon-flag', isDispaly: true },
                        { displayName: "MyDraftWf", menu: 'mydraft', icon: 'icon-pencil', isDispaly: true },
                        { displayName: "MyRaisedWf", menu: 'myraised', icon: 'icon-user', isDispaly: true },
                        { displayName: "MyHanldeWf", menu: 'myhandled', icon: 'icon-tasks', isDispaly: true },
                        { displayName: "MyWaitingWf", menu: 'mywaiting', icon: 'icon-tasks', isDispaly: true },
                        { displayName: "CopyMeWf", menu: 'mycopied', icon: 'icon-node', isDispaly: true },
                        { displayName: "MyAuthorizedWf", menu: 'myauthorized', icon: 'icon-key', isDispaly: true },
                        { displayName: "MyDelegateWf", menu: 'mydelegated', icon: 'icon-plane', isDispaly: true },
                        { displayName: "WfAdvancedSearch", menu: 'wfadvancedsearch', icon: 'icon-search', isDispaly: appSession.permissions['Menu_My_WorkflowCenter_AdvanceSearch'] }
                    ]
                }
            ];

          
            vm.setActiveMenu = function (state) {
                vm.currentActiveMenu = state;
                var curMenu = _.find(vm.menus, { menu: state.name });
                vm.currentMenu = curMenu != null && curMenu.displayName;
            }
            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                vm.setActiveMenu(toState);
            });
            if (vm.currentActiveMenu == null) {
                vm.setActiveMenu($state.current);
            }
            vm.menus = _.concat(vm.nav[0].children, vm.nav[1].children);
            //获得当前状态
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
            
        }
    ]);
})();