(function () {
    'use strict';
    var controllerId = "syspages.views.system.formdesign";
    angular.module('syspages').controller(controllerId, [
        '$scope', '$rootScope', 'mabp.app.bpm', 'asdialog', 'dialog', '$state', '$stateParams',
        'mabp.app.enterpriseInfoSync', 'treeTool',
        function ($scope, $rootScope, service, asdialog, dialog, $state, $stateParams, syncServie, treeTool) {
            CheckPermission("Menu_Sys_Page");
            var vm = this;

            vm.models = [];
            vm.selectedPageId = null;
            vm.rootPage = { id: null, text: L("MainPage") };//L("MainPage")
            vm.allGroups = [];

            vm.paging = _shared.initialPage(vm, 1, 12, "id", true);

            vm.load = function (isRefresh) {
                function loadData() {
                    return service.getAllForm().then(function (result) {
                        vm.pageArray = result;
                        vm.isLoaded = true;
                        //肯定只会有一个根节点
                        vm.allGroups = treeTool.toFormatTreeJson(_.filter(result, { isRoot: true }), vm.selectedPageId);
                        vm.loadPage(vm.selectedPageId);
                    });
                }
                if (isRefresh) {
                    mabp.ui.setLoading('.formdesign_edit', loadData());
                } else {
                    loadData();
                }
            }

            //加载树形结构图，左边的值被选中后触发 
            $scope.$watch('vm.selectedPageId', function (newvalue, oldvalue) {
                if (newvalue === oldvalue) return;
                $stateParams.parentPageId = vm.selectedPageId;
                vm.loadPage(newvalue, true, !!newvalue);
            });

            vm.loadPage = function (parentPageId, isRefresh, isDetail) {
                vm.paging.pushFilter({ name: 'parentPageId', value: parentPageId });
                function loadData() {
                    var paging = angular.extend({}, vm.paging);
                    if (!!isDetail) {
                        paging.currentPage = 1;
                    }
                    return service.getPagesByParentPageId(paging).then(function (result) {
                        vm.models = result.model;
                        vm.paging.totalCount = result.totalCount;
                    });
                }
                if (isRefresh) {
                    mabp.ui.setLoading('.formdesign_edit', loadData());
                } else {
                    loadData();
                }
            }

            vm.goToDetailPage = function (m) {
                vm.selectedPageId = m.id;
            }

            vm.load();

            vm.edit = function (m) {
                asdialog.open(app.dialogs["formdesignEdit"], m).then(function (result) {
                    if (result)
                        vm.load(true);
                });
            }

            vm.design = function (m) {
                window.open("/Pages/Designer/#/{0}".fill(m.id));
            }

            vm.designFixFormat = function (m) {
                dialog.open(app.dialogs.reportdesignFixFormat, m).then(function (result) {
                    if (result)
                        vm.load();
                });
            }

            vm.list = function () {
                dialog.open(app.dialogs.formdesignList).then(function () {
                    vm.load();
                });
            }

            vm.language= function(m) {
                asdialog.open(app.dialogs.formdesignLanguage, m).then(function() {
                    vm.load();
                });
            }

            vm.getNew = function (i) {
                var ids = [];
                ids.push(i.id);
                if (ids.length > 0) {
                    syncServie.getSelectedFormPages(ids).then(function (data) {
                        if (data) {
                            mabp.notify.success(L("SynchronizedSuccess"));
                            vm.load();
                        }
                    });
                }
            }

            vm.keyDown = function (event) {
                if (event.keyCode == 13) {
                    vm.select();
                }
            }

            vm.select = function() {
                vm.paging.pushFilter({ name: 'SearchText', value: vm.filterText });
                vm.paging.currentPage = 1;
                vm.load();
            }




        }
    ]);
})();