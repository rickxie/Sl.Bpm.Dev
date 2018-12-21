define("wfd/wfcontextmenu", function(require, exports, module) {
    exports.WFContextMenu = function(dj) {
        this.ContextMenuElement = null;
        this.CopyElement = null;
        this.CutElement = null;
        this.PasteElement = null;
        this.SelectAllElement = null;
        this.DeleteElement = null;
        this.Items = [];
        this.CopiedItems = [];

        this.ExtractedObj = {};
        this.x = null;
        this.y = null;
        var wfController = dj.wfController;
        var wfConst = dj.wfConst;
        this.x = 0;
        this.y = 0;

        this.initialize = function() {
            var coMenuHtml = require("template/contextmenu.html");
            this.ContextMenuElement = $(coMenuHtml);
            wfController.appendToWorkbase(this.ContextMenuElement);
            this.initializeItems();
        };
        this.show = function() {
            var point = wfController.mouseCoords();
//            point.x -= wfController.WFWorkbase.left;
            //            point.y -= wfController.WFWorkbase.top;
            this.x = point.x;
            this.y = point.y;
            this.ContextMenuElement.css({
                left: point.x + "px",
                top: point.y + "px"
            });
            this.ContextMenuElement.show();
        }
        this.initializeItems = function() {
            this.CopyElement = this.ContextMenuElement.find(".menu_copy");
            this.CutElement = this.ContextMenuElement.find(".menu_cut");
            this.PasteElement = this.ContextMenuElement.find(".menu_paste");
            this.DeleteElement = this.ContextMenuElement.find(".menu_delete");
            this.SelectAllElement = this.ContextMenuElement.find(".menu_selectall");
            this.Items.push(this.CopyElement);
            this.Items.push(this.CutElement);
            this.Items.push(this.PasteElement);
            this.Items.push(this.DeleteElement);
            this.Items.push(this.SelectAllElement);
            var inthis = this;
            this.CopyElement.on("mousedown", function(e) {
                inthis.itemMouseDown("COPY");
            });
            this.PasteElement.on("mousedown", function(e) {
                inthis.itemMouseDown("PASTE");
            });
            this.CutElement.on("mousedown", function(e) {
                inthis.itemMouseDown("CUT");
            });
            this.DeleteElement.on("mousedown", function(e) {
                inthis.itemMouseDown("DELETE");
            });
            this.SelectAllElement.on("mousedown", function(e) {
                inthis.itemMouseDown("SELECTALL");
            });
        }

        this.itemMouseDown = function(itemName) {
            var inthis = this;
            //转换 
            function transform() {
                inthis.CopiedItems = $.extend(true, [], inthis.CopiedItems);
                var nodes = inthis.CopiedItems.nodes;
                var lines = inthis.CopiedItems.lines;
                var points = inthis.CopiedItems.points;
                var box = inthis.CopiedItems.box;
                function exists(cGuid) {
                    var isExists = false;
                    $.each(nodes, function () {
                        if (this.guid === cGuid)
                            isExists = true;
                    });
                    return isExists;
                }

                //需要被摈弃的link,如果复制的link 两个节点任有其一没包含 则不允许复制
                var delLink = [];
                var delPoint = [];
                $.each(lines, function (u, item) {
                    if (!exists(item.startNodeGuid) || !exists(item.endNodeGuid)) {
                        delLink.push(u);
                        $.each(points, function (l, point) {
                            if (point.guid === item.guid)
                                delPoint.push(l);
                        });
                    }
                });
                $.each(delLink, function () {
                    lines.splice(this);
                });
                $.each(delPoint, function () {
                    points.splice(this);
                });

                //第二步，转换相关数据 
                if (nodes != null && nodes.length > 0) {

                    var newX = inthis.x == null ? box.x + 20 : inthis.x;
                    var newY = inthis.y == null ? box.y + 20 : inthis.y;
                    //边界检查
                    var bPoint = wfController.boundariesTransform(newX, newY, box.width, box.height);
                    newX = bPoint.x;
                    newY = bPoint.y;
                    var refereceNode = { ox: box.x, oy: box.y, x: newX, y: newY };
                    for (var j = 0; j < nodes.length; j++) {
                        var newNodeGuid = wfController.newGuid();
                        var node = nodes[j];
                        if (lines != null && lines.length > 0) {
                            for (var k = 0; k < lines.length; k++) {
                                var newlinkGuid = wfController.newGuid();
                                for (var h = 0; h < points.length; h++) {
                                    if (points[h].wfdWorkflowLinkGuid === lines[k].guid) {
                                        points[h].wfdWorkflowLinkGuid = newlinkGuid;
                                        points[h].guid =  points[h].id = wfController.newGuid(); 
                                    }
                                }
                                if (lines[k].startNodeGuid === node.guid)
                                    lines[k].startNodeGuid = newNodeGuid;
                                if (lines[k].endNodeGuid === node.guid)
                                    lines[k].endNodeGuid = newNodeGuid;
                                //转换M值
                                var lmp = wfController.getMovePointByReferencePoint(refereceNode, { ox: lines[k].m, oy: lines[k].m });
                                //边界检查
                                var bp = wfController.boundariesTransform(lmp.x, lmp.y, 1, 1);
                                //这里的x 或者 y都是一样的
                                lines[k].M = lines[k].lineType === wfConst.LINE_HORIZONTAL ? bp.y : bp.x;

                                lines[k].guid = lines[k].id = newlinkGuid;
                            }
                        }
                        node.guid = node.id = newNodeGuid;
                        var mp = wfController.getMovePointByReferencePoint(refereceNode, { ox: node.x, oy: node.y });
                        node.x =  mp.x ;
                        node.y = mp.y;
                    }
                    //转换连线的定位点
                    for (var n = 0; n < points.length; n++) {
                        var np = wfController.getMovePointByReferencePoint(refereceNode, { ox: points[n].x, oy: points[n].y });
                        points[n].x = np.x;
                        points[n].y = np.y;
                    }
                    box.x = newX;
                    box.y = newY;
                }
            }
            //提取出数组
            function extract() {

                var copiedNodes = [];
                var copiedConnections = [];
                //第一步，提取Datasource
                var selectedObjs = wfController.WFMemory.WFSelection.SvgFocusedSelectionIn;
                for (var i = 0; i < selectedObjs.length; i++) {
                    if (wfController.isNodeObj(selectedObjs[i])) {
                        copiedNodes.push(selectedObjs[i]);
                    } else {
                        copiedConnections.push(selectedObjs[i]);
                    }
                }
                var connection = wfController.GetWfdWorkflowLinks(copiedConnections);
                var nodes = wfController.GetWfdWorkflowNodes(copiedNodes);
                var lines = connection.lines;
                var points = connection.points;


                inthis.CopiedItems = { nodes: nodes, lines: lines, points: points, box: wfController.WFMemory.WFSelection.Box};
            }

            //剪切
            function cut() {
                extract();
                var preDel = wfController.WFMemory.WFSelection.SvgFocusedSelectionIn;
                for (var i = 0; i < preDel.length; i++) {
                    wfController.removeObj(preDel[i]);
                }
                wfController.WFMemory.WFSelection.blur();
                inthis.clearPosition();
            }

            //复制
            function copy() {
                extract(); 
            }

            //黏贴
            function paste() {
                transform();
                // 第三步，加载转换后的数据到界面
                var selectIn = wfDesigner.LoadWorkflow(inthis.CopiedItems.nodes, inthis.CopiedItems.lines, inthis.CopiedItems.points);
                wfController.WFMemory.WFSelection.SvgFocusedSelectionIn = selectIn;
                wfController.WFMemory.WFSelection.boxingSelectIn();
                wfController.WFMemory.WFSelection.boxed();
            }


            switch (itemName) {
            case 'COPY':
                copy();
                break;
            case 'PASTE':
                paste();
                break;
            case 'CUT':
                cut();
                break;
            case 'SELECTALL':
                wfController.selectAll();
                break;
            case 'DELETE':
            default:
                wfController.removeFocusedObj();
                break;
            }

            wfController.stopPropagation();
            inthis.hide();
        }

        this.clearPosition = function() {
            this.x = null;
            this.y = null;
        }
        this.showOnNodes = function() {
            this.showElements([
                this.CutElement,
                this.PasteElement,
                this.DeleteElement,
                this.SelectAllElement,
                this.CopyElement
            ]);
        }
        this.showOnLines = function() {
            this.showElements([
                this.SelectAllElement,
                this.PasteElement,
                this.DeleteElement
            ]);
        }

        this.showCommon = function() {
            this.showElements([
                this.SelectAllElement,
                this.PasteElement
            ]);
        }

        this.showElements = function(els) {
            for (var i = 0; i < els.length; i++) {
                if ($.inArray(els[i], this.Items)) {
                    els[i].show();
                } else {
                    els[i].hide();
                }
            }
        }
        this.hide = function() {
            this.ContextMenuElement.hide();
        }
        this.initialize();
    };
});