(function () {
    var controllerId = _shared.dialogs.define('dataImport', '/App/_shared_mobile/component/data/data.import.html');
    angular.module('app.shared').controller(controllerId, ['params', '$scope', 'FileUploader', 'mabp.app.file',
        function (params, $scope, fileUploader, service) {
            var vm = this;
            vm.data = {};
            vm.baseData = {};
            var configBase = params.base;
            vm.config = {};
            vm.config.base = {
                type: configBase.type || 2, //表类型 1：系统表，有实体 2：自定义表，无实体
                name: configBase.name, //表名
                beginRow: configBase.beginRow || 1, //起始行
                allowRowHeader: configBase.allowRowHeader === false ? false : true, //是否包含列名
                allowDuplication: configBase.allowDuplication || false, //是否允许重复
                displayAttachment: configBase.displayAttachment || false, //是否展示为附件
                template: "/AppPages/File/Template/" + configBase.template, //模板地址
                allowPaged: configBase.allowPaged === false ? false : true, //允许分页
                pageSize: configBase.pageSize || 10, //默认每页条数
                validateAll: configBase.validateAll === false ? false : true, //这个用来标识是否需要通过全部的基础验证才会返回数据，默认是
                buttonName: configBase.buttonName, //按钮名
                templateType: configBase.templateType, //导入模板的文件类型，默认允许.xls,.xlsx，此参数可以将类型限定为某一种
                validateFunc: function (dataReturn, data) { //用户自定义验证方法
                    if (configBase.validateFunc) {
                        configBase.validateFunc(dataReturn, data);
                    }
                },
                width: { 'width': (!!configBase.width ? configBase.width : '100%') }
            };
            vm.config.columns = params.columns;
            vm.paging = _shared.initialPage(vm, 1, vm.config.base.pageSize, "Id", false);
            vm.paging.totalCount = 1;

            vm.load = function () {
                service.checkBaseConfig({ ConfigBase: vm.config.base, ConfigColumns: vm.config.columns }).then(function (result) {
                    if (!!result) {
                        vm.config.columns = result.configColumns;
                        var checkVal = _.find(vm.config.columns, function (val) {
                            return val.validate.checked === false;
                        });
                        if (!!checkVal) {
                            vm.validateArrs = _.filter(vm.config.columns, function (val) {
                                return !val.validate.message === false;
                            });
                            vm.validateMsg = _.map(vm.validateArrs, function (val) {
                                if (!!val.validate.message) {
                                    return val.columnName + "列对应的字段名" + val.columnSource + "出错：" + val.validate.message;
                                }
                            });
                        }
                    }
                });
            }
            vm.load();

            vm.uploadBefore = function () {
                angular.element("#fileinput").click();
            }

            vm.validate = function () {
                if (vm.baseChecked) {
                    service.checkColumnConfig({ ConfigBase: vm.config.base, ConfigColumns: vm.config.columns, Data: vm.baseData, FileModel: vm.data.fileModel }).then(function (result) {
                        if (!!result) {
                            vm.data = result;
                            vm.validateFunc();//用户自定义验证
                            for (var i = 0; i < vm.data.data.length; i++) {
                                var val = vm.data.data[i];
                                val._ValidateError = JSON.parse(val._ValidateError);
                                val._ValidateWarning = JSON.parse(val._ValidateWarning);
                                val._ValidateError.Message = vm.data.dataReturn[i]._ValidateError;
                                val._ValidateWarning.Message = vm.data.dataReturn[i]._ValidateWarning;
                            }
                            vm.paging.currentPage = 1;
                            if (vm.config.base.validateAll) {
                                vm.isValid = _.every(vm.data.data, function (val) {
                                    return !val._ValidateError.Message === true;
                                });
                            } else {
                                vm.isValid = true;
                            }
                            vm.pageData();
                        }
                    });
                }
            }

            vm.validateFunc = function () {
                vm.config.base.validateFunc(vm.data.dataReturn, vm.data.data);
            }

            vm.pre = function (data) {
                service.prepareAdvanceImportData({ ConfigBase: vm.config.base, ConfigColumns: vm.config.columns, FilePath: data.FilePath, FileModel: data.FileModel }).then(function (result) {
                    if (!!result) {
                        vm.baseData = result.data;
                        vm.data = result;
                        vm.paging.currentPage = 1;
                        vm.isValid = false;
                        vm.baseChecked = true;
                        vm.pageData();
                        vm.validate();
                    }
                });
            }

            vm.pageData = function () {
                if (vm.config.base.allowPaged) {
                    var temp = vm.data.data;
                    vm.paging.totalCount = temp.length;
                    var datas = [];
                    var dataStartNum = (vm.paging.currentPage - 1) * vm.paging.pageSize;
                    var dataEndNum = vm.paging.currentPage * vm.paging.pageSize;
                    if (dataEndNum > temp.length) dataEndNum = temp.length;
                    for (var i = dataStartNum; i < dataEndNum; i++) {
                        datas.push(temp[i]);
                    }
                    vm.currentData = datas;
                } else {
                    vm.currentData = vm.baseData;
                }
            }

            vm.save = function () {
                $scope.$close(vm.data);
            }

            //附件
            vm.uploader = new fileUploader({
                url: '/File/AdvanceFileUpload'
            });
            // 文件类型 xls xlsx
            vm.uploader.filters.push({
                name: 'customFilter',
                fn: function (item, options) {
                    if (item.name.indexOf('.xls') > 0 || item.name.indexOf('.xlsx') > 0) {
                        return true;
                    } else {
                        mabp.notify.warn("不支持的文件类型，请上传xls或者xlsx文件。");
                        return false;
                    }
                }
            });

            vm.uploader.onAfterAddingFile = function (fileItem) {
                if (vm.uploader.getNotUploadedItems().length) {
                    vm.uploader.uploadAll();
                }
            };

            vm.uploader.onSuccessItem = function (fileItem, response, status, headers) {
                vm.uploader.clearQueue();
                var statuss = response.IsSuccess;
                if (statuss) {
                    vm.pre(response);
                }
            };

            vm.uploader.onErrorItem = function (fileItem, response, status, headers) {
                vm.uploader.queue[vm.uploader.queue.length - 1].remove();
                console.log("Excel导入失败");
                mabp.notify.warn("Excel导入失败");
            };
        }
    ]);
})();