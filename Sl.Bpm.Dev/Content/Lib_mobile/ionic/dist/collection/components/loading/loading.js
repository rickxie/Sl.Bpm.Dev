import { BACKDROP, dismiss, eventMethod, present } from '../../utils/overlays';
import { createThemedClasses, getClassMap } from '../../utils/theme';
import { iosEnterAnimation } from './animations/ios.enter';
import { iosLeaveAnimation } from './animations/ios.leave';
import { mdEnterAnimation } from './animations/md.enter';
import { mdLeaveAnimation } from './animations/md.leave';
export class Loading {
    constructor() {
        this.presented = false;
        /** If true, the loading will blur any inputs and hide the keyboard */
        this.keyboardClose = true;
        /**
         * If true, the loading indicator will be dismissed when the backdrop is clicked. Defaults to `false`.
         */
        this.backdropDismiss = false;
        /**
         * If true, a backdrop will be displayed behind the loading indicator. Defaults to `true`.
         */
        this.showBackdrop = true;
        /**
         * If true, the loading indicator will be translucent. Defaults to `false`.
         */
        this.translucent = false;
        /**
         * If true, the loading indicator will animate. Defaults to `true`.
         */
        this.animated = true;
    }
    componentWillLoad() {
        if (!this.spinner) {
            this.spinner = this.config.get('loadingSpinner', this.mode === 'ios' ? 'lines' : 'crescent');
        }
    }
    componentDidLoad() {
        this.ionLoadingDidLoad.emit();
    }
    componentDidUnload() {
        this.ionLoadingDidUnload.emit();
    }
    onBackdropTap() {
        this.dismiss(null, BACKDROP);
    }
    /**
     * Present the loading overlay after it has been created.
     */
    async present() {
        await present(this, 'loadingEnter', iosEnterAnimation, mdEnterAnimation, undefined);
        if (this.duration) {
            this.durationTimeout = setTimeout(() => this.dismiss(), this.duration + 10);
        }
    }
    /**
     * Dismiss the loading overlay after it has been presented.
     */
    dismiss(data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return dismiss(this, data, role, 'loadingLeave', iosLeaveAnimation, mdLeaveAnimation);
    }
    /**
     * Returns a promise that resolves when the loading did dismiss. It also accepts a callback
     * that is called in the same circumstances.
     */
    onDidDismiss(callback) {
        return eventMethod(this.el, 'ionLoadingDidDismiss', callback);
    }
    /**
     * Returns a promise that resolves when the loading will dismiss. It also accepts a callback
     * that is called in the same circumstances.
     */
    onWillDismiss(callback) {
        return eventMethod(this.el, 'ionLoadingWillDismiss', callback);
    }
    hostData() {
        const themedClasses = this.translucent
            ? createThemedClasses(this.mode, 'loading-translucent')
            : {};
        return {
            style: {
                zIndex: 20000 + this.overlayId
            },
            class: Object.assign({}, createThemedClasses(this.mode, 'loading'), themedClasses, getClassMap(this.cssClass))
        };
    }
    render() {
        return [
            h("ion-backdrop", { visible: this.showBackdrop, tappable: false }),
            h("div", { class: "loading-wrapper", role: "dialog" },
                this.spinner !== 'hide' && (h("div", { class: "loading-spinner" },
                    h("ion-spinner", { name: this.spinner }))),
                this.message && h("div", { class: "loading-content" }, this.message))
        ];
    }
    static get is() { return "ion-loading"; }
    static get properties() { return {
        "animated": {
            "type": Boolean,
            "attr": "animated"
        },
        "animationCtrl": {
            "connect": "ion-animation-controller"
        },
        "backdropDismiss": {
            "type": Boolean,
            "attr": "backdrop-dismiss"
        },
        "config": {
            "context": "config"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "dismiss": {
            "method": true
        },
        "duration": {
            "type": Number,
            "attr": "duration"
        },
        "el": {
            "elementRef": true
        },
        "enterAnimation": {
            "type": "Any",
            "attr": "enter-animation"
        },
        "keyboardClose": {
            "type": Boolean,
            "attr": "keyboard-close"
        },
        "leaveAnimation": {
            "type": "Any",
            "attr": "leave-animation"
        },
        "message": {
            "type": String,
            "attr": "message"
        },
        "onDidDismiss": {
            "method": true
        },
        "onWillDismiss": {
            "method": true
        },
        "overlayId": {
            "type": Number,
            "attr": "overlay-id"
        },
        "present": {
            "method": true
        },
        "showBackdrop": {
            "type": Boolean,
            "attr": "show-backdrop"
        },
        "spinner": {
            "type": String,
            "attr": "spinner",
            "mutable": true
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get events() { return [{
            "name": "ionLoadingDidUnload",
            "method": "ionLoadingDidUnload",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionLoadingDidLoad",
            "method": "ionLoadingDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionLoadingDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionLoadingWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionLoadingWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionLoadingDidDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionBackdropTap",
            "method": "onBackdropTap"
        }]; }
    static get style() { return "/**style-placeholder:ion-loading:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-loading:**/"; }
}
