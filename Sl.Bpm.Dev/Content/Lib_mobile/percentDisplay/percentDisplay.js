_shared
    .directive('percentDisplay', function () {
        return {
            restrict: 'E',
            template: '<div class="ngpercentdisplay" data-percent="{{ percent }}">' +
            '<div class="ngperdispleft">' +
            '<span></span>' +
            '</div>' +
            '<div class="ngperdispright">' +
            '<span></span>' +
            '</div>' +
            '</div>',
            scope: { percent: '=' },
            link: function ($scope, element, attrs) {
                //需要注意属性名字书写方式，均是小写(即使在html中使用camelCase)
                var bgColor = attrs.bgcolor;
                var progressColor = attrs.progresscolor;
                var numberColor = attrs.numbercolor;
                var numberBgColor = attrs.numberbgColor;//文字背后的颜色
                console.log(bgColor, numberColor, progressColor, numberBgColor);
                var jEle = $(element);
                var leftSide = jEle.find(".ngperdispleft span"),
                    rightSide = jEle.find(".ngperdispright span"),
                    side = attrs.side || 50,
                    fontSize = Math.floor(side / 5);
                var deg, strdeg;
                var colors = [
                    bgColor,
                    numberColor,
                    progressColor,
                    numberBgColor
                ];
                var style = attrs.style;
                console.log(style.split(";"))
               var kvs = _.map(_.filter(style.split(";"), function (val) { return val && val.length > 0 }), function (s) {
                   var kv = s.split(":");
                   
                   return { [kv[0]]:kv[1]}
               })
               var temStyle = {};
               _.map(kvs, function (kv) {
                   return _.extend(temStyle,kv)
               })
               console.log("temStyle：",temStyle);
                
                if (!colors[0]) { colors[0] = '#DADADA'; }
                if (!colors[1]) { colors[1] = '#606060'; }
                if (!colors[2]) { colors[2] = '#3464b6'; }
                if (!colors[3]) { colors[3] = '#FFFFFF'; }
                console.log(_.extend({},{ 'width': side, 'height': side, 'font-size': fontSize, 'background-color': colors[0], 'color': colors[1] }, temStyle))
                jEle.find('.ngpercentdisplay').css(_.extend({ 'width': side, 'height': side, 'font-size': fontSize, 'background-color': colors[0], 'color': colors[1] },temStyle));
                jEle.find('.ngpercentdisplay span').css({ 'background-color': colors[2] });
                jEle.find('.ngpercentdisplay:before').css({ 'background-color': colors[3] });

                $scope.$watch('percent', function (newvalue, oldvalue) {

                    if (newvalue > -1 && newvalue < 101) {
                        if (newvalue <= 50) {
                            // Hide left
                            leftSide.hide();

                            // Adjust right
                            deg = 180 - (newvalue / 100 * 360);
                            strdeg = "rotateZ(-" + deg + "deg)";
                            rightSide.css({ "transform": strdeg, "-webkit-transform": strdeg, "-moz-transform": strdeg, "msTransform": "rotate(-" + deg + "deg)" });
                        } else {
                            // Adjust left
                            leftSide.show();
                            deg = 180 - ((newvalue - 50) / 100 * 360);
                            strdeg = "rotateZ(-" + deg + "deg)";
                            leftSide.css({ "transform": strdeg, "-webkit-transform": strdeg, "-moz-transform": strdeg, "msTransform": "rotate(-" + deg + "deg)" });
                            rightSide.css({ "transform": "rotateZ(0deg)", "-webkit-transform": "rotateZ(0deg)", "-moz-transform": "rotateZ(0deg)", "msTransform": "rotate(0deg)" });
                        }
                    }
                });
            }
        }
    })