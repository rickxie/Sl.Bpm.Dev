define("wfd/wfdesigner", function(require, exports, module) {
    exports.WFDesigner = function(model, basePath, container, isDesignModel) {
        this.WFController = {};
        this.WFMemory = {};
        var wfMemory = {};
        var wfController = {};
        var wfConst = {} 
        this.isDesignModel = isDesignModel;
        var _dependency = null;
        var wfSelf = {};
        var varModule = {};
        this.WFContainer = container;
        //流程唯一标识
        this.guid = "";
        //流程信息 所有信息
        this.dataSource = model.model;
        this.wfdService = {};

        this.initialize = function () {
           
            //初始化 WFConst
            var varModule = require("wfd/wfconst");
            wfConst = new varModule.WFConst();
            //初始化 WFMemory
            varModule = require("wfd/wfmemory");
            wfMemory = new varModule.WFMemory();
            this.WFMemory = wfMemory;
            wfMemory.isDesignModel = this.isDesignModel;

            //初始化 WFController
            varModule = new require("wfd/wfcontroller");
            wfController = new varModule.WFController(wfMemory, wfConst);

            wfMemory.width = this.dataSource.width || 2000;
            wfMemory.height = this.dataSource.height || 1500;
            wfMemory.zoom = this.dataSource.zoom || 1;
            //初始化 WFWorkbase工作区
            var seaModule = new require("wfd/wfworkbase");
            wfMemory.WFWorkbase = new seaModule.WFWorkbase(wfController, wfConst.WF_SVG, wfMemory.width, wfMemory.height, this.WFContainer); 
            //初始化画笔
            var svg_pen = Raphael(wfConst.WF_SVG, wfMemory.width, wfMemory.height);
            svg_pen.customAttributes.type = function() {};
            svg_pen.customAttributes.fromid = function() {};
            svg_pen.customAttributes.toid = function() {};
            svg_pen.customAttributes.guid = function () { };

            //初始化 WFGridLine
            varModule = require("wfd/wfgridline");
            var wfGridline = new varModule.WFGridline(svg_pen, wfConst.grid_line_length.NORMAL * wfMemory.zoom, wfConst.GAP_NUMBER * wfMemory.zoom);
            wfMemory.WFGridline = wfGridline;


            // 被依赖的基本对象
            _dependency = {
                svg_pen: svg_pen,
                wfController: wfController,
                wfConst: wfConst,
                isDesignModel: this.isDesignModel,
                service: {
                    saveNode: this.saveNode,
                    saveLine: this.saveLine,
                    removeNode: this.removeNode,
                    removeLine: this.removeLine,
                    saveObject: this.saveObject,
                    removeObject: this.removeObject,
                    openObject: this.openObject,
                    openLine: this.openLine,
                    openNode: this.openNode
                }
            };



            //初始化 WFSelection
            varModule = require("wfd/wfselection");
            wfMemory.WFSelection = new varModule.WFSelection(_dependency, svg_pen, wfConst);
            //初始化 WFReferenceLine
            varModule = require("wfd/wfreferenceline");
            wfMemory.WFReferenceLine = new varModule.WFReferenceLine(_dependency);
            //给属性赋值
            this.WFController = wfController;
            //初始化 WFLineTool
            varModule = require("wfd/wflinetool");
            wfMemory.WFConst = wfConst;
            wfMemory.WFLineTool = new varModule.WFLineTool(_dependency, this.event_line_dbclick);
            //初始化 WFSelectingBox
            varModule = require("wfd/wfselectingbox");
            wfMemory.WFSelectingBox = new varModule.WFSelectingBox(_dependency);
            //初始化 WFContextMenu
            varModule = require("wfd/wfcontextmenu");
            wfMemory.WFContextMenu = new varModule.WFContextMenu(_dependency);

            wfSelf = this;
            wfMemory.BasePath = basePath;
            wfMemory.SvgPen = svg_pen;
            //设置当前流程guid
            wfMemory.guid = this.dataSource.id || this.WFController.newGuid(this);

            model && this.LoadWorkflow(model.nodes, model.lines, model.points, model.objects);
            wfController.blur();
        } 
        //Load 整个设计器
        this.LoadWorkflow = function (nodes, links, points, objects) {

            var selectIn = [];
            for (var i = 0; i < nodes.length; i++) {
                var m = wfController.getDefaultNodeValue(nodes[i].type);
                selectIn.push(this.addWFNode(
                                        {
                                            x: nodes[i].x,
                                            y: nodes[i].y,
                                            text: nodes[i].name,
                                            width: nodes[i].width,
                                            height: nodes[i].height,
                                            shapeType: nodes[i].shapeType,
                                            imageSrc : nodes[i].imageSrc,
                                            guid: nodes[i].id,
                                            type: nodes[i].type,
                                            fontSize: wfConst.TEXT_FONT_SIZE * wfMemory.zoom,
                                            textMargin: wfConst.NODE_TEXT_MARGIN * wfMemory.zoom
                                        }, nodes[i]));
            }
            for (var i = 0; i < objects.length; i++) {
                var m = wfController.getDefaultNodeValue(objects[i].type);
                selectIn.push(this.addWFNode(
                                        {
                                            x: objects[i].x,
                                            y: objects[i].y,
                                            text: objects[i].text,
                                            width: objects[i].width,
                                            height: objects[i].height,
                                            shapeType: objects[i].shapeType,
                                            imageSrc: objects[i].imageSrc,
                                            guid: objects[i].id,
                                            type: objects[i].type,
                                            fontSize: wfConst.TEXT_FONT_SIZE * wfMemory.zoom,
                                            textMargin: wfConst.NODE_TEXT_MARGIN * wfMemory.zoom
                                        }, objects[i]));
            }
            if (links != null) {
                for (var i = 0; i < links.length; i++) {
                    var startNode = wfController.getWFNodeByGuid(links[i].startNodeId);
                    var endNode = wfController.getWFNodeByGuid(links[i].endNodeId);
                    var pointArray = wfController.getPointsByGuid(points, links[i].id);
                    selectIn.push(this.addConnection(
                    {
                        WFNodeStart : startNode, 
                        WFNodeEnd :endNode, 
                        LineType : links[i].lineType, 
                        M : links[i].m, 
                        PointArray : pointArray,
                        text :links[i].memo,
                        guid: links[i].id,
                        arrowPadding: wfConst.ARROW_PADDING * wfMemory.zoom,
                        lineWidth: wfConst.LINE_WIDTH * wfMemory.zoom,
                        fontSize: wfConst.TEXT_FONT_SIZE * wfMemory.zoom,
                        textMargin: wfConst.LINE_TEXT_MARGIN * wfMemory.zoom
                    }, links[i], false));
                }
            }
            return selectIn;
        };


        //添加新的图片步骤节点
        this.addWFNode = function(nodeInfo, datasource) {
            wfConst = wfMemory.WFConst;

            //边界检查
            var bPoint = wfController.boundariesTransform(nodeInfo.x, nodeInfo.y, nodeInfo.width, nodeInfo.height);
            nodeInfo.x = bPoint.x;
            nodeInfo.y = bPoint.y;
            var wfNode = {};
            if (nodeInfo.type === 1001) {
                var objModel = require("wfd/wfobject");
                wfNode = new objModel.WFObject(_dependency, nodeInfo, datasource);
            } else {
                var seaNode = require("wfd/wfnode");
                wfNode = new seaNode.WFNode(_dependency, nodeInfo, datasource);
            }
            if (wfSelf.isDesignModel) {
                wfNode.ImageElement.drag(this.event_node_move, this.event_node_dragger, this.event_node_up);
                wfNode.ImageElement.click(this.event_node_click);
                wfNode.ImageElement.mouseup(this.event_node_mouseup);
            }
            wfNode.ImageElement.dblclick(this.event_node_dbclick);
            wfNode.WFNodeSet.setEvent(this.event_border_mousedown, this.event_border_move, this.event_border_dragger, this.event_border_up);
            wfNode.show();
            wfMemory.SvgNodes.push(wfNode);
            wfController.focusNode(wfNode);
            if (nodeInfo.type === 1001)
                wfSelf.saveObject(wfNode);
            else
                wfSelf.saveNode(wfNode);
            return wfNode;
        }

        this.addConnection = function (lineInfo, dataSource, isTempline) {
            varModule = require("wfd/wfconnection");
            var wfConnection = new varModule.WFConnection(_dependency, lineInfo, dataSource, isTempline);
            if (!wfController.canBeConnectioed(wfConnection)) {
                wfConnection.SetEvent(wfSelf.event_line_click, wfSelf.event_line_dbclick);
                //只有正规线才加入内存
                !isTempline && wfMemory.SvgConnections.push(wfConnection);
            } else {
                wfConnection.remove();
            }
            !isTempline && wfSelf.saveLine(wfConnection);
            return wfConnection;
        }

        this.icon_onDragStart = function(ev) { 
            //IE使用的是offsetX,Y, 其他浏览器使用的是layerX,Y
            var x = (ev.offsetX == undefined) ? ev.layerX : ev.offsetX;
            var y = (ev.offsetY == undefined) ? ev.layerY : ev.offsetY;
            ev.dataTransfer.setData("text", ev.currentTarget.id + "," + x + "," + y);
            //	ev.dataTransfer.setData("ValidDrop", true);

        }


        this.svg_onDragOver = function(ev) {
            //	var validDrop = ev.dataTransfer.getData("ValidDrop");
            //	if (validDrop == undefined || validDrop == null || validDrop == false) {
            //		return;
            wfMemory.tempLineIsDrawing = false;
            //	if (ev.srcElement.localName == "svg")
            //		return false;
            ev.preventDefault();
        }


        this.svg_onDrop = function(ev) {

            var point = ev.dataTransfer.getData("text");
            var paras = point.split(',');
            if (paras.length !== 3)
                return;
            paras[1] = 0;
            paras[2] = 0;
            var type = wfController.getNodeType(paras[0]);
            var m = wfController.getDefaultNodeValue(type);
            this.addWFNode(
            {
                x: ev.layerX - paras[1],
                y:ev.layerY - paras[2],
                text: m.defName,
                imageSrc: m.defImg,
                width: wfConst.NODE_WIDTH * wfMemory.zoom,
                height: wfConst.NODE_HEIGHT * wfMemory.zoom,
                shapeType: 0,
                guid: wfController.newGuid(),
                type: type,
                fontSize: wfConst.TEXT_FONT_SIZE * wfMemory.zoom,
                textMargin: wfConst.NODE_TEXT_MARGIN * wfMemory.zoom
            }, {}); 
            //阻止浏览器的默认事件
            ev.preventDefault();
            ev.returnValue = false;
        }



        //主要是画连线
        this.event_node_mouseup = function() {
            if (wfMemory.tempLineIsDrawing == true) {
                var currentWfNode = wfController.getWFNodeByGuid(this.guid);
                wfSelf.addConnection(
                {
                    WFNodeStart: wfMemory.SvgFocusedObj,
                    WFNodeEnd: currentWfNode,
                    LineType: wfConst.line_type.LINE_STRAIGHT,
                    PointArray: null,
                    M: null,
                    text: "",
                    guid: wfController.newGuid(),
                    arrowPadding: wfConst.ARROW_PADDING * wfMemory.zoom, 
                    lineWidth: wfConst.LINE_WIDTH * wfMemory.zoom,
                    fontSize: wfConst.TEXT_FONT_SIZE * wfMemory.zoom,
                    textMargin: wfConst.LINE_TEXT_MARGIN * wfMemory.zoom
            }, {} ,false);
            }
            wfMemory.tempLineIsDrawing = false;

        }

     

        //图片节点的单击事件
        this.event_node_click = function() {
            var curWfNode = wfController.getWFNodeByGuid(this.guid);
            if (wfMemory.WFSelection.hasSelectionIn() && curWfNode.inBox(wfMemory.WFSelection.Box))
                return;
            wfController.focusNode(curWfNode);
            event.stopPropagation();
            event.preventDefault();
        }

        //拖动事件
        this.event_node_move = function(dx, dy) {

            //当前鼠标的x坐标
            var x = this.ox + dx;
            //当前鼠标的y坐标
            var y = this.oy + dy;

            var wfNode = wfController.getWFNodeByGuid(this.guid);


            //对选择框进行贴边设计 获取贴边的参考线值
            var selectionBox = wfMemory.WFSelection.Box;
            var wfnBox = wfNode;
            var ddx = wfnBox.ox - selectionBox.ox;
            var ddy = wfnBox.oy - selectionBox.oy;
            var box = { x: selectionBox.ox + dx, y: selectionBox.oy + dy, width: selectionBox.width, height: selectionBox.height };
            var sx = null, sy = null;
            if (Math.abs(dx) > 0) {
                sx = wfMemory.WFReferenceLine.getNearestMatch(box, true);
            }
            if (Math.abs(dy) > 0) {
                sy = wfMemory.WFReferenceLine.getNearestMatch(box, false);
            }


            //边界检查
            var bPoint = wfController.boundariesTransform(sx, sy, selectionBox.width, selectionBox.height);

            sx  && (sx = bPoint.x);
            sy  && (sy = bPoint.y);

            //从框选的定位点转换成当前节点的定位点
            x = sx == null ? x : sx + ddx;
            y = sy == null ? y : sy + ddy;


            if (wfNode) {
                wfNode.move(x, y); 
                wfMemory.WFSelection.moveSelectionByNode(wfNode);
            } 
            eve.stop();
        }
        

        
        //拖动节点开始时的事件
        this.event_node_dragger = function() {
            this.ox = this.attr("x");
            this.oy = this.attr("y");
            var wfNode = wfController.getWFNodeByGuid(this.guid);
                //框选不显示 或者是不存在于框选中则聚焦
            if (wfMemory.WFSelection.Visible === false || !wfNode.inBox(wfMemory.WFSelection.Box)) {
                wfController.focusNode(wfNode);
            }
            this.SvgFocusedObj = wfNode;
            //wfMemory.WFSelection.moveSelectionPin(wfNode);
            wfNode.moveBegin();
            event.preventDefault();
        }


        //拖动结束后的事件
        this.event_node_up = function() {
            var wfNode = wfController.getWFNodeByGuid(this.guid);
            //框选不显示 或者是不存在于框选中则聚焦
            if (wfMemory.WFSelection.Visible === false || !wfNode.inBox(wfMemory.WFSelection.Box)) {
                wfController.focusNode(wfNode);
            }
            //记录移动后的位置
            if (wfController.isNodeObj(wfNode)) {
                wfNode.moveEnd();
                wfController.WFMemory.WFSelection.moveSelectionPin(wfNode);
            }
        }


        this.event_border_mousedown = function(event) {
            wfMemory.tempLineStartPoint.x = this.attr("cx");
            wfMemory.tempLineStartPoint.y = this.attr("cy");
            var wfNodeStart = wfController.getWFNodeByGuid(this.guid);
            wfController.focusNode(wfNodeStart);
            wfMemory.SvgFocusedObj = wfNodeStart;
            wfMemory.tempWFConnection = {};
            wfMemory.tempWFConnection = wfSelf.addConnection({
                WFNodeStart: wfNodeStart,
                WFNodeEnd: wfNodeStart,
                LineType: wfConst.line_type.LINE_STRAIGHT,
                PointArray: [wfMemory.tempLineStartPoint],
                M: null,
                text: "",
                guid: wfController.newGuid(),
                arrowPadding: wfConst.ARROW_PADDING * wfMemory.zoom,
                lineTextMargin: wfConst.LINE_TEXT_MARGIN * wfMemory.zoom,
                lineWidth: wfConst.LINE_WIDTH * wfMemory.zoom
            }, {}, true);
            
            varModule = require("wfd/wfconnection");
            wfController.stopPropagation(event);
        }

        this.event_border_move = function(dx, dy, x, y, ev) {
            wfMemory.tempLineIsDrawing = true;
            document.body.style.cursor = "crosshair";
            var mousePos = wfController.mouseCoords(ev);

            if (wfMemory.tempWFConnection != null && wfMemory.tempWFConnection.PointArray != null) {
                wfMemory.tempWFConnection.drawTempLine(mousePos);
            }
        }

        this.event_border_dragger = function(event) {
            this.ox = this.attr("x");
            this.oy = this.attr("y");

        }


        //拖拽放起鼠标事件
        this.event_border_up = function(event) {
            if (wfMemory.tempWFConnection != null && wfMemory.tempWFConnection.PathElement != null) {
                wfMemory.tempWFConnection.PathElement.remove();
                wfMemory.tempWFConnection.remove();
                wfMemory.tempWFConnection = {};
                document.body.style.cursor = "default";
            }
        }


        //连线单击事件
        this.event_line_click = function() {
            wfController.focusConnection(this.guid);
            wfController.stopPropagation();
        }

        //连线单击事件

        this.event_line_dbclick = function () {
            wfMemory.enable = false;
            var guid = (this.guid != null && this.guid !== "") ? this.guid : $(this).data("guid");
            var currentConnection = wfController.getWFConnectionById(guid); //getNodeModelByGuid

            function callBack(data) {
                if (data != null) {
                    $.extend(currentConnection.dataSource, data);
                currentConnection.refreshText(data.memo);
                }
                wfMemory.enable = true;
            }

            currentConnection.openDialog(callBack);
        }


        //步骤属性设置
        this.event_node_dbclick = function() {
            wfMemory.enable = false;
            var currentNode = wfController.getWFNodeByGuid(this.guid); //getNodeModelByGuid
            
            function callBack(data) {
                if (data != null) {
                    $.extend(currentNode.dataSource, data);
                    currentNode.refreshText(data.name || data.text);
                }
                wfMemory.enable = true;
            }

            var processNodes = [];
            wfMemory.SvgNodes.map(function(item) {
                if (item.type === 1 && item.guid !== currentNode.guid) {
                    processNodes.push({ displayName: item.text, id: item.guid });
                }
            });
            currentNode.openDialog(callBack);
        }

        //删除数组中元素
        Array.prototype.remove = function(n) {
            if (isNaN(n) || n > this.length) {
                return false;
            }
            this.splice(n, 1);
            return true;
        }


        //保存流程信息
        this.save = function() {
                
        };




        this.saveNode = function (wfNode) {
            var jsonData = wfNode.getJsonData();
            wfSelf.database.NodeSave(jsonData);
        }
        this.removeNode = function (wfNode) {
            var jsonData = wfNode.getJsonData();
            wfSelf.database.NodeRemove(jsonData);
        }
        this.openNode = function (m, callBack) {
            wfSelf.database.NodeOpen(m, callBack);
        }
        this.removeLine = function (wfConnection) {
            wfSelf.database.LineRemove({id: wfConnection.guid});
        }

        this.openLine = function (m, callBack) {
            wfSelf.database.LineOpen(m, callBack);
        }
        this.saveLine = function(wfConnection) {
            var jsonData = wfConnection.getJsonData();
            wfSelf.database.LineSave(jsonData);
        }
        this.openObject = function(m, callBack) {
            wfSelf.database.ObjectOpen(m, callBack);
        }
        this.saveObject = function (wfObject) {
            var jsonData = wfObject.getJsonData();
            wfSelf.database.ObjectSave(jsonData);
        }
        this.removeObject = function (wfNode) {
            var jsonData = wfNode.getJsonData();
            wfSelf.database.ObjectRemove(jsonData);
        }

        //数据库保存
        this.database = {
            //删除节点
            NodeRemove: function () { },
            //节点位置保存
            NodeSave: function () { },
            NodeOpen: function () { },
            //放大缩小保存
            ZoomSave: function () { },
            //连线保存
            LineSave: function () { },
            LineRemove: function () { },
            //删除节点
            ObjectRemove: function () { },
            //节点位置保存
            ObjectSave: function () { },
            ObjectOpen: function () { },
            LineOpen: function () { }
        }


        this.initialize();
    };

});



