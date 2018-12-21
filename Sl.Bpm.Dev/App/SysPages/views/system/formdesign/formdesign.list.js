(function () {
    var controllerId = app.dialogs.define('formdesignList', '/App/SysPages/views/system/formdesign/formdesign.list.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.enterpriseInfoSync', '$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.models = {};
            vm.paging = _shared.initialPage(vm, 0, 8, 'Id', false);
            vm.load = function () {
                service.getFormPageShowList(vm.paging).then(function (data) {
                    vm.models = data.model;
                    vm.paging.totalCount = data.totalCount;

                    //var pagedItems = [];

                    //for (var i = 0; i < vm.models.length; i++) {
                    //    var start = (vm.paging.currentPage - 1) * vm.paging.pageSize;
                    //    var end = start + vm.paging.pageSize;
                    //    if (i >= start && i < end) {
                    //        pagedItems.push(vm.models[i]);
                    //    }
                    //}
                    vm.pagedItems = vm.models;

                });
            }

            vm.load();

            vm.keyDown = function (event) {
                if (event.keyCode == 13) {
                    vm.paging.filters = [{ name: 'FileName', value: vm.filterText }];
                    vm.load();
                }
            }
            vm.getSelected = function () {
                var idsObj = _.filter(vm.pagedItems, 'checked');
                var ids = [];
                _.forEach(idsObj, function (value, key) {
                    ids.push(value.formPageId);
                });
                if (ids.length > 0) {
                    mabp.ui.setSaving('getSelected',
                    service.getSelectedFormPages(ids).then(function (data) {
                        if (data) {
                            mabp.notify.success(L("SynchronizedSuccess"));
                            vm.load();
                        }
                    }), L("GetChoosedForm"));
                }
            }

            vm.getAll = function () {
                mabp.ui.setSaving('getAll',
                service.getFormPages().then(function (data) {
                    if (data) {
                        mabp.notify.success(L("SynchronizedSuccess"));
                        vm.load();
                    }
                }), L("GetAllForm"));
            };
        }
    ]);

})();
