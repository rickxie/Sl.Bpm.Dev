function workCalendar(ele) {
    if (!document.getElementById('week')||1==1) {
        var oDiv = document.createElement('div');
        document.getElementById(ele).appendChild(oDiv);
        oDiv.id = 'week';
        oDiv.className = 'work-week';
        //创建日历title
        var h6 = document.createElement('h6');
        oDiv.appendChild(h6);
        var prev = document.createElement('div');
        h6.appendChild(prev);
        prev.className = 'prev';
        prev.innerHTML = '<i class="icon-chevron-left"></i>';
        var content = document.createElement('div');
        content.className = "content";
        h6.appendChild(content);
        var next = document.createElement('div');
        h6.appendChild(next);
        next.className = 'next';
        next.innerHTML = '<i class="icon-chevron-right"></i>';
        //创建星期日到星期六的文字行
        var oPs = document.createElement('p');
        oPs.className = "rlTitle";
        oDiv.appendChild(oPs);
        var opsCont = ['日', '一', '二', '三', '四', '五', '六'];
        for (var i = 0; i <= 6; i++) {
            var oSpan = document.createElement('span');
            oPs.appendChild(oSpan);
            oSpan.innerHTML = opsCont[i];
        }
        //创建日历上面的日期行数所需要的变量
        var oUl = document.createElement('ul');
        oUl.className = "rlCenter";
        oDiv.appendChild(oUl);
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth();
        active(currentMonth);//传参数月份
        //创建日历上下翻月
        prev.onclick = function () {
            active(--currentMonth);
        };
        next.onclick = function () {
            active(++currentMonth);
        };
    }
    //动态创建日历上面日期，变包装成方法
    function active(m) {
        oUl.innerHTML = ''; //切忌一定要把这个内容去掉，要不然会点一次翻页都在日历下面依次显示出来
        var activeDate = new Date(currentYear, m, 1); //外面传进来的不断变化的日期对象
        var year = activeDate.getFullYear();
        var month = activeDate.getMonth(); //把当前的月份保存下来只是为了给title获取月份
        content.innerHTML = year + '年' + (month + 1) + '月';
        //创建日历上面的日期行数
        var n = 1 - activeDate.getDay();
        if (n == 1) {
            n = -6;
        } //为了日历更友好的显示三个月，让用户看的更明白。
        activeDate.setDate(n); //如果n为负数，则减少月份.在用这个月最后一天减去这个值就可以获得日历从哪天开始的。
        for (var i = 0; i < 42; i++) {
            var oLi = document.createElement('li');
            var label = document.createElement('label');
            oLi.appendChild(label);
            oUl.appendChild(oLi);
            var date = activeDate.getDate(); //返回日期1-31号
            label.innerHTML = date;
            oLi.dateValue = year + "-" + (activeDate.getMonth() + 1) + "-" + date; //这里必须是activeDate.getMonth()+1，不能用m+1。因为这个是一直变化的。要不然日历不管点哪天都是属于当前月份的。
            oLi.onclick = function () {
                console.log(this.dateValue);
                if (this.className == "select") {
                    this.className = "";
                } else {
                    this.className = "select";
                }
            };
            if (activeDate.getMonth() != month) {
                oLi.style.color = "#ccc"; //不是本月的天数颜色变成灰色
            }
            //切忌下面这个增加天数语句，一定要判断完上面是不是本月的天数，然后在添加这条增加语句，要不然会出现错误。
            activeDate.setDate(date + 1); //如果超出该月份应有的天数则增加月份
        }
    }
}


function fullWorkCalendar(ele,worklist) {
    if (!document.getElementById('week') || 1 == 1) {
        var oDiv = document.createElement('div');
        document.getElementById(ele).appendChild(oDiv);
        oDiv.className = 'work-week';
        //创建日历title
        var h6 = document.createElement('h6');
        oDiv.appendChild(h6);
        var prev = document.createElement('div');
        h6.appendChild(prev);
        prev.className = 'prev';
        prev.innerHTML = '<i class="icon-chevron-left"></i>';
        var content = document.createElement('div');
        content.className = "content";
        h6.appendChild(content);
        var next = document.createElement('div');
        h6.appendChild(next);
        next.className = 'next';
        next.innerHTML = '<i class="icon-chevron-right"></i>';
        //创建星期日到星期六的文字行
        var oPs = document.createElement('p');
        oPs.className = "rlTitle";
        oDiv.appendChild(oPs);
        var opsCont = ['日', '一', '二', '三', '四', '五', '六'];
        for (var i = 0; i <= 6; i++) {
            var oSpan = document.createElement('span');
            oPs.appendChild(oSpan);
            oSpan.innerHTML = opsCont[i];
        }
        //创建日历上面的日期行数所需要的变量
        var oUl = document.createElement('ul');
        oUl.className = "rlCenter";
        oDiv.appendChild(oUl);
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth();
        active(currentMonth);//传参数月份
        //创建日历上下翻月
        prev.onclick = function () {
            active(--currentMonth);
        };
        next.onclick = function () {
            active(++currentMonth);
        };
    }
    //动态创建日历上面日期，变包装成方法
    function active(m) {
        oUl.innerHTML = ''; //切忌一定要把这个内容去掉，要不然会点一次翻页都在日历下面依次显示出来
        var activeDate = new Date(currentYear, m, 1); //外面传进来的不断变化的日期对象
        var year = activeDate.getFullYear();
        var month = activeDate.getMonth(); //把当前的月份保存下来只是为了给title获取月份
        content.innerHTML = year + '年' + (month + 1) + '月';
        //创建日历上面的日期行数
        var n = 1 - activeDate.getDay();
        if (n == 1) {
            n = -6;
        } //为了日历更友好的显示三个月，让用户看的更明白。
        activeDate.setDate(n); //如果n为负数，则减少月份.在用这个月最后一天减去这个值就可以获得日历从哪天开始的。
        for (var i = 0; i < 42; i++) {
            var oLi = document.createElement('li');
            var label = document.createElement('label');
            oLi.appendChild(label);
            oUl.appendChild(oLi);
            var date = activeDate.getDate(); //返回日期1-31号
            label.innerHTML = date;
            oLi.dateValue = year + "-" + (activeDate.getMonth() + 1) + "-" + date; //这里必须是activeDate.getMonth()+1，不能用m+1。因为这个是一直变化的。要不然日历不管点哪天都是属于当前月份的。
            $(oLi).attr("data-date", oLi.dateValue);
            oLi.onclick = function () {
                console.log(this.dateValue);
            };
            if (activeDate.getMonth() != month) {
                oLi.style.color = "#ccc"; //不是本月的天数颜色变成灰色
            }
            //切忌下面这个增加天数语句，一定要判断完上面是不是本月的天数，然后在添加这条增加语句，要不然会出现错误。
            activeDate.setDate(date + 1); //如果超出该月份应有的天数则增加月份
        }
        for (var i = 0; i < worklist.length; i++) {
            $(".work-week ul li[data-date=" + worklist[i].date + "]").append("<h5><span> " + worklist[i].time+" </span>" + worklist[i].content + "</h5>");
        }
        var today = new Date().toLocaleDateString().replace("/", "-").replace("/", "-");
        $(".work-week ul li[data-date=" + today + "]").css("background","#f7f7f7")
    }
}