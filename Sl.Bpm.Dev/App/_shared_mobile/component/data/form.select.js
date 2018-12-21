(function () {
    var controllerId = _shared.dialogs.define('formSelect', '/App/_shared_mobile/component/data/form.select.html');
    angular.module('app.shared').controller(controllerId, ['fmTool', 'params', '$scope', 'dialog', 'mabp.app.module', '$timeout','formHelper','$q',
        function (fmTool, params, $scope, dialog, service, $timeout, formHelper,$q) {
            //console.log("formSelect", params);
            
            var vm = this;
            vm.isShowMobileTitle = function (isShow) {
                console.log("isShowMobileTitle", isShow);
                formHelper.postMessage.call(parent, 'isShowMobileTitle', isShow);
            }
            vm.backAction = function (evt) {
                console.log(evt.data);
                switch (evt.data.message) {
                    case "mobileHardwareBackBtnClick": {//Android手机点击了返回键
                        vm.save().then(function () {
                            window.removeEventListener('message', vm.backAction);
                        });
                        break;
                    }
                }
            }
            window.addEventListener('message', vm.backAction);
            vm.isShowMobileTitle(false);
            vm.tableGuid = _$.getGUID();
            vm.formGuid = _$.getGUID();
            vm.params = params;
            vm.size = params.size;
            vm.model = {};
            vm.selectedData = [];
            vm.valueMember = params.valueMember;
            vm.fmModel = params.selectData || "";
            vm.pageSizeList = [10, 20, 50, 100];
            vm.paging = _shared.initialPage(vm, 1, 10, '', false);
            vm.paging.orderByProperty = '';
            vm.hasSearch = false; //是否需要启用配置过滤条件
            vm.ismulti = params.ismulti != "false" && params.ismulti ? true : false;
            vm.data = []; //所有数据， 若已经是分页后的View 则为当页数据。
            vm.pagedData = [];  //当页数据
            vm.loaded = false; //判断是否为第一次加载
            vm.selectId = "";
            //生成Datatable
            var buildTable = function (col, rows) {
                var g = new mcGrid();
                var gridConfig = {
                    checkable: vm.ismulti,
                    sortable: false,
                    //tableWidth: '788',
                    isSingleRowSelected: !vm.ismulti,
                    isCheckedByRow: true,
                    orderBy: vm.paging.orderByProperty,
                    ascending: vm.paging.ascending
                };

                //col = _.map(col, function (c) { return _.assign({}, c, { width: (gridConfig.tableWidth/col.length)+"px"})})
                //console.log("buildTable", col);
                if (!!vm.fmModel) {
                    var ms = vm.fmModel.split(",");
                    //console.log("buildTable",vm.fmModel,ms);
                    for (var i = 0; i < ms.length; i++) {
                        var isHaveRow = _.find(rows, { id: ms[i] });
                        if (!!isHaveRow) {
                            isHaveRow.$$checked = true;
                            var isHave = _.findIndex(vm.selectedData, { id: ms[i] }) > -1;
                            if (!isHave) {
                                vm.selectedData.push(isHaveRow);
                            } else {
                                _.remove(vm.selectedData, { id: ms[i] });
                                vm.selectedData.push(isHaveRow);
                            }
                        } else {
                            var isHaveData = _.findIndex(vm.selectedData, { id: ms[i] }) > -1;
                            if (!isHaveData) {
                                //vm.selectedData.push({ id: ms[i] });
                                vm.selectId += ms[i] + ",";
                            }
                        }
                    }
                    if (!!vm.selectId) {
                        //console.log("selectId", vm.selectId);
                        service.getChooseTable({
                            code: vm.params.datacode,
                            filters: mabp.toArray(vm.params.filter),
                            allColumnFilter: true,
                            tableFilters: mabp.toArray(vm.tableFilters),
                            pageInput: vm.paging,
                            multiId: vm.selectId
                        }).then(function (data) {
                            _.forEach(data.viewTable, function (t) {
                                if (_.findIndex(vm.selectedData, { id: t.id })== -1) {
                                 vm.selectedData.push(t);
                                }
                            });
                        });
                    }
                }

                
                g.InitGrid(vm.tableGuid, gridConfig, col, rows);
                //日期类型正则匹配
                var reg = /^\d{4}-\d{2}-\d{2}[T]([01]?\d|2[0-3]):[0-5]?\d:[0-5]?\d.\d?\d?\d?$/;
                g.on('TdInitialize', function (event) {
                    event.dom.addClass(event.col.name);
                    event.dom.id = event.row.id;
                    if (reg.test(event.dom.innerHTML)) {
                        event.dom.innerHTML = moment(event.dom.innerHTML).format("YYYY-MM-DD");
                    }
                });

                g.on('RowChecked', function (data, oldData) {
                    //console.log("on('RowChecked'",data,oldData);
                    if (vm.ismulti && !!data) {
                        if (oldData instanceof Array) {
                            _.forEach(oldData, function (o) {
                                if (o.$$checked == false) {
                                    _.remove(vm.selectedData, { id: o.id });
                                }
                            });
                        } else {
                            if (oldData.$$checked == false) {
                                _.remove(vm.selectedData, { id: oldData.id });
                            }
                        }

                        _.forEach(data, function (dd) {
                            var isHave = _.findIndex(vm.selectedData, { id: dd.id }) > -1;
                            if (!isHave) {
                                vm.selectedData.push(dd);
                            }
                        });
                    } else {
                        vm.selectedData = data;
                    }
                    var a = _.map(vm.selectedData, 'id');
                    vm.fmModel = (a != null && a.join(','));
                    $scope.$apply();
                });
            }
            //过滤数据并生成分页数据
            var filteredDataAndRenderTable = function (data, func, cols) {
                var filteredData = _.filter(data, function (item) {
                    return func(item);
                });
                vm.paging.totalPage = Math.ceil(filteredData.length / vm.paging.pageSize);
                vm.paging.totalCount = filteredData.length;
                //第二次加载
                vm.pagedData = _$.pagingTake(filteredData, vm.paging.currentPage, vm.paging.pageSize);
                buildTable(cols, vm.pagedData);
            }
            //加载数据
            vm.load = function (isSearch) {
                if (!params.data) {
                    //从视图获取
                    if (params.datatype === 'view') {
                        if (isSearch != undefined) {
                            vm.collectCondition();
                        } else {
                            vm.tableFilters = params.defaultfilter;
                        }
                        var paramsfilters = mabp.toArray(vm.params.filter);
                        if (!vm.hasSearch) {
                            vm.paging.filters = [{ name: 'filterText', value: vm.selectTxt }, { name: 'viewTable', value: params.datacode }];
                        }
                        mabp.ui.setLoading('#' + vm.formGuid,
                        service.getViewTable({ code: vm.params.datacode, filters: paramsfilters, allColumnFilter: true, tableFilters: mabp.toArray(vm.tableFilters), pageInput: vm.paging }).then(function (data) {
                            var col = _.map(data.displayColumList, function (item) {
                                return {
                                    name: item.displayColumn.lowerFirst(), text: item.name, visible: item.isDisplayEnable
                                };
                            });
                            vm.data = data.viewTable;
                            if (!isSearch) {
                                vm.displayColumList = data.displayColumList;
                                var tableFiltersList = mabp.toArray(vm.tableFilters);
                                _.forEach(data.displayColumListAll, function (d) {
                                    _.forEach(tableFiltersList,
                                        function(t) {
                                            if (d.displayColumn == t.name) {
                                                d.value = t.value;
                                            } else {
                                                d.value = "";
                                            }
                                        });
                                });
                                vm.displayColumListAll = data.displayColumListAll;
                            }
                            vm.title = data.viewName;
                            //生成Table
                            buildTable(col, vm.data);
                            vm.hasSearch = _.some(data.displayColumListAll, { isWhereEnable: true });

                            $timeout(function () {
                                vm.paging.totalPage = Math.ceil(data.totalCount / vm.paging.pageSize);
                                vm.paging.totalCount = data.totalCount;
                            });

                        }));
                    }
                        //获取代理申请人
                    else if (params.datatype === 'service') {
                        vm.collectCondition();
                        var cols = [{ name: 'groupJobName', text: '岗位', visible: true }, { name: 'name', text: '人员', visible: true }];
                        //第一次加载
                        if (!vm.loaded) {
                            mabp.ui.setLoading('#' + vm.formGuid,
                            service.getMySubbmitterAgent(vm.params).then(function (data) {
                                vm.title = "选择申请人";
                                vm.valueMember = 'id';
                                /*给table设置Id*/
                                //for (var i = 0; i < data.length; i++) {
                                //    data[i].id = i.toString();
                                //}
                                //若不存在Id 则生成Id
                                _.forEach(data, function (item) {
                                    if (!item.id) {
                                        item.id = _$.getGUID();
                                    }
                                });
                                vm.data = data;
                                filteredDataAndRenderTable(vm.data, function (item) {
                                    var filteredTxt = vm.selectTxt || '';
                                    return item['name'].indexOf(filteredTxt) > -1 || item['groupJobName'].indexOf(filteredTxt) > -1;
                                }, cols);
                                vm.loaded = true;
                        }));;
                        } else {
                            filteredDataAndRenderTable(vm.data, function (item) {
                                var filteredTxt = vm.selectTxt || '';
                                return item['name'].indexOf(filteredTxt) > -1 || item['groupJobName'].indexOf(filteredTxt) > -1;
                            }, cols);
                        }
                    }
                }
                    //自定义数据展示搜索
                else if (params.datatype === 'source') {
                    //拼接自定义配置的列
                    var gridCols = [];
                    // { name: '展示文本'}
                    for (var col in params.column) {
                        gridCols.push({ name: col, text: params.column[col] });
                    };

                    if (!vm.loaded) {
                        vm.data = params.data;
                        vm.title = vm.params.title;
                        //若不存在Id 则生成Id
                        _.forEach(vm.data, function (item) {
                            if (!item.id) {
                                item.id = _$.getGUID();
                            }
                        });
                        filteredDataAndRenderTable(vm.data, function (item) {
                            var filteredTxt = vm.selectTxt || '';
                            var meetRequirement = false;
                            for (var col in params.column) {
                                if (item[col].indexOf(filteredTxt) > -1)
                                    meetRequirement = true;
                            };
                            return meetRequirement;
                        }, gridCols);
                        vm.loaded = true;
                    } else {
                        //第二次加载
                        filteredDataAndRenderTable(vm.data, function (item) {
                            var filteredTxt = vm.selectTxt || '';
                            var meetRequirement = false;
                            for (var col in params.column) {
                                if (item[col].indexOf(filteredTxt) > -1)
                                    meetRequirement = true;
                            };
                            return meetRequirement;
                        }, gridCols);
                    }
                }
            }

            //初次打开加载数据
            $timeout(function () {
                vm.load();
            });

            //跳转页面
            vm.changePage = function (pageNum) {
                vm.paging.currentPage = pageNum;
                document.getElementById("txt_changePage").value = pageNum;
                vm.load(true);
                return false;
            }

            //跳转到
            vm.changePages = function () {
                vm.paging.currentPage = Number(document.getElementById("txt_changePage").value);
                vm.load(true);
                return false;
            }
            vm.event_Keyup = function (event) {
                document.getElementById("txt_changePage").value = vm.NumberOnly(document.getElementById("txt_changePage"));
                if (event.keyCode == 13) {
                    vm.changePages();
                }
            }
            vm.NumberOnly = function (obj) {
                var val = obj.value.replace(/,/g, '');
                if ('' != val.replace(/\d/g, '')) {
                    val = val.replace(/\D/g, '');
                }
                return val;
            }

            //每页条数发生变化
            //选择每页展示条数时 刷新数据列表
            $scope.$watch('vm.paging.pageSize', function (newV, oldV) {
                vm.paging.currentPage = 1;
                vm.loaded = false;
                if (newV != null && newV != oldV) {
                    vm.load(true);
                }
            });

            vm.remove = function (item) {
                _.remove(vm.selectedData, { id: item.id });
                var ms = vm.fmModel.split(",");
                _.remove(ms, function (d) {
                    return d == item.id;
                });
                vm.fmModel = ms.join(',');
                vm.load();
                return false;
            }

            //保存数据
            vm.save = function () {
                var deferred = $q.defer();
                vm.isShowMobileTitle(true);
                if (vm.selectedData == null || vm.selectedData.length == 0) {
                    mabp.message.confirm("您没有选中数据, 确认关闭", "提示", function (confirmed) {
                        if (confirmed) {
                            $scope.$close();
                            deferred.resolve();
                        }
                    });
                } else {
                    deferred.resolve();
                    //if (!vm.ismulti && vm.selectedData.length>1){
                    //    vm.selectedData = vm.selectedData[0];
                    //}
                    console.log("selectedData", vm.selectedData);
                    $scope.$close({ items: vm.selectedData, selectItem: vm.fmModel, defaultFilter: vm.tableFilters });
                }
                return deferred.promise;
            };
            //回车搜索
            vm.event_Keydown = function (event) {
                if (event.keyCode == 13) {
                    vm.searchData();
                }
            }
            //单个搜索框
            vm.searchData = function () {
                vm.paging.currentPage = 1;
                vm.load(true);
            }
            //点击搜索 加载数据
            vm.searchCondition = function () {
                vm.paging.currentPage = 1;
                vm.load(true);
            }
            //清空筛选值
            vm.clearCondition = function () {
                var conList = document.querySelectorAll(".search-condition [name]");
                for (var i = 0; i < conList.length; i++) {
                    conList[i].value = "";
                }
            }
            //收集过滤条件 视图全局搜索
            vm.collectCondition = function () {
                var conditionList = {};
                var conList = document.querySelectorAll(".search-condition [name]");
                for (var i = 0; i < conList.length; i++) {
                    if (!!conList[i].value) {
                        conditionList[conList[i].getAttribute("name")] = conList[i].value;
                    }
                }
                vm.tableFilters = conditionList;
            }
        }
    ]);
})();