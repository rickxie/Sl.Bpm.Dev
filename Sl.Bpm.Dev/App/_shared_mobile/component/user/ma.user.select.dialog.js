(function () {
    var controllerId = _shared.dialogs.define('maUserSelectDialog', '/App/_shared/component/user/ma.user.select.dialog.html');
    angular.module('app.shared').controller(controllerId, ['mabp.app.bpm', 'params', '$scope', 'mabp.app.user', '$http',
        function (service, params, $scope, userService, $http) {
            var vm = this;
            vm.selectedGroupId = "";
            vm.users = [];
            //查询文本
            vm.selectTxt = "";
            vm.selectData = params.initSelectData || [];

            vm.paging = _shared.initialPage(vm, 1, 8);
            vm.load = function () {
                vm.paging.filters = [{ name: 'filterText', value: vm.selectTxt }];
                service.getAllEnterpriseUser(vm.paging).then(function (data) {
                    vm.users = data.model;
                    vm.paging.totalCount = data.totalCount;

                    //if (!!vm.initSelectData) {
                    //    for (var i = 0; i < vm.users.length; i++) {
                    //        for (var o = 0; o < vm.initSelectData.length; o++) {
                    //            if (vm.initSelectData[o].id  == vm.users[i].id) {
                    //                vm.selectData.push(vm.users[i]);
                    //                break;
                    //            }
                    //        }
                    //    }
                    //    vm.initSelectData = null;
                    //}
                });
            }

            vm.selectUser = function () {
                var arr = [];
                for (var i = 0; i < vm.users.length; i++) {
                    if (vm.selectTxt == "") {
                        arr.push(vm.users[i]);
                    } else {
                        if (vm.users[i].name.indexOf(vm.selectTxt) >= 0) arr.push(vm.users[i]);
                    }
                }
                return arr;
            }

            vm.isCheck = function (user) {
                if (!!vm.selectData && vm.selectData.length > 0) {
                    for (var o = 0; o < vm.selectData.length; o++) {
                        if (vm.selectData[o].id == user.id) {
                            return true;
                        }
                    }
                }
                return false;
            }

            vm.checkUser = function (event, data) {
                if (!!params.ismulti) {
                    if (!!vm.selectData && vm.selectData.length > 0) {
                        for (var o = 0; o < vm.selectData.length; o++) {
                            if (data.id == vm.selectData[o].id) {
                                vm.selectData.splice(o, 1);
                                return;
                            }
                        }
                    }
                    vm.selectData.push(data);
                } else {
                    vm.selectData = [data];
                }
                //vm.selectData.userName = data.name;
                if (!!event) event.stopPropagation();
            }

            vm.removeUser = function (data) {
                if (!!vm.selectData && vm.selectData.length > 0) {
                    for (var o = 0; o < vm.selectData.length; o++) {
                        if (data.id == vm.selectData[o].id) {
                            vm.selectData.splice(o, 1);
                            return;
                        }
                    }
                }
            }

            //点击回车搜索
            vm.event_Keydown = function (event) {
                if (event.keyCode == 13) {
                    vm.load();
                }
            }

            vm.checkAll = function () {

            }

            //保存并返回
            vm.save = function () {
                $scope.$close(vm.selectData);
            };

            vm.cancel = function () {
                $scope.$close(false);
            }

            vm.load();
        }
    ]);
})();