(function () {
    var controllerId = 'shared.component.inform.config';
    angular.module('app.shared').controller(controllerId, [
        '$scope', 'dialog', 'mabp.app.workflow', '$stateParams',
        function ($scope, dialog, service, $stateParams) {
            var vm = this;
            vm.model = { informLevel: 1 };
            vm.informType = enums.informType;
            //初始化默认动作按钮组
            vm.noticeList = enums.noticeType;
            vm.load = function () {
                if (vm.model.informLevel === 3) {
                    service.getNodeActions({ id: vm.model.actionLinkId }).then(function (data) {
                        vm.actorList = [];
                        if (!!data) {
                            _.forEach(data, function (item) {
                                vm.actorList.push({ type: item.type, displayText: item.name, id: item.id });
                            });
                        }
                        if (vm.model.nodeType === 6) {
                            vm.actorList.push({ type: 'event_TaskCompleted', displayText: L('EndNode_EventCompleted'), id: '9999' });
                        }
                        service.getAllByInformConfigLinkId({ informLinkId: vm.model.informLinkId, informLevel: vm.model.informLevel }).then(function (data) {
                            vm.informs = data;
                        });
                    });
                } else {
                    vm.actorList = [];
                    //目前只支持这四个
                    vm.actorList = {
                        //提交
                        event_Submit: { type: "event_Submit", nodeRestrict: 0, style: "btn-primary", isEnable: false, displayText: "提交" },
                        //删除
                        event_Delete: { type: "event_Delete", nodeRestrict: 0, style: "btn-danger", isEnable: false, displayText: "删除" },
                        //同意
                        event_Agree: { type: "event_Agree", nodeRestrict: 1, style: "btn-primary", isEnable: false, displayText: "同意" },
                        //拒绝
                        event_Reject: { type: "event_Reject", nodeRestrict: 1, style: "btn-danger", isEnable: false, displayText: "拒绝" },
                        //退回发起人
                        event_RecedeToProposer: { type: "event_RecedeToProposer", nodeRestrict: 1, style: "btn-primary", isEnable: false, displayText: "退回发起人" },
                        //打印
                        event_Print: { type: "event_Print", nodeRestrict: 1, style: "btn-primary", isEnable: false, displayText: "打印" },
                        //跳过
                        event_Skip: { type: "event_Skip", nodeRestrict: 1, style: "btn-primary", isEnable: false, displayText: "跳过" }
                    };
                    if (vm.model != null && vm.model.workflowId != null)
                        service.chargeInformAndColumnLinkId({ id: vm.model.workflowId }).then(function (data) {
                            if (!!data) {
                                vm.model.informLinkId = data.informLinkId;
                                vm.model.columnLinkId = data.columnLinkId;
                            }
                        });
                    service.getAllByInformConfigLinkId(vm.model).then(function (data) {
                        vm.informs = data;
                    });
                }
            }
            vm.load();
            //直接在界面上新增一条数据
            vm.add = function () {
                service.editNodeInformConfig({ informLinkId: vm.model.informLinkId, informLevel: vm.model.informLevel }).then(function (result) {
                    vm.load();
                });
            };

            //改变按钮
            vm.changeType = function (item) {
                service.editNodeInformConfig(item).then(function (result) {
                });
            }

            vm.changeActor = function (item) {
                item.actionId = _.find(vm.actorList, { type: item.eventType }).id;
                vm.changeType(item);
            }

            vm.edit = function (item) {
                dialog.open(_shared.dialogs.actionEditDialog, { data: vm.model, model: item }).then(function (data) {
                });
            }

            vm.remove = function (item) {
                service.deleteNodeInformConfig(item).then(function (result) {
                    vm.load();
                });
            }

            vm.setInformTemplate = function (item) {
                dialog.open(_shared.dialogs.informFormatSelect, { data: vm.model, model: item }).then(function (data) {
                    if (!!data) {
                        item.langTemplateList = data.langTemplateList;
                        item.langTextSubjectList = data.langTextSubjectList;
                        vm.changeType(item);
                    }
                });
            }
        }
    ]);
})();
