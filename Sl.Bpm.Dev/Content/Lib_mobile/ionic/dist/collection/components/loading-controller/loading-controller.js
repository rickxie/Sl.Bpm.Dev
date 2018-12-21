import { createOverlay, dismissOverlay, getOverlay } from '../../utils/overlays';
export class LoadingController {
    /**
     * Create a loading overlay with loading options.
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-loading'), opts);
    }
    /**
     * Dismiss the open loading overlay.
     */
    dismiss(data, role, loadingId) {
        return dismissOverlay(this.doc, data, role, 'ion-loading', loadingId);
    }
    /**
     * Get the most recently opened loading overlay.
     */
    getTop() {
        return getOverlay(this.doc, 'ion-loading');
    }
    static get is() { return "ion-loading-controller"; }
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
