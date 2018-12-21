/// <reference path="miniAbp.js" />

//依赖 [zui组件, PNotify]
// ReSharper disable once NativeTypePrototypeExtending
//fill the string {0} , {1} with paramether[]
String.prototype.fill = function () {
    var str = this;
    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "g");
        if (arguments[i] != null) {
            str = str.replace(reg, arguments[i]);
        } else {
            str = str.replace(reg, "");
        }
    }
    return str;
};
String.prototype.upperFirst = function () {
    return this.replace(/^(\w)/, function ($1) { return $1.toUpperCase(); });
};

String.prototype.lowerFirst = function () {
    return this.replace(/^(\w)/, function ($1) { return $1.toLowerCase(); });
};

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 获取指定精度的数字（四舍五入）
Number.prototype.getPrecision = function (len) {
    if (len > 0) {
        return parseInt(Math.round((this * Math.pow(10, len)).toFixed(len), 0)) / Math.pow(10, len);
    } else {
        return Math.round(this);
    }
}
//给数字补小数位并返回字符串（强制精确到len小数位）
Number.prototype.pushZero = function (len) {
    len = parseInt(len);
    var result = this.getPrecision(len);
    if (len <= 0) {
        return '' + result;
    } else if (('' + result).lastIndexOf(".") == -1 && len > 0) {
        return '' + result + '.' + Array(len + 1).join("0");
    } else {
        var precisionLength = ('' + result).length - ('' + result).lastIndexOf(".") - 1;
        return '' + result + Array(len - precisionLength + 1).join(0);
    }
}

// Ajax 文件下载
jQuery.download = function (url, data, method) {
    // 获取url和data
    if (url) {
        var inputs = '';
        if (data) {
            var parm = escape(JSON.stringify(data));
            // data 是 string 或者 array/object
            //            data = typeof data == 'string' ? data : decodeURIComponent(jQuery.param(data));;
            // 把参数组装成 form的  input
            //            jQuery.each(data.split('&'), function() {
            //                var pair = this.split('=');
            inputs += '<input type="hidden" name="' + 'para' + '" value="' + parm + '" />';
            //            });
        }
        // request发送请求
        jQuery('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>')
            .appendTo('body').submit().remove();
    };
};

var mabp = angular.module('mabp', ['w5c.validator',
    'mgcrea.ngStrap',
    'mgcrea.ngStrap.modal',
    'mgcrea.ngStrap.aside',
    'mgcrea.ngStrap.tooltip'

]);

