(function () {
    'use strict';
    var controllerId = "syspages.views.user.agent";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'mabp.app.bpm', 'asdialog', '$state', 'appSession', function ($scope, service, asdialog, $state, session) {
            CheckPermission("Menu_My_Outing");
            var vm = this;
            //vm.models = [];
            vm.approvers = [];
            vm.submitters = [];
            _shared.initialPage(vm);
            vm.load = function () {
                service.getUserAgent(vm.paging).then(function (result) {
                    //vm.models = result.model;
                    vm.approvers = _.filter(result.model, { isSubmitterOrApprover: false });
                    vm.submitters = _.filter(result.model, { isSubmitterOrApprover: true });
                    vm.isLoaded = true;
                    vm.paging.totalCount = result.totalCount;
                });
            }
            vm.edit = function (m) {
                var n = {};
                if (m === 1) {
                    n.isSubmitterOrApprover = true;
                } else if(m === 2){
                    n.isSubmitterOrApprover = false;
                } else {
                    n = m;
                }

                asdialog.open(app.dialogs["agentEdit"], n).then(function (data) {
                    if (data)
                        vm.load();
                });
            }
          
            vm.load();
        }
    ]);
})();