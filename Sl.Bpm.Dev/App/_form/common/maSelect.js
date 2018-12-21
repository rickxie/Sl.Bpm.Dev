_shared
/*下拉列表指令*/
.directive("maSelect", ['dialog', '$timeout', '$compile', 'mabp.app.module', function (dialog, $timeout, $compile, service) {
    return {
        restrict: 'E',
        replace: true,
        require: "ngModel",
        template: function (elem, attr) {
            return "<div></div>";
        },
        scope: {
            items: '=',
            selectItem: '=',
            selectValue: '=',
            ngModel: '=',
            selectText: '=',
            isOpen: '=',
            findText: '=',
            datacode: '=',
            callbackFunc: '&'
        },
        compile: function (tElement, tAttrs, transclude) {
            return {
                pre: function preLink(scope, element, attr, ctrl) {
                },
                post: function postLink(scope, element, attr, ctrl) {
                    if (!attr.displayMember) attr.displayMember = "text";
                    if (!attr.valueMember) attr.valueMember = "id";
                    //设置单选/多选
                    if (attr.ismulti != undefined && attr.ismulti !== "false" && scope.ismulti === undefined) {
                        scope.ismulti = true;
                    } else scope.ismulti = false;
                    //设置可空
                    if (attr.isnull == undefined) isnull = true;
                    else isnull = attr.isnull != undefined && attr.isnull != "false";

                    attr.pageState = $(".fm-content").attr("page-state");
                    var _tempState = null;
                    //页面状态
                    if (!!attr.pageState) {
                        switch ("" + attr.pageState) {
                            case "1": //发起
                                _tempState = "normal";
                                break;
                            case "2": //审批
                                _tempState = "disabled";
                                break;
                            case "3": //查看
                                _tempState = "readonly";
                                break;
                            default:
                        }
                    }
                    //控件状态
                    scope.state = (scope.state === undefined || !!attr.state) ? attr.state : scope.state;
                    if (attr.readonly !== undefined && attr.readonly != "false") scope.state = "readonly";
                    else if (attr.disabled !== undefined && attr.disabled != "false") scope.state = "disabled";
                    else if (attr.hidden !== undefined && attr.hidden != "false") scope.state = "hidden";
                    else if (attr.normal !== undefined && attr.normal != "false") scope.state = "normal";
                    else if (!scope.state) scope.state = _tempState || "normal";

                    //设置数据源
                    scope.datatype = scope.datatype === undefined && !!attr.datatype ? attr.datatype : scope.datatype;
                    if (!scope.datatype) scope.datatype = "source";
                    if (attr.view !== undefined && attr.view != "false") {
                        scope.datatype = "view";
                        if (!!attr.view) scope.datacode = attr.view;
                    }
                    else if (attr.source !== undefined && attr.source != "false") scope.datatype = "source";
                    else if (attr.dataitem !== undefined && attr.dataitem != "false") {
                        scope.datatype = "dataitem";
                        if (!!attr.dataitem) scope.datacode = attr.dataitem;
                    }

                    scope.$watch("datacode", function (newvalue, oldvalue) {
                        if (newvalue != oldvalue && !!newvalue && !!oldvalue) {
                            scope.selectItem = null;
                            scope.ngModel = null;
                            scope.selectText = "";
                        }
                        var _dataCode = scope.datacode;
                        if (!!attr.datacodeFormat) {
                            _dataCode = attr.datacodeFormat.fill(scope.datacode);
                        }
                        switch (scope.datatype) {
                            case "source":
                                break;
                            case "view":
                                service.getViewTable({ code: _dataCode }).then(function (data) {
                                    if (!!data) {
                                        var _obj = {};
                                        for (var i = 0; i < data.displayColumList.length; i++) {
                                            data.displayColumList[i].displayColumn = data.displayColumList[i].displayColumn.substring(0, 1).toLowerCase() + data.displayColumList[i].displayColumn.substring(1);
                                            _obj[data.displayColumList[i].displayColumn] = data.displayColumList[i].name;
                                        }
                                        scope.items = data;
                                    }
                                });
                                break;
                            case "dataitem":
                                service.getBasicData({ code: _dataCode }).then(function (data) {
                                    if (!!data) {
                                        scope.items = data.data;
                                    }
                                });
                                break;
                            default:
                        }
                    });

                    switch (scope.datatype) {
                        case "source":
                            break;
                        case "view":
                            service.getViewTable({ code: scope.datacode }).then(function (data) {
                                if (!!data) {
                                    var _obj = {};
                                    for (var i = 0; i < data.displayColumList.length; i++) {
                                        data.displayColumList[i].displayColumn = data.displayColumList[i].displayColumn.substring(0, 1).toLowerCase() + data.displayColumList[i].displayColumn.substring(1);
                                        _obj[data.displayColumList[i].displayColumn] = data.displayColumList[i].name;
                                    }
                                    scope.items = data;
                                }
                            });
                            break;
                        case "dataitem":
                            service.getBasicData({ code: scope.datacode }).then(function (data) {
                                if (!!data) {
                                    scope.items = data.data;
                                }
                            });
                            break;
                        default:
                    }

                    var cpldom = null;
                    if (scope.ismulti) {
                        cpldom = $compile(
                            '<div tabindex="-1" class="ma-select multi ' + attr.class + '" ' + scope.state + ' ng-class="{\'zeroitem\':!hasItem()}" ng-mousedown="openSelect($event)" ng-blur="blur()" ng-focus="focus()" title="{{selectText}}">' +
                            (!!attr.placeholder ? '<div class="placeholder" ng-class="{\'hide\':!!ngModel}">' + attr.placeholder + '</div>' : '') +
                            '<div class="select-value">' +
                                '<div class="item" ng-repeat="item in selectItem" ng-mousedown="event_SelectItem(item, $event)">{{item.' + attr.displayMember + '}}</div>' +
                            '</div>' +
                            '<div class="option" title="">' +
                                '<input ng-hide="!hasItem(15)" type="text" placeholder="Select" ng-model="findText" ng-mousedown="stopPropagation($event)" />' +
                                '<div class="option-item">' +
                                    '<ul>' +
                                        '<li ng-mousedown="event_SelectItem(item, $event)" class="{{isCheck(item)?\'active\':\'\'}}" ng-repeat="item in selectFilter(items)">{{item.' + attr.displayMember + '}}</li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div></div>')(scope);
                    } else {
                        if (attr.isnull == undefined) isnull = false;
                        else isnull = attr.isnull != "false";
                        cpldom = $compile('<div tabindex="-1" class="ma-select single ' + attr.class + '" ' + scope.state + ' ng-class="{\'zeroitem\':!hasItem()}" ng-mousedown="openSelect($event)" ng-blur="blur()" ng-focus="focus()" title="{{selectText}}">' +
                                (!!attr.placeholder ? '<div class="placeholder" ng-class="{\'hide\':!!selectItem}">' + attr.placeholder + '</div>' : '') +
                                '<div class="select-value">' +
                                        '<div class="item">{{selectItem.' + attr.displayMember + '}}' + (isnull ? '<i class="remove icon-times" ng-mousedown="clear($event)"></i>' : '') + '</div>' +
                                '</div>' +
                                '<div class="option" title="">' +
                                        '<input ng-hide="!hasItem(15)" type="text" placeholder="Select" ng-model="findText" ng-mousedown="stopPropagation($event)" />' +
                                    '<div class="option-item">' +
                                        '<ul>' +
                                                '<li ng-mousedown="event_SelectItem(item, $event)" class="{{isCheck(item)?\'active\':\'\'}}" ng-repeat="item in selectFilter(items)">{{item.' + attr.displayMember + '}}</li>' +
                                        '</ul>' +
                                    '</div>' +
                                '</div>' +
                            '</div>')(scope);
                    }
                    element.after(cpldom);
                    element.remove();
                    element = cpldom;

                    var maxsize = 0;
                    var option = element.find(".option");
                    scope.selectValue = null;
                    if (scope.ismulti) scope.selectItem = [];
                    else scope.selectItem = null;
                    scope.isShow = false;


                    scope.$watch("items", function (newvalue, oldvalue) {
                        maxsize = 0;
                        if (!!newvalue) {
                            switch (scope.items.constructor) {
                                case Array:
                                    for (var i = 0; i < scope.items.length; i++) {
                                        if (!!scope.items[i][attr.displayMember] && scope.items[i][attr.displayMember].length > maxsize) maxsize = scope.items[i][attr.displayMember].length;
                                    }
                                    break;
                                case Object:
                                    for (item in scope.items) {
                                        if (!!scope.items[item][attr.displayMember] && scope.items[item][attr.displayMember].length > maxsize) maxsize = scope.items[item][attr.displayMember].length;
                                    }
                                    break;
                            }
                            option.css("width", (maxsize + 3) + "em");
                        }

                        if (!!newvalue && (!!scope.ngModel || scope.ngModel === 0)) {
                            var _tempvalue = scope.ngModel.toString().split(",");
                            var _tempItem = [], _tempText = [], _tempValue = [];
                            var _isOk = true;
                            switch (scope.items.constructor) {
                                case Array:
                                    if (scope.ismulti) {
                                        for (var i = 0; i < scope.items.length; i++) {
                                            if (_tempvalue.indexOf(scope.items[i][attr.valueMember]) >= 0) {
                                                _tempItem.push(scope.items[i]);
                                                _tempText.push(scope.items[i][attr.displayMember]);
                                                _tempValue.push(scope.items[i][attr.valueMember]);
                                            }
                                        }
                                        scope.selectItem = _tempItem;
                                        scope.selectText = _tempText.join(",");
                                        scope.selectValue = _tempValue.join(",");
                                    } else {
                                        for (var i = 0; i < scope.items.length; i++) {
                                            if (_isOk && _tempvalue.indexOf(scope.items[i][attr.valueMember]) >= 0) {
                                                scope.selectItem = scope.items[i];
                                                scope.selectText = scope.items[i][attr.displayMember];
                                                scope.selectValue = scope.items[i][attr.valueMember];
                                                _isOk = false;
                                                //break;
                                            }
                                        }
                                    }
                                    break;
                                case Object:
                                    if (scope.ismulti) {
                                        for (item in scope.items) {
                                            if (_tempvalue.indexOf(scope.items[item][attr.valueMember]) >= 0) {
                                                _tempItem.push(scope.items[item]);
                                                _tempText.push(scope.items[item][attr.displayMember]);
                                                _tempValue.push(scope.items[item][attr.valueMember]);
                                            }
                                        }
                                        scope.selectItem = _tempItem;
                                        scope.selectText = _tempText.join(",");
                                        scope.selectValue = _tempValue.join(",");
                                    } else {
                                        for (item in scope.items) {
                                            if (_isOk && _tempvalue.indexOf(scope.items[item][attr.valueMember]) >= 0) {
                                                scope.selectItem = scope.items[item];
                                                scope.selectText = scope.items[item][attr.displayMember];
                                                scope.selectValue = scope.items[item][attr.valueMember];
                                                _isOk = true;
                                                //break;
                                            }
                                        }
                                    }
                                    break;
                            }
                        }
                    }, true);

                    scope.$watch("ngModel", function (newvalue, oldvalue) {
                        if (!!scope.items && (!!newvalue || newvalue === 0)) {
                            if (scope.ismulti) {
                                var _tempValue = newvalue.split(",");
                                var _tempText = [], _tempItem = [];
                                switch (scope.items.constructor) {
                                    case Array:
                                        for (var i = 0; i < scope.items.length; i++) {
                                            if (_tempValue.indexOf(scope.items[i][attr.valueMember]) >= 0) {
                                                _tempText.push(scope.items[i][attr.displayMember]);
                                                _tempItem.push(scope.items[i]);
                                            }
                                        }
                                        break;
                                    case Object:
                                        for (var item in scope.items) {
                                            if (_tempValue.indexOf(scope.items[item][attr.valueMember]) >= 0) {
                                                _tempText.push(scope.items[item][attr.displayMember]);
                                                _tempItem.push(scope.items[item]);
                                            }
                                        }
                                        break;
                                    default:
                                }
                                scope.selectItem = _tempItem;
                                scope.selectText = _tempText.join(",");
                            } else {
                                switch (scope.items.constructor) {
                                    case Array:
                                        for (var i = 0; i < scope.items.length; i++) {
                                            if (scope.items[i][attr.valueMember] == newvalue) {
                                                scope.selectText = scope.items[i][attr.displayMember];
                                                scope.selectItem = scope.items[i];
                                                break;
                                            }
                                        }
                                        break;
                                    case Object:
                                        for (var item in scope.items) {
                                            if (scope.items[item][attr.valueMember] == newvalue) {
                                                scope.selectText = scope.items[item][attr.displayMember];
                                                scope.selectItem = scope.items[item];
                                                break;
                                            }
                                        }
                                        break;
                                    default:
                                }
                            }
                        } else {
                            if (scope.ismulti) {
                                scope.selectItem = [];
                                scope.selectText = "";
                            } else {
                                scope.selectItem = null;
                                scope.selectText = "";
                            }
                        }
                    });

                    //判断是否包含多个项（大于5个时显示文本框
                    scope.hasItem = function (num) {
                        if (!num) num = 0;
                        return !!scope.items && (scope.items.length > num || Object.keys(scope.items).length > num);
                    }

                    scope.documentClick = function (event) {
                        if (event == event) {
                            //绑定后解绑事件
                            angular.element(document).off('mousedown', scope.documentClick);
                            if (scope.isOpen) {
                                //重点是用$timeout保证变量同步修改
                                $timeout(function () {
                                    scope.setOpen(false);
                                }, 0);
                            }
                        }
                    }

                    //停止冒泡
                    scope.stopPropagation = function (event) {
                        //scope.isOpen = true;
                        event.stopPropagation();
                    }
                    //点击控件展开/收缩
                    scope.openSelect = function (event) {
                        if (scope.state == "normal") {
                            scope.setOpen(!scope.isOpen);
                            if (scope.isOpen) {
                                angular.element(document).on('mousedown', scope.documentClick);
                            }
                            scope.TopOrBottom();
                        }
                        event.stopPropagation();
                    }

                    scope.setOpen = function (bo) {
                        if (scope.state == "normal") {
                            scope.isOpen = bo;
                            if (bo) element.addClass("open");
                            else element.removeClass("open");
                        }
                    }

                    scope.TopOrBottom = function () {
                        if (option.offset().top + option.height() > $(document).height()) {
                            option.css({
                                top: (option.height() * -1 - 10) + "px",
                                boxShadow: "0 -3px 12px rgba(0,0,0,0.175)"
                            });
                        } else {
                            option.css({
                                top: "",
                                boxShadow: ""
                            });
                        }
                    }

                    scope.blur = function () {
                        $timeout(function () {
                            if (!element.is(":focus") && !element.find("[type=text]").is(":focus")) {
                                scope.setOpen(false);
                            }
                        }, 100);
                    }
                    scope.focus = function () {
                        $timeout(function () {
                            element.find("[type=text]").focus();
                        }, 100);
                    }

                    //判断是否已选中
                    scope.isCheck = function (item) {
                        if (!scope.selectItem) return false;
                        if (scope.ismulti) {
                            for (var i = 0; i < scope.selectItem.length; i++) {
                                if (scope.selectItem[i][attr.valueMember] == item[attr.valueMember]) {
                                    return true;
                                }
                            }
                        } else if (!!scope.selectItem) return item[attr.valueMember] == scope.selectItem[attr.valueMember];
                        return false;
                    }
                    //清空所有选中项（暂时只有单选框用
                    scope.clear = function (event) {
                        if (scope.ismulti) {
                            scope.selectItem = [];
                            scope.selectText = "";
                            scope.selectValue = null;
                        } else {
                            scope.selectItem = null;
                            scope.selectText = "";
                            scope.selectValue = null;
                        }
                        ctrl.$setViewValue(scope.selectValue);
                        event.stopPropagation();
                    }
                    //选择节点事件
                    scope.event_SelectItem = function (item, event) {
                        var _tempvalue = "";
                        var _tempItem = null;
                        if (scope.state == "normal") {
                            //判断是否为多选框
                            if (scope.ismulti) {
                                if (!scope.selectValue) {
                                    scope.selectValue = item[attr.valueMember];
                                    event.stopPropagation();
                                    ctrl.$setViewValue(scope.selectValue);
                                    _tempItem = { id: item[attr.valueMember], text: item[attr.displayMember] };
                                    $timeout(function () {
                                        scope.callbackFunc({ selectItem: _tempItem, currentItem: _tempItem });
                                    }, 0);
                                    return;
                                }
                                var _tempvalue = scope.selectValue.split(",");
                                var index = _tempvalue.indexOf(item[attr.valueMember]);
                                if (index >= 0) {
                                    _tempvalue.splice(index, 1);
                                } else {
                                    _tempvalue.push(item[attr.valueMember]);
                                }
                                scope.selectValue = _tempvalue.join(",");
                                event.stopPropagation();
                                element.focus();
                            } else {
                                _tempItem = { id: item[attr.valueMember], text: item[attr.displayMember] };
                                scope.selectValue = item[attr.valueMember];
                                scope.findText = "";
                            }
                            ctrl.$setViewValue(scope.selectValue);
                            _tempItem = { id: item[attr.valueMember], text: item[attr.displayMember] };
                            $timeout(function () {
                                scope.callbackFunc({ selectItem: scope.selectItem, currentItem: _tempItem });
                            }, 0);
                        }
                    }
                    //筛选器
                    scope.selectFilter = function () {
                        if (!scope.findText) {
                            return scope.items;
                        } else {
                            var arr = [];
                            switch (scope.items.constructor) {
                                case Array:
                                    for (var i = 0; i < scope.items.length; i++) {
                                        if (scope.items[i][attr.displayMember].toLowerCase().indexOf(scope.findText.toLowerCase()) >= 0) {
                                            arr.push(scope.items[i]);
                                        }
                                    }
                                    break;
                                case Object:
                                    for (var item in scope.items) {
                                        if (scope.items[item][attr.displayMember].toLowerCase().indexOf(scope.findText.toLowerCase()) >= 0) {
                                            arr.push(scope.items[item]);
                                        }
                                    }
                                    break;
                            }
                            return arr;
                        }
                    }
                }
            }
            return postLink();
        }
    }
}])