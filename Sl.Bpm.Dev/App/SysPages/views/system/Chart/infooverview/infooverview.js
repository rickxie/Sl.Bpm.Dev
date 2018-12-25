(function () {
    'use strict';
    var controllerId = "syspages.views.system.chart.infooverview";
    angular.module('app').controller(controllerId, [
        '$scope', 'mabp.app.chart',
        function ($scope, service) {
            var vm = this;
            var allData;
            vm.paging = _shared.initialPage(vm, 1, 10, 'Id', false);
            vm.filter = {
                searchStartTime: moment(new Date()).days(0 - 90).format('YYYY-MM-DD') + " 00:00:00",
                searchEndTime: moment(new Date()).days(30).format("YYYY-MM-DD") + " 23:59:59"
            }

            service.getChartSysData().then(function (result) {
                vm.data = result[0];
                buildChart(vm.data, "chartdiv_a", "今日视图", "今日视图", "今日视图");
            });

            service.getChartSysData();

            vm.select = function () {
                vm.paging.filters = mabp.toArray(vm.filter);
                service.getChartNowSysData(vm.paging).then(function (result) {
                    vm.data = result[0];
                    buildChart(vm.data, "chartdiv_b", "自定义视图", "自定义视图", "自定义视图");
                });
            }

            vm.select();

            function buildChart(sourceData, divId, title, subtext, chartName) {
                require(
                    [
                        'Content/Lib/ECharts/echarts.min'
                    ], function (ec) {
                        var myChart = ec.init(document.getElementById(divId));
                        var option = {
                            title: {
                                text: title,
                                subtext: subtext,
                                x: 'center'
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['拒绝', '完成', '审批中']
                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    mark: { show: true },
                                    dataView: { show: true, readOnly: false },
                                    restore: { show: true },
                                    saveAsImage: { show: true }
                                }
                            },
                            calculable: true,
                            series: [
                                {
                                    name: chartName,
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '60%'],
                                    data: [
                                        { value: sourceData.reject, name: '拒绝' },
                                        { value: sourceData.compeleted, name: '完成' },
                                        { value: sourceData.raise, name: '审批中' }
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
                        myChart.setOption(option);
                    });
            }


        }
    ]);
})();
