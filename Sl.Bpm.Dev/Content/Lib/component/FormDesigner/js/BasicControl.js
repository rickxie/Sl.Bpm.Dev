/// <reference path="jquery-1.8.3-vsdoc.js" />
/// <reference path="Main.js" />
/// <reference path="ControlProperty.js" />

/**
 * 基础控件类
 * @class BasicControl
 * @constructor 构造函数
 * @param {Canvas} canvas 画布
 * @param {HTMLElement} c 控件所属元素
 * @param {string} [parentId=""] 父控件Id
 * @param {number} [orderIndex=0] 顺序编号
 */
function BasicControl(canvas, c, parentId, orderIndex) {
    if (!canvas) return;
    this.Id = canvas.NewId();
    this.OrderIndex = orderIndex || 0;
    this.Me = $(c);
    this.Me.children(".Div_LineControl,.Div_ControlGroup").removeAttr("id");
    this.Me.children(".Div_LineControl,.Div_ControlGroup").attr("index", this.Id);

    this.Canvas = canvas;
    this.ParentId = parentId ? parentId.toString() : "";

    this.IsEnable = true;
    this.CreateDate = ToolHandle.GetDate("yyyy-MM-dd hh:mm:ss");
    this.CreateUser = "";

    var _tempclass = c.children("[class*='Control_']").attr("class").split(" ");
    for (var i = 0; i < _tempclass.length; i++) {
        if (_tempclass[i].indexOf("Control_") >= 0) {
            switch (_tempclass[i]) {
                case "Control_Text":
                    break;
                case "Control_Textarea":
                    break;
                case "Control_Number":
                    break;
                case "Control_DateCombobox":
                    this.ControlType = "DateCombobox";
                    this.Property = {
                        IsRequired: false,
                        Title: "日期选择框",
                        Name: "日期选择框",
                        Tooltip: "请选择",
                        Value: new Date().format("yyyy-MM-dd"),
                        Height: 50,
                        IsDisabled: false,
                        IsHide: false
                    };
                    this.HasControl = false;
                    this.IsRootControl = false;
                    break;
                case "Control_Image":
                    this.ControlType = "Image";
                    this.Property = {
                        Name: "图片框",
                        Tooltip: "图片",
                        Url: "",
                        Height: 50,
                        IsHide: false
                    };
                    this.HasControl = false;
                    this.IsRootControl = false;
                    break;
                case "Control_Remark":
                    this.ControlType = "Remark";
                    this.Property = {
                        Title: "说明文字",
                        Name: "说明",
                        IsHide: false,
                        TitleFontSize: 14,
                    };
                    /*可包含其他控件*/
                    this.HasControl = false;
                    this.IsRootControl = false;
                    break;
                case "Control_Detail":
                    this.ControlType = "Detail";
                    this.Property = {
                        Title: "明细框",
                        Name: "明细框",
                        IsDisabled: false,
                        IsHide: false
                    };
                    /*可包含其他控件*/
                    this.HasControl = true;
                    /*根节点控件不允许被包含到其他控件内*/
                    this.IsRootControl = true;
                    break;
                default:
            }
            break;
        }
    }

    var _Me = this;

    _Me.SetProperty = {};

    /**
     * 鼠标点击事件（点击后设置选中控件为当前控件
     * @event
     */
    this.Me[0].onmousedown = function (e) {
        canvas.CurrentControl = [_Me];
        e.stopPropagation();
    };
}

//基础控件原型函数
//原型字面量方式会将对象的constructor变为Object，此外强制指回Person
BasicControl.prototype.constructor = BasicControl;
/**
 * @method 获取名称
 * @static
 * @experimental
 * @returns 控件的开始日期（what?
 */
BasicControl.prototype.getName = function () {
    return this.CreateDate;
};
/**
 * @method 删除控件
 * @extends BasicControl
 * @static
 */
BasicControl.prototype.remove = function () {
    try {
        this.Canvas.RemoveOfId(this.Id);
    } catch (e) {
        console.error(e.message);
    }
};
/**
 * @method 选择当前控件
 * @extends BasicControl
 * @static
 */
