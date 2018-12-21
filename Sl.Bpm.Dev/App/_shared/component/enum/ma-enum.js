
_shared.directive("maEnum", ['mabp.app.system', '$stateParams', 'dialog', function (service, stateParams, dialog) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="input-group"> ' +
            '<input type="text" class="form-control" disabled placeholder="{{placeholder}}" aria-describedby="basic-addon2" ng-model="display"> ' +
            '<span class="input-group-addon btn" id="basic-addon2" ng-click="open()">选择</span> </div>',
        scope: {
            ngModel: '='
        },
        link: function (scope, element, attr) {
            scope.placeholder = attr.placeholder;
            var enumName = attr.enum;

            scope.$watch('ngModel', function (newValue, oldValue) {
                if (newValue == null) {
                    return;
                }
                var para = {
                    filters: [
                        { name: 'EnterpriseId', value: stateParams.enterpriseId },
                        { name: 'Enum', value: enumName }, { name: 'Value', value: newValue }
                    ]
                };

                service.getEnumName(para).then(function (result) {
                    scope.display = result.data;
                });
            });
            scope.open = function () {
                dialog.open(_shared.dialogs.enum, { 'enum': enumName }).then(function (result) {
                    if (result != null) {
                        scope.ngModel = result.value;
                        scope.display = result.name;
                    }
                });
            }
        }
    }
}]);
