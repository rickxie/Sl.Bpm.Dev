define("wfd/wflinetool", function(require, exports, module) {
			exports.WFLineTool = function(dj, dbClick) {
				this.LineToolElement = null;
				this.WFLineMove = null;
				this.WFConnection = null;
				var dj = dj;
				var pen = dj.svg_pen;
				var wfController = dj.wfController;
				var lineType = dj.wfConst.line_type;

				//		if (typeof WFLineTool._initialized == "undefined") {

				this.initializeLineTool = function() {
					var varModule = require("wfd/wflinemove");
					this.WFLineMove = new varModule.WFLineMove(dj, dbClick);
					var inthis = this;
					this.LineToolElement = $("<div id='wf_line_oper' style='display:none'> <b class='b_l1'></b> <b class='b_l2'></b> <b class='b_l3'></b> <b class='b_x'></b> </div>");
					wfController.appendToWorkbase(this.LineToolElement);
					//线条选择工具箱的点击事件
				    this.LineToolElement.on("mousedown", {
				        inthis: this
				    }, function(e) {
				        event.stopPropagation();
				        if (!e) e = window.event;
				        if (e.target.tagName != "B") return;
				        //接收传送过来的数据
				        var guid = $(this).data("guid");
				        switch ($(e.target).attr("class")) {
				        case "b_x":
				            wfController.removeFocusedObj();
				            this.style.display = "none";
				            break;
				        case "b_l1":
				            inthis.setLineType(guid, lineType.LINE_VERTICAL);
				            break;
				        case "b_l2":
				            inthis.setLineType(guid, lineType.LINE_HORIZONTAL);
				            break;
				        case "b_l3":
				            inthis.setLineType(guid, lineType.LINE_STRAIGHT);
				            break;
				        }
				    });
				}

					//线条选择工具箱选择某个选项时触发
					this.setLineType = function(guid, newType) {
						var connObj = this.WFConnection;
						if (!newType || newType === connObj.lineType) return false;
						//当前聚焦的控件必须是连接线
						if (!wfController.isConnectionObj(connObj)) return;

						connObj.LineType = newType;

						var centerStart = wfController.getCenterPointFromImgNode(connObj.WFNodeStart.ImageElement);
						var centerEnd = wfController.getCenterPointFromImgNode(connObj.WFNodeEnd.ImageElement);
						var centerPt = {
							x: (centerEnd.x + centerStart.x) / 2,
							y: (centerEnd.y + centerStart.y) / 2
						};
						//往空旷方向画线
						var isGoLeft = (pen.width - centerPt.x ) < centerPt.x;
						var isGoUp = (pen.height - centerPt.y) < centerPt.y;

						//设置中转M的值
						switch (newType) {
							case lineType.LINE_STRAIGHT:
							case lineType.LINE_VERTICAL:
								var mPoint = wfController.GetMPoint(newType, centerPt, centerStart, centerEnd, isGoLeft, isGoUp);
								connObj.M = connObj.oM = mPoint.x;
								break;
							case lineType.LINE_HORIZONTAL:
								var mPoint = wfController.GetMPoint(newType, centerPt, centerStart, centerEnd, isGoLeft, isGoUp);
								connObj.M = connObj.oM = mPoint.y;
								break;
						}

						connObj.refresh();
						wfController.focusConnection(connObj.guid);

					}

					this.display = function(connection) {

						this.WFConnection = connection;
						var conn = this.WFConnection;
						var len = connection.PointArray.length;
						var from = [conn.PointArray[len / 2 - 1].x, conn.PointArray[len / 2 - 1].y];
						var to = [conn.PointArray[len / 2].x, conn.PointArray[len / 2].y];

						x = (from[0] + to[0]) / 2;
						y = (from[1] + to[1]) / 2 + 16;

						this.LineToolElement.css({
							display: "block",
							left: x + "px",
							top: y + "px"
						});
						//将当前的连线id 传给操作箱
						this.LineToolElement.data("guid", conn.guid);
						this.WFLineMove.show(this.WFConnection);
					}
					this.hide = function() {
							if (this.LineToolElement == null)
								return;
							//隐藏线条选项工具框
							this.LineToolElement.css({
								display: "none"
							});

							this.WFLineMove.hide();
						}
						//Initialize Object
					this.initializeLineTool();
					//			WFLineTool._initialized = true;
					//		}



				}
			});