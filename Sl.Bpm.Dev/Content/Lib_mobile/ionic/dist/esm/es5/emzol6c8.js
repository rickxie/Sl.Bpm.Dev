/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
var __awaiter=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))(function(r,i){function a(e){try{l(n.next(e))}catch(e){i(e)}}function s(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){e.done?r(e.value):new o(function(t){t(e.value)}).then(a,s)}l((n=n.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var o,n,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,n&&(r=2&i[0]?n.return:i[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,i[1])).done)return r;switch(n=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(r=(r=a.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){a.label=i[1];break}if(6===i[0]&&a.label<r[1]){a.label=r[1],r=i;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(i);break}r[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{o=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};import{h}from"./ionic.core.js";import{a as attachComponent,b as detachComponent}from"./chunk-d3dac993.js";import{d as BACKDROP,e as dismiss,f as eventMethod,h as present,a as createOverlay,b as dismissOverlay,c as getOverlay}from"./chunk-20186de4.js";import{a as createThemedClasses,e as getClassMap}from"./chunk-f7b6af08.js";import{a as deepReady}from"./chunk-c9c4a2c9.js";function iosEnterAnimation(e,t,o){var n="top",r="left",i=t.querySelector(".popover-content"),a=i.getBoundingClientRect(),s=a.width,l=a.height,p=window.innerWidth,c=window.innerHeight,d=o&&o.target&&o.target.getBoundingClientRect(),m=d&&"top"in d?d.top:c/2-l/2,u=d&&"left"in d?d.left:p/2,f=d&&d.width||0,h=d&&d.height||0,v=t.querySelector(".popover-arrow"),y=v.getBoundingClientRect(),b=y.width,P=y.height;d||(v.style.display="none");var D={top:m+h,left:u+f/2-b/2},g={top:m+h+(P-1),left:u+f/2-s/2},w=!1,O=!1;g.left<POPOVER_IOS_BODY_PADDING+25?(w=!0,g.left=POPOVER_IOS_BODY_PADDING):s+POPOVER_IOS_BODY_PADDING+g.left+25>p&&(O=!0,g.left=p-s-POPOVER_IOS_BODY_PADDING,r="right"),m+h+l>c&&m-l>0?(D.top=m-(P+1),console.log(D),console.log(m),console.log(l),g.top=m-l-(P-1),t.className=t.className+" popover-bottom",n="bottom"):m+h+l>c&&(i.style.bottom=POPOVER_IOS_BODY_PADDING+"%"),v.style.top=D.top+"px",v.style.left=D.left+"px",i.style.top=g.top+"px",i.style.left=g.left+"px",w&&(i.style.left="calc("+g.left+"px + var(--ion-safe-area-left, 0px)"),O&&(i.style.left="calc("+g.left+"px + var(--ion-safe-area-right, 0px)"),i.style.transformOrigin=n+" "+r;var _=new e,E=new e;E.addElement(t.querySelector("ion-backdrop")),E.fromTo("opacity",.01,.08);var A=new e;return A.addElement(t.querySelector(".popover-wrapper")),A.fromTo("opacity",.01,1),Promise.resolve(_.addElement(t).easing("ease").duration(100).add(E).add(A))}var POPOVER_IOS_BODY_PADDING=5;function iosLeaveAnimation(e,t){var o=new e,n=new e;n.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".popover-wrapper")),r.fromTo("opacity",.99,0),n.fromTo("opacity",.08,0),Promise.resolve(o.addElement(t).easing("ease").duration(500).add(n).add(r))}function mdEnterAnimation(e,t,o){var n="top",r="left",i=t.querySelector(".popover-content"),a=i.getBoundingClientRect(),s=a.width,l=a.height,p=window.innerWidth,c=window.innerHeight,d=o&&o.target&&o.target.getBoundingClientRect(),m=d&&"top"in d?d.top:c/2-l/2,u=d&&"left"in d?d.left:p/2-s/2,f=d&&d.height||0,h={top:m,left:u};h.left<POPOVER_MD_BODY_PADDING?h.left=POPOVER_MD_BODY_PADDING:s+POPOVER_MD_BODY_PADDING+h.left>p&&(h.left=p-s-POPOVER_MD_BODY_PADDING,r="right"),m+f+l>c&&m-l>0?(h.top=m-l,t.className=t.className+" popover-bottom",n="bottom"):m+f+l>c&&(i.style.bottom=POPOVER_MD_BODY_PADDING+"px"),i.style.top=h.top+"px",i.style.left=h.left+"px",i.style.transformOrigin=n+" "+r;var v=new e,y=new e;y.addElement(t.querySelector("ion-backdrop")),y.fromTo("opacity",.01,.08);var b=new e;b.addElement(t.querySelector(".popover-wrapper")),b.fromTo("opacity",.01,1);var P=new e;P.addElement(t.querySelector(".popover-content")),P.fromTo("scale",.001,1);var D=new e;return D.addElement(t.querySelector(".popover-viewport")),D.fromTo("opacity",.01,1),Promise.resolve(v.addElement(t).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).add(y).add(b).add(P).add(D))}var POPOVER_MD_BODY_PADDING=12;function mdLeaveAnimation(e,t){var o=new e,n=new e;n.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".popover-wrapper")),r.fromTo("opacity",.99,0),n.fromTo("opacity",.08,0),Promise.resolve(o.addElement(t).easing("ease").duration(500).add(n).add(r))}var Popover=function(){function e(){this.presented=!1,this.keyboardClose=!0,this.backdropDismiss=!0,this.showBackdrop=!0,this.translucent=!1,this.animated=!0}return e.prototype.componentDidLoad=function(){this.ionPopoverDidLoad.emit()},e.prototype.componentDidUnload=function(){this.ionPopoverDidUnload.emit()},e.prototype.onDismiss=function(e){e.stopPropagation(),e.preventDefault(),this.dismiss()},e.prototype.onBackdropTap=function(){this.dismiss(null,BACKDROP)},e.prototype.lifecycle=function(e){var t=this.usersElement,o=LIFECYCLE_MAP[e.type];if(t&&o){var n=new CustomEvent(o,{bubbles:!1,cancelable:!1,detail:e.detail});t.dispatchEvent(n)}},e.prototype.present=function(){return __awaiter(this,void 0,void 0,function(){var e,t,o;return __generator(this,function(n){switch(n.label){case 0:if(this.presented)return[2];if(!(e=this.el.querySelector(".popover-content")))throw new Error("container is undefined");return t=Object.assign({},this.componentProps,{popover:this.el}),o=this,[4,attachComponent(this.delegate,e,this.component,["popover-viewport"],t)];case 1:return o.usersElement=n.sent(),[4,deepReady(this.usersElement)];case 2:return n.sent(),[2,present(this,"popoverEnter",iosEnterAnimation,mdEnterAnimation,this.event)]}})})},e.prototype.dismiss=function(e,t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(o){switch(o.label){case 0:return[4,dismiss(this,e,t,"popoverLeave",iosLeaveAnimation,mdLeaveAnimation,this.event)];case 1:return o.sent(),[4,detachComponent(this.delegate,this.usersElement)];case 2:return o.sent(),[2]}})})},e.prototype.onDidDismiss=function(e){return eventMethod(this.el,"ionPopoverDidDismiss",e)},e.prototype.onWillDismiss=function(e){return eventMethod(this.el,"ionPopoverWillDismiss",e)},e.prototype.hostData=function(){var e=this.translucent?createThemedClasses(this.mode,"popover-translucent"):{};return{style:{zIndex:2e4+this.overlayId},"no-router":!0,class:Object.assign({},createThemedClasses(this.mode,"popover"),getClassMap(this.cssClass),e)}},e.prototype.render=function(){var e=createThemedClasses(this.mode,"popover-wrapper");return[h("ion-backdrop",{tappable:this.backdropDismiss}),h("div",{class:e},h("div",{class:"popover-arrow"}),h("div",{class:"popover-content"}))]},Object.defineProperty(e,"is",{get:function(){return"ion-popover"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{animated:{type:Boolean,attr:"animated"},animationCtrl:{connect:"ion-animation-controller"},backdropDismiss:{type:Boolean,attr:"backdrop-dismiss"},color:{type:String,attr:"color"},component:{type:String,attr:"component"},componentProps:{type:"Any",attr:"component-props"},config:{context:"config"},cssClass:{type:String,attr:"css-class"},delegate:{type:"Any",attr:"delegate"},dismiss:{method:!0},el:{elementRef:!0},enterAnimation:{type:"Any",attr:"enter-animation"},event:{type:"Any",attr:"event"},keyboardClose:{type:Boolean,attr:"keyboard-close"},leaveAnimation:{type:"Any",attr:"leave-animation"},mode:{type:String,attr:"mode"},onDidDismiss:{method:!0},onWillDismiss:{method:!0},overlayId:{type:Number,attr:"overlay-id"},present:{method:!0},showBackdrop:{type:Boolean,attr:"show-backdrop"},translucent:{type:Boolean,attr:"translucent"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionPopoverDidLoad",method:"ionPopoverDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverDidUnload",method:"ionPopoverDidUnload",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverDidPresent",method:"didPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverWillPresent",method:"willPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverWillDismiss",method:"willDismiss",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverDidDismiss",method:"didDismiss",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"ionDismiss",method:"onDismiss"},{name:"ionBackdropTap",method:"onBackdropTap"},{name:"ionPopoverDidPresent",method:"lifecycle"},{name:"ionPopoverWillPresent",method:"lifecycle"},{name:"ionPopoverWillDismiss",method:"lifecycle"},{name:"ionPopoverDidDismiss",method:"lifecycle"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-popover{left:0;right:0;top:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;z-index:1000}.popover-wrapper{opacity:0;z-index:10}.popover-content{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;overflow:auto;z-index:10}.popover-content ion-content{position:relative;contain:none}.popover-ios .popover-content{border-radius:10px;width:200px;min-width:0;min-height:0;max-height:90%;background-color:var(--ion-background-color,#fff);color:var(--ion-text-color,#000)}.popover-ios .popover-arrow{display:block;position:absolute;width:20px;height:10px;overflow:hidden}.popover-ios .popover-arrow::after{left:3px;top:3px;border-radius:3px;position:absolute;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg);background-color:var(--ion-background-color,#fff);content:\"\";z-index:10}.popover-ios.popover-bottom .popover-arrow{top:auto;bottom:-10px}.popover-ios.popover-bottom .popover-arrow::after{top:-6px}.popover-translucent-ios .popover-arrow::after,.popover-translucent-ios .popover-content{background:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}(),LIFECYCLE_MAP={ionPopoverDidPresent:"ionViewDidEnter",ionPopoverWillPresent:"ionViewWillEnter",ionPopoverWillDismiss:"ionViewWillDismiss",ionPopoverDidDismiss:"ionViewDidDismiss"},PopoverController=function(){function e(){}return e.prototype.create=function(e){return createOverlay(this.doc.createElement("ion-popover"),e)},e.prototype.dismiss=function(e,t,o){return dismissOverlay(this.doc,e,t,"ion-popover",o)},e.prototype.getTop=function(){return getOverlay(this.doc,"ion-popover")},Object.defineProperty(e,"is",{get:function(){return"ion-popover-controller"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{create:{method:!0},dismiss:{method:!0},doc:{context:"document"},getTop:{method:!0}}},enumerable:!0,configurable:!0}),e}();export{Popover as IonPopover,PopoverController as IonPopoverController};