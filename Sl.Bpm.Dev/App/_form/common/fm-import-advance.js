_shared
/*数据上传*/
.directive('fmImportAdvance', ['fmTool', 'dialog', 'mabp.app.file', function (fmTool, dialog, service) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            fmDisabled: '=',
            fmReadonly: '=',
            fmNormal: '=',
            config: '=',
            callbackFunc: '&',
            taskId: '=',
            linkId: '=',
            formFiles: '='
        },
        template: function (elem, attr) {
            return '<div style="display: inline-block;" class="fm-import-advance ' + attr.class + '" ng-class="state">' +
                        '<button ng-if="state==\'normal\'" type="button" class="btn btn-info btn-sm" ng-click="openDialog()">{{config.base.buttonName}}</button>' +
                        '  <a ng-if="config.base.displayAttachment" target="_blank" ng-href="/File/Download?fileId={{fileInfo.id}}">{{fileInfo.fileName}}</a>' +
                    '</div>';
        },
        link: function (scope, element, attr) {
            scope.foreFileInfo = {};
            //控件状态控制
            fmTool.setScopeState(scope, attr);

            scope.openDialog = function () {
                dialog.open(_shared.dialogs["dataImport"], scope.config).then(function (result) {
                    if (!!result) {
                        scope.data = result.data;
                        //处理文件，上传的模板只保存最后一个
                        //先删除之前的文件，并从附件数组中移除
                        if (!!scope.foreFileInfo.id) {
                            scope.deleteFile({ id: scope.foreFileInfo.id });
                        }
                        scope.fileInfo = result.fileModel;
                        scope.foreFileInfo = result.fileModel;
                        scope.formFiles.push({
                            linkId: scope.linkId,
                            FileId: [scope.fileInfo.id]
                        });
                        scope.callbackFunc({ importData: result.dataReturn });
                    }
                });
            }

            //删除
            scope.deleteFile = function (m) {
                var def = {};
                def.taskId = scope.taskId;
                def.fileId = m.id;
                service.deleteFile(def).then(function () {
                    debugger;
                    _.remove(scope.formFiles, function (n) {
                        return n.FileId[0] === m.id;
                    });
                });
            }

            if (!!scope.taskId) {
                service.getTaskLinkedFiles({ taskId: scope.taskId, linkId: scope.linkId }).then(function (result) {
                    scope.fileInfo = result[0];
                });
            }

        }
    }
}
]);