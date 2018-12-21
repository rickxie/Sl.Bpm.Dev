define("wfd/wfreferenceline", function(require, exports, module) {
    exports.WFReferenceLine = function(dj) {
        this.XList = [];
        this.YList = [];
        this.LineElementH = null;
        this.LineElementV = null;
        this.HighLightX = null;
        this.HighLightY = null;
        var pen = dj.svg_pen;
        var wfController = dj.wfController;
        var wfConst = dj.wfConst;

        this.initialize = function() {
            this.LineElementH = $("<div id='wf_referenceh' style='display:none'></div>");
            this.LineElementV = $("<div id='wf_referencev' style='display:none'></div>");
            wfController.appendToWorkbase(this.LineElementH);
            wfController.appendToWorkbase(this.LineElementV);
            var width = wfController.WFMemory.WFWorkbase.width;
            var height = wfController.WFMemory.WFWorkbase.height;
            this.LineElementH.css({
                width: width,
                left: 0
            });
            this.LineElementV.css({
                height: height,
                top: 0
            });

        };
        this.getNearestMatch = function(box, isX) {
            box = this.roundBox(box);
            var pointValue = isX ? box.x : box.y;
            var wholePadding = isX ? box.width : box.height;
            var halfPadding = isX ? Math.ceil(box.width / 2) : Math.ceil(box.height / 2);

            //先匹配中间
            var obj = [pointValue + halfPadding];
            var highLight = this.getNearestMatchHaha(obj, isX);
            if (highLight != null) {
                highLight = highLight - halfPadding;
            } else {
                //其次匹配上面
                obj = [pointValue];
                highLight = this.getNearestMatchHaha(obj, isX);
                if (highLight == null) {
                    //最后匹配下面
                    obj = [pointValue + wholePadding];

                    highLight = this.getNearestMatchHaha(obj, isX);
                    highLight = highLight == null ? pointValue : highLight - wholePadding;
                }
            }
            return highLight;
        }
        this.getNearestMatchHaha = function(obj, isX) {
            var candidate = null;
            var highLight = null;
            if (isX === true) {
                candidate = this.getCandidate(obj);
                highLight = this.getHighLightX(candidate);
            } else {
                candidate = this.getCandidate(obj);
                highLight = this.getHighLightY(candidate);
            }
            return highLight;
        }
        this.getCandidate = function(array) {
            var candidate = [];
            for (var j = 0; j < array.length; j++) {
                for (var i = -wfConst.COMFORTABLE_DISTANCE; i <= wfConst.COMFORTABLE_DISTANCE; i++) { 
                    candidate.push(array[j] + i);
                }
            }
            return candidate;
        }

        this.getHighLightX = function(objx) {
            for (var i = 0; i < objx.length; i++) {
                if ($.inArray(objx[i], this.XList) > -1) {
                    return objx[i];
                }
            }
            return null;
        }

        this.getHighLightY = function(objy) {
            for (var i = 0; i < objy.length; i++) {
                if ($.inArray(objy[i], this.YList) > -1) {
                    return objy[i];
                }
            }
            return null;
        }
        //四舍五入
        this.roundBox = function(box) {
            box.x = Math.round(box.x);
            box.y = Math.round(box.y);
            box.width = Math.round(box.width);
            box.height = Math.round(box.height);
            return box;
        }
        this.getMatch = function (box) {
            box = this.roundBox(box);
            var objx = [Math.round(box.x + box.width / 2), box.x, box.x + box.width];
            var objy = [Math.round(box.y + box.height / 2), box.y, box.y + box.height];
            var highLightX = this.getHighLightX(objx);
            var highLightY = this.getHighLightY(objy);
            return { x: highLightX, y: highLightY };
        }
        this.judging = function(box) {
            box = this.roundBox(box);
            var match = this.getMatch(box);
            this.HighLightX = match.x;
            this.HighLightY = match.y;
            if (this.HighLightX != null) {
                this.LineElementV.css(
                {
                    left: this.HighLightX,
                    "display": "block"
                });
            } else {
                this.LineElementV.css(
                {
                    "display": "none"
                });
            }
            if (this.HighLightY != null) {
                this.LineElementH.css({
                    top: this.HighLightY,
                    "display": "block"
                });
            } else {
                this.LineElementH.css(
                {
                    "display": "none"
                });
            }


        }

        this.hide = function() {
            this.LineElementH.css(
            {
                "display": "none"
            });
            this.LineElementV.css(
            {
                "display": "none"
            });
        }
        this.collecting = function(node) {
            //获取所有点的参考信息
            this.XList.push(Math.round(node.x));
            this.XList.push(Math.round(node.x + node.width));
            this.XList.push(Math.round(node.x + node.width / 2));
            this.YList.push(Math.round(node.y));
            this.YList.push(Math.round(node.y + node.height));
            this.YList.push(Math.round(node.y + node.height / 2));
        }
        this.clear = function() {
            this.XList = [];
            this.YList = [];
        }
        this.initialize();
    }
});