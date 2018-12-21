(function () {
    var app = angular.module('mabp.orgChart', ['mabp']);
    /*
    树形工具类，将数组类型生成属性Json对象，提供给程序使用
    默认返回的类型是
    //{
    //    id          : "string" //唯一编号
    //    text        : "string" //显示文本  
    //    children    : []  // 子节点信息
    //}
    */
    app.service('treeTool', function () {
        var service = {
            //将数组转换为树形json [{ id:'',text:'', children:[]]
            treeJson: function (data, idField, parentIdField, displayField, selectedId) {
                if (data != null && data.length > 0) {
                    //将权限数组转换成权限树的数据类型
                    function getChildrenTree(nodes, data) {
                        var treeData = [];
                        var childrenNode = _.filter(data, function (item) {
                            return item[parentIdField] == nodes[idField];
                        });
                        for (var i = 0; i < childrenNode.length; i++) {
                            treeData[i] = {};
                            treeData[i] = childrenNode[i];
                            treeData[i].text = childrenNode[i][displayField];
                            treeData[i].id = childrenNode[i][idField];
                            //默认打开第一级
                            treeData[i].state = { opened: nodes[parentIdField] == null, selected: nodes[idField] === selectedId };
                            var childrens = getChildrenTree(childrenNode[i], data);
                            if (childrens.length > 0) {
                                treeData[i].children = childrens;
                            }
                        }
                        return treeData;
                    }

                    var treeData = getChildrenTree({}, data);
                    return treeData;
                }
                return null;
            },
            //格式化树Json 将第二层默认打开
            toFormatTreeJson: function (jsonData, selectedId, mustleaf, textField, valueField) {
                var noNeedTransfer = (textField == null && valueField == null)
                     || (textField === 'text' && valueField === 'id');

                function getFormated(treeJson, layerId) {
                    layerId++;
                    var treeData = [];

                    if (treeJson != null && treeJson.length != 0) {
                        for (var i = 0; i < treeJson.length; i++) {
                            treeData[i] = {};
                            //需要转换
                            if (noNeedTransfer) {
                                treeData[i].text = treeJson[i].text;
                                treeData[i].id = treeJson[i].id;
                            } else {
                                treeData[i].text = treeJson[i][textField];
                                treeData[i].id = treeJson[i][valueField];
                            }
                            //默认打开第二级   layerId <= 2
                            treeData[i].state = {
                                opened: layerId < 2,
                                selected: treeData[i].id === selectedId || ((selectedId instanceof Array) && selectedId.indexOf(treeData[i].id) > -1),
                                disabled: layerId === 1 && mustleaf === true
                            };
                            var childrens = getFormated(treeJson[i].children, layerId);
                            if (childrens.length > 0) {
                                treeData[i].children = childrens;
                            }
                        }
                    }
                    return treeData;
                }
                var treeData = getFormated(jsonData, 0);
                return treeData;
            },
            //树Json 转换为数组 [{ id, text}]
            toArrayJson: function (jsonData) {
                var arr = [];
                function getFormated(treeJson, parent) {
                    if (treeJson != null && treeJson.length !== 0) {
                        for (var i = 0; i < treeJson.length; i++) {
                            var treeData = {};
                            treeData.text = treeJson[i].text;
                            treeData.id = treeJson[i].id;
                            treeData.parent = parent;
                            arr.push(treeData);
                            getFormated(treeJson[i].children, treeData.id);
                        }
                    }
                }
                getFormated(jsonData, null);
                return arr;
            },
            //根据Id获取值
            GetValueOfId: function (jsonData, selectedId) {
                function getFormated(treeJson) {
                    var treeData = [];
                    if (treeJson != null && treeJson.length != 0) {
                        for (var i = 0; i < treeJson.length; i++) {
                            if (treeJson[i].id == selectedId) {
                                resultNode = treeJson[i];
                            } else {
                                getFormated(treeJson[i].children);
                            }
                        }
                    }
                }

                var resultNode = {};
                getFormated(jsonData);
                return resultNode;
            }
        }

        return service;
    });

    /*组织图指令*/
    app.directive("orgChart", [
        'treeTool', '$timeout', function (treeTool, $timeout) {
            return {
                restrict: "EA",
                transclude: true,
                template: '<div id="organizationChart" class="organizationChart"></div>',
                scope: {
                    ngModel: '=',
                    jobUsers: '=',
                    dragDrop: '&',
                    dbClick: '&',
                    rightMenuDelete: '&',
                    rightMenuNext: '&'

                },
                replace: true,
                link: function (scope, element, attr) {
                    var dropTo = scope.dragDrop();
                    var dbClick = scope.dbClick();
                    var rightMenuDelete = scope.rightMenuDelete();
                    var rightMenuNext = scope.rightMenuNext();

                    scope.$watch("ngModel", function (newValue, oldValue, scope) {
                        var jsonData = scope.ngModel;
                        if (jsonData == null || jsonData.id == null) {
                            return;
                        }

                        require(['orgChart'], function (orgChart) {
                            orgChart.create("organizationChart", jsonData,
                                //Drop callback
                                function (parsedObj) {
                                    dropTo(parsedObj);
                                    scope.$apply();
                                },
                                //Drag callback
                                function (ev) {
                                    var stringfiedObj = JSON.stringify({ id: ev.target.id, type: "NODE" });
                                    ev.dataTransfer.setData('text', stringfiedObj);
                                },
                                //dbClick callback
                                function (type, id) {
                                    //orgNode_colorType1 代表个人
                                    dbClick(id, type, function (entity) {
                                        //if (entity == null || entity.job == null)
                                        //    return;
                                        //var name = entity.job.name;
                                        //var users = entity.allUsers;
                                        //var selectedUser = entity.users;
                                        //var names = "";
                                        //for (var i = 0; i < selectedUser.length; i++) {
                                        //    names += _.find(users, { id: selectedUser[i] }).chineseName;
                                        //}
                                        //// 更新界面上的值
                                        //$("#org_{0} .orgNode_header .orgText".fill(entity.id)).text(name);
                                        //$("#org_{0} .orgNode_body .orgText".fill(entity.id)).text(names);
                                    });
                                },
                                //Delete
                                function (jobId) {
                                    rightMenuDelete(jobId);
                                },
                                //NextJob
                                function (jobId) {
                                    rightMenuNext(jobId);
                                },
                                //completion
                                function () {
                                    //更新用户树
                                    var allJobs = _.groupBy(scope.jobUsers, 'jobId');
                                    for (jobId in allJobs) {
                                        var dom = $("#org_{0} .orgNode_body .orgText".fill(jobId));
                                        var names = _.map(allJobs[jobId], "userName");
                                        dom.html(_.join(names, '<br/>'));
                                    }
                                }
                            );
                        });

                     
                    }, true);

                }
            };
        }
    ]);
    // Format
    //{
    //    id          : "string" // will be autogenerated if omitted
    //    text        : "string" // node text
    //    icon        : "string" // string for custom
    //    state       : {
    //            opened    : boolean  // is the node open
    //            disabled  : boolean  // is the node disabled
    //            selected  : boolean  // is the node selected
    //    },
    //    children    : []  // array of strings or objects
    //    li_attr     : {}  // attributes for the generated LI node
    //    a_attr      : {}  // attributes for the generated A node
    //}

    app.directive("groupTree", function () {
        return {
            restrict: 'EA',
            transclude: true,
            template: '<div></div>',
            scope: {
                ngModel: '=',
                selectedId: '=',
                rightMenuDelete: '&',
                rightMenuEdit: '&'
            },
            link: function (scope, element, attr) {
                scope.$watch('ngModel', function () {
                    var treeData = scope.ngModel;
                    if (treeData == null || treeData.id == null) {
                        return;
                    }
                    $(element).jstree({
                        'plugins': ["types"],
                        'core': {
                            "themes": {
                                "responsive": false
                            },
                            'data': treeData
                        },
                        "types": {
                            "default": {
                                "icon": "icon icon-folder-close-alt"
                            },
                            "file": {
                                "icon": "icon icon-folder-close-alt"
                            }
                        }
                    });

                    $(element).on('select_node.jstree', function (e, data) {
                        $(element).parent().parent().find('.jstree-clicked').removeClass('jstree-clicked');
                        $(element).parent().parent().find('#' + data.selected[0] + '>a').addClass('jstree-clicked');
                        scope.selectedId = data.selected[0];
                        scope.$apply();
                    });


                }, true);
            }
        };
    });

    ;

}());