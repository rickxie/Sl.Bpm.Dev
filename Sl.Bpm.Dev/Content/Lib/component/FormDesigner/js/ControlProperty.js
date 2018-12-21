/// <reference path="Main.js" />

/**
 * 放置位置类型
 * @enum {Number} Window.LocationType
 */
Window.LocationType = {
    /**
        * 无操作
        */
    None: 0,
    /**
        * 删除
        */
    Delete: 1
};
/**
 * 拖动调整大小的按钮类型
 * @enum {Number} Window.ChangeSizeBtnType
 */
Window.ChangeSizeBtnType = {
    /**
     * @property {Number} [None] 未调整
     */
    None: -1,
    /**往上拖动调整*/
    Top: 0,
    /**往下拖动调整*/
    Down: 1,
    /**往上拖动调整*/
    Left: 2,
    /**往右拖动调整*/
    Right: 3,
    /**往左上拖动调整*/
    Top_Left: 4,
    /**往右上拖动调整*/
    Top_Right: 5,
    /**往左下拖动调整*/
    Down_Left: 6,
    /**往右下拖动调整*/
    Down_Right: 7
};
/**
 * 数据类型
 * @enum {Number} Window.PropertyDataType
 */
Window.PropertyDataType = {
    /**
     * 任意类型
     */
    Object: 0,
    /**
     * 字符串
     */
    Sting: 1,
    /**
     * 整型数字
     */
    Int: 2,
    /**
     * 浮点型数字
     */
    Float: 3,
    /**
     * 布尔类型
     */
    Boolean: 4,
    /**
     * 函数类型
     */
    Function: 5,
    /**
     * 字符串数组类型
     */
    Array: 6,
    /**
     * 日期类型
     */
    Date: 7,
    /**
     * 日期时间类型
     */
    DateTime: 8
};
/**
 * 验证类型
 * @class Window.ValidatorType
 */
Window.ValidatorType = {
    /**
     * 最大值（可以针对数字和日期）
     */
    Max: 0,
    /**
     * 最小值（可以针对数字和日期）
     */
    Min: 0,
    /**
     * 禁止为空
     */
    NotNull: false,
    /**
     * 固定模式
     */
    Pattern: {
        Email: "",
        Phone: "",
        IDCard: ""
    },
    /**
     * 正则表达式匹配
     */
    Regex: "",
    ValidatorData: false,
    /**
     * 返回错误文本
     */
    ErrorText: function (str) {
        return str || "匹配失败";
    }
};

/**
 * 编辑器类型
 * @class Window.EditToolMode
 */
