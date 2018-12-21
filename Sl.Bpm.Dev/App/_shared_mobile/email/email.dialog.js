(function () {
    var controllerId = _shared.dialogs.define('emailDialog', '/App/_shared_mobile/email/email.dialog.html');
    _shared.controller(controllerId, [
         'params', '$scope', 'mabp.app.email',
        function (params, $scope, service) {
            var vm = this;
            vm.model = {};
            vm.model.sendTos = [];

            vm.model.ccTos = [];
            vm.model.bccTos = [];

            //vm.model = params.sendTo || {};
            vm.model.mailToAll = params.sendTo.mailToAll;
            vm.model.toAll = "To All";
            //debugger;
            if (!params.sendTo.mailToAll) {
                if (params.sendTo.procOwnerId != params.sendTo.procUserId) {
                    vm.model.emailTo = params.sendTo.procUserName + "<" + params.sendTo.procUserEmailAddress + ">" + ";" + params.sendTo.procOwnerName + "<" + params.sendTo.procOwnerEmailAddress + ">";
                    vm.model.toEmail = "<" + params.sendTo.procUserEmailAddress + ">" + ";" + "<" + params.sendTo.procOwnerEmailAddress + ">";
                    vm.model.sendTos.push(params.sendTo.procUserEmailAddress);
                    vm.model.sendTos.push(params.sendTo.procOwnerEmailAddress);
                } else {
                    vm.model.emailTo = params.sendTo.procUserName + "<" + params.sendTo.procUserEmailAddress + ">";
                    vm.model.toEmail = params.sendTo.procUserEmailAddress;
                    vm.model.sendTos.push(params.sendTo.procUserEmailAddress);
                }
            } else {
                vm.model.sendTos = params.sendTo.sendTos;
            }


            vm.model.ccTos.push(params.currentUserInfo.emailAddress);
            vm.model.fileName = params.sendTo.workflowName + "-" + params.sendTo.sn;
            vm.model.sn = params.sendTo.sn;
            vm.model.taskId = params.sendTo.taskId;

            vm.model.formEmailAddress = params.currentUserInfo.emailAddress;
            vm.model.formUserName = params.currentUserInfo.userName;

            vm.save = function () {
                service.mailTo(vm.model).then(function () {
                    $scope.$close(vm.model);
                });
            }

            vm.cancel = function () {
                $scope.$close(false);
            }
        }
    ]);
})();