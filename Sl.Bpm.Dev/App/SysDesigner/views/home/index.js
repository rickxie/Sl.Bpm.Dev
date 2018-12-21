var controller = {};
(function () {
    'use strict';
    var controllerId = "sysdeisgner.views.index";
    angular.module('sysdesigner').controller(controllerId, [
        '$rootScope', '$modal', 'dialog', 'asdialog', 'mabp.app.workflow', '$stateParams', function ($rootScope, $modal, dialog, asdialog, service, $stateParams) {
            var vm = this;
            vm.model = {};

            $rootScope.isDesignModel = controller.isDesignModel = true;
            vm.NodeSave = function (m) {
                $rootScope.isSaving = true;
                service.saveNode(m).then(function (result) {
                    $rootScope.isSaving = false;
                    controller = this;
                });
            };
            vm.RemoveNode = function (m) {
                $rootScope.isSaving = true;
                service.deleteNode(m).then(function (result) {
                    $rootScope.isSaving = false;
                    controller = this;
                });
            };

            vm.LineRemove = function (m) {
                $rootScope.isSaving = true;
                service.deleteLink(m).then(function (result) {
                    $rootScope.isSaving = false;
                    controller = this;
                });
            };

            vm.LineSave = function (m) {
                $rootScope.isSaving = true;
                service.saveLink(m).then(function (result) {
                    $rootScope.isSaving = false;
                    controller = this;
                });
            };
            vm.NodeOpen = function (m, callBack) {
                asdialog.open(app.dialogs.nodeEdit, m).then(function (result) {
                    callBack(result);
                });
            }
            vm.LineOpen = function (m, callBack) {
                asdialog.open(app.dialogs.connectionEdit, m).then(function (result) {
                    callBack(result);
                });
            }
            vm.ZoomSave = function (m) {

            };
            vm.preInitialize = function () {
                var enterpriseId = $stateParams.workflowId;
                service.getWorkflow({ id: enterpriseId }).then(function (result) {
                    $rootScope.workflowName = result.model.name;
                    $rootScope.workflowCode = result.model.code;
                    vm.model = result;
                    controller.model = result;
                    //初始化
                    seajs.config({
                        base: "/Content/Lib/des-lib/des/modules"
                    });
                    seajs.use("/Content/Lib/des-lib/des/des");

                    //注册全局高度调整事件
                    window.resizeEvent = [];
                    window.onresize = function () { window.resizeEvent.forEach(function (item) { item(); }) }

                });
            };
            vm.postInitialize = function (service) {
                service.NodeOpen = vm.NodeOpen;
                service.LineOpen = vm.LineOpen;
                service.NodeSave = vm.NodeSave;
                service.LineSave = vm.LineSave;
                service.LineRemove = vm.LineRemove;
                service.ZoomSave = vm.ZoomSave;
                service.NodeRemove = vm.RemoveNode;
            }


            vm.load = function () {
                controller = this;
                vm.preInitialize();
            }
            vm.load();
        }
    ]);
})();