_shared
/*复选框/切换框列表指令*/
.directive('fmTreeMenu', [
    '$compile', 'dialog', 'mabp.app.module', '$timeout', '$http', function ($compile, dialog, service, $timeout, $http) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/treeMenu.html',
            scope: {
                treeData: '=',
                textField: '@',
                findText: '=',
                valueField: '@',
                itemDbClicked: '&',
                itemIconClicked: '&'
            },
            controller: ['$scope', function ($scope) {
                $scope.activeItem = null;
                $scope.menuOpen = false;
                $scope.isQuickSelect = true;

                $scope.itemExpended = function (item, $event) {
                    item.$$isExpend = !item.$$isExpend;
                    $event.stopPropagation();
                };

                $scope.getItemIcon = function (item) {
                    return item.children != null && item.children.length > 0 ? (item.$$isExpend ? 'treeicon icon_open' : 'treeicon icon_close') : 'treeicon icon_blank';
                };

                //$scope.$watch("treeData", function (newvalue, oldvalue) {
                //    if (newvalue != null && newvalue.length > 0) {
                //    }
                //});

                $scope.itemIconClicked = function ($event, item) {
                    console.log($event, item);
                    if ($scope.activeItem == null || $scope.activeItem.id != item.id) {
                        $scope.activeItem = item;
                    }
                    $scope.menuOpen = true;
                    $event.stopPropagation();
                }

                $scope.itemDbClicked = function ($event, item) {
                    if (!!item.dbclick) {
                        item.dbclick($event, item);
                    } else {
                        item.$$isExpend = !item.$$isExpend;
                    }
                }

                $scope.findMenu = function () {
                    var li = [];
                    var path = [];
                    $scope.findItem($scope.treeData[0].children, function (item) {
                        item.$$isHide = true;
                        item.$$isExpend = false;
                    });
                    $scope.findItem($scope.treeData[0].children, function (item) {
                        if (!$scope.findTxt || item.text.toLowerCase().indexOf($scope.findTxt.toLowerCase()) >= 0) {
                            li.push(item);
                        }
                    });
                    for (var i = 0; i < li.length; i++) {
                        li[i].$$isHide = false;
                        if (li[i].nodePath != null) {
                            for (var o = 0; o < li[i].nodePath.length; o++) {
                                if (!!$scope.findTxt) li[i].nodePath[o].$$isExpend = true;
                                li[i].nodePath[o].$$isHide = false;
                            }
                        }
                    }
                }

                $scope.findItem = function (children, func) {
                    for (var i = 0; i < children.length; i++) {
                        func(children[i]);
                        if (children[i].children != null && children[i].children.length > 0) {
                            $scope.findItem(children[i].children, func);
                        }
                    }
                }

                $scope.keyPress = function ($event) {
                    if (!$scope.isQuickSelect && $event.keyCode == 13) {
                        $scope.findMenu();
                    }
                }

                $scope.keyDown = function ($event) {
                    if ($scope.isQuickSelect) {
                        $timeout(function () {
                            $scope.findMenu();
                        }, 50);
                    }
                }

                angular.element(document).on('mousedown', function (event) {
                    if (event == event) {
                        if ($scope.menuOpen) {
                            //重点是用$timeout保证变量同步修改
                            $timeout(function () {
                                $scope.menuOpen = false;
                            }, 0);
                        }
                    }
                });
            }]
        };
    }
])