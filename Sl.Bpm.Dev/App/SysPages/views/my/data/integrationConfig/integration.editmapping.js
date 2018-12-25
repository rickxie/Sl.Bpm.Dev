(function () {
    var controllerId = app.dialogs.define('integrationEditMapping', '/App/SysPages/views/my/data/integrationConfig/integration.editmapping.html', 'lg');
    angular.module('app').controller(controllerId,
        ['$scope', 'params', 'mabp.app.bpm', function ($scope, params, service) {
            var vm = this;
            vm.type = params.type;
            vm.title = params.description;
            vm.configId = params.configLinkId;
            vm.mappingId = params.mappingLinkId;
            vm.configmodel = {};
            vm.model = [];

            vm.datatype = [{ id: 1, text: "Int" },
                { id: 2, text: "Nvarchar" },
                { id: 3, text: "Real" },
                { id: 4, text: "Bit" },
                { id: 5, text: "Decimal" },
                { id: 6, text: "DateTime" }
            ];

            vm.load = function () {
                if (vm.type == 1) {
                    service.getIntegrationFileByConfigId(vm.configId).then(function (data) {
                        if (!!data) {
                            vm.configmodel = data;
                        }
                    });
                }
                if (vm.type == 2) {
                    service.getIntegrationServiceByConfigId(vm.configId).then(function (data) {
                        if (!!data) {
                            vm.configmodel = data;
                        }
                    });
                }
                if (vm.type == 3) {
                    service.getIntegrationFileByConfigId(vm.configId).then(function (data) {
                        if (!!data) {
                            vm.configmodel = data;
                        }
                    });
                }

                service.getIntegrationMappingByMappingId(vm.mappingId).then(function (data) {
                    if (!!data) {
                        vm.model = data;
                    }
                });
            };
            vm.load();

            //读取webservice的wsdl
            vm.readService = function () {
                service.readServiceXml(vm.configmodel).then(function (data) {
                    if (!!data) {
                        vm.model = data;
                    }
                });
            };


            vm.createSource = function () {
                if (vm.configmodel.content) {
                    if (vm.type == 1) {
                        vm.model = [];
                        var fields = vm.configmodel.content.split(vm.configmodel.fileSeparator);
                        for (var i = 0; i < fields.length;i++)
                            vm.model.push({ parentDestElement: "", destElement: fields[i], mappingLinkId: vm.mappingId });
                    }
                }
            };

            vm.save = function () {
                vm.isSaving = true;
                mabp.ui.setSaving('integrationEditMapping',
                service.editIntegrationMapping({ listMappingDto: vm.model, mappingLinkId: vm.mappingId }).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            };

            vm.getFormatNotice = function (datatype) {

            };
        }]);
})();