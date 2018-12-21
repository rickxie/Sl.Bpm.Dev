(function() {
    'use strict';
    var controllerId = app.dialogs.define('popupDialog', '/App/SysPages/views/my/popup/popup.html');

    app.controller(controllerId, [
		'$scope', 'mabp.app.system', 'mabp.app.module', 'appSession','$filter',
		function ($scope, service, moduleService, session, $filter) {

			var params = { type: $scope.type, code: $scope.code };
			var root = {
                text: '所有流程', children: [{
                    text: '所有系统',
                    icon: 'icon-desktop',
                    children: []
                },
                {
					text: $filter('translate')('workflow'),
                    icon: 'icon-random',
                    children: []
                },
                {
                    text: '所有基础数据',
                    icon: 'icon-cube-alt',
                    children: []
                },
                {
                    text: '所有报表',
                    icon: 'icon-pie-chart',
                    children: []
                },
                {
                    text: '所有功能',
                    icon: 'icon-stack',
                    children: []
                }], icon: 'icon-random'
            };
			var option = {
				openDepth: 3,
				searchTip: $filter('translate')('Search')
			};
            option.showStar = {
                starField: 'isFavourite',
                init: function(node, icon, parent) {

                    function setIcon(status) {
                        if (status) {
                            $(icon).removeClass("icon-star-empty").addClass("icon-star").show();
                        }
                        else {
                            $(icon).removeClass("icon-star").addClass("icon-star-empty");
                        }
                    }
                    setIcon(node.data.isFavourite);
                  
                    $(icon).on("click", function() {
                        var newStatus = !node.data.isFavourite;
                        setIcon(newStatus);
                        moduleService.setFavouriteModule({
                            menuId: node.data.id,
                            id: node.data.fId,
                            menuType: node.data.menuType,
                            isFavourite: !node.data.isFavourite
						}).then(function (fid) {
							if (newStatus) {
								if (fid) {
									new $.zui.Messager(L("AddToCommonWorkflowSuccessfully"), {
										icon: 'bell',
										type: 'success'
									}).show();
									node.data.fId = fid;
									node.data.isFavourite = newStatus;
									setIcon(newStatus);
								}
								else {
									new $.zui.Messager(L("AddToCommonWorkflowSuccessfullyUpToMax"), {
										icon: 'bell',
										type: 'warning'
									}).show();
									newStatus = node.data.isFavourite = !newStatus;
									setIcon(newStatus);
								}
								
							}
							else {
								new $.zui.Messager(L("RemoveFromCommonWorkflowSuccessfully"), {
									icon: 'bell',
									type: 'success'
								}).show();
								node.data.isFavourite = newStatus;
								node.data.fId = null;
							}

                        });


                    }).css({
                        top: "1px",
                        position: 'absolute',
                        right: '60px',
                        backgroundColor: 'rgba(255,241,244,.6)'
                    }).addClass(node.data.isFavourite ? "icon-star" : "icon-star-empty");
                    if (!node.data.isFavourite) {
                        $(icon).hide();
                    }

                    $(parent).on("mouseenter mouseleave", function(e) {
                        if (e.type === "mouseenter") {
                            if (!node.data.isFavourite && node.children.length === 0) {
                                $(icon).stop().fadeIn();
                            }

                        } else {
                            if ($(icon).hasClass("icon-star-empty")) {
                                $(icon).stop().fadeOut();
                            }
                        }
                    });

                }
            };
            var arr = [{}, {}];
            var p = {};
            if ($scope.code !== null) {
                p.code = params.code;
            }
            if ($scope.type !== null) {
                p.type = params.type;
            }
            service.getMenu(p).then(function(list) {

                angular.forEach(list, function(item) {
                    var dic = arr[item.menuType];
                    var curRoot = root.children[item.menuType];
                    item.icon = item.iconClass;
					item.text = item.name;

                    if (item.parentId) {
                        var parent = dic[item.parentId];
                        if (parent == null) {
                            console.log(dic, item);
                        }
                        var children = parent.children = parent.children || [];
                        children.push(item);
                    }
                    dic[item.id] = item;
                    curRoot.children.length = 0;
                    angular.forEach(dic, function(v) {
                        if (!v.parentId) {
                            curRoot.children.push(v);
                        }
                    });
                });
                var type = $scope.type === null ? 0 : parseInt($scope.type);
                $("#popupMenu").treeMenu(root.children[type], option);
            });
        }
    ]);

  
})();