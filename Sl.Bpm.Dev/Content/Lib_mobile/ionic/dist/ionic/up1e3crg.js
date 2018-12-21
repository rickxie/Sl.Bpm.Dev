/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:e}=window.Ionic;import{a as t}from"./chunk-f7b6af08.js";class s{constructor(){this.appliedStyles=!1,this.didStart=!1,this.progress=0,this.state=1,this.pullMin=60,this.pullMax=this.pullMin+60,this.closeDuration="280ms",this.snapbackDuration="280ms",this.disabled=!1}disabledChanged(){this.gesture&&this.gesture.setDisabled(this.disabled)}async componentDidLoad(){if("fixed"!==this.el.getAttribute("slot"))return void console.error('Make sure you use: <ion-refresher slot="fixed">');const e=this.el.closest("ion-content");e?(await e.componentOnReady(),this.scrollEl=e.getScrollElement()):console.error("ion-refresher did not attach, make sure the parent is an ion-content."),this.gesture=(await import("./gesture.js")).createGesture({el:this.el.closest("ion-content"),queue:this.queue,gestureName:"refresher",gesturePriority:10,direction:"y",threshold:20,passive:!1,canStart:this.canStart.bind(this),onStart:this.onStart.bind(this),onMove:this.onMove.bind(this),onEnd:this.onEnd.bind(this)}),this.disabledChanged()}componentDidUnload(){this.scrollEl=void 0}complete(){this.close(32,"120ms")}cancel(){this.close(16,"")}getProgress(){return this.progress}canStart(){return!(!this.scrollEl||1!==this.state||this.scrollEl.scrollTop>0)}onStart(){console.log("start"),this.progress=0,this.state=1}onMove(e){if(!this.scrollEl)return 0;const t=e.event;if(t.touches&&t.touches.length>1)return 1;if(56&this.state)return 2;const s=e.deltaY;if(s<=0)return this.progress=0,this.state=1,this.appliedStyles?(this.setCss(0,"",!1,""),5):6;if(1===this.state){if(this.scrollEl.scrollTop>0)return this.progress=0,7;this.state=2}if(t.preventDefault(),this.setCss(s,"0ms",!0,""),!s)return this.progress=0,8;const i=this.pullMin;return this.progress=s/i,this.didStart||(this.didStart=!0,this.ionStart.emit()),this.ionPull.emit(),s<i?(this.state=2,2):s>this.pullMax?(this.beginRefresh(),3):(this.state=4,4)}onEnd(){4===this.state?this.beginRefresh():2===this.state&&this.cancel()}beginRefresh(){this.state=8,this.setCss(this.pullMin,this.snapbackDuration,!0,""),this.ionRefresh.emit()}close(e,t){setTimeout(()=>{this.state=1,this.progress=0,this.didStart=!1,this.setCss(0,"0ms",!1,"")},600),this.state=e,this.setCss(0,"",!0,t)}setCss(e,t,s,i){this.appliedStyles=e>0,this.queue.write(()=>{if(this.scrollEl){const r=this.scrollEl.style;r.transform=e>0?`translateY(${e}px) translateZ(0px)`:"translateZ(0px)",r.transitionDuration=t,r.transitionDelay=i,r.overflow=s?"hidden":""}})}hostData(){return{slot:"fixed",class:Object.assign({},t(this.mode,"refresher"),{"refresher-active":1!==this.state,"refresher-pulling":2===this.state,"refresher-ready":4===this.state,"refresher-refreshing":8===this.state,"refresher-cancelling":16===this.state,"refresher-completing":32===this.state})}}static get is(){return"ion-refresher"}static get properties(){return{cancel:{method:!0},closeDuration:{type:String,attr:"close-duration"},complete:{method:!0},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},el:{elementRef:!0},getProgress:{method:!0},pullMax:{type:Number,attr:"pull-max"},pullMin:{type:Number,attr:"pull-min"},queue:{context:"queue"},snapbackDuration:{type:String,attr:"snapback-duration"},state:{state:!0}}}static get events(){return[{name:"ionRefresh",method:"ionRefresh",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPull",method:"ionPull",bubbles:!0,cancelable:!0,composed:!0},{name:"ionStart",method:"ionStart",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"ion-refresher{left:0;top:0;display:none;position:absolute;width:100%;height:60px;z-index:0}ion-refresher.refresher-active{display:block}ion-refresher-content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:100%}.refresher-pulling,.refresher-refreshing{display:none;width:100%}.refresher-pulling-icon,.refresher-refreshing-icon{-webkit-transform-origin:center;transform-origin:center;-webkit-transition:.2s;transition:.2s;font-size:30px;text-align:center}.refresher-pulling-text,.refresher-refreshing-text{font-size:16px;text-align:center}.refresher-pulling ion-refresher-content .refresher-pulling,.refresher-ready ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling-icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.refresher-cancelling ion-refresher-content .refresher-pulling,.refresher-refreshing ion-refresher-content .refresher-refreshing{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-completing ion-refresher-content .refresher-refreshing{display:block}.refresher-completing ion-refresher-content .refresher-refreshing-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-ios .refresher-pulling-icon,.refresher-ios .refresher-pulling-text,.refresher-ios .refresher-refreshing-icon,.refresher-ios .refresher-refreshing-text{color:var(--ion-text-color,#000)}.refresher-ios .refresher-refreshing .spinner-crescent circle,.refresher-ios .refresher-refreshing .spinner-lines-ios line,.refresher-ios .refresher-refreshing .spinner-lines-small-ios line{stroke:var(--ion-text-color,#000)}.refresher-ios .refresher-refreshing .spinner-bubbles circle,.refresher-ios .refresher-refreshing .spinner-circles circle,.refresher-ios .refresher-refreshing .spinner-dots circle{fill:var(--ion-text-color,#000)}"}static get styleMode(){return"ios"}}class i{componentDidLoad(){this.pullingIcon||(this.pullingIcon=this.config.get("refreshingIcon","arrow-down")),this.refreshingSpinner||(this.refreshingSpinner=this.config.get("refreshingSpinner",this.config.get("spinner","lines")))}render(){return[e("div",{class:"refresher-pulling"},this.pullingIcon&&e("div",{class:"refresher-pulling-icon"},e("ion-icon",{icon:this.pullingIcon,lazy:!1})),this.pullingText&&e("div",{class:"refresher-pulling-text",innerHTML:this.pullingText})),e("div",{class:"refresher-refreshing"},this.refreshingSpinner&&e("div",{class:"refresher-refreshing-icon"},e("ion-spinner",{name:this.refreshingSpinner})),this.refreshingText&&e("div",{class:"refresher-refreshing-text",innerHTML:this.refreshingText}))]}static get is(){return"ion-refresher-content"}static get properties(){return{config:{context:"config"},pullingIcon:{type:String,attr:"pulling-icon",mutable:!0},pullingText:{type:String,attr:"pulling-text"},refreshingSpinner:{type:String,attr:"refreshing-spinner",mutable:!0},refreshingText:{type:String,attr:"refreshing-text"}}}}export{s as IonRefresher,i as IonRefresherContent};