Window.EditToolMode = {
    /**
     * 单行文本框
     */
    TextBox: {
        Name: "TextBox",
        Type: "text",
        Init: function (obj, value) {
            var html = "";
            html += "<input class='Text_Singer' autocomplete='off' type='text'";
            if (obj.IsRequired) html += ' required="required"';
            if (obj.Name) html += ' name="' + obj.Name + '"';
            if (obj.MaxLength) html += ' maxlength="' + obj.MaxLength + '"';
            if (obj.Tooltip) { html += ' placeholder="' + obj.Tooltip + '"'; }
            if (obj.IsDisabled) html += ' disabled="disabled"';

            if (value) html += ' value="' + value + '"';
            html += "/>";
            return html;
        }
    },
    /**
     * 数字文本框
     */
    NumberBox: {
        Name: "NumberBox",
        Type: "number",
        Init: function (obj, value) {
            var html = "";
            html += "<input class='Text_Singer' autocomplete='off' type='number'";
            if (obj.IsRequired) html += ' required="required"';
            if (obj.Name) html += ' name="' + obj.Name + '"';
            if (obj.Tooltip) { html += ' placeholder="' + obj.Tooltip + '"'; }
            if (obj.IsDisabled) html += ' disabled="disabled"';
            if (obj.Number) html += ' value="' + obj.Number + '"';
            if (obj.Max) html += ' max="' + obj.Max + '"';
            if (obj.Min) html += ' min="' + obj.Min + '"';

            if (value) html += ' value="' + value + '"';
            html += "/>";
            return html;
        }
    },
    /**
     * 日期文本框
     */
    DateBox: {
        Name: "DateBox",
        Type: "date",
        Templet: "<input type='date' value='{0}' />",
        Init: function (obj, value) {
            debugger;
            var html = "";
            html += "<input class='Text_Singer' autocomplete='off' type='date'";
            if (obj.IsRequired) html += ' required="required"';
            if (obj.Name) html += ' name="' + obj.Name + '"';
            if (obj.Tooltip) { html += ' placeholder="' + obj.Tooltip + '"'; }
            if (obj.IsDisabled) html += ' disabled="disabled"';
            if (obj.Number) html += ' value="' + obj.Number + '"';
            if (obj.MaxDate) html += ' max="' + obj.MaxDate + '"';
            if (obj.MinDate) html += ' min="' + obj.MinDate + '"';

            if (value) html += ' value="' + value + '"';
            html += "/>";
            return html;
        }
    },
    /**
     * 日期+时间文本框
     */
    DateTimeBox: {
        Name: "DateTimeBox",
        Type: "datetime",
        Templet: "<input type='datetime' value='{0}' />",
        Init: function (obj, value) {
            var html = "";
            html += "<input class='Text_Singer' autocomplete='off' type='datetime'";
            if (obj.IsRequired) html += ' required="required"';
            if (obj.Name) html += ' name="' + obj.Name + '"';
            if (obj.Tooltip) { html += ' placeholder="' + obj.Tooltip + '"'; }
            if (obj.IsDisabled) html += ' disabled="disabled"';

            if (value) html += ' value="' + value + '"';
            html += "/>";
            return html;
        }
    },
    /**
     * 多行文本框
     */
    MultiTextBox: {
        Name: "MultiTextBox",
        Type: "datetime",
        Init: function (obj, value) {
            var html = "";
            html += "<textarea style='height:60px;' class='Text_Singer'";
            if (obj.IsRequired) html += ' required="required"';
            if (obj.Name) html += ' name="' + obj.Name + '"';
            if (obj.MaxLength) html += ' maxlength="' + obj.MaxLength + '"';
            if (obj.Tooltip) { html += ' placeholder="' + obj.Tooltip + '"'; }
            if (obj.IsDisabled) html += ' disabled="disabled"';
            html += ">";
            if (value) html += value;
            html += "</textarea>";
            return html;
        }
    },
    /**
     * 下拉选择框
     */
    Combobox: {
        Name: "Combobox",
        Type: "select",
        Init: function (obj, value) {
            var html = "";
            html += "<select class='Text_Singer'";
            if (obj.IsRequired) html += ' required="required"';
            if (obj.Name) html += ' name="' + obj.Name + '"';
            if (obj.MaxLength) html += ' maxlength="' + obj.MaxLength + '"';
            if (obj.Tooltip) { html += ' placeholder="' + obj.Tooltip + '"'; }
            if (obj.IsDisabled) html += ' disabled="disabled"';
            html += ">";

            for (var item in obj.Option) {
                item = ToolHandle.GetValue(item, obj.DataType);
                if (value == _item) html += "<option label='" + obj.Option[_item] + "' value='" + _item + "' selected='selected' />";
                else html += "<option label='" + obj.Option[_item] + "' value='" + _item + "' />";
            }

            html += "</select>";
            return html;
        }
    },
    /**
     * 单选钮
     */
    RadioButton: {
        Name: "RadioButton",
        Type: "radio",
        Init: function (obj, value) {
            var html = "";
            //如果有默认值则直接选中默认值，否则不选。或者，必填状态下默认选中第一个。
            for (var item in obj.Option) {
                item = ToolHandle.GetValue(item, obj.DataType);
                var guid = ToolHandle.GetGUID();
                if (value == _item) html += "<input type='radio' checked='checked' value='" + _item + "' name='" + obj.Name + "' id='" + guid + "' /><label for='" + guid + "'>" + obj.Option[_item] + "</label>";
                else html += "<input type='radio' value='" + _item + "' name='" + obj.Name + "' id='" + guid + "' /><label for='" + guid + "'>" + obj.Option[_item] + "</label>";
            }
            return html;
        }
    },
    /**
     * 复选框
     */
    Checkbox: 8
};
/*属性组信息*/
var GroupType = {
    //必要项
    Requisite: {
        Icon: "fa fa-exclamation",
        Name: "Requisite",
        Title: "必要",
        Index: 1
    },
    //外观
    Design: {
        Icon: "fa fa-tv",
        Name: "Design",
        Title: "外观",
        Index: 2
    },
    //功能
    Function: {
        Icon: "fa fa-cogs",
        Name: "Function",
        Title: "功能",
        Index: 3
    },
    //其他
    Else: {
        Icon: "fa fa-ellipsis-h",
        Name: "Else",
        Title: "其他",
        Index: 4
    }
}

