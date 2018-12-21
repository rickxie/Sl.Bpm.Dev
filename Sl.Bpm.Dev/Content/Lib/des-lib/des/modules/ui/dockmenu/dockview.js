define("ui/dockmenu/dockview", function(require, exports, module) {

	var moduleHtml = require('template/dockmenu-dockview.html');
	$("#wfd_right").append(moduleHtml);
		//	var Widget = require("aralejs/aralejs-widget");
	var dockViewWidget = function dockViewWidget(wfDesigner) {
		this.WFDesigner = wfDesigner;
		this.DockViewElement = $(".wfd_dockview");
		//绑定隐藏按钮
		$(".wfd_dockview .dockheader span").click(function () {
			$(this).parent().parent().hide();
		});
		
		$(".wfd_dockview .dockbody span").click(function () {
			var dockblock = $(this).parent().parent();
			var blockContent = dockblock.find(".dockblockcontent");
			blockContent.toggle();
		});
		
		this.toggle = function() {
			this.DockViewElement.toggle();
		};

		this.show = function() {
			this.DockViewElement.show();
		};
		
		this.hide = function() {
			this.DockViewElement.hide();
		};
	};

	module.exports = new dockViewWidget();

});