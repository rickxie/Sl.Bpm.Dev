_shared
/*复选框/切换框指令*/
.directive('maCodeSql', [
        '$compile', '$timeout', 'mabp.app.module', 'appSession', function ($compile, $timeout, service, appSession) {
            return {
                restrict: 'E',
                replace: true,
                require: '^ngModel',
                template: function () {
                    return '<div class="fm-code fm-code-sql">' +
			                   '<pre class="prettyprint linenums lang-sql"></pre>' +
			                   '<textarea spellcheck="false" ng-model="ngModel" ng-click="event_Mouseclick()" ng-blur="event_Blur()"></textarea>' +
                               '<div class="tool"></div>' +
                               '<div ng-hide="!openOption" class="option" title="" style=""><div class="option-item"><ul class="fm-code-menu">' +
                               '<li ng-class="{\'active\':item.id==selectKeyword.id}" ng-repeat="item in menus | filter: findText" style="" ng-click="selectItem($event, item)" ng-mouseover="event_selectItemMouseOver($event,item)"><i class="icon {{::keyWordType[item.group].icon}}"></i>&nbsp;{{::item.name}}&nbsp;<span class="fm-code-menu-item-type">{{::item.type}}</span><span class="fm-code-menu-item-remark">{{::["tablename","columnname"].indexOf(item.group) >= 0 ? item.remark : ""}}</span></li>' +
                               '</ul></div><div class="menu-remark" ng-class="{\'p-left\':pX>0}" ng-hide="!selectKeyword">' +
                               '<span class="menu-remark-type">{{keyWordType[selectKeyword.group].name}}</span><hr />' +
                               '<span class="menu-remark-title">{{selectKeyword.remark}}</span><br />' +
                               '<span class="menu-remark-title">{{selectKeyword.tablename}}</span>' +
                               '</div></div>' +
		                   '</div>';
                },
                scope: {
                    ngModel: '=',
                    disabled: '=',
                    tooltips: '=',
                    menus: '=',
                    openOption: '=',
                    selectKeyword: '=',
                    pX: '='
                },
                link: function (scope, element, attr, ctrl) {
                    scope.selectKeyword = { text: "", groupname: "", name: "", tablename: "" };
                    scope.keyWordType = {
                        systablename: { icon: "icon-table text-warning", name: "系统表" },
                        tablename: { icon: "icon-table text-info", name: "业务表" },
                        keyword: { icon: "icon-cube text-primary", name: "关键字" },
                        syscolumnname: { icon: "icon-columns text-special", name: "系统表字段" },
                        columnname: { icon: "icon-columns text-special", name: "业务表字段" },
                        quickinput: { icon: "icon-code text-success", name: "代码段" },
                        sqlfunction: { icon: "icon-lightbulb text-danger", name: "SQL Server函数" },
                        alias: { icon: "icon-bookmark-empty text-muted", name: "表别名" }
                    };
                    scope.openOption = scope.openOption || false;
                    if (!scope.menus) scope.menus = [];
                    var keyIndex = -1;
                    var keyStr = "";
                    var keyStartIndex = 0;
                    var keyEndIndex = 0;
                    //判断是否为特殊字符（特殊字符下直接关闭列表）
                    var splitChar = /[^a-zA-z0-9_]/;
                    //当前展示的列表
                    var arrs = [];
                    //临时keydown的code
                    var _tempKeyCode = -1;
                    //当前SQL中的所有表名
                    var _tempTable = [];
                    //当前SQL中的所有表字段
                    var _tempColumns = [];
                    //退回/撤销历史数据
                    var _historyData = [{ id: 0, text: scope.ngModel, date: new Date(), selectionStart: 0, selectionEnd: 0 }];
                    //当前所在历史数据索引
                    var _historyIndex = 0;
                    //动态修改的别名集合
                    var _aliasList = [];
                    //是否为点带出来的数据
                    scope.isDot = false;
                    //点之前的表名
                    scope.dotTableName = "";
                    //提示框位于屏幕的横向位置（取0~2）
                    scope.pX = 0;

                    scope.printDiv = element.find(".prettyprint");
                    scope.textControl = element.find("textarea");
                    prettyPrint_TextArea = element.find("textarea")[0];
                    scope.optionDiv = element.find(".option");
                    scope.optionItems = element.find(".option-item");
                    scope.optionRemarkDiv = element.find(".menu-remark");

                    scope.findText = function (item) {
                        if (scope.isDot) {
                            if (["syscolumnname", "columnname"].indexOf(item.group) >= 0 && item.tablename.toLowerCase() == scope.dotTableName.toLowerCase()) return true;
                            else return false;
                        } else {
                            if (keyIndex < 0 || keyStr.length < 1 || (item.group == "columnname" && _tempTable.indexOf(item.tablename) == -1)) return false;
                            if (item.name.toLowerCase().indexOf(keyStr.toLowerCase()) == 0) return true;
                            else return false;
                        }
                    }

                    scope.event_Blur = function () {
                        //scope.openOption = false;
                    }

                    //代码段
                    var quickinput = [
                        { name: "ssf", text: "SELECT * FROM" },
                        { name: "scf", text: "SELECT COUNT(*) FROM" },
                        { name: "st100", text: "SELECT TOP 100 * FROM" },
                        { name: "ij", text: "INNER JOIN" },
                        { name: "lj", text: "LEFT JOIN" },
                        { name: "rj", text: "RIGHT JOIN" },
                        { name: "fj", text: "FULL JOIN" },
                        { name: "bt", text: "BEGIN TRANSACTION" },
                        { name: "be", text: "begin ? end" },
                        { name: "dec", text: "DECIMAL(18,2)" },
                        { name: "nvc", text: "NVARCHAR(50)" }
                    ];
                    for (var i = 0; i < quickinput.length; i++) {
                        scope.menus.push({ id: scope.menus.length + 1, text: quickinput[i].text, group: "quickinput", name: quickinput[i].name, remark: quickinput[i].text.replace("?", "").toLowerCase() });
                    }
                    //函数
                    var sqlfuncs = [
                        { group: "sqlfunction", name: "l", text: "L(?,'zh-CN')", remark: "[MC]获取表达式或字段的多语言。" },
                        { group: "sqlfunction", name: "getdate", text: "GETDATE(?)", remark: "以Datetime的缺省格式返回系统当前的日期和时间。" },
                        { group: "sqlfunction", name: "count", text: "COUNT(?)", remark: "返回指定列中唯一值的个数。" },
                        { group: "sqlfunction", name: "length", text: "LENGTH(?)", remark: "返回指定字符列或表达式的长度。" },
                        { group: "sqlfunction", name: "trim", text: "TRIM(?)", remark: "删除指定列或表达式前后的字符。" },
                        { group: "sqlfunction", name: "newid", text: "NEWID()", remark: "返回一个新的GUID值。" },
                        { group: "sqlfunction", name: "sum", text: "SUM(?)", remark: "返回指定列或表达式的数值和。" },
                        { group: "sqlfunction", name: "avg", text: "AVG(?)", remark: "返回指定列或表达式中的数值平均值。" },
                        { group: "sqlfunction", name: "min", text: "MIN(?)", remark: "返回指定列或表达式中的数值最小值。" },
                        { group: "sqlfunction", name: "max", text: "MAX(?)", remark: "返回指定列或表达式中的数值最大值。" },
                        { group: "sqlfunction", name: "day", text: "DAY(?)", remark: "返回指定表达式中的日期值。" },
                        { group: "sqlfunction", name: "month", text: "MONTH(?)", remark: "返回指定表达式中的月份值。" },
                        { group: "sqlfunction", name: "year", text: "YEAR(?)", remark: "返回指定表达式中的年份值。" },
                        { group: "sqlfunction", name: "ascii", text: "ASCII(?)", remark: "返回字符表达式最左端字符的ASCII码值。" },
                        { group: "sqlfunction", name: "char", text: "CHAR(?)", remark: "将ASCII码转换为字符。如果没有输入0~255之间的ASCII码值，CHAR()返回NULL 。" },
                        { group: "sqlfunction", name: "lower", text: "LOWER(?)", remark: "将字符串全部转为小写。" },
                        { group: "sqlfunction", name: "upper", text: "UPPER(?)", remark: "将字符串全部转为大写。" },
                        { group: "sqlfunction", name: "str", text: "STR(?)", remark: "把数值型数据转换为字符型数据。" },
                        { group: "sqlfunction", name: "ltrim", text: "LTRIM(?)", remark: "把字符串头部的空格去掉。" },
                        { group: "sqlfunction", name: "rtrim", text: "RTRIM(?)", remark: "把字符串尾部的空格去掉。" },
                        { group: "sqlfunction", name: "left", text: "LEFT(?)", remark: "返回字符串左起?个字符。" },
                        { group: "sqlfunction", name: "right", text: "RIGHT(?)", remark: "返回字符串右起?个字符。" },
                        { group: "sqlfunction", name: "substring", text: "SUBSTRING(?)", remark: "返回字符串第?个字符起共?个字符的部分。" },
                        { group: "sqlfunction", name: "charindex", text: "CHARINDEX(?)", remark: "返回字符串中某个指定的子串出现的开始位置。（不可使用通配符）" },
                        { group: "sqlfunction", name: "patindex", text: "PATINDEX(?)", remark: "返回字符串中某个指定的子串出现的开始位置。（可使用通配符）" },
                        { group: "sqlfunction", name: "quotename", text: "QUOTENAME(?)", remark: "返回被特定字符括起来的字符串。" },
                        { group: "sqlfunction", name: "replicate", text: "REPLICATE(?)", remark: "返回一个重复?次的字符串。" },
                        { group: "sqlfunction", name: "reverse", text: "REVERSE(?)", remark: "将指定的字符串的字符排列顺序颠倒。" },
                        { group: "sqlfunction", name: "replace", text: "REPLACE(?)", remark: "返回被替换了指定子串的字符串。" },
                        { group: "sqlfunction", name: "space", text: "SPACE(?)", remark: "返回一个有指定长度的空白字符串。" },
                        { group: "sqlfunction", name: "stuff", text: "STUFF(?)", remark: "用另一子串替换字符串指定位置、长度的子串。" },
                        { group: "sqlfunction", name: "convert", text: "CONVERT(?)", remark: "用于转换数据的类型。" },
                        { group: "sqlfunction", name: "weekday", text: "WEEKDAY(?)", remark: "返回指定表达式中的当周星期几。" },
                        { group: "sqlfunction", name: "dateadd", text: "DATEADD(?)", remark: "返回指定日期加上指定的额外日期间隔产生的新日期。" },
                        { group: "sqlfunction", name: "datediff", text: "DATEDIFF(?)", remark: "返回两个指定日期在datepart方面的不同之处，即前者超过后者的差距值，其结果值是一个带有正负号的整数值。" },
                        { group: "sqlfunction", name: "datename", text: "DATENAME(?)", remark: "以字符串的形式返回日期的指定部分此部分。由datepart来指定。" },
                        { group: "sqlfunction", name: "abs", text: "ABS(?)", remark: "返回指定数字的绝对值。" },
                        { group: "sqlfunction", name: "mod", text: "MOD(?)", remark: "返回指定数字除以除数后的余数。" },
                        { group: "sqlfunction", name: "sqrt", text: "SQRT(?)", remark: "返回指定表达式的平方根值。" },
                        { group: "sqlfunction", name: "round", text: "ROUND(?)", remark: "返回指定表达式小数点后?位经过四舍五入后的值。" },
                        { group: "sqlfunction", name: "floor", text: "FLOOR(?)", remark: "返回指定表达式截去小数位后的值。" },
                        { group: "sqlfunction", name: "range", text: "RANGE(?)", remark: "返回指定列的最大值与最小值之差。" }
                    ];
                    for (var i = 0; i < sqlfuncs.length; i++) {
                        scope.menus.push({ id: scope.menus.length + 1, text: sqlfuncs[i].text, group: "sqlfunction", name: sqlfuncs[i].name, remark: sqlfuncs[i].remark });
                    }

                    var tablesname = ["AppAuditLog", "AppBusinessTable", "AppBusinessTableColumn", "AppBusinessTableColumnChangeHistory", "AppEnterprise", "AppEnterpriseLanguage", "AppEnterpriseSetting", "AppEnterpriseUser", "AppLanguage", "AppPage", "AppUser", "BpmBasicData", "BpmEnum", "BpmGroup", "BpmInterfaceConfig", "BpmInterfaceMappingConfig", "BpmInterfaceServerConfig", "BpmJob", "BpmJobUser", "BpmLanguage", "BpmModule", "BpmModuleFavourite", "BpmModulePageRight", "BpmModuleRight", "BpmReport", "BpmRole", "BpmRoleJob", "BpmViewTable", "BpmViewTableColumn", "InstAgent", "InstAttachment", "InstDraft", "InstFile", "InstMail", "InstProc", "InstProcLink", "InstSerial", "InstTask", "InstTaskCopy", "InstTaskTop", "InstTaskMark", "InstVariable", "pur_inst_processor", "WfdCategory", "WfdWorkflow", "WfdWorkflowLink", "WfdWorkflowLinkPoint", "WfdWorkflowNode", "WfdWorkflowNodeAction", "WfdWorkflowNodeCopyConfig", "WfdWorkflowNodeInformConfig", "WfdWorkflowNodePreProcessorConfig", "WfdWorkflowObject", "WfdWorkflowProcessor", "WfdWorkflowVariable"];
                    var keywords = ["SELECT", "FROM", "SET", "UPDATE", "DELETE", "INSERT", "INTO", "INNER", "IS", "JOIN", "ADD", "OR", "ORDER", "BY", "GROUP", "HAVING", "WHERE", "ALL", "ALTER", "AND", "ANY", "APPLY", "AS", "ASC", "AUTHORIZATION", "BACKUP", "BEGIN", "BETWEEN", "BREAK", "BROWSE", "BULK", "CASCADE", "CASE", "CHECK", "CHECKPOINT", "CLOSE", "CLUSTERED", "COALESCE", "COLLATE", "COLUMN", "COMMIT", "COMPUTE", "CONNECT", "CONSTRAINT", "CONTAINS", "CONTAINSTABLE", "CONTINUE", "CONVERT", "CREATE", "CROSS", "CURRENT", "CURRENT_DATE", "CURRENT_TIME", "CURRENT_TIMESTAMP", "CURRENT_USER", "CURSOR", "DATABASE", "DBCC", "DEALLOCATE", "DECLARE", "DEFAULT", "DENY", "DESC", "DISK", "DISTINCT", "DISTRIBUTED", "DOUBLE", "DROP", "DUMMY", "DUMP", "ELSE", "END", "ERRLVL", "ESCAPE", "EXCEPT", "EXEC", "EXECUTE", "EXISTS", "EXIT", "FETCH", "FILE", "FILLFACTOR", "FOLLOWING", "FOR", "FOREIGN", "FREETEXT", "FREETEXTTABLE", "FULL", "FUNCTION", "GOTO", "GRANT", "HOLDLOCK", "IDENTITY", "IDENTITYCOL", "IDENTITY_INSERT", "IF", "IN", "INDEX", "INTERSECT", "KEY", "KILL", "LEFT", "LIKE", "LINENO", "LOAD", "MATCH", "MATCHED", "MERGE", "NATURAL", "NATIONAL", "NOCHECK", "NONCLUSTERED", "NOCYCLE", "NOT", "NULL", "NULLIF", "OF", "OFF", "OFFSETS", "ON", "OPEN", "OPENDATASOURCE", "OPENQUERY", "OPENROWSET", "OPENXML", "OPTION", "OUTER", "OVER", "PARTITION", "PERCENT", "PIVOT", "PLAN", "PRECEDING", "PRECISION", "PRIMARY", "PRINT", "PROC", "PROCEDURE", "PUBLIC", "RAISERROR", "READ", "READTEXT", "RECONFIGURE", "REFERENCES", "REPLICATION", "RESTORE", "RESTRICT", "RETURN", "REVOKE", "RIGHT", "ROLLBACK", "ROWCOUNT", "ROWGUIDCOL", "ROWS?", "RULE", "SAVE", "SCHEMA", "SESSION_USER", "SETUSER", "SHUTDOWN", "SOME", "START", "STATISTICS", "SYSTEM_USER", "TABLE", "TEXTSIZE", "THEN", "TO", "TOP", "TRAN", "TRANSACTION", "TRIGGER", "TRUNCATE", "TSEQUAL", "UNBOUNDED", "UNION", "UNIQUE", "UNPIVOT", "UPDATETEXT", "USE", "USER", "USING", "VALUES", "VARYING", "VIEW", "WAITFOR", "WHEN", "WHILE", "WITH", "WITHIN", "WRITETEXT", "XML"];

                    for (var i = 0; i < keywords.length; i++) {
                        scope.menus.push({ id: scope.menus.length + 1, text: keywords[i], group: "keyword", name: keywords[i], remark: keywords[i].toLowerCase() });
                    }
                    for (var i = 0; i < tablesname.length; i++) {
                        scope.menus.push({ id: scope.menus.length + 1, name: tablesname[i], group: "systablename", text: tablesname[i], remark: tablesname[i] });
                    }

                    service.getAllTableName().then(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            tablesname.push("(dbo.)?" + data[i].schemaName);
                            scope.menus.push({ id: scope.menus.length + 1, name: data[i].schemaName.toLowerCase(), group: "tablename", text: data[i].schemaName, remark: data[i].name });
                        }
                        PR['registerLangHandler'](
                            PR['createSimpleLexer'](
                                [
                                 [PR['PR_PLAIN'], /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
                                 [PR['PR_STRING'], /^(?:"(?:[^\"\\]|\\.)*"|'(?:[^\'\\]|\\.)*')/, null, '"\'']
                                ],
                                [
                                 [PR['PR_COMMENT'], /^(?:--[^\r\n]*|\/\*[\s\S]*?(?:\*\/|$))/],
                                 [PR['PR_KEYWORD'], /^(?:ADD|ALL|ALTER|AND|ANY|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BEGIN|BETWEEN|BREAK|BROWSE|BULK|BY|CASCADE|CASE|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COMMIT|COMPUTE|CONNECT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATABASE|DBCC|DEALLOCATE|DECLARE|DEFAULT|DELETE|DENY|DESC|DISK|DISTINCT|DISTRIBUTED|DOUBLE|DROP|DUMMY|DUMP|ELSE|END|ERRLVL|ESCAPE|EXCEPT|EXEC|EXECUTE|EXISTS|EXIT|FETCH|FILE|FILLFACTOR|FOLLOWING|FOR|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GOTO|GRANT|GROUP|HAVING|HOLDLOCK|IDENTITY|IDENTITYCOL|IDENTITY_INSERT|IF|IN|INDEX|INNER|INSERT|INTERSECT|INTO|IS|JOIN|KEY|KILL|LEFT|LIKE|LINENO|LOAD|MATCH|MATCHED|MERGE|NATURAL|NATIONAL|NOCHECK|NONCLUSTERED|NOCYCLE|NOT|NULL|NULLIF|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPENXML|OPTION|OR|ORDER|OUTER|OVER|PARTITION|PERCENT|PIVOT|PLAN|PRECEDING|PRECISION|PRIMARY|PRINT|PROC|PROCEDURE|PUBLIC|RAISERROR|READ|READTEXT|RECONFIGURE|REFERENCES|REPLICATION|RESTORE|RESTRICT|RETURN|REVOKE|RIGHT|ROLLBACK|ROWCOUNT|ROWGUIDCOL|ROWS?|RULE|SAVE|SCHEMA|SELECT|SESSION_USER|SET|SETUSER|SHUTDOWN|SOME|START|STATISTICS|SYSTEM_USER|TABLE|TEXTSIZE|THEN|TO|TOP|TRAN|TRANSACTION|TRIGGER|TRUNCATE|TSEQUAL|UNBOUNDED|UNION|UNIQUE|UNPIVOT|UPDATE|UPDATETEXT|USE|USER|USING|VALUES|VARYING|VIEW|WAITFOR|WHEN|WHERE|WHILE|WITH|WITHIN|WRITETEXT|XML)(?=[^\w-]|$)/i, null],
                                 [PR['PR_TABLENAME'], new RegExp("^(?:" + tablesname.join("|") + ")(?=[^\\w-]|$)", "i")],
                                 [PR['PR_VARIABLE'], /^(?:<%(?:[^\"\\%]|\\.)*%>)/, null],
                                 [PR['PR_LITERAL'], /^[+-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i],
                                 [PR['PR_PLAIN'], /^[a-z_][\w-]*/i],
                                 [PR['PR_PUNCTUATION'], /^[^\w\t\n\r \xA0\"\'][^\w\t\n\r \xA0+\-\"\']*/]
                                ]),
                        ['sql']);
                        $timeout(function () {
                            var text = scope.textControl.val().replace(/\t/g, "    ");
                            scope.printDiv.html(text + "<br />");
                            scope.printDiv.removeClass("prettyprinted");
                            prettyPrint();
                        });
                    });

                    scope.textControl.on('input', function (event) {
                        //保留历史记录功能
                        _historyIndex++;
                        _historyData[_historyIndex] = {
                            id: _historyData.length + 1,
                            text: event.target.value,
                            date: new Date(),
                            selectionStart: event.target.selectionStart,
                            selectionEnd: event.target.selectionEnd
                        };
                        _historyData.splice(_historyIndex + 2, _historyData.length);

                        var p = kingwolfofsky.getInputPositon(event.target);

                        $timeout(function () {
                            var text = scope.textControl.val().replace(/\t/g, "    ");
                            scope.printDiv.html(text + "<br />");
                            scope.printDiv.removeClass("prettyprinted");
                            prettyPrint();

                            var i = -1;
                            scope.dotTableName = "";
                            scope.optionItems.scrollTop(0);
                            if (text[keyIndex - 1] == ".") {
                                scope.isDot = true;
                                for (i = keyIndex - 2 < 0 ? 0 : keyIndex - 2; i >= 0; i--) {
                                    if (splitChar.test(text[i])) {
                                        i++;
                                        break;
                                    }
                                }
                                keyStr = text.substring(i, keyIndex - 1);
                                for (var o = 0; o < _aliasList.length; o++) {
                                    if (_aliasList[o].name == keyStr) {
                                        keyStr = _aliasList[o].tablename;
                                        break;
                                    }
                                }
                                scope.dotTableName = keyStr;
                                keyStartIndex = keyIndex;
                                keyEndIndex = keyIndex;
                                arrs = scope.getFindItems();
                            } else {
                                scope.isDot = false;
                                for (i = keyIndex - 1 < 0 ? 0 : keyIndex - 1; i >= 0; i--) {
                                    if (splitChar.test(text[i])) {
                                        i++;
                                        break;
                                    }
                                }
                                keyStr = text.substring(i, keyIndex);
                                keyStartIndex = i;
                                keyEndIndex = keyIndex;
                                arrs = scope.getFindItems();
                            }
                            if (arrs.length > 0) {
                                $timeout(function () {
                                    scope.selectKeyword = arrs[0];
                                });
                            }
                            scope.openOption = keyStr.length >= 1 && arrs.length > 0;

                            //_tempTable = [];
                            //var tables = element.find(".sql_tablename");
                            //for (var i = 0; i < tables.length; i++) {
                            //    if (tables.eq(i).text().toLowerCase().indexOf("dbo.") === 0) {
                            //        if (_tempTable.indexOf(tables.eq(i).text().substring(4)) >= 0) continue;
                            //        _tempTable.push(tables.eq(i).text().substring(4));
                            //    } else {
                            //        if (_tempTable.indexOf(tables.eq(i).text()) >= 0) continue;
                            //        _tempTable.push(tables.eq(i).text());
                            //    }
                            //}

                            var _temptablenames = element.find(".sql_tablename");
                            for (var i = 0; i < _temptablenames.length; i++) {
                                var _tempTableName = _temptablenames.eq(i).text();
                                if (_tempTableName.toLowerCase().indexOf("dbo.") == 0) _tempTableName = _tempTableName.substring(4);
                                if (_tempTable.indexOf(_tempTableName) == -1) {
                                    _tempTable.push(_tempTableName);
                                    service.getAllColumnName(_tempTableName).then(function (data) {
                                        $timeout(function () {
                                            for (var i = 0; i < data.length; i++) {

                                                scope.menus.push({ id: scope.menus.length + 1, name: data[i].schemaName.toLowerCase(), group: "columnname", text: data[i].schemaName.toLowerCase(), tablename: data[i].viewTableId, type: data[i].type, remark: data[i].name });
                                                _tempColumns.push(scope.menus[scope.menus.length - 1]);
                                            }
                                            //PR['registerLangHandler'](
                                            //    PR['createSimpleLexer'](
                                            //        [
                                            //        ],
                                            //        [
                                            //         [PR['PR_TABLENAME'], new RegExp("^(?:" + _tempColumns.join("|") + ")(?=[^\\w-]|$)", "i")]
                                            //        ]),
                                            //    ['sql']);
                                        });
                                    });
                                }
                                //else {
                                //    for (var o = _tempColumns.length - 1; o >= 0; o--) {
                                //        if (_tempColumns[o].tablename && _tempColumns[o].tablename.toLowerCase() == _tempTableName.toLowerCase()) {
                                //            _tempColumns.splice(o, 1);
                                //        }
                                //    }
                                //}
                            }
                        });


                        for (var i = _aliasList.length - 1; i >= 0; i--) {
                            scope.menus.splice(_aliasList[i].id - 1, 1);
                        }
                        _aliasList = [];
                        //采集别名
                        var aliasReg = new RegExp("((" + _tempTable.join("|") + ")[ ]+(as)?([ ]+)?[a-z0-9_.]+)|([a-z0-9_.]+?[ ]*=[ ]*\\(?[ ]*[a-z0-9_.]+([ ]*\\))?)", "gi");
                        var _aliasRet;
                        var _tempAliasList = [];
                        while ((_aliasRet = aliasReg.exec(scope.ngModel)) != null) {
                            _tempAliasList.push({ text: _aliasRet[0], index: _aliasRet.index, length: _aliasRet.length, aliastype: !!_aliasRet[5] });
                        }
                        for (var i = 0; i < _tempAliasList.length; i++) {
                            if (!_tempAliasList[i].aliastype) {
                                var _aliasName = new RegExp("(" + _tempTable.join("|") + ")(?=[ ]+(as)?([ ]+)?[a-z0-9_.]+)", "gi").exec(_tempAliasList[i].text);
                                if (!!_aliasName) {
                                    var _aliasTxt = _tempAliasList[i].text.substr(_tempAliasList[i].text.lastIndexOf(" ") + 1);
                                    scope.menus.push({
                                        id: scope.menus.length + 1,
                                        aliastype: _tempAliasList[i].aliastype,
                                        text: _aliasTxt,
                                        group: "alias",
                                        name: _aliasTxt,
                                        remark: "业务表别名：",
                                        tablename: _aliasName[0]
                                    });
                                    _aliasList.push(scope.menus[scope.menus.length - 1]);
                                }
                            }
                        }


                        $timeout(function () {
                            if (scope.openOption) {
                                //计算屏幕宽度与提示框宽度
                                var codeSqlLeft = element.offset().left;
                                var optionPointLeft = element.find(".pointDiv").position().left + 10;
                                var optionDivWidth = scope.optionDiv.width();
                                var optionRemarkDivWidth = scope.optionRemarkDiv.width();

                                if ($(document).width() < codeSqlLeft + optionPointLeft + optionDivWidth) {
                                    scope.pX = 2;
                                } else if ($(document).width() < codeSqlLeft + optionPointLeft + optionDivWidth + optionRemarkDivWidth) {
                                    scope.pX = 1;
                                } else {
                                    scope.pX = 0;
                                }
                            }
                        });

                        $timeout(function () {
                            var defaultWidth = scope.optionDiv.width() <= 0 ? 200 : scope.optionDiv.width();
                            switch (scope.pX) {
                                case 0:
                                case 1:
                                    scope.optionDiv.css({
                                        top: p.top + 10,
                                        left: p.left + 5
                                    });
                                    break;
                                case 2:
                                    scope.optionDiv.css({
                                        top: p.top + 10,
                                        left: p.left - defaultWidth
                                    });
                                    break;
                                default:
                            }
                        });
                    });

                    scope.optionItems.on('mousewheel', function (event) {
                        if (event.originalEvent.deltaY > 0) {
                            scope.optionItems.scrollTop(scope.optionItems.scrollTop() + 69);
                        } else {
                            scope.optionItems.scrollTop(scope.optionItems.scrollTop() - 69);
                        }
                        return false;
                    })

                    $timeout(function () {
                        scope.printDiv.html(scope.ngModel);
                        scope.printDiv.removeClass("prettyprinted");
                        prettyPrint();
                    }, 200);

                    var kingwolfofsky = {
                        /**
                        * 获取输入光标在页面中的坐标  
                        * @param        {HTMLElement}   输入框元素          
                        * @return       {Object}        返回left和top,bottom  
                        */
                        getInputPositon: function (elem) {
                            if (document.selection) {   //IE Support  
                                elem.focus();
                                var Sel = document.selection.createRange();
                                return {
                                    left: Sel.boundingLeft,
                                    top: Sel.boundingTop,
                                    bottom: Sel.boundingTop + Sel.boundingHeight
                                };
                            } else {
                                var that = this;
                                var cloneDiv = '{$clone_div}', cloneLeft = '{$cloneLeft}', cloneFocus = '{$cloneFocus}', cloneRight = '{$cloneRight}';
                                var none = '&nbsp;';
                                var div = elem[cloneDiv] || document.createElement('div'),
                                    focus = elem[cloneFocus] || document.createElement('span');
                                var text = elem[cloneLeft] || document.createElement('span');
                                var offset = that._offset(elem),
                                    index = this._getFocus(elem),
                                    focusOffset = { left: 0, top: 0 };

                                if (!elem[cloneDiv]) {
                                    elem[cloneDiv] = div, elem[cloneFocus] = focus;
                                    elem[cloneLeft] = text;
                                    div.appendChild(text);
                                    text.className = "prettyprint linenums lang-sql fm-code-tooltext";
                                    text.style.position = 'static';
                                    text.style.cssText = 'font-family: "courier new","Microsoft YaHei";';
                                    div.appendChild(focus);
                                    element.append(div);
                                    focus.innerHTML = '|';
                                    focus.className = 'pointDiv';
                                    focus.style.cssText = 'position:static;display:inline-block;width:0px;overflow:hidden;z-index:-100;word-wrap:break-word;word-break:break-all;';
                                    div.style.cssText = 'visibility:hidden;display:inline-block;position:absolute;z-index:-100;word-wrap:break-word;word-break:break-all;overflow:hidden;top:4px;left:47px;width:100%;height:100%;line-height:0 !important;';
                                };
                                var strTmp = "<span>" + elem.value.substring(0, index).replace(/</g, '<').replace(/>/g, '>').replace(/\n/g, '</span><br/><span>').replace(/\s/g, none) + "</span>";
                                text.innerHTML = strTmp;

                                try {
                                    //focusOffset = this._offset(focus);
                                } catch (e) { };
                                //focus.style.display = 'none';
                                return {
                                    left: focus.offsetLeft + 42,
                                    top: focus.offsetTop
                                };
                            }
                        },
                        // 获取光标在文本框的位置  
                        _getFocus: function (elem) {
                            var index = 0;
                            if (document.selection) {// IE Support  
                                elem.focus();
                                var Sel = document.selection.createRange();
                                if (elem.nodeName === 'TEXTAREA') {//textarea  
                                    var Sel2 = Sel.duplicate();
                                    Sel2.moveToElementText(elem);
                                    var index = -1;
                                    while (Sel2.inRange(Sel)) {
                                        Sel2.moveStart('character');
                                        index++;
                                    };
                                }
                                else if (elem.nodeName === 'INPUT') {// input  
                                    Sel.moveStart('character', -elem.value.length);
                                    index = Sel.text.length;
                                }
                            }
                            else if (elem.selectionStart || elem.selectionStart == '0') { // Firefox support  
                                index = elem.selectionStart;
                            }
                            return (index);
                        },
                        // 获取元素在页面中位置  
                        _offset: function (elem) {
                            return {
                                left: $(elem).position().left,
                                top: $(elem).position().top,
                                right: $(elem).width(),
                                bottom: $(elem).height()
                            };
                        }
                    };

                    //用鼠标选择项
                    scope.event_selectItemMouseOver = function (event, item) {
                        scope.selectKeyword = item;
                    }

                    //在指定的下标插入文本
                    scope.insertTxt = function (event, insertTxt) {
                        keyEndIndex += insertTxt.length + 1;
                        keyStartIndex = keyEndIndex;
                        keyIndex += insertTxt.length + 1;
                        //在此处插入值
                        scope.ngModel = scope.ngModel.insert(insertTxt, keyEndIndex);
                        scope.printDiv.html(scope.ngModel);
                        scope.printDiv.removeClass("prettyprinted");
                        prettyPrint();
                        scope.selectKeyword = { text: "", groupname: "", name: "", tablename: "" };
                        //scope.textControl[0].focus();
                    }

                    //快速选择项
                    scope.selectItem = function (event, item, insertTxt) {
                        if (!insertTxt) insertTxt = "";
                        //在此处插入值
                        try {
                            if (item.text.indexOf("?") >= 0) {
                                scope.ngModel = scope.ngModel.insert((!item ? "" : item.text.replace("?", "")), keyEndIndex, keyEndIndex - keyStartIndex);
                            } else {
                                scope.ngModel = scope.ngModel.insert((!item ? "" : item.text) + insertTxt, keyEndIndex, keyEndIndex - keyStartIndex);
                            }
                        } catch (e) {
                            console.error(e);
                        }
                        scope.printDiv.html(scope.ngModel);
                        scope.printDiv.removeClass("prettyprinted");
                        prettyPrint();
                        scope.selectKeyword = { text: "", groupname: "", name: "", tablename: "" };

                        scope.textControl[0].focus();
                        $timeout(function () {
                            scope.openOption = false;
                        });
                        $timeout(function () {
                            if (keyStartIndex < 0) keyStartIndex = 0;
                            var _sIndex = item.text.indexOf("?") >= 0 ? item.text.indexOf("?") : (item.text.length + insertTxt.length);
                            if (scope.textControl[0].selectionStart) {//非IE浏览器
                                scope.textControl[0].selectionStart = keyStartIndex + (!item ? 0 : _sIndex);
                                scope.textControl[0].selectionEnd = keyStartIndex + (!item ? 0 : _sIndex);
                            } else {//IE
                                var range = scope.textControl[0].createTextRange();
                                range.move("character", keyStartIndex + (!item ? 0 : _sIndex));
                                range.select();
                            }
                        }, 50);
                    }

                    //鼠标点击
                    scope.event_Mouseclick = function () {
                        scope.isDot = false;
                        var p = kingwolfofsky.getInputPositon(event.target);

                        $timeout(function () {
                            var defaultWidth = scope.optionDiv.width() <= 0 ? 200 : scope.optionDiv.width();
                            switch (scope.pX) {
                                case 0:
                                case 1:
                                    scope.optionDiv.css({
                                        top: p.top + 10,
                                        left: p.left + 5
                                    });
                                    break;
                                case 2:
                                    if (scope.openOption) {
                                        scope.optionDiv.css({
                                            top: p.top + 10,
                                            left: p.left + 5 - defaultWidth
                                        });
                                    }
                                    break;
                                default:
                            }
                        });

                        keyIndex = event.target.selectionStart;
                        var text = scope.ngModel;
                        var i = -1;
                        for (i = keyIndex - 1 < 0 ? 0 : keyIndex - 1; i >= 0; i--) {
                            if (splitChar.test(text[i])) {
                                i++;
                                break;
                            }
                        }
                        keyStartIndex = i;
                        keyEndIndex = keyIndex;
                        keyStr = text.substring(i, keyIndex);
                        scope.openOption = false;
                    }

                    scope.textControl.on('keydown', function (event) {
                        _tempKeyCode = event.keyCode;
                        var arr_index = scope.getIndex(scope.selectKeyword);
                        arrs = scope.getFindItems();
                        if (arr_index == -1) $timeout(function () { scope.selectKeyword = arrs[0]; arr_index = 0; });
                        keyIndex = event.target.selectionStart + 1;
                        if (event.ctrlKey) {
                            switch (event.keyCode) {
                                case 74:
                                    $timeout(function () {
                                        scope.optionItems.scrollTop(0);
                                        scope.openOption = !scope.openOption;
                                    });
                                    return false;
                                case 89:
                                    if (_historyIndex < _historyData.length - 1) {
                                        _historyIndex++;
                                        $timeout(function () {
                                            scope.ngModel = _historyData[_historyIndex].text;
                                            scope.printDiv.html(scope.ngModel);
                                            scope.printDiv.removeClass("prettyprinted");
                                            prettyPrint();
                                        });
                                        $timeout(function () {
                                            event.target.selectionStart = _historyData[_historyIndex].selectionStart;
                                            event.target.selectionEnd = _historyData[_historyIndex].selectionEnd;
                                        });
                                    }
                                    event.returnValue = false;
                                    return false;
                                case 90:
                                    if (_historyIndex > 0) {
                                        _historyIndex--;
                                        $timeout(function () {
                                            scope.ngModel = _historyData[_historyIndex].text;
                                            scope.printDiv.html(scope.ngModel);
                                            scope.printDiv.removeClass("prettyprinted");
                                            prettyPrint();
                                        });
                                        $timeout(function () {
                                            event.target.selectionStart = _historyData[_historyIndex].selectionStart;
                                            event.target.selectionEnd = _historyData[_historyIndex].selectionEnd;
                                        });
                                    }
                                    event.returnValue = false;
                                    return false;
                                default:
                            }
                        }
                        if (event.keyCode == 88 && event.altKey) {
                            var _tempsql = scope.textControl[0].selectionStart < scope.textControl[0].selectionEnd ? scope.ngModel.substring(scope.textControl[0].selectionStart, scope.textControl[0].selectionEnd) : scope.ngModel;
                            _tempsql = _tempsql.replace(/<%LanguageCulture%>/g, "zh-cn").replace(/<%UserId%>/g, appSession.userId);
                            var reg = /<%.*?%>/m;
                            var result = "";
                            do {
                                result = reg.exec(_tempsql);
                                if (result) {
                                    _tempsql = _tempsql.replace(new RegExp(result, "g"), prompt("变量" + result[0] + "的值为："));
                                }
                            }
                            while (result != null)
                            console.info("SQL语句：\n" + _tempsql);
                            service.getSql({ sql: _tempsql }).then(function (data) {
                                console.table(data);
                            });
                            return false;
                        }
                        switch (event.keyCode) {
                            case 8:
                                keyIndex -= 2;
                                return;
                            case 9:
                                if (!scope.openOption) {
                                    scope.insertTxt(event, "    ");
                                    return false;
                                } else {
                                    scope.selectItem(event, arrs[arr_index], " ");
                                    return false;
                                }
                                return;
                            case 13:
                                if (scope.openOption) {
                                    scope.selectItem(event, arrs[arr_index]);
                                    return false;
                                }
                                return;
                                //case 32:
                                //    if (scope.openOption) {
                                //        scope.selectItem(event, arrs[arr_index], " ");
                                //        return false;
                                //    }
                                //    keyIndex++;
                                //    break;
                            case 37:
                                keyIndex = event.target.selectionStart - 1;
                                break;
                            case 39:
                                keyIndex = event.target.selectionStart + 1;
                                break;
                            case 38:
                                if (scope.openOption) {
                                    $timeout(function () {
                                        if (arr_index > 0) {
                                            arr_index--;
                                            $timeout(function () { scope.selectKeyword = arrs[arr_index]; });
                                        } else {
                                            arr_index = arrs.length - 1;
                                            $timeout(function () { scope.selectKeyword = arrs[arrs.length - 1]; });
                                        }
                                        $timeout(function () {
                                            if (scope.optionItems.scrollTop() / 23 > arr_index) {
                                                scope.optionItems.scrollTop(arr_index * 23);
                                            } else if (scope.optionItems.scrollTop() / 23 + 7 < arr_index) {
                                                scope.optionItems.scrollTop((arr_index - 8) * 23);
                                            }
                                        });
                                    });
                                    return false;
                                }
                                return;
                            case 40:
                                if (scope.openOption) {
                                    $timeout(function () {
                                        if (arr_index < arrs.length - 1) {
                                            arr_index++;
                                            $timeout(function () { scope.selectKeyword = arrs[arr_index]; });
                                        } else {
                                            arr_index = 0;
                                            $timeout(function () { scope.selectKeyword = arrs[0]; });
                                        }
                                        $timeout(function () {
                                            if (scope.optionItems.scrollTop() / 23 + 7 < arr_index) {
                                                scope.optionItems.scrollTop((arr_index - 8) * 23);
                                            } else if (scope.optionItems.scrollTop() / 23 > arr_index) {
                                                scope.optionItems.scrollTop(arr_index * 23);
                                            }
                                        });
                                    });
                                    return false;
                                }
                                return;
                            default:
                                return;
                        }
                        $timeout(function () {
                            var text = scope.ngModel;
                            var i = -1;
                            for (i = keyIndex - 1 < 0 ? 0 : keyIndex - 1; i >= 0; i--) {
                                if (splitChar.test(text[i])) {
                                    i++;
                                    break;
                                }
                            }
                            keyStartIndex = i;
                            keyEndIndex = keyIndex;
                            keyStr = text.substring(i, keyIndex);
                            scope.optionItems.scrollTop(0);
                            scope.openOption = keyStr.length >= 1 && arrs.length > 0;
                        });
                        //回车：13 tab：9 退格：8 delete：46 左：37 上：38 右：39 下：40 空格：32
                    });

                    scope.getIndex = function (obj) {
                        if (!obj || obj.id == "") return -1;
                        var _items = scope.getFindItems();
                        if (!_items) return -1;
                        for (var i = 0; i < _items.length; i++) {
                            if (obj.id == _items[i].id) return i;
                        }
                        return -1;
                    }

                    scope.getFindItems = function () {
                        var _items = [];
                        if (scope.isDot) {
                            for (var i = 0; i < _tempColumns.length; i++) {
                                if (scope.dotTableName == _tempColumns[i].tablename) {
                                    _items.push(_tempColumns[i]);
                                }
                            }
                        } else {
                            var _temptext = scope.ngModel.substring(keyStartIndex, keyEndIndex).toLowerCase();
                            if (!_temptext) return [];
                            if (!!scope.menus && scope.menus.length > 0) {
                                for (var i = 0; i < scope.menus.length; i++) {
                                    if ((_tempTable.indexOf(scope.menus[i].tablename) >= 0 && scope.menus[i].group == "columnname" && scope.menus[i].name.toLowerCase().indexOf(_temptext) == 0) || (scope.menus[i].group != "columnname" && scope.menus[i].name.toLowerCase().indexOf(_temptext) == 0)) {
                                        _items.push(scope.menus[i]);
                                    }
                                }
                            }
                        }
                        return _items;
                    }

                    scope.$watch("ngModel", function () {
                        var _temptablenames = element.find(".sql_tablename");
                        for (var i = 0; i < _temptablenames.length; i++) {
                            var _tempTableName = _temptablenames.eq(i).text();
                            if (_tempTableName.toLowerCase().indexOf("dbo.") == 0) _tempTableName = _tempTableName.substring(4);
                            if (_tempTable.indexOf(_tempTableName) == -1) {
                                _tempTable.push(_tempTableName);
                                service.getAllColumnName(_tempTableName).then(function (data) {
                                    $timeout(function () {
                                        for (var i = 0; i < data.length; i++) {

                                            scope.menus.push({ id: scope.menus.length + 1, name: data[i].schemaName.toLowerCase(), group: "columnname", text: data[i].schemaName.toLowerCase(), tablename: data[i].viewTableId, type: data[i].type, remark: data[i].name });
                                            _tempColumns.push(scope.menus[scope.menus.length - 1]);
                                        }
                                        //PR['registerLangHandler'](
                                        //    PR['createSimpleLexer'](
                                        //        [
                                        //        ],
                                        //        [
                                        //         [PR['PR_TABLENAME'], new RegExp("^(?:" + _tempColumns.join("|") + ")(?=[^\\w-]|$)", "i")]
                                        //        ]),
                                        //    ['sql']);
                                    });
                                });
                            }
                            //else {
                            //    for (var o = _tempColumns.length - 1; o >= 0; o--) {
                            //        if (_tempColumns[o].tablename && _tempColumns[o].tablename.toLowerCase() == _tempTableName.toLowerCase()) {
                            //            _tempColumns.splice(o, 1);
                            //        }
                            //    }
                            //}
                        }
                    });
                }
            }
        }
])