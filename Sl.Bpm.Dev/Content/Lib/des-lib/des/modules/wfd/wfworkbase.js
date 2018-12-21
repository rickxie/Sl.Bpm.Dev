define("wfd/wfworkbase", function (require, exports, module) {
    //工作区
    exports.WFWorkbase = function (wfc, svgid, width, height, parent) {
        this.WorkbaseElement = null;
        this.left = null;
        this.top = null;
        this.width = width;
        this.height = height;
        var wfController = wfc;
        this.initialize = function () {
            this.WorkbaseElement = $("<div id='" + svgid + "'></div>");
            parent.append(this.WorkbaseElement);
            this.WorkbaseElement.attr({
                "unselectable": "on",
                "onselectstart": 'return false',
                "onselect": 'document.selection.empty()',
                "ondrop": "wfDesigner.svg_onDrop(event)",
                "ondragover" :"wfDesigner.svg_onDragOver(event)"
            });
            this.WorkbaseElement.css({
                "height": this.height + "px",
                "width": this.width + "px"
            }); 

            this.refresh();
            this.WorkbaseElement.on("mousedown", {}, function(e) {

                if (!wfController.WFMemory.tempLineIsDrawing) {
                    wfController.blur();
                }
            });
        };
        this.refresh = function() {
            this.left = this.WorkbaseElement.offset().left;
            this.top = this.WorkbaseElement.offset().top;
            this.width = this.WorkbaseElement.width();
            this.height = this.WorkbaseElement.height();
        }
        this.append = function(element) {
            this.WorkbaseElement.append(element);
        }
        this.on = function(action, method) {
            this.WorkbaseElement.on(action, method);
        }
        this.resize = function(multipiler) {
            
        }
        this.initialize();
    };
});