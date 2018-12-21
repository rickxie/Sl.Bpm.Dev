_shared
    /*数据table*/
    .directive('fmTable', [
        'mabp.app.module', 'mabp.app.file', 'fmTool', '$timeout', function (service, fileSv, fmTool, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                template: function (elem, attr) {
                    return '<div>' +
                        '<div class="col-xs-12"><button class="btn btn-info btn-sm" ng-if="allColumnFilter && hasSearch" ng-click="show()">' + L("QueryCriteria") + '</button></div>' +
                        '<div class="panel-heading" ng-if="!!show1 && !!allColumnFilter && !!displayColumListAll">' +
                        '<div class="row search-condition">' +
                        '<div class="col-xs-3" ng-repeat="col in displayColumListAll" ng-show="col.isWhereEnable">' +
                        '<div class="input-group" style="margin-bottom:5px;">' +
                        '<span class="input-group-addon input-sm">{{col.name}}</span>' +
                        '<input name="{{col.displayColumn}}" type="text" class="form-control input-sm" placeholder="" ng-enter="filterData()" />' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-xs-6">' +
                        '<input type="button" value="' + L("Search") + '" class="btn btn-block btn-info btn-md" style="padding: 1px 5px;" ng-click="filterData()" />' +
                        '</div>' +
                        '<div class="col-xs-6">' +
                        '<input type="button" value="' + L("Clear") + '" class="btn btn-block btn-default btn-md" style="padding: 1px 5px;" ng-click="clearCondition()" />' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div id="{{guid}}" class="col-xs-12" style="height:380px;width:100%;">' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class=" col-xs-12">' +
                        '<div class="col-xs-4" style="text-align:left;" >' +
                        '<button id="{{item.id}}" ng-if="item.enable" ng-repeat="item in actionButtons | orderBy : ' + "'displayOrder'" + '" class="btn btn-info btn-sm" ng-click="item.action(selectItems)" style="margin:0 3px;">{{item.text}}</button>' +
                        //'<button ng-if="isExcel || isMergeExcel" class="btn btn-info btn-sm" ng-click="exportExcel()">{{language.Export}}</button>' +
                        //'<button ng-if="zip" class="btn btn-info btn-sm" ng-click="exportZip()" style="margin:0 3px;">{{language.Attachment}}</button>' +
                        //'<button ng-if="pdf" class="btn btn-info btn-sm" ng-click="exportPdf()">PDF</button>' +
                        '</div>' +

                        '<div ng-if="pageSizeList && (isExcel || isMergeExcel)" class="col-xs-2">&nbsp;</div>' +
                        //'<div ng-if="!pageSizeList && isExcel" class="col-xs-5">&nbsp;</div>' +
                        //'<div ng-if="pageSizeList && !isExcel" class="col-xs-5">&nbsp;</div>' +
                        //'<div ng-if="!pageSizeList && !isExcel" class="col-xs-6">&nbsp;</div>' +
                        '<ma-pager load="load(true)" current-page="paging.currentPage" total-count="paging.totalCount" page-size="paging.pageSize"></list-pager>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                },
                scope: {
                    view: '=',
                    data: '=',
                    filter: '=',
                    refreshData: '=',
                    selectItems: '=',
                    guid: '=',
                    currentPageData: '=',
                    excel: '&',
                    sumColumns: '=',
                    zip: '&',
                    addButtons: '=',
                    colConfig: '='
                },
                link: function (scope, element, attr, ctrl) {
                    var reg = /^\d{4}-\d{2}-\d{2}[T]([01]?\d|2[0-3]):[0-5]?\d:[0-5]?\d.\d?\d?\d?$/;
                    scope.moduleId = (scope.$parent != null && scope.$parent.base != null) ? scope.$parent.base.moduleId : null;
                    /*分页*/
                    scope.language = mabp.language;
                    scope.showPages = [];
                    scope.currentPageIndex = 0;
                    scope.currentPageData = [];
                    scope.pageNum = 0;
                    scope.pageSize = 10;
                    scope.selectItems = [];
                    scope.refresh = false;
                    scope.guid = _$.getGUID(true);
                    scope.column = [];
                    scope.columnText = [];
                    scope.isExcel = null;
                    scope.isMergeExcel = null;
                    scope.zip = false;
                    scope.page = null;
                    scope.paging = {};
                    scope.paging.totalCount = 0;
                    scope.checkbox = false;
                    scope.radiobox = false;
                    scope.sortable = false;
                    scope.pageSizeList = null;
                    scope.isAllChecked = false;
                    scope.allColumnFilter = true;
                    scope.pdf = false;
                    scope.show1 = false;
                    //各种属性判断
                    //是否需要导出Excel
                    (scope.excel || attr.excel !== undefined) && (scope.isExcel = true);
                    //是否合并Excel
                    (attr.enableMerge === '') && (scope.isMergeExcel = true);
                    //Zip
                    (scope.zip || attr.zip !== undefined) && (scope.zip = true);
                    (attr.fixHeaderRow === '') && (scope.fixedHeaderRow = true);
                    (attr.singleRowSelect === '') && (scope.singleRowSelect = true);
                    (attr.checkedByRow === '') && (scope.checkedByRow = true);

                    //是否需要真分页和排序
                    if (scope.page || attr.page !== undefined) {
                        scope.page = true;
                        if (!!attr.page) {
                            scope.paging = JSON.parse(attr.page);
                            scope.paging.totalCount = 1;
                            scope.toPage = scope.paging.currentPage;
                        }
                    }
                    //是否需要选择列 多选
                    (attr.checkable == '') && (scope.checkbox = true);
                    //是否需要选择列 单选
                    (attr.radiobox == '') && (scope.radiobox = true);
                    //是否需要列自定义排序
                    (attr.sortable == '') && (scope.sortable = true);
                    //是否需要每页条数切换
                    (attr.pageSizeList !== undefined) && (scope.pageSizeList = [10, 20, 50, 100]);
                    //是否让每个字段都参与过滤 默认加上该功能，剩下的只需要配置
                    //(scope.allColumnFilter || attr.allColumnFilter !== undefined) && (scope.allColumnFilter = true);

                    //是否需要pdf导出
                    (attr.pdf == '' || !!attr.pdfLanguages) && (scope.pdf = true);
                    var exportId = _$.getGUID(true);
                    var attachId = _$.getGUID(true);
                    var pdfId = _$.getGUID(true);
                    //按钮组
                    scope.actionButtons = [
                        { id: exportId, text: mabp.L("Export"), action: function () { scope.exportExcel(exportId) }, enable: scope.isExcel || scope.isMergeExcel, displayOrder: 1 },
                        { id: attachId, text: mabp.L("Attachment"), action: function () { scope.exportZip(attachId) }, enable: scope.zip, displayOrder: 2 },
                        { id: pdfId, text: "PDF", action: function () { scope.exportPdf(pdfId) }, enable: scope.pdf, displayOrder: 3 }
                    ];

                    scope.$watch('addButtons', function (newValue, oldValue) {
                        _.filter(scope.addButtons, function (data) {
                            scope.actionButtons.push(data);
                        });
                    }, true);




                    scope.load = function (isRefresh) {
                        if (!!attr.view) {
                            scope.condition();
                            if (scope.page) {
                                service.getViewTable({ code: attr.view, filters: mabp.toArray(scope.filter), allColumnFilter: true, tableFilters: mabp.toArray(scope.tableFilters), pageInput: scope.paging, permissionKey: scope.moduleId }).then(function (data) {
                                    var col = _.map(data.displayColumList, function (item) { return { name: _.camelCase(item.displayColumn), text: item.name, visible: item.isDisplayEnable }; });
                                    //配置列
                                    if (scope.colConfig != null) {
                                        //默认设置
                                        var defConfig = scope.colConfig["*"] || {};
                                        _.forEach(col, function (item) {
                                            var colCfg = scope.colConfig[item.name];
                                            //应用默认设置
                                            var newCfg = angular.extend(defConfig, colCfg);
                                            for (var cfg in newCfg) {
                                                if (newCfg.hasOwnProperty(cfg)) {
                                                    item[cfg] = newCfg[cfg];
                                                }
                                            }
                                        });
                                    }
                                    var rowData = data.viewTable;

                                    var g = new mcGrid();
                                    var gridConfig = {
                                        checkable: scope.checkbox,
                                        sortable: scope.sortable,
                                        isSingleRowSelected: scope.singleRowSelect,
                                        isCheckedByRow: scope.checkedByRow,
                                        width: attr.width,
                                        orderBy: scope.paging.orderByProperty,
                                        ascending: scope.paging.ascending
                                    };
                                    //行列固定， 列固定 行必定固定
                                    if (scope.isMergeExcel) {
                                        gridConfig.mergeColumnMainIndex = attr.mergeNum | 0;
                                        gridConfig.mergeColumns = attr.mergeColumns != null && attr.mergeColumns.split(',');
                                    }
                                    //组织是否固定标题
                                    if (scope.fixedHeaderRow) {
                                        gridConfig.fixHeaderRow = true;
                                        gridConfig.fixColumnNum = attr.fixColumnNum;
                                    }
                                    g.InitGrid(scope.guid, gridConfig, col, rowData);
                                    var reg = /^\d{4}-\d{2}-\d{2}[T]([01]?\d|2[0-3]):[0-5]?\d:[0-5]?\d.\d?\d?\d?$/;
                                    g.on('TdInitialize', function (event) {
                                        event.dom.addClass(event.col.name);
                                        event.dom.id = event.row.id;
                                        if (reg.test(event.dom.innerHTML)) {
                                            event.dom.innerHTML = moment(event.dom.innerHTML).format("YYYY-MM-DD");
                                        }
                                    });
                                    g.on('SortChanged', function (data) {
                                        scope.paging.orderByProperty = data.orderBy;
                                        scope.paging.ascending = data.ascending;
                                        scope.load(true);
                                    });
                                    g.on('RowChecked', function (data) {
                                        scope.selectItems = data;
                                        scope.$apply();
                                    });
                                    scope.hasSearch = _.some(data.displayColumListAll, { isWhereEnable: true });
                                    $timeout(function () {
                                        scope.currentPageData = data.viewTable;
                                        scope.data = data.viewTable;
                                        scope.paging.totalCount = data.totalCount;
                                    });
                                    if (!isRefresh) {
                                        scope.displayColumListAll = data.displayColumListAll;
                                    }
                                });
                            } else { //假分页为实现
                                service.getViewTable({ code: attr.view, filters: mabp.toArray(scope.filter), permissionKey: scope.moduleId }).then(function (data) {
                                    if (!!data) {
                                        //                                var colConfig = _.map(data.displayColumListAll, function (item) { return { name: _.camelCase(item.name), text: item.displayColumn, visible: item.isDisplayEnable }; });
                                        //                                var rowData = data.viewTable;
                                        scope.hasSearch = _.some(data.displayColumListAll, { isWhereEnable: true });
                                        scope.paging.totalCount = data.totalCount;
                                    }
                                });
                            }

                        }
                    }
                    //Check事件綁定 selectItems


                    scope.changePageSize = function () {
                        scope.pageSize = scope.paging.pageSize;
                        scope.load(true);
                    }

                    scope.sort = function (col, index, asc) {
                        scope.paging.orderByProperty = scope.column[index];
                        scope.paging.ascending = asc;
                        scope.load(true);
                    }

                    scope.$watch('refreshData', function (newV, oldV) {
                        //                console.log(newV, oldV);
                        if (newV !== oldV) {
                            scope.paging.currentPage = 1;
                            scope.filterData();
                        }
                    }, true);

                    scope.exportExcel = function (domId) {
                        var saver = new mabp.ui.executor(domId, ' 导出中...');
                        saver.start();
                        var query = {};
                        if (scope.page) {
                            scope.pagingExport = {};
                            scope.pagingExport.pageSize = 2147483647;
                            scope.pagingExport.currentPage = 1;
                            scope.pagingExport.orderByProperty = scope.paging.orderByProperty;
                            scope.pagingExport.ascending = scope.paging.ascending;
                            query = {
                                code: attr.view,
                                filters: mabp.toArray(scope.filter),
                                allColumnFilter: true,
                                tableFilters: mabp.toArray(scope.tableFilters),
                                pageInput: scope.pagingExport,
                                fileNamePrefix: scope.$parent.base.title
                            };
                        } else {
                            query = {
                                code: attr.view,
                                filters: mabp.toArray(scope.filter),
                                allColumnFilter: true,
                                tableFilters: mabp.toArray(scope.tableFilters),
                                pageInput: { pageSize: 2147483647, currentPage: 1, orderByProperty: "Id", ascending: true },
                                fileNamePrefix: scope.$parent.base.title
                            };
                        }
                        if (attr.excel === "") {
                            fileSv.downloadView(query, { responseType: 'blob' }).then(function () {
                                saver.stop();
                            });
                        }
                        if (attr.mergeExcel === "") {
                            if (attr.mergeColumns == null || attr.sumColumns == null || attr.mergeNum == null) {
                                console.error("检查merge-columns (如 1,2,3,4 ), merge-num(如: 0 ) 是否未配置全。");
                            }
                            query.value = JSON.stringify(query);

                            query.mergeColumns = attr.mergeColumns;
                            query.sumColumns = attr.sumColumns;
                            query.mergeNum = attr.mergeNum | 0;

                            fileSv.downloadMergeExcel(query, { responseType: 'blob' }).then(function () {
                                saver.stop();
                            });
                        }

                    }

                    scope.exportZip = function (domId) {
                        var saver = new mabp.ui.executor(domId, ' 制作中...');
                        saver.start();
                        fileSv.zip(JSON.stringify(scope.selectItems), { responseType: 'blob' }).then(function () {
                            saver.stop();
                        });
                    }
                    scope.exportPdf = function (domId) {
                        var saver = new mabp.ui.executor(domId, ' 制作中...');
                        saver.start();
                        if (!!scope.selectItems) {
                            var pdfArray = [];

                            _.forEach(scope.selectItems, function (data) {
                                var pdfString = {
                                    sn: data.snNumber,
                                    fileName: data.snNumber + " " + (data.areaCode || ""),
                                    sourceText: 1,
                                    sourceIdentity: "",
                                    operationType: 1,
                                    targetType: 2,
                                    displayLanguages: attr.pdfLanguages,
                                    param: attr.param
                                };
                                pdfArray.push(pdfString);

                                var isHave = _.findIndex(pdfArray, { sn: data.snNumber }) > -1;
                                if (!isHave) {
                                    pdfArray.push(pdfString);
                                    sns.push(data.snNumber);
                                }

                            });

                            if (pdfArray.length == 0) {
                                mabp.notify.info("请先选择一行数据");
                                saver.stop();
                                return;
                            }

                            fileSv.insertJobConvertQueueAndUserFile(JSON.stringify(pdfArray)).then(function () {
                                mabp.message.info("已经排队制作,请到 [我的]>[文件]菜单中下载 [批量PDF]", "确认");
                                saver.stop();
                            });
                        }
                    }
                    scope.filterData = function () {
                        if (!scope.page) {
                            scope.filterUnPaged();
                        } else {
                            scope.filterPaged();
                        }
                    }

                    scope.filterPaged = function () {
                        //scope.condition();
                        scope.load(true);
                    }

                    scope.filterUnPaged = function () {
                        var conditionList = {};
                        var conList = document.querySelectorAll(".search-condition [name]");
                        for (var i = 0; i < conList.length; i++) {
                            if (!!conList[i].value) {
                                conditionList[conList[i].getAttribute("name")] = conList[i].value;
                            }
                        }
                        var tempTable = [];
                        var istrue = true;
                        if (Object.keys(conditionList).length > 0) {
                            for (var i = 0; i < scope.data.length; i++) {
                                istrue = true;
                                for (var con in conditionList) {
                                    var con1 = con.lowerFirst();
                                    if (("" + (angular.lowercase(scope.data[i][con1]) || "")).indexOf(angular.lowercase(conditionList[con])) < 0) {
                                        istrue = false;
                                        break;
                                    }
                                }
                                if (istrue) tempTable.push(scope.table[i]);
                            }
                        } else {
                            for (var i = 0; i < scope.data.length; i++) {
                                tempTable.push($.extend({}, scope.table[i]));
                            }
                        }
                        scope.pageNum = parseInt(tempTable.length / scope.pageSize);
                        if (tempTable.length % scope.pageSize !== 0 && tempTable.length > scope.pageSize || scope.pageNum === 0) scope.pageNum++;

                        scope.showPages = [];
                        for (var i = 0; i <= scope.pageNum - 1; i++) {
                            if (i >= scope.currentPageIndex - 2 && i <= scope.currentPageIndex + 2) {
                                scope.showPages.push({
                                    index: i
                                });
                            }
                        }
                        var datas = [];
                        var dataStartNum = scope.currentPageIndex * scope.pageSize;
                        var dataEndNum = scope.currentPageIndex * scope.pageSize + scope.pageSize;
                        if (dataEndNum > tempTable.length) dataEndNum = tempTable.length;
                        for (var i = dataStartNum; i < dataEndNum; i++) {
                            datas.push(tempTable[i]);
                        }
                        scope.currentPageData = datas;
                    }

                    scope.condition = function () {
                        //拼接自定义过滤参数
                        var conditionList = {};
                        var conList = document.querySelectorAll(".search-condition [name]");
                        for (var i = 0; i < conList.length; i++) {
                            if (!!conList[i].value) {
                                conditionList[conList[i].getAttribute("name")] = conList[i].value;
                            }
                        }
                        scope.tableFilters = conditionList;
                    }

                    scope.show = function () {
                        scope.show1 = !scope.show1;
                    }

                    scope.clearCondition = function () {
                        var conList = document.querySelectorAll(".search-condition [name]");
                        for (var i = 0; i < conList.length; i++) {
                            conList[i].value = "";
                        }
                        if (!scope.page) {
                            scope.filterUnPaged();
                        } else {
                            scope.filterPaged();
                        }
                    }

                    scope.load();
                }
            }
        }
    ]);