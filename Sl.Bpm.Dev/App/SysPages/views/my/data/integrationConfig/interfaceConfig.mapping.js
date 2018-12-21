(function () {
    var controllerId = app.dialogs.define('interfaceMappingConfig', '/App/SysPages/views/my/data/interfaceConfig/interfaceConfig.mapping.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.bpm', '$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.dataTypes = mabp.tableColumnType;
            vm.interface = params;
            vm.load = function () {
                service.getAllInterfaceMappingConfigs(vm.interface).then(function (data) {
                    if (data.length < 0) {

                    }
                    vm.models = data;
                });
            }

            vm.reInit = function () {
                service.reInitInterfaceMappingConfigs(vm.interface).then(function (data) {
                    vm.models = data;
                });
            }

            vm.edit = function (i) {
                ////只能有一个主键
                //var primary = _.filter(vm.models, { "isPrimaryField": true });
                //if (primary.length > 1) {
                //    mabp.notify.error("一张表只能有一个主键");
                //    return;
                //}
                //排序必须大于1且不能重复
                //var items1 = _.filter(vm.models, { 'mappingOrder': 0 });
                //if (items1.length > 1) {
                //    mabp.notify.error("排序顺序不能为0！");
                //    return;
                //}
                //var items = _.uniqBy(vm.models, 'mappingOrder');
                //if (items.length < vm.models.length) {
                //    mabp.notify.error("排序顺序必须唯一！");
                //    return;
                //}
                service.editInterfaceMappingConfig(i).then(function () {

                });
            }

            vm.save = function () {

                ////排序必须大于1且不能重复
                //var items1 = _.filter(vm.models, { 'mappingOrder': 0 });
                //if (items1.length > 1) {
                //    mabp.notify.error("排序顺序不能为0！");
                //    return;
                //}
                //var items = _.uniqBy(vm.models, 'mappingOrder');
                //if (items.length < vm.models.length) {
                //    mabp.notify.error("排序顺序必须唯一！");
                //    return;
                //}
                
            }

            vm.load();

            vm.barConfig = {
                animation: 150,
                ghostClass: "selectitem",
                handle: ".handle",
                onSort: function (evt) {
                    if (evt.oldIndex != evt.newIndex) {
                        service.editInterfaceMappingConfigs(vm.models);
                    }
                },
                orderMember: "mappingOrder"
            };
        }
    ]);
})();