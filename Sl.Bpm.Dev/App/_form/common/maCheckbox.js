_shared
/*复选框/切换框指令*/
.directive('maCheckbox', [
        '$compile', function ($compile) {
            return {
                restrict: 'E',
                replace: true,
                template: function () {
                    return '<div class="ma-checkbox" {{disabled}} ng-click="toggle()"><span class="dot"></span></div>';
                },
                scope: {
                    ngModel: '=',
                    disabled: '='
                },
                require: "ngModel",
                link: function (scope, element, attr, ctrl) {
                    scope.$watch('ngModel', function (newValue, oldValue) {
                        scope.enable = scope.newValue || false;
                        if (scope.ngModel === true) {
                            element.addClass("on");
                        } else {
                            element.removeClass("on");
                        }
                    });
                    scope.toggle = function () {
                        if (attr.disabled != undefined && attr.disabled !== "false") return;
                        if (element.hasClass("on")) {
                            scope.enable = false;
                            element.removeClass("on");
                        } else {
                            scope.enable = true;
                            element.addClass("on");
                        }
                        ctrl.$setViewValue(scope.enable);
                    }
                }
            }
        }
])