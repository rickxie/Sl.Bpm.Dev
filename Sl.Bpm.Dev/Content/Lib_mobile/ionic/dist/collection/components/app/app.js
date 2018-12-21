import { isPlatform } from '../../utils/platform';
export class App {
    componentDidLoad() {
        setTimeout(() => {
            importTapClick(this.win);
            importInputShims(this.win, this.config);
            importStatusTap(this.win, this.queue);
        }, 32);
    }
    hostData() {
        return {
            class: {
                'ion-page': true,
            }
        };
    }
    static get is() { return "ion-app"; }
    static get properties() { return {
        "config": {
            "context": "config"
        },
        "el": {
            "elementRef": true
        },
        "queue": {
            "context": "queue"
        },
        "win": {
            "context": "window"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-app:**/"; }
}
async function importStatusTap(win, queue) {
    if (isPlatform(win, 'hybrid')) {
        (await import('../../utils/status-tap')).startStatusTap(win, queue);
    }
}
async function importTapClick(win) {
    (await import('../../utils/tap-click')).startTapClick(win.document);
}
async function importInputShims(win, config) {
    const inputShims = config.getBoolean('inputShims', needInputShims(win));
    if (inputShims) {
        (await import('../../utils/input-shims/input-shims')).startInputShims(win.document, config);
    }
}
function needInputShims(win) {
    return isPlatform(win, 'ios') && isPlatform(win, 'mobile');
}
