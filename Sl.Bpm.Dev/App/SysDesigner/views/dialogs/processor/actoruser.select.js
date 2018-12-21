(function () {
    var controllerId = app.dialogs.define('actoruserSelect1', '/App/sysdesigner/views/dialogs/processor/actoruser.select.html');
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
                Initiator: { text: L("Initiator"), value: 0 },
                Applicant: { text: L("Applicant"), value: 19 },
                BusinessMan: { text: L("BusinessRelatedPerson"), value: 1 },
                Job: { text: L("Job"), value: 2 },
                Role: { text: L("Role"), value: 3 },
                Department: { text: L("Department"), value: 4 },
                JobLevel: { text: L("SameWithCertainStepHandler"), value: 5 },
                JobCodeFilterByPerson: { text: L("JobCodeFilterByPerson"), value: 6 },
                JobLevelFilterByPerson: { text: L("JobLevelFilterByPerson"), value: 7 },
                JobCodeFilterByDept: { text: L("JobCodeFilterByDept"), value: 17 },
                JobLevelFilterByDept: { text: L("JobLevelFilterByDept"), value: 18 },
                RoleFilterByDepartment: { text: L("RoleFilterByDepartment"), value: 8 },
                DepartmentLeader: { text: L("DepartmentLeader"), value: 9 },
                SupervisorOfProposer: { text: L("DirectSupervisor"), value: 10 },
                SupervisorOfPre: { text: L("DirectSupervisorOfPreviousStep"), value: 11 },
                DepartmentOfPre: { text: L("DepartmentLeaderOfPreviousStep"), value: 12 },
                PersonOfSepecificOrganizationJobLevel: { text: L("PersonOfSpecificOrganizationJobLevel"), value: 13 },
                SupervisorOfSpe: { text: L("DirectSupervisorOfSpecificStep"), value: 14 },
                DepartmentHeadOfSpe: { text: L("DepartmentLeaderOfSpecificStep"), value: 15 },
                FromOneJobLevelToAnotherJobLevel: { text: L("FromOneJobLevelToAnotherJobLevel"), value: 16 }
            };

            vm.changeType = function () {
                if (!vm.isInit) {
                    vm.model.dataType = null;
                    vm.model.baseType = null;
                    vm.dataTypes = [];
                    vm.baseTypes = [];
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
                    case 3: case 6: case 7: case 8:
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
                        text: L("ChooseSource"), value: 0, fun: function (obj) {
                            switch (vm.model.type) {
                                case 2:
                                    dialog.open(_shared.dialogs.jobDialog, { value: vm.model.dataValue, enterpriseId: vm.enterpriseId }).then(function (data) {
                                        if (!!data) {
                                            obj.value = data.id;
                                            obj.valuetext = data.jobName;
                                        }
                                    });
                                    break;
                                case 3:
                                case 8:
                                    dialog.open(_shared.dialogs.roleDialog, { value: vm.model.dataValue, enterpriseId: vm.enterpriseId }).then(function (data) {
                                        if (!!data) {
                                            obj.value = data.id;
                                            obj.valuetext = data.text;
                                        }
                                    });
                                    break;
                                case 4:
                                    dialog.open(_shared.dialogs.organizationDialog, { value: vm.model.dataValue, enterpriseId: vm.enterpriseId }).then(function (data) {
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
                                    dialog.open(_shared.dialogs.jobLevelDialog, { value: vm.model.dataValue, enterpriseId: vm.enterpriseId }).then(function (data) {
                                        if (!!data && data.length > 0) {
                                            obj.value = data[0].id;
                                            obj.valuetext = data[0].text;
                                        }
                                    });
                                    break;
                                case 13:
                                    dialog.open(_shared.dialogs.groupJobLevelDialog, { value: vm.model.dataValue, enterpriseId: vm.enterpriseId }).then(function (data) {
                                        if (!!data) {
                                            obj.value = data.groupId + "," + data.jobLevelId;
                                            obj.valuetext = data.groupName + "," + data.jobLevelName;
                                        }
                                    });
                                    break;
                                case 5:
                                case 14:
                                case 15:
                                    dialog.open(_shared.dialogs.workflowNodeDialog, { value: vm.model.dataValue, node: params.processorNode, enterpriseId: vm.enterpriseId }).then(function (data) {
                                        if (!!data) {
                                            obj.value = data.id;
                                            obj.valuetext = data.displayName;
                                        }
                                    });
                                    break;
                                case 16:
                                    dialog.open(_shared.dialogs.jobLevelAreaDialog, { value: vm.model.dataValue, enterpriseId: vm.enterpriseId }).then(function (data) {
                                        if (!!data) {
                                            obj.value = data.startJobLevelId + "," + data.endJobLevelId;
                                            obj.valuetext = data.startJobLevelName + "—" + data.endJobLevelName;
                                        }
                                    });
                                    break;
                                case 17:
                                    obj.readonly = false;
                                    obj.placeholder = L("PleaseInputJobCodeManually");
                                    break;
                                case 18:
                                    dialog.open(_shared.dialogs.jobLevelDialog, { value: vm.model.dataValue, enterpriseId: vm.enterpriseId }).then(function (data) {
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
                if ([6, 7, 8, 9, 10, 17, 18].indexOf(parseInt(vm.model.type)) > -1) {
                    vm.baseTypes = [{
                        text: L("AccordingToTheApplicant"), value: 0, fun: function (obj) {
                        }
                    }, {
                        text: L("AccordingToTheField"), value: 1, fun: function (obj) {
                            dialog.open(_shared.dialogs.businessTableColumn, { workflowId: $stateParams.workflowId }).then(function (data) {
                                if (!!data) {
                                    obj.value = "<%" + data.schemaName + "." + data.c_SchemaName + "%>";
                                    obj.valuetext = "<%" + data.schemaName + "." + data.c_SchemaName + "%>";
                                }
                            });
                        }
                    }, {
                        text: L("AccordingToTheVariable"), value: 2, fun: function (obj) {
                            dialog.open(_shared.dialogs.variableEdit, obj.value).then(function (data) {
                                obj.value = "<%" + data + "%>";
                                obj.valuetext = "<%" + data + "%>";
                            });
                        }
                    }];
                }
                vm.isInit = false;
            }

            vm.setVariable = function () {
                dialog.open(_shared.dialogs.variableEdit, vm.model.activeCondition).then(function (data) {
                    if (!!data) {
                        vm.model.activeCondition = (vm.model.activeCondition || "") + "<%" + data + "%>";
                    }
                });
            }

            vm.openColumn = function () {
                dialog.open(_shared.dialogs.businessTableColumn, { workflowId: $stateParams.workflowId }).then(function (data) {
                    if (!!data) {
                        vm.model.activeCondition = (vm.model.activeCondition || "") + "<%" + data.schemaName + "." + data.c_SchemaName + "%>";
                    }
                });
            }

            vm.watch = function () {
                service.getFormattedResult({ data: vm.model.activeCondition }).then(function (output) {
                    vm.formatedData = output.data;
                });
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