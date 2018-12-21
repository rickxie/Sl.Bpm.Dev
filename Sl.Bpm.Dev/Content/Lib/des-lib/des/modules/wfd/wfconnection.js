define("wfd/wfconnection",function(require, exports, module){
    exports.WFConnection = function (dj, lineInfo, dataSource, isTempLine) {

    this.WFText = null;
    this.PathElement = null;
    this.HidePathElement = null; //this is for focus.
    this.WFNodeStart = lineInfo.WFNodeStart;
    this.WFNodeEnd = lineInfo.WFNodeEnd;
    this.LineType = lineInfo.LineType;
    this.text = lineInfo.text;
	this.PointArray = lineInfo.PointArray;
	this.M = lineInfo.M;
	this.oM = lineInfo.M;
    this.guid = lineInfo.guid;
	this.DataType = dj.wfConst.data_type.WFCONNECTION;
	this.isTempLine = isTempLine;
	this.WFConnectionClick = null;
	this.WFConnectionDoubleClick = null;
	this.IsDesignModel = dj.isDesignModel;
    this.dataSource = dataSource || {};
    this.lineWidth = lineInfo.lineWidth || dj.wfConst.LINE_WIDTH;
    this.arrowPadding = lineInfo.arrowPadding || dj.wfConst.ARROW_PADDING;
    this.textMargin = lineInfo.textMargin || dj.wfConst.LINE_TEXT_MARGIN;
    this.fontSize = lineInfo.fontSize; 
    this.lineColor = dj.wfConst.LINE_COLOR;
    this.lineFocusColor = dj.wfConst.LINE_FOCUSCOLOR;
    this.hiddenLineWidth = dj.wfConst.HIDDEN_LINE_WIDTH;
    this.hiddenLineColor = dj.wfConst.HIDDEN_LINE_COLOR;
    var pen = dj.svg_pen;
    var wfController = dj.wfController;
    var wfConst = dj.wfConst;
    var type = wfConst.line_type;
    var borderMargin = dj.wfConst.NODE_BORDER_MARGIN;
    var lineTypeEnum = dj.wfConst.line_type;
    var service = dj.service;
        this.initialize = function() {
            var seaNode = require("wfd/wftext");
            var centerPoint = this.getCenterPoint();
            this.WFText = new seaNode.WFText(dj, { x:centerPoint.x, y:centerPoint.y, text: this.text, guid: this.guid, fontSize: this.fontSize});

            if (this.PointArray !=null && this.PointArray > 1) {
                this.loadConnection();
            } else {
                this.display();
            }
        }
        this.refreshText = function (txt) {
            this.text = txt;
            var centerPoint = this.getCenterPoint();
            if (centerPoint != null) {
                this.WFText.drawText(txt, centerPoint.x, centerPoint.y + this.textMargin);
            }
        }
	    //创建并显示连线信息
		this.display = function() {
		    this.guid = this.guid || wfController.newGuid();
			
		    if (!this.isTempLine) {
			    this.drawConnection(); 
			}
		}
        //加载已经存在点的连线
		this.loadConnection = function () {
		    this.drawLine();
		    this.bindEvent();
		    this.PathElement.guid = this.guid;
		    this.HidePathElement.guid = this.guid;
		    this.refreshText(this.text);
		}
        this.bindEvent = function() {
            if (!this.isTempLine) {
                this.PathElement.mousedown(this.WFConnectionClick);
                this.HidePathElement.mousedown(this.WFConnectionClick);
                this.PathElement.dblclick(this.WFConnectionDoubleClick);
                this.HidePathElement.dblclick(this.WFConnectionDoubleClick);
            }
        }
		this.SetEvent = function(clickEvent, doubleClickEvent){
			this.WFConnectionClick = clickEvent;
			this.WFConnectionDoubleClick = doubleClickEvent;
			this.bindEvent();
		}
        //删除连线
		this.remove = function () {
            if(this.PathElement != null)
                this.PathElement.remove();
		    if (this.HidePathElement != null)
                this.HidePathElement.remove();
			this.WFNodeStart = null;
			this.WFNodeEnd = null;
			this.M = null;
			this.oM = null;
			this.WFConnectionClick = null;
			this.WFConnectionDoubleClick = null;
			this.WFText.remove();
		    service.removeLine(this);
		}
       
	    //画临时连线
		this.drawTempLine = function(endPoint) {
			this.PointArray = [this.PointArray[0], endPoint];
			this.drawConnection();
		}

        //重新绘制连线
		this.refresh = function() {
		    this.drawConnection();
		    service.saveLine(this);
		}
		this.move = function (wfNode) {
		    if (wfNode.inBox(wfController.WFMemory.WFSelection.Box)) {
		        var mp = wfController.getMovePointByReferencePoint(wfNode, { ox: this.oM, oy: this.oM });
		        //边界检查
		        var bPoint = wfController.boundariesTransform(mp.x, mp.y, 1, 1);
		        //这里的x 或者 y都是一样的
		        this.M = this.LineType === lineTypeEnum.LINE_HORIZONTAL ? bPoint.y : bPoint.x;
		    }
		    this.drawConnection();
        }

        this.movePin = function() {
            this.oM = this.M;
        }
	    //绘制连线
		this.drawConnection = function() {
			this.getPointArray();
			this.loadConnection();
		}

        //计算连线各个拐点
		this.getPointArray = function() {
		    if (this.isTempLine) {
				    var prePoint = this.getPreviousPoint(this.PointArray[0], this.PointArray[1]);
					this.PointArray = [this.PointArray[0], prePoint];

				} else {
					this.PointArray = this.calcPolyPoints(this.WFNodeStart.ImageElement, this.WFNodeEnd.ImageElement, this.M);
				}
			}

	    //获取组成箭头的三条线段的路径
		this.getPathWithArr = function(pa, size) {
			
			//处理删除重复的点
			var pointArray = [];
			function contains(point)
			{
				for(i in pointArray)
				{
					if(pointArray[i].x == point.x && pointArray[i].y == point.y)
					return true;
				}
				return false;
			}
			for(j in pa)
			{
				if(!contains(pa[j]))
				{
					pointArray.push(pa[j]);
				}
			} 
			//只有一个点就返回
			if(pointArray.length <= 1)
			return;
			//获取最后两条线段之前的线条
			var path = [];
			if (pointArray.length > 2) {
				path.push("M");
				path.push(pointArray[0].x);
				path.push(pointArray[0].y);
				for (var i = 1; i < pointArray.length - 1; i++) {
					path.push("L");
					path.push(pointArray[i].x);
					path.push(pointArray[i].y);
				}
			}
			
			//获取最后两条线
			var preLastPoint = pointArray[pointArray.length - 2];
			var lastPoint = pointArray[pointArray.length - 1];
			var angle = Raphael.angle(preLastPoint.x, preLastPoint.y, lastPoint.x, lastPoint.y);
			var a45 = Raphael.rad(angle - 28);
			var a45m = Raphael.rad(angle + 28);
			var x2a = lastPoint.x + Math.cos(a45) * size;
			var y2a = lastPoint.y + Math.sin(a45) * size;
			var x2b = lastPoint.x + Math.cos(a45m) * size;
			var y2b = lastPoint.y + Math.sin(a45m) * size;
			
			//倒数第二个点
			path.push("M");
			path.push(preLastPoint.x);
			path.push(preLastPoint.y);
			//倒数第一个点
			path.push("L");
			path.push(lastPoint.x);
			path.push(lastPoint.y);
			//箭头一边A
			path.push("L");
			path.push(x2a);
			path.push(y2a);
			//移动到最后一个点
			path.push("M");
			path.push(lastPoint.x);
			path.push(lastPoint.y);
			//箭头另一边
			path.push("L");
			path.push(x2b);
			path.push(y2b);
			return path;
		}
        //根据开始和结束节点计算连线的拐点值  依据当前连线的类型
		this.calcPolyPoints = function(imgNodeStart, imgNodeEnd) {
			//如果是直线
			if (this.LineType === type.LINE_STRAIGHT) {
				var point = this.getMinimumTwoPointFromImageElement();
				return [point.start, point.end];
			}
			//以下是非直线
			//开始/结束两个结点的中心
			var cpStart = wfController.getCenterPointFromImgNode(imgNodeStart);
			var cpEnd = wfController.getCenterPointFromImgNode(imgNodeEnd);
			var nodeStart = wfController.getObjNodeFromImgNode(imgNodeStart);
			var nodeEnd = wfController.getObjNodeFromImgNode(imgNodeEnd);
		    var mValue = this.M;
			var sp = {},
				m1 = {},
				m2 = {},
				ep = {};
			//如果是允许中段的竖线可左右移动的折线,则参数M为可移动中段线的X坐标
			//粗略计算起始点
			sp = {
				x: cpStart.x,
				y: cpStart.y
			};
			ep = {
				x: cpEnd.x,
				y: cpEnd.y
			};
			if (this.LineType == type.LINE_VERTICAL) {
				//粗略计算2个中点
				m1 = {
					x: mValue,
					y: cpStart.y
				};
				m2 = {
					x: mValue,
					y: cpEnd.y
				};
				//再具体分析修改开始点和中点1
				if (m1.x > nodeStart.x && m1.x < nodeStart.x + nodeStart.width) {					 
					m1.y = (cpStart.y > cpEnd.y ? nodeStart.y : nodeStart.y + nodeStart.height);
					sp.x = m1.x;
					sp.y = m1.y;
				} else {
					sp.x = (m1.x < nodeStart.x ? nodeStart.x : nodeStart.x + nodeStart.width)
				}
				//再具体分析中点2和结束点
				if (m2.x > nodeEnd.x && m2.x < nodeEnd.x + nodeEnd.width) {
					m2.y = (cpStart.y > cpEnd.y ? nodeEnd.y + nodeEnd.height : nodeEnd.y);
					ep.x = m2.x;
					ep.y = m2.y;
				} else {
					ep.x = (m2.x < nodeEnd.x ? nodeEnd.x : nodeEnd.x + nodeEnd.width)
				}
			}
			//如果是允许中段的横线可上下移动的折线,则参数M为可移动中段线的Y坐标
			else if (this.LineType == type.LINE_HORIZONTAL) {
				//粗略计算2个中点
				m1 = {
					x: cpStart.x,
					y: mValue
				};
				m2 = {
					x: cpEnd.x,
					y: mValue
				};
				//再具体分析修改开始点和中点1
				if (m1.y > nodeStart.y && m1.y < nodeStart.y + nodeStart.height) {
					m1.x = (cpStart.x > cpEnd.x ? nodeStart.x : nodeStart.x + nodeStart.width);
					sp.x = m1.x;
					sp.y = m1.y;
				} else {
					sp.y = (m1.y < nodeStart.y ? nodeStart.y : nodeStart.y + nodeStart.height)
				}
				//再具体分析中点2和结束点
				if (m2.y > nodeEnd.y && m2.y < nodeEnd.y + nodeEnd.height) {
					m2.x = (cpStart.x > cpEnd.x ? nodeEnd.x + nodeEnd.width : nodeEnd.x);
					ep.x = m2.x;
					ep.y = m2.y;
				} else {
					ep.y = (m2.y < nodeEnd.y ? nodeEnd.y : nodeEnd.y + nodeEnd.height);
				}
			}
			var result = [sp, m1, m2, ep]; 
			return result;
		}
        //在画板中画入连线
		this.drawLine = function() {

			if (this.PathElement) {
			    this.PathElement.remove();
			    this.HidePathElement.remove();
			}
			if (!this.PointArray || this.PointArray.length <= 0 || !this.PointArray[0]) {
				return;
			}
			var pointsPath = this.getPathWithArr(this.PointArray, 9);
			this.PathElement = pen.path(pointsPath);
			this.HidePathElement = pen.path(pointsPath);
				//			this.PathElement.events = currentEvents;
			this.PathElement.attr({
				"stroke-width": this.lineWidth,
				"stroke": this.lineColor,
				"cursor": "pointer"
			});
		    this.HidePathElement.attr({
		        "stroke-width": this.hiddenLineWidth,
		        "stroke": this.hiddenLineColor,
			    "cursor": "pointer",
			    "visibility": "hidden",
			    "pointer-events": "stroke"
			}); 
		    //画临时线
		    if (this.isTempLine) {
				this.PathElement.attr({
					"stroke-dasharray": "--."
				});
			}
		}



		//获取鼠标节点之前的节点
		this.getPreviousPoint = function(startPoint, endPoint) {
			var x2 = Math.pow((endPoint.x - startPoint.x), 2);
			var y2 = Math.pow((endPoint.y - startPoint.y), 2);
			var lineLength = Math.sqrt(x2 + y2);
			var previousPoint = {
				"x": (lineLength - this.arrowPadding) / lineLength * (endPoint.x - startPoint.x) + startPoint.x,
				"y": (lineLength - this.arrowPadding) / lineLength * (endPoint.y - startPoint.y) + startPoint.y
			}
			return previousPoint;
		}
        //计算节点中最近的两个边框点
		this.getMinimumTwoPointFromImageElement = function() {
			imageElementStart = this.WFNodeStart.ImageElement;
			imageElementEnd = this.WFNodeEnd.ImageElement;
			var startBox = imageElementStart ? imageElementStart.getBBox() : null;
			var endBox = imageElementEnd ? imageElementEnd.getBBox() : null;
			var p = [{
					x: startBox.x + startBox.width / 2,
					y: startBox.y - borderMargin
				}, {
					x: startBox.x + startBox.width / 2,
					y: startBox.y + startBox.height + 1
				}, {
					x: startBox.x - borderMargin,
					y: startBox.y + startBox.height / 2
				}, {
					x: startBox.x + startBox.width + borderMargin,
					y: startBox.y + startBox.height / 2
				},
				endBox ? {
					x: endBox.x + endBox.width / 2,
					y: endBox.y - borderMargin
				} : {},
				endBox ? {
					x: endBox.x + endBox.width / 2,
					y: endBox.y + endBox.height + borderMargin
				} : {},
				endBox ? {
					x: endBox.x - borderMargin,
					y: endBox.y + endBox.height / 2
				} : {},
				endBox ? {
					x: endBox.x + endBox.width + borderMargin,
					y: endBox.y + endBox.height / 2
				} : {}
			];
			var d = {},
				dis = [];
			for (var i = 0; i < 4; i++) {
				for (var j = 4; j < 8; j++) {
					var dx = Math.abs(p[i].x - p[j].x),
						dy = Math.abs(p[i].y - p[j].y);
					if (
						(i == j - 4) ||
						(((i != 3 && j != 6) || p[i].x < p[j].x) &&
							((i != 2 && j != 7) || p[i].x > p[j].x) &&
							((i != 0 && j != 5) || p[i].y > p[j].y) &&
							((i != 1 && j != 4) || p[i].y < p[j].y))
					) {
						dis.push(dx + dy);
						d[dis[dis.length - 1]] = [i, j];
					}
				}
			}
			if (dis.length == 0) {
				var res = [0, 4];
			} else {
				res = d[Math.min.apply(Math, dis)];
			}
			var result = {};
			result.start = {};
			result.end = {};
			result.start.x = p[res[0]].x;
			result.start.y = p[res[0]].y;
			result.end.x = p[res[1]].x;
			result.end.y = p[res[1]].y;
			return result;
		}
        //连线获得聚焦
		this.focus = function () {
		    this.PathElement.toFront();
            this.PathElement.attr({
                "stroke": this.lineFocusColor
        });
        }
        //连线失去焦点
        this.blur = function() {
            this.PathElement.attr({
                "stroke": this.lineColor
            });
        }
         
        this.inBox = function(box) {
            for (var i = 0; i < this.PointArray.length; i++) {
                if(this.PointArray[i].x >= box.x 
                    && this.PointArray[i].x <= box.x + box.width
                    && this.PointArray[i].y >= box.y
                    && this.PointArray[i].y <= box.y + box.height)
                    continue;
                else {
                    return false;
                }
            }
            return true;
        }

        //获取连线中点
        this.getCenterPoint = function () {
            if (this.PathElement == null)
                return { x:0, y:0 };
            var totalLength = this.PathElement.getTotalLength();
            return this.PathElement.getPointAtLength(totalLength / 2);
        }


        this.resize = function (multipiler) {
            this.lineWidth *= multipiler;
            this.hiddenLineWidth *= multipiler;
            this.textMargin *= multipiler;
            this.fontSize *= multipiler;
            this.WFText.fontSize *= multipiler;
            this.arrowPadding *= multipiler;
            this.M *= multipiler;
            this.PointArray.map(function (item) { item.x *= multipiler; item.y *= multipiler });
            //已经包含文字重新刻画
            this.loadConnection(); 
        }

        this.getJsonData = function() {
            var line = {};
            line.id = this.guid;
            line.startNodeId = this.WFNodeStart.guid;
            line.endNodeId = this.WFNodeEnd.guid;
            line.wfdWorkflowId = wfController.WFMemory.guid;
            line.lineType = this.LineType;
            line.m = this.M;
            line = $.extend({}, this.dataSource, line);

            var pointArray = [];
            var points = this.PointArray;
            var orderId = 0;
            for (var j = 0; j < points.length; j++) {
                var point = {};
                point.id = point.guid = points[j].guid;
                point.x = points[j].x;
                point.y = points[j].y;
                point.order = orderId++;
                point.wfdWorkflowLinkId = line.id;
                point.wfdWorkflowId = wfController.WFMemory.guid;
                pointArray.push(point);
            }

            return { link: line, points: pointArray, workflowId: wfController.WFMemory.guid };
        }


        this.openDialog = function (callBack) {
            service.openLine({id : this.guid}, callBack);
        };
	    this.initialize();
	}

	
});
