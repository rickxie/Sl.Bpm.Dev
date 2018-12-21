(function () {
    angular.module('app.shared')
        .directive('maProcessor', [
        'dialog', 'mabp.app.workflow', '$stateParams',
        function ( dialog, service, $stateParams) {
            return {
                restrict: 'E',
                templateUrl: '/App/_shared/inform/ma-processor.directive.html',
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

                    vm.editActor = function (data) {
                        dialog.open(_shared.dialogs.actoruserSelect, { processorLinkedId: scope.processorLinkedId, processorNode: scope.processorNode, processor: data }).then(function (data) {
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
                        dialog.open(_shared.dialogs.actoruserSelect, { processorLinkedId: scope.processorLinkedId, processorNode: scope.processorNode }).then(function (data) {
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
                                var ac = vm.actorList;
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