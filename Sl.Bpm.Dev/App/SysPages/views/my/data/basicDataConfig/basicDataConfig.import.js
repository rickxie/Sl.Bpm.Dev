(function () {
    'use strict';
    var controllerId = app.dialogs.define('basicDataConfigImport', '/App/SysPages/views/my/data/basicDataConfig/basicDataConfig.import.html');
    angular.module('app').controller(controllerId, [
        '$scope', 'mabp.app.system', 'params',
        function ($scope, service, params) {
            var vm = this;
            vm.data = params || {};

            vm.import= function(data) {
                vm.models = [];
                vm.isValid = true;
                var models = data;
                _.forEach(models, function (val) {
                    val.isValid = true;
                    val.parentId = vm.data.parentId;
                    var rel = _.find(vm.models, { 'Value': val.Value });
                    if (!!rel) {
                        val.isValid = false;
                        val.validMsg = 'Code不能重复;';
                    }

                    val.isDisabled = !!(val.Disabled === "是");
                    val.LangNameList = [{ name: 'zh-CN', value: val.LangNameCN }, { name: 'en', value: val.LangNameEN }];

                    vm.models.push(val);
                });

                vm.isValid = _.every(vm.models, { 'isValid': true });
                $scope.$apply(vm.models);
            }

            vm.save = function () {
                var str = JSON.stringify(vm.models);
                service.importBasicDataConfig(str).then(function (data) {
                    if (!!data) {
                        $scope.$close(true);
                    }
                }, function () {
                    //
                });
            }

        }
    ]);
})();