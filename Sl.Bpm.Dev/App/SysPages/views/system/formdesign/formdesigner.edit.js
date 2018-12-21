(function () {
    var controllerId = app.dialogs.define('formdesignerEdit', '/App/SysPages/views/system/formdesign/formdesigner.edit.html');
    app.controller(controllerId, ['$scope', 'params', 'mabp.app.bpm', '$stateParams',
        function ($scope, params, service, $stateParams) {
            var vm = this;
            vm.model = params || {};
            vm.controls = [{ id: 'text', text: '文本' }, { id: 'number', text: '数字' }];

        }
    ]);
})();