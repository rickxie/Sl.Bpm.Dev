define("wfd/wfselection", function(require, exports, module) {

    exports.WFSelection = function(dj, svgPen, wfConst) {
        this.BorderSetElement = null;
        this.PathElement = null;
        this.WFConst = wfConst;
        this.Visible = false;
        //是否为框选 如果为否则代表单击选择了单个点
        this.IsBoxing = false;
        this.nodeBorderBoxWidth = this.WFConst.NODE_BORDERBOX_WIDTH;
        this.boxSelectionColor = this.WFConst.BOX_SELECTION_COLOR;
        this.boxSelectionWidth = this.WFConst.BOX_SELECTION_WIDTH;
        //当前被聚焦的对象数组，包含节点和线段
        this.SvgFocusedSelectionIn = [];
        //当前没有被聚焦的对象数组，包含节点和线段
        this.SvgFocusedSelectionOut = [];

        var pen = svgPen;

        var wfController = dj.wfController;

        this.Box = null;
        this.initialize = function() {
            var box = { x: 100, y: 100, width: 46, height: 46 };
            this.Box = box;

            var borderWidth = this.WFConst.NODE_BORDERBOX_WIDTH;
            var halfBoxWidth = this.WFConst.NODE_BORDERBOX_WIDTH / 2;

            var leftTopX = box.x;
            var leftTopY = box.y;
            var fullW = box.width;
            var fullH = box.height;
            var borderSet = pen.set(
                //var left-top = 
                pen.rect(leftTopX - halfBoxWidth, leftTopY - halfBoxWidth, borderWidth, borderWidth),
                //var right-top = 
                pen.rect(leftTopX + fullW - halfBoxWidth, leftTopY - halfBoxWidth, borderWidth, borderWidth),
                //var bottom-right = 
                pen.rect(leftTopX - halfBoxWidth, leftTopY + fullH - halfBoxWidth, borderWidth, borderWidth),
                //var bottom -left = 
                pen.rect(leftTopX + fullW - halfBoxWidth, leftTopY + fullH - halfBoxWidth, borderWidth, borderWidth)
            );
            var points = ['M', box.x, box.y, "L", box.x + box.width, box.y, 'L', box.x + box.width, box.y + box.height, 'L', box.x, box.y + box.height, 'Z'];
            this.PathElement = pen.path(points);

            borderSet.guid = this.guid;
            borderSet.forEach(function(el) {
                el.guid = borderSet.guid;
            });

            //将边框与image的距离差记录为属性为后面移动image时实时计算边框距离做准备	  
            borderSet.forEach(function(el) {
                el.dx = box.x - el.attr("x");
                el.dy = box.y - el.attr("y");
            });
            this.BorderSetElement = borderSet;
            this.blur();
            this.setBorderSetStrokeAndFill(this.WFConst.NODE_BORDER_COLOR, this.WFConst.NODE_BORDER_FILLCOLOR);
        }

        this.redraw = function(box) {
            if (box == null)
                return;
            this.Box = box;
            this.Box.ox = box.x;
            this.Box.oy = box.y;
            var halfBoxWidth = this.nodeBorderBoxWidth / 2;

            var leftTopX = box.x;
            var leftTopY = box.y;
            var fullW = box.width;
            var fullH = box.height;
            //var left-top = 
            this.BorderSetElement[0].attr("x", leftTopX - halfBoxWidth);
            this.BorderSetElement[0].attr("y", leftTopY - halfBoxWidth);
            //var right-top = 
            this.BorderSetElement[1].attr("x", leftTopX + fullW - halfBoxWidth);
            this.BorderSetElement[1].attr("y", leftTopY - halfBoxWidth);
            //var bottom-right = 
            this.BorderSetElement[2].attr("x", leftTopX - halfBoxWidth);
            this.BorderSetElement[2].attr("y", leftTopY + fullH - halfBoxWidth);
            //var bottom -left = 
            this.BorderSetElement[3].attr("x", leftTopX + fullW - halfBoxWidth);
            this.BorderSetElement[3].attr("y", leftTopY + fullH - halfBoxWidth);
            this.movePin();
            this.redrawPath();
            this.Visible ? this.show() : this.hide();
        }
        this.display = function (box) {
            if (box == null)
                return;
            this.redraw(box);
            this.focus();

        }
        this.redrawPath = function () {
            var box = this.Box;
            if (this.PathElement != null)
                this.PathElement.remove();
            var points = ['M', box.x, box.y, "L", box.x + box.width, box.y, 'L', box.x + box.width, box.y + box.height, 'L', box.x, box.y + box.height, 'Z'];
            this.PathElement = pen.path(points);
            this.PathElement.attr({
                stroke: this.boxSelectionColor,
                "stroke-width": this.boxSelectionWidth
        });
            this.PathElement.toBack();
        }

        this.toFront = function() {
            this.BorderSetElement.forEach(function(el) {
                el.toFront();
            });
        }

        this.show = function() {
            this.PathElement.show();
            this.BorderSetElement.forEach(function(el) {
                el.show();
            });
        }
        this.hide = function() {
            this.PathElement.hide();
            this.BorderSetElement.forEach(function(el) {
                el.hide();
            });
        }
        this.focus = function() {
            this.toFront();
            this.show();
            this.Visible = true;
        }
        this.blur = function() {
            this.hide();
            this.Visible = false;
            var selectIn = this.SvgFocusedSelectionIn;
            if (selectIn != null && selectIn.length > 0) {
                for (var i = 0; i < selectIn.length; i++) {
                    selectIn[i].blur();
                }
                this.SvgFocusedSelectionIn = [];
            }
        }
        //框选已经被选中的点，和没有被选中的点并收集参考线信息
        this.boxingSelectIn = function() {
            this.SvgFocusedSelectionOut = [];
            var lines = wfController.WFMemory.SvgConnections;
            //注册标准型集合
            var referenceLine = wfController.WFMemory.WFReferenceLine;
            referenceLine.clear();

            for (var i = 0; i < lines.length; i++) {
                if ($.inArray(lines[i], this.SvgFocusedSelectionIn) === -1){
                    this.SvgFocusedSelectionOut.push(lines[i]);
                }
            }

            var nodes = wfController.WFMemory.SvgNodes;
            for (var i = 0; i < nodes.length; i++) {
                if ($.inArray(nodes[i], this.SvgFocusedSelectionIn) === -1) {
                    this.SvgFocusedSelectionOut.push(nodes[i]);
                    referenceLine.collecting(nodes[i]);
                }
            }

        }
        //框选事件
        this.boxing = function(box) {
            this.SvgFocusedSelectionIn = [];
            this.SvgFocusedSelectionOut = [];
            var selectIn = this.SvgFocusedSelectionIn;
            var selectOut = this.SvgFocusedSelectionOut;
            var lines = wfController.WFMemory.SvgConnections;
            //注册标准型集合
            var referenceLine = wfController.WFMemory.WFReferenceLine;
            referenceLine.clear();

            for (var i = 0; i < lines.length; i++) {
                if (lines[i].inBox(box))
                    selectIn.push(lines[i]);
                else {
                    selectOut.push(lines[i]);
                }
            }

            var nodes = wfController.WFMemory.SvgNodes;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].inBox(box))
                    selectIn.push(nodes[i]);
                else {
                    selectOut.push(nodes[i]);
                    referenceLine.collecting(nodes[i]);
                }
            }
            this.IsBoxing = true;
        };
        //框选事件结束
        this.boxed = function() {
            var selectIn = this.SvgFocusedSelectionIn;
            var selectOut = this.SvgFocusedSelectionOut;
            for (var i = 0; i < selectIn.length; i++) {
                selectIn[i].focus();
            }
            for (var i = 0; i < selectOut.length; i++) {
                selectOut[i].blur();
            }
            this.display(this.getSelectionInBox());
            this.IsBoxing = false;
        }
        this.hideSelection = function() {
            var selectIn = this.SvgFocusedSelectionIn;
            for (var i = 0; i < selectIn.length; i++) {
                selectIn[i].hide();
            } 
        }

        this.remove = function() {
            this.hide();
            var selectIn = this.SvgFocusedSelectionIn;
            if (selectIn != null && selectIn.length > 0) {
                for (var i = 0; i < selectIn.length; i++) {
                    wfController.removeObj(selectIn[i]);
                }
            }
            this.blur(); 
        }

        this.setEvent = function(mousedown, move, dragger, up) {
            var base = this;
            this.BorderSetElement.forEach(function(el) {
                el.mousedown(mousedown);
                el.drag(move, dragger, up);
                el.click(function() {
                    event.stopPropagation();
                });
            });
        }
        this.hasSelectionIn = function() {
            return this.SvgFocusedSelectionIn != null && this.SvgFocusedSelectionIn.length > 0;
        }
        this.setBorderSetStrokeAndFill = function(color, fillColor) {
            this.BorderSetElement.forEach(function(el) {
                el.attr({
                    stroke: color,
                    fill: fillColor
                    //,"cursor": "crosshair"
                });
            });
        }
        //获得框选区域的盒子数据
        this.getSelectionInBox = function () {
            var selectIn = this.SvgFocusedSelectionIn;
            if (selectIn == null || selectIn.length < 1)
                return null;

            var minimumX = wfController.WFMemory.WFWorkbase.width;
            var minimumY = wfController.WFMemory.WFWorkbase.height;
            var maxmumX = 0;
            var maxmumY = 0;
            for (var i = 0; i < selectIn.length; i++) {
                var obj = selectIn[i];
                if (wfController.isNodeObj(obj)) {
                    minimumX = obj.x <= minimumX ? obj.x : minimumX;
                    minimumY = obj.y <= minimumY ? obj.y : minimumY;
                    maxmumX = obj.x + obj.width >= maxmumX ? obj.x + obj.width : maxmumX;
                    maxmumY = obj.y + obj.height >= maxmumY ? obj.y + obj.height : maxmumY;
                }
                else if (wfController.isConnectionObj) {
                    var points = obj.PointArray;
                    for (var j = 0; j < points.length; j++) {
                        var point = points[j];
                        minimumX = point.x <= minimumX ? point.x : minimumX;
                        minimumY = point.y <= minimumY ? point.y : minimumY;
                        maxmumX = point.x >= maxmumX ? point.x : maxmumX;
                        maxmumY = point.y >= maxmumY ? point.y : maxmumY;
                    }
                }
            }

            var box = { x: minimumX, y: minimumY, width: maxmumX - minimumX, height: maxmumY - minimumY };
            return box;
        }

        //x,y 是移动的距离
        this.move = function (x, y) {
            this.Box.x = x;
            this.Box.y = y;
            var inthis = this;
            this.BorderSetElement.forEach(function (el) {
                var mp = wfController.getMovePointByReferencePoint(inthis.Box, el);
                el.attr("x", mp.x);
                el.attr("y", mp.y);
            });
            this.redrawPath();
            //TODO：触发参考线
            wfController.WFMemory.WFReferenceLine.judging(this.Box);
        }
        this.movePermanent = function (wfNode) {
            this.move(wfNode);
            this.movePin();
        }
        this.movePin = function () {
            this.Box.ox = this.Box.x;
            this.Box.oy = this.Box.y;
            this.BorderSetElement.forEach(function (el) {
                el.ox = el.attr("x");
                el.oy = el.attr("y");
            });
        }

        this.moveSelection = function (x, y) {
            this.move(x, y);
            var selectedObj = this.SvgFocusedSelectionIn;
            for (var i = 0; i < selectedObj.length; i++) {
                if (wfController.isNodeObj(selectedObj[i])) {
                    var mp = wfController.getMovePointByReferencePoint(this.Box, selectedObj[i]);
                    selectedObj[i].move(mp);
                }
            }
        }
        this.moveSelectionByNode = function (wfNode) {
            var mp = wfController.getMovePointByReferencePoint(wfNode, this.Box);
            this.move(mp.x, mp.y);
            var selectedObj = this.SvgFocusedSelectionIn;
            for (var i = 0; i < selectedObj.length; i++) {
                if (wfController.isNodeObj(selectedObj[i]) && selectedObj[i].guid !== wfNode.guid) {
                    selectedObj[i].moveByNode(wfNode);
                }
            }
        }

        this.moveSelectionPin = function (wfNode) {
            this.movePin();
            var selectedObj = this.SvgFocusedSelectionIn;
            for (var i = 0; i < selectedObj.length; i++) {
                if (wfController.isNodeObj(selectedObj[i]) && selectedObj[i].guid !== wfNode.guid) {
                    selectedObj[i].moveByNodePin();
                }
            }
            wfController.WFMemory.WFReferenceLine.hide();
        }

        this.PushObjs = function(objs) {
            for (var i = 0; i < objs.length; i++) {
                this.SvgFocusedSelectionIn.push(objs[i]);
            }
        }

        this.resize = function (multipiler) {

            for (prop in this.Box) {
                this.Box[prop] *= multipiler;
            }
            this.redraw(this.Box,this.IsBoxing);
        }
        this.initialize();
    };
});