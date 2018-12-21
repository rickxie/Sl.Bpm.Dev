/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("status-tap.js",["exports"],function(n){window.Ionic.h,n.startStatusTap=function(n,t){n.addEventListener("statusTap",function(){t.read(function(){var e=n.innerWidth,o=n.innerHeight,i=n.document.elementFromPoint(e/2,o/2);if(i){var a=i.closest("ion-content");a&&a.componentOnReady().then(function(){t.write(function(){a.scrollToTop(300)})})}})})},Object.defineProperty(n,"__esModule",{value:!0})});