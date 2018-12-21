define("wfd/wfmemory", function(require, exports, module) {
	//内存对象，管理整个应用程序的数据;
	exports.WFMemory = function () {
	    this.isDesignModel = null;
		this.SvgNodes = []; //步骤数组 
		this.SvgObject = []; //步骤数组 
		this.SvgConnections = []; //连线数组 
		this.SvgFocusedObj = {}; //当前焦点对象//当前画的临时线起点
		this.tempLineStartPoint = {};
		this.SvgPen = {};
	    //背景参考线
	    this.WFGridline = {};
	    //标识 代表当前正在画线
		this.tempLineIsDrawing = false;
		//临时连接线
		this.tempWFConnection = {};
		//线条工具箱
		this.WFLineTool = {};
		//工作区
		this.WFWorkbase = {};
	    //选中区域
		this.WFSelection = {};
	    //参考线集合
		this.WFReferenceLine = {};
	    //右键菜单
		this.WFContextMenu = {};
	    //设计器大小
		this.width = 0;
	    this.height = 0;

	    this.Zoom = 1;
	    this.currentMultiplier = 1;
	    this.WFSelectingBox = {};
	    this.BasePath = "";
	    this.guid = "";
	    this.enable = true;
      

	    this.resize = function (multipiler) { 
	        //从0.5 变成 1 要乘以2
	        this.width *= multipiler;
	        this.height *= multipiler;
	        this.WFSelection.resize(multipiler);
	        this.WFWorkbase.width *= multipiler;
	        this.WFWorkbase.height *= multipiler;
	        this.WFWorkbase.WorkbaseElement.css("width", this.width);
	        this.WFWorkbase.WorkbaseElement.css("height", this.height);
	        this.WFWorkbase.refresh();
	        this.SvgPen.setSize(this.SvgPen.width *= multipiler, this.SvgPen.height *= multipiler);
	        this.WFGridline.resize(multipiler);
	        this.SvgNodes.map(function (item) {
	            item.resize(multipiler);
	        });
	        this.SvgConnections.map(function (item) {
	            item.resize(multipiler);
	        });
	       
        }
	}

});