BasicControl.prototype.select = function () {
    var con = this;
    con.Me[0].className += ' Div_SelectControl';
    var pros = [];
    /*展示所有属性*/
    var html = '';

    for (var p in con.Property) {
        var pro = con.Property[p];
        var has = false;
        for (var i = 0; i < pros.length; i++) {
            try {
                if (pros[i].Group.Name == pro.Group.Name) {
                    pros[i].Propertys.push(pro);
                    has = true;
                    break;
                }
            } catch (e) {
                debugger;
            }
        }
        if (!has) {
            pros.push({
                Group: pro.Group,
                Propertys: [pro]
            });
        }
    }
    //构建属性栏HTML
    for (var i = 0; i < pros.length; i++) {
        html += '<div class="div_LittleTitle"><i class="' + pros[i].Group.Icon + '"></i><label>' + pros[i].Group.Title + '</label></div>';
        for (var o = 0; o < pros[i].Propertys.length; o++) {
            html += '<div class="div_PropertyItem"><div class="div_PropertyName"><span>' + pros[i].Propertys[o].Title + '</span>' + (pros[i].Propertys[o].IsRequired ? '<i class="Span_RedStar">*</i>' : '') + '</div><div class="div_PropertyValue" unit="px">' + pros[i].Propertys[o].EditMode.Init(pros[i].Propertys[o], pros[i].Propertys[o].Value) + '</div></div>';
        }
    }
    html += '<input type="button" value="设置为默认" onclick="SetDefaultProperty()" style="margin-left: 80px;" /><input type="button" value="导出Json" onclick="SaveFile()" />';
    document.getElementsByClassName("div_PropertyPanel")[0].innerHTML = ToolHandle.GetTemplate(html, con.Property);

    var keys = Object.keys(con.Property);
    for (var i = 0; i < keys.length; i++) {
        var element = document.getElementById("Div_ControlProperty").querySelector("[name='" + keys[i] + "']");
        if (element) {
            element.addEventListener("input", function (event) {
                //if (con.Property[event.target.name] == con.DefaultProperty[event.target.name]) {
                //    event.currentTarget.className += " ControlNewValue";
                //}
                //else {
                //    event.currentTarget.className = event.currentTarget.className.replace(" ControlNewValue", "");
                //}
                con.SetProperty["_" + event.target.name](event.target.value, event.target.name, event.target);
            }, false);
        }
    }
};
/**
 * 取消选择当前控件
 * @extends BasicControl
 * @static
 */
BasicControl.prototype.cancelSelect = function () {
    this.Me[0].className = this.Me[0].className.replace(' Div_SelectControl', '');
    document.getElementsByClassName("div_PropertyPanel")[0].innerHTML = "";
};

/*组合式寄生继承方式*/
/**
 * [控件]单行文本框
 * @class BasicControl.Control_Text
 * @extends {BasicControl}
 * @constructor 构造函数
 * @param {Canvas} canvas - 画布
 * @param {HTMLElement} c - 控件所属元素
 * @param {string} [parentId] - 父控件Id
 * @uses ControlProperty
 */
