(function () {
    'use strict';
    var controllerId = "syspages.views.my.data";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'mabp.app.module', '$state', 'moduleHandler', 'appSession',
        function ($scope, service, $state, module, session) {
            CheckPermission("Menu_My_DataMaintanance");
            var vm = this;
            vm.models = [
                { displayName: 'User', state: 'user', icon: 'icon icon-user', permission: 'SysModule_Data_User' },
                { displayName: 'Group', state: 'group', icon: 'icon icon-group', permission: 'SysModule_Data_Group' },
                { displayName: 'GroupExtension', state: 'groupExtension', icon: 'icon icon-group', permission: 'SysModule_Data_GroupExtension' },
                { displayName: 'SystemEnumeration', state: 'enum', icon: 'icon icon-list-alt', permission: 'SysModule_Data_Enum' },
                { displayName: 'Role', state: 'role', icon: 'icon icon-github', permission: 'SysModule_Data_Role' },
                { displayName: 'InterfaceConfig', state: 'integrationConfig', icon: 'icon icon-carousel', permission: 'SysModule_Data_Interface' },
                { displayName: 'BasicDataConfig', state: 'basicDataConfig', icon: 'icon icon-magic', permission: 'SysModule_Data_BasicData' }
            ];

            vm.load = function () {
                mabp.ui.setLoading('.data_load',
                    service.getAllPagesEntries(1).then(function (result) {
                    for (var i = 0; i < result.length; i++) {
                        switch (i % 6) {
                            case 0:
                                result[i].icon = "icon icon-user";
                                break;
                            case 1:
                                result[i].icon = "icon icon-group";
                                break;
                            case 2:
                                result[i].icon = "icon icon-list-alt";
                                break;
                            case 3:
                                result[i].icon = "icon icon-github";
                                break;
                            case 4:
                                result[i].icon = "icon icon-carousel";
                                break;
                            case 5:
                                result[i].icon = "icon icon-magic";
                                break;
                            default:

                        }
                    }
                    vm.pages = result;
                }));
            }

            vm.setFavourite = function (m, event) {
                module.setFavourite(m, event);
            }

            vm.openModule = function (m) {
                 var tempwindow=window.open();
                tempwindow.location='/page/'+m.fileName;
            }

     
            vm.load();
        }
    ]);
})();