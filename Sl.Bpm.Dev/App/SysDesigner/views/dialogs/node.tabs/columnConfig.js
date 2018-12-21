/// <reference path="../../../../_shared/enums.js" />

(function () {
    var controllerId = 'app.sysdesigner.views.dialogs.node.tabs.columnConfig';
    angular.module('sysdesigner').controller(controllerId, [
       '$scope', 'dialog', 'mabp.app.workflow', '$stateParams',
        function ($scope, dialog, service, $stateParams) {
            var vm = this;
            vm.node = $scope.model;
            
            vm.addColumn = function () {
                var m = {};
                m.nodeId = vm.node.id;
                m.columnType = true;
                m.informLevel = 3;
                dialog.open(_shared.dialogs.formColumn, m).then(function (data) {
                    if (!!data) {
                        var n = {};
                        n.columnLinkId = vm.node.columnLinkId;
                        n.columnId = data.c_Id;
                        n.name = data.c_Name;
                        n.columnLevel = 3;
                        n.type = 1;
                        n.columnKey = data.schemaName + "." + data.c_SchemaName;
                        service.editColumnConfig(n).then(function () {
                            //mabp.notify.success(L("OperationSucceeded"));
                            vm.loadColumnConfig();
                        });
                    }
                });
            }
            vm.sourceTypes = enums.get("sourceType");

            vm.loadColumnConfig = function () {
                service.getAllColumnConfigs({ id: vm.node.columnLinkId }).then(function (data) {
                    vm.columnConfigs = data;
                });
            }

            vm.loadColumnConfig();

            vm.deleteColumnConfig = function (item) {
                service.deleteColumnConfig(item).then(function () {
                    //mabp.notify.success(L("OperationSucceeded"));
                    vm.loadColumnConfig();
                });
            }

            vm.barConfig = {
                animation: 150,
                ghostClass: "selectitem",
                handle: ".handle",
                onSort: function (evt) {
                    if (evt.oldIndex != evt.newIndex) {
                        service.updateColumnConfigDisplayOrder(vm.columnConfigs);
                    }
                },
                orderMember: "displayOrder"
            };

        }
    ]);
})();
