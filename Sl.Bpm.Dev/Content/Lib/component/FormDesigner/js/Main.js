/// <reference path="jquery-1.8.3-vsdoc.js" />
/// <reference path="ControlProperty.js" />
/// <reference path="BasicControl.js" />

var tcon_x, tcon_y, tcon_width, tcon_height;
var delbtn_x, delbtn_y, delbtn_width, delbtn_height;
var drag_x = 0, drag_y = 0;
var IsDrag = false, IsOver = false, IsChangeSize = false;
/**
 * 当前改变大小的控件
 * @extends Global
 * @type {HTMLElement}
 */
var _ChangeSizeCon = null;
/**
 * 当前改变大小的最终大小
 * @extends Global
 * @type {Number}
 */
var _ChangeSize_FinalNum = -1;
/**
 * 当前改变大小用到改变的按钮类型
 * @extends Global
 * @type {ChangeSizeBtnType}
 */
var _ChangeSize_Btn = ChangeSizeBtnType.None;
/**
 * 正在改变浏览器大小
 * @extends Global
 */
var _IsBodyChangeSize = false;
var TempDragControl = null;
/**
 * 用来判明拖拽控件结束时应该的操作
 * @extends Global
 * @type {LocationType}
 */
var TempLocationType = null;
/**
 * 用来临时装载控件的父控件
 * @extends Global
 * @type {BasicControl}
 */
var TempParentControl = null;
/**
 * 之前的父控件
 * @extends Global
 * @type {BasicControl}
 */
var OldParentControl = null;
/**
 * 当前拖拽的控件
 * @extends Global
 * @type {BasicControl}
 */
var Me = null;
/**
 * 拖拽时显示的插入符
 * @extends Global
 * @type {HTMLElement}
 */
var SplitHr = $("#SplitHr").clone(true);
/**
 * 所有第一级控件
 * @extends Global
 * @type {BasicControl[]}
 */
var main_controls = [];
var tempmax_y = 0, tempmin_y = 0;
/**
 * ???
 */
var tempIndex = 0;

/**
 * 画布
 * @class Canvas
 * @constructor 构造函数
 * @param {String} element_id 画布所属元素Id.
 */
