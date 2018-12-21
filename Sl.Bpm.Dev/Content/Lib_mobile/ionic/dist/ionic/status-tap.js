/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:n}=window.Ionic;function t(n,t){n.addEventListener("statusTap",()=>{t.read(()=>{const e=n.innerWidth,o=n.innerHeight,i=n.document.elementFromPoint(e/2,o/2);if(!i)return;const c=i.closest("ion-content");c&&c.componentOnReady().then(()=>{t.write(()=>{c.scrollToTop(300)})})})})}export{t as startStatusTap};