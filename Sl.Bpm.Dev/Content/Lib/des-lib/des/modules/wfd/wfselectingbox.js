define("wfd/wfselectingbox", function(require, exports, module) {
    exports.WFSelectingBox = function(dj) {
        this.SelectingElement = null;
        this.MaskElement = null;
        var pen = dj.svg_pen;
        var wfController = dj.wfController;
        this.StartPoint = {};
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;

        this.initialize = function() {
            this.SelectingElement = $("<div id='wf_selectingbox' style='display:none'></div>");
            this.MaskElement = $("<div id='wf_designermask' style='display:none'></div>");
            var selection = this.SelectingElement;
//            this.MaskElement.append(selection);
//            wfController.Workbase.parent().append(this.MaskElement);
            wfController.appendToWorkbase(this.SelectingElement);
            var inthis = this;
            wfController.addListenerToWorkbase("mousedown", function (e) {

//                if (!wfDesigner.WFMemory.tempLineIsDrawing) {
//                    wfController.blur(); 
//                }

//                var maskWidth = $(this.parentElement).width();
//                var maskHeight = $(this.parentElement).height();
//                inthis.MaskElement.css({
//                    width: maskWidth,
//                    height: maskHeight,
//                    background: "red",
//                    left: 0,
//                    top: 0,
//                    position: "absolute",
//                    opacity: 0,
//                    "z-index": 100
//            });
//                inthis.MaskElement.show();

                inthis.StartPoint = wfController.mousePosition(e);

                document.onmousemove = function(e) {
                    var ep = wfController.mousePosition(e);
                    var sp = inthis.StartPoint;
                    var left = ep.x > sp.x ? sp.x : ep.x;
                    var top = ep.y > sp.y ? sp.y : ep.y;
                    var width = Math.abs(ep.x - sp.x);
                    var height = Math.abs(ep.y - sp.y);
                    inthis.x = left;
                    inthis.y = top;
                    inthis.x = left - wfController.WFMemory.WFWorkbase.left;
                    inthis.y = top - wfController.WFMemory.WFWorkbase.top;
                    inthis.width = width;
                    inthis.height = height;
                    selection.css({
                        width: inthis.width + "px",
                        height: inthis.height + "px",
                        left: inthis.x + "px",
                        top: inthis.y + "px",
                        display: "block"
                    });
                    wfController.WFMemory.WFSelection.boxing(inthis);
                };
                document.onmouseup = function(e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    selection.hide();
                    wfController.WFMemory.WFSelection.boxed();
                }

            });
        };

        this.initialize();
    }
});