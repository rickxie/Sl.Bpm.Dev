(function () {
    'use strict';
    var controllerId = "syspages.views.system.chart.wfoverview";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'mabp.app.chart',
        function ($scope, service) {
            var vm = this;


            service.getChartWfData().then(function (result) {
                vm.data = result;
                //var chart = AmCharts.makeChart("chartdiv_a", {
                //    "type": "pie",
                //    "theme": "none",
                //    "colors": ['#5e9fdb', '#f07522', '#ababab'], //#ffc741
                //    "legend": {
                //        "autoMargins": false,
                //        "borderAlpha": 0.2,
                //        "equalWidths": false,
                //        "horizontalGap": 10,
                //        "markerSize": 13,
                //        "valueAlign": "center",
                //        "valueWidth": 10
                //    },
                //    "dataProvider": [{
                //        "country": "审批中",
                //        "value": vm.data.raise
                //    }, {
                //        "country": "审批完成",
                //        "value": vm.data.compeleted
                //    }, {
                //        "country": "被拒绝",
                //        "value": vm.data.reject
                //    }],
                //    "valueField": "value",
                //    "titleField": "country",
                //    "outlineAlpha": 0.4,
                //    "depth3D": 15,
                //    "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                //    "angle": 30,
                //    "export": {
                //        "enabled": true
                //    }
                //});
            });

            //service.getChartNowSysData().then(function (result) {
            //    vm.data = result[0];
            //    var chart = AmCharts.makeChart("chartdiv_b", {
            //        "type": "pie",
            //        "theme": "none",
            //        "colors": ['#5e9fdb', '#f07522', '#ababab', '#ffc741'],
            //        "legend": {
            //            "autoMargins": false,
            //            "borderAlpha": 0.2,
            //            "equalWidths": false,
            //            "horizontalGap": 10,
            //            "markerSize": 13,
            //            "valueAlign": "center",
            //            "valueWidth": 10
            //        },
            //        "dataProvider": [{
            //            "country": "发起",
            //            "value": vm.data.raise
            //        }, {
            //            "country": "审批结束",
            //            "value": vm.data.compeleted
            //        }, {
            //            "country": "取消",
            //            "value": vm.data.cancel
            //        }, {
            //            "country": "拒绝",
            //            "value": vm.data.reject
            //        }],
            //        "valueField": "value",
            //        "titleField": "country",
            //        "outlineAlpha": 0.4,
            //        "depth3D": 15,
            //        "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            //        "angle": 30,
            //        "export": {
            //            "enabled": true
            //        }
            //    });
            //});

        }
    ]);
})();
