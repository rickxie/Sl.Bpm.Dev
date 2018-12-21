define("wfd/wfconst", function(require, exports, module) {
    exports.WFConst = function () {
        var langCollection = require("wfd/wflanguage");
        var lanObj = new langCollection.WfLanguage();
        var lang = lanObj.language["ZH-CN"];
        //参考线贴合服帖度 px 像素内自动靠齐
        this.COMFORTABLE_DISTANCE = 5;
		//节点的宽度
		this.NODE_WIDTH = 56;
		//节点的高度 
		this.NODE_HEIGHT = 56;
        //设置边框节点填充颜色
		this.NODE_BORDER_FILLCOLOR = "white";
		//节点四周小方框的颜色
		this.NODE_BORDER_COLOR = "rgb(136, 51, 51)";
        //选择框的线条颜色
		this.BOX_SELECTION_COLOR = "rgb(136, 51, 51)";
        //选择框的线条粗细 px
		this.BOX_SELECTION_WIDTH = 1;
		//连线的常规颜色
		this.LINE_COLOR = "rgb(166, 166, 166)";
        //连线的聚焦颜色
		this.LINE_FOCUSCOLOR = "rgb(136, 51, 51)";
        //连线的粗细 px
		this.LINE_WIDTH = 2;
        //隐藏连线粗细 影响聚焦连线的效果
		this.HIDDEN_LINE_WIDTH = 10;
		//箭头最终 距离鼠标的位置间隔
		this.ARROW_PADDING = 2;
        //四周圆点距离节点的距离
		this.NODE_BORDER_MARGIN = 0;
        //四周小方框宽度
		this.NODE_BORDERBOX_WIDTH = 6;
        //四周小原形半径
		this.NODE_BORDER_RADIUS = 4;
        //文本最大字符数量 超出显示...
		this.TEXT_MAX_LENGTH = 15;
        //文本字体大小
        this.TEXT_FONT_SIZE = 12;
        //文本据节点图片的距离
		this.NODE_TEXT_MARGIN = 10;
        //文本据连线的距离
		this.LINE_TEXT_MARGIN = -15;
        //背景参考线每大区块包含的小区块个数
        this.GAP_NUMBER = 4;
		this.line_type = {
			//直线特征值
			LINE_STRAIGHT: "STRAIGHT",
			//折线为横线可调节
			LINE_HORIZONTAL: "HORIZONTAL",
			//折线为竖线可调节
			LINE_VERTICAL: "VERTICAL"
		};

        //画板ID
		this.WF_SVG = "wfd_canvas";

        //实体类型
		this.data_type = {
			WFCONNECTION: "WFCONNECTION",
			WFNODE: "WFNODE"
		}
		//画线间度
		this.grid_line_length = {
			SMALL: 10,
			NORMAL: 15,
			BIG: 20,
			SUPERBIG: 25
		}

        //隐藏连线
		this.HIDDEN_LINE_COLOR = "white";
		//自动处理默认名
		this.DEF_ICON_AUTOHANDLE = lang["NodeAutoHandle"];
		//处理步骤默认名
		this.DEF_ICON_HANDLE = lang["NodeHandle"];
		//结束步骤默认名
		this.DEF_ICON_END = lang["NodeEnd"];
		//结束步骤默认名
		this.DEF_ICON_TEXT = lang["ObjectText"];
		//开始步骤默认名
		this.DEF_ICON_START = lang["NodeStart"];
		//判断步骤默认名
		this.DEF_ICON_JUDGE = lang["NodeJudge"];
		//与步骤默认名
		this.DEF_ICON_AND =lang["NodeAnd"];
		//或步骤默认名
		this.DEF_ICON_OR = lang["NodeOr"];
		//新步骤默认名字
		this.DEF_ICON_NAME =lang["NodeNew"];
		//新步骤默认名字
		this.DEF_TEXT = "";

	};

});


 
