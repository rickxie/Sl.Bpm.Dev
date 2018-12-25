(function () {
    'use strict';
    var controllerId = "syspages.views.system.permission";
    angular.module('app').controller(controllerId, [
        '$scope', 'mabp.app.permission', 'dialog', '$state', '$stateParams', function ($scope, service, dialog, $state, $stateParams) {
            CheckPermission("Menu_Sys_Permission");
            var vm = this;
            vm.selectedCg = null;
            //获取所有控制组
            vm.load = function () {
                service.getAllPermissionControlGroup().then(function (result) {
                    vm.allCg = result;
                });
            }
            vm.clearCache = function () {
                service.reloadPermissionCache().then(function () {
                    mabp.notify.success("清除成功");
                });
            }

            vm.keydown = function (event) {
                if (event.keyCode == 13) {
                    vm.searchUserRight(vm.userSearchTxt);
                }
            }

            //获取文本
            function getTxt(result, permissionKey) {
                var permission = _.find(result.language, { name: permissionKey });
                if (permission != null && permission.value != null) {
                    return permission.value;
                }
                return L(permissionKey.upperFirst())
                    || permissionKey;
            }

            vm.switchCg = function (item) {
                vm.selectedCg = item;
                service.getAllPermissions(item.id).then(function (result) {

                    //result.language 是驼峰式键值对 首字母连续大写变小写位数不定
                    //result.keys permissionKey 是全大写或者全小写 
                    //result.permissions permissionKey全大写或者全小写
                    _.forEach(result.keys, function (item) {
                        var newOne = _.find(result.permissions, { permissionKey: item.permissionKey });
                        angular.extend(item, {
                            text: getTxt(result, item.permissionKey)
                        });
                        if (newOne != null) {
                            angular.extend(item, newOne);
                        }
                    });
                    vm.list = result.keys;
                });
            }
            //回车查询
            vm.editCg = function (item) {
                dialog.open(app.dialogs.cgEdit, item).then(function (result) {
                    if (!!result) {
                        vm.load();
                    }
                });
            }

            vm.switchPermissionValue = function (item) {
                if (vm.selectedCg == null || vm.selectedCg.id == null) {
                    return;
                }
                var i = item.permissionValue;
                i = i == null ? 2 : i;
                var newValue = (i + 2) % 3;
                service.addOrUpdatePermission({ controlGroupId: vm.selectedCg.id, permissionKey: item.permissionKey, permissionValue: newValue }).then(function (data) {
                    var newItem = _.find(vm.list, { permissionKey: data.permissionKey });
                    angular.extend(newItem, data);
                });
            }
            //查询用户所拥有的权限
            vm.searchUserRight = function (userAccount) {
                dialog.open(app.dialogs.permissionUserCheckout, userAccount).then(function (result) { });
            }
            vm.load();
        }
    ]);
})();