mabp.appPath = '/';
//alert
(function () {
    PNotify.prototype.options.delay = 2000;
    function showNotify(content, title, type) {

        var config = { icon: 'bell' };
        //info,danger,success,warning,important,special

        //error ,info ,success ,warning
        switch (type) {
            case "error":
                config.icon = "bell";
                config.type = "default";
                break;
            case "info":
                config.icon = "info-sign";
                config.type = "info";
                break;
            case "warning":
                config.icon = "warning-sign";
                config.type = "warning";
                break;
            case "success":
                config.icon = "check-circle-o";
                config.type = "success";
                break;
            case "danger":
                config.icon = "info-sign";
                config.type = "danger";
                break;
        }

        new $.zui.Messager(content, config).show();
    }
    function showMessage(content, title, cssType, config) {
        var injector = angular.element(document).injector() || angular.injector(["app"]);
        var modal = injector.get("$modal");
        var cfg = $.extend({}, {
            templateUrl: 'modal/modal.message.tpl.html',
            title: title,
            content: content,
            cssType: cssType,
            backdrop: "static",
            animation: 'am-fade-and-scale',
            show: true,
            keyboard: false,
            OkTxt: mabp.language['OK']
        }, config);
        modal(cfg);
    }


    mabp.ui = {};
    mabp.ui.setSaving = function (elementId, optionsOrPromise, savingText) {
        optionsOrPromise = optionsOrPromise || {};
        if (optionsOrPromise.always || optionsOrPromise['finally']) { //Check if it's promise
            optionsOrPromise = {
                promise: optionsOrPromise
            };
        }
        var options = $.extend({}, optionsOrPromise);
        var buttonHtml = '<i class="icon icon-spin icon-spinner-indicator"></i><span>{0}</span>';
        function busyText() {
            var ntxt = savingText || ' 提交中...';
            return buttonHtml.fill(ntxt);
        }
        var tempSaveText = '';
        function clearText() {
            return tempSaveText;
        }
        var btnElement = (elementId.substring(0, 1) === "#" || elementId.substring(0, 1) === ".") ? $(elementId) : $('#' + elementId);
        if (btnElement.length > 0) {
            tempSaveText = btnElement.html();
            btnElement.attr("disabled", "disabled");
            btnElement.html(busyText());
        }

        if (options.promise) { //Supports Q and jQuery.Deferred
            if (options.promise.always) {
                options.promise.always(function () {
                    btnElement.removeAttr("disabled");
                    btnElement.html(clearText());
                });
            } else if (options.promise['finally']) {
                options.promise['finally'](function () {
                    btnElement.removeAttr("disabled");
                    btnElement.html(clearText());
                });
            }
        }
    };
    mabp.ui.executor = function (elementId, savingText) {
        this.Element = (elementId.substring(0, 1) === "#" || elementId.substring(0, 1) === ".") ? $(elementId) : $('#' + elementId);
        this.oldHtml = this.Element.html();
        this.start = function () {
            var buttonHtml = '<i class="icon icon-spin icon-spinner-indicator"></i><span>{0}</span>';
            var ntxt = savingText || ' 提交中...';
            var tempButtonHtml = buttonHtml.fill(ntxt);
            this.Element.attr("disabled", "disabled");
            this.Element.html(tempButtonHtml);
        }
        this.stop = function () {
            this.Element.removeAttr("disabled");
            this.Element.html(this.oldHtml);
        }
    };

    mabp.ui.setBusying = function (elementSelector, optionsOrPromise, savingText) {
        optionsOrPromise = optionsOrPromise || {};
        if (optionsOrPromise.always || optionsOrPromise['finally']) { //Check if it's promise
            optionsOrPromise = {
                promise: optionsOrPromise
            };
        }
        var options = $.extend({}, optionsOrPromise);
        var buttonHtml = '<div class="bs-container"><div class="bs-block-content"><div class="la-ball-atom la-2x"><div></div><div></div><div></div><div></div></div><div></div></div></div>';
        //var buttonHtml = '<div class="content-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';

        var blockElement = $(elementSelector);
        if (blockElement.length > 0) {
            var blockLoad = blockElement.find('.bs-block-content');
            if (blockLoad != null) {
                blockLoad.remove();
            }
            blockElement.addClass("bs-on-busy");
            blockElement.append(buttonHtml);
        }
        if (options.promise) { //Supports Q and jQuery.Deferred
            if (options.promise.always) {
                options.promise.always(function () {
                    blockElement.removeClass("bs-on-busy");
                    var blockLoad = blockElement.find('.bs-block-content');
                    if (blockLoad != null) {
                        blockLoad.remove();
                    }
                });
            } else if (options.promise['finally']) {
                options.promise['finally'](function () {
                    blockElement.removeClass("bs-on-busy");
                    var blockLoad = blockElement.find('.bs-block-content');
                    if (blockLoad != null) {
                        blockLoad.remove();
                    }
                });
            }
        }
    };
    mabp.ui.loader = function (elementSelector) {
        this.blockElement = $(elementSelector);

        this.start = function () {
            var buttonHtml = '<div class="content-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
            var blockElement = this.blockElement;
            if (blockElement.length > 0) {
                var blockLoad = blockElement.find('.content-spinner-bar');
                if (blockLoad != null) {
                    blockLoad.remove();
                }
                blockElement.addClass("content-on-load");
                blockElement.append(buttonHtml);
            }
        }
        this.stop = function () {
            this.blockElement.removeClass("content-on-load");
            var blockLoad = this.blockElement.find('.content-spinner-bar');
            if (blockLoad != null) {
                blockLoad.remove();
            }
        }
    }
    mabp.ui.setLoading = function (elementSelector, optionsOrPromise, savingText) {
        optionsOrPromise = optionsOrPromise || {};
        if (optionsOrPromise.always || optionsOrPromise['finally']) { //Check if it's promise
            optionsOrPromise = {
                promise: optionsOrPromise
            };
        }
        var options = $.extend({}, optionsOrPromise);
        var buttonHtml = '<div class="content-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';

        var blockElement = $(elementSelector);
        if (blockElement.length > 0) {
            var blockLoad = blockElement.find('.content-spinner-bar');
            if (blockLoad != null) {
                blockLoad.remove();
            }
            blockElement.addClass("content-on-load");
            blockElement.append(buttonHtml);
        }
        if (options.promise) { //Supports Q and jQuery.Deferred
            if (options.promise.always) {
                options.promise.always(function () {
                    blockElement.removeClass("content-on-load");
                    var blockLoad = blockElement.find('.content-spinner-bar');
                    if (blockLoad != null) {
                        blockLoad.remove();
                    }
                });
            } else if (options.promise['finally']) {
                options.promise['finally'](function () {
                    blockElement.removeClass("content-on-load");
                    var blockLoad = blockElement.find('.content-spinner-bar');
                    if (blockLoad != null) {
                        blockLoad.remove();
                    }
                });
            }
        }
    };

    mabp.notify = {
        error: function (content, title) {
            showNotify(content, title, 'error');
        },
        info: function (content, title) {
            showNotify(content, title, 'info');
        },
        success: function (content, title) {
            showNotify(content, title, 'success');
        },
        warn: function (content, title) {
            showNotify(content, title, 'warning');
        }
    }
    mabp.filter('moment', function () {
        return function (dt) {
            return moment(dt).fromNow();
        }
    });
    mabp.message = {
        error: function (content, title, config) {
            showMessage(content, title, 'danger', config);
        },
        info: function (content, title, config) {
            showMessage(content, title, 'info', config);
        },
        success: function (content, title, config) {
            showMessage(content, title, 'success', config);
        },
        warn: function (content, title, config) {
            showMessage(content, title, 'warning', config);
        },
        confirm: function (content, title, callBack) {
            var injector = angular.element(document).injector() || angular.injector(["app"]);
            var modal = injector.get("$modal");
            var lang = ($currentUser || {}).language || "zh-CN";
            var lContent, lTitle;
            var _TL = injector.get("$filter")("translate");


            lContent = typeof (content) === "string" ? content : content[lang];
            lTitle = typeof (title) === "string" ? title : title[lang];
            var m = modal({
                templateUrl: 'modal/modal.confirm.tpl.html',
                title: lTitle,
                content: lContent,
                backdrop: "static",
                animation: 'am-fade-and-scale',
                confirmText: _TL("Confirm"),
                cancelText: _TL("Cancel"),
                show: true
            });

            m.result.then(function (confirmed) {
                callBack(confirmed);
            });
        }
    }

    mabp.toDetailArray = function (obj, row) {
        var dic = [];
        if (obj instanceof Array) {
            for (var i = 0; i < obj.length; i++) {
                for (b in obj[i]) {
                    switch ((typeof (obj[i][b])).toLowerCase()) {
                        case "string":
                        case "int":
                        case "number":
                        case "object":
                            dic.push({ name: b, value: (obj[i][b] || ''), rowIndex: row });
                            break;
                        case "boolean":
                            dic.push({ name: b, value: (obj[i][b] || false), rowIndex: row });
                            break;
                        default:
                    }
                }
            }
        } else {
            for (b in obj) {
                //if (!obj[b]) continue;
                switch ((typeof (obj[b])).toLowerCase()) {
                    case "string":
                    case "int":
                    case "number":
                    case "object":
                        dic.push({ name: b, value: obj[b] == null ? '' : obj[b], rowIndex: row });
                        break;
                    case "boolean":
                        dic.push({ name: b, value: (obj[b] || false), rowIndex: row });
                        break;
                    default:
                }
            }
        }
        return dic;
    }

    //将对象转换为键值对数组
    mabp.toArray = function (obj) {
        var dic = [];
        if (obj instanceof Array) {
            for (var i = 0; i < obj.length; i++) {
                for (b in obj[i]) {
                    switch ((typeof (obj[i][b])).toLowerCase()) {
                        case "string":
                        case "int":
                        case "number":
                        case "object":
                            dic.push({ name: b, value: (obj[i][b] || '') });
                            break;
                        case "boolean":
                            dic.push({ name: b, value: (obj[i][b] || false) });
                            break;
                        default:
                    }
                }
            }
        } else {
            for (b in obj) {
                //if (!obj[b]) continue;
                switch ((typeof (obj[b])).toLowerCase()) {
                    case "string":
                    case "int":
                    case "number":
                    case "object":
                        dic.push({ name: b, value: obj[b] == null ? '' : obj[b] });
                        break;
                    case "boolean":
                        dic.push({ name: b, value: (obj[b] || false) });
                        break;
                    default:
                }
            }
        }
        return dic;
    };


    mabp.toObject = function (nameValues) {
        var obj = {};
        if (nameValues == null)
            return obj;
        for (var i = 0; i < nameValues.length; i++) {
            obj[nameValues[i].name] = nameValues[i].value;
        }
        return obj;
    };



    //Print Preview
    mabp.printDiv = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin;
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWin.window.focus();
            popupWin.document.write('<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" type="text/css" href="style.css" />' +
                '</head><body onload="window.print()"><div class="reward-body">' + printContents + '</div></html>');
            popupWin.onbeforeunload = function (event) {
                popupWin.close();
                return '.\n';
            };
            popupWin.onabort = function (event) {
                popupWin.document.close();
                popupWin.close();
            }
        } else {
            popupWin = window.open('', '_blank', 'width=800,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
            popupWin.document.close();
        }
        popupWin.document.close();

        return true;
    }

    //tab 反刷
    mabp.openWin = function (url, callback) {
        var winObj = window.open(url);
        var loop = setInterval(function () {
            if (winObj.closed) {
                clearInterval(loop);
                //alert('closed');      
                //parent.location.reload();
                if (!!callback) {
                    callback();
                }
            }
        }, 500);
    }
})();



