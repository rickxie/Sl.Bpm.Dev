define("wfd/wfnodeset", function (require, exports, module) {

    exports.WFNodeSet = function (dj, guid, imageElement, node) {
        this.NodeSetElement = null;
        this.guid = guid;
        this.ImageElement = imageElement;
        this.WFNode = node;
        this.borderMargin = dj.wfConst.NODE_BORDER_MARGIN;
        this.borderWidth = dj.wfConst.NODE_BORDER_RADIUS;
        this.Visible = true;
        var wfController = dj.wfController;
        var pen = dj.svg_pen;

        this.initialize = function () {
            var box = this.ImageElement.getBBox();
            this.drawBoardSet(box);
        }
        this.drawBoardSet = function (box) {
            if (this.NodeSetElement != null)
                this.remove();
            var boxImg = box;
            var leftTopX = boxImg.x;
            var leftTopY = boxImg.y;
            var fullW = boxImg.width;
            var fullH = boxImg.height;
            var halfW = boxImg.width / 2;
            var halfH = boxImg.height / 2;
            var borderSet = pen.set(
                //var top = 
                pen.circle(leftTopX + halfW, leftTopY - this.borderMargin, this.borderWidth),
                //var right = 
                pen.circle(leftTopX + fullW + this.borderMargin, leftTopY + halfH, this.borderWidth),
                //var bottom = 
                pen.circle(leftTopX + halfW, leftTopY + fullH + this.borderMargin, this.borderWidth),
                //var left = 
                pen.circle(leftTopX - this.borderMargin, leftTopY + halfH, this.borderWidth)
            );
            borderSet.guid = this.guid;
            borderSet.forEach(function (el) {
                el.guid = borderSet.guid;
            });

            //将边框与image的距离差记录为属性为后面移动image时实时计算边框距离做准备	  
            borderSet.forEach(function (el) {
                el.dx = boxImg.x - el.attr("cx");
                el.dy = boxImg.y - el.attr("cy");
                el.ox = el.attr("cx");
                el.oy = el.attr("cy");
            });

            this.NodeSetElement = borderSet;
            this.setNodeSetStrokeAndFill(dj.wfConst.NODE_BORDER_COLOR, dj.wfConst.NODE_BORDER_FILLCOLOR);
            this.setDefaultEvent();
        }
        // 拿节点当参照物
        this.move = function (wfNode) {
            this.NodeSetElement.forEach(function (el) {
                var mp = wfController.getMovePointByReferencePoint(wfNode, el);
                el.attr("cx", mp.x);
                el.attr("cy", mp.y);
            });
        }
        //x,y 是移动的距离
        this.movePermanent = function (wfNode) {
            this.move(wfNode);
            this.movePin();
        }

        this.movePin = function() {
            this.NodeSetElement.forEach(function (el) {
                el.ox = el.attr("cx");
                el.oy = el.attr("cy");
            });
        }

        this.show = function () {
            this.NodeSetElement.forEach(function (el) {
                el.show();
            });
        }

        this.hide = function () {
            this.NodeSetElement.forEach(function (el) {
                el.hide();
            });
        }
        this.toFront = function() {
            this.NodeSetElement.forEach(function(el) {
                el.toFront();
            });
        }
        this.focus = function () {
            this.toFront();
            this.show();
            this.Visible = true;
        }
        this.blur = function() {
            this.hide();
            this.Visible = false;
        }
        this.remove = function () {
            this.NodeSetElement.forEach(function (el) {
                el.remove();
            });
            this.Visible = false;
        }
        this.setDefaultEvent = function () {
            var baseSelf = this;

            this.NodeSetElement.forEach(function(el) {
                el.hover(function(
                ) {
                    baseSelf.NodeSetElement.show();
                }, function() {
                    if (!baseSelf.Visible) {
                        baseSelf.NodeSetElement.hide();
                    }
                });
            });

        }
        this.setEvent = function (mousedown, move, dragger, up) {
            var base = this;
            this.NodeSetElement.forEach(function (el) {
                el.mousedown(mousedown);
                el.drag(move, dragger, up);
                el.click(function () {
                    event.stopPropagation();
                });
            });
        }
        this.copyNew = function () {
            this.NodeSetElement.forEach(function(el) {
                el.guid = imageElement.guid;
            });
            this.NodeSetElement.guid = imageElement.guid;
        }
        this.setNodeSetStrokeAndFill = function (color, fillColor) {
            this.NodeSetElement.forEach(function (el) {
                el.attr({
                    stroke: color,
                    fill: fillColor,
                    "cursor": "crosshair"
                });
            });
        }
        this.resize = function(multipiler) {
            this.NodeSetElement.forEach(function (el) {
                el.attr({
                    "cx": el.attr("cx") * multipiler,
                    "cy": el.attr("cy") * multipiler 
                });
            });
            this.movePin();
        }
        this.initialize();
    };
});