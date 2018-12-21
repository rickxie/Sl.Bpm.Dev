/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:e}=window.Ionic;import{b as t,d as s}from"./chunk-f7b6af08.js";class n{constructor(){this.disabled=!1}valueChanged(e){this.updateButtons(),this.ionChange.emit({value:e})}segmentClick(e){const t=e.target;this.value=t.value}componentDidLoad(){if(void 0===this.value){const e=this.getButtons().find(e=>e.checked);e&&(this.value=e.value)}this.updateButtons()}updateButtons(){const e=this.value;for(const t of this.getButtons())t.checked=t.value===e}getButtons(){return Array.from(this.el.querySelectorAll("ion-segment-button"))}hostData(){return{class:Object.assign({},t(this.color),{"segment-disabled":this.disabled,"in-toolbar":s("ion-toolbar",this.el),"in-color-toolbar":s("ion-toolbar.ion-color",this.el)})}}render(){return e("slot",null)}static get is(){return"ion-segment"}static get encapsulation(){return"shadow"}static get properties(){return{color:{type:String,attr:"color"},disabled:{type:Boolean,attr:"disabled"},el:{elementRef:!0},mode:{type:String,attr:"mode"},value:{type:String,attr:"value",mutable:!0,watchCallbacks:["valueChanged"]}}}static get events(){return[{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"ionSelect",method:"segmentClick"}]}static get style(){return".sc-ion-segment-md-h{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;width:100%;font-family:var(--ion-font-family,inherit);text-align:center;--background:transparent;--background-checked:transparent;--border-color:rgba(0, 0, 0, 0.1);--color:var(--ion-toolbar-color-active, #4a4a4a);--color-checked:var(--ion-toolbar-color-active, #4a4a4a)}.segment-disabled.sc-ion-segment-md-h{pointer-events:none;opacity:.3}.sc-ion-segment-md-s > ion-segment-button{--color:inherit;--background:inherit;--border-color:inherit;--padding-top:0;--padding-end:6px;--padding-bottom:0;--padding-start:6px;--border-width:0 0 2px 0;--border-style:solid;--opacity:0.7;--transition:100ms all linear;--icon-size:26px;height:42px;font-size:12px;font-weight:500;line-height:40px;text-transform:uppercase;opacity:.7}.sc-ion-segment-md-h.ion-color .sc-ion-segment-md-s > ion-segment-button{--color:var(--ion-color-base)}.sc-ion-segment-md-s > .segment-button-checked{--color:var(--color-checked);--background:var(--background-checked);--border-color:var(--border-color-checked)}.sc-ion-segment-md-h.ion-color .sc-ion-segment-md-s > .segment-button-checked{--background:var(--ion-color-base);--border-color:var(--ion-color-base);--color:var(--ion-color-contrast);--background:transparent;--color:var(--ion-color-base)}.sc-ion-segment-md-s > .activated, .sc-ion-segment-md-s > .segment-button-checked{opacity:1}.sc-ion-segment-md-s > .segment-button-disabled{pointer-events:none;opacity:.3}.in-color-toolbar.sc-ion-segment-md-h:not(.ion-color){--color:var(--ion-color-contrast)}"}static get styleMode(){return"md"}}let o=0;class a{constructor(){this.checked=!1,this.disabled=!1,this.value="ion-sb-"+o++}checkedChanged(e,t){e&&!t&&this.ionSelect.emit()}hostData(){const{disabled:e,checked:s,color:n}=this;return{class:Object.assign({},t(n),{"segment-button-disabled":e,"segment-button-checked":s}),"ion-activable":!0}}render(){return[e("button",{type:"button","aria-pressed":this.checked?"true":null,class:"segment-button-native",disabled:this.disabled,onClick:()=>this.checked=!0},e("slot",null),"md"===this.mode&&e("ion-ripple-effect",null))]}static get is(){return"ion-segment-button"}static get encapsulation(){return"shadow"}static get properties(){return{checked:{type:Boolean,attr:"checked",mutable:!0,watchCallbacks:["checkedChanged"]},color:{type:String,attr:"color"},disabled:{type:Boolean,attr:"disabled"},el:{elementRef:!0},mode:{type:String,attr:"mode"},value:{type:String,attr:"value"}}}static get events(){return[{name:"ionSelect",method:"ionSelect",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".sc-ion-segment-button-h{--padding-start:0;--padding-end:0;--padding-top:0;--padding-bottom:0;--icon-size:1em;-webkit-box-flex:1;-ms-flex:1;flex:1;color:var(--color);text-decoration:none;text-overflow:ellipsis;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}.sc-ion-segment-button-h:first-of-type   .segment-button-native.sc-ion-segment-button{--padding-end:0;border-top-left-radius:var(--border-radius);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--border-radius)}.sc-ion-segment-button-h:not(:first-of-type)   .segment-button-native.sc-ion-segment-button{border-left-width:0}.sc-ion-segment-button-h:last-of-type   .segment-button-native.sc-ion-segment-button{--padding-start:0;border-top-left-radius:0;border-top-right-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);border-bottom-left-radius:0}.segment-button-native.sc-ion-segment-button{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin:var(--margin-top) var(--margin-end) var(--margin-bottom) var(--margin-start);padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:block;position:relative;width:100%;height:100%;-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);color:inherit;contain:content;cursor:pointer;overflow:hidden}.segment-button-native.sc-ion-segment-button:active, .segment-button-native.sc-ion-segment-button:focus{outline:0}.sc-ion-segment-button-s > ion-icon{font-size:var(--icon-size)}"}}export{n as IonSegment,a as IonSegmentButton};