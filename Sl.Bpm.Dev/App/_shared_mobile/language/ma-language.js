/*ng-model
  language-list
  ma-blur
*/
_shared.directive("maLanguage", ['$compile', 'mabp.app.system', function ($compile, service) {
    return {
        restrict: 'E',
        replace: true,
        template: function (element, attr) {
            var required = "";
            var disabled = attr.disabled != undefined && attr.disabled !== "false" ? true : false;
            if (attr.maRequired != null) {
                required = "ma-dynamic-element required";
            }
            var inputStr = '';
            if (attr.type === "textarea") {
                inputStr = '<textarea ng-disabled="maDisabled" ' + (disabled ? 'disabled="disabled"' : '') + ' type="text" rows="3" name="{2}{3}" ng-model="{1}" class="validate ma-lang-content-item" ng-focus="event_Focus($event)" ng-blur="event_Blur($event)" ' + required + ' placeholder="{0}"/>';
            } else {
                inputStr = '<input ng-disabled="maDisabled" ' + (disabled ? 'disabled="disabled"' : '') + ' type="text" name="{2}{3}" ng-model="{1}" class="validate ma-lang-content-item" ng-focus="event_Focus($event)" ng-blur="event_Blur($event)" ' + required + ' placeholder="{0}" />';
            }
            var defineLanguages = [{ text: "中文", id: "zh-CN" }, { text: "English", id: "en" }];
            var newHtml_content = "";
            for (var i = 0; i < defineLanguages.length; i++) {
                var lang = defineLanguages[i];
                newHtml_content += '<tr><td class="ma-lang-label"><span class="ma-lang-label-item">' + lang.text + '</span></td><td class="ma-lang-content">' + inputStr.fill(lang.text, "languages['" + lang.id + "']", attr.name, lang.id) + '</td></tr>';
            }
            return '<table ' + (disabled ? 'disabled="disabled"' : '') + ' ' + (attr.type || "") + ' class="ma-lang">' + newHtml_content + '</table>';
        },
        require: "ngModel",
        scope: {
            ngModel: '=',
            languageList: '=',
            maDisabled: '='
        },
        link: function (scope, element, attr, ctrl) {
            scope.languages = { 'zh-CN': '', 'en': '' };
            scope.languageList = [];
            scope.$watch("ngModel", function (newValue, oldValue) {
                service.getLangs({ id: newValue }).then(function (result) {
                    if (result == null) {
                        scope.languages = { 'zh-CN': null, 'en': null };
                        scope.languageList = [];
                        return;
                    }
                    var nameValues = result.nameValues;
                    for (var j = 0; j < nameValues.length; j++) {
                        scope.languages[nameValues[j].name] = nameValues[j].value;
                    }
                    scope.languageList = nameValues;
                });
            });
            //No matter hav value or not need bind the data source;
            scope.$watch("languages", function (newValue, oldValue) {
                scope.languageList = scope.languageList || [];
                var j = 0;
                for (var i in newValue) {
                    if (newValue.hasOwnProperty(i)) {
                        scope.languageList[j] = { name: i, value: newValue[i] };
                        j++;
                    }
                }
            }, true);

            scope.$watch("languageList", function (newValue, oldValue) {
                scope.languageList = scope.languageList || [];
                var a = mabp.toObject(scope.languageList);
                scope.languages = { 'zh-CN': a['zh-CN'], 'en': a['en'] };
            }, true);

            scope.event_Focus = function (event) {
                $(event.currentTarget).parents("tr").addClass("active");
            }

            scope.event_Blur = function (event) {
                scope.$parent.$eval(attr.maBlur);
                $(event.currentTarget).parents("tr").removeClass("active");

            }
        }
    }
}]
);