function Canvas(element_id) {
    var element = $("#" + element_id);

    var _me = this;
    /**
     * 好像没什么用的元素Id
     * @private
     */
    var _elementId = element_id;
    /**
     * 自增长Id
     * @private
     */
    var _sysControl_Id = 0;
    /**
     * 所有已经拖上去的控件集合
     * @private
     */
    var _list = [];
    //（并不存在的）控件坐标关系图
    //var CoordMap = [];
    /**
     * 当前选中的控件
     * @private
     */
    var _currentControl = [];
    /**
     * 画布工作区
     * @property {WorkSpace} workSpace
     */
    _me.workSpace = new WorkSpace(element.offset().left, element.offset().top, element.innerWidth(), element.innerHeight());
    /**
     * 获取一个新的控件Id
     * @method NewId
     * @return {Number} 最新的控件ID
     */
    _me.NewId = function () {
        return _sysControl_Id++;
    }
    /**
     * 修改画布所在的元素并重新计算坐标，传入HTML的元素Id
     * @method SetElementById
     * @param {String} element_id 界面元素Id
     */
    _me.SetElementById = function (element_id) {
        var _element = document.getElementById(element_id);
        element = _element;
        _me.WorkSpace.X = _element.offset().left;
        _me.WorkSpace.Y = _element.offset().top;
        _me.WorkSpace.Width = _element.innerWidth();
        _me.WorkSpace.Height = _element.innerHeight();
    }

    /**
     * 创建控件
     * @method CreateControl
     * @param {HTMLElement} con 用于创建的控件
     * @param {HTMLElement} parent_con 父控件
     * @param {HTMLElement} orderindex 顺序编号
     * @return {Canvas} 返回画布
     */
    _me.CreateControl = function (con, parent_con, orderindex) {
        try {
            if (!con) { throw ("用于创建的控件不存在。"); }
            var classList = con.find(".Div_LineControl")[0].className.split(" ");
            for (var i = 0; i < classList.length; i++) {
                if (classList[i].indexOf("Control_") >= 0) {
                    var control = null;
                    if (classList[i].indexOf("Control_") >= 0) {
                        eval("control = new " + classList[i] + "(this, con, parent_con, orderindex);");
                    }
                    //控制控件属性
                    Object.defineProperties(control, {
                        //控件属性
                        ControlType: {
                            configurable: false,
                            writable: false
                        },
                        //是否允许包含子控件
                        HasControl: {
                            configurable: false,
                            writable: false
                        },
                        //是否为根节点控件（只能为根节点）
                        IsRootControl: {
                            configurable: false,
                            writable: false
                        }
                    });
                    _list.push(control);
                    return control;
                }
            }
        } catch (e) {
            console.error(e.message);
            return null;
        }
    }
    /**
     * 根据Id值获取控件
     * @property {Function} GetControl
     */
    _me.GetControl = function (id) {
        if (!id) throw ("用于查询的Id不能为空。");
        for (var i = 0; i < _list.length; i++) {
            if (_list[i].Id == id) {
                return _list[i];
            }
        }
        return null;
    }
    /**
     * 获取某控件的所有子控件
     * @property {Function} GetChildrenControls
     */
    _me.GetChildrenControls = function (id) {
        var t_parent_controls = [];
        if (!id) {
            for (var o = 0; o < _list.length; o++) {
                if (_list[o].ParentId == "") {
                    t_parent_controls.push(_list[o]);
                }
            }
        } else {
            for (var o = 0; o < _list.length; o++) {
                if (id.toString() == _list[o].ParentId.toString()) {
                    t_parent_controls.push(_list[o]);
                }
            }
        }
        return t_parent_controls;
    }
    /**
     * 根据Id删除元素
     * @property {Function} RemoveOfId
     */
    _me.RemoveOfId = function (id) {
        if (!id) throw ("用于删除的Id不能为空。");
        for (var i = 0; i < _list.length; i++) {
            if (_list[i].Id == id) {
                _canvas.CurrentControl = null;
                $(_list[i].Me).remove();
                _list[i].Me = null;
                _list.splice(i, 1);
            }
        }
    }
    /**
     * 导出Json格式数据
     * @property {Function} ExportJson
     */
    _me.ExportJson = function () {
        var allcontrols = $("#Div_Phone_Main > .BasicControl").children("[class*='Control_']");
        var controllist = [];
        for (var i = 0; i < allcontrols.length; i++) {
            var tempcontrol = _me.GetControl(allcontrols.eq(i).attr("index"));
            var tempobj = {};
            for (items in tempcontrol) {
                switch (Object.prototype.toString.call(tempcontrol[items])) {
                    case "[object Object]":
                    case "[object Function]":
                        break;
                    default:
                        tempobj[items] = tempcontrol[items];
                }
            }
            for (var property in tempcontrol.Property) {
                tempobj[property] = tempcontrol.Property[property];
            }
            controllist.push(tempobj);
        }
        return controllist;
    }
    //控制画布属性
    Object.defineProperties(this, {
        /**
         * 获取控件的数量
         * @readonly
         */
        ControlCount: {
            Configurable: false,
            get: function () { return _list.length; }
        },
        /**
         * 获取坐标关系图
         * @readonly
         */
        CoordMap: {
            Configurable: false,
            get: function () { return CoordMap; }
        },
        /**
         * 获取新Id
         * @readonly
         */
        MaxId: {
            Configurable: false,
            get: function () { return _sysControl_Id; }
        },
        /**
         * 画布的Id
         * @readonly
         */
        ElementId: {
            Configurable: false,
            get: function () { return _elementId; }
        },
        /**
         * 画布当前所在元素
         * @readonly
         */
        Element: {
            Configurable: false,
            get: function () { return element; }
        },
        /**
         * 当前选中控件
         * @static
         * @accessor
         */
        CurrentControl: {
            get: function () { return _currentControl; },
            set: function (con) {
                //如果之前有选中一个控件的话，则取消选中
                if (_currentControl && _currentControl.length > 0) {
                    for (var i = 0; i < _currentControl.length; i++) {
                        _currentControl[i].cancelSelect();
                    }
                }
                if (!con || con.length <= 0) {
                    _currentControl = [];
                } else {
                    for (var i = 0; i < con.length; i++) {
                        con[i].select();
                    }
                    _currentControl = con;
                }
                return _currentControl;
            }
        }
    });
}
Canvas.prototype = {
    valueOf: true,
    constructor: Canvas
};

/**
 * 元素操作及常用工具类
 * @static
 */
