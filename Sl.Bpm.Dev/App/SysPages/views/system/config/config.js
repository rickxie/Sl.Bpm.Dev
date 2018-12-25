(function () {
    'use strict';
    var controllerId = "syspages.views.system.config";
    angular.module('app').controller(controllerId, [
        '$scope', '$modal', 'dialog', 'asdialog', 'mabp.app.bpm', 'mabp.app.enterpriseInfoSync', '$rootScope',
        function ($scope, $modal, dialog, asdialog, service, syncService, $rootScope) {
            CheckPermission("Menu_Sys_Configuration");
            var vm = this;
            var msgConfig = [{ messageAddress: "" }, { messageAccount: "" }, { messagePassword: "" }];
            var mailConfig = [{ emailServerAddress: "" }, { emailServerPort: "" }, { emailServerAccount: "" }, { emailServerPassword: "" }, { emailServerIsSSL: false }, { emailServerIsOpen: false }, { emailServerSenderEmail: "" }, { emailServerSenderDisplayName: "" }];
            var fileConfig = [{ FileAddress: "" }, { FileAccount: "" }, { FilePassword: "" }];
            var moduleOpenType = [{ basicDataOpenType: "" }, { reportOpenType: "" }, { workflowOpenType: "" }, { unDefinedOpenType: "" }];
            vm.mailConfig = {};

            //加载配置
            vm.loadConfig = function (config, configName) {
                service.getSettings(mabp.toArray(config)).then(function (data) {
                    vm[configName] = mabp.toObject(data);
                    if (vm.mailConfig.emailServerIsSSL == 'true') {
                        vm.mailConfig.emailServerIsSSL = true;
                    } else
                        vm.mailConfig.emailServerIsSSL = false;

                    if (vm.mailConfig.emailServerIsOpen == 'true') {
                        vm.mailConfig.emailServerIsOpen = true;
                    } else
                        vm.mailConfig.emailServerIsOpen = false;
                });
            }
            vm.load = function () {
                vm.syncConfig = {};
                service.getSyncConfigs().then(function (data) {
                    if (!!data) {
                        vm.syncConfig.serviceAddress = data.serviceAddress;
                        vm.syncConfig.enterpriseAccessId = data.enterpriseAccessId;
                        vm.syncConfig.userAccessId = data.userAccessId;
                    }
                });

                service.getEnterprise("").then(function (data) {
                    vm.enterprise = data;
                });

                vm.loadConfig(msgConfig, "msgConfig");
                vm.loadConfig(mailConfig, "mailConfig");
                vm.loadConfig(fileConfig, "fileConfig"); 
                vm.loadConfig(moduleOpenType, "moduleOpenType");
            };

            vm.load();

            vm.saveSyncConfig = function () {
                mabp.ui.setSaving('saveSetting', syncService.updateAccessIdValidate({
                    SyncServiceAddress: vm.syncConfig.serviceAddress,
                    EnterpriseAccessId: vm.syncConfig.enterpriseAccessId,
                    UserAccessId: vm.syncConfig.userAccessId
                }).then(function (data) {
                    if (data.isSuccess) {
                        service.updateSyncConfig(vm.syncConfig).then(function (data) {
                            if (!!data) {
                                mabp.notify.success(L("UpdateSuccessfully"));
                            }
                        });
                    } else {
                        mabp.notify.error(data.errorMsg);
                    }
                }, function () {

                }), L("Saveing"));
            }

           

            vm.saveConfig = function (model) {
                var m = mabp.toArray(model);
                $rootScope.workflowGlobalOpenType = model.workflowOpenType;
                $rootScope.reportGlobalOpenType = model.reportOpenType;
                $rootScope.basicDataGlobalOpenType = model.basicDataOpenType;
                $rootScope.unDefinedGlobalOpenType = model.unDefinedOpenType;
                mabp.ui.setSaving('.btn_save',
                service.saveSettings(m).then(function () {
                    mabp.notify.success(L("SaveSuccessfully"));
                }), L("Saveing"));
            } 

            //系统初始化 暂时放着
            vm.reInit = function () {
                mabp.message.confirm("确定重新初始化系统？", "确认", function (confirmed) {
                    if (confirmed) {
                        mabp.notify.info("初始化功能尚未完成！");
                    }

                });
            }

            vm.Clear = function () {
                vm.otherInstructions2 = "";
            }
          
            $scope.informConfig = {};
            $scope.informConfig.informLevel = 1;
            //模块全局打开方式
            vm.moduleOpenTypes = enums.get("globalModuleOpenType");

        }
    ]);
})();