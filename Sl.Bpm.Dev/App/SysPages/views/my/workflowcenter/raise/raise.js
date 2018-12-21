(function () {
    'use strict';
    var controllerId = "syspages.views.my.workflowcenter.raise";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'mabp.app.module', 'moduleHandler', 'mabp.app.workflow', 'mabp.app.bpm', 'appSession',
        function ($scope, service, module, wfservice, bpmService, session) {
            var vm = this;
            vm.categories = [];
            vm.allmodules = [];

            vm.load = function () {
                //mabp.ui.setLoading('.data_load',
                //添加键值对参数
                service.getAllPagesEntries(3).then(function (result) {
                    var list = [];
                    for (var i = 0; i < result.length; i++) {
                        var item = $.grep(list, function (it) {
                            return it.categoryName == result[i].categoryName;
                        })
                        if (item.length > 0) {
                            item[0].data.push(result[i]);
                        }
                        else {
							list.push({ categoryName: result[i].categoryName, data: [result[i]], idx: result[i].categoryMenuIndex});
                        }
					}
					list.sort(function (a, b) {
						return a.idx - b.idx;
					});

					angular.forEach(list, function (group) {
						group.visibleLength = 0;
						angular.forEach(group.data, function (item) {
							item.visible = !!$currentUserPermissions[item.menuId];
							if (item.visible) {
								group.visibleLength++;
							}
						});
					});

                    vm.pages = list;
                    var showlist = $.grep(vm.pages, function (item) {
                        return item.visibleLength > 0;
                    })
                    vm.classname = showlist.length > 4 ? "" : "float-layout";
                    
                });


            }

            vm.setFavourite = function (m, event) {
				m.id = m.fId;
                module.setFavourite(m, event);
            }

            vm.load();

            vm.openModule = function (m) {
                mabp.ui.setBusying('.raise_block',
                    module.open(m).then(function (result) {
                        //if (result)
                        //    vm.load(true);
                    }));
            }
			vm.fold = false;
			vm.toogleFold = function () {
				vm.fold = !vm.fold;

				angular.forEach(vm.pages, function (item) {
					item.fold = vm.fold;
				});
			};
        }
    ]);
})();