/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;class e{srcChanged(){this.addIO()}componentDidLoad(){this.addIO()}addIO(){this.src&&("IntersectionObserver"in window?(this.removeIO(),this.io=new IntersectionObserver(t=>{t[0].isIntersecting&&(this.loadSrc=this.src,this.removeIO(),this.ionImgDidLoad.emit())}),this.io.observe(this.el)):setTimeout(()=>this.loadSrc=this.src,200))}removeIO(){this.io&&(this.io.disconnect(),this.io=void 0)}render(){return t("img",{src:this.loadSrc,alt:this.alt,decoding:"async"})}static get is(){return"ion-img"}static get encapsulation(){return"shadow"}static get properties(){return{alt:{type:String,attr:"alt"},el:{elementRef:!0},loadSrc:{state:!0},src:{type:String,attr:"src",watchCallbacks:["srcChanged"]}}}static get events(){return[{name:"ionImgDidLoad",method:"ionImgDidLoad",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".sc-ion-img-h{display:block;-o-object-fit:contain;object-fit:contain}img.sc-ion-img{width:100%;height:100%;-o-object-fit:inherit;object-fit:inherit;-o-object-position:inherit;object-position:inherit}"}}export{e as IonImg};