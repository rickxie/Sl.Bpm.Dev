/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:n}=window.Ionic;function i(){return!!window.TapticEngine}function t(){const n=window.TapticEngine;n&&n.selection()}function o(){const n=window.TapticEngine;n&&n.gestureSelectionStart()}function c(){const n=window.TapticEngine;n&&n.gestureSelectionChanged()}function e(){const n=window.TapticEngine;n&&n.gestureSelectionEnd()}function a(n){const i=window.TapticEngine;i&&i.notification(n)}function s(n){const i=window.TapticEngine;i&&i.impact(n)}export{c as a,e as b,o as c,t as d,i as e,a as f,s as g};