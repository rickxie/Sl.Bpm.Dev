(function () {
    var controllerId = app.dialogs.define('modulePageRight', '/App/SysPages/views/system/module/module.page.right.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.module', function ($scope, params, service) {
        var vm = this;
        vm.module = params && (params.model || {});
        vm.controlStatus = enums.get("controlStatus");
        vm.openStatus = enums.get("modulePageStatus");

        vm.load = function () {
            service.getModulePageNodes({ PageId: vm.module.pageId, ModuleId: vm.module.id }).then(function (data) {
                if (!!data) {
                    vm.nodes = data;
                }
            });
            service.getModulePageRights({ PageId: vm.module.pageId, ModuleId: vm.module.id }).then(function (data) {
                if (!!data) {
                    vm.models = data;
                }
            });
            vm.newRight = {
                pageId: vm.module.pageId,
                pageName: vm.module.pageName,
                nodeId: null,
                flag: null,
                openStatus: 0,
                status: null,
                moduleId: vm.module.id
            };
        }

        vm.load();

        vm.save = function (r) {
            if (!r.flag) {
                mabp.notify.warn(L("IdentityCannotBeNull"));
                return false;
            }
            if (!r.nodeId) {
                mabp.notify.warn(L("MustChooseOneNode"));
                return false;
            }
            service.editModulePageRight(r).then(function () {
                vm.load();
                mabp.notify.success(L("SaveSuccessfully"));
            });
            return true;
        }

        vm.remove = function (r) {
            service.deleteModulePageRight(r).then(function () {
                vm.load();
            });
        }

    }]);
})();