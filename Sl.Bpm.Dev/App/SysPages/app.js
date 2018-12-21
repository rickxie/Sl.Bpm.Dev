var app = app || angular.module('syspages', [
    'ngSanitize',
    'ui.bootstrap',
    'ui.router',
    'angularFileUpload',
    'ngAnimate',
    'trNgGrid',
    'app.shared',
    'mabp',
    'mabp.orgChart',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'ng-sortable'
]);

app && (function () {
    app.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en', mabp.localization['Bpm.en']);
        $translateProvider.translations('zh-CN', mabp.localization['Bpm.zh-CN']);
        $translateProvider.preferredLanguage('zh-CN');
    }]);

    app.config([
        '$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/system/workflow');
            $stateProvider
                //系统
                .state('system',
                    {
                        "abstract": true,
                        url: '/system',
                        template: '<div ui-view></div>',
                        controller: [
                            '$scope', '$state', function($scope, $state) {
                            }
                        ]
                    })
                .state('system.chart',
                    {
                        "abstract": true,
                        url: '/chart',
                        templateUrl: _turl('/App/SysPages/views/system/chart/chart.html'),
                        parentMenu: 'system'
                    })
                .state('system.chart.infooverview',
                    {
                        url: '/infooverview',
                        views: {
                            'chart': {
                                templateUrl: _turl('/App/SysPages/views/system/chart/infooverview/infooverview.html')
                            }
                        },
                        parentMenu: 'system.chart'
                    })
                .state('system.chart.wfoverview',
                    {
                        url: '/wfoverview',
                        views: {
                            'chart': {
                                templateUrl: _turl('/App/SysPages/views/system/chart/wfoverview/wfoverview.html')
                            }
                        },
                        parentMenu: 'system.chart'
                    })
                .state('system.chart.wfninfo',
                    {
                        url: '/wfninfo',
                        views: {
                            'chart': {
                                templateUrl: _turl('/App/SysPages/views/system/chart/wfninfo/wfninfo.html')
                            }
                        },
                        parentMenu: 'system.chart'
                    })
                .state('system.chart.userwfinfo',
                    {
                        url: '/userwfinfo',
                        views: {
                            'chart': {
                                templateUrl: _turl('/App/SysPages/views/system/chart/userwfinfo/userwfinfo.html')
                            }
                        },
                        parentMenu: 'system.chart'
                    })
                .state('system.chart.wfprocess',
                    {
                        url: '/wfprocess',
                        views: {
                            'chart': {
                                templateUrl: _turl('/App/SysPages/views/system/chart/wfprocess/wfprocess.html')
                            }
                        },
                        parentMenu: 'system.chart'
                    })
                .state('system.chart.standardptsetting',
                    {
                        url: '/standardptsetting',
                        views: {
                            'chart': {
                                templateUrl: _turl(
                                    '/App/SysPages/views/system/chart/standardptsetting/standardptsetting.html')
                            }
                        },
                        parentMenu: 'system.chart'
                    })
                .state('system.workflow',
                    {
                        url: '/workflow',
                        templateUrl: _turl('/App/SysPages/views/system/workflow/workflow.html'),
                        parentMenu: 'system'
                    })
                .state('system.database',
                    {
                        "abstract": true,
                        url: '/businesstable',
                        templateUrl: _turl('/App/SysPages/views/system/database/db.html'),
                        //templateUrl: '/App/SysPages/views/system/businesstable/businesstable.html',
                        parentMenu: 'system'

                    })
                .state('system.database.column',
                    {
                        url: '/columns/:id',
                        views: {
                            'db_panel': {
                                templateUrl: _turl('/App/SysPages/views/system/database/businesstable.columns.html')
                            }
                        },
                        params: {
                            id: null,
                            schemaName: null,
                            name: null,
                            aliasName: null
                        },
                        parentMenu: 'system.database'
                    })
                .state('system.database.viewcolumn',
                    {
                        url: '/viewcolumn/:id',
                        views: {
                            'db_panel': {
                                templateUrl: _turl('/App/SysPages/views/system/database/viewtable.columns.html')
                            }
                        },
                        params: {
                            id: null,
                            text: null
                        },
                        parentMenu: 'system.database'
                    })
                .state('system.database.mappingcolumn',
                    {
                        url: '/mappingcolumn/:id',
                        views: {
                            'db_panel': {
                                templateUrl: _turl('/App/SysPages/views/system/database/mapping.columns.html')
                            }
                        },
                        params: {
                            id: null,
                            text: null
                        },
                        parentMenu: 'system.database'
                    })
                .state('system.database.viewtableedit',
                    {
                        url: '/viewedit/:id',
                        views: {
                            'db_panel': {
                                templateUrl: _turl('/App/SysPages/views/system/database/viewtable.edit.html')
                            }
                        },
                        parentMenu: 'system'
                    })
                .state('system.database.mappingedit',
                    {
                        url: '/mappingedit/:id',
                        views: {
                            'db_panel': {
                                templateUrl: _turl('/App/SysPages/views/system/database/mapping.edit.html')
                            }
                        },
                        parentMenu: 'system'
                    })
                .state('system.database.businesstableedit',
                    {
                        url: '/tableedit/:id',
                        views: {
                            'db_panel': {
                                templateUrl: _turl('/App/SysPages/views/system/database/businesstable.edit.html')
                            }
                        },
                        parentMenu: 'system.database'
                    })
                .state('system.viewtable',
                    {
                        url: '/viewtable',
                        templateUrl: _turl('/App/SysPages/views/system/viewtable/viewtable.html'),
                        parentMenu: 'system'
                    })
                .state('system.formdesign',
                    {
                        url: '/formdesign',
                        templateUrl: _turl('/App/SysPages/views/system/formdesign/formdesign.html'),
                        parentMenu: 'system'
                    })
                .state('system.config',
                    {
                        url: '/config',
                        templateUrl: _turl('/App/SysPages/views/system/config/config.html'),
                        parentMenu: 'system'
                    })
                .state('system.module',
                    {
                        url: '/module',
                        templateUrl: _turl('/App/SysPages/views/system/module/module.html'),
                        parentMenu: 'system'
                    })
                .state('system.permission',
                    {
                        url: '/permission',
                        templateUrl: _turl('/App/SysPages/views/system/permission/permission.html'),
                        parentMenu: 'system'
                    })
                .state('system.developer',
                    {
                        url: '/developer',
                        templateUrl: _turl('/App/SysPages/views/system/developer/developer.html'),
                        parentMenu: 'system'
                })
                //我的菜单
                .state('my', {
                    "abstract": true,
                    url: '/my',
                    template: '<div ui-view></div>',
                    controller: [
                        '$scope', '$state', function ($scope, $state) {
                        }
                    ]
                })
                .state('my.dashboard', {
                    url: '',
                    templateUrl: _turl('/App/SysPages/views/my/dashboard/dashboard.html'),
                    parentMenu: 'my'
                })
                .state('my.workflowcenter', {
                    "abstract": true,
                    url: '/workflowcenter',
                    templateUrl: _turl('/App/SysPages/views/my/workflowcenter/workflowcenter.html'),
                    parentMenu: 'my'
                })
                .state('my.workflowcenter.raise', {
                    url: '/raise',
                    views: {
                        'workflow': {
                            templateUrl: _turl('/App/SysPages/views/my/workflowcenter/raise/raise.html')
                        }
                    },
                    parentMenu: 'my.workflowcenter'
                })
                .state('my.workflowcenter.pendinghandle', {
                    url: '/pendinghandle',
                    views: {
                        'workflow': {
                            templateUrl: _turl('/App/SysPages/views/my/workflowcenter/pendinghandle/pendinghandle.html')
                        }
                    },
                    parentMenu: 'my.workflowcenter'
                })
                .state('my.workflowcenter.mywaiting', {
                    url: '/mywaiting',
                    views: {
                        'workflow': {
                            templateUrl: _turl('/App/SysPages/views/my/workflowcenter/mywaiting/mywaiting.html')
                        }
                    },
                    parentMenu: 'my.workflowcenter'
                })
                .state('my.workflowcenter.pendingread', {
                    url: '/pendingread',
                    views: {
                        'workflow': {
                            templateUrl: _turl('/App/SysPages/views/my/workflowcenter/pendingread/pendingread.html')
                        }
                    },
                    parentMenu: 'my.workflowcenter'
                })
                .state('my.workflowcenter.mymarked', {
                    url: '/mymarked',
                    views: {
                        'workflow': {
                            templateUrl: _turl('/App/SysPages/views/my/workflowcenter/mymarked/mymarked.html')
                        }
                    },
                    parentMenu: 'my.workflowcenter'
                })
                .state('my.workflowcenter.mydraft', {
                    url: '/mydraft',
                    views: {
                        'workflow': {
                            templateUrl: _turl('/App/SysPages/views/my/workflowcenter/mydraft/mydraft.html')
                        }
                    },
                    parentMenu: 'my.workflowcenter'
                })
                .state('my.workflowcenter.myraised', {
                    url: '/myraised',
                    views: {
                        'workflow': {
                            templateUrl: _turl('/App/SysPages/views/my/workflowcenter/myraised/myraised.html')
                        }
                    },
                    parentMenu: 'my.workflowcenter'
                })
                .state('my.workflowcenter.myhandled', {
                    url: '/myhandled',
                    views: {
                        'workflow': {
                            templateUrl: _turl('/App/SysPages/views/my/workflowcenter/myhandled/myhandled.html')
                        }
                    },
                    parentMenu: 'my.workflowcenter'
                })
                .state('my.workflowcenter.mycopied', {
                    url: '/mycopied',
                    views: {
                        'workflow': {
                            templateUrl: _turl('/App/SysPages/views/my/workflowcenter/mycopied/mycopied.html')
                        }
                    },
                    parentMenu: 'my.workflowcenter'
                })
                .state('my.workflowcenter.myauthorized', {
                    url: '/myauthorized',
                    views: {
                        'workflow': {
                            templateUrl: _turl('/App/SysPages/views/my/workflowcenter/myauthorized/myauthorized.html')
                        }
                    },
                    parentMenu: 'my.workflowcenter'
                })
                .state('my.workflowcenter.mydelegated', {
                    url: '/mydelegated',
                    views: {
                        'workflow': {
                            templateUrl: _turl('/App/SysPages/views/my/workflowcenter/mydelegated/mydelegated.html')
                        }
                    },
                    parentMenu: 'my.workflowcenter'
                })
                .state('my.workflowcenter.wfadvancedsearch', {
                    url: '/wfadvancedsearch',
                    views: {
                        'workflow': {
                            templateUrl: _turl('/App/SysPages/views/my/workflowcenter/wfadvancedsearch/wfadvancedsearch.html')
                        }
                    },
                    parentMenu: 'my.workflowcenter'
                })
                .state('my.report', {
                    url: '/report',
                    templateUrl: _turl('/App/SysPages/views/my/report/report.html'),
                    parentMenu: 'my'
                })
                .state('my.file', {
                    url: '/file',
                    templateUrl: _turl('/App/SysPages/views/my/file/file.html'),
                    parentMenu: 'my'
                })
                .state('my.data', {
                    //"abstract": true,
                    url: '/data',
                    templateUrl: _turl('/App/SysPages/views/my/data/data.html'),
                    parentMenu: 'my'
                })
                .state('my.user', {
                    url: '/user',
                    views: {
                        '': {
                            templateUrl: _turl('/App/SysPages/views/my/data/user/user.html')
                        }
                    },
                    parentMenu: 'my.data'
                })
                .state('my.group', {
                    url: '/group',
                    views: {
                        '': {
                            templateUrl: _turl('/App/SysPages/views/my/data/group/group.html')
                        }
                    },
                    parentMenu: 'my.data'
                })
                .state('my.groupExtension', {
                    url: '/groupExtension',
                    views: {
                        '': {
                            templateUrl: _turl('/App/SysPages/views/my/data/groupExtension/groupExtension.html')
                        }
                    },
                    parentMenu: 'my.data'
                })
                .state('my.enum', {
                    url: '/enum',
                    views: {
                        '': {
                            templateUrl: _turl('/App/SysPages/views/my/data/enum/enum.html')
                        }
                    },
                    parentMenu: 'my.data'
                })
                .state('my.datamodule', {
                    url: '/datamodule/{moduleId:[0-9|a-z|-]{36,36}}',
                    views: {
                        '': {
                            templateUrl: _turl('/App/_shared/module/basicData/container.html')
                        }
                    },
                    params: {
                        moduleId: null
                    },
                    parentMenu: 'my.data'
                })
                .state('my.reportmodule', {
                    url: '/reportmodule/{moduleId:[0-9|a-z|-]{36,36}}',
                    views: {
                        '': {
                            templateUrl: _turl('/App/_shared/module/report/container.html')
                        }
                    },
                    params: {
                        moduleId: null
                    },
                    parentMenu: 'my.report'
                })
                .state('my.role', {
                    url: '/role',
                    views: {
                        '': {
                            templateUrl: _turl('/App/SysPages/views/my/data/role/role.html')
                        }
                    },
                    parentMenu: 'my.data'
                })
                .state('my.integrationConfig', {
                    url: '/integrationConfig',
                    views: {
                        '': {
                            templateUrl: _turl('/App/SysPages/views/my/data/integrationConfig/integration.html')
                        }
                    },
                    parentMenu: 'my.data'
                })
                .state('my.basicDataConfig', {
                    url: '/basicDataConfig',
                    views: {
                        '': {
                            templateUrl: _turl('/App/SysPages/views/my/data/basicDataConfig/basicDataConfig.html')
                        }
                    },
                    parentMenu: 'my.data'
                })
                .state('personalsetting', {
                    url: '/personalsetting',
                    views: {
                        '': {
                            templateUrl: _turl('/App/SysPages/views/user/personalsetting.html')
                        }
                    },
                    parentMenu: 'my'
                })
                .state('agent', {
                    url: '/agent',
                    views: {
                        '': {
                            templateUrl: _turl('/App/SysPages/views/user/agent.html')
                        }
                    },
                    parentMenu: 'my'
                });
            //$locationProvider.html5Mode(true);
        }
    ]);

    app.controller('layoutController', [
        '$rootScope', 'w5cValidator', 'appSession', '$scope', '$translate', function ($rootScope, w5cValidator, appSession, $scope, $translate) {
            var vm = this;
            $rootScope.activeEnterprise = null;
            $rootScope.mainIcons = enums.mainIcons;
            $rootScope.$on("$translateChangeEnd", function (sender, data) {
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
        function ($rootScope, service, appSession, $translate, $location, bpmService) {
            var vm = this;

            //一级二级菜单
            vm.mainMenus = [
                //{
                //    displayName: "Mine",
                //    defaultState: "my.dashboard",
                //    menu: 'my',
                //    permission: 'Menu_My',
                //    children: [
                //        { displayName: "Dashboard", menu: 'my.dashboard', permission: 'Menu_My_Workplace' },
                //        {
                //            displayName: "WorkflowCenter",
                //            menu: 'my.workflowcenter',
                //            defaultState: "my.workflowcenter.pendinghandle",
                //            permission: 'Menu_My_WorkflowCenter'
                //            //这部分左侧菜单功能请到 workflowcenter.js 中维护
                //        },
                //        {
                //            displayName: "DataMaintenance",
                //            menu: 'my.data',
                //            needCheck: true,
                //            permission: 'Menu_My_DataMaintanance'
                //        },
                //        { displayName: "DataReport", menu: 'my.report', permission: 'Menu_My_Report' },
                //        { displayName: "File", menu: 'my.file', permission: 'Menu_My_File' }
                //    ]
                //},
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
            vm.goToState = function (item) {
                return item.defaultState || item.menu;
            }

            vm.subMenus = [];
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                angular.element('#cmd').html('');
                angular.element('#h_search').html('');
                if (toState.parentMenu !== null) {
                    var layerdMenu = vm.findMenuLayer(toState.parentMenu);
                    vm.currentMainMenu = layerdMenu[0];
                    vm.currentSubMenu = layerdMenu[1] || toState.name;
                    var s = _.find(vm.mainMenus, { menu: vm.currentMainMenu });
                    vm.subMenus = s && s.children;
                } else {
                    $rootScope.activeEnterprise = null;
                    vm.currentMainMenu = toState.name;
                    var subMenus = _.find(vm.mainMenus, { menu: toState.menu });
                    vm.subMenus = subMenus && subMenus.children;
                    vm.currentSubMenu = null;
                }
            });

            var moduleOpenType = [{ basicDataOpenType: "" }, { reportOpenType: "" }, { workflowOpenType: "" }, { unDefinedOpenType: "" }];

            vm.loadConfig = function (config) {
                bpmService.getSettings(mabp.toArray(config)).then(function (data) {
                    vm.moduleOpenType = mabp.toObject(data);
                    $rootScope.workflowGlobalOpenType = vm.moduleOpenType.workflowOpenType;
                    $rootScope.reportGlobalOpenType = vm.moduleOpenType.reportOpenType;
                    $rootScope.basicDataGlobalOpenType = vm.moduleOpenType.basicDataOpenType;
                    $rootScope.unDefinedGlobalOpenType = vm.moduleOpenType.unDefinedOpenType;
                });
            }

            vm.loadConfig(moduleOpenType);

            vm.findMenuLayer = function (menu) {
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

})();