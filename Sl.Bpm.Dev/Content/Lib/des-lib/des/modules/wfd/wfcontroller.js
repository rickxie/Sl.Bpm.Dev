define("wfd/wfcontroller", function(require, exports, module) {
	exports.WFController = function(wfMemory, wfConst) {
		this.WFMemory = wfMemory;
		this.WFConst = wfConst;
		this.WFWorkbase = wfMemory.WFWorkbase;
	    this.isDesignModel = wfMemory.isDesignModel;
        //缩放倍数
		this.zoom = function (value) {
		    var multipiler  = this.getMultiplier(value); 
		    this.WFMemory.currentMultiplier = multipiler;
            this.WFMemory.zoom = value;
            this.WFMemory.resize(multipiler);
            this.refreshReferenceLine();
		    this.WFMemory.WFLineTool.hide();
		}
        this.getMultiplier = function(value) {
            return  value / this.WFMemory.zoom;
        }

	    this.refreshReferenceLine = function() {
	        this.WFMemory.WFSelection.boxingSelectIn();
	    }
	    this.appendToWorkbase = function (element) {
            this.WFMemory.WFWorkbase.append(element);
		}
		this.addListenerToWorkbase = function(action, method) {
		    this.WFMemory.WFWorkbase.on(action, method);
		}
		this.selectAll = function() {
		    this.WFMemory.WFSelection.boxing(
		    {
		        x: 0,
		        y: 0,
		        width: this.WFMemory.WFWorkbase.width,
		        height: this.WFMemory.WFWorkbase.height
		    });
		    this.WFMemory.WFSelection.boxed();
		};

	    //arrPath Object because arrPath
		this.focusConnection = function(guid) {
			var focusedConn = {};
			for (var i = 0; i < this.WFMemory.SvgConnections.length; i++) {
				if (this.WFMemory.SvgConnections[i].guid === guid) {
					focusedConn = this.WFMemory.SvgConnections[i];
					this.WFMemory.SvgConnections[i].focus();
				} else {
					this.WFMemory.SvgConnections[i].blur();
				}
			}
            if(this.isDesignModel){
			//显示工具栏
                this.WFMemory.WFLineTool.display(focusedConn);
            }
			if (this.WFMemory.SvgFocusedObj != null && this.isNodeObj(this.WFMemory.SvgFocusedObj)) {
			    this.WFMemory.SvgFocusedObj.blur();
			    this.WFMemory.WFSelection.blur();
			}
			this.WFMemory.SvgFocusedObj = focusedConn;
		}
		this.stopPropagation = function(e) {
		    e = e || window.event; //判断浏览器的类型，在基于ie内核的浏览器中的使用cancelBubble
		    if (window.event) {
		        e.cancelBubble = true;
		    } else {
		        e.preventDefault(); //在基于firefox内核的浏览器中支持做法stopPropagation
		        e.stopPropagation();
		    }
		}
	    this.getNodeType = function(nodeName) {
		    var typeId = 0;
		    switch (nodeName) {
		        case "icon_start":
		            typeId = 0;
		            break;
		        case "icon_handle":
		            typeId = 1;
		            break;
		        case "icon_autohandle":
		            typeId = 2;
		            break;
		        case "icon_and":
		            typeId = 3;
		            break;
		        case "icon_or":
		            typeId = 4;
		            break;
		        case "icon_judge":
		            typeId = 5;
		            break; 
		        case "icon_end":
		            typeId = 6;
		            break; 
		        case "icon_text":
		            typeId = 1001;
		            break; 
		    }
		    return typeId;
	    }
	    this.boundariesTransform = function (x, y, boxWidth, boxHeight) {
	        //超出边界控制
	        if (x < 5) {
	            x = 5;
	        } else if (x > this.WFMemory.WFWorkbase.width - boxWidth - 5) {
	            x = this.WFMemory.WFWorkbase.width - boxWidth - 5;
	        }

	        if (y < 5) {
	            y = 5;
	        } else if (y > this.WFMemory.WFWorkbase.height - boxHeight - 5) {
	            y = this.WFMemory.WFWorkbase.height - boxHeight - 5;
	        }
	        return { x: x, y: y };
	    }

	    //获取NodeDefaultName
		this.getDefaultNodeValue = function (typeId) {
		    var model = {};
		    model.defImg = "";
			model.defName = this.WFConst.DEF_ICON_NAME;
			switch (typeId) {
			    case 0:
			        model.defName = this.WFConst.DEF_ICON_START;
			        model.defImg = "\\img\\wf_icon_start.gif";
					break;
			    case 1:
			        model.defName = this.WFConst.DEF_ICON_HANDLE;
			        model.defImg = "\\img\\wf_icon_handle.gif";
				    break;
			    case 2:
			        model.defName = this.WFConst.DEF_ICON_AUTOHANDLE;
			        model.defImg = "\\img\\wf_icon_autohandle.gif";
				    break;
				case 3:
				    model.defName = this.WFConst.DEF_ICON_AND;
				    model.defImg = "\\img\\wf_icon_and.gif";
				    break;
			    case 4:
			        model.defName = this.WFConst.DEF_ICON_OR;
			        model.defImg = "\\img\\wf_icon_or.gif";
				    break;
			    case 5:
			        model.defName = this.WFConst.DEF_ICON_JUDGE;
			        model.defImg = "\\img\\wf_icon_judge.gif";
				    break;
			    case 6:
			        model.defName = this.WFConst.DEF_ICON_END;
			        model.defImg = "\\img\\wf_icon_end.gif";
					break;
			    case 1001:
			        model.defName = this.WFConst.DEF_ICON_TEXT;
			        model.defImg = "\\img\\wf_icon_text.gif";
					break;
			}
			model.defImg = this.WFMemory.BasePath + model.defImg;
			return model;
		}



		//得到GUID
		this.newGuid = function (el) {
		    if (el != null && el.guid != null  && el.guid !== "")
		        return el.guid;
			return Raphael.createUUID().toLowerCase();
		}

		//获得事件中鼠标的坐标
		this.mouseCoords = function(ev) {
			ev = ev || window.event;
			if (ev.layerX || ev.layerY) {
				return {
					x: ev.layerX,
					y: ev.layerY
				};
			}
			return {
				x: ev.layerX + document.body.scrollLeft - document.body.clientLeft,
				y: ev.layerY + document.body.scrollTop - document.body.clientTop
			};
		}

		this.mousePosition = function(ev) {
			if (!ev) ev = window.event;
			if (ev.pageX || ev.pageY) {
				return {
					x: ev.pageX,
					y: ev.pageY
				};
			}
			return {
				x: ev.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
				y: ev.clientY + document.documentElement.scrollTop - document.body.clientTop
			};
		}

		//获取一个DIV的绝对坐标的功能函数,即使是非绝对定位,一样能获取到
		this.getElCoordinate = function(dom) {
			var t = dom.offsetTop;
			var l = dom.offsetLeft;
			dom = dom.offsetParent;
			while (dom) {
				t += dom.offsetTop;
				l += dom.offsetLeft;
				dom = dom.offsetParent;
			};
			return {
				x: l,
				y: t
			};
		}
		this.getWFSVGCoordinate = function() {
				return this.getElCoordinate(this.WFConst.WF_SVG);
			}
			//获取一个DIV的绝对坐标的功能函数,即使是非绝对定位,一样能获取到
		this.getElCoordinate = function(dom) {
			var t = dom.offsetTop;
			var l = dom.offsetLeft;
			dom = dom.offsetParent;
			while (dom) {
				t += dom.offsetTop;
				l += dom.offsetLeft;
				dom = dom.offsetParent;
			};
			return {
				x: l,
				y: t
			};
		}

		this.GetWFLineTool = function() {
			return this.WFMemory.WFLineTool;
		}


		//改变节点样式
		this.focusNode = function(wfNode) {
	        if (!wfNode || (this.WFMemory.SvgFocusedObj != null && this.WFMemory.SvgFocusedObj.guid === wfNode.guid)) {
	            return;
	        }

	        this.WFMemory.WFSelection.boxing(
	        {
	            x: wfNode.x - 5,
	            y: wfNode.y - 5,
	            width: wfNode.width + 5,
	            height: wfNode.height + 5
	        });
		    this.WFMemory.WFSelection.boxed();
		    this.WFMemory.WFLineTool.hide();
		}

	    this.blur = function() {
			var focusedObj = this.WFMemory.SvgFocusedObj;
			if (this.isConnectionObj(focusedObj) || 　this.isNodeObj(focusedObj)) {　
				focusedObj.blur();
				this.WFMemory.WFLineTool.hide();
				this.WFMemory.SvgFocusedObj = {};
			}
			this.WFMemory.WFSelection.blur();
		    this.WFMemory.WFContextMenu.hide();
		}
		this.getMovePointByReferencePoint = function(referencePoint, currentPoint) {
		    var rP = referencePoint;
		    var cp = currentPoint;
		    var dx = rP.x - rP.ox;
		    var dy = rP.y - rP.oy;
		    return { x: cp.ox + dx, y: cp.oy + dy };
		}
 
  
	    this.getCenterPointFromImgNode = function(imgNode) {
			var objNode = this.getObjNodeFromImgNode(imgNode);
			var centerPoint = {
				x: objNode.x + objNode.width / 2,
				y: objNode.y + objNode.height / 2,
				width: objNode.width,
				height: objNode.height
			};
			return centerPoint;
		}

		this.getObjNodeFromImgNode = function(imgNode) {
			var objNode = {};
			objNode.x = imgNode.attr("x");
			objNode.y = imgNode.attr("y");
			objNode.width = imgNode.attr("width");
			objNode.height = imgNode.attr("height");
			return objNode;
		}

		this.isConnectionObj = function(obj) {
			if (!obj || !obj.DataType || obj.DataType != this.WFConst.data_type.WFCONNECTION)
				return false;
			return true;
		}

		this.isNodeObj = function(wfNode) {
			if (!wfNode || !wfNode.DataType || wfNode.DataType != this.WFConst.data_type.WFNODE)
				return false;
			return true;

		}
 
	    //only called by node move method
		this.moveConnection = function (wfNode) {
		    var svgConnections = this.WFMemory.SvgConnections;
		    for (var j = svgConnections.length; j--;) {
		        if (svgConnections[j].WFNodeStart.guid === wfNode.guid || svgConnections[j].WFNodeEnd.guid === wfNode.guid) {
		            svgConnections[j].move(wfNode);
		        }
		    }
		}

		this.moveConnectionPin = function() {
		    wfMemory.SvgConnections.map(function(item) { item.movePin() });
		}
	    //删除当前焦点及其附属对象
		this.removeFocusedObj = function() {
		    var focsedObj = this.WFMemory.SvgFocusedObj;
		    if (focsedObj != null) {
		        this.removeObj(focsedObj);
		    }

		    this.WFMemory.SvgFocusedObj = {};
		    this.WFMemory.WFSelection.remove();
		    this.WFMemory.WFLineTool.hide();
		}

		this.removeObj = function (focsedObj) {
		    if (this.isNodeObj(focsedObj)) //如果选中的是步骤
		    {
		        //先删除线
		        var deleteConnIndex = new Array();
		        for (var j = 0; j < this.WFMemory.SvgConnections.length; j++) {
		            if (this.WFMemory.SvgConnections[j].PathElement && (this.WFMemory.SvgConnections[j].WFNodeStart.guid === focsedObj.guid || this.WFMemory.SvgConnections[j].WFNodeEnd.guid === focsedObj.guid)) {
		                deleteConnIndex.push(j);
		                this.WFMemory.SvgConnections[j].remove();
		            }
		        }
		        for (var m = deleteConnIndex.length; m--;) {
		            this.WFMemory.SvgConnections.remove(deleteConnIndex[m]);
		        }
		        //删除节点
		        deleteConnIndex = new Array();
		        for (var k = 0; k < this.WFMemory.SvgNodes.length; k++) {
		            if (this.WFMemory.SvgNodes[k].guid === focsedObj.guid) {
		                deleteConnIndex.push(k);
		                this.WFMemory.SvgNodes[k].remove();
		            }
		        }
		        for (var m = deleteConnIndex.length; m--;) {
		            this.WFMemory.SvgNodes.remove(deleteConnIndex[m]);
		        }


		    } else //如果选中的是线
		    {
		        //先删除线
		        var deleteConnIndex = new Array();
		        for (var j = 0; j < this.WFMemory.SvgConnections.length; j++) {
		            if (this.WFMemory.SvgConnections[j].PathElement && this.WFMemory.SvgConnections[j].guid === focsedObj.guid) {
		                deleteConnIndex.push(j);
		                this.WFMemory.SvgConnections[j].remove();
		            }
		        }
		        for (var m = deleteConnIndex.length; m--;) {
		            this.WFMemory.SvgConnections.remove(deleteConnIndex[m]);
		        }
		    }
		}

	    //判断是否存在连线
		this.canBeConnectioed = function(obj) {
			var svgConnections = this.WFMemory.SvgConnections;
			//所有连线对象中是否已经存在
			for (var i = 0; i < svgConnections.length; i++) {
				if (obj.WFNodeStart.ImageElement === obj.WFNodeEnd.ImageElement || (svgConnections[i].WFNodeStart.ImageElement === obj.WFNodeStart.ImageElement && svgConnections[i].WFNodeEnd.ImageElement === obj.WFNodeEnd.ImageElement)) {
					return true;
				}
			}
			return false;
		}

		this.getWFConnectionById = function(guid) {
			var svgConnections = this.WFMemory.SvgConnections;
			var wfConn = null;
			for (i in svgConnections) {
				if (svgConnections[i].guid === guid)
					wfConn = svgConnections[i];
			}
			return wfConn;
		}

		this.getWFNodeByGuid = function(guid) {
			var wfNode = null;
			for (i in this.WFMemory.SvgNodes) {
				if (this.WFMemory.SvgNodes[i].guid === guid) {
					wfNode = this.WFMemory.SvgNodes[i];
				}
			}
			return wfNode;
		}

	 

	    //取得中线的逻辑
		this.GetMPoint = function(LineT, cPt, cpStart, cpEnd, isGoLeft, isGoUp) {
			var absM = 0;
			if (LineT === this.WFConst.line_type.LINE_VERTICAL) {
				absM = Math.abs(cPt.x - cpStart.x);
				if (absM < cpStart.width / 2) {
					cPt.x = isGoLeft ? cPt.x - 20 : cPt.x + 20;
					this.GetMPoint(LineT, cPt, cpStart, cpEnd, isGoLeft, isGoUp);
				}

				absM = Math.abs(cPt.x - cpEnd.x);
				if (absM < cpEnd.width / 2) {
					cPt.x = isGoLeft ? cPt.x - 20 : cPt.x + 20;
					this.GetMPoint(LineT, cPt, cpStart, cpEnd, isGoLeft, isGoUp);
				}
			} else if (LineT === this.WFConst.line_type.LINE_HORIZONTAL) {
				absM = Math.abs(cPt.y - cpStart.y);
				if (absM < cpStart.height / 2) {
					cPt.y = isGoUp ? cPt.y - 20 : cPt.y + 20;
					this.GetMPoint(LineT, cPt, cpStart, cpEnd, isGoLeft, isGoUp);
				}

				absM = Math.abs(cPt.y - cpEnd.y);
				if (absM < cpEnd.height / 2) {
					cPt.y = isGoUp ? cPt.y - 20 : cPt.y + 20;
					this.GetMPoint(LineT, cPt, cpStart, cpEnd, isGoLeft, isGoUp);
				}
			}

			return cPt;
		}



        //获取数据库使用的流程节点信息
		this.GetWfdWorkflowNodes = function (provideNodes) {
		    var nodes = provideNodes ||this.WFMemory.SvgNodes;
		    var wfdNodes = [];
		    for (var i = 0; i< nodes.length; i ++) {
		        var node = {};
		        node.x = nodes[i].x;
		        node.y = nodes[i].y;
//		        node.name = nodes[i].text;
		        node.guid = node.id = nodes[i].guid;
		        node.type = nodes[i].type;
		        node.width = nodes[i].width;
		        node.height = nodes[i].height;
		        node.imageSrc = nodes[i].imageSrc;
		        node.shapeType = nodes[i].shapeType;
		        node.wfdWorkflowId = this.WFMemory.guid;
		        node = $.extend({}, nodes[i].dataSource, node);
		        wfdNodes.push(node);
		    }
		    return wfdNodes;
		}

	    //获取流程链接信息
		this.GetWfdWorkflowLinks = function (providedConnection) {
		    var lines = providedConnection || this.WFMemory.SvgConnections;
		    var wfdLines = [];
		    var wfdPoints = [];
		    for (var i =0;i<lines.length;i++) {
                //收集连线的信息
		        var line = {};
		        line.id = line.guid = lines[i].guid;
		        line.startNodeId = lines[i].WFNodeStart.guid;
		        line.endNodeId = lines[i].WFNodeEnd.guid;
		        line.wfdWorkflowId = this.WFMemory.guid;
		        line.lineType = lines[i].LineType;
		        line.m = lines[i].M;
		        line = $.extend({}, lines[i].dataSource, line);
		        wfdLines.push(line);

		        //收集点的信息
		        var points = lines[i].PointArray;
		        var orderId = 0;
		        for (var j =0; j < points.length; j ++) {
		            var point = {};
		            point.id = point.guid = points[j].guid;
		            point.x = points[j].x;
		            point.y = points[j].y;
		            point.order = orderId++;
		            point.wfdWorkflowLinkId = line.guid;
		            point.wfdWorkflowId = this.WFMemory.guid;
		            wfdPoints.push(point);
		        }
		    }
		    return {
		        lines: wfdLines,
		        points: wfdPoints
		        };
		}

		this.getPointsByGuid = function (pointArray, guid) {
		    var points = [];
		    for (i in pointArray) {
		        if (pointArray[i].wfdWorkflowLinkId === guid) {
		            points.push(pointArray[i]);
		        }
		    }

		    points.sort(function (a, b) { return a.order - b.order });
		    return points;
		}

	  this.saveNode = function() {
	      
	  }
	}
});