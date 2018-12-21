(function () {
    var controllerId = app.dialogs.define('permissionUserCheckout', '/App/SysPages/views/system/permission/permission.user.checkout.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.permission', '$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.userAccount = _.cloneDeep(params);
            //获取文本
            function getTxt(result, permissionKey) {
                var permission = _.find(result.language, { name: permissionKey });
                if (permission != null && permission.value != null) {
                    return permission.value;
                }
                return L(permissionKey.upperFirst())
                    || permissionKey;
            }
            vm.load = function () {
                if (vm.userAccount != null)
                    service.getUserPermissionsByAccount(vm.userAccount).then(function (data) {
                        var permissions = [];
                        for (var item in data.permissions) {
                            var permissionItem = {};
                            permissionItem.text = getTxt(data, item);
                            permissionItem.value = data.permissions[item];
                            permissions.push(permissionItem);
                        }
                        vm.permissions = permissions;
                    });
            }

            vm.load();
        }
    ]);
})();