_shared.directive("maTextLanguage", ['$compile', 'mabp.app.system', function ($compile, service) {
    return {
        restrict: 'E',
        replace: true,
        template: function (element, attr) {
            var required = "";
            var disabled = attr.disabled != undefined && attr.disabled !== "false" ? true : false;
            if (attr.maRequired != null) {
                required = "ma-dynamic-element required";
            }
            var inputStr = '';
            if (attr.type === "textarea") {
                inputStr = '<textarea ng-disabled="maDisabled" ' + (disabled ? 'disabled="disabled"' : '') + ' type="text" rows="3" name="{2}{3}" ng-model="{1}" class="validate ma-lang-content-item" ng-focus="event_Focus($event)" ng-blur="event_Blur($event)" ' + required + ' placeholder="{0}"/>';
            } else {
                inputStr = '<input ng-disabled="maDisabled" ' + (disabled ? 'disabled="disabled"' : '') + ' type="text" name="{2}{3}" ng-model="{1}" class="validate ma-lang-content-item" ng-focus="event_Focus($event)" ng-blur="event_Blur($event)" ' + required + ' placeholder="{0}" />';
            }
            var defineLanguages = [{ text: "中文", id: "zh-CN" }, { text: "English", id: "en" }];
            var newHtml_content = "";
            for (var i = 0; i < defineLanguages.length; i++) {
                var lang = defineLanguages[i];
                newHtml_content += '<tr><td class="ma-lang-label"><span class="ma-lang-label-item">' + lang.text + '</span></td><td class="ma-lang-content">' + inputStr.fill(lang.text, "languages['" + lang.id + "']", attr.name, lang.id) + '</td></tr>';
            }
            return '<table ' + (disabled ? 'disabled="disabled"' : '') + ' ' + (attr.type || "") + ' class="ma-lang">' + newHtml_content + '</table>';
        },
        require: "ngModel",
        scope: {
            ngModel: '=',
            languageList: '=',
            maDisabled: '='
        },
        link: function (scope, element, attr, ctrl) {
            scope.languages = { 'zh-CN': '', 'en': '' };
            scope.languageList = [];
            scope.$watch("ngModel", function (newValue, oldValue) {
                service.getTextLangs({ id: newValue }).then(function (result) {
                    if (result == null) {
                        scope.languages = { 'zh-CN': null, 'en': null };
                        scope.languageList = [];
                        return;
                    }
                    var nameValues = result.nameValues;
                    for (var j = 0; j < nameValues.length; j++) {
                        scope.languages[nameValues[j].name] = nameValues[j].value;
                    }
                    scope.languageList = nameValues;
                });
            });
            //No matter hav value or not need bind the data source;
            scope.$watch("languages", function (newValue, oldValue) {
                scope.languageList = scope.languageList || [];
                var j = 0;
                for (var i in newValue) {
                    if (newValue.hasOwnProperty(i)) {
                        scope.languageList[j] = { name: i, value: newValue[i] };
                        j++;
                    }
                }
            }, true);

            scope.$watch("languageList", function (newValue, oldValue) {
                scope.languageList = scope.languageList || [];
                var a = mabp.toObject(scope.languageList);
                scope.languages = { 'zh-CN': a['zh-CN'], 'en': a['en'] };
            }, true);

            scope.event_Focus = function (event) {
                $(event.currentTarget).parents("tr").addClass("active");
            }

            scope.event_Blur = function (event) {
                scope.$parent.$eval(attr.maBlur);
                $(event.currentTarget).parents("tr").removeClass("active");
            }
        }
    }
}]
);

