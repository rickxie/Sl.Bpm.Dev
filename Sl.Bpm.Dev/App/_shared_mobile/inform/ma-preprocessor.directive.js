(function () {
    angular.module('app.shared')
    //缩减版的选人控件
    .directive('maPreprocessor', [
        'dialog', 'mabp.app.workflow', '$stateParams',
        function (dialog, service, $stateParams) {
            return {
                restrict: 'E',
                templateUrl: _turl('/App/_shared/inform/ma-preprocessor.directive.html'),
                replace: true,
                scope: {
                    processorLinkedId: '=',
                    processorNode: '='
                },
                link: function (scope, element, attr) {

                    var vm = scope.vm = {};
                    vm.node = scope.model;
                    vm.actorList = [];

                    vm.load = function () {
                        service.getProcessor({ id: scope.processorLinkedId }).then(function (data) {
                            vm.actorList = data;
                        });
                    }

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

                    vm.editActor = function (data) {
                        dialog.open(app.dialogs.actoruserSelect2, { processorLinkedId: scope.processorLinkedId, processorNode: scope.processorNode, processor: data }).then(function (data) {
                            if (!!data) {
                                if (model != null) {
                                    vm.actorList.map(function (item) {
                                        if (item.$$hashKey === model.$$hashKey) {
                                            $.extend(item, data);
                                        }
                                    });
                                } else {
                                    vm.actorList.push(data);
                                }
                            }
                            vm.load();
                        });
                    }

                    vm.removeActor = function (data) {
                        service.deleteWorkflowProcessor(data).then(function (result) {
                            if (result > 0) {
                                vm.load();
                                mabp.notify.success(L("DeleteSuccessfully"));
                            }
                        });
                    }

                    vm.open = function (model) {
                        dialog.open(app.dialogs.actoruserSelect2, { processorLinkedId: scope.processorLinkedId, processorNode: scope.processorNode }).then(function (data) {
                            if (!!data) {
                                if (model != null) {
                                    vm.actorList.map(function (item) {
                                        if (item.$$hashKey === model.$$hashKey) {
                                            $.extend(item, data);
                                        }
                                    });
                                } else {
                                    vm.actorList.push(data);
                                }
                            }
                            vm.load();
                        });
                    };

                    vm.barConfig = {
                        animation: 150,
                        ghostClass: "selectitem",
                        handle: ".handle",
                        onSort: function (evt) {
                            if (evt.oldIndex != evt.newIndex) {
                                service.updateWorkflowOrder(evt.models);
                            }
                        },
                        orderMember: "displayOrder"
                    };

                    vm.load();
                }
            };
        }
    ]);
})();