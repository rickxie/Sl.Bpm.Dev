(function () {
    var controllerId = app.dialogs.define('workflowEdit', '/App/SysPages/views/system/workflow/workflow.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.workflow', 'mabp.app.permission', '$stateParams', 'dialog',
        function ($scope, params, service, pService,  $stateParams, dialog) {
            var vm = this;
            vm.model = params.model || {};
            vm.categories = params.categories;
            vm.model.wfdCategoryId = params.currentCategoryId;

            vm.save = function () {
                vm.isSaving = true;
                vm.model.enterpriseId = $stateParams.enterpriseId;
                mabp.ui.setSaving('workflowEdit',
                service.editWorkflow(vm.model).then(function() {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                }), L("Saveing"));
            };
            vm.saveTitle = function() {
                service.editWorkflow(vm.model).then(function() {});
            }
            vm.delete = function (m) {
                service.deleteWorkflow(m).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
                    $scope.$close(true);
                });
            }

            $stateParams.workflowId = vm.model.id;
         

            $scope.informConfig = {};
            $scope.informConfig.informLevel = 2;
            $scope.informConfig.informLinkId = vm.model.informLinkId;
            $scope.informConfig.workflowId = vm.model.id;
             

            //按钮变化后更新数据库值
            vm.change = function (item) {
                item.enterpriseId = vm.node.enterpriseId;
                item.actionLinkId = vm.node.actionLinkId;
                service.editActionEnable(item).then(function () {
                    mabp.notify.success(L("StateHasBeenSaved"));
                });
            }

            //多语言设置后更新数值
            vm.changeLang = function (item) {
                item.enterpriseId = vm.node.enterpriseId;
                item.actionLinkId = vm.node.actionLinkId;
                service.editActionLang(item).then(function () {
                    mabp.notify.success(L("MultiLanguageHasBeenSaved"));
                });
            }

            vm.changeNode = function (item) {
                item.returnToNodes = vm.selectedNodes.join(',');
                service.editActionReturnToNodes(item);
            }

          

            vm.addColumn = function () {
                var m = {};
                m.columnType = true;
                m.informLevel = 2;
                m.workflowId = vm.model.id;
                dialog.open(_shared.dialogs.formColumn, m).then(function (data) {
                    if (!!data) {
                        var n = {};
                        n.columnLinkId = vm.model.columnLinkId;
                        n.columnId = data.c_Id;
                        n.name = data.c_Name;
                        n.columnLevel = 2;
                        n.type = 1;
                        n.columnKey = data.schemaName + "." + data.c_SchemaName;
                        service.editColumnConfig(n).then(function() {
                            mabp.notify.success(L("OperationSucceeded"));
                            vm.loadColumnConfig();
                        });
                    }
                });
            }


            vm.addViewColumn = function() {
                dialog.open(app.dialogs.workflowViewTable, null).then(function (data) {
                    
                });
            }

            vm.sourceTypes = enums.get("sourceType");

            vm.loadColumnConfig = function () {
                service.getAllColumnConfigs({id:vm.model.columnLinkId}).then(function (data) {
                    vm.columnConfigs = data;
                });
            }

            vm.loadColumnConfig();

            vm.deleteColumnConfig = function(item) {
                service.deleteColumnConfig(item).then(function () {
                    mabp.notify.success(L("OperationSucceeded"));
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



            //#region Control Group 流程公司权限配置
            vm.newControl = {};
            vm.controlGroups = [];
            //加载公司权限项
            vm.loadControlGroup = function () {
                pService.getWorkflowPermission({ id: $stateParams.workflowId }).then(function(data) {
                    vm.controlGroups = data;
                });
            }
            //新增流程公司权限
            vm.saveControl = function() {
                pService.saveWorkflowControl({ item1: $stateParams.workflowId, item2: vm.newControl.areaCode })
                    .then(function() {
                        vm.newControl = {};
                        vm.loadControlGroup();
                    });
            }
            //配置流程公司权限
            vm.setControlGroup = function(item) {
                dialog.open(app.dialogs.workflowControl, { id: item.id, name: item.$company[0].text }).then(function (data) {

                });
            }
            //删除权限项
            vm.deleteControlGroup = function (item) {
                pService.deleteWorkflowControl(item).then(function(result) {
                    mabp.notify.success("删除成功");
                    vm.loadControlGroup();
                });
            }
            vm.loadControlGroup();
            //#end
        }
    ]);
})();