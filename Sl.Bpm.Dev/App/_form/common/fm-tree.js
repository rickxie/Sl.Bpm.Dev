_shared
/*复选框/切换框列表指令*/
.directive('fmTree', [
    '$compile', 'dialog', 'mabp.app.module', 'treeTool', function ($compile, dialog, service, treeTool) {
        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                ismulti: '=',
                mustleaf: '=',
                treeData: '=',
                selectData: '=',
                canChecked: '=',
                textField: '@',
                valueField: '@',
                isLeaf: '&',
                itemClicked: '&',
                itemCheckedChanged: '&',
                itemTemplateUrl: '@'
            },
            link: function (scope, element, attr) {

                scope.$watch('treeData', function () {
                    var treeData = scope.treeData;
                    if (treeData == null || treeData.length === 0) {
                        return;
                    }
                    var pluginVar = scope.ismulti === true ? ["checkbox"] : [];
                    var formattedTree = treeTool.toFormatTreeJson(treeData, _.map(scope.selectData, 'id'), scope.mustleaf, scope.textField, scope.valueField);
                    var treeArray = treeTool.toArrayJson(formattedTree);
                    //初始化树形配置
                    $(element).jstree({
                        "checkbox": {
                            "keep_selected_style": true,
                            "three_state": false,
                            "undetermined": false
                        },
                        'core': {
                            "themes": {
                                "responsive": false
                            },
                            'data': formattedTree
                        },
                        "plugins": pluginVar
                    });

                    $(element).on('select_node.jstree', function (e, data) {
                        scope.selectData = _.filter(treeArray, function (item) {
                            return data.selected != null && data.selected.indexOf(item.id) > -1;
                        });
                        scope.$apply();
                        if (!scope.ismulti && data.selected.length === 1) {
                            scope.itemClicked({ item: scope.selectData[0] });
                        }
                    });
                    $(element).on('deselect_node.jstree', function (e, data) {
                        scope.selectData = _.filter(treeArray, function (item) {
                            return data.selected != null && data.selected.indexOf(item.id) > -1;
                        });
                        scope.$apply();
                    });
                });

            }
        };
    }
])