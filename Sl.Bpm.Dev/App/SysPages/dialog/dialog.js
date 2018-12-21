(function () {
    var controllerId = 'syspages.dialog';
    app.dialogs['dialog'] = {
        templateUrl: '/syspages/dialog/dialog.html',
        controller: controllerId,
        size: 'sm'
    }
    app.controller(controllerId, [ '$scope','params',
        function ($scope, params) {
            //$scope.title = 'Some Title';
            //$scope.content = 'Hello Modal This is a multiline message from a controller!';
            var vm = this;
            vm.data = params;
//            vm.model = $scope.selectedModel || {};
     
            vm.cancel = function () {
                $scope.$hide('hello world');
                //$modalInstance.close({ returnValue : "this is return object"});
            };

            vm.save = function () {
                mabp.message.confirm("you will save this data", " are you sure?", function(yes) {
                    yes && $scope.$hide('hello world');
                });
               
            };
        }
    ]);
})();