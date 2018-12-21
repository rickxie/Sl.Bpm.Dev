(function () {
    'use strict';
    var controllerId = "syspages.views.system.formdesigner";
    angular.module('syspages').controller(controllerId, [
        '$scope', '$rootScope', 'mabp.app.bpm', 'asdialog', 'dialog', '$state', '$stateParams',
        'mabp.app.enterpriseInfoSync', 'treeTool',
        function ($scope, $rootScope, service, asdialog, dialog, $state, $stateParams, syncServie, treeTool) {
            var vm = this;
            vm.scenes = [{ id: 'layout', text: '布局' }, { id: 'setting', text: '设置' }];
            vm.curScene = 'layout';
            vm.formObj = [];
            vm.rowUp = function(i){
                var curObj = vm.formObj[i];
                var upObj = vm.formObj[i - 1];
                curObj.rowIndex = i - 1;
                upObj.rowIndex = i;
                vm.formObj = _.orderBy(vm.formObj, "rowIndex");
            }
            vm.rowDown = function(i){
                var curObj = vm.formObj[i];
                var downObj = vm.formObj[i + 1];
                curObj.rowIndex = i + 1;
                downObj.rowIndex = i;
                vm.formObj = _.orderBy(vm.formObj, "rowIndex");
            }
            vm.colLeft = function (columns, i) {
                switch (columns.length) {
                    case 3: vm.formObj[i].columns = columns.slice(0, 2); break;
                    case 2: vm.formObj[i].columns = columns.slice(0, 1); break;
                }
            }
            vm.colRight = function (columns) {
                switch (columns.length) {
                    case 1:
                    case 2: columns.push({ text: "未设置列" }); break;
                    default: break;
                }
            }

            vm.editColumn = function (column) {
                dialog.open(app.dialogs.formdesignerEdit, column).then(function (result) {

                })
            }
        }
    ]);
})();