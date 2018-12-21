import { createOverlay, dismissOverlay, getOverlay } from '../../utils/overlays';
export class ActionSheetController {
    /**
     * Create an action sheet overlay with action sheet options.
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-action-sheet'), opts);
    }
    /**
     * Dismiss the open action sheet overlay.
     */
    dismiss(data, role, actionSheetId) {
        return dismissOverlay(this.doc, data, role, 'ion-action-sheet', actionSheetId);
    }
    /**
     * Get the most recently opened action sheet overlay.
     */
    getTop() {
        return getOverlay(this.doc, 'ion-action-sheet');
    }
    static get is() { return "ion-action-sheet-controller"; }
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
