(function () {
    var controllerId = app.dialogs.define('formdesignLanguage', '/App/SysPages/views/system/formdesign/formdesign.language.html');
    app.controller(controllerId, ['$scope', '$stateParams', 'mabp.app.system', 'dialog', 'mabp.app.bpm','$state',
        function ($scope, $stateParams, sysService, dialog, service, $state) {
            var vm = $scope.vm = this;
            var id = $stateParams.id;


            $scope.reload = function () {
                $state.go("appPageLang", { id: id }, { reload: true });
            };
            
            service.getPageOfId({ id: id }).then(function (data) {
                vm.data = data;
                vm.load();
            })
          
            vm.languages = {};
            vm.load = function () {
                sysService.getAllLanguage(vm.data.id).then(function (data) {
                    vm.languages = _.sortBy(data, ['name']);
                    vm.newColumn = {
                        key: '',
                        value: ''
                    }
                });

                sysService.getAllEntityLanguages({ id: vm.data.id }).then(function (data) {
                    vm.model = _.sortBy(data, function (o) {
                        var a = _.sortBy(o.nameValues, ['name']);
                        return o.nameValues = mabp.toObject(a);
                    });
                });

            }

         

            vm.save = function (m) {
                m.entityId = vm.data.id;
                m.Key = m.key;
                m.nameValues = mabp.toArray(m.langValue);;

                sysService.insertLanguage(m).then(function () {
                    vm.load();
                }, function () {
                    vm.load();
                });
            }

            vm.edit = function (m) {
                m.entityId = vm.data.id;
                m.Key = m.key;
                m.nameValues = mabp.toArray(m.nameValues);
                sysService.editLanguage(m).then(function () {
                    vm.load();
                }, function () {
                    vm.load();
                });

            }

            vm.delete = function (m) {
                m.entityId = vm.data.id;
                m.Key = m.key;
                m.nameValues = mabp.toArray(m.nameValues);
                sysService.deleteLanguage(m).then(function () {
                    vm.load();
                }, function () {
                    vm.load();
                });
            }

            vm.import = function () {
                dialog.open(app.dialogs.formdesignLanguageImport, vm.data).then(function (data) {
                    if (!!data) {
                        vm.load();
                    }
                });
            }

        }
    ]);
})();