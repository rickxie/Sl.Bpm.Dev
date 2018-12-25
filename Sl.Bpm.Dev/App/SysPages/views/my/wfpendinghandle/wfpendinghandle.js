(function () {
    'use strict';
    var controllerId = "syspages.views.my.wfpendinghandle";
    angular.module('app').controller(controllerId, [
        '$scope', '$modal', 'dialog', 'asdialog', 'mabp.app.task', 'workflowModuleTransfer', '$interval', '$timeout', 'treeTool',
        function ($scope, $modal, dialog, asdialog, service, module, $interval, $timeout, treeTool) {
            var vm = this;
            vm.showAll = false;//展示全部流程名，即使待办为0
            vm.rootOpen = false;//默认第一级菜单全部关闭
            vm.selected = "";//当前选中节点Id
            vm.moduleId = "";
            vm.moduleIds = "";//选中流程模块Id,Id
            vm.allThDom = [];
            vm.allGroups = [];
            vm.groupArray = [];
            vm.openeds = [];//全部一级菜单的打开关闭状态
            vm.btnText = L("ShowPendingHandle");
            vm.icon = "icon icon-chevron-sign-right";
            vm.paging = _shared.initialPage(vm, 1, 8, 'refId', false);
            vm.paging.filters = [{ name: 'moduleIds', value: vm.moduleIds }, { name: 'filterText', value: vm.filterText }, { name: 'moduleType', value: '1' }];
            vm.filter = {
                moduleIds: vm.moduleIds,
                filterText: vm.filterText,
                moduleType: '1',
                currentStatus: ''
            }

            //设置排序样式
            function setClass(dm, addedClass) {
                vm.allThDom.removeClass('up');
                vm.allThDom.removeClass('down');
                vm.allThDom.addClass('both');
                dm.removeClass('up');
                dm.removeClass('down');
                dm.removeClass('both');
                dm.addClass(addedClass);
            }

            function setOrderByAscending(dom) {
                if (dom == null) return true;
                if (dom.hasClass('up')) {
                    setClass(dom, 'down');
                    return false;
                } else if (dom.hasClass('down')) {
                    setClass(dom, 'up');
                    return true;
                } else if (dom.hasClass('both')) {
                    setClass(dom, 'up');
                    return true;
                }
                return true;
            }

            vm.bindedDom = false;
            vm.bindSort = function () {
                if (vm.bindedDom) return;
                vm.bindedDom = true;
                vm.allThDom = $('th.order');
                vm.allThDom.on('click', function (event) {
                    var dom = $(this);
                    var propName = dom.attr('name');
                    vm.paging.orderByProperty = propName;
                    vm.paging.ascending = setOrderByAscending(dom);;
                    vm.load();
                });
            }

            vm.showSearch = false;
            vm.show = function () {
                vm.showSearch = !vm.showSearch;
            }

            function getPendingHandleTasksDataTable() {
                return service.getPendingHandleTasksDataTable(vm.paging).then(function (data) {
                    vm.models = data.data;
                    _.forEach(vm.models, function (data) {
                        $scope.getTaskStatus(data);
                    });
                    vm.paging.totalCount = data.totalCount;
                    $timeout(function () {
                        vm.bindSort();
                        //$(".jstree-anchor").each(function () { $(this).attr("title", $(this).text()) });
                    }, 100);
                });
            }
            //五秒一刷
            //var refreshPending = $interval(function () {
            //    vm.load();
            //}, 500000);
            //$scope.$on('$destroy', function () {
            //    $interval.cancel(refreshPending);
            //});

            vm.setSelected = function (id) {
                vm.selected = id;
                _.forEach(vm.groupArray, function (v) {
                    v.state.selected = (v.id == vm.selected);
                    _.forEach(v.children,
                        function (c) {
                            c.state.selected = (c.id == vm.selected);
                        });
                });
            }

            vm.selectGroup = function (i) {
                //初始化过滤条件
                vm.filter = {
                    moduleIds: vm.moduleIds,
                    filterText: vm.filterText,
                    moduleType: '1',
                    currentStatus: ''
                }
                var et = _.find(vm.groupArray, { id: i.id });
                if (i == "All") {
                    et = vm.groupArray;
                }
                if (!!et) {
                    vm.moduleIds = "";
                    if (i == "All") {
                        vm.filter.moduleIds = "";
                    } else {
                        var ext = _.join(_.map(et.children, "id"), ",");
                        vm.filter.moduleIds = ext;
                    }
                } else {
                    vm.moduleIds = i.id;
                    vm.filter.moduleIds = i.id;
                }

                vm.paging.currentPage = 1;
                vm.setSelected(i.id);
                vm.loadColumnConfig();
            }

            vm.showGroup = function (g) {
                //只要用户切换过状态就关闭默认设置
                if (!vm.rootOpen) {
                    vm.rootOpen = true;
                    g.state.opened = true;
                    _.forEach(vm.groupArray, function (v) {
                        v.state.opened = (v.id == g.id);
                    });
                } else {
                    g.state.opened = !g.state.opened;
                }
                var ext = _.find(vm.openeds, { id: g.id });
                if (!!ext) {
                    ext.state = g.state.opened;
                } else {
                    vm.openeds.push({ id: g.id, state: g.state.opened });
                }
            }

            vm.toggle = function () {
                vm.showAll = !vm.showAll;
                vm.btnText = vm.showAll ? L("ShowPendingHandle") : L("ShowAllPendingHandle");
            }

            vm.load = function (isRefresh) {
                vm.paging.filters = mabp.toArray(vm.filter);//vm.paging.filters.concat(mabp.toArray(vm.filter));
                if (isRefresh) {
                    mabp.ui.setLoading(".panel-body", getPendingHandleTasksDataTable());
                    //mabp.ui.setLoading('.pendinghandle_tree', vm.selectModule());
                    vm.selectModule();
                }
                else {
                    getPendingHandleTasksDataTable();
                    vm.selectModule();
                }
            }

            vm.loadColumnConfig = function () {
                service.getColumnConfigs(vm.moduleIds).then(function (data) {
                    vm.columnLists = _.filter(data[0].colimnConfigs, function (data) {
                        return data.value = data.value.lowerFirst();
                    });
                });
                vm.paging.currentPage = 1;
                vm.load();
            }

            vm.selectModule = function () {
                service.moduleCountGroup().then(function (result) {
                    vm.totalCount = _.sumBy(result, 'count');
                    vm.groupArray = result;
                    _.forEach(vm.groupArray, function (v) {
                        var ext = _.find(vm.openeds, { id: v.id });
                        if (!!ext) {
                            v.state.opened = ext.state;
                        } else {
                            vm.openeds.push({ id: v.id, state: (v.state.opened && vm.rootOpen)});
                        }
                        v.state.selected = (v.id == vm.selected);
                        _.forEach(v.children,
                            function (c) {
                                c.state.selected = (c.id == vm.selected);
                            });
                    });
                    //vm.allGroups = treeTool.toFormatTreeJson(_.filter(val, { isRoot: true }), vm.selectedGroupId);
                });
            }

            vm.edit = function (wf) {
                wf.reloadTasks = vm.selectS;
                module.approve(wf.appPageId, wf.wfdWorkflowNodeId, wf).then(function (result) {
                    if (result)
                        vm.selectS();
                });
            }

            vm.submit = function (wf) {
                mabp.notify.info("同意方法未完成");
            }

            vm.reject = function (wf) {
                mabp.notify.info("拒绝方法未完成");
            }

            vm.mark = function (m) {
                m.isMarked = m.isMarked === null ? true : false;
                service.markTask(m).then(function () {
                    if (m.isMarked) {
                        mabp.notify.success("标记成功");
                    } else {
                        mabp.notify.success("取消标记成功");
                    }
                    vm.load();
                }, function () {
                    vm.load();
                });
            }

            vm.waiting = function (m) {
                m.isWaiting = m.isWaiting === 1 ? 0 : 1;
                service.event_Waiting(m).then(function () {
                    if (m.isWaiting == 1) {
                        mabp.notify.success("挂起成功，请到我挂起的流程中查看！");
                    } else {
                        mabp.notify.success("启动成功，请到待办流程中处理！");
                    }
                    getPendingHandleTasksDataTable();
                }, function () {
                    getPendingHandleTasksDataTable();
                });
            }

            vm.selectS = function () {
                vm.paging.currentPage = 1;
                vm.load();
            }

            vm.clearS = function () {
                vm.selectGroup({ id: vm.selected });
            }

            vm.exportExcel = function () {
                vm.pagingExport = {};
                //vm.pagingExport.filters = [{ name: 'moduleIds', value: vm.moduleIds }, { name: 'moduleType', value: '1' }];
                vm.pagingExport.filters = mabp.toArray(vm.filter);//vm.pagingExport.filters.concat(mabp.toArray(vm.filter));
                vm.pagingExport.pageSize = 2147483647;
                vm.pagingExport.currentPage = 1;
                vm.pagingExport.orderByProperty = "refId";
                vm.pagingExport.ascending = false;
                jQuery.download('/File/DownloadWorkflow', vm.pagingExport);
            }

            //获得当前状态
            $scope.getTaskStatus = function (item) {
                if (item.taskStatus == 1) {
                    item.taskTitle = L('TaskFinishStatus');
                }
                if (item.taskStatus == 7) {
                    item.taskTitle = L('TaskRejectStatus');
                }
                if (item.taskStatus == 9) {
                    item.taskTitle = L('TaskCanceled');
                }
                if (item.taskStatus == 0) {
                    item.taskTitle = item.procUserName;
                }
            }

            vm.load(true);

        }
    ]);
})();