/*属性的详细信息*/
var ControlProperty = {
    IsRequired: {
        Name: "IsRequired",
        Title: "是否必填",
        Tooltip: "请选择该项是否必填（必选）",
        DataType: PropertyDataType.Boolean,
        EditMode: EditToolMode.Combobox,
        Option: {
            true: "是",
            false: "否"
        },
        Group: GroupType.Requisite,
        Function: function (control, value) {
            control.Me[0].querySelector("[name=Title]").innerHTML = control.Property.Title.Value + (value ? '<i class="Span_RedStar">*</i>' : '');
            if (value) ToolHandle.AddClass(control.Me[0].children[0], "isRequired");
            else control.Me[0].children[0].className = control.Me[0].children[0].className.replace(/isRequired/g, "");
        },
        IsRequired: true,
        DefaultValue: false
        /*表单验证做个新类，然后在控件的属性的属性上增加表单验证，分为*/
    }, Name: {
        Name: "Name",
        Title: "名称",
        Tooltip: "请输入标题（必填）",
        NotNull: true,
        PrimaryKey: true,
        MaxLength: 100,
        Regex: "",
        DataType: PropertyDataType.Sting,
        EditMode: EditToolMode.TextBox,
        Group: GroupType.Requisite,
        IsDisabled: true,
        Function: function (control, value) { throw ("尚未设置编辑功能。"); },
        IsRequired: true,
        DefaultValue: ""
    }, Text: {
        Name: "Text",
        Title: "内容",
        Tooltip: "请输入内容",
        DataType: PropertyDataType.Sting,
        EditMode: EditToolMode.TextBox,
        Group: GroupType.Function,
        Function: function (control, value) {
            if (value.length > 0) {
                control.Me[0].querySelector("[name=Tooltip]").style.display = "none";
                control.Me[0].querySelector("[name=Value]").style.display = "";
            } else {
                control.Me[0].querySelector("[name=Tooltip]").style.display = "";
                control.Me[0].querySelector("[name=Value]").style.display = "none";
            }

            switch (control.ControlType) {
                case "Text":
                case "Number":
                    control.Me[0].querySelector("[name=Value]").innerHTML = value;
                    break;
                default:
            }
        },
        IsRequired: false,
        DefaultValue: ""
    }, MultiText: {
        Name: "MultiText",
        Title: "内容",
        Tooltip: "请输入内容",
        DataType: PropertyDataType.Sting,
        EditMode: EditToolMode.MultiTextBox,
        Group: GroupType.Function,
        Function: function (control, value) {
            if (value.length > 0) {
                control.Me[0].querySelector("[name=Tooltip]").style.display = "none";
                control.Me[0].querySelector("[name=Value]").style.display = "";
            } else {
                control.Me[0].querySelector("[name=Tooltip]").style.display = "";
                control.Me[0].querySelector("[name=Value]").style.display = "none";
            }
            control.Me[0].querySelector("[name=Value]").innerHTML = value.replace(/\n/g, "<br />");
        },
        IsRequired: false,
        DefaultValue: ""
    }, Title: {
        Name: "Title",
        Title: "控件名称",
        Tooltip: "请输入控件名称",
        DataType: PropertyDataType.Sting,
        EditMode: EditToolMode.TextBox,
        Group: GroupType.Function,
        Function: function (control, value) {
            control.Me[0].querySelector("[name=Title]").innerHTML = (value || "[暂无]") + (control.Property.IsRequired.Value ? '<i class="Span_RedStar">*</i>' : '');
        },
        IsRequired: false,
        DefaultValue: ""
    }, Url: {
        Name: "Url",
        Title: "图片路径",
        Tooltip: "请输入图片路径",
        DataType: PropertyDataType.Sting,
        EditMode: EditToolMode.TextBox,
        Group: GroupType.Function,
        Function: function (control, value) {
            control.Me[0].querySelector("[name=Url]").src = value;
            //var img=new Image();
            //img.src = value;
            //if (img.readyState == 'complete') {
            //    control.Me[0].querySelector("[name=Url]").src = value;
            //}else {
            //    control.Me[0].querySelector("[name=UrlText]").innerHTML = value;
            //}

            //control.Me[0].querySelector("[name=Url]").style.background = "#FFF url(" + value + ") no-repeat center center auto 100%";
        },
        IsRequired: false,
        DefaultValue: ""
    }, Tooltip: {
        Name: "Tooltip",
        Title: "输入提示",
        Tooltip: "请输入输入提示",
        DataType: PropertyDataType.Sting,
        Group: GroupType.Function,
        EditMode: EditToolMode.TextBox,
        Function: function (control, value) {
            control.Me[0].querySelector(".Span_LineControl_tip_font").innerHTML = value + (control.Property._IsRequired == "1" ? "[必填]" : "");
        },
        IsRequired: false,
        DefaultValue: ""
    }, MaxLength: {
        Name: "MaxLength",
        Title: "最大输入长度",
        Tooltip: "请输入最大文字长度",
        DataType: PropertyDataType.Int,
        EditMode: EditToolMode.NumberBox,
        Group: GroupType.Function,
        Function: function (control, value) { },
        IsRequired: false,
        DefaultValue: 1000
    }, Max: {
        Name: "Max",
        Title: "最大值",
        Tooltip: "请输入数字的最大值",
        DataType: PropertyDataType.Float,
        EditMode: EditToolMode.NumberBox,
        Group: GroupType.Function,
        Function: function (control, value) { },
        IsRequired: false,
        DefaultValue: 100
    }, Min: {
        Name: "Min",
        Title: "最小值",
        Tooltip: "请输入数字的最小值",
        DataType: PropertyDataType.Float,
        EditMode: EditToolMode.NumberBox,
        Group: GroupType.Function,
        Function: function (control, value) { },
        IsRequired: false,
        DefaultValue: 0
    }, MaxDate: {
        Name: "Max",
        Title: "最大日期",
        Tooltip: "请选择最大日期",
        DataType: PropertyDataType.Date,
        EditMode: EditToolMode.DateBox,
        Group: GroupType.Function,
        Function: function (control, value) { },
        IsRequired: false,
        DefaultValue: new Date()
    }, MinDate: {
        Name: "Min",
        Title: "最小日期",
        Tooltip: "请选择最小日期",
        DataType: PropertyDataType.Date,
        EditMode: EditToolMode.DateBox,
        Group: GroupType.Function,
        Function: function (control, value) { },
        IsRequired: false,
        DefaultValue: new Date('1900-1-1')
    }, IsDisabled: {
        Name: "IsDisabled",
        Title: "是否禁用",
        Tooltip: "请决定是否禁用控件",
        DataType: PropertyDataType.Boolean,
        EditMode: EditToolMode.Combobox,
        Option: {
            true: "是",
            false: "否"
        },
        Group: GroupType.Requisite,
        Function: function (control, value) {
            if (value) {
                control.Me[0].className += " isdisabled";
            } else {
                control.Me[0].className = control.Me[0].className.replace(" isdisabled", "");
            }
        },
        IsRequired: true,
        DefaultValue: false
    }, SqlColumnName: {
        Name: "SqlColumnName",
        Title: "关联Sql字段",
        Tooltip: "请输入SQL关联表的字段名称",
        DataType: PropertyDataType.Sting,
        EditMode: EditToolMode.TextBox,
        Group: GroupType.Requisite,
        Function: function (control, value) { throw ("尚未设置编辑功能。"); },
        IsRequired: false,
        DefaultValue: ""
    }, Height: {
        Name: "Height",
        Title: "控件高度",
        Tooltip: "控件高度",
        DataType: PropertyDataType.Int,
        EditMode: EditToolMode.NumberBox,
        Group: GroupType.Design,
        Function: function (control, value, input) {
            control.Me[0].querySelector("[class*='Control_']").style.height = value + "px";
        },
        IsRequired: true,
        IsValidator: true,
        ValidatorType: {
            Max: 500,
            Min: 20
        },
        DefaultValue: 50
    }, IsHide: {
        Name: "IsHide",
        Title: "是否隐藏",
        Tooltip: "是否隐藏",
        DataType: PropertyDataType.Boolean,
        EditMode: EditToolMode.Combobox,
        Group: GroupType.Design,
        Function: function (control, value) {
            if (value) {
                control.Me[0].querySelector("[class*='Control_']").className += " translucent";
            } else {
                control.Me[0].querySelector("[class*='Control_']").className = control.Me[0].querySelector("[class*='Control_']").className.replace(" translucent", "");
            }
        },
        Option: {
            true: "是",
            false: "否"
        },
        IsRequired: true,
        DefaultValue: false
    }, TitleFontSize: {
        Name: "TitleFontSize",
        Title: "标签字体大小",
        Tooltip: "标签字体大小",
        DataType: PropertyDataType.Int,
        EditMode: EditToolMode.NumberBox,
        Group: GroupType.Design,
        Function: function (control, value) {
            control.Me[0].querySelector("[name=Title]").style.fontSize = (value < 8 ? 8 : value) + "px";
        },
        Option: {
            true: "是",
            false: "否"
        },
        IsRequired: true,
        Max: 99,
        Min: 8,
        DefaultValue: 14
    },
    //获取某一控件类型所有的属性
    GetControlProperty: function (contype) {
        var _templist = ToolControl.ControlType[contype].Property;
        var propertylist = [];
        for (var i = 0; i < _templist.length; i++) {
            propertylist.push(ToolControl.PropertyType[_templist[i]]);
        }
        return propertylist;
    },
    //属性重写
    PropertyInit: function (property, attribute) {
        var pro = {};
        for (var item in property) {
            pro[item] = property[item];
        }
        if (property.DefaultValue != undefined) {
            pro.Value = property.DefaultValue;
        }
        if (!!attribute) {
            for (var item in attribute) {
                pro[item] = attribute[item];
            }
            if (attribute.DefaultValue != undefined) pro.Value = attribute.DefaultValue;
        }
        return $.extend({}, pro);
    }
};

/**
 * 空间工作区
 * @class WorkSpace
 * @constructor 构造函数
 * @param {Number} x X坐标
 * @param {Number} y Y坐标
 * @param {Number} width 宽度
 * @param {Number} height 高度
 */
function WorkSpace(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
WorkSpace.prototype = {
    constructor: WorkSpace,
    getName: function () {
        return this.name;
    }
}