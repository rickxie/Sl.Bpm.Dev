(function () {
    'use strict';
    var controllerId = "syspages.views.system.workflow";
    angular.module('app').controller(controllerId, [
        '$scope', '$rootScope', 'mabp.app.workflow', 'asdialog', 'dialog',  'mabp.app.enterpriseInfoSync', 'mabp.app.importExport', 'FileUploader',
        function ($scope, $rootScope, service, asdialog, dialog, syncServie, ieService, fileUploader) {
            CheckPermission("Menu_Sys_Workflow");
            var vm = this;
            //$rootScope.commandHtml = '<span class="btn btn-success" ng-click="vm.edit()">+创建流程</span>';
            vm.categories = [];
            vm.activeCategory = null;
            //创建分页对象
            vm.paging = _shared.initialPage(vm, 1, 100, 'Code', true);
            vm.load = function () {
                mabp.ui.setLoading('.workflow_content',
                //添加键值对参数
                service.getAllCategory(vm.paging).then(function (result) {
                    var data = result.model;
                    if (data == null || data.length === 0) {
                        mabp.notify.info(L("NoWorkflowCategoryYetPleaseCreateFirstly"));
                    }
                    vm.categories = data;
                    var curCate = vm.currentCategoryId != null ? vm.currentCategoryId : (vm.categories[0] && vm.categories[0].id);
                    if (vm.activeCategory == null) {
                        vm.activeCategory = curCate;
                    }
                }));
            }
            $scope.$watch('vm.activeCategory', function (newValue, oldValue) {
                newValue && vm.LoadWorkflow(newValue);
            });
            vm.LoadWorkflow = function (cateId) {
                vm.paging.pageSize = 100;
                vm.paging.filters = [{ name: 'CategoryId', value: cateId }];
                service.getAllWorkflow(vm.paging).then(function (result) {
                    vm.models = result.model;
                    vm.isLoaded = true;
                });
            }
            vm.edit = function (m) {
                asdialog.open(app.dialogs["workflowEdit"], { model: m, categories: vm.categories, currentCategoryId: vm.activeCategory }).then(function () {
                    vm.LoadWorkflow(vm.activeCategory);
                });
            }
            vm.design = function (m) {
                window.open("/Pages/Designer/#/{0}".fill(m.id));
            }
            vm.security = function (m) {
                dialog.open(app.dialogs["workflowSecurity"], m).then(function () {
                });

            }
            vm.variable = function (m) {
                dialog.open(app.dialogs["workflowVariable"], m).then(function () {
                });

            }

            vm.list = function () {
                dialog.open(app.dialogs["workflowList"]).then(function (result) {
                    vm.load();
                });
            };

            vm.getNew = function (i) {
                var ids = [];
                ids.push(i.id);
                if (ids.length > 0) {
                    syncServie.getSelectedWorkflows(ids).then(function (data) {
                        if (data) {
                            mabp.notify.success(L("SynchronizedSuccess"));
                            vm.load();
                        }
                    });
                }
            }

            vm.setInformTemplate = function (i) {
                asdialog.open(app.dialogs.workflowInformEdit, { data: i }).then(function (data) {
                    if (!!data) {
                    }
                });
            }

            vm.copyNew = function (i) {
                ieService.exportWorkflow(i, { responseType: 'blob' }).then(function () {
                    mabp.notify.success("OK");
                });
            }

            vm.import = function () {
                mabp.message.confirm("此功能仅提供给专业人士使用，因导入的数据在两端需一致，否则会造成一些无法意料的后果，请谨慎操作。确定导入吗？ ", "导入警告", function (result) {
                    if (result) {
                        angular.element("#fileinput").click();
                    }
                });
            }


            //附件
            vm.uploader = new fileUploader({
                url: '/FileApi/ImportExport/ImportWorkflow'
            });

            vm.uploader.onAfterAddingFile = function (fileItem) {
                if (vm.uploader.getNotUploadedItems().length) {
                    vm.uploader.uploadAll();
                }
            };

            vm.uploader.onSuccessItem = function (fileItem, response, status, headers) {
                vm.uploader.clearQueue();
                if (response.isSuccess) {
                    mabp.notify.success("导入成功");
                } else {
                    mabp.notify.success("导入失败");
                }
            };

            vm.uploader.onErrorItem = function (fileItem, response, status, headers) {
                vm.uploader.queue[vm.uploader.queue.length - 1].remove();
                console.log("导入失败");
                mabp.notify.warn("导入失败");
            };


            vm.load();
        }
    ]);
})();