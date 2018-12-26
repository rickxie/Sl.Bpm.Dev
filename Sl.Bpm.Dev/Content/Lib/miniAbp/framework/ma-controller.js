function mcGrid() {
    var mcGrid = this;
    //配置全局对象
    var defaultClassName = { table: 'table table-hover table-striped table-condensed table-bordered', tr: null, td: null };
    var defaultConfig = mcGrid.defaultConfig = {
        $$allChecked: false,
        checkable: false, //是否显示复选框
        sortable: false, //是否可以排序
        tableWidth: '', //表格宽度
        fixHeaderRow: false,//固定标题行
        fixColumnNum: 0,    //固定前几列
        mergeColumnMainIndex: null, //需要合并的判断列
        mergeColumns: null, //需要合并的列的集合
        resizable: false
    };
    //默认列对象
    var defColConfig = [];
    //绑定表 数据
    var bindingData = [];
    var _ = mcGrid._ = {};
    var $eventStore = { 'RowChecked': [], 'SortChanged': [], 'TdInitialize': [] };

    mcGrid.fire = function (eventName, data) {
        switch (eventName) {
            case 'RowChecked':
                {
                    $eventStore['RowChecked'].forEach(function (func) {
                        var filteredData = bindingData.filter(function (item) {
                            return item.$$checked === true;
                        });
                        func(filteredData, data);
                    });
                }; break;
            case 'SortChanged':
                {
                    $eventStore['SortChanged'].forEach(function (func) {
                        var columnId = data;
                        var col = defColConfig.first({ '$$index': parseInt(columnId) });
                        func({ col: col, orderBy: defaultConfig.orderBy, ascending: defaultConfig.ascending });
                    });
                }; break;
            case 'TdInitialize':
                {
                    $eventStore['TdInitialize'].forEach(function (func) {
                        var colId = data.getAttribute('ci');
                        var rowId = data.getAttribute('ri');
                        var col = _.first(defColConfig, { '$$index': colId }) || {};
                        var row = _.first(bindingData, { '$$index': rowId }) || {};
                        func({ dom: data, col: col, colId: colId, row: row });
                    });
                }; break;
        }
    };

    mcGrid.on = function (eventName, func) {
        if ($eventStore[eventName] != null) { $eventStore[eventName].push(func); }
    };


    mcGrid.InitGrid = function (tableId, config, col, data) {
        //重置配置项
        defColConfig = col;
        processingData(data);
        processingConfig(config);

        var parentDom = document.getElementById(tableId);

        parentDom.removeClass('mc-table');
        parentDom.addClass('mc-table');
        var wrapPart = {
            wraperContainer: createElementDom('div', 'mc-table-wrapper mc-default'),
            headDivDom: createElementDom('div', 'mc-thead'),
            bodyDivDom: createElementDom('div', 'mc-tbody'),
            fixedColumn: createElementDom('div', 'mc-fixed-column'),
            fixedBody: createElementDom('div', 'mc-fixed-body')
        };
        var wraperTable = wrapPart.wraperContainer;
        var theadTxt = buildTheader(defColConfig);
        //var headTable = createElement('table', theadTxt, defaultClassName.table);
        var tbodyTxt = buildTbody(defColConfig, data);
        var sortableClass = '';
        if (defaultConfig.sortable == true) {
            sortableClass = ' sortable'
        }

        var bodyTable = createElementTxt('table', theadTxt + tbodyTxt, defaultClassName.table + sortableClass, { width: defaultConfig.width });
        //var tableTxt = buildTable(defColConfig, data);
        wrapPart.bodyDivDom.innerHTML = bodyTable;
        appendStragy(wrapPart);
        parentDom.innerHTML = '';
        wraperTable.style.visibility = "hidden";
        parentDom.appendChild(wraperTable);
        setTimeout(function () {
            frozenRowColumn(parentDom, wrapPart);
            wraperTable.style.visibility = "visible";
        }, 0);
    }

    //字段处理
    var processingConfig = function (config) {
        //重置默认设置
        _.extend(defaultConfig, config);
        //处理非法情况
        defaultConfig.fixColumnNum = defaultConfig.fixColumnNum | 0;
        defaultConfig.isCheckedByRow = !!defaultConfig.isCheckedByRow;
        defaultConfig.isSingleRowSelected = !!defaultConfig.isSingleRowSelected;
        //设置表格默认样式
        for (var i = 0; i < defColConfig.length; i++) {
            defColConfig[i] = _.extend({ 'min-width': '100px', 'visible': true }, defColConfig[i]);
            var colWidth = parseFloat(defColConfig[i].width);
            //sumWidth += colWidth;
            defColConfig[i].$$index = i;
        }
    };
    //数据处理
    var processingData = function (data) {
        _.forEach(data, function (item, i) {
            item.$$index = i;
            //item.$$checked = false;
        });
        bindingData = data || [];
    }
    //获取列配置的 样式
    var getStyle = function (col) {
        var styleStr = [];
        var allowedStyle = ['min-width', 'width', 'max-width', 'text-align', "white-space", "overflow", "text-overflow"];
        _.forEach(allowedStyle, function (i) {
            if (col[i] != null) {
                styleStr.push(i + ':' + col[i]);
            }
        });

        return styleStr.join(';');
    }

    //Div层次构造
    var appendStragy = function (wrapPart) {
        if (defaultConfig.fixHeaderRow && defaultConfig.fixColumnNum > 0) {
            wrapPart.fixedBody.appendChild(wrapPart.headDivDom);
            wrapPart.fixedBody.appendChild(wrapPart.bodyDivDom);
            wrapPart.wraperContainer.appendChild(wrapPart.fixedColumn);
            wrapPart.wraperContainer.appendChild(wrapPart.fixedBody);
        } else if (defaultConfig.fixHeaderRow && defaultConfig.fixColumnNum == 0) {
            wrapPart.wraperContainer.appendChild(wrapPart.headDivDom);
            wrapPart.wraperContainer.appendChild(wrapPart.bodyDivDom);
        } else if (!defaultConfig.fixHeaderRow) {
            wrapPart.wraperContainer.appendChild(wrapPart.bodyDivDom);
        }
    }
    //重组界面的DataTable
    var frozenRowColumn = function (parentDom, wrapPart) {
        var headDivDom = wrapPart.headDivDom;
        var bodyDivDom = wrapPart.bodyDivDom;
        //设置行列的宽度
        var allTable = bodyDivDom.querySelectorAll('table');
        allTable.forEach(function (item) {
            item.style.width = item.offsetWidth + 'px';
        });
        var allTd = bodyDivDom.querySelectorAll('table td');
        var allTh = bodyDivDom.querySelectorAll('table th');
        allTd.forEach(function (item) {
            item.style.width = item.offsetWidth + 'px';
            item.title = item.textContent;
            //初始化所有Td的事件，可以提供给客户端做相应设置
            mcGrid.fire('TdInitialize', item);
        });
        allTh.forEach(function (item) {
            item.style.width = item.offsetWidth + 'px';
        });
        //合并行
        mergeRow(bodyDivDom);
        if (defaultConfig.fixHeaderRow && bindingData.length > 0) {
            var bodyDivDomTable = bodyDivDom.children[0];
            //var theadHeight = bodyDivDomTable.querySelector('table thead').offsetHeight;
            var headerHeight = bodyDivDomTable.children[0].offsetHeight;
            var bodyHeight = parentDom.offsetHeight - headerHeight;

            var headDivDomTable = bodyDivDomTable.cloneNode(true);
            //删除Body部分 留下Header
            headDivDomTable.removeChild(headDivDomTable.children[1]);
            //删除Header部分
            headDivDom.appendChild(headDivDomTable);

            bodyDivDom.style.height = bodyHeight + 'px';
        }
        //构造冻结固定列
        if (defaultConfig.fixHeaderRow && defaultConfig.fixColumnNum > 0 && bindingData.length > 0) {
            var fixedBodyMcThead = parentDom.querySelector('.mc-fixed-body .mc-thead');
            var fixedBodyMcTbody = parentDom.querySelector('.mc-fixed-body .mc-tbody');
            //var bottomTheadTable = fixedBodyMcThead.querySelector('table');
            var bottomTbodyTable = fixedBodyMcTbody.querySelector('table');
            var leftMcThead = fixedBodyMcThead.cloneNode(true);
            var leftMcTbody = fixedBodyMcTbody.cloneNode(true);
            var leftTheadTable = leftMcThead.querySelector('table');
            var leftTbodyTable = leftMcTbody.querySelector('table');
            var leftDom = parentDom.querySelector('.mc-fixed-column');

            //重置高宽
            setTimeout(function () {
                //重组左侧头部
                var trs = leftTheadTable.rows;
                _.forEach(trs, function (item, j) {
                    var preRemove = [];
                    for (var i = 0; i < item.cells.length; i++) {
                        var ci = item.cells[i].getAttribute("ci");
                        if (ci >= defaultConfig.fixColumnNum) {
                            item.cells[i].style.display = "none";
                        } else {
                            item.cells[i].style["min-width"] = null;
                            item.cells[i].style["max-width"] = null;
                            item.cells[i].style.width = bottomTbodyTable.rows[j].cells[i].offsetWidth + 'px';
                            item.cells[i].style.height = bottomTbodyTable.rows[j].cells[i].offsetHeight + 'px';
                        }
                    }
                });
                //重组左侧身体
                var trs = leftTbodyTable.rows;
                _.forEach(trs, function (item, j) {
                    for (var i = 0; i < item.cells.length; i++) {
                        var ci = item.cells[i].getAttribute("ci");
                        if (ci >= defaultConfig.fixColumnNum) {
                            item.cells[i].style.display = "none";
                        } else {
                            item.cells[i].style["min-width"] = null;
                            item.cells[i].style["max-width"] = null;
                            item.cells[i].style.width = bottomTbodyTable.rows[j].cells[i].offsetWidth + 'px';
                            item.cells[i].style.height = bottomTbodyTable.rows[j].cells[i].offsetHeight + 'px';
                        }
                     
                    }
                });
                leftTheadTable.style.width = null;
                leftTbodyTable.style.width = null;
                leftTheadTable.style["table-layout"] = 'auto';
                leftTbodyTable.style["table-layout"] = 'auto';
                leftMcTbody.style.width = null;
                //wrapPart.fixedBody.style.width = fixedBodyMcTbody.offsetWidth + 'px';
                //                leftMcTbody.style.width = fixedBodyMcTbody.clientHeight + 'px';
                leftMcTbody.style.height = fixedBodyMcTbody.clientHeight + 'px';
            }, 0);


            leftDom.appendChild(leftMcThead);
            leftDom.appendChild(leftMcTbody);
        }
        //绑定事件
        bindEvent(parentDom, bodyDivDom, headDivDom, wrapPart);
    }

    //绑定事件 事件监听
    var bindEvent = function (parentDom, bodyDivDom, headDivDom, wrapPart) {
        //滚动条配置
        bodyDivDom['onscroll'] = function (i) {
            if (defaultConfig.fixHeaderRow) {
                headDivDom.querySelector('table').style.left = '-' + this.scrollLeft + 'px';
                if (defaultConfig.fixColumnNum > 0) {
                    //var columnDom = parentDom.querySelector('.mc-fixed-column');
                    //columnDom.left = this.scrollLeft;
                    var fixedColumnBodyTable = wrapPart.fixedColumn.querySelector('.mc-tbody table')
                    fixedColumnBodyTable.style.marginTop = '-' + this.scrollTop + 'px';
                }
            }
        };

        //Row hover
        var allTr = parentDom.getElementsByTagName('tr');

        function focusRow(rowId, isOver) {
            allTr.forEach(function (tr) {
                var trRid = tr.getAttribute("ri");
                if (trRid === rowId) {
                    if (isOver) {
                        tr.addClass('hover');
                    } else {
                        tr.removeClass('hover');
                    }
                }
            });
        }

        _.forEach(allTr, function (tr) {
            tr['onmouseover'] = function () {
                var trRid = tr.getAttribute("ri");
                focusRow(trRid, true);
            }
            tr['onmouseout'] = function () {
                var trRid = tr.getAttribute("ri");
                focusRow(trRid, false);
            }
        })

        //缓存全局信息
        var allTdCheckbox = parentDom.getElementsByTagName('td').filter(function (item) {
            return item.getAttribute('ci') === '-1' && item.getAttribute('ri') !== '-1';
        });
        var checkAllBox = parentDom.getElementsByTagName('th').filter(function (item) {
            return item.getAttribute('ci') === '-1' && item.getAttribute('ri') === '-1';
        });

        //全部选中
        function checkAllTr(checked) {
            //更新所有复选框选中标记
            checkAllBox.forEach(function (cabth) {
                var cb = cabth.querySelector('input[type=checkbox]');
                cb.checked = checked;
                defaultConfig.$$allChecked = checked;
                //更新所有复选框
                allTdCheckbox.forEach(function (cbtd) {
                    var cb = cbtd.querySelector('input[type=checkbox]');
                    cb.checked = checked;
                });

            });
            //更新Tr被选中的样式
            var allDataRow = parentDom.getElementsByTagName('tr').filter(function (item) {
                return item.getAttribute('ri') !== '-1';
            });
            allDataRow.forEach(function (item) {
                if (checked) {
                    item.addClass('checked');
                } else {
                    item.removeClass('checked');
                }
            });

            //更新所有数据被选中的标记
            bindingData.forEach(function (item) {
                item.$$checked = checked;
            });
        }
        //选中单行
        function checkSingleTr(trDom, checkboxDom) {
            var tr = trDom;
            var rowIndex = tr.getAttribute('ri');
            var rowData = _.first(bindingData, { $$index: rowIndex });
            var checked = false;
            (checkboxDom != null) ? (checked = checkboxDom.checked) : (checked = !rowData.$$checked);

            //若为单选则全部设为不选择
            if (defaultConfig.isSingleRowSelected) {
                checkAllTr(false);
            }
            var checkedRow = parentDom.querySelectorAll('tr[ri="' + rowIndex + '"]');
            checkedRow.forEach(function (trItem) {
                if (defaultConfig.checkable) {
                    //更新checkbox 选中
                    var cbb = trItem.querySelector('input[type=checkbox]');
                    cbb.checked = checked;
                }
                //更新样式
                if (checked) {
                    trItem.addClass('checked');
                } else {
                    trItem.removeClass('checked');
                }
            });
            rowData.$$checked = checked;
            mcGrid.fire('RowChecked', rowData);
        }

        //CheckBox
        if (defaultConfig.checkable === true) {
            //单个选项框选中
            allTdCheckbox.forEach(function (cbtd) {
                var cb = cbtd.querySelector('input[type=checkbox]');
                var trDom = cbtd.parentTag('tr');
                cb['onchange'] = function () {
                    checkSingleTr(trDom, cb);
                }
            });
            //绑定选中状态变化
            checkAllBox.forEach(function (cabth) {
                var cb = cabth.querySelector('input[type=checkbox]');
                cb['onchange'] = function () {
                    checkAllTr(this.checked);
                    mcGrid.fire('RowChecked', bindingData);
                }
            });
        }
        //单行选择
        if (defaultConfig.isSingleRowSelected == true && defaultConfig.isCheckedByRow === true) {
            var allTrDom = parentDom.getElementsByTagName('tr').filter(function (item) {
                return item.getAttribute('ri') !== '-1';
            });
            allTrDom.forEach(function (trDom) {
                trDom['onclick'] = function () {
                    checkSingleTr(trDom);
                }
            });
        }


        //开启排序
        if (defaultConfig.sortable === true) {
            var thList = parentDom.getElementsByTagName('th').filter(function (item) {
                return item.getAttribute('ci') !== '-1';
            });
            //排序
            function sortProperty(colId, ascending, firstLoad) {
                thList.forEach(function (thDom) {
                    var cid = thDom.getAttribute('ci')
                    thDom.removeClass('sort-up');
                    thDom.removeClass('sort-down');
                    if (cid == colId) {
                        ascending == true ? thDom.addClass('sort-up') : thDom.addClass('sort-down');
                        defaultConfig.$$orderByCol = _.first(defColConfig, { $$index: colId });
                        defaultConfig.orderBy = defaultConfig.$$orderByCol.name;
                        defaultConfig.ascending = ascending;
                    }
                });
            };
            var sortColId = 0;
            //处理 orderBy, ascending 异常的情况
            if (defaultConfig.orderBy != null) {
                var sortCol = _.first(defColConfig, { name: defaultConfig.orderBy });
                if (sortCol != null) {
                    sortColId = sortCol.$$index;
                } else { sortColId = 0; defaultConfig.orderBy = defColConfig[0].name; }
            } else { sortColId = 0; defaultConfig.orderBy = defColConfig[0].name; }
            defaultConfig.ascending = !!defaultConfig.ascending;

            //初始化
            defColConfig.orderBy != null || _.first(defColConfig, { name: defaultConfig.orderBy })
            sortProperty(sortColId, defaultConfig.ascending);

            //列排序
            thList.forEach(function (thDom) {
                thDom['onclick'] = function () {
                    var colId = this.getAttribute('ci')
                    var setAscending = true;
                    if (colId == defaultConfig.$$orderByCol.$$index) {
                        setAscending = !defaultConfig.ascending;
                    }
                    sortProperty(colId, setAscending);
                    mcGrid.fire('SortChanged', colId);
                }
            });
        }
    }

    //构建表格对象
    var buildTable = function (cols, data) {
        var head = buildTheader(cols);
        var body = buildTbody(cols, data);
        var tableDom = createElementTxt('table', head + body, defaultClassName.table);
        return tableDom;
    }
    //生成DOM
    var createElementDom = function (element, className) {
        var dom = document.createElement(element);
        dom.className = className;
        return dom;
    };
    //创建Element 文本
    var createElementTxt = function (element, content, cls, styleConfig, ri, ci) {
        var cls = cls != null ? ' class = "' + cls + '"' : '';
        var style = '';
        if (styleConfig != null) {
            style = getStyle(styleConfig);
            style = style != null ? ' style = "' + style + '"' : '';
        }
        (ci !== undefined && (ci = ' ci="' + ci + '" ')) || (ci === undefined && (ci = ''));
        (ri !== undefined && (ri = ' ri="' + ri + '" ')) || (ri === undefined && (ri = ''));
        content = content == null ? '' : content;
        var eleDom = '<' + element + cls + ri + ci + style + '>' + content + '</' + element + '>';
        return eleDom;
    }

    //构建表格头部
    var buildTheader = function (cols) {
        var thDomList = [];
        _.forEach(defColConfig, function (item, ci) {
            if (item.visible)
                thDomList.push(createElementTxt('th', item.text, null, item, -1, item.$$index));
        })

        if (defaultConfig.checkable) {
            var checkBoxTxt = createElementTxt('th', "<input type='checkbox'/>", 'check-all check-btn', null, -1, -1);
            thDomList.unshift(checkBoxTxt);
        }
        var trDom = createElementTxt('tr', thDomList.join(''), null, null, -1)
        var tableHeadDom = createElementTxt('thead', trDom);
        return tableHeadDom;
    }
    //构建表格数据
    var buildTbody = function (cols, rows) {
        var tdDomList = [];
        var trDomList = [];
        _.forEach(rows, function (r, ri) {
            tdDomList = [];
            _.forEach(defColConfig, function (item, ci) {
                if (item.visible)
                    tdDomList.push(createElementTxt('td', r[item.name], null, item, r.$$index, item.$$index));
            })
            var checkedStr = "";
            if (r.$$checked === true)
                checkedStr = "checked";
            if (defaultConfig.checkable) {
                var checkBoxTxt = createElementTxt('td', "<input type='checkbox' " + checkedStr + "/>", 'check-btn', null, r.$$index, -1)
                tdDomList.unshift(checkBoxTxt);
            }
            trDomList.push(createElementTxt('tr', tdDomList.join(''), checkedStr, null, r.$$index));
        });
        //if (trDomList.length == 0) {
        //    trDomList.push(createElementTxt('tr', '<td colspan="1000"></td>', null, null, 0));
        //}
        var tableBodyDom = createElementTxt('tbody', trDomList.join(''));
        return tableBodyDom;
    }

    //合并行
    var mergeRow = function (bodyDivDom) {
        if (defaultConfig.mergeColumnMainIndex != null && defaultConfig.mergeColumns != null
            && defaultConfig.mergeColumns.length > 0 && isInteger(defaultConfig.mergeColumnMainIndex)) {
            var rowConfig = analyseRows();
            transformRows(bodyDivDom, rowConfig);
        }
    }
    //分析行分组
    function analyseRows() {
        var col = defaultConfig.mergeColumnMainIndex;
        var rows = bindingData;
        var mergedColumnIndex = null;
        var mergedColumnPropName = '';
        for (var i = 0; i < defColConfig.length; i++) {
            if (defColConfig[i].visible === true) {
                mergedColumnIndex == null ? mergedColumnIndex = 0 : mergedColumnIndex += 1;
            }
            if (mergedColumnIndex == col) {
                mergedColumnPropName = defColConfig[i].name;
                break;
            }
        }
        var groupRows = [];
        var sameRows = [];
        var lastValue = null;
        for (var i = 0; i < rows.length; i++) {
            var cur = rows[i][mergedColumnPropName];
            if (lastValue === null) {
                lastValue = cur;
            }
            if (cur === lastValue) {
                sameRows.push(i)
            } else {
                groupRows.push(sameRows);
                sameRows = [];
                sameRows.push(i);
                lastValue = cur;
            }
        }
        if (sameRows.length != 0) {
            groupRows.push(sameRows);
        }
        return groupRows;
    }
    //合并移除不相关Td
    function transformRows(bodyDivDom, rowConfig) {
        //格式化mergeColumns字段
        var collist = [];
        defaultConfig.mergeColumns.forEach(function (item) { collist.push((item | 0)); });
        collist = collist.sort(function (a, b) {
            return a > b;
        });
        var allTr = bodyDivDom.querySelectorAll('tr').filter(function(item) {
            return item.getAttribute('ri') !== '-1';
        });

        function getRowSpanCount(rowId, colId, rowConfig) {
            colId = parseInt(colId);
            rowId = parseInt(rowId);
            if (collist.indexOf(colId) > -1) {
                var rowColCollection = _.first(rowConfig, function (item) {
                    return item.indexOf(rowId) > -1;
                });
                if (rowColCollection[0] == rowId && rowColCollection.length == 1) {
                    return 0; //不需要动
                } else if (rowColCollection[0] != rowId && rowColCollection.length > 1) {
                    return -1; //需要移除
                } else if (rowColCollection[0] == rowId && rowColCollection.length > 1) {
                    return rowColCollection.length;
                }
            } else {
                //不需要动
                return 0;
            }
        }

        //设置Td 配置所有列
        var allNeedRemoveDom = [];
        allTr.forEach(function (trDom, rowId) {
            var allTdDom = trDom.children;
            var rowId = trDom.getAttribute('ri');
            allTdDom.forEach(function (tdDom) {
                var colId = tdDom.getAttribute('ci');
                //需要处理
                var handleResult = getRowSpanCount(rowId, colId, rowConfig);
                switch (handleResult) {
                    case 0: break;
                    case -1: //需要删除
                        allNeedRemoveDom.push(tdDom);
                        break;
                    case null: break;
                    default: //需要设置rowspan
                        tdDom.setAttribute('rowspan', handleResult);
                        tdDom.style.verticalAlign = 'middle';
                        break;
                }
            })
        });
        allNeedRemoveDom.forEach(function (item) {
            item.remove();
        })
    }

    _.forEach = function (arr, func) {
        if (arr == null) return;
        var i = 0;
        for (i = 0; i < arr.length; i++) {
            func(arr[i], i);
        }
    }
    _.filter = function (arr, predict) {
        var a = [];
        var i = 0;
        for (i = 0; i < arr.length; i++) {
            if (typeof (predict) == 'object') {
                var allMeet = true;
                for (name in predict) {
                    if (predict[name] != arr[i][name]) {
                        allMeet = false;
                        break;
                    }
                }
                if (allMeet) {
                    a.push(arr[i]);
                }
            } else if (typeof (predict) == 'function') {
                if (predict(arr[i])) {
                    a.push(arr[i]);
                }
            }
        }
        return a;
    }

    _.first = function (arr, predict) {
        for (var i = 0; i < arr.length; i++) {
            if (typeof (predict) == 'object') {
                var allMeet = true;
                for (name in predict) {
                    if (predict[name] != arr[i][name]) {
                        allMeet = false;
                        break;
                    }
                }
                if (allMeet) {
                    return arr[i];
                }
            } else if (typeof (predict) == 'function') {
                if (predict(arr[i])) {
                    return arr[i];
                }
            }
        }
    }
    _.extend = function () {
        var _isObject, _extend;
        _isObject = function (o) {
            return Object.prototype.toString.call(o) === '[object Object]';
        } //判断是否为Object
        _extend = function self(target, source) {
            var property;
            for (property in source) {
                if (_isObject(target[property]) && _isObject(source[property])) {
                    self(target[property], source[property]);//递归
                }
                target[property] = source[property];
            }
        }
        var arg = arguments;
        if (arg.length <= 1) {
            return;//直接返回
        }
        else {
            var i;
            for (i = 1; i < arg.length; i++) {
                _extend(arg[0], arg[i]);
            }
        }
        if (arg.length > 0)
            return arg[0];
    }

    _.all = function (arr, func) {
        var isTrue = true;
        for (var i = 0; i < arr.length; i++) {
            if (!func(arr[i])) {
                isTrue = false;
                break;
            }
        }
        return isTrue;
    }
    _.clone = function (obj) {
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; ++i) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    //公共基础类
    NodeList.prototype.forEach = HTMLCollection.prototype.forEach = Array.prototype.forEach = function (func) {
        _.forEach(this, function (item, rowId) {
            func(item, rowId);
        })
    }
    NodeList.prototype.filter = HTMLCollection.prototype.filter = Array.prototype.filter = function (predict) {
        return _.filter(this, predict);
    }
    NodeList.prototype.first = HTMLCollection.prototype.first = Array.prototype.first = function (predict) {
        return _.first(this, predict);
    }
    Element.prototype.addClass = function (cls) {
        var obj = this
        var obj_class = obj.className; //获取 class 内容.
        if (obj_class != null) {
            obj_class.replace(/(\s+)/gi, ' ');
            var classArr = obj_class.split(' ');
            if (classArr.indexOf(cls) > -1)
                return;
        }
        blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
        added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
        obj.className = added;//替换原来的 class.
    }
    Element.prototype.removeClass = function (cls) {
        var obj = this;
        var obj_class = ' ' + obj.className + ' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
        obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
            removed = obj_class.replace(' ' + cls + ' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
        obj.className = removed;//替换原来的 class.
    }
    Element.prototype.remove = function () {
        this.parentNode.removeChild(this);
    }
    Element.prototype.hasClass = function (cls) {
        var obj = this;
        var obj_class = obj.className,//获取 class 内容.
            obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
        x = 0;
        for (x in obj_class_lst) {
            if (obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
                return true;
            }
        }
        return false;
    }
    Element.prototype.parentTag = function (tagName) {
        var parentNode = this.parentNode;
        do {
            if (parentNode.tagName.toUpperCase() === tagName.toUpperCase() || parentNode.tagName.toUpperCase() == 'BODY') {
                break;
            }
            var parentNode = parentNode.parentNode;
        }
        while (true)
        if (parentNode.tagName.toUpperCase() === 'BODY') {
            return null;
        }
        else {
            return parentNode;
        }
    }
    function isInteger(obj) {
        return (obj | 0) === obj;
    }
};





angular.module('mabp')
    .directive('maPanelCommand', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="ma-panel-command text-right" ng-transclude></div>',
            transclude: true
        }
    })
    .directive('maHeader', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="ma-header"><div ng-transclude></div><hr/></div>',
            transclude: true
        };
    })
    //创建面包屑导航
    //ngModel 被选中的值 通常为id
    //items 数据源
    //preItem 再此之前插入固定值
    .directive("maBreadcrumb", ['treeHelper', '$compile', function (treeHelper, $compile) {
        return {
            restrict: 'EA',
            transclude: true,
            template: '<div></div>',
            scope: {
                ngModel: '=',
                items: '=',
                preItem: '=',
                selectedItem: '='
            },
            link: function (scope, element, attr) {

                function refreshBreadcrumb() {
                    var groupArray = scope.items;
                    var ngModel = scope.ngModel;
                    var html = [];

                    if (groupArray == null || scope.ngModel == null) {
                        element.html('');
                        return;
                    }
                    var txtStr = attr.textField || 'text';
                    var idStr = attr.idField || 'id';
                    var arr = treeHelper.getBreadcrumb(groupArray, ngModel);
                    if (arr != null && arr.length > 0 && scope.preItem != null) {
                        arr.unshift(scope.preItem);
                    }
                    for (var j = 0; j < arr.length; j++) {
                        html.push("<span ng-click= 'ngModel =\"{0}\"' class='cursor-pointer crumb'>{1}</span>".fill(arr[j][idStr], arr[j][txtStr]));
                    }
                    var totalHtml = _.join(html, ">");
                    element.html($compile(totalHtml)(scope));
                    scope.selectedItem = arr;
                };

                scope.$watch("items", function (newValue, oldValue) {
                    refreshBreadcrumb();
                });
                scope.$watch("ngModel", function (newValue, oldValue, scope) {
                    refreshBreadcrumb();
                });
            }
        }

    }])


;