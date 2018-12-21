(function () {
    var controllerId = app.dialogs.define('actoruserSelect2', '/App/sysdesigner/views/dialogs/processor/actoruser.select2.html');
    angular.module('sysdesigner').controller(controllerId, [
         'params', '$scope', 'dialog', '$stateParams', 'mabp.app.workflow',
        function (params, $scope, dialog, $stateParams, service) {
            var vm = this;
            vm.model = {
                type: 0,
                dataType: 0,
                dataValue: null,
                baseType: 0,
                baseValue: null,
                isActiveConditionEnable: 0,
                baseDataType: 1,
                activeCondition: "",
                processorLinkId: params.processorLinkedId
            }
            vm.isInit = false;
            if (!!params.processor && !!params.processor.id) {
                vm.isInit = true;
            }

            vm.param = $scope.selectedModel;


            vm.dataTypes = [];
            vm.baseTypes = [];

            vm.cancel = function () {
                $scope.$close();
            }

            vm.save = function () {
                service.editWorkflowProcessor(vm.model).then(function (data) {
                    $scope.$close(data);
                });
            }

            //枚举 
            vm.actorList = {
                Job: { text: L("Job"), value: 2 },
                Role: { text: L("Role"), value: 3 },
                Department: { text: L("Department"), value: 4 },
                JobCode: { text: L("JobCode"), value: 6 },
                JobLevel: { text: L("JobLevel"), value: 7 }
            };

            vm.baseTypes = [{
                text: L("All"), value: 0, fun: function (obj) {
                }
            },
                    {
                        text: L("ApplicantOrganization"), value: 1, fun: function (obj) {
                        }
                    },
                    {
                        text: L("ApplicantOrganizationAndSubordinateOrganization"), value: 2, fun: function (obj) {
                        }
                    },
                    {
                        text: L("CurrentApproverOrganization"), value: 3, fun: function (obj) {
                        }
                    },
                    {
                        text: L("CurrentApproverOrganizationAndSubordinateOrganization"), value: 4, fun: function (obj) {
                        }
                    }, {
                        text: L("SpecificOrganization"), value: 5, fun: function (obj) {
                            dialog.open(_shared.dialogs.organizationDialog, { workflowId: $stateParams.workflowId }).then(function (data) {
                                if (!!data) {
                                    obj.value = data.id;
                                    obj.valuetext = data.text;
                                }
                            });
                        }
                    }, {
                        text: L("SpecificOrganizationVariable"), value: 6, fun: function (obj) {
                            dialog.open(_shared.dialogs.variableEdit, obj.value).then(function (data) {
                                if (!!data) {
                                    obj.value = "<%" + data + "%>";
                                    obj.valuetext = "<%" + data + "%>";
                                }
                            });
                        }
                    }, {
                        text: L("SpecificOrganizationDataField"), value: 7, fun: function (obj) {
                            dialog.open(_shared.dialogs.businessTableColumn, { workflowId: $stateParams.workflowId }).then(function (data) {
                                if (!!data) {
                                    obj.value = "<%" + data.schemaName + "." + data.c_SchemaName + "%>";
                                    obj.valuetext = "<%" + data.schemaName + "." + data.c_SchemaName + "%>";
                                }
                            });
                        }
                    }, {
                        text: L("SpecificOrganizationAndSubordinateOrganization"), value: 8, fun: function (obj) {
                            dialog.open(_shared.dialogs.organizationDialog, { workflowId: $stateParams.workflowId }).then(function (data) {
                                if (!!data) {
                                    obj.value = data.id;
                                    obj.valuetext = data.text;
                                }
                            });
                        }
                    }, {
                        text: L("SpecificOrganizationAndSubordinateOrganizationVariable"), value: 9, fun: function (obj) {
                            dialog.open(_shared.dialogs.variableEdit, obj.value).then(function (data) {
                                if (!!data) {
                                    obj.value = "<%" + data + "%>";
                                    obj.valuetext = "<%" + data + "%>";
                                }
                            });
                        }
                    }, {
                        text: L("SpecificOrganizationAndSubordinateOrganizationDataField"), value: 10, fun: function (obj) {
                            dialog.open(_shared.dialogs.businessTableColumn, { workflowId: $stateParams.workflowId }).then(function (data) {
                                if (!!data) {
                                    obj.value = "<%" + data.schemaName + "." + data.c_SchemaName + "%>";
                                    obj.valuetext = "<%" + data.schemaName + "." + data.c_SchemaName + "%>";
                                }
                            });
                        }
                    }];

            vm.getBaseType = function (val) {
                for (var i = 0; i < vm.baseTypes.length; i++) {
                    if (vm.baseTypes[i].value == val) {
                        return vm.baseTypes[i].text;
                    }
                }
            }

            vm.changeType = function () {
                if (!vm.isInit) {
                    vm.model.dataType = 0;
                    vm.model.baseType = 0;
                    vm.dataTypes = [];
                    vm.dataTypePlaceholder = "";
                    vm.baseTypePlaceholder = "";
                    vm.model.dataValueName = "";
                    vm.model.baseValueName = "";
                } else if (vm.model.type == 6) {
                    vm.dataValueReadOnly = false;
                }

                vm.dataArr = [];
                switch (parseInt(vm.model.type)) {
                    case 2: case 4: case 14: case 15: case 16: case 17: case 18:
                        vm.dataArr.push(1);
                    case 3: case 6: case 7: case 8: case 21:
                        vm.dataArr.push(2);
                    case 5: case 13:
                        vm.dataArr.push(0);
                        break;
                    case 1:
                        vm.dataArr.push(1, 2);
                        break;
                    default:
                }
                if (vm.dataArr.indexOf(0) > -1) {
                    vm.dataTypes.push({
                        text: L("ChooseSource"),
                        value: 0,
                        fun: function(obj) {
                            switch (vm.model.type) {
                            case 2:
                                dialog.open(_shared.dialogs.jobDialog, { value: vm.model.dataValue, enterpriseId: vm.enterpriseId }).then(function(data) {
                                    if (!!data) {
                                        obj.value = data.id;
                                        obj.valuetext = data.jobName + "(" + data.jobUsers + ")";
                                    }
                                });
                                break;
                            case 3:
                                dialog.open(_shared.dialogs.roleDialog, { value: vm.model.dataValue, enterpriseId: vm.enterpriseId }).then(function(data) {
                                    if (!!data) {
                                        obj.value = data.id;
                                        obj.valuetext = data.text;
                                    }
                                });
                                break;
                            case 4:
                                dialog.open(_shared.dialogs.organizationDialog, { value: vm.model.dataValue, enterpriseId: vm.enterpriseId }).then(function(data) {
                                    if (!!data) {
                                        obj.value = data.id;
                                        obj.valuetext = data.text;
                                    }
                                });
                                break;
                            case 6:
                                obj.readonly = false;
                                obj.placeholder = L("PleaseInputJobCodeManually");
                                break;
                            case 7:
                                dialog.open(_shared.dialogs.jobLevelDialog, { value: vm.model.dataValue, enterpriseId: vm.enterpriseId }).then(function(data) {
                                    if (!!data && data.length > 0) {
                                        obj.value = data[0].id;
                                        obj.valuetext = data[0].text;
                                    }
                                });
                                break;
                            default:
                            }
                        }
                    });
                }
                if (vm.dataArr.indexOf(1) > -1) {
                    vm.dataTypes.push({
                        text: L("DataField"), value: 1, fun: function (obj) {
                            dialog.open(_shared.dialogs.businessTableColumn, { workflowId: $stateParams.workflowId }).then(function (data) {
                                if (!!data) {
                                    obj.value = "<%" + data.schemaName + "." + data.c_SchemaName + "%>";
                                    obj.valuetext = "<%" + data.schemaName + "." + data.c_SchemaName + "%>";
                                }
                            });
                        }
                    });
                }
                if (vm.dataArr.indexOf(2) > -1) {
                    vm.dataTypes.push({
                        text: L("Variable"), value: 2, fun: function (obj) {
                            dialog.open(_shared.dialogs.variableEdit, obj.value).then(function (data) {
                                if (!!data) {
                                    obj.value = "<%" + data + "%>";
                                    obj.valuetext = "<%" + data + "%>";
                                }
                            });
                        }
                    });
                }
                vm.isInit = false;
            }

            if (!!params.processor && !!params.processor.id) {
                vm.model = {
                    id: params.processor.id,
                    type: params.processor.type,
                    dataType: params.processor.dataType,
                    dataValue: params.processor.dataValue,
                    dataValueName: params.processor.dataValueName,
                    baseType: params.processor.baseType,
                    baseValue: params.processor.baseValue,
                    baseValueName: params.processor.baseValue,
                    isActiveConditionEnable: params.processor.isActiveConditionEnable,
                    activeCondition: params.processor.activeCondition,
                    processorLinkId: params.processor.processorLinkId
                }
                vm.changeType();
            }
        }
    ]);
})();