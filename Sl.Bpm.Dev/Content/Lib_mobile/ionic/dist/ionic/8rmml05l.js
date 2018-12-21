/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;import{h as e,e as i,c as s}from"./chunk-42163827.js";import{b as a,d as n}from"./chunk-f7b6af08.js";class r{constructor(){this.noUpdate=!1,this.hasFocus=!1,this.ratioA=0,this.ratioB=0,this.debounce=0,this.name="",this.dualKnobs=!1,this.min=0,this.max=100,this.pin=!1,this.snaps=!1,this.step=1,this.disabled=!1,this.value=0}debounceChanged(){this.ionChange=i(this.ionChange,this.debounce)}disabledChanged(){this.gesture&&this.gesture.setDisabled(this.disabled),this.emitStyle()}valueChanged(t){this.noUpdate||this.updateRatio(),this.ionChange.emit({value:t})}componentWillLoad(){this.ionStyle=s(this.ionStyle),this.updateRatio(),this.debounceChanged(),this.emitStyle()}async componentDidLoad(){this.gesture=(await import("./gesture.js")).createGesture({el:this.rangeSlider,queue:this.queue,gestureName:"range",gesturePriority:100,threshold:0,onStart:this.onStart.bind(this),onMove:this.onMove.bind(this),onEnd:this.onEnd.bind(this)}),this.gesture.setDisabled(this.disabled)}keyChng(t){let e=this.step;e=e>0?e:1,e/=this.max-this.min,t.detail.isIncrease||(e*=-1),"A"===t.detail.knob?this.ratioA+=e:this.ratioB+=e,this.updateValue()}handleKeyboard(t,e){let i=this.step;i=i>0?i:1,i/=this.max-this.min,e||(i*=-1),"A"===t?this.ratioA+=i:this.ratioB+=i,this.updateValue()}getValue(){const t=this.value||0;return this.dualKnobs?"object"==typeof t?t:{lower:0,upper:t}:"object"==typeof t?t.upper:t}emitStyle(){this.ionStyle.emit({"interactive-disabled":this.disabled})}fireBlur(){this.hasFocus&&(this.hasFocus=!1,this.ionBlur.emit(),this.emitStyle())}fireFocus(){this.hasFocus||(this.hasFocus=!0,this.ionFocus.emit(),this.emitStyle())}onStart(t){this.fireFocus();const i=this.rect=this.rangeSlider.getBoundingClientRect(),s=t.currentX,a=e(0,(s-i.left)/i.width,1);this.pressedKnob=!this.dualKnobs||Math.abs(this.ratioA-a)<Math.abs(this.ratioB-a)?"A":"B",this.update(s)}onMove(t){this.update(t.currentX)}onEnd(t){this.update(t.currentX),this.pressedKnob=void 0,this.fireBlur()}update(t){const i=this.rect;let s=e(0,(t-i.left)/i.width,1);this.snaps&&(s=l(h(s,this.min,this.max,this.step),this.min,this.max)),"A"===this.pressedKnob?this.ratioA=s:this.ratioB=s,this.updateValue()}get valA(){return h(this.ratioA,this.min,this.max,this.step)}get valB(){return h(this.ratioB,this.min,this.max,this.step)}get ratioLower(){return this.dualKnobs?Math.min(this.ratioA,this.ratioB):0}get ratioUpper(){return this.dualKnobs?Math.max(this.ratioA,this.ratioB):this.ratioA}updateRatio(){const t=this.getValue(),{min:e,max:i}=this;this.dualKnobs?(this.ratioA=l(t.lower,e,i),this.ratioB=l(t.upper,e,i)):this.ratioA=l(t,e,i)}updateValue(){this.noUpdate=!0;const{valA:t,valB:e}=this;this.value=this.dualKnobs?{lower:Math.min(t,e),upper:Math.max(t,e)}:t,this.noUpdate=!1}hostData(){return{class:Object.assign({},a(this.color),{"in-item":n(".item",this.el),"range-disabled":this.disabled,"range-pressed":void 0!==this.pressedKnob,"range-has-pin":this.pin})}}render(){const{min:e,max:i,step:s,ratioLower:a,ratioUpper:n}=this,r=`${100*a}%`,h=`${100-100*n}%`,d=[];if(this.snaps)for(let t=e;t<=i;t+=s){const s=l(t,e,i);d.push({ratio:s,active:s>=a&&s<=n,left:`${100*s}%`})}return[t("slot",{name:"start"}),t("div",{class:"range-slider",ref:t=>this.rangeSlider=t},d.map(e=>t("div",{style:{left:e.left},role:"presentation",class:{"range-tick":!0,"range-tick-active":e.active}})),t("div",{class:"range-bar",role:"presentation"}),t("div",{class:"range-bar range-bar-active",role:"presentation",style:{left:r,right:h}}),o({knob:"A",pressed:"A"===this.pressedKnob,value:this.valA,ratio:this.ratioA,pin:this.pin,disabled:this.disabled,handleKeyboard:this.handleKeyboard.bind(this),min:e,max:i}),this.dualKnobs&&o({knob:"B",pressed:"B"===this.pressedKnob,value:this.valB,ratio:this.ratioB,pin:this.pin,disabled:this.disabled,handleKeyboard:this.handleKeyboard.bind(this),min:e,max:i})),t("slot",{name:"end"})]}static get is(){return"ion-range"}static get encapsulation(){return"shadow"}static get properties(){return{color:{type:String,attr:"color"},debounce:{type:Number,attr:"debounce",watchCallbacks:["debounceChanged"]},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},dualKnobs:{type:Boolean,attr:"dual-knobs"},el:{elementRef:!0},max:{type:Number,attr:"max"},min:{type:Number,attr:"min"},mode:{type:String,attr:"mode"},name:{type:String,attr:"name"},pin:{type:Boolean,attr:"pin"},pressedKnob:{state:!0},queue:{context:"queue"},ratioA:{state:!0},ratioB:{state:!0},snaps:{type:Boolean,attr:"snaps"},step:{type:Number,attr:"step"},value:{type:Number,attr:"value",mutable:!0,watchCallbacks:["valueChanged"]}}}static get events(){return[{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0},{name:"ionStyle",method:"ionStyle",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"ionIncrease",method:"keyChng"},{name:"ionDecrease",method:"keyChng"}]}static get style(){return":host{--knob-handle-size:calc(var(--knob-size) * 2);--ion-color-base:var(--ion-color-primary, #3880ff);--ion-color-contrast:var(--ion-color-primary-contrast, #fff);display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-family:var(--ion-font-family,inherit);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;--knob-border-radius:50%;--knob-background:var(--ion-background-color, #fff);--knob-box-shadow:0 3px 1px rgba(0, 0, 0, 0.1),0 4px 8px rgba(0, 0, 0, 0.13),0 0 0 1px rgba(0, 0, 0, 0.02);--knob-size:28px;--bar-height:1px;--bar-background:var(--ion-background-color-step-250, #bfbfbf);--height:42px;padding:8px 16px}::slotted(ion-label){-webkit-box-flex:initial;-ms-flex:initial;flex:initial}::slotted(ion-icon[slot]){font-size:24px}.range-slider{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1;width:100%;height:var(--height);contain:size layout style;cursor:-webkit-grab;cursor:grab}:host(.range-pressed) .range-slider{cursor:-webkit-grabbing;cursor:grabbing}.range-pin{background:var(--ion-color-base);color:var(--ion-color-contrast);-webkit-box-sizing:border-box;box-sizing:border-box}.range-knob-handle{left:0;top:calc((var(--height) - var(--knob-handle-size))/ 2);margin-left:calc(0px - var(--knob-handle-size)/ 2);position:absolute;width:var(--knob-handle-size);height:var(--knob-handle-size);text-align:center}.range-knob-handle:active,.range-knob-handle:focus{outline:0}.range-bar{left:0;top:calc((var(--height) - var(--bar-height))/ 2);position:absolute;width:100%;height:var(--bar-height);background:var(--bar-background);pointer-events:none}.range-knob{border-radius:var(--knob-border-radius);left:calc(50% - var(--knob-size)/ 2);top:calc(50% - var(--knob-size)/ 2);position:absolute;width:var(--knob-size);height:var(--knob-size);background:var(--knob-background);-webkit-box-shadow:var(--knob-box-shadow);box-shadow:var(--knob-box-shadow);z-index:2;pointer-events:none}:host(.range-pressed) .range-bar-active{will-change:left,right}:host(.range-pressed) .range-knob-handle{will-change:left}:host(.in-item){width:100%}:host(.in-item) ::slotted(ion-label){-ms-flex-item-align:center;align-self:center}:host(.range-has-pin){padding-top:20px}.range-bar-active{bottom:0;width:auto;background:var(--ion-color-base)}.range-tick{margin-left:-.5px;border-radius:0;position:absolute;top:17.5px;width:1px;height:8px;background:var(--ion-background-color-step-250,#bfbfbf);pointer-events:none}.range-tick-active{background:var(--ion-color-base)}.range-pin{-webkit-transform:translate3d(0,28px,0) scale(.01);transform:translate3d(0,28px,0) scale(.01);padding:8px;display:inline-block;position:relative;top:-20px;min-width:28px;-webkit-transition:-webkit-transform 120ms ease;transition:-webkit-transform 120ms ease;transition:transform 120ms ease;transition:transform 120ms ease,-webkit-transform 120ms ease;background:0 0;color:var(--ion-text-color,#000);font-size:12px;text-align:center}.range-knob-pressed .range-pin{-webkit-transform:translate3d(0,0,0) scale(1);transform:translate3d(0,0,0) scale(1)}:host(.range-disabled){opacity:.5}"}static get styleMode(){return"ios"}}function o({knob:e,value:i,ratio:s,min:a,max:n,disabled:r,pressed:o,pin:h,handleKeyboard:l}){return t("div",{onKeyDown:t=>{const i=t.key;"ArrowLeft"===i||"ArrowDown"===i?(l(e,!1),t.preventDefault(),t.stopPropagation()):"ArrowRight"!==i&&"ArrowUp"!==i||(l(e,!0),t.preventDefault(),t.stopPropagation())},class:{"range-knob-handle":!0,"range-knob-pressed":o,"range-knob-min":i===a,"range-knob-max":i===n},style:{left:`${100*s}%`},role:"slider",tabindex:r?-1:0,"aria-valuemin":a,"aria-valuemax":n,"aria-disabled":r?"true":null,"aria-valuenow":i},h&&t("div",{class:"range-pin",role:"presentation"},Math.round(i)),t("div",{class:"range-knob",role:"presentation"}))}function h(t,i,s,a){let n=(s-i)*t;return a>0&&(n=Math.round(n/a)*a+i),e(i,n,s)}function l(t,i,s){return e(0,(t-i)/(s-i),1)}export{r as IonRange};