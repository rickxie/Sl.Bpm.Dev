(function () {
    var controllerId = _shared.dialogs.define('dataSelect', '/App/_shared/component/data/data.select.html');
    angular.module('app.shared').controller(controllerId, ['params', '$scope', 'dialog',
        function (params, $scope, dialog) {
            var vm = this;
            vm.params = params;
            vm.model = {};

            vm.pageSizeList = [10, 20, 50, 100];

            vm.data = params.data;
            vm.ismulti = params.ismulti != "false" && params.ismulti ? true : false;
            vm.table = [];
            vm.column = [];
            vm.columnText = [];
            vm.row = [];
            /*分页*/
            vm.showPages = [];
            vm.currentPageIndex = 0;
            vm.currentPageData = [];
            vm.pageNum = 0;
            vm.pageSize = 10;

            if (params.data) {
                var cols = eval("(" + params.column + ")");
                for (var col in cols) {
                    vm.column.push(col);
                    vm.columnText.push(cols[col]);
                }
            } else {
                for (var item in vm.data[0]) {
                    vm.column.push(item);
                    vm.columnText.push(item);
                }
            }
            /*给table填充数据*/
            for (var i = 0; i < vm.data.length; i++) {
                var obj = {};
                for (var o = 0; o < vm.column.length; o++) {
                    obj[vm.column[o]] = vm.data[i][vm.column[o]];
                }
                if (!vm.data[i].id) {
                    obj.id = i + 1;
                    vm.data[i].id = i + 1;
                } else {
                    obj.id = vm.data[i].id;
                }
                obj.isCheck = vm.data[i].isCheck;
                vm.table.push(obj);
            }

            vm.save = function () {
                var selectIds = [];
                for (var i = 0; i < vm.table.length; i++) {
                    if (vm.table[i].isCheck) {
                        selectIds.push(vm.table[i].id);
                    }
                }
                for (var i = 0; i < vm.data.length; i++) {
                    if (selectIds.indexOf(vm.data[i].id) == -1) {
                        vm.data[i].isCheck = false;
                    } else {
                        vm.data[i].isCheck = true;
                    }
                    vm.data[i].isInit = true;
                }
                $scope.$close(vm.data);
            };

            vm.cancel = function () {
                $scope.$close(null);
            };

            vm.trCheck = function (item) {
                if (vm.ismulti) {
                    item.isCheck = !item.isCheck;
                } else {
                    for (var i = 0; i < vm.table.length; i++) {
                        if (vm.table[i].isCheck) {
                            vm.table[i].isCheck = false;
                            break;
                        }
                    }
                    item.isCheck = true;
                }
            }

            $scope.$watch("vm.table", function (oldvalue, newvalue) {
                vm.pageNum = parseInt(vm.table.length / vm.pageSize);
                if (vm.table.length % vm.pageSize != 0 && vm.table.length > vm.pageSize || vm.pageNum == 0) vm.pageNum++;
            });

            $scope.$watch("vm.pageNum", function (oldvalue, newvalue) {
                vm.showPages = [];
                for (var i = 0; i <= vm.pageNum - 1; i++) {
                    if (i >= vm.currentPageIndex - 2 && i <= vm.currentPageIndex + 2) {
                        vm.showPages.push({
                            index: i
                        });
                    }
                }
                var _datas = [];
                var _dataStartNum = vm.currentPageIndex * vm.pageSize;
                var _dataEndNum = vm.currentPageIndex * vm.pageSize + vm.pageSize;
                if (_dataEndNum > vm.table.length) _dataEndNum = vm.table.length;
                for (var i = _dataStartNum; i < _dataEndNum; i++) {
                    _datas.push(vm.table[i]);
                }
                vm.currentPageData = _datas;
                vm.currentPageIndex = 0;
            });

            $scope.$watch("vm.pageSize", function (oldvalue, newvalue) {
                vm.pageNum = parseInt(vm.table.length / vm.pageSize);
                if (vm.table.length % vm.pageSize != 0 && vm.table.length > vm.pageSize || vm.pageNum == 0) vm.pageNum++;

                vm.showPages = [];
                for (var i = 0; i <= vm.pageNum - 1; i++) {
                    if (i >= vm.currentPageIndex - 2 && i <= vm.currentPageIndex + 2) {
                        vm.showPages.push({
                            index: i
                        });
                    }
                }
                var _datas = [];
                var _dataStartNum = vm.currentPageIndex * vm.pageSize;
                var _dataEndNum = vm.currentPageIndex * vm.pageSize + vm.pageSize;
                if (_dataEndNum > vm.table.length) _dataEndNum = vm.table.length;
                for (var i = _dataStartNum; i < _dataEndNum; i++) {
                    _datas.push(vm.table[i]);
                }
                vm.currentPageData = _datas;
            });

            $scope.$watch("vm.currentPageIndex", function (oldvalue, newvalue) {
                vm.showPages = [];
                for (var i = 0; i <= vm.pageNum - 1; i++) {
                    if (i >= vm.currentPageIndex - 2 && i <= vm.currentPageIndex + 2) {
                        vm.showPages.push({
                            index: i
                        });
                    }
                }
                var _datas = [];
                var _dataStartNum = vm.currentPageIndex * vm.pageSize;
                var _dataEndNum = vm.currentPageIndex * vm.pageSize + vm.pageSize;
                if (_dataEndNum > vm.table.length) _dataEndNum = vm.table.length;
                for (var i = _dataStartNum; i < _dataEndNum; i++) {
                    _datas.push(vm.table[i]);
                }
                vm.currentPageData = _datas;
            });

            vm.changePage = function (index) {
                vm.currentPageIndex = index;
            }

            vm.currentPageIndex = 0;
        }
    ]);
})();