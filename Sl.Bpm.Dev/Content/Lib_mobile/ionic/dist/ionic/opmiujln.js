/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:e}=window.Ionic;import{d as o,e as t,f as n,h as i,a as s,b as a,c as r}from"./chunk-20186de4.js";import{a as d,e as l}from"./chunk-f7b6af08.js";function c(e,o){const t=new e,n=new e;n.addElement(o.querySelector("ion-backdrop"));const i=new e;return i.addElement(o.querySelector(".loading-wrapper")),n.fromTo("opacity",.01,.3),i.fromTo("opacity",.01,1).fromTo("scale",1.1,1),Promise.resolve(t.addElement(o).easing("ease-in-out").duration(200).add(n).add(i))}function m(e,o){const t=new e,n=new e;n.addElement(o.querySelector("ion-backdrop"));const i=new e;return i.addElement(o.querySelector(".loading-wrapper")),n.fromTo("opacity",.3,0),i.fromTo("opacity",.99,0).fromTo("scale",1,.9),Promise.resolve(t.addElement(o).easing("ease-in-out").duration(200).add(n).add(i))}function p(e,o){const t=new e,n=new e;n.addElement(o.querySelector("ion-backdrop"));const i=new e;return i.addElement(o.querySelector(".loading-wrapper")),n.fromTo("opacity",.01,.5),i.fromTo("opacity",.01,1).fromTo("scale",1.1,1),Promise.resolve(t.addElement(o).easing("ease-in-out").duration(200).add(n).add(i))}function u(e,o){const t=new e,n=new e;n.addElement(o.querySelector("ion-backdrop"));const i=new e;return i.addElement(o.querySelector(".loading-wrapper")),n.fromTo("opacity",.5,0),i.fromTo("opacity",.99,0).fromTo("scale",1,.9),Promise.resolve(t.addElement(o).easing("ease-in-out").duration(200).add(n).add(i))}class h{constructor(){this.presented=!1,this.keyboardClose=!0,this.backdropDismiss=!1,this.showBackdrop=!0,this.translucent=!1,this.animated=!0}componentWillLoad(){this.spinner||(this.spinner=this.config.get("loadingSpinner","ios"===this.mode?"lines":"crescent"))}componentDidLoad(){this.ionLoadingDidLoad.emit()}componentDidUnload(){this.ionLoadingDidUnload.emit()}onBackdropTap(){this.dismiss(null,o)}async present(){await i(this,"loadingEnter",c,p,void 0),this.duration&&(this.durationTimeout=setTimeout(()=>this.dismiss(),this.duration+10))}dismiss(e,o){return this.durationTimeout&&clearTimeout(this.durationTimeout),t(this,e,o,"loadingLeave",m,u)}onDidDismiss(e){return n(this.el,"ionLoadingDidDismiss",e)}onWillDismiss(e){return n(this.el,"ionLoadingWillDismiss",e)}hostData(){const e=this.translucent?d(this.mode,"loading-translucent"):{};return{style:{zIndex:2e4+this.overlayId},class:Object.assign({},d(this.mode,"loading"),e,l(this.cssClass))}}render(){return[e("ion-backdrop",{visible:this.showBackdrop,tappable:!1}),e("div",{class:"loading-wrapper",role:"dialog"},"hide"!==this.spinner&&e("div",{class:"loading-spinner"},e("ion-spinner",{name:this.spinner})),this.message&&e("div",{class:"loading-content"},this.message))]}static get is(){return"ion-loading"}static get properties(){return{animated:{type:Boolean,attr:"animated"},animationCtrl:{connect:"ion-animation-controller"},backdropDismiss:{type:Boolean,attr:"backdrop-dismiss"},config:{context:"config"},cssClass:{type:String,attr:"css-class"},dismiss:{method:!0},duration:{type:Number,attr:"duration"},el:{elementRef:!0},enterAnimation:{type:"Any",attr:"enter-animation"},keyboardClose:{type:Boolean,attr:"keyboard-close"},leaveAnimation:{type:"Any",attr:"leave-animation"},message:{type:String,attr:"message"},onDidDismiss:{method:!0},onWillDismiss:{method:!0},overlayId:{type:Number,attr:"overlay-id"},present:{method:!0},showBackdrop:{type:Boolean,attr:"show-backdrop"},spinner:{type:String,attr:"spinner",mutable:!0},translucent:{type:Boolean,attr:"translucent"}}}static get events(){return[{name:"ionLoadingDidUnload",method:"ionLoadingDidUnload",bubbles:!0,cancelable:!0,composed:!0},{name:"ionLoadingDidLoad",method:"ionLoadingDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionLoadingDidPresent",method:"didPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionLoadingWillPresent",method:"willPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionLoadingWillDismiss",method:"willDismiss",bubbles:!0,cancelable:!0,composed:!0},{name:"ionLoadingDidDismiss",method:"didDismiss",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"ionBackdropTap",method:"onBackdropTap"}]}static get style(){return"ion-loading{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;position:fixed;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;font-family:var(--ion-font-family,inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1000}ion-loading-controller{display:none}.loading-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;opacity:0;z-index:10}.loading-md{font-size:14px}.loading-md .loading-wrapper{border-radius:2px;padding:24px;max-width:280px;max-height:90%;background:var(--ion-background-color-step-50,#f2f2f2);color:var(--ion-text-color-step-150,#262626);-webkit-box-shadow:0 16px 20px rgba(0,0,0,.4);box-shadow:0 16px 20px rgba(0,0,0,.4)}.loading-md .loading-spinner+.loading-content{margin-left:16px}.loading-md .spinner-lines-md line,.loading-md .spinner-lines-small-md line{stroke:var(--ion-color-primary,#3880ff)}.loading-md .spinner-bubbles circle,.loading-md .spinner-circles circle{fill:var(--ion-color-primary,#3880ff)}.loading-md .spinner-crescent circle{stroke:var(--ion-color-primary,#3880ff)}.loading-md .spinner-dots circle{fill:var(--ion-color-primary,#3880ff)}"}static get styleMode(){return"md"}}class g{create(e){return s(this.doc.createElement("ion-loading"),e)}dismiss(e,o,t){return a(this.doc,e,o,"ion-loading",t)}getTop(){return r(this.doc,"ion-loading")}static get is(){return"ion-loading-controller"}static get properties(){return{create:{method:!0},dismiss:{method:!0},doc:{context:"document"},getTop:{method:!0}}}}export{h as IonLoading,g as IonLoadingController};