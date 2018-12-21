_shared
/*复选框/切换框列表指令*/
.directive('maSelectUser', [
    '$compile', 'dialog', 'mabp.app.module', '$timeout', function ($compile, dialog, service, $timeout) {
        return {
            restrict: 'EA',
            scope: {
                ngModel: '=',
                users: '=',
                ismulti: '=',
                callbackFunc: '&',
            },
            require: "ngModel",
            compile: function (tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, element, attr, ctrl) {
                    },
                    post: function postLink(scope, element, attr, ctrl) {
                        var isMulti = null;
                        if (attr.ismulti != undefined && attr.ismulti !== "false") {
                            isMulti = true;
                        } else isMulti = false;
                        scope.$watch("ngModel", function (newValue, oldValue, scope) {
                            //if (!scope.maDataSource || scope.maDataSource.length == 0) return;
                            //if (!scope.ngModel) {
                            //    scope.ngModel = "";
                            //    scope.value = "";
                            //    scope.text = "";
                            //}
                            //var _keys = [], _values = [];
                            //for (var i = 0; i < scope.maDataSource.length; i++) {
                            //    if (scope.ngModel.indexOf(scope.maDataSource[i][attr.valueField]) != -1) {
                            //        _keys.push(scope.maDataSource[i][attr.keyField]);
                            //        _values.push(scope.maDataSource[i][attr.valueField]);
                            //    }
                            //}
                            //scope.ngModel = _values.join(',');
                            //scope.value = _values.join(',');
                            //scope.text = _keys.join(',');
                        }, true);

                        scope.$watch("users", function (newValue, oldValue, scope) {
                            if (!!scope.users) {
                                var ids = [], names = [];
                                for (var i = 0; i < scope.users.length; i++) {
                                    ids.push(scope.users[i].id);
                                    names.push(scope.users[i].name);
                                }
                                scope.ngModel = names.join(',');
                                scope.ids = ids;
                            }
                        }, true);

                        element.on("click", function () {
                            dialog.open(_shared.dialogs['maUserSelectDialog'], { ismulti: isMulti, initSelectData: scope.users }).then(function (data) {
                                if (data) {
                                    scope.users = data;
                                    $timeout(function () {
                                        scope.callbackFunc({ selectItem: data });
                                    }, 0);
                                }
                            });
                        });
                    }
                }
            }
        }
    }
])