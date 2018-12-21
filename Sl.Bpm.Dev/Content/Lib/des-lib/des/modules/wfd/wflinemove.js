define("wfd/wflinemove", function(require, exports, module) {
	exports.WFLineMove = function(dj, dbclick) {
	    this.LineMoveElement = null;
	    this.dbClickEvent = dbclick;
		this.WFConnection = null;
		this.x = null;
		this.y = null;
		this.WidthLength = null;
	    this.guid = null;
		var pen = dj.svg_pen;
		var wfController = dj.wfController;
		var lineType = dj.wfConst.line_type;

		//		if (typeof WFLineMove._initialized == "undefined") {

		this.show = function(connection) {
		    this.WFConnection = connection;
		    this.guid = connection.guid;
			if (this.WFConnection.LineType === lineType.LINE_STRAIGHT)
				return;
			var conn = this.WFConnection;
			//中间线的两个点
			var from = [conn.PointArray[1].x, conn.PointArray[1].y];
			var to = [conn.PointArray[2].x, conn.PointArray[2].y];

			if (this.WFConnection.LineType === lineType.LINE_VERTICAL) {
				from[0] = conn.M;
				to[0] = from[0];
				this.x = from[0] - 3;
				this.y = (to[1] > from[1] ? from[1] : to[1]) + 1;
				this.WidthLength = (to[1] - from[1]) * (to[1] > from[1] ? 1 : -1);
				this.LineMoveElement.css({
					width: "5px",
					height: this.WidthLength + "px",
					left: this.x + "px",
					top: this.y + "px",
					cursor: "e-resize",
					display: "block"
				}).data("guid", conn.guid);

			} else if (this.WFConnection.LineType == lineType.LINE_HORIZONTAL) {
				from[1] = conn.M;
				to[1] = from[1];
				this.x = (to[0] > from[0] ? from[0] : to[0]) + 1;
				this.y = from[1] - 3;
				this.WidthLength = (to[0] - from[0]) * (to[0] > from[0] ? 1 : -1);
				this.LineMoveElement.css({
					width: this.WidthLength + "px",
					height: "5px",
					left: this.x + "px",
					top: this.y + "px",
					cursor: "s-resize",
					display: "block"
				}).data("guid", conn.guid);
			}
		}

		this.initializeLineMove = function() {
			this.LineMoveElement = $("<div id='wf_line_move' style='display:none'></div>");
			wfController.appendToWorkbase(this.LineMoveElement);
			var lineMove = this.LineMoveElement;
			var inthis = this;
            //注册双击事件
			if (this.dbClickEvent != null)
			    this.LineMoveElement.on("dblclick", {
		            inthis: this
		        }, this.dbClickEvent);
            //注册拖拽事件
			this.LineMoveElement.on("mousedown", {
				inthis: this
			}, function(e) {
			    wfController.stopPropagation();
				var lm = $(this);
				//给线添加背景色代表被选中
				lm.css({
					"background-color": "#333"
				});
				var isMove = false;


				document.onmousemove = function(e) {
					if (!e) e = window.event;
					var t = wfController.mousePosition(e); 
					var baseWidth = wfController.WFWorkbase.width;
					var baseHeight = wfController.WFWorkbase.height;
					if (inthis.WFConnection.LineType === lineType.LINE_VERTICAL) {
					    inthis.x = t.x - wfController.WFMemory.WFWorkbase.left;
					        inthis.x = inthis.x > baseWidth ? baseWidth - 5 : inthis.x;
					        inthis.x = inthis.x < 0 ?  5 : inthis.x;
					    lm.css({
							left: inthis.x + "px"
						});
					} else if (inthis.WFConnection.LineType === lineType.LINE_HORIZONTAL) {
					    inthis.y = t.y - wfController.WFMemory.WFWorkbase.top;
						inthis.y = inthis.y > baseHeight ? baseHeight - 5 : inthis.y;
					    inthis.y = inthis.y < 0 ? 5 : inthis.y;
						lm.css({
							top: inthis.y + "px"
						});
					}

					isMove = true;
				}
				document.onmouseup = function(e) {
					if (isMove) {
						if (inthis.WFConnection.LineType === lineType.LINE_VERTICAL) {
							inthis.WFConnection.M = inthis.x + 3;
						} else if (inthis.WFConnection.LineType === lineType.LINE_HORIZONTAL) {
							inthis.WFConnection.M = inthis.y + 3;
						}
					}
					lm.css({
						"background-color": "transparent"
					});
					document.onmousemove = null;
					document.onmouseup = null;

					inthis.WFConnection.refresh();
					wfController.focusConnection(inthis.WFConnection.guid);
				}
			});
		}



		this.hide = function() {
			this.LineMoveElement.css({
				display: "none"
			});
		};

		this.initializeLineMove();
		//			WFLineMove._initialized = true;
		//		}


	}
});