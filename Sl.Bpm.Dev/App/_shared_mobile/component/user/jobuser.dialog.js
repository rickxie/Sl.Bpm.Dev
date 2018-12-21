(function () {
    var controllerId = _shared.dialogs.define('jobUserDialog', '/App/_shared_mobile/component/user/jobuser.dialog.html');
    angular.module('app.shared').controller(controllerId, ['mabp.app.bpm', 'params', '$scope', 'mabp.app.user',
        function (service, params, $scope, userService) {
            var vm = this;
            vm.selectedGroupId = "";
            vm.jobs = [];
            vm.users = [];
            vm.pageSize = 10;
            vm.currentPage = 0;
            //查询文本
            vm.selectTxt = "";
            vm.selectData = [{
                id: "",
                text: "",
                userId: "",
                userName: "",
                jobId: "",
                jobName: "",
                groupName: ""
            }];
            vm.allEnterpriseUser = [];
            vm.selectDatas = [];

            var _arr = [];
            //for (var i = 0; i < params.data.length; i++) {
            //    vm.selectDatas.push({ id: params.data[i].id, text: params.data[i].text });
            //    _arr.push(params.data[i].id);
            //}
            vm.jobUserIds = _arr.join(",");

            vm.ismulti = params.ismulti || false;

            vm.selectJob = function () {
                var arr = [];
                for (var i = 0; i < vm.jobs.length; i++) {
                    if (vm.selectTxt == "") {
                        arr.push(vm.jobs[i]);
                    } else {
                        if (vm.jobs[i].jobName.indexOf(vm.selectTxt) >= 0) arr.push(vm.jobs[i]);
                    }
                }
                return arr;
            }

            vm.selectUser = function () {
                var arr = [];
                if (vm.selectTxt == "") {
                    arr = vm.users;
                } else {
                    for (var i = 0; i < vm.allUsers.length; i++) {
                        if (vm.allUsers[i].jobName.indexOf(vm.selectTxt) >= 0 || vm.allUsers[i].jobUsers.indexOf(vm.selectTxt) >= 0)
                            arr.push(vm.allUsers[i]);
                    }
                }
                
                return arr;
            }

            vm.event_Keydown = function (event) {
                if (event.keyCode == 13) {
                    vm.selectUser();
                }
            }

            vm.searchData = function () {
                vm.selectUser();
            }

            //判断是否已选择
            vm.isCheck = function (item) {
                return !!item ? ((vm.jobUserIds || "").split(",").indexOf(item["id"]) >= 0) : false;
            }

            //单选情况下保存并返回
            vm.trCheck = function (data) {
                vm.checkUser(data);
                if (!vm.ismulti) {//单选
                    vm.jobUserIds = data.id;
                    console.log("选择的用户", data, "组织结构", vm.groupArray);
                    vm.selectDatas = [data];
                    console.log(vm.selectData);
                } else {
                    var arr = (vm.jobUserIds ? vm.jobUserIds.split(",") : []);
                    if (vm.isCheck(data)) {
                        for (var i = 0; i < vm.selectDatas.length; i++) {
                            if (vm.selectDatas[i].id == vm.selectData[0].jobUserId) {
                                vm.selectDatas.splice(i, 1);
                                break;
                            }
                        }
                        arr.splice(arr.indexOf(vm.selectData[0].jobUserId), 1);

                    } else {
                        arr.push(data.id);
                        vm.selectDatas.push({
                            id: data.id,
                            text: data.groupName + '>' + data.jobName + '>' + data.jobUsers + '',
                            groupName: data.groupName,
                            userId: data.id,
                            jobName: data.jobName,
                            userName: data.jobUsers,
                            jobUserId: data.id
                        });
                    }
                    vm.jobUserIds = arr.join(",");
                }
            };

            vm.search = function (pageNumber) {//如果点击了search，则应该从第一页开始显示数据
                //vm.currentPage = pageNumber || vm.currentPage;
                if (vm.allUsers && vm.allUsers.length == 0) {
                    vm.allEnterpriseUser = [];
                    return;
                }
                vm.allEnterpriseUser = vm.loadMoreUser(_.filter(vm.allUsers, function (user) {
                    if (_.isEmpty(vm.selectTxt)) {
                        return true;
                    }
                    return user.jobUsers && user.jobUsers.indexOf(vm.selectTxt) != -1;
                }), pageNumber || 0);
                
                console.log(vm.allEnterpriseUser);
            }
            vm.loadMoreUser = function (items, pageNumber) {
                pageNumber = pageNumber || 0;
                items = items || vm.allUsers;
                return _.slice(items, pageNumber * vm.pageSize, (pageNumber + 1) * vm.pageSize);
            };
            vm.next = function () {
                if (vm.allEnterpriseUser.length < vm.pageSize) {//已经过滤到了最后一页
                    return;
                }
                vm.currentPage++;
                vm.search(vm.currentPage);
            }
            vm.previous = function () {
                vm.currentPage--;
                if (vm.currentPage <= 0) {
                    vm.currentPage = 0;
                }
                vm.search(vm.currentPage);
                
            }
            vm.checkUser = function (data) {
                vm.selectData = [
                    {
                        id: data.id,
                        text:data.groupName + '>' + data.jobName + '>' + data.jobUsers + '',
                        groupName: data.groupName,
                        userId: data.userId,
                        jobName: data.jobName,
                        userName: data.jobUsers,
                        jobUserId: data.id,
                        jobId: data.jobId
                    }
                ];
            }

            //保存并返回
            vm.save = function () {
                if (!vm.selectData[0].userId) {
                    mabp.notify.info("请选择人员");
                    return false;
                }
                if (!vm.ismulti) {
                    $scope.$close(vm.selectData);
                } else
                    $scope.$close(vm.selectDatas);
            };

            vm.cancel = function () {
                $scope.$close(false);
            }
            vm.totalUserNumber = 0;
            vm.pageInfo={
                    Ascending: false,
                    currentPage: 1,
                    filters: [{ name: "filterText", value: vm.selectTxt||"" }],
                    orderByProperty: "Id",
                    pageSize: 10,
                     //totalPage: 1
                };
            
            //组织树节点数据
            service.getGroupTree().then(function (data) {
                vm.groupArray = data;
                console.log("service.getGroupTree()", data);
                return data[0].id;
            })
                .then(function (gId) {
                   
                    return service.getAllJobToUser({ GroupId: gId, EnterpriseId: params.enterpriseId })
                })
                .then(function (data) {
                    console.log("service.getAllJobToUser", data);
                    vm.allUsers = data;
                    vm.search(0);
                })

            $scope.$watch("vm.selectedGroupId", function (newvalue, oldvalue) {
                if (!!newvalue) {
                    service.getJobToUser({ GroupId: vm.selectedGroupId, EnterpriseId: params.enterpriseId }).then(function (data) {
                        console.log("service.getJobToUser",data);
                        vm.users = data;
                    });
                    service.getAllJobToUser({ GroupId: vm.selectedGroupId, EnterpriseId: params.enterpriseId }).then(function (data) {
                        console.log("service.getAllJobToUser", data);
                        vm.allUsers = data;
                        vm.search(0);
                    });
                }
            });
        }
    ]);
})();