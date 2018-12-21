(function () {
    var controllerId = _shared.dialogs.define('jobLevelDialog', '/App/_shared/component/joblevel/joblevel.dialog.html');
    angular.module('app.shared').controller(controllerId, [
        'params', '$scope', 'mabp.app.system', '$stateParams',
        function (params, $scope, service, $stateParams) {
            var vm = this;
            vm.data = $scope || {};
            vm.model = [];
            vm.ismulti = params.ismulti;
            
            //数据Load 处理
            vm.beforeShow = function () {
                var param = {
                    filters: [
                    { name: "EnterpriseId", value: $stateParams.enterpriseId },
                    { name: "Enum", value: "JobLevel" }
                    ]
                }

                service.getAllEnumsByName(param).then(function (result) {
                    vm.model = result;
                    if (params.value) {
                        for (var i = 0; i < vm.model.length; i++) {
                            if (params.value.split(",").indexOf(vm.model[i].value) > -1)
                                vm.model[i].selected = true;
                        }
                    }
                });
            }

            vm.selectItem = function (item) {
                if (!vm.ismulti) {
                    for (var i = 0; i < vm.model.length; i++) {
                        vm.model[i].selected = false;
                    }
                    item.selected = !item.selected;
                    vm.save();
                } else {
                    item.selected = !item.selected;
                }
            }

            //一级弹窗保存
            vm.save = function () {
                var name = [], value = [];
                var arr = [];
                for (var i = 0; i < vm.model.length; i++) {
                    if (vm.model[i].selected) {
                        arr.push({ id: vm.model[i].value, text: vm.model[i].name });
                    }
                }
                $scope.$close(arr);
            };

            vm.cancel = function () {
                $scope.$close();
            };

            vm.beforeShow();
        }
    ]);
})();