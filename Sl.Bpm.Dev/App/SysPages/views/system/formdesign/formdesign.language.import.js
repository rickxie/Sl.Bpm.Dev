(function () {
    var controllerId = app.dialogs.define('formdesignLanguageImport', '/App/SysPages/views/system/formdesign/formdesign.language.import.html');
    app.controller(controllerId, ['$scope', 'params', '$stateParams', 'mabp.app.system',
        function ($scope, params, $stateParams, service) {
            var vm = this;
            vm.data = params;

            vm.import = function (data) {
                debugger;
                vm.models = [];
                vm.isValid = true;
                var models = data;
                _.forEach(models, function (val) {
                    val.isValid = true;
                    val.entityId = vm.data.id;
                    var rel = _.find(vm.models, { 'Key': val.Key });
                    if (!!rel) {
                        val.isValid = false;
                        val.validMsg = 'Key在同一页面不能重复;';
                    }

                    val.nameValues = [{ name: 'zh-CN', value: val.LangNameCN }, { name: 'en', value: val.LangNameEN }];

                    vm.models.push(val);
                });

                vm.isValid = _.every(vm.models, { 'isValid': true });
                $scope.$apply(vm.models);
            }

            vm.save = function () {
                var str = JSON.stringify(vm.models);
                service.importBpmLangs(str).then(function (data) {
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