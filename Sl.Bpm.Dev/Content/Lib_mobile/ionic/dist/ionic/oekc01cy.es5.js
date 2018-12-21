/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
var __awaiter=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,u)}c((r=r.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Ionic.loadBundle("oekc01cy",["require","exports","./chunk-e8e6f3b6.js","./chunk-db50cf96.js"],function(e,t,n,r){window.Ionic.h;var o=function(){function t(){}return t.prototype.componentDidLoad=function(){var t=this;setTimeout(function(){!function(t){__awaiter(this,void 0,void 0,function(){return __generator(this,function(n){switch(n.label){case 0:return[4,new Promise(function(t,n){e(["./tap-click.js"],t,n)})];case 1:return n.sent().startTapClick(t.document),[2]}})})}(t.win),function(t,r){__awaiter(this,void 0,void 0,function(){return __generator(this,function(o){switch(o.label){case 0:return r.getBoolean("inputShims",function(e){return n.isPlatform(e,"ios")&&n.isPlatform(e,"mobile")}(t))?[4,new Promise(function(t,n){e(["./input-shims.js"],t,n)})]:[3,2];case 1:o.sent().startInputShims(t.document,r),o.label=2;case 2:return[2]}})})}(t.win,t.config),function(t,r){__awaiter(this,void 0,void 0,function(){return __generator(this,function(o){switch(o.label){case 0:return n.isPlatform(t,"hybrid")?[4,new Promise(function(t,n){e(["./status-tap.js"],t,n)})]:[3,2];case 1:o.sent().startStatusTap(t,r),o.label=2;case 2:return[2]}})})}(t.win,t.queue)},32)},t.prototype.hostData=function(){return{class:{"ion-page":!0}}},Object.defineProperty(t,"is",{get:function(){return"ion-app"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{config:{context:"config"},el:{elementRef:!0},queue:{context:"queue"},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"html.plt-mobile ion-app{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"},enumerable:!0,configurable:!0}),t}(),i=function(){function e(){this.translucent=!1}return e.prototype.hostData=function(){var e=r.createThemedClasses(this.mode,"footer"),t=this.translucent?r.createThemedClasses(this.mode,"footer-translucent"):null;return{class:Object.assign({},e,t)}},Object.defineProperty(e,"is",{get:function(){return"ion-footer"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{mode:{type:String,attr:"mode"},translucent:{type:Boolean,attr:"translucent"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-footer{display:block;position:relative;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;width:100%;z-index:10}ion-footer ion-toolbar:last-child{padding-bottom:var(--ion-safe-area-bottom,0)}.footer-md::before{left:0;top:-2px;bottom:auto;background-position:left 0 top 0;position:absolute;width:100%;height:2px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==);background-repeat:repeat-x;content:\"\"}.footer-md[no-border]::before{display:none}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"md"},enumerable:!0,configurable:!0}),e}(),a=function(){function e(){this.translucent=!1}return e.prototype.hostData=function(){var e=r.createThemedClasses(this.mode,"header"),t=this.translucent?r.createThemedClasses(this.mode,"header-translucent"):null;return{class:Object.assign({},e,t)}},Object.defineProperty(e,"is",{get:function(){return"ion-header"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{mode:{type:String,attr:"mode"},translucent:{type:Boolean,attr:"translucent"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-header{display:block;position:relative;-webkit-box-ordinal-group:0;-ms-flex-order:-1;order:-1;width:100%;z-index:10}ion-header ion-toolbar:first-child{padding-top:var(--ion-safe-area-top,0)}.header-md::after{left:0;bottom:-5px;background-position:left 0 top -2px;position:absolute;width:100%;height:5px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==);background-repeat:repeat-x;content:\"\"}.header-md[no-border]::after{display:none}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"md"},enumerable:!0,configurable:!0}),e}();t.IonApp=o,t.IonFooter=i,t.IonHeader=a,Object.defineProperty(t,"__esModule",{value:!0})});