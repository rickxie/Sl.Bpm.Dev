export function setupConfig(config) {
    const win = window;
    const Ionic = win.Ionic;
    if (Ionic && Ionic.config && Ionic.config.constructor.name !== 'Object') {
        console.error('ionic config was already initialized');
        return;
    }
    win.Ionic = win.Ionic || {};
    win.Ionic.config = Object.assign({}, win.Ionic.config, config);
    return win.Ionic.config;
}
const IONIC_PREFIX = 'ionic:';
const IONIC_SESSION_KEY = 'ionic-persist-config';
export function configFromSession() {
    try {
        const configStr = window.sessionStorage.getItem(IONIC_SESSION_KEY);
        return configStr ? JSON.parse(configStr) : {};
    }
    catch (_a) {
        return {};
    }
}
export function saveConfig(config) {
    try {
        window.sessionStorage.setItem(IONIC_SESSION_KEY, JSON.stringify(config));
    }
    catch (_a) {
        return;
    }
}
export function configFromURL() {
    const config = {};
    const win = window;
    win.location.search.slice(1)
        .split('&')
        .map(entry => entry.split('='))
        .map(([key, value]) => [decodeURIComponent(key), decodeURIComponent(value)])
        .filter(([key]) => startsWith(key, IONIC_PREFIX))
        .map(([key, value]) => [key.slice(IONIC_PREFIX.length), value])
        .forEach(([key, value]) => {
        config[key] = value;
    });
    return config;
}
function startsWith(input, search) {
    return input.substr(0, search.length) === search;
}
