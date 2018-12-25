(function () {
    'use strict';
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      
        $stateProvider
            .state('infooverview',
            {
                url: '/infooverview',
                templateUrl: _turl('/App/SysPages/views/system/chart/infooverview/infooverview.html')
            })
            .state('wfoverview',
            {
                url: '/wfoverview',
                templateUrl: _turl('/App/SysPages/views/system/chart/wfoverview/wfoverview.html')
            })
            .state('wfninfo',
            {
                url: '/wfninfo',
                templateUrl: _turl('/App/SysPages/views/system/chart/wfninfo/wfninfo.html')
            })
            .state('userwfinfo',
            {
                url: '/userwfinfo',
                templateUrl: _turl('/App/SysPages/views/system/chart/userwfinfo/userwfinfo.html')
            })
            .state('wfprocess',
            {
                url: '/wfprocess',
                templateUrl: _turl('/App/SysPages/views/system/chart/wfprocess/wfprocess.html')
            })
            .state('standardptsetting',
            {
                url: '/standardptsetting',
                templateUrl: _turl('/App/SysPages/views/system/chart/standardptsetting/standardptsetting.html')
            })
    }]);
    var controllerId = "syspages.views.system.chart";
    angular.module('app').controller(controllerId, [
        '$scope', '$modal', 'dialog', '$rootScope', '$timeout', '$state', 'appSession',
        function ($scope, $modal, dialog, $rootScope, $timeout, $state, appSession) {

            if (!location.hash) {
                $state.go("infooverview");
            }
            else {
                $state.go(location.hash.substring(2));
            }
            var vm = this;

            //报表中心菜单配置
            vm.nav = [
                {
                    displayName: "ReportCenter",
                    icon: 'icon-cogs',
                    isDispaly: true,
                    children: [
                        { displayName: "InfoOverview", menu: 'infooverview', icon: 'icon-flag', isDispaly: true },
                        { displayName: "WfOverview", menu: 'wfoverview', icon: 'icon-pencil', isDispaly: true },
                        { displayName: "WfnInfo", menu: 'wfninfo', icon: 'icon-user', isDispaly: true },
                        { displayName: "UserWfInfo", menu: 'userwfinfo', icon: 'icon-tasks', isDispaly: true },
                        { displayName: "WfProcess", menu: 'wfprocess', icon: 'icon-tasks', isDispaly: true },
                        { displayName: "StandardProcessingTimeSetting", menu: 'standardptsetting', icon: 'icon-node', isDispaly: true },
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
            vm.menus = vm.nav[0].children;

        }
    ]);
})();