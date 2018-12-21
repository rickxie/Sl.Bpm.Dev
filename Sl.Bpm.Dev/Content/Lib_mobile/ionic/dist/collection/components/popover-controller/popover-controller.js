import { createOverlay, dismissOverlay, getOverlay } from '../../utils/overlays';
export class PopoverController {
    /**
     * Create a popover overlay with popover options.
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-popover'), opts);
    }
    /**
     * Dismiss the open popover overlay.
     */
    dismiss(data, role, popoverId) {
        return dismissOverlay(this.doc, data, role, 'ion-popover', popoverId);
    }
    /**
     * Get the most recently opened popover overlay.
     */
    getTop() {
        return getOverlay(this.doc, 'ion-popover');
    }
    static get is() { return "ion-popover-controller"; }
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
