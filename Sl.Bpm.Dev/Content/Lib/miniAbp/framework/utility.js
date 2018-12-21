
var _$ = {};
//datatable zui
(function () {

    /**
  * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
  * 
  * @param num1加数1 | num2加数2
  */
    _$.add = function (num1, num2) {
        var tmpNum1 = num1 == null ? 0 : num1;
        var tmpNum2 = num2 == null ? 0 : num2;
        var baseNum, baseNum1, baseNum2;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return (_$.multi(num1, baseNum) + _$.multi(num2, baseNum)) / baseNum;
    };
    /**
     * 减法运算，避免数据相减小数点后产生多位数和计算精度损失。
     * 
     * @param num1被减数  |  num2减数
     */
    _$.sub = function (num1, num2) {
        if (num1 === "" || num1 === undefined || num1 === null) {
            num1 = 0;
        }
        if (num2 === "" || num2 === undefined || num2 === null) {
            num2 = 0;
        }
        var baseNum, baseNum1, baseNum2;
        var precision;// 精度
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
        return ((_$.multi(num1, baseNum) - _$.multi(num2, baseNum)) / baseNum).toFixed(precision);
    };
    /**
     * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
     * 
     * @param num1被乘数 | num2乘数
     */
    _$.multi = function (num1, num2) {
        if (num1 === "" || num1 === undefined || num1 === null) {
            num1 = 0;
        }
        if (num2 === "" || num2 === undefined || num2 === null) {
            num2 = 0;
        }
        var baseNum = 0;
        try {
            baseNum += num1.toString().split(".")[1].length;
        } catch (e) {
        }
        try {
            baseNum += num2.toString().split(".")[1].length;
        } catch (e) {
        }
        return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
    };
    /**
     * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
     * 
     * @param num1被除数 | num2除数
     */
    _$.div = function (num1, num2) {
        if (num1 === "" || num1 === undefined || num1 === null) {
            num1 = 0;
        }
        if (num2 === "" || num2 === undefined || num2 === null) {
            num2 = 0;
        }
        var baseNum1 = 0, baseNum2 = 0;
        var baseNum3, baseNum4;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        with (Math) {
            baseNum3 = Number(num1.toString().replace(".", ""));
            baseNum4 = Number(num2.toString().replace(".", ""));
            return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
        }
    };

    /*将对象转换为数字，多个对象则累加 李典 2016-06-20*/
    _$.getInt = function () {
        var allNull = true;
        var _result = 0;
        if (arguments.length == 1 && !arguments[0]) return 0;
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] === "" || arguments[i] === undefined || arguments[i] === null) continue;
            switch (typeof (arguments[i])) {
                case "array":
                    for (var o = 0; i < arguments[o].length; o++) {
                        allNull = false;
                        _result = _$.add(_result, arguments.callee(arguments[i][o]));
                        //                        _result += arguments.callee(arguments[i][o]);
                    }
                    break;
                default:
                    if (!isNaN(parseFloat(arguments[i]))) {
                        allNull = false;
                        _result = _$.add(_result, parseFloat(arguments[i]));
                        //                        _result += parseFloat(arguments[i]);
                    }
            }
        }
        //        var convertedResult = parseInt(_result * 100000) / 100000;
        var convertedResult = _result;
        if (allNull) return "";
        return convertedResult;
    }

    /*将对象转换为数字，多个对象则累乘 李典 2016-06-20*/
    _$.getMultiply = function () {
        var allNull = true;
        var _result = 1;
        if (arguments.length == 1 && !arguments[0]) return 0;
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] === "" || arguments[i] === undefined || arguments[i] === null) {
                _result = 0;
                continue;
            }
            switch (typeof (arguments[i])) {
                case "array":
                    for (var o = 0; i < arguments[o].length; o++) {
                        allNull = false;
                        _result = _$.multi(_result, arguments.callee(arguments[i][o]));
                    }
                    break;
                default:
                    if (!isNaN(parseFloat(arguments[i]))) {
                        allNull = false;
                        _result = _$.multi(_result, parseFloat(arguments[i]));
                        //                        _result *= parseFloat(arguments[i]);
                    }
            }
        }

        //        var convertedResult = parseInt(_result * 100000) / 100000;
        var convertedResult = _result;
        if (allNull) return "";
        return convertedResult;
    }


    /*将对象数组里的特定属性转换为数字并累加*/
    _$.getSumOfArray = function (arr) {
        var allNull = true;
        var _result = 0;
        for (var i = 0; i < arr.length; i++) {
            for (var o = 1; o < arguments.length; o++) {
                if (arr[i][arguments[o]] !== "" && arr[i][arguments[o]] !== undefined && arr[i][arguments[o]] !== null) {
                    allNull = false;
                    if (!isNaN(parseFloat(arr[i][arguments[o]]))) {
                        _result = _$.add(_result, parseFloat(arr[i][arguments[o]]));
                        //                        _result += parseFloat(arr[i][arguments[o]]);
                    }
                }
            }
        }
        //        var convertedResult = parseInt(_result * 100000) / 100000;
        var convertedResult = _result;
        if (allNull) return "";
        else return convertedResult;
    }

    _$.getMinus = function () {
        var allNull = true;
        var _result = parseFloat(arguments[0]) || 0;
        if (!isNaN(parseFloat(arguments[0]))) allNull = false;
        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i]) continue;
            switch (typeof (arguments[i])) {
                case "array":
                    for (var o = 0; i < arguments[o].length; o++) {
                        allNull = false;
                        _result = _$.sub(_result, _$.getInt(arguments[i][o]));
                        //                        _result -= _$.getInt(arguments[i][o]);
                    }
                    break;
                default:
                    if (!isNaN(parseFloat(arguments[i]))) {
                        allNull = false;
                        _result = _$.sub(_result, _$.getInt(parseFloat(arguments[i])));
                        //                        _result -= parseFloat(arguments[i]);
                    }
            }
        }
        var convertedResult = _result;// parseInt(_result * 100000) / 100000;
        if (allNull) return "";
        return convertedResult;
    }

    /*将对象转换为日期 李典 2016-06-20*/
    _$.getDate = function (obj, format) {
        if (!obj) return "";
        return new Date(obj).format(format);
    }
    //获取和转换时间
    _$.newDate = function (dateObj) {
        if (typeof dateObj == 'string') {
            dateObj = dateObj.replace('T', ' ');
            dateObj = dateObj.replace(/-/g, "/");
            dateObj = dateObj.replace(/\.[0-9]{1,3}/, '');
        }
        return new Date(dateObj);
    }
    /*对当前日期进行加减*/
    _$.getDateStr = function (addDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth()) : (dd.getMonth());//获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
        //return y + "-" + m + "-" + d;
        return new Date(y, m, d);
    }

    _$.getGUID = function (hasHyphen) {
        if (hasHyphen === undefined || hasHyphen === null) hasHyphen = true;
        var s = [];
        var hexDigits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = 0; i < 26; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        if (hasHyphen) {
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";
        }
        var uuid = s.join("");
        return uuid;
    }

    // convert arabic number to chinese number
    var chDecimals = ['角', '分'];
    var chRadices = ['', '拾', '佰', '仟'];
    var rmbUnit = '元';
    var chInteger = '整';
    // only support 9999万亿9999亿9999万9999
    var chBigRadices = ['', '万', '亿', '万亿'];
    var chNumberArr = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    _$.changeRMBToCH = function (currencyDigits) {
        currencyDigits = _$.getInt(currencyDigits).getPrecision(2);

        if (!isNumeric(currencyDigits)) {
            return 'error';
        }

        // make sure currencyDigits is a string
        currencyDigits = currencyDigits + '';

        // Trim zeros at the beginning.
        currencyDigits = currencyDigits.replace(/^0+/, '');

        // Process the coversion from currency digits to characters:
        // Separate integral and decimal parts before processing coversion:
        var parts = currencyDigits.split(".");

        // including integral and decimal
        if (parts.length > 1) {

            integral = parts[0];
            decimal = parts[1];

            // ingore redundant decimal digits that are after the second.
            // 1.101101 -> 1.10
            decimal = decimal.substr(0, 2);

        } else {

            integral = parts[0];
            decimal = "";
        }

        return toChinese(integral, decimal);
    }


    _$.pagingTake = function (arr, pageCount, pageSize) {
        if (arr instanceof Array && arr.length > 0) {
            var pageStartCount = (pageCount - 1) * pageSize;
            var pageEndCount = pageStartCount + pageSize - 1;
            var pagedArr = [];
            for (var i = 0; i < arr.length; i++) {
                if (i >= pageStartCount && i <= pageEndCount) {
                    pagedArr.push(arr[i]);
                }
            }
            return pagedArr;
        }
        return [];
    }

    function toChinese(integral, decimal) {

        // only support 9999万亿
        if (integral.length > 16) {
            return 'error';
        }

        var integralChinese = toIntegralChinese(integral),
            decimalChinese = toDecimalChinese(decimal);

        // return 零元
        if (integralChinese + decimalChinese === '') {
            return chNumberArr[0] + rmbUnit + chInteger;
        }

        // 0.11 return 壹角壹分
        if (integralChinese === '') {

            return decimalChinese;
        }

        if (decimalChinese === '') {

            return integralChinese + rmbUnit + chInteger;
        }

        return integralChinese + rmbUnit + decimalChinese;
    }

    function toIntegralChinese(integral) {

        var outputCharacters = '';

        if (+integral > 0) {

            var zeroCount = 0,
                quotient = 0,
                modulus = 0;

            for (var i = 0, len = integral.length; i < len; i++) {
                var p = len - i - 1;
                var d = integral.substr(i, 1);

                quotient = p / 4;
                modulus = p % 4;

                if (d == "0") {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        // if multiple zeroes are met, add '零' to it
                        outputCharacters += chNumberArr[0];
                    }
                    zeroCount = 0;
                    outputCharacters += chNumberArr[+d] + chRadices[modulus];
                }

                if (modulus == 0 && zeroCount < 4) {
                    outputCharacters += chBigRadices[quotient];
                    zeroCount = 0;
                }
            }
        }

        return outputCharacters;
    }

    function toDecimalChinese(decimal) {

        var outputCharacters = '';

        // Process decimal part if there is:
        if (decimal != "") {
            for (var i = 0; i < decimal.length; i++) {
                var d = decimal.substr(i, 1);
                if (d != "0") {
                    outputCharacters += chNumberArr[Number(d)] + chDecimals[i];
                }
            }
        }

        return outputCharacters;
    }


    function isNumeric(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    }

})();