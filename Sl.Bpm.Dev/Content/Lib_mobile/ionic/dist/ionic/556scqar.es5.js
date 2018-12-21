/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("556scqar",["exports","./chunk-7525b79e.js","./chunk-db50cf96.js"],function(e,t,o){var n=window.Ionic.h,i=function(){function e(){this.isCancelVisible=!1,this.shouldAlignLeft=!0,this.focused=!1,this.animated=!1,this.autocomplete="off",this.autocorrect="off",this.cancelButtonIcon="md-arrow-back",this.cancelButtonText="Cancel",this.debounce=250,this.placeholder="Search",this.showCancelButton=!1,this.spellcheck=!1,this.type="search",this.value=""}return e.prototype.debounceChanged=function(){this.ionChange=t.debounceEvent(this.ionChange,this.debounce)},e.prototype.valueChanged=function(){var e=this.nativeInput,t=this.value;e&&e.value!==t&&(e.value=t),this.ionChange.emit({value:t})},e.prototype.componentDidLoad=function(){this.positionElements(),this.debounceChanged()},e.prototype.focus=function(){this.nativeInput&&this.nativeInput.focus()},e.prototype.clearInput=function(e){var t=this;this.ionClear.emit(),e&&(e.preventDefault(),e.stopPropagation()),setTimeout(function(){var e=t.value;void 0!==e&&""!==e&&(t.value="",t.ionInput.emit())},64)},e.prototype.cancelSearchbar=function(){this.ionCancel.emit(),this.clearInput()},e.prototype.onInput=function(e){var t=e.target;t&&(this.value=t.value),this.ionInput.emit(e)},e.prototype.onBlur=function(){this.focused=!1,this.ionBlur.emit(),this.positionElements()},e.prototype.onFocus=function(){this.focused=!0,this.ionFocus.emit(),this.positionElements()},e.prototype.positionElements=function(){var e=this.shouldAlignLeft,t=!this.animated||this.value&&""!==this.value.toString().trim()||!0===this.focused;this.shouldAlignLeft=t,"ios"===this.mode&&(e!==t&&this.positionPlaceholder(),this.animated&&this.positionCancelButton())},e.prototype.positionPlaceholder=function(){var e="rtl"===this.doc.dir,t=this.nativeInput,o=(this.el.shadowRoot||this.el).querySelector(".searchbar-search-icon");if(this.shouldAlignLeft)t.removeAttribute("style"),o.removeAttribute("style");else{var n=this.doc,i=n.createElement("span");i.innerHTML=this.placeholder,n.body.appendChild(i);var a=i.offsetWidth;i.remove();var c="calc(50% - "+a/2+"px)",s="calc(50% - "+(a/2+30)+"px)";e?(t.style.paddingRight=c,o.style.marginRight=s):(t.style.paddingLeft=c,o.style.marginLeft=s)}},e.prototype.positionCancelButton=function(){var e="rtl"===this.doc.dir,t=(this.el.shadowRoot||this.el).querySelector(".searchbar-cancel-button"),o=this.focused;if(t&&o!==this.isCancelVisible){var n=t.style;if(this.isCancelVisible=o,o)e?n.marginLeft="0":n.marginRight="0";else{var i=t.offsetWidth;i>0&&(e?n.marginLeft=-i+"px":n.marginRight=-i+"px")}}},e.prototype.hostData=function(){return{class:Object.assign({},o.createColorClasses(this.color),{"searchbar-animated":this.animated,"searchbar-has-value":""!==this.value,"searchbar-show-cancel":this.showCancelButton,"searchbar-left-aligned":this.shouldAlignLeft,"searchbar-has-focus":this.focused})}},e.prototype.render=function(){var e=this,t=this.clearIcon||("ios"===this.mode?"ios-close-circle":"md-close"),o=this.searchIcon||"search",i=this.showCancelButton?n("button",{type:"button",tabIndex:"ios"!==this.mode||this.focused?void 0:-1,onClick:this.cancelSearchbar.bind(this),class:"searchbar-cancel-button"},"md"===this.mode?n("ion-icon",{mode:this.mode,icon:this.cancelButtonIcon,lazy:!1}):this.cancelButtonText):null;return[n("div",{class:"searchbar-input-container"},n("input",{ref:function(t){return e.nativeInput=t},class:"searchbar-input",onInput:this.onInput.bind(this),onBlur:this.onBlur.bind(this),onFocus:this.onFocus.bind(this),placeholder:this.placeholder,type:this.type,value:this.value,autoComplete:this.autocomplete,autoCorrect:this.autocorrect,spellCheck:this.spellcheck}),"md"===this.mode&&i,n("ion-icon",{mode:this.mode,icon:o,lazy:!1,class:"searchbar-search-icon"}),n("button",{type:"button","no-blur":!0,class:"searchbar-clear-button",onClick:this.clearInput.bind(this),onMouseDown:this.clearInput.bind(this),onTouchStart:this.clearInput.bind(this)},n("ion-icon",{mode:this.mode,icon:t,lazy:!1,class:"searchbar-clear-icon"}))),"ios"===this.mode&&i]},Object.defineProperty(e,"is",{get:function(){return"ion-searchbar"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"scoped"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{animated:{type:Boolean,attr:"animated"},autocomplete:{type:String,attr:"autocomplete"},autocorrect:{type:String,attr:"autocorrect"},cancelButtonIcon:{type:String,attr:"cancel-button-icon"},cancelButtonText:{type:String,attr:"cancel-button-text"},clearIcon:{type:String,attr:"clear-icon"},color:{type:String,attr:"color"},debounce:{type:Number,attr:"debounce",watchCallbacks:["debounceChanged"]},doc:{context:"document"},el:{elementRef:!0},focus:{method:!0},focused:{state:!0},mode:{type:String,attr:"mode"},placeholder:{type:String,attr:"placeholder"},searchIcon:{type:String,attr:"search-icon"},showCancelButton:{type:Boolean,attr:"show-cancel-button"},spellcheck:{type:Boolean,attr:"spellcheck"},type:{type:String,attr:"type"},value:{type:String,attr:"value",mutable:!0,watchCallbacks:["valueChanged"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionInput",method:"ionInput",bubbles:!0,cancelable:!0,composed:!0},{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0},{name:"ionCancel",method:"ionCancel",bubbles:!0,cancelable:!0,composed:!0},{name:"ionClear",method:"ionClear",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{--placeholder-color:currentColor;--placeholder-font-style:inherit;--placeholder-font-weight:inherit;--placeholder-opacity:.5;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:var(--ion-font-family,inherit)}:host(.ion-color){--background:var(--ion-color-base);--color-button-clear:inherit;--color-button-cancel:inherit;--color-icon:inherit;color:var(--ion-color-contrast)}.searchbar-search-icon{color:var(--color-icon);pointer-events:none}.searchbar-input-container{display:block;position:relative;-ms-flex-negative:1;flex-shrink:1;width:100%}.searchbar-input{font-family:inherit;font-style:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;width:100%;border:0;outline:0;background:var(--background);font-family:inherit;-webkit-appearance:none;-moz-appearance:none;appearance:none}.searchbar-input::-webkit-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input:-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input::-ms-input-placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input::placeholder{color:var(--placeholder-color);font-family:inherit;font-style:var(--placeholder-font-style);font-weight:var(--placeholder-font-weight);opacity:var(--placeholder-opacity)}.searchbar-input::-webkit-search-cancel-button{display:none}.searchbar-cancel-button{color:var(--color-button-cancel)}.searchbar-clear-button{margin:0;padding:0;display:none;min-height:0;outline:0;color:var(--button-color-clear);-webkit-appearance:none;-moz-appearance:none;appearance:none}:host(.searchbar-has-value.searchbar-has-focus) .searchbar-clear-button{display:block}:host{--color-button-clear:var(--ion-text-color-step-400, #666666);--color-button-cancel:var(--ion-color-primary, #3880ff);--color-icon:var(--ion-text-color-step-400, #666666);--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.07);padding:12px;height:60px;color:var(--ion-text-color,#000);contain:strict}.searchbar-input-container{height:36px;contain:strict}.searchbar-search-icon{margin-left:calc(50% - 60px);left:8px;top:0;position:absolute;width:16px;height:100%;contain:strict}.searchbar-input{padding:0 28px;border-radius:10px;height:100%;font-size:14px;font-weight:400;contain:strict}.searchbar-clear-button{right:0;top:0;background-position:center;position:absolute;width:30px;height:100%;border:0;background-color:transparent}.searchbar-clear-icon{width:18px;height:100%}.searchbar-cancel-button{padding:0 0 0 8px;display:none;-ms-flex-negative:0;flex-shrink:0;border:0;outline:0;background-color:transparent;font-size:16px;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}:host(.searchbar-left-aligned) .searchbar-search-icon{margin-left:0}:host(.searchbar-left-aligned) .searchbar-input{padding-left:30px}:host(.searchbar-show-cancel.searchbar-animated) .searchbar-cancel-button,:host(.searchbar-show-cancel.searchbar-has-focus) .searchbar-cancel-button{display:block}:host(.searchbar-animated) .searchbar-input,:host(.searchbar-animated) .searchbar-search-icon{-webkit-transition:all .3s ease;transition:all .3s ease}:host(.searchbar-animated.searchbar-has-focus) .searchbar-cancel-button{opacity:1;pointer-events:auto}:host(.searchbar-animated) .searchbar-cancel-button{margin-right:-100%;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transition:all .3s ease;transition:all .3s ease;opacity:0;pointer-events:none}:host(.ion-color) .searchbar-cancel-button{color:var(--ion-color-base)}:host(.ion-color) .searchbar-cancel-button:hover{color:var(--ion-color-tint)}:host-context(ion-toolbar.ion-color) .searchbar-cancel-button{color:currentColor}:host-context(ion-toolbar.ion-color) .searchbar-search-icon{color:currentColor;opacity:.5}:host-context(ion-toolbar.ion-color) .searchbar-input{background:rgba(var(--ion-color-contrast-rgb),.07);color:currentColor}:host-context(ion-toolbar.ion-color) .searchbar-clear-button{color:currentColor;opacity:.5}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}();e.IonSearchbar=i,Object.defineProperty(e,"__esModule",{value:!0})});