function Control_Text(canvas, c, parentId) {
    BasicControl.call(this, canvas, c, parentId);
    /**
     * 控件本身
     * @property {Control_RadioList} _me
     * @private
     */
    var _me = this;
    /**
     * 控件属性
     * @property {Object} Property
     * @param {Boolean} IsRequired 是否必填
     * @param {Boolean} [Title=多行输入框] 标题
     * @param {String} [Name=多行输入框] 名称
     * @param {String} [Tooltip=请输入] 提示
     * @param {Number} [MaxLength=1000] 最大输入长度
     * @param {String} Value 值
     * @param {Boolean} Value 是否禁用
     * @param {Boolean} Value 是否隐藏
     */
    _me.Property = new Property();
    _me.Property.IsRequired = ControlProperty.PropertyInit(ControlProperty.IsRequired);
    _me.Property.Title = ControlProperty.PropertyInit(ControlProperty.Title, { DefaultValue: "单行输入框" });
    _me.Property.Name = ControlProperty.PropertyInit(ControlProperty.Name, { DefaultValue: "单行输入框" });
    _me.Property.Tooltip = ControlProperty.PropertyInit(ControlProperty.Tooltip, { DefaultValue: "请输入" });
    _me.Property.Value = ControlProperty.PropertyInit(ControlProperty.Text, { DefaultValue: "", Name: "Value" });
    _me.Property.MaxLength = ControlProperty.PropertyInit(ControlProperty.MaxLength, { DefaultValue: 1000 });
    _me.Property.Height = ControlProperty.PropertyInit(ControlProperty.Height, { DefaultValue: 50 });
    _me.Property.IsDisabled = ControlProperty.PropertyInit(ControlProperty.IsDisabled);
    _me.Property.IsHide = ControlProperty.PropertyInit(ControlProperty.IsHide);
    /**
     * 控件类型
     * @property {Boolean} ControlType
     */
    _me.ControlType = "Text";
    /**
     * 是否有子控件
     * @property {Boolean} HasControl
     */
    _me.HasControl = false;
    /**
     * 是否为根控件
     * @property {Boolean} HasControl
     */
    _me.IsRootControl = false;
    //各属性的编辑方法
    for (var item in this.Property) {
        _me.SetProperty["_" + item] = function (value, key, input) {
            _me.Property[key].Value = ToolHandle.GetValue(value, _me.Property[key].DataType);
            _me.Property[key].Function(_me, _me.Property[key].Value, input);
        }
    }
}
Control_Text.prototype = new BasicControl();
Control_Text.prototype.constructor = Control_Text;
//ToolHandle.InheritPrototype(Control_Text);

/**
 * [控件]多行文本框
 * @class BasicControl.Control_Textarea
 * @extends {BasicControl}
 * @constructor 构造函数
 * @param {Canvas} canvas - 画布
 * @param {HTMLElement} c - 控件所属元素
 * @param {string} [parentId] - 父控件Id
 */
function Control_Textarea(canvas, c, parentId) {
    BasicControl.call(this, canvas, c, parentId);
    /**
     * 控件本身
     * @property {Control_RadioList} _me
     * @private
     */
    var _me = this;
    /**
     * 控件属性
     * @property {Object} Property
     * @param {Boolean} IsRequired 是否必填
     * @param {Boolean} [Title=多行输入框] 标题
     * @param {String} [Name=多行输入框] 名称
     * @param {String} [Tooltip=请输入] 提示
     * @param {Number} [MaxLength=1000] 最大输入长度
     * @param {Number} [Height=100] 控件高度
     * @param {String} Value 值
     * @param {Boolean} Value 是否禁用
     * @param {Boolean} Value 是否隐藏
     */
    _me.Property = {};
    _me.Property.IsRequired = ControlProperty.PropertyInit(ControlProperty.IsRequired);
    _me.Property.Title = ControlProperty.PropertyInit(ControlProperty.Title, { DefaultValue: "多行输入框" });
    _me.Property.Name = ControlProperty.PropertyInit(ControlProperty.Name, { DefaultValue: "多行输入框" });
    _me.Property.Tooltip = ControlProperty.PropertyInit(ControlProperty.Tooltip, { DefaultValue: "请输入" });
    _me.Property.MaxLength = ControlProperty.PropertyInit(ControlProperty.MaxLength, { DefaultValue: 1000 });
    _me.Property.Height = ControlProperty.PropertyInit(ControlProperty.Height, { DefaultValue: 100 });
    _me.Property.IsDisabled = ControlProperty.PropertyInit(ControlProperty.IsDisabled);
    _me.Property.IsHide = ControlProperty.PropertyInit(ControlProperty.IsHide);
    _me.Property.Value = ControlProperty.PropertyInit(ControlProperty.MultiText, {
        Function: function () {

        }, DefaultValue: "132", Name: "Value"
    });
    /**
     * 控件类型
     * @property {Boolean} ControlType
     */
    _me.ControlType = "Textarea";
    /**
     * 是否有子控件
     * @property {Boolean} HasControl
     */
    _me.HasControl = false;
    /**
     * 是否为根控件
     * @property {Boolean} HasControl
     */
    _me.IsRootControl = false;
    var _me = this;
    for (var item in this.Property) {
        _me.SetProperty["_" + item] = function (value, key, input) {
            _me.Property[key].Value = ToolHandle.GetValue(value, _me.Property[key].DataType);
            _me.Property[key].Function(_me, _me.Property[key].Value, input);
        }
    }
}
Control_Textarea.prototype = new BasicControl();
Control_Textarea.prototype.constructor = Control_Textarea;

