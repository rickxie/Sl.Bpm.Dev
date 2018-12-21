define("wfd/wfnode", function(require, exports, module) {
    //节点对象
    //包含四个点边框的 BorderSet
    //一个文本 TextElement
    //一个图片 ImageElement
    exports.WFNode = function(dj, nodeInfo, datasource) {
        //节点周围的边框， 为四个绿色选中方框
        this.WFNodeSet = null;
        this.ImageElement = null;
        this.WFText = null;
        this.x = nodeInfo.x;
        this.y = nodeInfo.y;
        this.ox = nodeInfo.x;
        this.oy = nodeInfo.y;
        this.imageSrc = nodeInfo.imageSrc;
        this.width = nodeInfo.width;
        this.height = nodeInfo.height;
        this.shapeType = nodeInfo.shapeType;
        this.guid = nodeInfo.guid;
        this.text = nodeInfo.text;
        this.type = nodeInfo.type;
        this.textMargin = nodeInfo.textMargin;
        this.fontSize = nodeInfo.fontSize;
        this.DataType = dj.wfConst.data_type.WFNODE;
        this.dataSource = datasource || {};

        this.WFController = dj.wfController;
        var service = dj.service;
        var pen = dj.svg_pen; 
         
        //创建并显示节点到页面
        this.initialize = function () {
            this.drawImageElement();
            //初始化节点信息
            var seaNode = require("wfd/wfnodeset");
            this.WFNodeSet = new seaNode.WFNodeSet(dj, this.guid, this.ImageElement, this);
            this.setDefaultEvent();
            //初始化文本信息
            var seaNode = require("wfd/wftext");
            this.WFText = new seaNode.WFText(dj, {
                x:this.x + this.width / 2, 
                y: this.y + this.height + this.textMargin, 
                text:this.text, 
                guid: this.guid,
                fontSize : this.fontSize
            });

            this.hide();
            datasource.name = this.text;
            datasource.type = this.type;
            datasource.id = this.guid;
        }
        this.refreshText = function(text) {
            this.WFText.drawText(text, this.x + this.width / 2, this.y + this.height + this.textMargin);
        }
        this.setDefaultEvent = function () {
            var baseSelf = this;
            this.ImageElement.hover(function (
          ) {
                document.body.style.cursor = "move";
                baseSelf.WFNodeSet.show();
            }, function () {
                document.body.style.cursor = "default";
                if (!baseSelf.WFNodeSet.Visible) {
                    baseSelf.WFNodeSet.hide();
                }
            });

            this.ImageElement.click(function(e) {
                baseSelf.WFController.stopPropagation(e);
            });
            this.ImageElement.mousedown(function(e) {
                baseSelf.WFController.stopPropagation(e);
            });
        }
        //在界面上画图片元素
        this.drawImageElement = function () {
            if (this.ImageElement != null)
                this.ImageElement.remove();
            var rectImage = pen.image(this.imageSrc, this.x, this.y, this.width, this.height);
            rectImage.hide();
            rectImage.guid = this.guid;
            rectImage.ox = rectImage.attr("x");
            rectImage.oy = rectImage.attr("y");
            //将来可以做一些属性样式设置
            this.ImageElement = rectImage;
        }
       

 

        this.moveImageElementPin = function() {
            this.ImageElement.ox = this.ImageElement.attr("x");
            this.ImageElement.oy = this.ImageElement.attr("y");
        }
       
        this.movePermanentImageElement = function (wfNode) {
            this.moveImageElement(wfNode);
            this.moveImageElementPin();
        }


   
        this.moveImageElement = function (wfNode) {
            var mp = this.WFController.getMovePointByReferencePoint(wfNode, this.ImageElement);
            this.ImageElement.attr("x", mp.x);
            this.ImageElement.attr("y", mp.y);
        }
   


        this.show = function() {
            this.WFNodeSet.show();
            this.ImageElement.show();
            this.WFText.show();
        }

        this.hide = function() {
            this.WFNodeSet.hide();
            this.ImageElement.hide();
            this.WFText.hide();
        }

        this.focus = function () {
            this.ImageElement.toFront();
            this.WFNodeSet.focus();
        }

        this.blur = function() {
            this.WFNodeSet.blur();
        }
        this.moveBegin = function() {
            this.moveImageElementPin();
            this.WFText.movePin();
            this.WFNodeSet.movePin(); 
            this.ox = this.x;
            this.oy = this.y;
        }
        this.move = function (x, y) {
            this.x = x;
            this.y = y;
            this.moveImageElement(this);
            this.WFText.move(this);
            this.WFNodeSet.move(this);
            this.WFController.moveConnection(this);
        }

        this.zoom = function(value) {
            
        }
        this.copyNew = function () {
            this.guid = wfController.newGuid();
            this.ImageElement.guid = this.guid;
            this.WFText.guid = this.guid;
            this.x += 20;
            this.y += 20;
            this.move(this.x, this.y);
        }

        this.moveByNode = function (wfNode) {
            var mp = this.WFController.getMovePointByReferencePoint(wfNode, this);
            this.x = mp.x;
            this.y = mp.y;
            this.moveImageElement(wfNode);
            this.WFText.move(wfNode);
            this.WFNodeSet.move(wfNode);
            this.WFController.moveConnection(this);
        }
        
        this.moveByNodePin = function () {
            this.moveEnd();
            this.WFController.moveConnectionPin();
        }
        this.moveEnd = function() {
            this.moveImageElementPin();
            this.WFText.movePin();
            this.WFNodeSet.movePin(); 
            (this.ox !== this.x || this.oy !== this.y) && service.saveNode(this);
            this.ox = this.x;
            this.oy = this.y;
        }

        this.remove = function() {
            this.WFNodeSet.remove();
            this.WFText.remove();
            this.ImageElement.remove();
            service.removeNode(this);
        }
        this.inBox = function(box) {
            if (box.x <= this.x
                    && box.y <= this.y
                    && box.x + box.width >= this.x + this.width
                    && box.y + box.height >= this.y + this.width
            )
                return true;
            return false;
        }
        this.resizeImageElement = function() {
            this.ImageElement.attr({
                "x": this.x,
                "y": this.y,
                "width": this.width,
                "height": this.height
            });
        }
        this.resize = function(multipiler) {
            this.x *= multipiler;
            this.y *= multipiler;
            this.ox *= multipiler;
            this.oy *= multipiler;
            this.width *= multipiler;
            this.height *= multipiler;
            this.resizeImageElement(multipiler);
            this.textMargin *= multipiler;
            this.WFText.resize(multipiler);
            this.WFNodeSet.resize(multipiler); 
        }
        this.getJsonData = function () {
            var node = {};
            node.x = this.x;
            node.y = this.y;
            node.name = this.text;
            node.id = this.guid;
            node.type = this.type;
            node.width = this.width / this.WFController.WFMemory.zoom;
            node.height = this.height / this.WFController.WFMemory.zoom;
            node.imageSrc = this.imageSrc;
            node.shapeType = this.shapeType;
            node.wfdWorkflowId = this.WFController.WFMemory.guid;
            node = $.extend({}, this.dataSource, node);
            return node;
        }

        this.openDialog = function (callBack) {
            service.openNode({ id: this.guid, type : this.type}, callBack);
        };
        this.initialize(); 
    }
})