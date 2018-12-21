import { createOverlay, dismissOverlay, getOverlay } from '../../utils/overlays';
export class AlertController {
    /**
     * Create an alert overlay with alert options
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-alert'), opts);
    }
    /**
     * Dismiss the open alert overlay.
     */
    dismiss(data, role, alertId) {
        return dismissOverlay(this.doc, data, role, 'ion-alert', alertId);
    }
    /**
     * Get the most recently opened alert overlay.
     */
    getTop() {
        return getOverlay(this.doc, 'ion-alert');
    }
    static get is() { return "ion-alert-controller"; }
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
