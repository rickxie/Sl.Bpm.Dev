
$(function () {
    $(".menu-item dt").click(function () {
        if (!$(this).parent().hasClass("select")) {
            $(".menu-item").removeClass("select");
            $(this).parent().addClass("select");
        }
    })

    $(".manage-menu li").click(function () {
        $(this).addClass("select").siblings().removeClass("select");
        $("[data-menu]").hide();
        $("[data-menu=" + $(this).index() + "]").show();
    })
    $(".pro-tab-s li").click(function () {
        $(this).addClass("select").siblings().removeClass("select");
        var tabs = $(this).parents(".pro-tab-bd");
        tabs.find(".pro-tab-item").hide();
        tabs.find(".pro-tab-item").eq($(this).index()).show();
    })
    // 基于准备好的dom，初始化echarts实例 
    var myChart = echarts.init(document.getElementById('projectCost'));

    // 指定图表的配置项和数据
    var colors = ['#2ec7c9', '#b6a2de'];
    option = {
        color: colors,
        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['实际成本', '预算成本']
        },
        grid: {
            top: 40,
            bottom: 20
        },
        xAxis: {
            type: 'category',
            data: ['3月', '4月', '5月', '6月', '7月', '8月', '9月']
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 万'
                },
            }
        ],
        series: [{
            name: "实际成本",
            data: [4, 4, 5, 20, 4, 25, 2],
            type: 'bar',
            smooth: true
        },
        {
            name: "预算成本",
            data: [2, 3, 4, 18, 3, 18, 2],
            type: 'bar',
            smooth: true
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    // 基于准备好的dom，初始化echarts实例
    var myChart2 = echarts.init(document.getElementById('costPie'));

    // 指定图表的配置项和数据
    option2 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ["#d87a80", "#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980"],
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    { value: 180, name: '人力成本 180' },
                    { value: 50, name: '产品成本 50' },
                    { value: 50, name: '资产使用费 50' },
                    { value: 50, name: '招待费用 50' },
                    { value: 50, name: '其他成本 50' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);

    // 基于准备好的dom，初始化echarts实例
    var myChart3 = echarts.init(document.getElementById('costPie2'));
    option3 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color: ["#ffb980", "#2ec7c9", "#b6a2de", "#5ab1ef"],
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                labelLine: {
                },
                data: [
                    { value: 335, name: '请假人数 2' },
                    { value: 310, name: '实际在职人员 12' },
                    { value: 234, name: '仍需招聘人数 8' },
                    { value: 135, name: '离职人数 1' }
                ]
            }
        ]
    };
    myChart3.setOption(option3);
   
})
