$.maTips = {
    show: function (option) {
        var propertys = {
            //控件
            control: undefined,
            //标题
            title: "",
            //内容
            content: "",
            //类型 error/info/success
            type: 'default',
            //图标
            icon: undefined,
            //展示时间
            showtime: 2000,
            //是否一直展示
            isalways: false,
            //是否显示关闭按钮
            hasdelbutton: true,
            //关闭触发事件
            event_close: function () {

            },
            //空间位置
            location: "bottomRight"
        }
        for (var item in option) {
            propertys[item] = option[item];
        }
        /*开始展示*/
        var _icon = propertys.icon === undefined ? $.maTips.maTips_Type[propertys.type].icon : propertys.icon;
        var _title = !!propertys.title ? ('<span class="ma-tips-title">' + propertys.title + '</span><hr class="ma-tips-hr" />') : '';
        var _tips = $('<div class="ma-tips ' + propertys.type + ' ' + propertys.location + '" tabindex="-1"><i class="ma-tips-icon ' + _icon + '"></i>' + _title + '<span class="ma-tips-text">' + propertys.content + '</span>' + (!!propertys.hasdelbutton ? '<i class="ma-tips-close icon-times" onmousedown="$.maTips.maTips_closeMe(this)"></i>' : '') + '</div>');
        var _tipcon = null;
        if ($(propertys.control).next().is(".ma-tips")) {
            _tipcon = $(propertys.control).next();
            if (_tipcon.find(".ma-tips-text").eq(0).text() != ("" + propertys.content) || _tipcon.find(".ma-tips-title").eq(0).text() != ("" + propertys.title)) {
                _tipcon.remove();
                _tipcon = null;
            } else {
                _tipcon.css({ zIndex: 100 + $(".dialog").length });
            }
        }
        if (!_tipcon) {
            $(propertys.control).after(_tips);
            var _lo = $.maTips.maTips_LocationType[propertys.location]($(propertys.control), _tips);
            _tips.css({ display: "none", left: _lo.left, top: _lo.top, zIndex: 100 + $(".ma-tips").length });

            _tips.fadeIn("fast");
            if (!propertys.isalways) {
                setTimeout(function () {
                    _tips.fadeOut("fast", function () {
                        if (typeof event_close === 'function') {
                            event_close(propertys);
                        }
                        _tips.remove();
                    });
                }, propertys.showtime);
            }
        }
    },
    maTips_Type: {
        error: { icon: "icon-remove-sign" },
        success: { icon: "icon-check-circle" },
        info: { icon: "icon-info-sign" },
        'default': { icon: "" }
    },
    maTips_LocationType: {
        bottomLeft: function (con, tip) {
            var _lo = con.position();
            return { left: _lo.left, top: _lo.top + 6 + con.outerHeight() };
        },
        bottomRight: function (con, tip) {
            var _lo = con.position();
            return { left: _lo.left - tip.outerWidth() + con.outerWidth(), top: _lo.top + 6 + con.outerHeight() };
        },
    },
    maTips_closeMe: function (con) {
        $(con).parent().fadeOut("fast", function () {
            $(con).parent().remove();
        });
    },
    hide: function (con, istrue) {
        if (istrue === undefined) istrue = false;
        if (!istrue) {
            if ($(con).next().is(".ma-tips")) {
                $(con).next().fadeOut("fast", function () {
                    $(con).next().remove();
                });
            }
        } else {
            $(con).next().remove();
        }
    }
}
$.fn.extend({
    maTips_error: function (text, title, isalways) {
        $.maTips.show({ control: $(this), content: text, title: title, type: "error", isalways: isalways });
    },
    maTips_info: function (text, title, isalways) {
        $.maTips.show({ control: $(this), content: text, title: title, type: "info", isalways: isalways });
    },
    maTips_success: function (text, title, isalways) {
        $.maTips.show({ control: $(this), content: text, title: title, type: "success", isalways: isalways });
    },
    maTips: function (options) {
        options.control = $(this);
        $.maTips.show(options);
    },
    maTips_close: function (istrue) {
        var _con = $(this).next();
        if (istrue === undefined) istrue = false;
        if (!istrue) {
            if (_con.is(".ma-tips")) {
                _con.fadeOut("fast", function () {
                    _con.remove();
                });
            }
        } else {
            _con.remove();
        }
    }
});