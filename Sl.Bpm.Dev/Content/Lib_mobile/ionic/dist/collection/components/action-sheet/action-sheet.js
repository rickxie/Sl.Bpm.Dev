import { BACKDROP, dismiss, eventMethod, isCancel, present } from '../../utils/overlays';
import { getClassMap } from '../../utils/theme';
import { iosEnterAnimation } from './animations/ios.enter';
import { iosLeaveAnimation } from './animations/ios.leave';
import { mdEnterAnimation } from './animations/md.enter';
import { mdLeaveAnimation } from './animations/md.leave';
export class ActionSheet {
    constructor() {
        this.presented = false;
        /**
         * If the actionSheet should close the keyboard
         */
        this.keyboardClose = true;
        /**
         * If true, the action sheet will be dismissed when the backdrop is clicked. Defaults to `true`.
         */
        this.backdropDismiss = true;
        /**
         * If true, the action sheet will be translucent. Defaults to `false`.
         */
        this.translucent = false;
        /**
         * If true, the action sheet will animate. Defaults to `true`.
         */
        this.animated = true;
    }
    componentDidLoad() {
        this.ionActionSheetDidLoad.emit();
    }
    componentDidUnload() {
        this.ionActionSheetDidUnload.emit();
    }
    onBackdropTap() {
        this.dismiss(null, BACKDROP);
    }
    dispatchCancelHandler(ev) {
        const role = ev.detail.role;
        if (isCancel(role)) {
            const cancelButton = this.buttons.find(b => b.role === 'cancel');
            this.callButtonHandler(cancelButton);
        }
    }
    /**
     * Present the action sheet overlay after it has been created.
     */
    present() {
        return present(this, 'actionSheetEnter', iosEnterAnimation, mdEnterAnimation);
    }
    /**
     * Dismiss the action sheet overlay after it has been presented.
     */
    dismiss(data, role) {
        return dismiss(this, data, role, 'actionSheetLeave', iosLeaveAnimation, mdLeaveAnimation);
    }
    /**
     * Returns a promise that resolves when the action-sheet did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     */
    onDidDismiss(callback) {
        return eventMethod(this.el, 'ionActionSheetDidDismiss', callback);
    }
    /**
     * Returns a promise that resolves when the action-sheet will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     */
    onWillDismiss(callback) {
        return eventMethod(this.el, 'ionActionSheetWillDismiss', callback);
    }
    buttonClick(button) {
        const role = button.role;
        if (isCancel(role)) {
            this.dismiss(undefined, role);
            return;
        }
        const shouldDismiss = this.callButtonHandler(button);
        if (shouldDismiss) {
            this.dismiss(undefined, button.role);
        }
    }
    callButtonHandler(button) {
        if (button && button.handler) {
            // a handler has been provided, execute it
            // pass the handler the values from the inputs
            try {
                if (button.handler() === false) {
                    // if the return value of the handler is false then do not dismiss
                    return false;
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        return true;
    }
    hostData() {
        return {
            style: {
                zIndex: 20000 + this.overlayId,
            },
            class: Object.assign({}, getClassMap(this.cssClass), { 'action-sheet-translucent': this.translucent })
        };
    }
    render() {
        // TODO: move to processedButtons
        const allButtons = this.buttons.map(b => {
            return (typeof b === 'string')
                ? { text: b }
                : b;
        });
        const cancelButton = allButtons.find(b => b.role === 'cancel');
        const buttons = allButtons.filter(b => b.role !== 'cancel');
        return [
            h("ion-backdrop", { tappable: this.backdropDismiss }),
            h("div", { class: "action-sheet-wrapper", role: "dialog" },
                h("div", { class: "action-sheet-container" },
                    h("div", { class: "action-sheet-group" },
                        this.header &&
                            h("div", { class: "action-sheet-title" },
                                this.header,
                                this.subHeader && h("div", { class: "action-sheet-sub-title" }, this.subHeader)),
                        buttons.map(b => h("button", { type: "button", "ion-activable": true, class: buttonClass(b), onClick: () => this.buttonClick(b) },
                            h("span", { class: "action-sheet-button-inner" },
                                b.icon && h("ion-icon", { icon: b.icon, lazy: false, class: "action-sheet-icon" }),
                                b.text)))),
                    cancelButton &&
                        h("div", { class: "action-sheet-group action-sheet-group-cancel" },
                            h("button", { "ion-activable": true, type: "button", class: buttonClass(cancelButton), onClick: () => this.buttonClick(cancelButton) },
                                h("span", { class: "action-sheet-button-inner" },
                                    cancelButton.icon &&
                                        h("ion-icon", { icon: cancelButton.icon, lazy: false, class: "action-sheet-icon" }),
                                    cancelButton.text)))))
        ];
    }
    static get is() { return "ion-action-sheet"; }
    static get encapsulation() { return "scoped"; }
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
        "buttons": {
            "type": "Any",
            "attr": "buttons"
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
        "el": {
            "elementRef": true
        },
        "enterAnimation": {
            "type": "Any",
            "attr": "enter-animation"
        },
        "header": {
            "type": String,
            "attr": "header"
        },
        "keyboardClose": {
            "type": Boolean,
            "attr": "keyboard-close"
        },
        "leaveAnimation": {
            "type": "Any",
            "attr": "leave-animation"
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
        "subHeader": {
            "type": String,
            "attr": "sub-header"
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get events() { return [{
            "name": "ionActionSheetDidLoad",
            "method": "ionActionSheetDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionActionSheetDidUnload",
            "method": "ionActionSheetDidUnload",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionActionSheetDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionActionSheetWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionActionSheetWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionActionSheetDidDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionBackdropTap",
            "method": "onBackdropTap"
        }, {
            "name": "ionActionSheetWillDismiss",
            "method": "dispatchCancelHandler"
        }]; }
    static get style() { return "/**style-placeholder:ion-action-sheet:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-action-sheet:**/"; }
}
function buttonClass(button) {
    return Object.assign({ 'action-sheet-button': true, [`action-sheet-${button.role}`]: !!button.role }, getClassMap(button.cssClass));
}
