/**
 * @method 移动元素
 * @member Object
 * @static
 * @param {Number} startIndex 开始下标
 * @param {Number} endIndex 结束下标
 */
Array.prototype.move = function (startIndex, endIndex) {
    if (startIndex == endIndex) return;
    else if (startIndex < 0 || endIndex < 0) return;
    else {
        var _tempObj = this[startIndex];
        this[startIndex] = this[endIndex];
        this[endIndex] = _tempObj;
    }
}
/**
 * 在指定位置插入元素
 * @method insert
 * @member Object
 * @static
 * @param {Number} index 下标
 * @param {Number} item 要插入的项
 */
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
/**
 * 删除指定位置的元素
 * @method delete
 * @member Object
 * @static
 */
Array.prototype.delete = function (index) {
    this.splice(index, 1);
}
/**
 * 新增日期的格式化方法
 * @method format
 * @member Object
 * @static
 * @param {Number} endIndex 格式化字符串
 * @return {String} 日期字符串
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}