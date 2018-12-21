var app = app || angular.module('syspages', [
    'ngSanitize',
    'ui.bootstrap',
    'ui.router',
    'angularFileUpload',
    'ngAnimate',
    'trNgGrid',
    'app.shared',
    'mabp',
    //'mabp.orgChart',
    //'oc.lazyLoad',
    'pascalprecht.translate',
    //'ng-sortable'
]);

app && (function() {
    app.config(['$translateProvider', function($translateProvider) {
        $translateProvider.translations('en', mabp.localization['Bpm.en']);
        $translateProvider.translations('zh-CN', mabp.localization['Bpm.zh-CN']);
		$translateProvider.preferredLanguage(window.$currentUser.language);
    }]);


    //app.run(function ($state) {
    //    $state.go("system.database");
    //});
	moment.locale($currentUser.language);
    app.controller('layoutController', [
        '$rootScope', 'w5cValidator', 'appSession', '$scope', '$translate', function($rootScope, w5cValidator, appSession, $scope, $translate) {
            var vm = this;
            $rootScope.activeEnterprise = null;
            $rootScope.mainIcons = enums.mainIcons;
            $rootScope.$on("$translateChangeEnd", function(sender, data) {
                var newLang = data.language;
                w5cValidator.setDefaultRules(_shared.languageSetting.defaultRules[newLang]);
                w5cValidator.setRules(_shared.languageSetting.rules[newLang]);
                mabp.setDefaultLanguage(newLang);
            });
            $rootScope.permissions = appSession.permissions;
            $rootScope.currentUserName = appSession.userName;
            $rootScope.isSuperAdmin = appSession.isSuperAdmin;
            $rootScope.$enterpriseName = appSession.enterpriseName;
            app.language = appSession.language;
            $translate.use(appSession.language);
            moment.locale(appSession.language);
        }
    ]);

    app.controller('headerController', [
        '$rootScope', 'mabp.app.system', 'appSession', '$translate', '$location', 'mabp.app.bpm',
        function($rootScope, service, appSession, $translate, $location, bpmService) {
            var vm = this;

            //一级二级菜单
            vm.mainMenus = [
                {
                    displayName: "Mine",
                    defaultState: "my.dashboard",
                    menu: 'my',
                    permission: 'Menu_My',
                    children: [
                        { displayName: "Dashboard", menu: 'my.dashboard', permission: 'Menu_My_Workplace' },
                        {
                            displayName: "WorkflowCenter",
                            menu: 'my.workflowcenter',
                            defaultState: "my.workflowcenter.pendinghandle",
                            permission: 'Menu_My_WorkflowCenter'
                            //这部分左侧菜单功能请到 workflowcenter.js 中维护
                        },
                        {
                            displayName: "DataMaintenance",
                            menu: 'my.data',
                            needCheck: true,
                            permission: 'Menu_My_DataMaintanance'
                        },
                        { displayName: "DataReport", menu: 'my.report', permission: 'Menu_My_Report' },
                        { displayName: "File", menu: 'my.file', permission: 'Menu_My_File' }
                    ]
                },
                {
                    displayName: "System",
                    permission: 'Menu_Sys',
                    menu: 'system',
                    defaultState: "system.workflow",
                    needCheck: true,
                    children: [
                        { displayName: "WorkflowConfiguration", menu: 'system.workflow', permission: 'Menu_Sys_Workflow' },
                        { displayName: "DatatableConfiguration", menu: 'system.database', defaultState: "system.database.column", permission: 'Menu_Sys_TableAndView' },
                        //{ displayName: "DataViewConfiguration", menu: 'system.viewtable' },
                        //{ displayName: "ReportConfiguration", menu: 'system.reportdesign' },
                        { displayName: "FormConfiguration", menu: 'system.formdesign', permission: 'Menu_Sys_Page' },
                        { displayName: "Module", menu: 'system.module', permission: 'Menu_Sys_Module' },
                        { displayName: "Configuration", menu: 'system.config', permission: 'Menu_Sys_Configuration' },
                        { displayName: "Permission", menu: 'system.permission', permission: 'Menu_Sys_Permission' },
                        { displayName: "Developer", menu: 'system.developer', permission: 'Menu_Sys_Developer' },
                        {
                            displayName: "报表中心",
                            menu: 'system.chart',
                            defaultState: "system.chart.infooverview",
                            permission: 'Menu_Sys_Chart'
                            //这部分左侧菜单功能请到 workflowcenter.js 中维护
                        }
                    ]
                }
            ];


            vm.findMenuLayer = function(menu) {
                var nav = vm.mainMenus;
                var navList = [];
                for (var i = 0; i < nav.length; i++) {
                    if (nav[i].menu === menu) {
                        navList[0] = nav[i].menu;
                        break;
                    }
                    var childerenMenu = nav[i].children;
                    if (childerenMenu !== null) {
                        for (var j = 0; j < childerenMenu.length; j++) {
                            if (childerenMenu[j].menu === menu) {
                                navList[0] = nav[i].menu;
                                navList[1] = childerenMenu[j].menu;
                                break;
                            }
                        }
                    }
                }
                return navList;
            }
        }
    ]);

    app.dialogs = _shared.buildDialog();
    //调用页面级方法
    if (typeof (loadMoudle) == "function") {
        loadMoudle();
    }
})();