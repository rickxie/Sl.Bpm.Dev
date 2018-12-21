(function () {
    'use strict';
    var controllerId = "syspages.views.my.func";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'asdialog', 'mabp.app.module', '$state', 'moduleHandler', 'appSession',
        function ($scope, asdialog, service, $state, module, session) {
            CheckPermission("Menu_My_Report");
            var vm = this;
            vm.load = function () {
                mabp.ui.setLoading('.data_load',
                    service.getAllPagesEntries(4).then(function (result) {
                        for (var i = 0; i < result.length; i++) {
                            switch (i % 6) {
                                case 0:
                                    result[i].icon = "icon icon-user";
                                    break;
                                case 1:
                                    result[i].icon = "icon icon-group";
                                    break;
                                case 2:
                                    result[i].icon = "icon icon-list-alt";
                                    break;
                                case 3:
                                    result[i].icon = "icon icon-github";
                                    break;
                                case 4:
                                    result[i].icon = "icon icon-carousel";
                                    break;
                                case 5:
                                    result[i].icon = "icon icon-magic";
                                    break;
                                default:

                            }
                        }
                        vm.pages = result;
                    }));
            }

            vm.setFavourite = function (m, event) {
                module.setFavourite(m, event);
            }

            vm.openModule = function (m) {
                var tempwindow = window.open();
                tempwindow.location = '/page/' + m.fileName;
            }


            vm.load();
        }
    ]);
})();