(function () {
    var controllerId = app.dialogs.define('modulePage', '/App/SysPages/views/system/module/module.page.html');
    app.controller(controllerId, ['$scope', 'params', 'asdialog', 'dialog', 'mabp.app.module', function ($scope, params, asdialog, dialog, service) {
        var vm = this;
        vm.module = params && (params.model || {});

        vm.load = function () {
            service.getPagesForModule(vm.module).then(function (data) {
                vm.model = data;
            });
        }

        vm.load();

        vm.edit = function () {
            dialog.open(app.dialogs["modulePageEdit"], { model: vm.module }).then(function (result) {
                if (result) {
                    vm.load();
                }
            });
        };

        vm.remove = function (p) {
            service.removePageForModule(vm.module).then(function () {
                vm.load();
            });
        }

        vm.pageRight = function (p) {
            vm.module.pageId = p.id;
            vm.module.pageName = p.name;
            dialog.open(app.dialogs["modulePageRight"], { model: vm.module }).then(function (result) {
                if (result) {
                    vm.load();
                }
            });
        }

    }]);
})();