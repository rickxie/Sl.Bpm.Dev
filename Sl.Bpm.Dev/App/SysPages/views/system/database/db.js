(function () {
    //app.config([
    // '$stateProvider', function ($stateProvider) {

    //     $stateProvider.state('column',
    //               {
    //                   url: '/columns/:id',
    //                   templateUrl: _turl('/App/SysPages/views/system/database/businesstable.columns.html'),
    //                   params: {
    //                       id: null,
    //                       schemaName: null,
    //                       name: null,
    //                       aliasName: null
    //                   }

    //               })
    //            .state('viewcolumn',
    //                {
    //                    url: '/viewcolumn/:id',
    //                    templateUrl: _turl('/App/SysPages/views/system/database/viewtable.columns.html'),
    //                    params: {
    //                    },
    //                    params: {
    //                        id: null,
    //                        text: null
    //                    },
                        
    //                })
    //            .state('mappingcolumn',
    //                {
    //                    url: '/mappingcolumn/:id',
    //                    templateUrl: _turl('/App/SysPages/views/system/database/mapping.columns.html'),
    //                    params: {
    //                        id: null,
    //                        text: null
    //                    }
                       
    //                })
    //            .state('viewtableedit',
    //                {
    //                    url: '/viewedit/:id',
    //                    templateUrl: _turl('/App/SysPages/views/system/database/viewtable.edit.html')
                      
    //                })
    //            .state('mappingedit',
    //                {
    //                    url: '/mappingedit/:id',
    //                    templateUrl: _turl('/App/SysPages/views/system/database/mapping.edit.html')
                     
    //                })
    //            .state('businesstableedit',
    //                {
    //                    url: '/tableedit/:id',
    //                    templateUrl: _turl('/App/SysPages/views/system/database/businesstable.edit.html')
                       
    //                });

    // }]);
    app.controller("syspages.views.enterprise.businesstable.db", ['$scope', 'mabp.app.table', '$state', 'mabp.app.enterpriseInfoSync', 'dialog',
        function ($scope, service, $state, syncServie, dialog) {
            var vm = this;
            vm.splitDown = false;
            vm.isHideTree = false;

            var menuTop = [{
                id: "0", text: "数据库", icon: "icon-server", $$isExpend: true, $$isDisabled: true, menu: [
                    {
                        text: "获取表", icon: "icon-cloud-download", click: function ($event, item) {
                            dialog.open(app.dialogs["businesstableList"]).then(function (data) {
                                if (!!data)
                                    vm.load();
                            });
                        }
                    }
                ], children: [
                    { id: "1", text: "系统表", icon: "icon-table", $$isDisabled: true, children: [] },
                    {
                        id: "2", text: "流程表", icon: "icon-table", $$isDisabled: true, children: [], menu: [
                            {
                                text: "同步已有流程表",
                                icon: "icon-cloud-download",
                                click: function($event, item) {
                                    var ids = [];
                                    for (var i = 0; i < item.children.length; i++) {
                                        var curItem = item.children[i];
                                        ids.push(curItem.id);

                                    }
                                    if (ids.length > 0) {
                                        syncServie.getSelectedBusinessTables(ids).then(function(data) {
                                            if (data) {
                                                mabp.notify.success(L("SynchronizedSuccess"));
                                                vm.load();
                                            }
                                        });
                                    }
                                }
                            }
                        ]
                    },
                    { id: "3", text: "基础数据表", icon: "icon-table", $$isDisabled: true, children: [] },
                    {
                        id: "4", text: "系统视图", icon: "icon-code", $$isDisabled: true, children: []
                    },
                    {
                        id: "5", text: "数据源视图", icon: "icon-code", $$isDisabled: true, menu: [
                        {
                            text: "新增数据源视图", icon: "icon-plus", click: function ($event, item) {
                                dialog.open(app.dialogs.viewtableEdit, {type:2}).then(function (result) {
                                    if (result)
                                        vm.load();
                                });
                            }
                        }
                        ], children: []
                    },
                    {
                        id: "6", text: "报表视图", icon: "icon-code", $$isDisabled: true, menu: [
                        {
                            text: "新增报表视图", icon: "icon-plus", click: function ($event, item) {
                                dialog.open(app.dialogs.viewtableEdit, { type: 3 }).then(function (result) {
                                    if (result)
                                        vm.load();
                                });
                            }
                        }
                        ], children: []
                    },
                    {
                        id: "7", text: "匹配视图", icon: "icon-code", $$isDisabled: true, menu: [
                        {
                            text: "新增匹配视图", icon: "icon-plus", click: function ($event, item) {
                                dialog.open(app.dialogs.viewtableEdit, { type: 4 }).then(function (result) {
                                    if (result)
                                        vm.load();
                                });
                            }
                        }
                        ], children: []
                    }
                ]
            }];

            _shared.initialPage(vm);
            //自定义表的事件
            var selDefineTableMenu = [
                {
                    text: "获取最新",
                    icon: "icon-cloud-download",
                    click: function(event, item) {
                        var ids = [];
                        ids.push(item.id);
                        if (ids.length > 0) {
                            syncServie.getSelectedBusinessTables(ids).then(function(data) {
                                if (data) {
                                    mabp.notify.success(L("SynchronizedSuccess"));
                                    service.checkHasUnAppliedHistory({ id: item.id }).then(function (data) {
                                        if (data)
                                            item.isLatest = "0";
                                    });
                                }
                            });
                          
                        }
                    }
                }, {
                    text: "刷到数据库",
                    icon: "icon-bolt",
                    click: function(event, item,cb) {
                        service.applyToDatabase({ id: item.id }).then(function(data) {
                            if (data) {
                                item.isLatest = "1";
                                mabp.notify.success(L("OperationSucceeded"));
                                cb()
                            }
                        });
                    }
                }, {
                    text: "属性",
                    icon: "icon-cog",
                    click: function(event, item) {
                        $state.go('businesstableedit', { id: item.id });
                    }
                }, {
                    text: "查看字段",
                    icon: "icon-columns",
                    click: function(event, item) {
                        $state.go('column', item);
                    }
                }
            ];


            vm.load = function () {
                var newMenu = angular.copy(menuTop);
             
              
             
                //获取所有表视图数据
                service.getAllTablesAndViews().then(function (data) {
                  
                  
                    //递归用列表
                    var tableList = {};
                    //加载第一层表数据
                    for (var i = 0; i < data.appBusinessTables.length; i++) {
                        var curBusinessTable = data.appBusinessTables[i];
                        if (curBusinessTable.parentBusinessTableId == null) {
                            curBusinessTable.icon = "icon-table";
                            curBusinessTable.text = curBusinessTable.schemaName + (!curBusinessTable.aliasName ? "" : "(" + curBusinessTable.aliasName + ")");
                            curBusinessTable.dbclick = function (event, item) {
                                console.log(item);
                                $state.go('column', item);
                            }
                            switch (curBusinessTable.type) {
                                case 1:
                                    curBusinessTable.menu = [
                                      {
                                          text: "属性",
                                          icon: "icon-cog",
                                          click: function (event, item) {
                                              $state.go('businesstableedit', { id: item.id });
                                          }
                                      }, {
                                          text: "查看字段",
                                          icon: "icon-columns",
                                            click: function (event, item) {
                                              $state.go('column', item);
                                          }
                                      }
                                    ];
                                    curBusinessTable.nodePath = [newMenu[0].children[0]];
                                    tableList[curBusinessTable.id] = curBusinessTable;
                                    newMenu[0].children[0].children.push(curBusinessTable);
                                    break;
                                case 2:
                                    curBusinessTable.menu = angular.copy(selDefineTableMenu);
                                    curBusinessTable.nodePath = [newMenu[0].children[1]];
                                    tableList[curBusinessTable.id] = curBusinessTable;
                                    newMenu[0].children[1].children.push(curBusinessTable);
                                    break;
                                case 3:
                                    curBusinessTable.menu = angular.copy(selDefineTableMenu);
                                    curBusinessTable.nodePath = [newMenu[0].children[2]];
                                    tableList[curBusinessTable.id] = curBusinessTable;
                                    newMenu[0].children[2].children.push(curBusinessTable);
                                    break;
                                default:
                            }
                        }
                    }
                    //加载视图数据（只有一层
                    for (var i = 0; i < data.bpmViewTables.length; i++) {
                        var curViewTable = data.bpmViewTables[i];
                        curViewTable.icon = "icon-tag";
                        curViewTable.text = curViewTable.schemaName + (!curViewTable.name ? "" : "(" + curViewTable.name + ")");
                        curViewTable.dbclick = function (event, item) {
                            if (item.type == 4)
                                $state.go('mappingedit', { id: item.id });
                            else
                                $state.go('viewtableedit', { id: item.id });
                        }
                        curViewTable.menu = [];
                        if (curViewTable.type == 4) {
                            curViewTable.menu.push({
                                text: "属性", icon: "icon-cog",
                                click: function (event, item) {
                                    $state.go('mappingedit', { id: item.id });
                                }
                            });
                            curViewTable.menu.push({
                                text: "配置字段",
                                icon: "icon-columns",
                                click: function (event, item) {
                                    $state.go('mappingcolumn', item);
                                }
                            });
                        }
                        else {
                            curViewTable.menu.push({
                                text: "属性", icon: "icon-cog",
                                click: function (event, item) {
                                    $state.go('viewtableedit', { id: item.id });
                                }
                            });
                            curViewTable.menu.push({
                                text: "查看字段", icon: "icon-columns",
                                click: function (event, item) {
                                    $state.go('viewcolumn', item);
                                }
                            });
                        }
                        //匹配视图的属性和其他视图不同
                        switch (curViewTable.type) {
                            case 1:
                                newMenu[0].children[3].children.push(curViewTable);
                                curViewTable.nodePath = [newMenu[0].children[3]];
                                break;
                            case 2:
                                newMenu[0].children[4].children.push(curViewTable);
                                curViewTable.nodePath = [newMenu[0].children[4]];
                                break;
                            case 3:
                                newMenu[0].children[5].children.push(curViewTable);
                                curViewTable.nodePath = [newMenu[0].children[5]];
                                break;
                            case 4:
                                newMenu[0].children[6].children.push(curViewTable);
                                curViewTable.nodePath = [newMenu[0].children[6]];
                                break;
                        }
                    }
                    //加载第一层以下表数据（伪递归
                    var isOk = false;
                    var prevTaskNum = -1, nowTaskNum = 0;
                    //判断没有对应不上的表
                    while (!isOk && prevTaskNum != nowTaskNum) {
                        prevTaskNum = nowTaskNum;
                        isOk = true;
                        var newTaskNum = 0;
                        for (var i = 0; i < data.appBusinessTables.length; i++) {
                            var curTable = data.appBusinessTables[i];
                            if (curTable.parentBusinessTableId != null) {
                                //如果在列表中能找到父表且找不到自己的时候则将自己加入列表
                                if (tableList[curTable.parentBusinessTableId] != null && tableList[curTable.id] == null) {
                                    if (tableList[curTable.parentBusinessTableId].children == null) tableList[curTable.parentBusinessTableId].children = [];
                                    curTable.text = curTable.schemaName + (!curTable.aliasName ? "" : "(" + curTable.aliasName + ")");
                                    curTable.icon = "icon-table";
                                    curTable.nodePath = vm.getPath(tableList, curTable.parentBusinessTableId, newMenu[0].children[1]);
                                    curTable.dbclick = function (event, item) {
                                        $state.go('column', item);
                                    }
                                    curTable.menu = [{
                                        text: "获取最新", icon: "icon-cloud-download",
                                        click: function (event, item) {
                                            var ids = [];
                                            ids.push(item.id);
                                            if (ids.length > 0) {
                                                syncServie.getSelectedBusinessTables(ids).then(function (data) {
                                                    if (data) {
//                                                        item.isLatest = "1";
                                                        mabp.notify.success(L("SynchronizedSuccess"));
                                                    }
                                                });
                                            }
                                        }
                                    }, {
                                        text: "刷到数据库", icon: "icon-bolt",
                                            click: function (event, item,cb) {
                                               
                                            angular.element('#applyBusinessTableToDatabase').addClass("icon-spin");
                                            service.applyToDatabase({ id: item.id }).then(function (data) {
                                                if (data) {
                                                    angular.element('#applyBusinessTableToDatabase').removeClass("icon-spin");
                                                    mabp.notify.success(L("OperationSucceeded"));
                                                    item.isLatest = "1";
                                                    cb();
                                                }
                                            }, function () {
                                                angular.element('#applyBusinessTableToDatabase').removeClass("icon-spin");
                                            });
                                        }
                                    }, {
                                        text: "属性", icon: "icon-cog",
                                        click: function (event, item) {
                                            console.log("查看属性");
                                        }
                                    }, {
                                        text: "查看字段", icon: "icon-columns",
                                        click: function (event, item) {
                                            $state.go('column', item);
                                        }
                                    }];
                                    tableList[curTable.parentBusinessTableId].children.push(curTable);
                                    tableList[curTable.id] = curTable;
                                } else if (tableList[curTable.id] == null) {
                                } else {
                                    newTaskNum++;
                                    isOk = false;
                                }
                            }
                        }
                        nowTaskNum = newTaskNum;
                    }
                    //将未查询到的表输出
                    if (prevTaskNum == nowTaskNum) {
                        for (var i = 0; i < data.appBusinessTables.length; i++) {
                            if (data.appBusinessTables[i].parentBusinessTableId != null) {
                                if (tableList[data.appBusinessTables[i].parentBusinessTableId] == null) {
                                    console.info("未找到匹配项的表：");
                                    console.log(data.appBusinessTables[i]);
                                }
                            }
                        }
                    }

                    tableList = {};
                  
                    vm.treemenu = newMenu;
                });
              
            }
            vm.load();
            vm.getPath = function (list, id, defaultValue) {
                var path = [];
                if (defaultValue != null) path.push(defaultValue);
                var obj = list[id];
                if (obj != null) path.push(obj);
                while (obj == null) {
                    obj = list[obj.parentBusinessTableId];
                    if (obj != null) path.push(obj);
                }
                return path;
            }

            vm.details = function (i) {
                $state.go('database.column',  i);
            }

            //菜单宽度（默认为500px
            vm.menuWidth = 300;
            //拖拽分割条移动时改变菜单及右侧页面宽度
            vm.splitMove = function ($event) {
                if (vm.splitDown && !vm.isHideTree) {
                    vm.menuWidth = $event.clientX;
                    $(".db").css("width", vm.menuWidth - 50);
                    $(".db-split").css("left", vm.menuWidth - 45);
                    $(".db-page").css("width", "calc(100% - " + (vm.menuWidth - 15) + "px)");
                }
            }
            //双击分割条时隐藏/显示菜单
            vm.hideTree = function () {
                console.log("hideTree");
                vm.isHideTree = !vm.isHideTree;
                if (vm.isHideTree) {
                    $(".db").css("width", 0);
                    $(".db-split").css("left", 0);
                    $(".db-page").css("width", "calc(100% - " + 20 + "px)");
                } else {
                    $(".db").css("width", vm.menuWidth - 50);
                    $(".db-split").css("left", vm.menuWidth - 45);
                    $(".db-page").css("width", "calc(100% - " + (vm.menuWidth - 15) + "px)");
                }
            }
        }
    ]);
})();