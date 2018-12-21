(function () {
    'use strict';
    var controllerId = "syspages.views.user.personalsetting";
    angular.module('syspages').controller(controllerId, [
        '$scope', 'mabp.app.system', 'dialog', 'appSession', '$translate', '$state', '$http', '$rootScope', '$timeout',
        function ($scope, sysService, dialog, appSession, $translate, $state, $http, $rootScope, $timeout) {
            CheckPermission("Menu_My_Setting");
            var vm = this;
            vm.phone = {};
            vm.email = {};
            vm.phone.step = 0;
            vm.email.step = 0;
            vm.enterprises = [];
            _shared.initialPage(vm);
            vm.t = {}

            vm.load = function () {
                vm.phone.step = 0;
                vm.email.step = 0;
                mabp.ui.setLoading('.login_content',
                sysService.getUserInfo().then(function (data) {
                    vm.user = data;
                    vm.activeLanguage = app.language = data.language;
                }));
                sysService.getAllLanguage().then(function (data) {
                    vm.languages = data;
                });
            }

            //保存密钥
            vm.saveAccessId = function () {
                mabp.ui.setSaving('saveAccessId',
                sysService.updateUser(vm.user).then(function () {
                    mabp.notify.success(L("UpdateSuccessfully"));
                }), L("Saveing"));
            }

            //保存基本信息
            vm.saveUser = function () {
                mabp.ui.setSaving('saveUser',
                sysService.updateUser(vm.user).then(function () {
                    mabp.notify.success(L("UpdateSuccessfully"));
                    $rootScope.currentUserName = _.find(vm.user.langNameList, { name: app.language }).value;
                    appSession.nickName = vm.user.nickName;
                    appSession.telephone = vm.user.telephone;
                }), L("Saveing"));
            }

            vm.switchLang = function (l, index) {
                $http.get('/account/ChangeLanguage?langId={0}'.fill(index)).success(function (result) {
                    if (result == "Success") {
						window.location.reload();
                    }
                }).error(function (result) {
                    console.log(result);
                });
            }

            //修改密码
            vm.changePwd = function () {
                sysService.updatePassword(vm.pwd).then(function () {
                    mabp.notify.success(L("UpdateSuccessfully"));
                    vm.pwd = {};
                });
            }

            vm.cancel = function () {
                vm.phone.step = 0;
                vm.email.step = 0;
            }

            //验证当前账户密码
            vm.checkPwd = function (type, m) {
                dialog.open(app.dialogs.checkPassword, vm.user).then(function (data) {
                    if (data) {
                        if (type == 1) {
                            if (m == 1) {
                                vm.phone.step = 1;
                                mabp.notify.success(L("PleaseClickSendValidationCode"));
                            }
                            if (m == 2) {
                                vm.phone.step = 3;
                                mabp.notify.success(L("PleaseInputNewCellphone"));
                            }
                        }

                        if (type == 2) {
                            if (m == 1) {
                                vm.email.step = 1;
                                mabp.notify.success(L("PleaseClickSendValidationCode"));
                            }
                            if (m == 2) {
                                vm.email.step = 3;
                                mabp.notify.success(L("PleaseInputNewEmail"));
                            }
                        }
                    }
                });
            }

            //发送验证码
            vm.sendCode = function (type, m, step) {
                vm.t.step = step;
                vm.t.type = type;

                if (type == 1) {
                    //发送短信
                    vm.t.phone = m;
                    sysService.sendBingdingPhoneCode(vm.t).then(function () {
                        mabp.notify.success(L("ValidationCodeSendedPleaseCheckCellphone"));
                        vm.phone.step = step;
                    });
                }
                if (type == 2) {
                    //发送邮件
                    vm.t.email = m;
                    sysService.sendBingdingEmailCode(vm.t).then(function () {
                        mabp.notify.success(L("ValidationCodeSendedPleaseCheckEmail"));
                        vm.email.step = step;
                    });
                }
            }

            //点击绑定新，校验验证码
            vm.bingding = function (type, code, step) {
                vm.t.code = code;
                vm.t.type = type;
                sysService.checkValidationCode(vm.t).then(function () {
                    if (type == 1) {
                        vm.phone.step = step;
                        mabp.notify.success(L("PleaseInputNewCellphone"));
                    }
                    else if (type == 2) {
                        vm.email.step = step;
                        mabp.notify.success(L("PleaseInputNewEmail"));
                    }
                });
            }

            //确认绑定新账号
            vm.confirmBingding = function (type, newC, newA) {
                vm.t.code = newC;
                vm.t.type = type;

                if (type == 1) {
                    vm.t.phone = newA;
                }
                if (type == 2) {
                    vm.t.email = newA;
                }

                sysService.confirmBingding(vm.t).then(function (data) {
                    vm.load();
                }, function () {
                    vm.load();
                });
            }

            //解除绑定，校验验证码
            vm.unbingding = function (type, code, m) {
                vm.t.code = code;
                vm.t.type = type;

                if (type == 1) {
                    vm.t.phone = m;
                }
                if (type == 2) {
                    vm.t.email = m;
                }

                sysService.unBingding(vm.t).then(function (data) {
                    if (!data)
                        vm.load();
                    else {
                        mabp.notify.error(data);
                        vm.load();
                    }
                }, function () {
                    vm.load();
                });
            }



            vm.load();


        }
    ]);
})();