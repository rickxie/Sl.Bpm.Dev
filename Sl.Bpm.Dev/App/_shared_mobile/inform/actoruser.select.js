(function () {
    var controllerId = _shared.dialogs.define('actoruserSelect', '/App/_shared/inform/actoruser.select.html');
    angular.module('app.shared').controller(controllerId, [
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
                Initiator: { text: L("Initiator"), value: 0 },//发起人
                Applicant: { text: L("Applicant"), value: 19 },//申请人
                BusinessMan: { text: L("BusinessRelatedPerson"), value: 1 },//业务相关人
                Job: { text: L("Job"), value: 2 },//岗位
                JobUser: { text: L("JobToUser"), value: 22 },//岗位用户
                Role: { text: L("Role"), value: 3 },//角色
                Department: { text: L("Department"), value: 4 },//部门
                JobLevel: { text: L("SameWithCertainStepHandler"), value: 5 },//与某一步处理人相同
                JobCodeFilterByPerson: { text: L("JobCodeFilterByPerson"), value: 6 },//岗位代码按人过滤
                JobLevelFilterByPerson: { text: L("JobLevelFilterByPerson"), value: 7 },//岗位级别按人过滤
                JobCodeFilterByDept: { text: L("JobCodeFilterByDept"), value: 17 },//岗位代码按部门过滤
                JobLevelFilterByDept: { text: L("JobLevelFilterByDept"), value: 18 },//岗位级别按部门过滤
                RoleFilterByDepartment: { text: L("RoleFilterByDepartment"), value: 8 },//角色按部门过滤
                //20编号被通知占用了，这里用21
                RoleFilterByArea: { text: L("RoleFilterByArea"), value: 21 },//角色按照公司过滤
                DepartmentLeader: { text: L("DepartmentLeader"), value: 9 },//部门领导
                SupervisorOfProposer: { text: L("DirectSupervisor"), value: 10 },//直属主管
                SupervisorOfPre: { text: L("DirectSupervisorOfPreviousStep"), value: 11 },//前置步骤的直属主管
                DepartmentOfPre: { text: L("DepartmentLeaderOfPreviousStep"), value: 12 },//前置步骤的部门领导
                PersonOfSepecificOrganizationJobLevel: { text: L("PersonOfSpecificOrganizationJobLevel"), value: 13 },//某组织某岗位级别人员
                SupervisorOfSpe: { text: L("DirectSupervisorOfSpecificStep"), value: 14 },//指定步骤的直属主管
                DepartmentHeadOfSpe: { text: L("DepartmentLeaderOfSpecificStep"), value: 15 },//指定步骤的部门领导
                FromOneJobLevelToAnotherJobLevel: { text: L("FromOneJobLevelToAnotherJobLevel"), value: 16 }//从某岗位级别到某岗位级别
            };

            vm.changeType = function () {
                debugger;
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
                    case 2: case 4: case 14: case 15: case 16: case 17: case 18: case 22:
                        vm.dataArr.push(1);
                    case 3: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 21:
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
                                            obj.valuetext = data.jobName + "(" + data.jobUsers + ")";
                                        }
                                    });
                                    break;
                                case 3:
                                case 8:
                                case 21:
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
                                case 9:
                                case 10:
                                case 11:
                                case 12:
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
                                case 22:
                                    dialog.open(_shared.dialogs.jobUserDialog, { value: vm.model.dataValue, enterpriseId: vm.enterpriseId }).then(function (data) {
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
                if ([6, 7, 8, 9, 10, 16, 17, 18, 21, 11].indexOf(parseInt(vm.model.type)) > -1) {//这几个选项可以选择过滤身份(6, 7, 8, 9, 10, 16, 17, 18, 21,11)
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