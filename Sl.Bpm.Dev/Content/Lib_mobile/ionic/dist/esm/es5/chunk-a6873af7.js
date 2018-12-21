var PLATFORMS_MAP = { ipad: isIpad, iphone: isIphone, ios: isIOS, android: isAndroid, phablet: isPhablet, tablet: isTablet, cordova: isCordova, capacitor: isCapacitorNative, electron: isElectron, pwa: isPWA, mobile: isMobile, desktop: isDesktop, hybrid: isHybrid };
function getPlatforms(t) { return t.Ionic.platforms; }
function isPlatform(t, i) { return getPlatforms(t).includes(i); }
function setupPlatforms(t) { var i = t.Ionic.platforms; if (null == i) {
    i = t.Ionic.platforms = detectPlatforms(t);
    var n_1 = t.document.documentElement.classList;
    i.forEach(function (t) { return n_1.add("plt-" + t); });
} }
function detectPlatforms(t) { return Object.keys(PLATFORMS_MAP).filter(function (i) { return PLATFORMS_MAP[i](t); }); }
function isIpad(t) { return testUserAgent(t, /iPad/i); }
function isIphone(t) { return testUserAgent(t, /iPhone/i); }
function isIOS(t) { return testUserAgent(t, /iPad|iPhone|iPod/i); }
function isAndroid(t) { return testUserAgent(t, /android|sink/i); }
function isPhablet(t) { var i = t.innerWidth, n = t.innerHeight, e = Math.min(i, n), o = Math.max(i, n); return e > 390 && e < 520 && o > 620 && o < 800; }
function isTablet(t) { var i = t.innerWidth, n = t.innerHeight, e = Math.min(i, n), o = Math.max(i, n); return e > 460 && e < 820 && o > 780 && o < 1400; }
function isMobile(t) { return matchMedia(t, "(any-pointer:coarse)"); }
function isDesktop(t) { return !isMobile(t); }
function isHybrid(t) { return isCordova(t) || isCapacitorNative(t); }
function isCordova(t) { var i = t; return !!(i.cordova || i.phonegap || i.PhoneGap); }
function isCapacitorNative(t) { var i = t.Capacitor; return !(!i || !i.isNative); }
function isElectron(t) { return testUserAgent(t, /electron/); }
function isPWA(t) { return t.matchMedia("(display-mode: standalone)").matches; }
function testUserAgent(t, i) { return i.test(t.navigator.userAgent); }
function matchMedia(t, i) { return t.matchMedia(i).matches; }
export { isPlatform as a, PLATFORMS_MAP as b, getPlatforms as c, setupPlatforms as d };
