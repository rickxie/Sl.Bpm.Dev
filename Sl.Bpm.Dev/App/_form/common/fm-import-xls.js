_shared
/*下拉列表指令*/
.directive("fmImportXls", ['fmTool', '$timeout', 'dialog', 'mabp.app.module', function (fmTool, $timeout, dialog, service) {
    return {
        restrict: 'E',
        replace: true,
        template: function (elem, attr) {
            attr.inputname = _$.getGUID(false);
            return '<div style="display: inline-block;"><label class="btn btn-info btn-sm btn-import" for="' + attr.inputname + '" ng-click="event_fileSelect()">导入</label><a style="vertical-align:bottom;margin-left: 5px;margin-right: 1px;color:white;" class="btn btn-info btn-sm ' + (!attr.template ? "hide" : "") + ' btn-download" target="_blank" href="' + attr.template + '" >下载模板</a><input class="picUpload" type="file" id="' + attr.inputname + '" /></div>';
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

                    function toJson(workbook) {
                        var result = [];
                        workbook.SheetNames.forEach(function (sheetName) {
                            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                            if (roa.length > 0) {
                                result.push(roa);
                            }
                        });
                        return result;
                    }
                    var fileInput = element.find("#" + attr.inputname);

                    fileInput[0].addEventListener('change', function (e) {
                        var files = e.target.files;
                        var i, f;
                        for (i = 0, f = files[i]; i != files.length; ++i) {
                            var reader = new FileReader();
                            var name = f.name;
                            reader.onload = function (e) {
                                var data = e.target.result;

                                var workbook = XLSX.read(data, { type: 'binary' });
                                var json = toJson(workbook);
                                if (!!json && json.length > 0) {
                                    var sheet1 = json[0];
                                    //如果没有列则使用
                                    var i;
                                    if (scope.columns == undefined) {
                                        var cols = [];
                                        for (i in sheet1[0]) {
                                            cols.push(i);
                                        }
                                        scope.columns = cols;
                                    }
                                    //将实体数组转换为二维数组
                                    var sheetCollection = [];
                                    var row;
                                    for (var j = 0; j < sheet1.length; j++) {
                                        row = [];
                                        for (var k in sheet1[j]) {
                                            row.push(sheet1[j][k]);
                                        }
                                        sheetCollection.push(row);
                                    }
                                    //将二位数组转换为实体数组
                                    var result = [];
                                    for (i = attr.startIndex || 0; i < sheetCollection.length; i++) {
                                        row = {};
                                        for (var o = 0; o < scope.columns.length && o < sheetCollection[i].length; o++) {
                                            row[scope.columns[o]] = sheetCollection[i][o];
                                        }
                                        result.push(row);
                                    }
                                    $(fileInput[0]).val("");
                                    scope.callbackFunc({ data: result });
                                }
                            };
                            reader.readAsBinaryString(f);
                        }
                    });
                }
            }
        }
    }
}])