
//ifream内调用加载状态显示
var loading = function () {
    parent.$(".loading").show();
}


$(function () {
    //左侧菜单收起展开
    $(".menu-fold>label").click(function () {
        if ($(this).hasClass("mf-hide")) {
            $(this).removeClass("mf-hide");
            $(".left-menu").animate({ width: "247px" });
            $(".page-main").animate({ left: "247px" });
        } else {
            $(this).addClass("mf-hide");
            $(".left-menu").animate({ width: "58px" });
            $(".page-main").animate({left:"59px"});
        }
    })
    $(".user-face img").click(function () {
        $(".user-down").toggle();
    })
    $(document).click(function () {
        $(".user-down").hide();
    });
    $(".user-down,.user-face img").click(function (event) {
        event.stopPropagation();
    })
    //一级菜单单击事件
    //$(".menu-item dt").click(function () {
    //    if (!$(this).parent().hasClass("select")) {
    //        $(".menu-item").removeClass("select");
    //        $(this).parent().addClass("select");
    //    }
    //})
    $("#imain").load(function () {
        $(".loading").hide();
    })
    //二级菜单单击事件
    //$(".dl-menu li h4").click(function () {
    //    $(".dl-menu li h4").removeClass("select");
    //    $(this).addClass("select");
    //    var url = $(this).data("url");
    //    //$(".loading").show();
    //    $("#imain").attr("src", url);
    //    $(".main-head h2").text($(this).data("title"));
    //    //loadcon(url);
    //})
    var loadcon = function (url) {
        $.ajax({
            Type:"Post",
            dataType:"html",
            url: url,
            success: function (view) {
                $("#PageMain").html(view);
            }
        })
    }
    function getCookie(c_name)
    {
        if (document.cookie.length>0)
        {
            c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1)
            {
                c_start=c_start + c_name.length+1
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    }
    function setCookie(c_name,value,expiredays)
    {
		$.cookie(c_name, value, { expires: expiredays, path: '/' })
    }

	function clearSkin() {
		$("body").removeClass("skin-yellow").removeClass("skin-blue");
	}
	$(".skin-change-bt span").click(function () {
		clearSkin();
		$("body").addClass($(this).attr("data-class"));
		setCookie("SkinName", $(this).attr("data-class"), 30)
	});
	clearSkin();
	$("body").addClass($.cookie("SkinName"));
    
    $(".main-menu .menu-item dd li h3,.left-menu .main-menu .menu-item dd li .ico").click(function () {
        $(this).parent().toggleClass("open");
    })
    $("[data-id]").each(function () {
        var id = $(this).data("id");
        //if ($currentUserPermissions[id]) {
            $(this).show();
        //}
    })

    $("a[target=_main]").on("click", function (e) {
        //if (!$currentUserPermissions[$(this).data("id")]) {
            //alert("你没有权限");
            //return false;
        //}
		$("iframe[name=_main]").attr("src", $(this).attr("href"));
        $(".left-menu h4.select,.dl-menu li h3[target=_main]").removeClass("select");
        $(this).find("h4").addClass("select");
        $(".main-head h2").html($(this).data("title"));
		return false;
    });
    $(".dl-menu li h3[target=_main]").click(function () {
        $(".dl-menu li h3[target=_main],.left-menu h4.select").removeClass("select");
        $(this).addClass("select");
        $(".main-head h2").html($(this).data("title"));
        $("iframe[name=_main]").attr("src", $(this).data("url"));
    })
	$("iframe[name=_main]").on("load", function () {
		$(".loading").hide();
	});

 


	$(".language-switch label").on("click", function () {
		var lang = $(this).attr("data-lang");
		var url = "/account/ChangeLanguage?langId=" + lang;
		$.getJSON(url).then(function (res) {
			if (res === "Success") {
				window.location.reload();
			}
			else {
				console.log(res);
			}
			
		});

	});


	$("[data-id]").on("click", function () {
        var menuId = $(this).attr("data-id");
        //if (!$currentUserPermissions[menuId]) {
            //alert("你没有权限");
            //return false;
        //}
		var href = $(this).attr("href");
		var target = $(this).attr("target");
		if (href && href != "javascript:void(0);") {
			$.ajax({
				url: '/api/module/MenuLog',
				contentType: 'application/json',
				type: 'POST',
				data: JSON.stringify({ menuId: menuId })
			}).then(function () {
				if (target != "_main") {
					window.location.href = href;
				}
			});
		}
		return false;

    });
    $(".page-main").css({ "visibility": "visible" });
	$(".page-main").fadeIn();

	$("h3[data-id]").each(function () {
		var dataId = $(this).attr("data-id")
		//if ($currentUserPermissions[dataId]) {
			$(this).parent("li").show();
		//}
	});

	////默认打开第一个菜单
	var firstLink = $(".left-menu .main-menu .menu-item.select .dl-menu a:visible").eq(0);

	var link = (firstLink.attr("href") || "").toLocaleLowerCase();
	if (link && link.indexOf("workflowcenter") < 0) {
		firstLink.trigger("click");
	}

	var match = false;
	$(".menu-item.select dd a").each(function () {
		var link = window.location.href;
		var href = $(this).attr("href");
		if (link.indexOf(href) > -1) {
			match = true;
			$(this).find("h4").addClass("select");
		}
	});
	if (!match) {
		$("a[href='/Home/WorkflowCenter/pendinghandle/']").find("h4").addClass("select");
	}
})
//以上公用js
$(function () {

})