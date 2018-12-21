app.directive('cmd', [
    '$rootScope', '$compile', function (rootScope, $compile) {
        return {
            restrict: "E",
            replace: true,
            //transclude: true,
            template: '',
            link: function (scope, element, attr) {
                var innerHtml = element.html();
                var dom = $compile(innerHtml)(scope);
                angular.element('#cmd').html(dom);
                angular.element('#search').html(dom);
                element.html('');
            }
        }
    }
]);
app.directive('search', [
    '$rootScope', '$compile', function (rootScope, $compile) {
        return {
            restrict: "E",
            replace: true,
            //transclude: true,
            template: '',
            link: function (scope, element, attr) {
                var innerHtml = element.html();
                var dom = $compile(innerHtml)(scope);
                angular.element('#h_search').html(dom);
                element.html('');
            }
        }
    }
]);


