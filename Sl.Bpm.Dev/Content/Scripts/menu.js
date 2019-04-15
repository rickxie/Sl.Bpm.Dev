
//ifream内调用加载状态显示
var loading = function (type) {
    if (type == false) {
        parent.$(".loading").hide();
    } else {
        parent.$(".loading").show();
    }
}
if (location.href.indexOf("Home/Index") > -1) {
    $("[data-code=desktop]").addClass("select");
}
//获取地址中#后面的参数
function getHash() {
    var hash = location.hash.replace("#", "").split("/");
    return $.grep(hash, function (it) {
        return it != "";
    })
}
//修改地址中#后面的参数
function UpdateHash(index, value) {
    var hash = location.hash.replace("#", "").split("/");
    var hash2 = $.grep(hash, function (it) {
        return it != "";
    })
    hash2[index] = value;
    location.hash = "/" + hash2.join("/");
}
//获取url所有参数
var getRequest = function () {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//修改url参数
var updateRequest = function (name,value) {
    var res = getRequest();
    res[name] = value;
    var seach = [];
    Object.keys(res).forEach(function (key) {
        seach.push(key + "=" + res[key]);
    });
    history.pushState({}, "", "?" + seach.join("&"));
}
$(function () {
    //左侧菜单收起展开
    $(".menu-fold>label").click(function () {
        if ($(this).hasClass("mf-hide")) {
            $(this).removeClass("mf-hide");
            $(".page-main").removeClass("fold-up");
        } else {
            $(this).addClass("mf-hide");
            $(".page-main").addClass("fold-up");
        }
    })
    setTimeout(function () {
        $(".menu-fold > label").animate({ "opacity": 1 }, 2000);
    }, 2000)
    $(".user-face img").click(function () {
        $(".user-down").toggle();
    })
    $(document).click(function () {
        $(".user-down").hide();
    });
    $(".user-down,.user-face img").click(function (event) {
        event.stopPropagation();
    })
    $("#imain").load(function () {
        $(".loading").hide();
    })
    var loadcon = function (url) {
        $.ajax({
            Type: "Post",
            dataType: "html",
            url: url,
            success: function (view) {
                $("#PageMain").html(view);
            }
        })
    }
    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }
    function setCookie(c_name, value, expiredays) {
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
    //$("body").addClass($.cookie("SkinName"));

    $(".main-menu .menu-item dd li h3,.left-menu .main-menu .menu-item dd li .ico").click(function () {
        $(this).parent().toggleClass("open");
    })
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
        var href = $(this).attr("data-href");
        var target = $(this).attr("target");
        var that = this;
        if (href && href != "javascript:void(0);") {
            var newWindow = null;
            if (target == "_blank") {
                newWindow = window.open();
            }
            $.ajax({
                url: '/api/module/MenuLog',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify({ menuId: menuId })
            }).then(function () {
                if (target != "_main") {
                    if (target == "_blank") {
                        newWindow.location.href = href;
                    } else {
                        window.location.href = href;
                    }
                } else {
                    //$("iframe[name=_main]").attr("src", href);
                    var iframe = $('<iframe name="_main" class="imain" src="' + href + '"></iframe>');
                    iframe.on("load", function () {
                        $(".loading").hide();
                    });
                    $("#imainbd").html(iframe);
                    $(".left-menu h4.select,.dl-menu li h3[target=_main]").removeClass("select");
                    $(that).find("h4").addClass("select");
                    $(".main-head h2").html($(that).data("title"));
                    //if (!!window.ActiveXObject || "ActiveXObject" in window) {
                    //} else {
                    //    history.pushState({}, "", "?code=" + $(that).data("id"));
                    //}
                    //UpdateHash(1, $(that).data("id"));
                    updateRequest("double", $(that).data("id"));
                    $(".loading").show();
                }
            });
        }
        return false;

    });
    $(".page-main").css({ "visibility": "visible" });
    $(".page-main").fadeIn();
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
    $(".main-head h2").text($(".dl-menu li h4.select").attr("title"));
    $("[name=_main]").attr("src", $(".dl-menu li h4.select").parent().data("href"));
    //
    var etopEle = $(".dl-menu li h4.select");
    if (etopEle.length != 0) {
        var etop = etopEle.offset().top - $(window).scrollTop();
        if (etop > $(window).height() / 2) {
            $(".menu-item.select dd .dl-menu").scrollTop(etop - $(window).height() / 2);
        }
    }   
    //动态菜单
    $(".select h3[data-api]").each(function () {
        var obj = $(this);
        if ($(this).data("api").length > 0) {
            $.ajax({
                type: "Post",
                dataType: "json",
                url: $(this).data("api"),
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        obj.parent().append('<h4 style="cursor: pointer;" data-link="' + data[i].Link + '" class="dynamic-menu" title="' + data[i].Name + '" class=""><i class="icon icon-circle-thin"></i>' + data[i].Name + '</h4>');
                    }
                    if (data.length > 0) {
                        obj.parent().find(".ico").show();
                    } else {
                        obj.parent().hide();
                    }
                    $(".dynamic-menu").click(function () {
                        $("[name=_main]").attr("src", $(this).data("link"));
                        $(".dl-menu li h4,.dl-menu li h3").removeClass("select");
                        $(this).addClass("select");
                        $(".main-head h2").html($(this).attr("title"));
                    })
                }
            })
        }
    })
    //获取待办数量
    getWfCenterCount = function () {
        $.ajax({
            type: "POST",
            url: "/api/task/GetWfCenterCount",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ Params: { type: 15 } }),
            async: false,
            success: function (data) {
                if (data.isSuccess) {
                    $("[data-code=pendinghandle] h4 label,[data-code=mydraft] h4 label,[data-code=Wf-Copied] h4 label,[data-code=Wf-Pending] h4 label").remove();
                    if (data.result.pendingCount != 0) {
                        $("[data-code=pendinghandle] h4").append("<label>" + data.result.pendingCount + "</label>");
                    }
                    if (data.result.draftCount != 0) {
                        $("[data-code=mydraft] h4").append("<label style='background: grey;'>" + data.result.draftCount + "</label>");
                    }
                    if (data.result.copyCount != 0) {
                        $("[data-code=Wf-Copied] h4").append("<label style='background: grey;'>" + data.result.copyCount + "</label>");
                    }
                    if (data.result.suspendCount != 0) {
                        $("[data-code=Wf-Pending] h4").append("<label style='background: grey;'>" + data.result.suspendCount + "</label>");
                    }
                } else {
                    mabp.notify.error(data.errors.message, '发生异常');
                }
            },
            error: function (data) {
                mabp.notify.error(data.message);
            }
        });
    }
    if (window.location.href.indexOf("Workflow") > 0) {
        getWfCenterCount();
    }
})