var wfdModulePath = "/Content/Lib/des-lib/des/";
 
define(wfdModulePath + "des", function(require) {
    var leftmenu = require("ui/leftmenu/default"); 
    $("#wfd_left").html(leftmenu.html);
    var designer = require("wfd/wfdesigner");
    //最后一个参数代表是否 设计模式（设计模式可以移动点和线）
    wfDesigner = new designer.WFDesigner(controller.model, wfdModulePath, $("#wfd_designer"), controller.isDesignModel);
    controller.postInitialize(wfDesigner.database);
    

    //如果为设计模式则加样式
    if (!wfDesigner.isDesignModel) {
        $("#wfd_body").addClass("wfd_config_mode");
    } else {

        //给节点注册拖动事件
        $(".wf_node").attr("ondragstart", "wfDesigner.icon_onDragStart(event)");
        $("svg").attr("ondragstart", "return false;");


        document.onkeydown = function (e) {
            if (wfDesigner.WFMemory.enable) {
                //46 means Delete button
                if (e.keyCode === 46) {
                    wfDesigner.WFMemory.WFContextMenu.itemMouseDown("DELETE");
                }
                //Ctrl + A
                if (e.ctrlKey === true && e.keyCode === 65) {
                    wfDesigner.WFMemory.WFContextMenu.itemMouseDown("SELECTALL");
                }
                //Ctrl + C
                if (e.ctrlKey === true && e.keyCode === 67) {
                    wfDesigner.WFMemory.WFContextMenu.itemMouseDown("COPY");
                }
                //Ctrl + V
                if (e.ctrlKey === true && e.keyCode === 86) {
                    wfDesigner.WFMemory.WFContextMenu.clearPosition();
                    wfDesigner.WFMemory.WFContextMenu.itemMouseDown("PASTE");
                }
                //Ctrl + X
                if (e.ctrlKey === true && e.keyCode === 88) {
                    wfDesigner.WFMemory.WFContextMenu.itemMouseDown("CUT");
                }
            }
        }

        //屏蔽右键
        document.oncontextmenu = function (event) {
            if (wfDesigner.WFMemory.enable) {
                if (event.clientX > wfDesigner.WFMemory.WFWorkbase.left && event.clientY > wfDesigner.WFMemory.WFWorkbase.top)
                    wfDesigner.WFMemory.WFContextMenu.show(event);
            }
            return false;
        }
    }
    $("#wfd_container").scroll(function () {
        wfDesigner.WFMemory.WFWorkbase.refresh();
    });

    //初始化多语言 
    $(".wfd_grouplist ul li").each(function (item) {
        var type = wfDesigner.WFController.getNodeType(this.id);
        var nodeDef = wfDesigner.WFController.getDefaultNodeValue(type);
        this.title = nodeDef.defName;
    });



  
    function boxResize() {
        var headerHeight = $(".nav-main").height();
        var windowHeight = $(window).height();
        var bodyHeight = windowHeight - headerHeight;
        $("#wfd_body").height(bodyHeight);
        var leftWidth = $("#wfd_left").width();
        $("#wfd_right").css("margin-left", leftWidth + 1);
        $("#wfd_right").css("height", "100%");
        wfDesigner.WFMemory.WFWorkbase.refresh();
    }
    //窗口自动缩放JS
    window.onload = function () {
        window.resizeEvent.push(boxResize);
        boxResize();
    };

    boxResize();



    //
    
    //create noslider
    var range = document.getElementById('range');
    noUiSlider.create(range, {
        start: [100], // Handle start position
        step: 10, // Slider moves in increments of '10'
        margin: 20, // Handles must be more than '20' apart
        //connect: true, // Display a colored bar between the handles
        direction: 'ltr', // Put '0' at the bottom of the slider
        orientation: 'vertical', // Orient the slider vertically
        //behaviour: 'tap-drag', // Move handle on tap, bar is draggable
        range: {
            // Slider can select '0' to '100'
            'min': [30],
            'max': [200]
        }
    });

    var stepSliderValueElement = document.getElementById('range_value');

    range.noUiSlider.on('update', function (values, handle) {
        var vpercent = parseInt(values[handle]);
        stepSliderValueElement.innerHTML = vpercent + '%';
        wfDesigner.WFController.zoom(vpercent / 100);
    });



});


