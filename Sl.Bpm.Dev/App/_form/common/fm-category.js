_shared
/*复选框/切换框列表指令*/
.directive('fmCategory', [
        'fmTool', 'mabp.app.module', '$timeout', function (fmTool, service, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                template: function (elem, attr) {
                    fmTool.setDefaultMember(attr);
                    if (!attr.name) {
                        attr.name = attr.fmModel.toString().substring(attr.fmModel.lastIndexOf(".") + 1);
                    }
                    return '<div fm-model="' + attr.fmModel + '" class="fm-category" ng-class="state" ids="{{fmModel}}" ng-blur="event_Blur()">' +
                               '<div class="fm-category-group">' +
                                   '<button ng-if="!!items && items.length > 1 && isall" ng-class="{true:\'btn-primary\',false:\'\'}[isCheckAll()]" class="btn btn-sm" ng-click="event_ChangeValueOfAll($event)" >' + L("All") + '&nbsp;<span class="label label-badge">{{allCount}}</span></button>' +
                                   '<button ng-repeat="item in items track by $index" ng-disabled="state == \'disabled\' || state == \'readonly\' || item.' + attr.disabledMember + ' === true" ng-class="{true:\'btn-primary\',false:\'\'}[isChecked(item) || (!!items && items.length == 1)]" class="btn btn-sm" ng-click="event_ChangeValue(item, $event)" >{{item.' + attr.displayMember + '}}&nbsp;<span class="label label-badge">{{item.' + attr.codeMember + '}}</span></button>' +
                               '</div>' +
                           '</div>';
                },
                scope: {
                    fmModel: '=',
                    /*只有在基础数据的时候才会使用，返回基础数据Value*/
                    fmCode: '=',
                    items: '=',
                    selectItem: '=',
                    fmRequired: '=',
                    fmDisabled: '=',
                    fmReadonly: '=',
                    filter: '=',
                    group: '=',
                    allCount: '=',
                    callbackFunc: '&'
                },
                require: '?^fmCache',
                compile: function (tElement, tAttrs, transclude) {
                    return {
                        pre: function preLink(scope, element, attr, ctrl) {
                        },
                        post: function postLink(scope, element, attr, cacheCtrl) {
                            //设置是否展示全部
                            scope.isall = attr.isall !== undefined && attr.isall !== "false" ? true : false;
                            attr.ismulti = attr.ismulti || false;
                            scope.selectItem = [];
                            fmTool.setScopeState(scope, attr, cacheCtrl);

                            fmTool.setDataSource(scope, attr, cacheCtrl);

                            scope.$watch("filter", function (newvalue, oldvalue) {
                                if (!!newvalue && newvalue != oldvalue) {
                                    fmTool.setDataSource(scope, attr);
                                }
                            }, true);

                            scope.isChecked = function (item) {
                                if (scope.items.length == 1)
                                    scope.fmModel = scope.items[0][attr.valueMember];
                                return (!scope.fmModel ? [] : scope.fmModel.split(",")).indexOf(item[attr.valueMember]) >= 0;
                            }

                            scope.isCheckAll = function (item) {
                                if (!scope.fmModel) return true;
                                var isTrue = true;
                                var _ids = !scope.fmModel ? [] : scope.fmModel.split(",");
                                for (var i = 0; i < scope.items.length; i++) {
                                    if (_ids.indexOf(scope.items[i][attr.valueMember]) > -1) {
                                        isTrue = false;
                                        break;
                                    }
                                }
                                return isTrue;
                            }

                            fmTool.setDefaultWatch(attr, scope, element);

                            scope.$watch("fmModel", function (newvalue, oldvalue) {
                                //scope.selectItem = [];
                                if (scope.fmModel !== undefined && !!scope.items) {
                                    var _ids = !scope.fmModel ? [] : scope.fmModel.split(",");
                                    for (var i = 0; i < scope.items.length; i++) {
                                        if (_ids.indexOf(scope.items[i][attr.valueMember]) >= 0) {
                                            scope.selectItem.push(scope.items[i][attr.valueMember]);
                                            break;
                                        }
                                    }
                                    if (attr.codeMember && !!scope.selectItem) {
                                        var _tempCode = [];
                                        for (var i = 0; i < scope.selectItem.length; i++) {
                                            _tempCode.push(scope.selectItem[i][attr.codeMember]);
                                        }
                                        scope.fmCode = _tempCode.join(',');
                                    }
                                    if (scope.isCheckAll()) {
                                        if (scope.isall) {
                                            scope.fmModel = "";
                                        }
                                        else {
                                            if (scope.items.length > 0)
                                                scope.fmModel = scope.items[0][attr.valueMember];
                                            else
                                                scope.fmModel = "";
                                        }
                                    }
                                    if (scope.items.length == 1)
                                        scope.callbackFunc({ selectItem: scope.items[0] });
                                }
                            });

                            scope.$watch("items", function (newvalue, oldvalue) {
                                if (!!scope.items) {
                                    var ids = !!scope.fmModel ? scope.fmModel.split(",") : [];
                                    scope.selectItem = [], _tempCode = [];
                                    scope.allCount = 0;
                                    for (var i = 0; i < scope.items.length; i++) {
                                        scope.allCount += parseInt(scope.items[i][attr.codeMember]);
                                        if (ids.indexOf(scope.items[i][attr.valueMember]) >= 0) {
                                            scope.selectItem.push(scope.items[i]);
                                            _tempCode.push(scope.items[i][attr.codeMember]);
                                        }
                                    }
                                    scope.fmCode = _tempCode.join(',');
                                }
                            }, true);

                            //修改值
                            scope.event_ChangeValue = function (item) {
                                if (attr.ismulti) {
                                    var _ids = !scope.fmModel ? [] : (scope.fmModel || "").split(",");
                                    var _index = _ids.indexOf(item[attr.valueMember]);
                                    if (_index >= 0) _ids.splice(_index, 1);
                                    else _ids.push(item[attr.valueMember]);
                                    scope.fmModel = _ids.join(",");
                                } else {
                                    scope.fmModel = item[attr.valueMember];
                                }
                                console.info(item[attr.displayMember], item[attr.valueMember], item[attr.codeMember]);
                                $timeout(function () {
                                    scope.callbackFunc({ selectItem: item });
                                });
                            }

                            scope.event_ChangeValueOfAll = function () {
                                if (scope.isall) {
                                    scope.fmModel = "";
                                    $timeout(function () {
                                        scope.callbackFunc({ selectItem: { id: "", text: "全部" } });
                                    });
                                }
                                else {
                                    if (scope.items.length > 0)
                                        scope.fmModel = scope.items[0][attr.valueMember];
                                    else
                                        scope.fmModel = "";
                                }
                            }

                            scope.event_Blur = function () {
                                $(element).removeClass("focus");
                            }
                        }
                    }
                }
            }
        }
])