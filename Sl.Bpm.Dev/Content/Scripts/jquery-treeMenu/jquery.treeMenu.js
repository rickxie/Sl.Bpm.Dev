

(function ($) {
    //延时执行
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

    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback) {
            var T, k;
            if (this == null) {
                throw new TypeError('this is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }
            if (arguments.length > 1) {
                T = arguments[1];
            }
            k = 0;
            while (k < len) {
                var kValue;
                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    }

    //菜单节点
    function MenuNode(menu, icon, text, evt, data) {
        var self = this;
        this.menu = menu;
        this.data = data;
        var attr = data.attr;
        this.icon = icon || "icon-columns";
        this.text = text || "";
        var menu = $("<li></li>");
        var a = $("<a></a>").text(text);
        for (var k in (attr || {})) {
            a.attr(k, attr[k]);
        }
        menu.append(a);


        this.dom = menu;
        var icon = $('<i class="icon"></i>').addClass(self.icon);
        a.prepend(icon);

        for (var k in evt) {
            this.dom.on(k, function () {
                var cb = evt[k];
                if (typeof (cb) === "function") {
                    cb(self);
                }

            });
        }
    }

    //菜单
    function Menu(node) {
        var self = this;
        this.treeView = node.treeView;
        this.node = node;
        this.treeNode = node;
        this.children = [];
        this.status = "";
        this.dom = $('<ul class="dropdown-menu" style="position: absolute; top: 22px; left: auto;right:5px;"></ul>');
        this.addTitle = function (title, icon) {
            var item = $('<li style="text-align: center; color: #999; "><span>' + title + '</span></li>').prependTo(self.dom);
            if (icon) {
                item.prepend($('<i class="icon" style="margin-right:5px;"></i>').addClass(icon));
            }
        };
        this.addNode = function (icon, text, evt, data) {
            var menuNode = new MenuNode(self, icon, text, evt || {}, data);
            self.children.push(menuNode);
            self.dom.append(menuNode.dom);
        };
        node.dom.append(this.dom);

    }

    //树的连接线，闭合，展开按钮
    function TreeNodeIcon(node) {
        var self = this;
        var data = node.data;
        var icon = $('<i class="treeicon"></i>');
        this.dom = icon;
        var ss = node.treeView.saveStatus;
        if (data.children && data.children.length) {
            if (ss) {
                //上次保存的状态将覆盖打开层级设置
                var get = ss.get;
                if (typeof (get) === "function") {
                    var open = get(node) || false;
                    open ? icon.addClass("icon_open") : icon.addClass("icon_close");
                }

            } else {
                if (node.depth <= node.treeView.openDepth) {
                    icon.addClass("icon_open")
                }
                else {
                    icon.addClass("icon_close");
                }
            }
           

        }
        else {
            icon.addClass("icon_blank");
        }

        icon.on("click", function () {
            var set = ss.set;
           
            if ($(this).hasClass("icon_open")) {
                if (typeof (set) == "function") {
                    set(node, false);
                }
                $(this).removeClass("icon_open").addClass("icon_close");
                node.dom.find(">ul").slideUp({
                    complete: function () {
                        node.closeChildren();
                    }
                });
            }
            else if ($(this).hasClass("icon_close")) {
                if (typeof (set) == "function") {
                    set(node, true);
                }
                $(this).removeClass("icon_close").addClass("icon_open");
                node.dom.find(">ul").slideDown();
            }

        });
    }

    //树节点的设置按钮
    function TreeNodeConfigIcon(tNode, node) {
        var self = this;
		var icon = $('<span  class="config-wrap"><i class="icon icon-ellipsis-h menu-config"></i></span>');
        icon.on("click", function (e) {
            e.stopPropagation();
            $(document).trigger("click");
            node.treeView.event.trigger("showMenu", node);
        });

        this.dom = icon;
        tNode.dom.append(icon);
	}
	function TreeNodeStar(tNode, node) {
		var self = this;
		var icon = $('<i class="icon"></i>');
		node.treeView.starInit(node, icon,tNode.dom);
		this.dom = icon;
		tNode.dom.append(icon);
	}

    //树节点文本内容
    function TreeNodeText(node) {
        var self = this;
        var span = $('<span class="text-field tree-item-span"></span>');
        this.dom = span;
		var textIcon = $('<i class="icon"></i>');
		this.icon = textIcon;
        textIcon.addClass(node.data.icon);
        span.append(textIcon);
        var label = $("<span></span>").text(node.text);
        var input = $('<input type="text" />');
        this.label = label;
		span.append(label);

		//徽标
		if (node.badgeText !== undefined) {
			var bage = $("<badge></badge>").text(node.badgeText);
			if (typeof (node.badgeClass) == "string") {
				bage.addClass(node.badgeClass);
			}
			else if (typeof (node.badgeClass) == "function") {
				bage.addClass(node.badgeClass(node));
			}
			if (node.badgeHideByText) {
				if (node.badgeText) {
					span.append(bage);
				}
			}
			else {
				span.append(bage);
			}
			
		}

		//收藏按钮
		if (node.treeView.showStar) {
			this.starIcon = new TreeNodeStar(self, node);
		}
        var cb = node.treeView.showMenu;
        if (cb) {
            if (typeof (cb) === "function") {
                if (cb(node)) {
                    this.configIcon = new TreeNodeConfigIcon(self, node);
                }
            }
            else {
                this.configIcon = new TreeNodeConfigIcon(self, node);
            }
        }
        this.dom.on("click", function () {
            node.treeView.event.trigger("nodeClick", node);
        });
        this.dom.on("dblclick", function () {
            node.treeView.event.trigger("nodedblClick", node);
        });


    }


    //树节点
    function TreeNode(parent, data, depth, index) {
        var self = this;
        this.parent = parent;
        this.treeView = parent.treeView;
        this.data = data;
        this.children = [];
        this.index = index;
		this.text = data[this.treeView.textField];
		this.badgeText = data[this.treeView.badge.text];//徽标
		this.badgeClass = this.treeView.badge.class;//徽标
		this.badgeHideByText = this.treeView.badge.hideByText || false;//徽标
        this.depth = depth;
        this.icon = data.icon;
        this.id = "tv_" + depth + "_" + index;
        this.dom = $('<li></li>');
        this.dom.attr("id", this.id);

        this.icon = new TreeNodeIcon(self, data);
        this.dom.append(this.icon.dom);
       

        this.treeNodeText = new TreeNodeText(self);

        this.dom.append(this.treeNodeText.dom);

		


        var list = data.children || [];
        //子节点排序判断
        var sort = this.treeView.sort;
        if (sort) {
            if (typeof (sort) === "boolean") {
                //默认排序
                list.sort(function (a, b) {
                    return a.text.localeCompare(b.text);
                });
            }
            else if (typeof (sort) === "string") {
                //默认排序
                list.sort(function (a, b) {
                    return a.text.localeCompare(b.text, sort);
                });
            }
            else if (typeof (sort) === "function") {
                list.sort(function (a, b) {
                    return sort(self, a, b);
                });
            }
        }



        var childDom = $("<ul></ul>");
        var ss = self.treeView.saveStatus;
        if (ss) {
            //保存状态设置覆盖层级打开关闭设置
            if (typeof (ss.get) == "function") {
                if (!ss.get(self)) {
                    childDom.css("display", "none");
                }
            }
        }
        else {
            if (depth > self.treeView.openDepth) {
                childDom.css("display", "none");
            }
        }
      
        this.childDom = childDom;

        list.forEach(function (item, i) {
            var node = new TreeNode(self, item, depth + 1, i);
            node.$index = i;
            childDom.append(node.dom);
            self.children.push(node);
        });
        if (this.children.length) {
            this.children[0].$first = true;
            this.children[this.children.length - 1].$last = true;
        }
		this.addNode = function (item) {
			var node = new TreeNode(self, item, depth + 1,self.children.length);
			self.childDom.append(node.dom);
			self.children.push(node);
			self.reIndexChild();
			self.childDom.show();
		};

		this.reIndexChild = function () {

			var list = self.children;
			list.forEach(function (v, idx) {
				if (idx === 0) {
					v.$first = true;
				}
				v.index = idx;
				v.$index = idx;
			});
			if (list.length > 0) {
				list[list.length - 1].$last = true;
			}
		};
		this.remove = function () {
			var parent = self.parent;
			parent.children.splice(self.$index, 1);
			parent.reIndexChild();
			self.dom.remove();
		};
		this.setData = function (data) {
			self.data = data;
			self.text = data[self.treeView.textField];
			self.badgeText = data[self.treeView.badge.text];//徽标

			self.badgeClass = self.treeView.badge.class;//徽标
			self.badgeHideByText = self.treeView.badge.hideByText || false;//徽标
			self.icon = data.icon;

			//暂时只实现更新图标和文本
			var tnt = self.treeNodeText;
			tnt.icon.attr("class", "icon").addClass(data.icon);
			tnt.label.text(self.text);



		};

		this.dom.append(childDom);


        this.closeChildren = function () {
            var icon = self.icon.dom;
            if (icon.hasClass("icon_open")) {
                icon.removeClass("icon_open").addClass("icon_close");
            }
            childDom.css("display", "none");
            for (var i = 0; i < self.children.length; i++) {
                self.children[i].closeChildren();
            }
        };



        this.match = function (val) {
            var label = self.treeNodeText.label;
            var isMatch = false || val === "";
            var html = (self.text || '未设置').replace(new RegExp("[" + val.split('').join('][') + "]", "ig"), function (match) {
                isMatch = true;
                return "<b class='text-danger'>" + match + "</b>";
            });
            label.html(html);
            var cm = self.childMatch(val);
            isMatch = isMatch || cm;
            self.dom.css("display", isMatch ? "block" : "none");
            return isMatch;
        };
        this.childMatch = function (val) {
            var match = false;
            for (var i = 0; i < self.children.length; i++) {
                var child = self.children[i];
                if (child.match(val)) {
                    match = true;
                }
            }
            return match;
        };
        if (this.treeView.event) {
            this.treeView.event.on("open", function () {
                var icon = self.icon.dom;
                if (icon.hasClass("icon_close")) {
                    icon.removeClass("icon_close").addClass("icon_open");
                    childDom.css("display", "block");
                }
            });
            this.treeView.event.on("close", function () {
                var icon = self.icon.dom;
                var ss = self.treeView.saveStatus;
                if (ss) {  //保存状态设置覆盖层级打开关闭设置
                    var get = ss.get;
                    if (typeof (get) === "function") {
                        var open = get(self) || false;
                        if (!open) {
                            if (icon.hasClass("icon_open")) {
                                icon.removeClass("icon_open").addClass("icon_close");
                                childDom.css("display", "none");
                            }
                        }
                    }
                }
                else {
                    if (self.depth > self.treeView.openDepth) {
                        if (icon.hasClass("icon_open")) {
                            icon.removeClass("icon_open").addClass("icon_close");
                            childDom.css("display", "none");
                        }
                    }
                }
               

            });
        }
		this.showMenu = function (data) {
			self.highLight(true, 'high-light-menu');
			if (!self.menu) {
				data = data || {};

				var menu = new Menu(self);
				if (data.title) {
					menu.addTitle(data.title, data.icon);
				}
				self.menu = menu;
				for (var i = 0; i < (data.item || []).length; i++) {
					var item = data.item[i];
					menu.addNode(item.icon, item.text, { click: item.click }, item);
				}
				menu.dom.show();
				$(document).one("click", function () {
					self.highLight(false, 'high-light-menu');
					menu.dom.remove();
					self.menu = null;
				});
			}
		};

	
		this.highLight = function (highLight, clsName) {
			clsName = clsName || "high-light";
			var dom = self.dom.find(">.tree-item-span");
			if (highLight) {
				dom.addClass(clsName);
			}
			else {
				dom.removeClass(clsName);
			}
		};

		this.hideMenu = function () {
			
			if (self.menu) {
				self.menu.dom.remove();
				self.menu = null;
			}
		};
        this.next = function () {
            var $index = self.$index || 0;
            var parent = self.parent;
            var nextIndex = $index + 1;
            if (nextIndex < parent.children.length) {
                return parent.children[nextIndex];
            }
            return null;
        };
		this.prev = function () {
			var $index = self.$index || 0;
			var parent = self.parent;
			var nextIndex = $index - 1;
			if (nextIndex > -1) {
				return parent.children[nextIndex];
			}
			return null;
		};

		//找指定深度的节点,i
		this.parentOfDepth = function (depth,iSelf) {
			var p = self;
			if (iSelf) {
				if (p.depth == depth) {
					return p;
				}
			}
			do {
				p = p.parent;
				if (p && p.depth === depth) {
					break;
				}
			} while (p != null);
			return (p && p.depth === depth) ? p : null;
		};

		//返回当前结点到指定深度的路径,默认到深度0
		this.getPath = function (toDepth, spliter) {
			spliter = spliter || "\\";
			toDepth = toDepth || 0;
			var list = [];
			var cur = self;
			while (cur && cur.depth >= toDepth) {
				list.push(cur.data.text);
				cur = cur.parent;
			}
			list.reverse();
			return list.join(spliter);
		};

		this.moveTo = function (toParent) {

			var parent = self.parent;
			self.remove();
			toParent.addNode(self.data);

		};

        self.treeView.addNode(self);
    }

    //给当前节点动态加载节点
    TreeNode.prototype.appendChild = function (data) {
        var self = this;
        var child = new TreeNode(self, data, self.depth + 1);
        self.data.children = self.data.children || [];
        self.data.children.push(data);
        self.childDom.append(child.dom);
        return child;
    };


    //树控件
    function TreeView(data, config) {
        config = config || {};
        var nop = function () { };
        var self = this;
        this.onLoad = config.onLoad || nop;
        this.sort = config.sort || false;
        this.editable = config.editable || false;//默认不可编辑
		this.showMenu = config.showMenu || false;
		this.showStar = config.showStar || false;
		this.searchTip = config.searchTip || "搜索";
		if (this.showStar) {
			this.starField = config.showStar.starField || "star";
			this.starInit = config.showStar.init || nop;
		}
        this.addNode = config.addNode || nop;
        this.openDepth = config.openDepth || 0;
		this.textField = config.textField || "text";
		this.badge = config.badge || { field: "text", class: "danger", hideByText: false };//徽标,class:danger,primary,success,info,warning

        this.event = $({});
        this.saveStatus = config.saveStatus || false;

        this.dom = $('<fm-tree>\
<div class="fm-text-find" style="margin-bottom: 5px;"><i class="icon icon-search"></i><input class="form-control input-sm" type="text" placeholder="搜索"></div>\
<ul class="tree-view" style="padding-bottom:200px;"></ul></fm-tree>');
		this.dom.find("input").attr("placeholder", this.searchTip);
        var lastKey = "";
        this.dom.find("input").on("keyup", debounce(function () {
            if (!self.root) {
                return;
            }
            self.dom.find(".hide-line").removeClass("hide-line");
            var newKey = $(this).val();
            if (lastKey === "" && newKey !== "") {
                self.event.trigger("open");
            }
            if (newKey === "" && lastKey !== "") {
                self.event.trigger("close");
            }
            self.root.match(newKey);
            self.dom.find("ul:visible").each(function () {
                $(this).find(">li:visible:last").addClass("hide-line");
            });
            lastKey = newKey;


        }, 100));

        //加载动画
        this.dom.find("ul").html(
            '<li  style="position:relative;height:80px;">\
		            <div class="content-spinner-bar" style="position:absolute;top: 40%;"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>\
	            </li>');
        if (data) {
            //有数据
            this.root = new TreeNode({ treeView: this }, data, 0, 0);
            this.dom.find("ul").html("").append(this.root.dom);
            this.onLoad();
        }
        else if(data===undefined) {
            //没有数据
            this.dom.find("ul").html(
                '<li  style="position:relative;height: 80px;text-align: center;overflow:hidden;">\
                        <span class="span1" style="position: absolute;height:100%;width:100%;left:0;top: calc(50% - 14px);font-size:28px;color:#353535;">没有数据</span>\
                    </li>');
        }

    }

    $.fn.treeMenu = function (data, config) {

        config = config || {};
        var root = new TreeView(data, config);
        this.html("").append(root.dom);
        for (var k in config.event || {}) {
            root.event.on(k, config.event[k]);
        }
       
        return this;
    };

})(jQuery);