(function() {
    var app = angular.module('mabp.orgChart') || angular.module('mabp.orgChart', []);
    app.directive('dragDropIcon', function () {
        return {
            template: '<div ng-transclude href="javascript:;"></div>',
            restrict: "E",
            transclude: true,
            replace: true,
            scope: {
                onDrop: "&",
                onDrag: "&"
            },
            link: function (scope, element, attr) {
                element[0].ondragover = function (ev) {
                    ev.preventDefault();
                }
                element[0].ondragstart = function (ev) {
                    ev.dataTransfer.setData('text', attr.transfer);
                }
                element[0].ondrop = function (ev) {
                    var deleteJob = scope.onDrop();
                    if (deleteJob == null) {
                        return;
                    }
                    var parsedObj = JSON.parse(ev.dataTransfer.getData('text'));
                    var sourceId = parsedObj.id.replace("org_", "");

                    deleteJob(sourceId);

                    scope.$apply();
                    ev.preventDefault();
                }
            }
        }

    })
})();