//如果miniapp的模块存在则
mabp && (function () {
    //弹窗类库配置
    //ngStrap modal provider
    mabp.config(['$modalProvider', function ($modalProvider) {
        angular.extend($modalProvider.defaults, {
            html: true
        });
    }]);
    mabp.service('dialog', function () {
        this.open = function (dialogInfo, params) {
            var injector = angular.element(document).injector() || angular.injector(["app"]);
            var modal = injector.get("$modal");
            var d = $.Deferred();
            var m = modal({
                templateUrl: dialogInfo.templateUrl,
                controller: '{0} as vm'.fill(dialogInfo.controller),
                size: dialogInfo.size || "md",
                resolve: {
                    params: function () {
                        return params;
                    }
                },
                backdrop: "static"
            });

            m.result.then(function (data) {
                d.resolve(data);
            });
            return d;
        }
    });

    mabp.service('asdialog', function () {
        this.open = function (dialogInfo, params) {
            var injector = angular.element(document).injector() || angular.injector(["app"]);
            var modal = injector.get("$aside");
            var d = $.Deferred();
            var m = modal({
                templateUrl: dialogInfo.templateUrl,
                controller: '{0} as vm'.fill(dialogInfo.controller),
                size: dialogInfo.size || "md",
                resolve: {
                    params: function () {
                        return angular.copy(params);
                    }
                },
                backdrop: "static"
            });

            m.result.then(function (data) {
                d.resolve(data);
            });
            return d;
        }
    });
    mabp.ng = {
        http: {
            handleResponse: function (response, defer) {
                //处理下载文件类型
                var hasFile = this.handleFileResponse(response, defer);
                if (hasFile) {
                    defer.resolve();
                    return;
                }
                var responseData = response.data;
                if (responseData.isSuccess) {
                    defer.resolve(responseData.result);
                } else {
                    //如果未登陆 要求先登录
                    if (!responseData.isAuthorized && !responseData.errors.isFriendlyError) {
                        alert('未登录或者身份过期, 请重新登陆。');
                        location.href = "/Account";
                    } else {
                        var title = responseData.errors.isFriendlyError ? "" : '发生异常';
                        mabp.notify.error(responseData.errors.message, title);
                    }

                    defer.reject(responseData.result);
                }
            },
            handleFileResponse: function (response) {
                var hrs = response.headers();
                var fileContent = hrs["content-disposition"];
                if (fileContent == null || fileContent.indexOf("attachment") <= -1) {
                    return false;
                }
                var blob = new Blob([response.data], { type: hrs["content-type"] });
                var cd = response.headers()['content-disposition'];
                var fileName = cd.substring(cd.indexOf("filename=") + 9, cd.length);
                fileName = decodeURI(fileName);
                this.downFile(blob, fileName);
                return true;
            },
            downFile: function (blob, fileName) {
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, fileName);
                } else {
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                    window.URL.revokeObjectURL(link.href);
                }
            }

        }
    }
    mabp.config([
        '$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push(['$q', function ($q) {

                return {

                    'request': function (config) {
                        if (endsWith(config.url, '.cshtml')) {
                            config.url = mabp.appPath + 'AbpAppView/Load?viewUrl=' + config.url;
                        }

                        return config;
                    },

                    'response': function (response) {
                        if (!response.config || !response.config.abp || !response.data) {
                            return response;
                        }
                        var defer = $q.defer();
                        mabp.ng.http.handleResponse(response, defer);
                        return defer.promise;
                    },

                    'responseError': function (ngError) {
                        var error = {
                            message: ngError.data,
                            details: ngError.statusText,
                            responseError: true
                        }
                        mabp.notify.error('网络超时或内部错误');
                        return $q.reject(error);
                    }

                };
            }]);
        }
    ]);
    function endsWith(str, suffix) {
        if (suffix.length > str.length) {
            return false;
        }

        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    mabp.factory('httpS', [
        '$location', function ($location) {
            return function (method, param) {
                var d = $.Deferred();
                //                param = { service: method, param: JSON.stringify(param) };
                //var getFormAction = function() {
                //    var formurl = $location.absUrl().toLowerCase();
                //    formurl = formurl.substring(formurl.indexOf("pages/") + "pages/".length);
                //    if (formurl.indexOf('?') > -1) {
                //        formurl = formurl.substring(0, formurl.indexOf('?'));
                //    }
                //    return "/pages/" + formurl.toLowerCase();
                //};
                //var formname = getFormAction();

                var r = method.split('.');
                var s = r[0];
                var md = r[1];
                $.ajax({
                    type: "POST",
                    url: "/Api/" + s + "/" + md,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(param),
                    async: false,
                    success: function (data) {
                        if (data.isSuccess) {
                            d.resolve(data.result);
                        } else {
                            mabp.notify.error(data.errors.message, '发生异常');
                            d.reject(data.result);
                        }


                    },
                    error: function (data) {
                        mabp.notify.error(data.message);
                        d.reject(data.result);
                    }
                });
                return d;
            }
        }]);

    //modal ecapsulate
    mabp.directive('modal', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                size: '@'
            },
            template: function (element, attr) {
                var template = '<div class="my-theme"><div class="modal-dialog modal-{{size}}"><div class="modal-content" ng-transclude></div></div></div>';
                return template;
            }
        }
    });
    //maForm
    mabp.directive('maForm', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: function (element, attr) {
                var template = '<div><form class="form-horizontal w5c-form" w5c-form-validate="vm.validateOptions" novalidate name="validateForm"> <div ng-transclude></div> </form></div></div>';
                return template;

            },
            link: function (scope, ele, attr) {
                scope.formName = attr.name;
            }
        }
    });
    mabp.directive('modalHeader', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div class="modal-header"> <button type="button" class="close" ng-click="$hide()">&times;</button> <h4 class="modal-title" ng-transclude></h4> </div>'
        }
    });
    mabp.directive('modalBody', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div class="modal-body" ng-transclude> </div>',
            compile: function (element, attr) {
                if (attr.overbody)
                    element.addClass("overbody");
            }
        }
    });
    mabp.directive('modalFooter', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div class="modal-footer" ng-transclude> </div>'
        }

    });

    /* ngModel :
    {
        id: <#Value#>,
        name: <#Display Name#>,
        displayProperty: <#the value under#>
    }*/
    mabp.directive("maMultiSelect", function () {
        return {
            restrict: "EA",
            transclude: true,
            replace: true,
            template: "<select class='js-example-basic-multiple form-control' multiple='multiple' ></select>",
            scope: {
                ngModel: "=",
                selectedModel: "="
            },
            link: function (scope, element, attr) {
                var isInited = false;

                scope.$watch("selectedModel", function (newValue, oldValue, scope) {
                    var list = scope.ngModel;
                    var selectedList = scope.selectedModel;
                    if (list == null || selectedList == null || list.length === 0 || isInited) {
                        return;
                    }
                    isInited = true;
                    var optionStr = "";
                    for (var i = 0; i < list.length; i++) {
                        var selected = _.indexOf(selectedList, list[i].id) > -1 ? "selected='selected'" : "";
                        optionStr += "<option value='" + list[i].id + "' " + selected + ">" + list[i].text + "</option>";
                    }

                    $(element).html(optionStr);

                    $(element).select2({
                        placeholder: "请选择",
                        allowClear: true,
                        formatResult: function (state) {
                            if (!state.id) { return state.text; }
                            var $state = $('<span>' + state.text + '</span>');
                            return $state;
                        },
                        formatSelection: function (state) {
                            if (!state.id) { return state.text; }
                            var $state = $('<span>' + state.text + '</span>');
                            return $state;
                        }
                    });

                    $(element).on("change", function (e) {
                        scope.selectedModel = e.val;
                        scope.$apply();
                    });

                }, true);

            }
        };
    });

}());

//Directive ButtonBusy  ConfirmClick
(function () {

    mabp.directive("ngSpinnerBar", ["$rootScope", function (rootScope) {
        return {
            replace: true,
            //            template: '<div class="la-ball-atom la-2x"><div></div><div></div><div></div><div></div></div>',
            template: '<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>',
            link: function (scope, element) {
                element.addClass("hide");
                rootScope.$on("$stateChangeStart", function () {
                    element.removeClass("hide");
                });
                rootScope.$on("$stateChangeSuccess", function () {
                    element.addClass("hide");
                    $("body").removeClass("page-on-load");
                });
            }
        }
    }]);

    mabp.directive("ngRouteChange", ["$rootScope", function (rootScope) {
        return {
            link: function (t, element) {
                var options = element;
                rootScope.$on("$stateChangeStart", function () {
                    element.addClass("state-on-load");
                    //                         if (options && options.animate) {
                    element.append('<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
                    //                         }
                });
                rootScope.$on("$stateChangeSuccess", function () {
                    element.removeClass("state-on-load");
                    element.find(".block-spinner-bar").remove();
                });
            }
        }
    }
    ]);

})();