_shared.directive("maInformLanguage", ['$compile', 'mabp.app.system', 'dialog', function ($compile, service, dialog) {
    return {
        restrict: 'EAC',
        replace: true,
        template: function (element, attr) {
            var required = "";
            var disabled = attr.disabled != undefined && attr.disabled !== "false" ? true : false;
            if (attr.maRequired != null) {
                required = "ma-dynamic-element required";
            }
            var inputStr = '';
            if (attr.type === "textarea") {
                inputStr = '<textarea ng-disabled="maDisabled" ' + (disabled ? 'disabled="disabled"' : '') + ' type="text" rows="3" name="{2}{3}" ng-model="{1}" class="validate ma-lang-content-item" ng-focus="event_Focus($event)" ng-blur="event_Blur($event)" ' + required + ' placeholder="{0}"/>';
            } else {
                inputStr = '<input ng-disabled="maDisabled" ' + (disabled ? 'disabled="disabled"' : '') + ' type="text" name="{2}{3}" ng-model="{1}" class="validate ma-lang-content-item" ng-focus="event_Focus($event)" ng-blur="event_Blur($event)" ' + required + ' placeholder="{0}" />';
            }
            //var defineLanguages = [{ text: "中文", id: "zh-CN" }, { text: "English", id: "en" }];
            var newHtml_content = "";
            //for (var i = 0; i < defineLanguages.length; i++) {
            //    var lang = defineLanguages[i];
            newHtml_content += '<tr ng-repeat="lang in defineLanguages ">' +
                    '<td class="ma-lang-label">' +
                    '<span class="ma-lang-label-item">{{lang.text}}</span>' +
                    '</td>' +
                    '<td class="ma-lang-content input-group">' + inputStr.fill('{{lang.text}}', "languages[lang.id]", attr.name, '{{lang.id}}') +
                    '<span class="input-group-addon btn" ng-click="openColumn(lang.id)">+字段</span>' +
                    //'<span class="input-group-addon btn" ng-click="watch(lang.id)">+查看</span>' +
                    '</td>' +
                    '</tr>';
            //}
            return '<table ' + (disabled ? 'disabled="disabled"' : '') + ' ' + (attr.type || "") + ' class="ma-lang">' + newHtml_content + '</table>';
        },
        require: "ngModel",
        scope: {
            defineLanguages: '=',
            ngModel: '=',
            languageList: '=',
            maDisabled: '=',
            item: '='
        },
        compile: function (tElement, tAttrs, transclude) {
            return {
                pre: function preLink(scope, element, attr, ctrl) {
                    scope.defineLanguages = [{ text: "中文", id: "zh-CN" }, { text: "English", id: "en" }];
                    scope.languages = { 'zh-CN': '', 'en': '' };
                    scope.languageList = [];
                },
                post: function postLink(scope, element, attr, ctrl) {

                    scope.$watch("ngModel", function (newValue, oldValue) {
                        service.getTextLangs({ id: newValue }).then(function (result) {
                            if (result == null) {
                                scope.languages = { 'zh-CN': null, 'en': null };
                                scope.languageList = [];
                                return;
                            }
                            var nameValues = result.nameValues;
                            for (var j = 0; j < nameValues.length; j++) {
                                scope.languages[nameValues[j].name] = nameValues[j].value;
                            }
                            scope.languageList = nameValues;
                        });
                    });

                    scope.$watch("languages", function (newValue, oldValue) {
                        scope.languageList = scope.languageList || [];
                        var j = 0;
                        for (var i in newValue) {
                            if (newValue.hasOwnProperty(i)) {
                                scope.languageList[j] = { name: i, value: newValue[i] };
                                j++;
                            }
                        }
                    }, true);

                    scope.event_Focus = function (event) {
                        $(event.currentTarget).parents("tr").addClass("active");
                    }

                    scope.event_Blur = function (event) {
                        scope.$parent.$eval(attr.maBlur);
                        $(event.currentTarget).parents("tr").removeClass("active");
                    }

                    scope.openColumn = function (i) {
                        console.log(i);
                        dialog.open(_shared.dialogs.formColumn, scope.item).then(function (data) {
                            if (!!data) {
                                console.log(scope.languages);
                                _.forEach(scope.languageList, function (item) {
                                    if (item.name == i) {
                                        item.value = (item.value || "") + "<%" + data.schemaName + "." + data.c_SchemaName + "%>";
                                        scope.languages[i] = item.value;
                                    }
                                });
                            }
                        });
                    }

                    scope.watch = function (m) {
                        console.log("暂未实现");
                    }

                }
            }
        }

    }
}]
);
