import { createOverlay, dismissOverlay, getOverlay } from '../../utils/overlays';
export class ModalController {
    /**
     * Create a modal overlay with modal options.
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-modal'), opts);
    }
    /**
     * Dismiss the open modal overlay.
     */
    dismiss(data, role, modalId) {
        return dismissOverlay(this.doc, data, role, 'ion-modal', modalId);
    }
    /**
     * Get the most recently opened modal overlay.
     */
    getTop() {
        return getOverlay(this.doc, 'ion-modal');
    }
    static get is() { return "ion-modal-controller"; }
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