/**
 * [控件]数字输入框
 * @class BasicControl.Control_Number
 * @extends {BasicControl}
 * @constructor 构造函数
 * @param {Canvas} canvas - 画布
 * @param {HTMLElement} c - 控件所属元素
 * @param {string} [parentId] - 父控件Id
 */
function Control_Number(canvas, c, parentId) {
    BasicControl.call(this, canvas, c, parentId);
    /**
     * 控件本身
     * @property {Control_RadioList} _me
     * @private
     */
    var _me = this;
    /**
     * 控件属性
     * @property {Object} Property
     * @param {Boolean} IsRequired 是否必填
     * @param {Boolean} [Title=多行输入框] 标题
     * @param {String} [Name=多行输入框] 名称
     * @param {String} [Tooltip=请输入] 提示
     * @param {Number} [MaxLength=1000] 最大输入长度
     * @param {String} Value 值
     * @param {Boolean} Value 是否禁用
     * @param {Boolean} Value 是否隐藏
     */
    _me.Property = {};
    _me.Property.IsRequired = ControlProperty.PropertyInit(ControlProperty.IsRequired);
    _me.Property.Title = ControlProperty.PropertyInit(ControlProperty.Title, { DefaultValue: "数字输入框" });
    _me.Property.Name = ControlProperty.PropertyInit(ControlProperty.Name, { DefaultValue: "数字输入框" });
    _me.Property.Tooltip = ControlProperty.PropertyInit(ControlProperty.Tooltip, { DefaultValue: "请输入" });
    _me.Property.Value = ControlProperty.PropertyInit(ControlProperty.Text, { DefaultValue: "", Name: "Value" });
    _me.Property.IsDisabled = ControlProperty.PropertyInit(ControlProperty.IsDisabled);
    _me.Property.IsHide = ControlProperty.PropertyInit(ControlProperty.IsHide);
    /**
     * 控件类型
     * @property {Boolean} ControlType
     */
    this.ControlType = "Number";
    /**
     * 是否有子控件
     * @property {Boolean} HasControl
     */
    this.HasControl = false;
    /**
     * 是否为根控件
     * @property {Boolean} HasControl
     */
    this.IsRootControl = false;
    
    for (var item in this.Property) {
        _me.SetProperty["_" + item] = function (value, key, input) {
            _me.Property[key].Value = ToolHandle.GetValue(value, _me.Property[key].DataType);
            _me.Property[key].Function(_me, _me.Property[key].Value, input);
        }
    }
}
Control_Number.prototype = new BasicControl();
Control_Number.prototype.constructor = Control_Number;

/**
 * @new
 * [控件]日期输入框
 * @class BasicControl.Control_Datetime
 * @extends {BasicControl}
 * @constructor 构造函数
 * @param {Canvas} canvas - 画布
 * @param {HTMLElement} c - 控件所属元素
 * @param {string} [parentId] - 父控件Id
 */
