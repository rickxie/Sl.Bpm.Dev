define("wfd/wftext", function(require, exports, module) {
    //节点对象
    //包含四个点边框的 BorderSet
    //一个文本 TextElement
    //一个图片 ImageElement
    exports.WFText = function(dj, textInfo) {
        this.text = textInfo.text;
        this.TextElement = null;
        this.x = textInfo.x;
        this.y = textInfo.y;
        this.ox = textInfo.x;
        this.oy = textInfo.y;
        this.guid = textInfo.guid;
        this.fontSize = textInfo.fontSize;
        this.maxLength = textInfo.maxLength;
        var wfConst = dj.wfConst;
        var pen = dj.svg_pen;
        var wfController = dj.wfController;
        this.initialize = function () {
            this.drawText(this.text, this.x, this.y);
        };
        this.drawText = function (text, x, y) {
            if (text == null)
                text = "";
            this.x = x;
            this.y = y;
            this.ox = x;
            this.oy = y;
            this.text = text;
            if (this.TextElement != null)
                this.TextElement.remove();
            var txt = text || wfConst.DEF_TEXT;
            var maxLength = this.maxLength || wfConst.TEXT_MAX_LENGTH;
            var displayTxt = txt.length > wfConst.TEXT_MAX_LENGTH ? txt.substr(0, maxLength - 1) + "..." : txt;
            var textObj = pen.text(this.x, this.y, displayTxt);
            textObj.attr({
                "font-size": this.fontSize + "px"
            });
            if (txt.length > 8)
                textObj.attr({
                    "title": txt
                });
            textObj.guid = this.guid;
            this.TextElement = textObj;
            this.movePin();
        }

        this.movePin = function () {
            this.TextElement.ox = this.TextElement.attr("x");
            this.TextElement.oy = this.TextElement.attr("y");
            this.ox = this.TextElement.ox;
            this.oy = this.TextElement.oy;
        }
        this.move = function (wfNode) {
            var mp = wfController.getMovePointByReferencePoint(wfNode, this.TextElement);
            this.x = mp.x;
            this.y = mp.y;
            this.TextElement.attr("x", mp.x);
            this.TextElement.attr("y", mp.y);
        }
        this.show = function() {
            this.TextElement.show();
        }
        this.hide = function() {
            this.TextElement.hide();
        }
        
        this.remove = function () {

            this.TextElement &&　this.TextElement.remove();
        }
        this.redraw = function() {
            this.drawText(this.text, this.x, this.y);
        }
        this.resize = function(multipiler) {
            this.x *= multipiler;
            this.y *= multipiler;
            this.ox *= multipiler;
            this.oy *= multipiler;
            this.fontSize *= multipiler;
            this.redraw();
        }
        this.initialize();
    };
});