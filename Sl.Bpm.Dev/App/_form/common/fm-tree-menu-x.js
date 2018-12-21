_shared
    /*复选框/切换框列表指令*/
    .directive('fmTreeMenuX', ['$compile', function ($compile) {
        function debounce(fn, wait) {
            var timeout;
            return function () {
                var ctx = this, args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    fn.apply(ctx, args);
                }, wait || 100);
            };
        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                treeData: '='
            },
            link: function (scope, elem, attrs) {
                var $el = $(elem);
                //先输出加载动画(请求数据过程)
                $(
                    '<fm-tree>\
                        <div class="fm-text-find" style="margin-bottom: 5px;"><i class="icon icon-search"></i><input class="form-control input-sm" type="text" placeholder="搜索"></div>\
                        <ul class="tree-view" style="min-height: calc(100vh - 190px);">\
                            <li  style="position:relative;height:80px;">\
		                        <div class="content-spinner-bar" style="position:absolute;top: 40%;"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>\
	                        </li>\
                        </ul ></fm-tree>').appendTo($el);

                scope.$watch("treeData", function (val) {
                    if (val && val.length) {
                        $el.treeMenu(val[0],
                            //config
                            {
                                showMenu: function (node) {
                                    var menu = node.data.menu || [];
                                    return menu.length;
                                },//是否显示menu
                                event: {
                                    showMenu: function (e, node) {

                                        var data = node.data;
                                        var menu = data.menu || [];
                                        
                                        if (menu.length) {
                                            var arr = [];

                                            for (var i=0; i < menu.length; i++) {
                                                (function () {
                                                    var item = menu[i];
                                                    arr.push({
                                                        text: item.text, icon: item.icon, click: function () {
                                                            if (typeof (item.click) === "function") {
                                                                item.click(e, node.data, function () {
                                                                    node.dom.removeClass("is-latest");
                                                                });
                                                            }
                                                        }
                                                    });

                                                })();
                                            }

                                            node.showMenu({ title: data.name,  item: arr });
                                        }

                                    },
                                    nodedblClick: function (e, node) {
                                        var data = node.data;
                                        var dbClick = (data.dbclick || function () { });
                                        dbClick(e, data);
                                    }
                                },
                                addNode: function (node) {
                                    if (node.data.isLatest == '0') {
                                        node.dom.addClass("is-latest");
                                    }
                                },
                                sort: function (nP, nA, nB) {
                                    if (nP.depth < 1) {
                                        return -1;
                                    }
                                    else {
                                        return nA.text.localeCompare(nB.text);
                                    }
                                }

                            });
                    }
                });

            }
        }
    }]);