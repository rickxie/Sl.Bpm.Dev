_shared
/*下拉列表指令*/
.directive("fmImportCsv", ['fmTool', '$timeout', 'dialog', 'mabp.app.module', function (fmTool, $timeout, dialog, service) {
    return {
        restrict: 'E',
        replace: true,
        template: function (elem, attr) {
            attr.inputname = _$.getGUID(false);
            return '<div style="display: inline-block;"><label class="btn btn-info btn-sm" for="' + attr.inputname + '" ng-click="event_fileSelect()">导入</label><label style="vertical-align:bottom;margin-left: 5px;margin-right: 1px;" class="btn btn-info btn-sm ' + (!attr.template ? "hide" : "") + '" target="_blank" href="' + attr.template + '" >下载模板</label><input class="picUpload" type="file" id="' + attr.inputname + '" /></div>';
            //<span style="font-size: 12px;color: #BBB;margin-left: 5px;line-height: 20px;vertical-align: bottom;">仅支持csv格式文件</span>
        },
        scope: {
            filename: '=',
            fmDisabled: '=',
            columns: '=',
            items: '=',
            callbackFunc: '&'
        },
        compile: function (tElement, tAttrs, transclude) {
            return {
                pre: function preLink(scope, element, attr, ctrl) {
                },
                post: function postLink(scope, element, attr, ctrl) {
                    attr.startIndex = !attr.startIndex ? 0 : parseInt(attr.startIndex);
                    scope.event_fileSelect = function () {

                    };

                    scope.event_fileChange = function () {
                        var file = e.target.files[0];
                        csvParser.loadFile(file, function () {
                            console.log(csvParser.getSheet()); // print!
                        });
                    };

                    attr.csvParser = new SimpleExcel.Parser.CSV();
                    var fileInput = element.find("#" + attr.inputname);
                    fileInput[0].addEventListener('change', function (e) {
                        var file = e.target.files[0];
                        attr.csvParser.loadFile(file, function () {
                            var data = attr.csvParser.getSheet();
                            if (scope.columns == undefined) {
                                var cols = [];
                                for (var i = 0; i < data[0].length; i++) {
                                    cols.push(data[0][i].value);
                                }
                                scope.columns = cols;
                            }
                            var result = [];
                            for (var i = attr.startIndex || 0; i < data.length; i++) {
                                var row = {};
                                for (var o = 0; o < scope.columns.length && o < data[i].length; o++) {
                                    row[scope.columns[o]] = data[i][o].value;
                                }
                                result.push(row);
                            }
                            $(fileInput[0]).val("");
                            scope.callbackFunc({ data: result });
                        });
                    });
                }
            }
        }
    }
}])