import { createOverlay, dismissOverlay, getOverlay } from '../../utils/overlays';
/** @hidden */
export class PickerController {
    /*
     * Create a picker overlay with picker options.
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-picker'), opts);
    }
    /*
     * Dismiss the open picker overlay.
     */
    dismiss(data, role, pickerId) {
        return dismissOverlay(this.doc, data, role, 'ion-picker', pickerId);
    }
    /*
     * Get the most recently opened picker overlay.
     */
    getTop() {
        return getOverlay(this.doc, 'ion-picker');
    }
    static get is() { return "ion-picker-controller"; }
    static get properties() { return {
        "create": {
            "method": true
        },
        "dismiss": {
            "method": true
        },
        "doc": {
            "context": "document"
        },
        "getTop": {
            "method": true
        }
    }; }
}