function Control_Datetime(canvas, c, parentId) {
    BasicControl.call(this, canvas, c, parentId);
    /**
     * 控件本身
     * @property {Control_RadioList} _me
     * @private
     */
    var _me = this;
    /**
     * 属性
     * @property {Object} Property
     * @param {Boolean} IsRequired 是否必填
     * @param {Boolean} [Title=日期选择框] 标题
     * @param {String} [Name=日期选择框] 名称
     * @param {String} [Tooltip=下拉选择] 提示
     * @param {String} Value 值
     * @param {Boolean} Value 是否禁用
     * @param {Boolean} Value 是否隐藏
     */
    _me.Property = {};
    _me.Property.IsRequired = ControlProperty.PropertyInit(ControlProperty.IsRequired);
    _me.Property.Title = ControlProperty.PropertyInit(ControlProperty.Title, { DefaultValue: "日期选择框" });
    _me.Property.Name = ControlProperty.PropertyInit(ControlProperty.Name, { DefaultValue: "日期选择框" });
    _me.Property.Tooltip = ControlProperty.PropertyInit(ControlProperty.Tooltip, { DefaultValue: "下拉选择" });
    _me.Property.Value = ControlProperty.PropertyInit(ControlProperty.Text, { DefaultValue: "", Name: "Value" });
    _me.Property.IsDisabled = ControlProperty.PropertyInit(ControlProperty.IsDisabled);
    _me.Property.IsHide = ControlProperty.PropertyInit(ControlProperty.IsHide);
    /**
     * 控件类型
     * @property {Boolean} ControlType
     */
    _me.ControlType = "Datetime";
    /**
     * 是否有子控件
     * @property {Boolean} HasControl
     */
    _me.HasControl = false;
    /**
     * 是否为根控件
     * @property {Boolean} HasControl
     */
    _me.IsRootControl = false;
    for (var item in _me.Property) {
        _me.SetProperty["_" + item] = function (value, key, input) {
            _me.Property[key].Value = ToolHandle.GetValue(value, _me.Property[key].DataType);
            _me.Property[key].Function(_me, _me.Property[key].Value, input);
        }
    }
}
Control_Datetime.prototype = new BasicControl();
Control_Datetime.prototype.constructor = Control_Datetime;

/**
 * [控件]单选框组
 * @new
 * @extends {BasicControl}
 * @class BasicControl.Control_RadioList
 * @constructor 构造函数
 * @param {Canvas} canvas - 画布
 * @param {HTMLElement} c - 控件所属元素
 * @param {string} [parentId] - 父控件Id
 */
function Control_RadioList(canvas, c, parentId) {
    BasicControl.call(this, canvas, c, parentId);
    /**
     * 控件本身
     * @property {Control_RadioList} _me
     * @private
     */
    var _me = this;
    /**
     * 属性
     * @property {Object} Property
     * @param {Boolean} IsRequired 是否必填
     * @param {Boolean} [Title=单选框组] 标题
     * @param {String} [Name=单选框组] 名称
     * @param {String} Value 值
     * @param {Boolean} Value 是否禁用
     * @param {Boolean} Value 是否隐藏
     */
    _me.Property = new Property();
    _me.Property.IsRequired = ControlProperty.PropertyInit(ControlProperty.IsRequired);
    me.Property.Title = ControlProperty.PropertyInit(ControlProperty.Title, { DefaultValue: "单选框组" });
    me.Property.Name = ControlProperty.PropertyInit(ControlProperty.Name, { DefaultValue: "单选框组" });
    me.Property.Value = ControlProperty.PropertyInit(ControlProperty.Text, { DefaultValue: "", Name: "Value" });
    me.Property.IsDisabled = ControlProperty.PropertyInit(ControlProperty.IsDisabled);
    me.Property.IsHide = ControlProperty.PropertyInit(ControlProperty.IsHide);
    /**
     * 控件类型
     * @property {Boolean} ControlType
     */
    _me.ControlType = "Datetime";
    /**
     * 是否有子控件
     * @property {Boolean} HasControl
     */
    _me.HasControl = false;
    /**
     * 是否为根控件
     * @property {Boolean} HasControl
     */
    _me.IsRootControl = false;

    for (var item in this.Property) {
        _me.SetProperty["_" + item] = function (value, key, input) {
            _me.Property[key].Value = ToolHandle.GetValue(value, _me.Property[key].DataType);
            _me.Property[key].Function(_me, _me.Property[key].Value, input);
        }
    }
}
Control_RadioList.prototype = new BasicControl();
Control_RadioList.prototype.constructor = Control_RadioList;