var ToolHandle = {
    /**
     * 转布尔类型
     */
    parseBoolean: function (value) {
        if (value) {
            var val = value.toString().toLowerCase();
            if (val === "false") {
                return false;
            } else if (val === "0") {
                return false;
            } else return !!value;
        } else return false;
    },
    /**
     * 添加类样式
     * @param {HTMLElement} con - 指定页面元素
     * @param {String} className - 类样式名称
     */
    AddClass: function (con, className) {
        if (con.className.indexOf(className) == -1) {
            con.className += " " + className;
        }
    },
    /**
     * 点击按钮删除控件
     */
    RemoveConOfButton: function (con) {
        var id = $(con).parent().children(".Div_LineControl,.Div_ControlGroup").attr("index");
        _canvas.RemoveOfId(id);
    },
    /**
     * 恢复控件体积
     */
    RecoveryOfCon: function (con) {
        var _index = this.GetControl($(con).parent().children(".Div_LineControl,.Div_ControlGroup").eq(0).attr("index"));
        //var _Control1 = _index.CloneMe.children(".Div_LineControl,.Div_ControlGroup");
        var _Control2 = $(con).parent().children(".Div_LineControl,.Div_ControlGroup");
        var _ControlType = _Control1[0].classList[1].toLowerCase();
        switch (_ControlType) {
            case "control_textarea":
                _Control1.css("height", "100px");
                _Control2.css("height", "100px");
                break;
            default:
        }
    },
    //【完全没法用】获取所有的控件响应大小
    GetPanel: function () {
        throw ("还没写好。");
        $(".Div_LineControl,.Div_ControlGroup").each(function () {
            var x = $(this).offset().left + _canvas.WorkSpace.x;
            var y = $(this).offset().top + _canvas.WorkSpace.y;
            var width = $(this).innerWidth();
            var height = $(this).innerHeight();
            $("body").append("<div class='LocationDiv' style='width:" + width + "px;height:" + height + "px;left:" + x + "px;top:" + y + "px;'></div>");
        });
    },
    /**
     * 获取新的GUID
     * @return {string}
     */
    GetGUID: function () {
        var s = [];
        var hexDigits = "0123456789ABCDEF";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    },
    /**
     * 获取格式化的日期时间
     */
    GetDate: function (format) {
        var now = new Date();
        return now.format(!format ? "yyyy-MM-dd hh:mm:ss" : format);
    },
    /**
     * 点击拖拽（按下）
     * @event
     */
    SetDrag_Down: function (e) {
        IsChangeSize = true;
        _ChangeSizeCon = e.currentTarget.parentNode.childNodes[1];
        _ChangeSizeCon.style.height = $(_ChangeSizeCon).height() + "px";
        _ChangeSize_FinalNum = -1;
        switch (e.currentTarget.classList[0].toLowerCase()) {
            case "dragdown":
                _ChangeSize_Btn = ChangeSizeBtnType.Down;
                break;
        }
    },
    /**
     * 点击拖拽（移动）
     * @event
     */
    SetDrag_Move: function (e) {
        try {
            if (IsChangeSize) {
                if (_ChangeSize_Btn != ChangeSizeBtnType.None) {
                    switch (_ChangeSize_Btn) {
                        case ChangeSizeBtnType.Down:
                            var Page_Y = e.pageY;
                            if (Page_Y == 0) Page_Y = e.changedTouches[0].pageY;
                            var _tempNum = Page_Y - ToolHandle.GetNodeTop(_ChangeSizeCon) - 10;
                            //吸附高度（50的倍数
                            if (_tempNum <= 50) {
                                _ChangeSize_FinalNum = 50;
                                _ChangeSizeCon.style.height = "50px";
                            } else if (_tempNum % 50 < 10) {
                                _ChangeSize_FinalNum = _tempNum - _tempNum % 50;
                                _ChangeSizeCon.style.height = _ChangeSize_FinalNum + "px";
                            } else if ((_tempNum + 10) % 50 - 10 < 10) {
                                _ChangeSize_FinalNum = _tempNum - ((_tempNum + 10) % 50 - 10);
                                _ChangeSizeCon.style.height = _ChangeSize_FinalNum + "px";
                            } else {
                                _ChangeSize_FinalNum = _tempNum;
                                _ChangeSizeCon.style.height = _tempNum + "px";
                            }
                            document.getElementsByName("height")[0].value = parseInt(_ChangeSizeCon.style.height);
                            e.stopPropagation();
                            break;
                        default:
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
    /**
     * 点击拖拽（放开）
     * @event
     */
    SetDrag_Up: function (e) {
        if (_ChangeSize_FinalNum != -1 && !!_ChangeSizeCon) {
            var _con = this.GetControl($(_ChangeSizeCon).attr("index"));
            //_con.CloneMe.children(".Div_LineControl,.Div_ControlGroup").css("height", _ChangeSize_FinalNum);
            _ChangeSize_FinalNum = -1;
            _ChangeSize_Btn = ChangeSizeBtnType.None;
        }
        IsChangeSize = false;
    },
    /**
     * 获取元素纵坐标
     */
    GetNodeTop: function (e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += ToolHandle.GetNodeTop(e.offsetParent);
        return offset;
    },
    /**
     * 获取元素横坐标
     */
    GetNodeLeft: function (e) {
        var offset = e.offsetLeft;
        //offset += e.clientTop;
        if (e.offsetParent != null) offset += ToolHandle.GetNodeLeft(e.offsetParent);
        return offset;
    },
    /**
     * 正在改变浏览器大小
     */
    ChangeFormSize: function (e) {
        if (!_IsBodyChangeSize) {
            _IsBodyChangeSize = true;
            var _isChangeSize = setTimeout(function () {
                var div_canvas = _canvas.Element;
                _canvas.WorkSpace.x = div_canvas.offset().left;
                _canvas.WorkSpace.y = div_canvas.offset().top;
                _canvas.WorkSpace.width = div_canvas.innerWidth();
                _canvas.WorkSpace.height = div_canvas.innerHeight();

                //delbtn_x = phone_x + phone_width / 4;
                //delbtn_y = phone_y + 10;
                //delbtn_width = Div_DelControl.innerWidth();
                //delbtn_height = Div_DelControl.innerHeight();

                _IsBodyChangeSize = false;
                if (!!_isChangeSize) {
                    clearTimeout(_isChangeSize);
                    _isChangeSize = null;
                }
            }, "300");
        }
    },
    /**
     * 根据模板获取变量
     */
    GetTemplate: function (html, options) {
        var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
        var add = function (line, js) {
            js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }
        while (match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    },
    /**
     * 根据变量类型返回对应的值
     */
    GetValue: function (obj, propertyType) {
        _item = null;
        switch (propertyType) {
            case PropertyDataType.Int:
                _item = parseInt(obj);
                break;
            case PropertyDataType.Float:
                _item = parseFloat(obj);
                break;
            case PropertyDataType.Boolean:
                _item = ToolHandle.parseBoolean(obj);
                break;
            default:
                _item = obj;
                break;
        }
        return _item;
    },
    /**
     * 继承基础控件
     */
    InheritPrototype: function (subClass) {
        var prototype = Object.create(BasicControl.prototype); //创建对象
        prototype.constructor = subClass; //增强对象
        subClass.prototype = prototype; //指定对象
    }
};

$(function () {
    $("#Div_Phone_Main").on('mouseover', ".BasicControl", function (e) {
        $(this).addClass("EditFrameShow");
        e.stopPropagation();
    }).on('mouseout', ".BasicControl", function (e) {
        $(this).removeClass("EditFrameShow");
        e.stopPropagation();
    });

    $("#Div_Phone").on('mousedown', "#Div_Phone_Main", function (e) {
        _canvas.CurrentControl = [];
        e.stopPropagation();
    });

    //$("#BugDiv").resizable({
    //    grid: [0, 10],
    //    handles: 's'
    //});

    //$(document.body).mousedown(function () { ToolControl.SetSelectControl(null); });

    //Div_DelControl = $('#Div_DeleteControl');
    //delbtn_x = phone_x + phone_width / 4;
    //delbtn_y = phone_y + 10;
    //delbtn_width = Div_DelControl.innerWidth();
    //delbtn_height = Div_DelControl.innerHeight();

    //****************************************************
    //为新添加的控件加上拖拽效果 【Start】
    //****************************************************
    //默认拖拽效果
    var DefaultDraggable = {
        scroll: true,
        opacity: 0.6,
        zIndex: 999,
        helper: function (e) {
            var temp_e = $("#" + e.currentTarget.classList[1].toString().substr(7)).clone(true);
            temp_e.addClass("GrayBackground");
            temp_e.css({
                width: "150px",
                zIndex: "99999",
                fontFamily: 'Microsoft YaHei'
            });
            return temp_e;
        },
        cursor: "cell",
        cursorAt: { top: 20, left: 50 },
        distance: 10,
        start: function (e) {
            IsDrag = true;

            Me = _canvas.CurrentControl;
            Me[0].Me.children().addClass("BlurControl");
            TempDragControl = Me[0].Me.clone();
            TempDragControl.children(".ToolItem").remove();
            if (Me.ParentId) OldParentControl = _canvas.GetControl(Me.ParentId);

            //for (var i = 0; i < _canvas.ControlCount; i++) {
            //    if (_canvas._list[i].Id == $(e.currentTarget).attr("index")) {
            //        TempDragControl = _canvas._list[i].Me.clone(true);
            //        TempDragControl.children(".ToolItem").remove();
            //        OldParentControl = _canvas.GetControl(_canvas._list[i].ParentId);
            //        break;
            //    }
            //}
            TempLocationType = LocationType.None;
            TempParentControl = null;
            main_controls = _canvas.GetChildrenControls();
            tempIndex = 0;
        }, stop: function (e) {
            if (IsDrag) {
                if (TempLocationType == LocationType.Delete) {
                    Me[0].Me.remove();
                    _canvas.RemoveOfId(Me[0].Id);
                } else {
                    Me[0].Me.remove();
                    $(SplitHr).after(TempDragControl);
                    SplitHr.remove();
                    TempDragControl.children().removeClass("BlurControl");
                    //TempDragControl.removeClass("EditFrameShow");

                    TempDragControl[0].onmousedown = function (e) {
                        _canvas.CurrentControl = [_canvas.GetControl($(this).children("[class*=Control_]").attr("index"))];
                        e.stopPropagation();
                    };
                    TempDragControl.children().eq(0).draggable(DefaultDraggable);

                    //获取当前选中的控件（不太确定这个方法是不是靠谱，可能会出现一些问题，比如拖拽的时候没有选中当前控件，但是因为能提升效率，先这样用着看看吧
                    var _con = _canvas.GetControl(Me[0].Id);

                    _con.Me = TempDragControl;
                    var _con_controls = _canvas.GetChildrenControls(_con.Id);
                    for (var i = 0; i < _con_controls.length; i++) {
                        _con_controls[i].Me = TempDragControl.find("[index='" + _con_controls[i].Id + "']").parent();
                        _con_controls[i].Me[0].onmousedown = function (e) {
                            _canvas.CurrentControl = [_canvas.GetControl($(this).children("[class*=Control_]").attr("index"))];
                            e.stopPropagation();
                        };
                        _con_controls[i].Me.children("[class*='Control_']").draggable(DefaultDraggable);
                    }

                    //如果自己的父控件不等于当前的父控件的话
                    //if (!TempParentControl && OldParentControl) {
                    //    _canvas.GetControl($(e.target).attr("index")).ParentId = !TempParentControl ? "" : TempParentControl.Id;
                    //    var _oldcon_controls = _canvas.GetChildrenControls(OldParentControl.Id);
                    //    for (var i = 0; i < _oldcon_controls.length; i++) {
                    //        if (_oldcon_controls[i].Id == _con.Id) {
                    //            _oldcon_controls[i].ParentId = !TempParentControl ? "" : TempParentControl.Id;
                    //        }
                    //    }
                    //}
                    Me.ParentId = !TempParentControl ? "" : TempParentControl.Id;
                    //if (TempParentControl) {
                    //    var _tempcon_controls = _canvas.GetChildrenControls(TempParentControl.Id);
                    //    _con.ParentId = TempParentControl.Id;
                    //    for (var i = 0; i < _tempcon_controls.length; i++) {
                    //        _tempcon_controls[i].Me = _con.Me;
                    //        //TempParentControl.Controls[i].Me.children().eq(0).draggable(DefaultDraggable);
                    //    }
                    //}
                    Me = null;
                }
                TempDragControl = null;
                TempParentControl = null;
                IsDrag = false;
                tempIndex = 0;
            } else {
                //$(this).children().removeClass("BlurControl");
                //$(this).removeClass("EditFrameShow");
            }
        }, drag: function (e) {
            if (IsDrag) {
                var Page_X = e.pageX, Page_Y = e.pageY;
                if (Page_X > _canvas.WorkSpace.x && Page_Y > _canvas.WorkSpace.y - 20
                    && Page_X < _canvas.WorkSpace.x + _canvas.WorkSpace.width && Page_Y < _canvas.WorkSpace.y + _canvas.WorkSpace.height) {
                    TempLocationType = LocationType.None;
                    //移动到内部的时候
                    //if (Page_X >= delbtn_x && Page_Y >= delbtn_y && Page_X <= delbtn_x + delbtn_width && Page_Y <= delbtn_y + delbtn_height) {
                    //    Div_DelControl.addClass("DeleteControl_Ok");
                    //    SplitHr.remove();
                    //    TempLocationType = LocationType.Delete;
                    //    return;
                    //} else {
                    //    if (Div_DelControl.hasClass("DeleteControl_Ok")) Div_DelControl.removeClass("DeleteControl_Ok");
                    //}
                    if (_canvas.ControlCount == 0) {
                        $(_canvas.Element).append(SplitHr);
                    } else {
                        tempmax_y = 0;
                        tempmin_y = _canvas.WorkSpace.y;
                        TempParentControl = null;
                        for (var i = 0; i < main_controls.length; i++) {
                            tcon_x = main_controls[i].Me.offset().left;
                            tcon_y = main_controls[i].Me.offset().top;
                            tcon_width = main_controls[i].Me.innerWidth();
                            tcon_height = main_controls[i].Me.innerHeight();
                            if (tcon_y <= tempmin_y + 10) tempmin_y = tcon_y + 10;
                            if (tcon_y + tcon_height + 10 >= tempmax_y) tempmax_y = tcon_y + tcon_height + 10;
                            //光标在元素内部
                            if (Page_Y > tcon_y && Page_Y < tcon_y + tcon_height + 12) {
                                //控件内能容纳其他控件且不是自己
                                if (main_controls[i].HasControl && main_controls[i].Id != Me[0].Id && !Me.IsRootControl) {
                                    //
                                    if (Page_Y > tcon_y + 10 && Page_Y < tcon_y + tcon_height + 12) {
                                        //设置父控件
                                        TempParentControl = main_controls[i];
                                        tempmax_y_2 = 0;
                                        tempmin_y_2 = 0;
                                        parent_controls = _canvas.GetChildrenControls(main_controls[i].Id);

                                        //如果没有子控件就直接加到父控件内部
                                        if (parent_controls == 0) {
                                            SplitHr.remove();
                                            main_controls[i].Me.children(".Div_ControlGroup").append(SplitHr);
                                            break;
                                        }
                                        //这里开始！首先遍历这个控件的所有子控件
                                        for (var o = 0; o < parent_controls.length; o++) {
                                            tcon_x_2 = parent_controls[o].Me.offset().left;
                                            tcon_y_2 = parent_controls[o].Me.offset().top;
                                            tcon_width_2 = parent_controls[o].Me.innerWidth();
                                            tcon_height_2 = parent_controls[o].Me.innerHeight();
                                            if (tcon_y_2 < tempmin_y_2 - 10) tempmin_y_2 = tcon_y_2 - 10;
                                            if (tcon_y_2 + tcon_height_2 + 10 > tempmax_y_2) tempmax_y_2 = tcon_y_2 + tcon_height_2 + 10;

                                            //光标在元素内部
                                            if (Page_Y > tcon_y_2 && Page_Y < tcon_y_2 + tcon_height_2 + 12) {
                                                //光标在元素上半部分
                                                if (Page_Y < tcon_y_2 + tcon_height_2 / 2 + 1) {
                                                    SplitHr.remove();
                                                    parent_controls[o].Me.before(SplitHr);
                                                    break;
                                                    //光标在元素下半部分
                                                } else if (Page_Y > tcon_y_2 + tcon_height_2 / 2 - 1) {
                                                    SplitHr.remove();
                                                    parent_controls[o].Me.after(SplitHr);
                                                    break;
                                                }
                                            } else if (o == parent_controls.length - 1) {
                                                if (Page_Y > tempmax_y_2) {
                                                    SplitHr.remove();
                                                    main_controls[i].Me.children(".Div_ControlGroup").append(SplitHr);
                                                    break;
                                                } else if (Page_Y < tempmin_y_2) {
                                                    SplitHr.remove();
                                                    main_controls[i].Me.children(".Div_ControlGroup").prepend(SplitHr);
                                                    break;
                                                } else {
                                                    //debugger;
                                                }
                                            } else {
                                                //debugger;
                                            }
                                        }
                                        break;
                                    } else {
                                    }
                                }
                                //光标在元素上半部分
                                if (Page_Y < tcon_y + tcon_height / 2 + 1) {
                                    SplitHr.remove();
                                    main_controls[i].Me.before(SplitHr);
                                    break;
                                    //光标在元素下半部分
                                } else if (Page_Y > tcon_y + tcon_height / 2 - 1) {
                                    SplitHr.remove();
                                    main_controls[i].Me.after(SplitHr);
                                    break;
                                }
                                //排除其他所有情况则直接添加到界面最后部分（或者最开始的部分
                            } else if (i == main_controls.length - 1) {
                                if (Page_Y > tempmax_y) {
                                    SplitHr.remove();
                                    _canvas.Element.append(SplitHr);
                                    break;
                                } else if (Page_Y < tempmin_y) {
                                    SplitHr.remove();
                                    _canvas.Element.prepend(SplitHr);
                                    break;
                                } else {
                                    //debugger;
                                }
                            } else {
                                //debugger;
                            }
                        }
                    }
                } else {
                    //移动到外部的时候
                    SplitHr.remove();
                    TempParentControl = null;
                    TempLocationType = LocationType.Delete;
                }
            }
        }
    };
    //****************************************************
    //为新添加的控件加上拖拽效果 【End】
    //****************************************************


    //****************************************************
    //添加新控件 【Start】
    //****************************************************
    $(".ToolItem:not(.ToolItem_IsDisabled)").draggable({
        scroll: true,
        opacity: 0.8,
        zIndex: 999,
        cursor: "cell",
        cursorAt: { top: 20, left: 50 },
        helper: function (e) {
            var temp_e = $(e.currentTarget).clone(true);
            //temp_e.removeClass("ui-draggable");
            //temp_e.removeClass("ui-draggable-handle");
            temp_e.css({
                width: "150px",
                zIndex: "9999",
                fontFamily: 'Microsoft YaHei'
            });
            temp_e.addClass("GrayBackground");
            return temp_e;
        },
        start: function (e) {
            IsDrag = true;
            TempDragControl = $("#TempTool" + e.currentTarget.id).parent().clone(true);
            SplitHr = $("#SplitHr").clone(true);
            TempParentControl = null;
            main_controls = _canvas.GetChildrenControls();
            tempIndex = 0;
        },
        drag: function (e) {
            var Page_X = e.pageX, Page_Y = e.pageY;
            if (IsDrag) {
                //光标在内部的时候
                if (Page_X > _canvas.WorkSpace.x && Page_Y > _canvas.WorkSpace.y - 20 && Page_X < _canvas.WorkSpace.x + _canvas.WorkSpace.width && Page_Y < _canvas.WorkSpace.y + _canvas.WorkSpace.height) {
                    if (_canvas.ControlCount == 0) {
                        $(_canvas.Element).append(SplitHr);
                    } else {
                        tempmax_y = 0;
                        tempmin_y = _canvas.WorkSpace.y;
                        TempParentControl = null;
                        for (var i = 0; i < main_controls.length; i++) {
                            tcon_x = main_controls[i].Me.offset().left;
                            tcon_y = main_controls[i].Me.offset().top;
                            tcon_width = main_controls[i].Me.innerWidth();
                            tcon_height = main_controls[i].Me.innerHeight();
                            if (tcon_y <= tempmin_y + 10) tempmin_y = tcon_y + 10;
                            if (tcon_y + tcon_height + 10 >= tempmax_y) tempmax_y = tcon_y + tcon_height + 10;
                            //光标在元素内部
                            if (Page_Y > tcon_y && Page_Y < tcon_y + tcon_height + 12) {
                                //控件内能容纳其他控件且不是自己
                                if (main_controls[i].HasControl && main_controls[i].Id != $(e.target).attr("index")) {

                                    if (Page_Y > tcon_y + 10 && Page_Y < tcon_y + tcon_height + 12) {
                                        //设置父控件
                                        TempParentControl = main_controls[i].Id.toString();
                                        tempmax_y_2 = 0;
                                        tempmin_y_2 = 0;
                                        parent_controls = _canvas.GetChildrenControls(main_controls[i].Id);

                                        //如果没有子控件就直接加到父控件内部
                                        if (parent_controls == 0) {
                                            SplitHr.remove();
                                            main_controls[i].Me.children(".Div_ControlGroup").append(SplitHr);
                                            break;
                                        }
                                        //这里开始！首先遍历这个控件的所有子控件
                                        for (var o = 0; o < parent_controls.length; o++) {
                                            tcon_x_2 = parent_controls[o].Me.offset().left;
                                            tcon_y_2 = parent_controls[o].Me.offset().top;
                                            tcon_width_2 = parent_controls[o].Me.innerWidth();
                                            tcon_height_2 = parent_controls[o].Me.innerHeight();
                                            if (tcon_y_2 < tempmin_y_2 - 10) tempmin_y_2 = tcon_y_2 - 10;
                                            if (tcon_y_2 + tcon_height_2 + 10 > tempmax_y_2) tempmax_y_2 = tcon_y_2 + tcon_height_2 + 10;

                                            //光标在元素内部
                                            if (Page_Y > tcon_y_2 && Page_Y < tcon_y_2 + tcon_height_2 + 12) {
                                                //光标在元素上半部分
                                                if (Page_Y < tcon_y_2 + tcon_height_2 / 2 + 1) {
                                                    SplitHr.remove();
                                                    parent_controls[o].Me.before(SplitHr);
                                                    break;
                                                    //光标在元素下半部分
                                                } else if (Page_Y > tcon_y_2 + tcon_height_2 / 2 - 1) {
                                                    SplitHr.remove();
                                                    parent_controls[o].Me.after(SplitHr);
                                                    break;
                                                }
                                            } else if (o == parent_controls.length - 1) {
                                                if (Page_Y > tempmax_y_2) {
                                                    SplitHr.remove();
                                                    main_controls[i].Me.children(".Div_ControlGroup").append(SplitHr);
                                                    break;
                                                } else if (Page_Y < tempmin_y_2) {
                                                    SplitHr.remove();
                                                    main_controls[i].Me.children(".Div_ControlGroup").prepend(SplitHr);
                                                    break;
                                                } else {
                                                    //debugger;
                                                }
                                            } else {
                                                //debugger;
                                            }
                                        }
                                        break;
                                    } else {
                                    }
                                }
                                //光标在元素上半部分
                                if (Page_Y < tcon_y + tcon_height / 2 + 1) {
                                    SplitHr.remove();
                                    main_controls[i].Me.before(SplitHr);
                                    break;
                                    //光标在元素下半部分
                                } else if (Page_Y > tcon_y + tcon_height / 2 - 1) {
                                    SplitHr.remove();
                                    main_controls[i].Me.after(SplitHr);
                                    break;
                                }
                                //排除其他所有情况则直接添加到界面最后部分（或者最开始的部分
                            } else if (i == main_controls.length - 1) {
                                if (Page_Y > tempmax_y) {
                                    SplitHr.remove();
                                    _canvas.Element.append(SplitHr);
                                    break;
                                } else if (Page_Y < tempmin_y) {
                                    SplitHr.remove();
                                    _canvas.Element.prepend(SplitHr);
                                    break;
                                } else {
                                    //debugger;
                                }
                            } else {
                                //debugger;
                            }
                        }
                    }
                } else { TempLocationType = LocationType.None; TempParentControl = null; }
            }
            if (IsDrag) {
                if (IsOver && (Page_X < _canvas.WorkSpace.x || Page_Y < _canvas.WorkSpace.y - 20 || Page_X > _canvas.WorkSpace.x + _canvas.WorkSpace.width || Page_Y > _canvas.WorkSpace.y + _canvas.WorkSpace.height)) {
                    SplitHr.remove();
                    IsOver = false;
                } else {
                    IsOver = true;
                }
            }
        }, stop: function () {
            if (IsOver && IsDrag) {
                $(SplitHr).after(TempDragControl);
                SplitHr.remove();

                //创建控件
                var con = _canvas.CreateControl(TempDragControl, TempParentControl, tempIndex);

                TempDragControl.children("[class*='Control_']").draggable(DefaultDraggable);

                //if (TempParentControl) {
                //    TempParentControl.Controls.push(_newcon);
                //    for (var i = 0; i < TempParentControl.Controls.length; i++) {
                //        TempParentControl.Controls[i].Me.children().eq(0).draggable(DefaultDraggable);
                //    }
                //}

                TempParentControl = null;
                TempDragControl = null;
                IsDrag = false;
                IsOver = false;
                tempIndex = 0;
            } else {
                //alert("IsOver:" + IsOver + ",IsDrag:" + IsDrag);
            }
        }
    });
    //****************************************************
    //添加新控件 【End】
    //****************************************************

    $(".Text_Singer_Num").keydown(function (e) {
        if (e.keyCode == "38") {
            if (!isNaN($(this).val())) {
                var num = parseInt($(this).val()) + 10;
                $(this).val(num);
                e.preventDefault();
            }
        } else if (e.keyCode == "40") {
            if (!isNaN($(this).val())) {
                var num = parseInt($(this).val()) - 10;
                if (num < 50) return;
                $(this).val(num);
                e.preventDefault();
            }
        }
    });

    $(".Text_MinusNum").click(function () {
        event.preventDefault();
        var _con = $(this).prevAll("input").eq(0);
        if (!!_con && !isNaN(_con.val())) {
            var num = parseInt(_con.val()) - 10;
            _con.val(num);

        }
    });
    $(".Text_AddNum").click(function () {
        event.preventDefault();
        var _con = $(this).prevAll("input").eq(0);
        if (!!_con && !isNaN(_con.val())) {
            var num = parseInt(_con.val()) + 10;
            _con.val(num);

        }
    });
    var _t = null;
    //$("[mytitle]").live("focus", function () {
    //    var tooldiv = $("#Div_ToolTip");
    //    if (ToolHandle.GetNodeTop(this) + tooldiv.innerHeight() >= $(document).height()) {
    //        tooldiv.css({
    //            "top": ToolHandle.GetNodeTop(this) - tooldiv.innerHeight(),
    //            "left": ToolHandle.GetNodeLeft(this)
    //        }).html($(this).attr("mytitle"));
    //        $("#Div_ToolTip").show("fast", function () {
    //            _t = setTimeout(function () { $("#Div_ToolTip").hide("fast"); }, "2000");
    //        });
    //    } else {
    //        tooldiv.css({
    //            "top": ToolHandle.GetNodeTop(this) + tooldiv.innerHeight(),
    //            "left": ToolHandle.GetNodeLeft(this)
    //        }).html($(this).attr("mytitle"));
    //        $("#Div_ToolTip").slideDown("fast", function () {
    //            _t = setTimeout(function () { $("#Div_ToolTip").slideUp("fast"); }, "2000");
    //        });
    //    }
    //});
    //$("[mytitle]").live("blur", function () {
    //    if ($("#Div_ToolTip").is(":visible")) { $("#Div_ToolTip").hide(); clearTimeout(_t); }
    //    else $("#Div_ToolTip").slideUp("fast");
    //});
});

/**
 * [重要]全局画布
 */
var _canvas = new Canvas("Div_Phone_Main");
//控制画布属性
Object.defineProperties(_canvas, {
});