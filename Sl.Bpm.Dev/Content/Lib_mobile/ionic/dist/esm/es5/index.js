export { k as reorderArray, b as hasShadowDom, d as renderHiddenInput, h as clamp, g as assert, a as now, j as pointerCoord, f as isEndSide, c as deferEvent, e as debounceEvent, i as debounce } from "./chunk-42163827.js";
export { e as hapticAvailable, d as hapticSelection, c as hapticSelectionStart, a as hapticSelectionChanged, b as hapticSelectionEnd, f as hapticNotification, g as hapticImpact } from "./chunk-cdc81b9c.js";
export { a as attachComponent, b as detachComponent } from "./chunk-d3dac993.js";
export { b as PLATFORMS_MAP, c as getPlatforms, a as isPlatform, d as setupPlatforms } from "./chunk-a6873af7.js";
function setupConfig(o) { var n = window, t = n.Ionic; if (!t || !t.config || "Object" === t.config.constructor.name)
    return n.Ionic = n.Ionic || {}, n.Ionic.config = Object.assign({}, n.Ionic.config, o), n.Ionic.config; console.error("ionic config was already initialized"); }
var IONIC_PREFIX = "ionic:", IONIC_SESSION_KEY = "ionic-persist-config";
function configFromSession() { try {
    var o = window.sessionStorage.getItem(IONIC_SESSION_KEY);
    return o ? JSON.parse(o) : {};
}
catch (o) {
    return {};
} }
function saveConfig(o) { try {
    window.sessionStorage.setItem(IONIC_SESSION_KEY, JSON.stringify(o));
}
catch (o) {
    return;
} }
function configFromURL() { var o = {}; return window.location.search.slice(1).split("&").map(function (o) { return o.split("="); }).map(function (_a) {
    var o = _a[0], n = _a[1];
    return [decodeURIComponent(o), decodeURIComponent(n)];
}).filter(function (_a) {
    var o = _a[0];
    return startsWith(o, IONIC_PREFIX);
}).map(function (_a) {
    var o = _a[0], n = _a[1];
    return [o.slice(IONIC_PREFIX.length), n];
}).forEach(function (_a) {
    var n = _a[0], t = _a[1];
    o[n] = t;
}), o; }
function startsWith(o, n) { return o.substr(0, n.length) === n; }
export { setupConfig, configFromSession, saveConfig, configFromURL };
