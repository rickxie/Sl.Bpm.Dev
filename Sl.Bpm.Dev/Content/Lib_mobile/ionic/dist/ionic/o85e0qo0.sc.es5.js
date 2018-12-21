/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
var __awaiter=this&&this.__awaiter||function(t,e,n,a){return new(n||(n=Promise))(function(o,i){function r(t){try{s(a.next(t))}catch(t){i(t)}}function l(t){try{s(a.throw(t))}catch(t){i(t)}}function s(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(r,l)}s((a=a.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){var n,a,o,i,r={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;r;)try{if(n=1,a&&(o=2&i[0]?a.return:i[0]?a.throw||((o=a.return)&&o.call(a),0):a.next)&&!(o=o.call(a,i[1])).done)return o;switch(a=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return r.label++,{value:i[1],done:!1};case 5:r.label++,a=i[1],i=[0];continue;case 7:i=r.ops.pop(),r.trys.pop();continue;default:if(!(o=(o=r.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){r=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){r.label=i[1];break}if(6===i[0]&&r.label<o[1]){r.label=o[1],o=i;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(i);break}o[2]&&r.ops.pop(),r.trys.pop();continue}i=e.call(t,r)}catch(t){i=[6,t],a=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}};Ionic.loadBundle("o85e0qo0",["exports","./chunk-4da37359.js","./chunk-db50cf96.js"],function(t,e,n){var a=window.Ionic.h,o=function(){function t(){this.loaded=!1,this.active=!1,this.disabled=!1,this.selected=!1,this.show=!0,this.tabsHideOnSubPages=!1}return t.prototype.selectedChanged=function(t){t&&this.ionSelect.emit()},t.prototype.componentWillLoad=function(){},t.prototype.onPropChanged=function(){this.ionTabMutated.emit()},t.prototype.getTabId=function(){return this.name?this.name:"string"==typeof this.component?this.component:null},t.prototype.setActive=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.prepareLazyLoaded()];case 1:return t.sent(),this.active=!0,[2]}})})},t.prototype.prepareLazyLoaded=function(){return!this.loaded&&this.component?(this.loaded=!0,e.attachComponent(this.delegate,this.el,this.component,["ion-page"])):Promise.resolve()},t.prototype.hostData=function(){var t=this.btnId,e=this.active;return{"aria-labelledby":t,"aria-hidden":e?null:"true",role:"tabpanel",class:{"ion-page":!this.component,"tab-hidden":!e}}},t.prototype.render=function(){return a("slot",null)},Object.defineProperty(t,"is",{get:function(){return"ion-tab"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{active:{type:Boolean,attr:"active",mutable:!0},badge:{type:String,attr:"badge",watchCallbacks:["onPropChanged"]},badgeColor:{type:String,attr:"badge-color",watchCallbacks:["onPropChanged"]},btnId:{type:String,attr:"btn-id"},component:{type:String,attr:"component"},delegate:{type:"Any",attr:"delegate"},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["onPropChanged"]},el:{elementRef:!0},getTabId:{method:!0},href:{type:String,attr:"href",watchCallbacks:["onPropChanged"]},icon:{type:String,attr:"icon",watchCallbacks:["onPropChanged"]},label:{type:String,attr:"label",watchCallbacks:["onPropChanged"]},name:{type:String,attr:"name"},selected:{type:Boolean,attr:"selected",watchCallbacks:["selectedChanged"]},setActive:{method:!0},show:{type:Boolean,attr:"show",watchCallbacks:["onPropChanged"]},tabsHideOnSubPages:{type:Boolean,attr:"tabs-hide-on-sub-pages"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ionSelect",method:"ionSelect",bubbles:!0,cancelable:!0,composed:!0},{name:"ionTabMutated",method:"ionTabMutated",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".tab-hidden.sc-ion-tab-h{display:none!important}"},enumerable:!0,configurable:!0}),t}(),i=function(){function t(){this.canScrollLeft=!1,this.canScrollRight=!1,this.keyboardVisible=!1,this.layout="icon-top",this.placement="bottom",this.tabs=[],this.highlight=!1,this.translucent=!1}return t.prototype.onKeyboardWillHide=function(){var t=this;setTimeout(function(){return t.keyboardVisible=!1},50)},t.prototype.onKeyboardWillShow=function(){"bottom"===this.placement&&(this.keyboardVisible=!0)},t.prototype.componentDidLoad=function(){this.updateHighlight()},t.prototype.getSelectedButton=function(){return this.el.shadowRoot.querySelector(".tab-btn-selected")},t.prototype.updateHighlight=function(){var t=this;this.highlight&&this.queue.read(function(){var e=t.getSelectedButton(),n=t.el.shadowRoot.querySelector(".tabbar-highlight");e&&n&&(n.style.transform="translate3d("+e.offsetLeft+"px,0,0) scaleX("+e.offsetWidth+")")})},t.prototype.hostData=function(){var t,e=this,a=e.color,o=e.translucent,i=e.layout,r=e.placement,l=e.keyboardVisible;return{role:"tablist","aria-hidden":l?"true":null,class:Object.assign({},n.createColorClasses(a),(t={"tabbar-translucent":o},t["layout-"+i]=!0,t["placement-"+r]=!0,t["tabbar-hidden"]=l,t))}},t.prototype.renderTabButton=function(t){var e=this,n=t.icon,o=t.label,i=t.disabled,r=t.badge,l=t.badgeColor,s=t.href,c=t===this.selectedTab,b=!!o,u=!!n;return a("a",{role:"tab","ion-activable":!0,"aria-selected":c?"true":null,href:s||"#",class:{"tab-btn":!0,"tab-btn-selected":c,"tab-btn-has-label":b,"tab-btn-has-icon":u,"tab-btn-has-label-only":b&&!u,"tab-btn-has-icon-only":u&&!b,"tab-btn-has-badge":!!r,"tab-btn-disabled":i,"tab-btn-hidden":!t.show},onClick:function(n){t.disabled||e.ionTabbarClick.emit(t),n.preventDefault()}},n&&a("ion-icon",{class:"tab-btn-icon",icon:n,lazy:!1}),o&&a("span",{class:"tab-btn-text"},o),r&&a("ion-badge",{class:"tab-btn-badge",color:l},r),"md"===this.mode&&a("ion-ripple-effect",null))},t.prototype.render=function(){var t=this;return[this.tabs.map(function(e){return t.renderTabButton(e)}),this.highlight&&a("div",{class:"animated tabbar-highlight"})]},Object.defineProperty(t,"is",{get:function(){return"ion-tabbar"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{canScrollLeft:{state:!0},canScrollRight:{state:!0},color:{type:String,attr:"color"},doc:{context:"document"},el:{elementRef:!0},highlight:{type:Boolean,attr:"highlight"},keyboardVisible:{state:!0},layout:{type:String,attr:"layout"},mode:{type:String,attr:"mode"},placement:{type:String,attr:"placement"},queue:{context:"queue"},selectedTab:{type:"Any",attr:"selected-tab",watchCallbacks:["updateHighlight"]},tabs:{type:"Any",attr:"tabs"},translucent:{type:Boolean,attr:"translucent"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ionTabbarClick",method:"ionTabbarClick",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"body:keyboardWillHide",method:"onKeyboardWillHide"},{name:"body:keyboardWillShow",method:"onKeyboardWillShow"},{name:"window:resize",method:"updateHighlight",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-ion-tabbar-ios-h{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;width:100%;background:var(--background);color:var(--color);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:10}.ion-color.sc-ion-tabbar-ios-h{--background:var(--ion-color-base);--color:rgba(var(--ion-color-contrast-rgb), 0.7);--color-selected:var(--ion-color-contrast)}.tabbar-hidden.sc-ion-tabbar-ios-h{display:none!important}.placement-top.sc-ion-tabbar-ios-h{-webkit-box-ordinal-group:0;-ms-flex-order:-1;order:-1}.placement-bottom.sc-ion-tabbar-ios-h{padding-bottom:var(--ion-safe-area-bottom,0)}.tabbar-highlight.sc-ion-tabbar-ios{left:0;bottom:0;-webkit-transform-origin:0 0;transform-origin:0 0;display:block;position:absolute;width:1px;height:2px;-webkit-transform:translateZ(0);transform:translateZ(0);background:currentColor}.tabbar-highlight.animated.sc-ion-tabbar-ios{-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);will-change:transform}.placement-top.sc-ion-tabbar-ios-h   .tabbar-highlight.sc-ion-tabbar-ios{bottom:0}.placement-bottom.sc-ion-tabbar-ios-h   .tabbar-highlight.sc-ion-tabbar-ios{top:0}.layout-icon-start.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios{--flex-direction:row}.layout-icon-end.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios{--flex-direction:row-reverse}.layout-icon-bottom.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios{--flex-direction:column-reverse}.layout-icon-end.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios, .layout-icon-hide.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios, .layout-icon-start.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios, .layout-label-hide.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios{--justify-content:center}.layout-icon-hide.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios{--icon-display:none}.layout-label-hide.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios{--label-display:none;--icon-margin:0}.layout-icon-bottom.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios, .layout-icon-top.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios{--badge-end:calc(50% - 30px)}.layout-icon-end.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios, .layout-icon-hide.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios, .layout-icon-start.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios{--badge-end:calc(50% - 50px);--label-margin-top:2px;--label-margin-bottom:2px;--label-font-size:14px;--label-line-height:1.1}.tab-btn.sc-ion-tabbar-ios{font-family:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin:0;display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:var(--flex-direction,column);flex-direction:var(--flex-direction,column);-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:var(--justify-content,flex-start);-ms-flex-pack:var(--justify-content,flex-start);justify-content:var(--justify-content,flex-start);width:100%;height:100%;border:0;outline:0;background:0 0;text-decoration:none;cursor:pointer;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-drag:none}.tab-btn.sc-ion-tabbar-ios:focus-visible{background:var(--background-focused)}.tab-btn-selected.sc-ion-tabbar-ios, .tab-btn.sc-ion-tabbar-ios:hover{color:var(--color-selected)}.tab-btn-hidden.sc-ion-tabbar-ios{display:none!important}.tab-btn-disabled.sc-ion-tabbar-ios{pointer-events:none;opacity:.4}.tab-btn-text.sc-ion-tabbar-ios{margin-top:var(--label-margin-top);margin-bottom:var(--label-margin-bottom);display:var(--label-display,block);font-size:var(--label-font-size);line-height:var(--label-line-height)}.tab-btn-icon.sc-ion-tabbar-ios{margin-top:var(--icon-margin-top);margin-bottom:var(--icon-margin-bottom);display:var(--icon-display,block);min-width:var(--icon-min-width);height:var(--icon-height,1em);font-size:var(--icon-font-size)}.tab-btn-icon.sc-ion-tabbar-ios, .tab-btn-text.sc-ion-tabbar-ios{-ms-flex-item-align:center;align-self:center;min-width:26px;max-width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}.tab-btn-has-label-only.sc-ion-tabbar-ios   .tab-btn-text.sc-ion-tabbar-ios{white-space:normal;margin:2px 0;font-size:14px;line-height:1.1}.tab-btn-has-icon-only.sc-ion-tabbar-ios, .tab-btn-has-label-only.sc-ion-tabbar-ios{--justify-content:center}.tab-btn-badge.sc-ion-tabbar-ios{right:4%;top:6%;right:var(--badge-end,calc(50% - 30px));padding:1px 6px;-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;height:auto;font-size:12px;line-height:16px}.tab-btn-has-label-only.sc-ion-tabbar-ios   .tab-btn-badge.sc-ion-tabbar-ios{--badge-end:calc(50% - 50px)}.tab-btn-has-icon-only.sc-ion-tabbar-ios   .tab-btn-badge.sc-ion-tabbar-ios{--badge-end:calc(50% - 30px)}.tab-btn-selected.sc-ion-tabbar-ios   .tab-btn-icon.sc-ion-tabbar-ios{-webkit-transform:var(--icon-transform-selected);transform:var(--icon-transform-selected)}.tab-btn.sc-ion-tabbar-ios{padding:0 2px;max-width:240px;font-size:10px}.tab-btn-text.sc-ion-tabbar-ios{margin-top:0;margin-bottom:1px;min-height:11px}.tab-btn-icon.sc-ion-tabbar-ios{margin-top:4px;font-size:30px}.tab-btn-icon.sc-ion-tabbar-ios::before{vertical-align:top}.sc-ion-tabbar-ios-h{--background:var(--ion-tabbar-background-color, #f8f8f8);--background-rgb:var(--ion-tabbar-translucent-background-color-rgb, 248, 248, 248);--color:var(--ion-tabbar-text-color, #8c8c8c);--color-selected:var(--ion-color-primary, #3880ff);--background-focused:var(--ion-tabbar-background-color-focused, #dadada);-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:50px;border-top:.55px solid rgba(var(--ion-tabbar-border-color-rgb,0,0,0),.2);contain:strict}.placement-top.sc-ion-tabbar-ios-h{border-top:0;border-bottom:.55px solid rgba(var(--ion-tabbar-border-color-rgb,0,0,0),.2)}.tabbar-translucent.sc-ion-tabbar-ios-h{background-color:rgba(var(--ion-color-base-rgb),.8);-webkit-backdrop-filter:saturate(210%) blur(20px);backdrop-filter:saturate(210%) blur(20px)}.layout-icon-end.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios, .layout-icon-start.sc-ion-tabbar-ios-h   .tab-btn.sc-ion-tabbar-ios{--icon-margin-top:2px;--icon-margin-bottom:1px;--icon-min-width:24px;--icon-height:26px;--icon-font-size:24px}"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),t}(),r=function(){function t(){this.ids=-1,this.transitioning=!1,this.tabsId=++l,this.tabs=[],this.tabbarHidden=!1,this.translucent=!1,this.useRouter=!1}return t.prototype.componentWillLoad=function(){this.useRouter||(this.useRouter=!!this.doc.querySelector("ion-router")&&!this.el.closest("[no-router]")),this.loadConfig("tabbarPlacement","bottom"),this.loadConfig("tabbarLayout","icon-top"),this.loadConfig("tabbarHighlight",!1),this.initTabs(),this.ionNavWillLoad.emit()},t.prototype.componentDidLoad=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.initSelect()];case 1:return t.sent(),[2]}})})},t.prototype.componentDidUnload=function(){this.tabs.length=0,this.selectedTab=this.leavingTab=void 0},t.prototype.onTabMutated=function(){this.el.forceUpdate()},t.prototype.onTabClicked=function(t){var e=t.detail;if(this.useRouter&&null!=e.href){var n=this.doc.querySelector("ion-router");n&&n.push(e.href)}else this.select(e)},t.prototype.select=function(t){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(n){switch(n.label){case 0:return e=this.getTab(t),this.shouldSwitch(e)?[4,this.setActive(e)]:[2,!1];case 1:return n.sent(),[4,this.notifyRouter()];case 2:return n.sent(),this.tabSwitch(),[2,!0]}})})},t.prototype.setRouteId=function(t){return __awaiter(this,void 0,void 0,function(){var e,n=this;return __generator(this,function(a){switch(a.label){case 0:return e=this.getTab(t),this.shouldSwitch(e)?[4,this.setActive(e)]:[2,{changed:!1,element:this.selectedTab}];case 1:return a.sent(),[2,{changed:!0,element:this.selectedTab,markVisible:function(){return n.tabSwitch()}}]}})})},t.prototype.getRouteId=function(){var t=this.selectedTab&&this.selectedTab.getTabId();return t?{id:t,element:this.selectedTab}:void 0},t.prototype.getTab=function(t){return"string"==typeof t?this.tabs.find(function(e){return e.getTabId()===t}):"number"==typeof t?this.tabs[t]:t},t.prototype.getSelected=function(){return this.selectedTab},t.prototype.initTabs=function(){var t=this;(this.tabs=Array.from(this.el.querySelectorAll("ion-tab"))).forEach(function(e){var n="t-"+t.tabsId+"-"+ ++t.ids;e.btnId="tab-"+n,e.id="tabpanel-"+n})},t.prototype.initSelect=function(){return __awaiter(this,void 0,void 0,function(){var t,e,n,a,o;return __generator(this,function(i){switch(i.label){case 0:if(t=this.tabs,this.useRouter)return[2];for(e=t.find(function(t){return t.selected})||t.find(function(t){return t.show&&!t.disabled}),n=0,a=t;n<a.length;n++)(o=a[n])!==e&&(o.selected=!1);return e?[4,e.setActive()]:[3,2];case 1:i.sent(),i.label=2;case 2:return this.selectedTab=e,e&&(e.selected=!0,e.active=!0),[2]}})})},t.prototype.loadConfig=function(t,e){void 0===this[t]&&(this[t]=this.config.get(t,e))},t.prototype.setActive=function(t){if(this.transitioning)return Promise.reject("transitioning already happening");if(!t)return Promise.reject("no tab is selected");for(var e=0,n=this.tabs;e<n.length;e++){var a=n[e];t!==a&&(a.selected=!1)}return this.transitioning=!0,this.leavingTab=this.selectedTab,this.selectedTab=t,this.ionNavWillChange.emit(),t.setActive()},t.prototype.tabSwitch=function(){var t=this.selectedTab,e=this.leavingTab;this.leavingTab=void 0,this.transitioning=!1,t&&(t.selected=!0,e!==t&&(e&&(e.active=!1),this.ionChange.emit({tab:t}),this.ionNavDidChange.emit()))},t.prototype.notifyRouter=function(){if(this.useRouter){var t=this.doc.querySelector("ion-router");if(t)return t.navChanged(1)}return Promise.resolve(!1)},t.prototype.shouldSwitch=function(t){var e=this.selectedTab;return!(!t||t===e||this.transitioning)},t.prototype.hostData=function(){return{class:n.createColorClasses(this.color)}},t.prototype.render=function(){return[a("div",{class:"tabs-inner"},a("slot",null)),!this.tabbarHidden&&a("ion-tabbar",{tabs:this.tabs.slice(),color:this.color,selectedTab:this.selectedTab,highlight:this.tabbarHighlight,placement:this.tabbarPlacement,layout:this.tabbarLayout,translucent:this.translucent})]},Object.defineProperty(t,"is",{get:function(){return"ion-tabs"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{color:{type:String,attr:"color"},config:{context:"config"},doc:{context:"document"},el:{elementRef:!0},getRouteId:{method:!0},getSelected:{method:!0},getTab:{method:!0},name:{type:String,attr:"name"},select:{method:!0},selectedTab:{state:!0},setRouteId:{method:!0},tabbarHidden:{type:Boolean,attr:"tabbar-hidden"},tabbarHighlight:{type:Boolean,attr:"tabbar-highlight",mutable:!0},tabbarLayout:{type:String,attr:"tabbar-layout",mutable:!0},tabbarPlacement:{type:String,attr:"tabbar-placement",mutable:!0},tabs:{state:!0},translucent:{type:Boolean,attr:"translucent"},useRouter:{type:Boolean,attr:"use-router",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0},{name:"ionNavWillLoad",method:"ionNavWillLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionNavWillChange",method:"ionNavWillChange",bubbles:!0,cancelable:!0,composed:!0},{name:"ionNavDidChange",method:"ionNavDidChange",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"ionTabMutated",method:"onTabMutated"},{name:"ionTabbarClick",method:"onTabClicked"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-ion-tabs-h{left:0;right:0;top:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;contain:layout size style;z-index:0}.tabs-inner.sc-ion-tabs{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1;contain:layout size style}"},enumerable:!0,configurable:!0}),t}(),l=-1;t.IonTab=o,t.IonTabbar=i,t.IonTabs=r,Object.defineProperty(t,"__esModule",{value:!0})});