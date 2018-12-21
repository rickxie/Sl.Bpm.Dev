define("ui/dockmenu/default", function(require, exports, module) {
	var moduleHtml = require('template/dockmenu-default.html');
	var dockview = require('ui/dockmenu/dockview');
	//添加模块
	$("#wfd_right").append(moduleHtml);
	$("#wfd_dock_btnproperty").click(function () {
		dockview.toggle();
	}); 
	exports.DockView = dockview;
});