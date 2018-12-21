/*
    生成组织树
var jsonData = {
                    id: '1',
                    text: '延锋集团',
                    children: [
                        { id: '2', text: '安亭公司' }, 
                        { id: '3', text: '常州公司' }
                    ]
                }
*/

define('orgChart', ['zrender',
'zrender/shape/Circle',
'zrender/shape/Rectangle',
'zrender/shape/Polyline'], function (zrender, cirle, rectangle, polyline) {

    String.prototype.fill = String.prototype.fill || function () {
        var str = this;
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] != null)
                str = str.replace("{" + i + "}", arguments[i]);
            else {
                str = str.replace("{" + i + "}", "");
            }
        }
        return str;
    }
    /*
    domId 为组织结构图的DomId
    jsonData为树形结构的Job Json数据
    dropCallBack 两个参数 (sourceId, targetId) 两个主键
    */
    var createChart = function (domId, jsonData, dropCallBack, dragStart, dbClick, rightDelete, rightNext, completion) {
        var RECT_WIDTH = 90;
        var RECT_HEIGHT = RECT_WIDTH * 1.5;
        var WIDTH_GAP = RECT_WIDTH * 0.1;
        var HEIGHT_GAP = RECT_HEIGHT * 0.1;

        var cachedRect = [];
        var retOrg = function (style) {
            var st = $.extend({}, {
                x: 20,
                y: 20,
                width: RECT_WIDTH,
                height: RECT_HEIGHT,
                color: 'rgba(220, 20, 60, 0.8)',
                text: '',//'新岗位',
                textPosition: 'inside',
                radius: 0
            }, style);
            return {
                style: st,
                draggable: true
            };
        };

        var plLine = function (style) {
            var st = $.extend({}, {
                pointList: [[10, 10], [100, 100], [100, 200]],
                //          smooth: 'bezier',
                strokeColor: 'purple',
                lineWidth: 1
            }, style);
            return new polyline({
                style: st
            });
        }
        //新算法
        function getLeafNodeCount(data, id) {
            var count = 0;
            var closeRecursion = false;
            function leftNode(current, newId) {
                if (current.id === newId) {
                    closeRecursion = true;
                } else if (current.children == null || current.children.length === 0) {
                    count++;
                }

                if (current.children != null && current.children.length > 0) {
                    for (var i = 0; i < current.children.length; i++) {
                        if (closeRecursion) {
                            break;
                        }
                        leftNode(current.children[i], newId);
                    }
                }
            }
            leftNode(data, id);
            return count;
        }

        var posCol = [];
        function generateShapes2(current, layerId, parentId) {
            var currentLayerId = layerId;
            currentLayerId++;
            var currentLayer = _.find(posCol, { 'id': currentLayerId });
            //是否第一回进入下一层
            if (!currentLayer) {
                //初始化层数据
                var tier = {};
                tier.id = currentLayerId;
                tier.endX = 0;
                tier.nodes = [];
                posCol.push(tier);
                currentLayer = _.find(posCol, { 'id': currentLayerId });
            }
            //是否为根节点
            var isRoot = currentLayerId === 1;
            var sonCount = getLeafNodeCount(jsonData, current.id);
            var x = sonCount * (RECT_WIDTH + WIDTH_GAP * 3) + 20;
            var y = (currentLayerId - 1) * (RECT_HEIGHT + HEIGHT_GAP * 3) + HEIGHT_GAP;

            var currentShape = new retOrg({ x: x, y: y, title: current.text, jobType: current.jobType, isRoot: isRoot });
            currentShape.Id = current.id;
            if (currentLayerId !== 1) {
                currentShape.parentId = parentId;
            }
            cachedRect.push(currentShape);
            currentLayer.nodes.push(currentShape);
            //构造所有子节点信息
            if (current.children != null && current.children.length > 0) {
                for (var i = 0; i < current.children.length; i++) {
                    generateShapes2(current.children[i], currentLayerId, current.id);
                }
            }
        }


        function resizeShapes(current, layerId) {
            var currentLayerId = layerId + 1;
            //构造所有子节点信息
            if (current.children != null && current.children.length > 0) {
                for (var i = 0; i < current.children.length; i++) {
                    resizeShapes(current.children[i], currentLayerId);
                }
            }

            /*
                获取所有子节点开始和结束x坐标， 求平均，得出父节点应该处在的位置
             * */
            var nextLayer = _.find(posCol, { 'id': currentLayerId + 1 });
            if (!!nextLayer) {
                var childernNodesX = _.map(_.filter(nextLayer.nodes, { parentId: current.id }), 'style.x');
                if (!!childernNodesX && childernNodesX.length > 0) {
                    //current layer Nodes
                    var cns = _.find(posCol, { 'id': currentLayerId }).nodes;
                    var currentShape = _.find(cns, { 'Id': current.id });
                    var maxX = _.max(childernNodesX);
                    var minX = _.min(childernNodesX);
                    var dx = (maxX - minX) / 2 + minX - currentShape.style.x;
                    currentShape.style.x += dx;
                }
            }
        }
        generateShapes2(jsonData, 0, null);
        //调整位置
        resizeShapes(jsonData, 0);


        //获取方形框的 底部中点
        function getBottomCenterPoint(cell) {
            return [cell.x + cell.width / 2, cell.y];
        }
        //获取方形框的 顶部中点
        function getTopCenterPoint(cell) {
            return [cell.x + cell.width / 2, cell.y + cell.height];
        }
        //获取两点之间的折线
        function getPolyLinePoints(pointA, pointB) {
            return [
                [pointA[0], pointA[1]],
                [pointA[0], (pointA[1] + pointB[1]) / 2],
                [pointB[0], (pointA[1] + pointB[1]) / 2],
                [pointB[0], pointB[1]]
            ];
        }

        var cachedLineMap = [];
        var cachedLine = [];
        _.forEach(cachedRect, function (shape) {
            var startPointId = shape.Id;
            _.forEach(_.filter(cachedRect, { parentId: startPointId }), function (secondShape) {
                if (secondShape.Id == startPointId)
                    return;

                var endPointId = secondShape.Id;
                var hadDrawed = _.find(cachedLineMap, function (cachedLineMap) {
                    return (cachedLineMap[0] == startPointId && cachedLineMap[1] == endPointId)
                    || (cachedLineMap[1] == startPointId && cachedLineMap[0] == endPointId);
                });

                if (!hadDrawed) {
                    var startPoint = getTopCenterPoint(shape.style);
                    var endPoint = getBottomCenterPoint(secondShape.style);
                    var pointArr = getPolyLinePoints(startPoint, endPoint);
                    cachedLine.push(new plLine({ pointList: pointArr }));
                    cachedLineMap.push([startPointId, endPointId]);
                }
            });
        });


        //重新设置边框最大值
        function extendBoxWidthAndHeight() {
            var maxHeight = (RECT_HEIGHT + HEIGHT_GAP + 20) * (posCol.length + 1);
            var maxX = 0;
            _.forEach(posCol, function (pos) {
                _.forEach(pos.nodes, function (node) {
                    if (node.style.x > maxX) {
                        maxX = node.style.x;
                    }
                });
            });
            var maxWidth = maxX + RECT_WIDTH + WIDTH_GAP;
            var orgChartDom = $('#organizationChart');
            var miniWidth = orgChartDom.width();
            var miniHeight = orgChartDom.height();
            if (maxWidth >= miniWidth)
                orgChartDom.css('width', maxWidth + 'px');
            if (maxHeight >= miniHeight)
                orgChartDom.css('height', maxHeight + 'px');
        }

        extendBoxWidthAndHeight();

        //初始化画线类
        var zr = zrender.init(document.getElementById(domId));

        //画线线条
        _.forEach(cachedLine, function (item) {
            zr.addShape(item);
        });

        //构造下面的按钮
        var iconAction = [
               {
                   icon: 'icon icon-plus',
                   tip: "添加下级岗位",
                   id: 'jobUser', //添加子岗位
                   action: function (item) {
                       var data = $(this.parentElement.parentElement).data("data");
                       var parsedObj = {
                           targetId: data.Id,
                           sourceId: null,
                           type: 'ADD_USER'
                       }
                       dropCallBack(parsedObj);
                   },
                   visble: function (dom) {
                       var data = $(dom.parentElement.parentElement).data("data");
                       return data.style.jobType === 1;
                   }
               },
               {
                   icon: 'icon icon-chevron-down',
                   id: 'jobGroup', //添加子组织
                   tip: "添加下级组织",
                   action: function () {
                       var data = $(this.parentElement.parentElement).data("data");
                       var parsedObj = {
                           targetId: data.Id,
                           sourceId: null,
                           type: 'ADD_GROUP'
                       }
                       dropCallBack(parsedObj);
                   },
                   visble: function (dom) {
                       var data = $(dom.parentElement.parentElement).data("data");
                       return data.style.jobType === 1;
                   }
               },
               {
                   icon: 'icon icon-cog',
                   id: 'groupEntry',
                   tip: "组织属性",
                   action: function (item) {
                       var data = $(this.parentElement.parentElement).data("data");
                       rightNext(data.Id);
                   },
                   visble: function (dom) {
                       var data = $(dom.parentElement.parentElement).data("data");
                       return data.style.jobType === 2 || data.style.jobType === 3;
                   }
               },
               {
                   icon: 'icon icon-exchange',
                   id: 'jobTransfer',
                   tip: "移动",
                   action: function (item) {
                       var data = $(this.parentElement.parentElement).data("data");
                       var parsedObj = {
                           sourceId: data.Id,
                           targetId: null,
                           type: 'TRANSFER',
                           name: data.style.title
                       }
                       dropCallBack(parsedObj);
                   },
                   visble: function (dom) {
                       var data = $(dom.parentElement.parentElement).data("data");
                       return !data.style.isRoot;
                   }
               },
               {
                   icon: 'icon icon-signin',
                   id: 'jobBind', //绑定组织
                   tip: "关联组织",
                   action: function (item) {
                       var data = $(this.parentElement.parentElement).data("data");
                       var parsedObj = {
                           sourceId: data.Id,
                           targetId: null,
                           type: 'BIND',
                           name: data.style.title
                       }
                       dropCallBack(parsedObj);
                   },
                   visble: function (dom) {
                       var data = $(dom.parentElement.parentElement).data("data");
                       return data.style.jobType === 1;
                   }
               },
               {
                   icon: 'icon icon-signout',
                   id: 'jobUnBind',//解除绑定
                   tip: "解除组织关联",
                   action: function (item) {
                       var data = $(this.parentElement.parentElement).data("data");
                       var parsedObj = {
                           sourceId: data.Id,
                           targetId: null,
                           type: 'UNBIND',
                           name: data.style.title
                       }
                       dropCallBack(parsedObj);
                   },
                   visble: function (dom) {
                       var data = $(dom.parentElement.parentElement).data("data");
                       return data.style.jobType === 2 || data.style.jobType === 3;
                   }
               }
        ];

        //初始化图标html
        var iconTemplate = '<span class="org_icon_{1} {0} text-default" title="{2}" aria-hidden="true" ></span>';
        var icons = '';
        for (var i = 0; i < iconAction.length; i++) {
            icons += iconTemplate.fill(iconAction[i].icon, iconAction[i].id, iconAction[i].tip);
        }


        var cachedBoxDom = [];
        _.forEach(cachedRect, function (item) {
            //jobType 1 个人 2 组织无下级  3 组织有下级 0 空组织
            var colorClass = "orgNode_jobtype" + item.style.jobType;



            var regions = ('<div class="orgNode_header"><span class="orgText">{0}</span></div>' +
                            '<div class="orgNode_body"><div class="orgText" draggable="false">{1}</div></div>' +
                            '<div class="orgNode_footer" draggable="false">{2}</div>').fill(item.style.title, item.style.text, icons);

            var boxStr = '<div style="' +
                'height:' + (item.style.height) + 'px;' +
                'width:' + (item.style.width) + 'px;' +
                'left:' + item.style.x + 'px;' +
                'top:' + item.style.y + 'px; "  id="org_' + item.Id + '" draggable="true" class="orgNode ' + colorClass + '">'
                + regions + '</div>';
            var boxDom = $(boxStr);
            boxDom.data("data", item); //设置数据
            $("#" + domId + " div:first").append(boxDom);
            cachedBoxDom.push($("#org_" + item.Id));
        });

        //为图标绑定Click事件
        for (var j = 0; j < iconAction.length; j++) {
            var itemDom = $('.org_icon_{0}'.fill(iconAction[j].id));
            itemDom.css('cursor', 'pointer');
            for (var k = 0; k < itemDom.length; k++) {
                var item = itemDom[k];
                if (iconAction[j].visble(item)) {
                    $(item).show();
                    $(item).click(iconAction[j].action);
                } else {
                    $(item).hide();
                };
            }
        }


        ////function  是否为可以移动状态
        //function isAllowMoveTo(sourceId, targetId) {
        //    var data = jsonData;
        //    var startFlag = false;
        //    var closeRecursion1 = false;
        //    var closeRecursion2 = false;
        //    var isIncluded = false;
        //    var nodeData = {};
        //    var canMoveTo = false;
        //    function getNodeData(current, newId) {
        //        if (current.id === newId) {
        //            var closeRecursion1 = true;
        //            nodeData = current;
        //        }

        //        if (current.children != null && current.children.length > 0) {
        //            for (var i = 0; i < current.children.length; i++) {
        //                if (closeRecursion1) {
        //                    break;
        //                }
        //                getNodeData(current.children[i], newId);
        //            }
        //        }
        //    }

        //    function targetIdIsInclude(data, newId) {
        //        if (current.id === newId) {
        //            isIncluded = true;
        //            closeRecursion2 = true;
        //        }

        //        if (current.children != null && current.children.length > 0) {
        //            for (var i = 0; i < current.children.length; i++) {
        //                if (closeRecursion2) {
        //                    break;
        //                }
        //                getNodeData(current.children[i], newId);
        //            }
        //        }
        //    }

        //    getNodeData(data, sourceId);
        //    //组织节点不允许被拖入
        //    if (data.jobType > 1) {
        //        return false;
        //    }
        //    targetIdIsInclude(nodeData, targetId);
        //    canMoveTo = isIncluded;
        //    return canMoveTo;
        //}


        //绑定事件
        _.forEach(cachedBoxDom, function (boxDom) {

            boxDom[0].ondblclick = function (ev) {
                var data = boxDom.data("data");
                if (data.style.jobType === 0) {
                    var parsedObj = {
                        sourceId: data.Id,
                        targetId: null,
                        type: 'BIND',
                        name: data.style.title
                    }
                    dropCallBack(parsedObj);
                } else {
                    var type = data.style.jobType === 1 ? "JOB" : "GROUP";
                    dbClick(type, data.Id);
                }

            }
            boxDom[0].onmousedown = function (ev) {
                _.forEach(cachedBoxDom, function (item) {
                    item.removeClass("selected");
                });
                $(this).addClass("selected");
            }
            boxDom[0].ondragstart = function (ev) {
                dragStart(ev);
            };

            boxDom[0].ondragover = function (ev) {
                $(this).addClass("selected");
                //TODO: 判断是否允许 Drop
                ev.preventDefault();
            }
            boxDom[0].ondragleave = function (ev) {
                $(this).removeClass("selected");
                ev.preventDefault();
            }
            boxDom[0].ondrop = function (ev) {
                var parsedObj = JSON.parse(ev.dataTransfer.getData('text'));
                parsedObj = {
                    targetId: this.id.replace("org_", ""),
                    sourceId: !!parsedObj.id ? parsedObj.id.replace("org_", "") : null,
                    type: parsedObj.type
                }
                dropCallBack(parsedObj);
                ev.preventDefault();
            }
        });

        //取消拖拽事件
        _.forEach($(".orgText"), function (item) {
            item.ondragstart = function (ev) {
                ev.preventDefault();
                return false;
            }
        });
        _.forEach($(".orgNode_footer"), function (item) {
            item.ondragstart = function (ev) {
                ev.preventDefault();
                return false;
            }
        });

        zr.render();
        completion();
        return {
            zrender: zr,
            cachedRect: cachedRect,
            cachedLine: cachedLine,
            cachedLineMap: cachedLineMap,
            positionCollection: posCol
        }

    }



    return {
        create: createChart
    }
});
