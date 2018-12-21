/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;import{a as i}from"./chunk-f7b6af08.js";class e{constructor(){this.thrPx=0,this.thrPc=0,this.didFire=!1,this.isBusy=!1,this.isLoading=!1,this.threshold="15%",this.disabled=!1,this.position="bottom"}thresholdChanged(t){t.lastIndexOf("%")>-1?(this.thrPx=0,this.thrPc=parseFloat(t)/100):(this.thrPx=parseFloat(t),this.thrPc=0)}disabledChanged(t){this.enableScrollEvents(!t)}async componentDidLoad(){const t=this.el.closest("ion-content");t&&(await t.componentOnReady(),this.scrollEl=t.getScrollElement()),this.thresholdChanged(this.threshold),this.enableScrollEvents(!this.disabled)}componentDidUnload(){this.scrollEl=void 0}onScroll(){const t=this.scrollEl;if(!t||!this.canStart())return 1;const i=this.el.offsetHeight;if(!i)return 2;const e=t.scrollTop,n=t.scrollHeight,s=t.offsetHeight,o=this.thrPc?s*this.thrPc:this.thrPx;if(("bottom"===this.position?n-i-e-o-s:e-i-o)<0){if(!this.didFire)return this.isLoading=!0,this.didFire=!0,this.ionInfinite.emit(),3}else this.didFire=!1;return 4}complete(){const t=this.scrollEl;this.isLoading&&t&&(this.isLoading=!1)}canStart(){return!(this.disabled||this.isBusy||!this.scrollEl||this.isLoading)}enableScrollEvents(t){this.scrollEl&&this.enableListener(this,"scroll",t,this.scrollEl)}hostData(){return{class:{"infinite-scroll-loading":this.isLoading,"infinite-scroll-enabled":!this.disabled}}}static get is(){return"ion-infinite-scroll"}static get properties(){return{complete:{method:!0},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},el:{elementRef:!0},enableListener:{context:"enableListener"},isLoading:{state:!0},position:{type:String,attr:"position"},queue:{context:"queue"},threshold:{type:String,attr:"threshold",watchCallbacks:["thresholdChanged"]}}}static get events(){return[{name:"ionInfinite",method:"ionInfinite",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"scroll",method:"onScroll",disabled:!0,passive:!0}]}static get style(){return"ion-infinite-scroll{display:none;width:100%}.infinite-scroll-enabled{display:block}"}}class n{componentDidLoad(){this.loadingSpinner||(this.loadingSpinner=this.config.get("infiniteLoadingSpinner",this.config.get("spinner","lines")))}hostData(){return{class:i(this.mode,"infinite-scroll-content")}}render(){return t("div",{class:"infinite-loading"},this.loadingSpinner&&t("div",{class:"infinite-loading-spinner"},t("ion-spinner",{name:this.loadingSpinner})),this.loadingText&&t("div",{class:"infinite-loading-text",innerHTML:this.loadingText}))}static get is(){return"ion-infinite-scroll-content"}static get properties(){return{config:{context:"config"},loadingSpinner:{type:String,attr:"loading-spinner",mutable:!0},loadingText:{type:String,attr:"loading-text"}}}static get style(){return"ion-infinite-scroll-content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin:0 0 32px;display:none;width:100%}.infinite-loading-text{margin:4px 32px 0}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-ios .infinite-loading-text{color:var(--ion-text-color-step-400,#666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-crescent circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-small-ios line{stroke:var(--ion-text-color-step-400,#666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-text-color-step-400,#666)}"}static get styleMode(){return"ios"}}export{e as IonInfiniteScroll,n as IonInfiniteScrollContent};