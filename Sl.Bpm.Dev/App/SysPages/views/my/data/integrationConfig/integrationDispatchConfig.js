(function () {
    'use strict';
    var controllerId = "syspages.views.my.data.integrationDispatchConfig";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'asdialog', 'mabp.app.bpm', '$stateParams', function ($scope, asdialog, service, $stateParams) {
            var vm = this;
            vm.models = [];
            //vm.servers = [{ name: "QAD服务器", id: 123 }, { name: "SAP服务器", id: 2 }];
            vm.load = function () {
                service.getAllInterfaceServerConfigs().then(function (data) {
                    if (data.length > 0) {
                        vm.servers = data;
                        vm.activeItem = data[0];
                        //TODO:获取数据并绑定到vm.models
                        vm.getAll(data[0]);
                    }
                });

            }

            vm.edit = function (s, m) { asdialog.open(app.dialogs["integrationDispatchConfig"], { server: s, model: m }).then(function (data) { if (data) vm.load(); }); }
            vm.editServer = function (m) {
                asdialog.open(app.dialogs["integrationServerConfig"], m).then(function (data) { if (data) vm.load(); });
            }
            vm.editMapping = function (m) { asdialog.open(app.dialogs["interfaceMappingConfig"], m).then(function (data) { if (data) vm.load(); }); }

            vm.delete = function (m) {
                service.deleteInterfaceConfig(m).then(function (data) {
                    mabp.notify.success(L("DeleteInterfaceSuccessfully"));
                    vm.load();
                });
            }

            vm.getAll = function (server) {
                service.getAllInterfaceConfigs(server.id).then(function (result) {
                    vm.models = result;
                });
            }

            vm.switch = function (s) {
                vm.activeItem = s;
                vm.getAll(s);
            }

            vm.load();
        }
    ]);
})();