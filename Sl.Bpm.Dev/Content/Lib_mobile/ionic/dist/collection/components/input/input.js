import { debounceEvent, deferEvent, renderHiddenInput } from '../../utils/helpers';
import { createColorClasses, hostContext } from '../../utils/theme';
export class Input {
    constructor() {
        this.inputId = `ion-input-${inputIds++}`;
        this.didBlurAfterEdit = false;
        this.hasFocus = false;
        /**
         * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user. Defaults to `"none"`.
         */
        this.autocapitalize = 'none';
        /**
         * Indicates whether the value of the control can be automatically completed by the browser. Defaults to `"off"`.
         */
        this.autocomplete = 'off';
        /**
         * Whether autocorrection should be enabled when the user is entering/editing the text value. Defaults to `"off"`.
         */
        this.autocorrect = 'off';
        /**
         * This Boolean attribute lets you specify that a form control should have input focus when the page loads. Defaults to `false`.
         */
        this.autofocus = false;
        /**
         * If true, a clear icon will appear in the input when there is a value. Clicking it clears the input. Defaults to `false`.
         */
        this.clearInput = false;
        /**
         * Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. Default `0`.
         */
        this.debounce = 0;
        /**
         * If true, the user cannot interact with the input. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /**
         * If true, the user cannot modify the value. Defaults to `false`.
         */
        this.readonly = false;
        /**
         * If true, the user must fill in a value before submitting a form.
         */
        this.required = false;
        /**
         * If true, the element will have its spelling and grammar checked. Defaults to `false`.
         */
        this.spellcheck = false;
        /**
         * The type of control to display. The default type is text. Possible values are: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, or `"url"`.
         */
        this.type = 'text';
        /**
         * The value of the input.
         */
        this.value = '';
    }
    debounceChanged() {
        this.ionChange = debounceEvent(this.ionChange, this.debounce);
    }
    disabledChanged() {
        this.emitStyle();
    }
    /**
     * Update the native input element when the value changes
     */
    valueChanged() {
        const inputEl = this.nativeInput;
        const value = this.value;
        if (inputEl && inputEl.value !== value) {
            inputEl.value = value;
        }
        this.emitStyle();
        this.ionChange.emit({ value });
    }
    componentWillLoad() {
        // By default, password inputs clear after focus when they have content
        if (this.clearOnEdit === undefined && this.type === 'password') {
            this.clearOnEdit = true;
        }
    }
    componentDidLoad() {
        this.ionStyle = deferEvent(this.ionStyle);
        this.debounceChanged();
        this.emitStyle();
        this.ionInputDidLoad.emit();
    }
    componentDidUnload() {
        this.nativeInput = undefined;
        this.ionInputDidUnload.emit();
    }
    focus() {
        if (this.nativeInput) {
            this.nativeInput.focus();
        }
    }
    emitStyle() {
        this.ionStyle.emit({
            'interactive': true,
            'input': true,
            'has-value': this.hasValue(),
            'has-focus': this.hasFocus,
            'interactive-disabled': this.disabled,
        });
    }
    onInput(ev) {
        const input = ev.target;
        if (input) {
            this.value = ev.target && ev.target.value || '';
        }
        this.ionInput.emit(ev);
    }
    onBlur() {
        this.hasFocus = false;
        this.focusChanged();
        this.emitStyle();
        this.ionBlur.emit();
    }
    onFocus() {
        this.hasFocus = true;
        this.focusChanged();
        this.emitStyle();
        this.ionFocus.emit();
    }
    focusChanged() {
        // If clearOnEdit is enabled and the input blurred but has a value, set a flag
        if (this.clearOnEdit && !this.hasFocus && this.hasValue()) {
            this.didBlurAfterEdit = true;
        }
    }
    /**
     * Check if we need to clear the text input if clearOnEdit is enabled
     */
    onKeydown() {
        if (!this.clearOnEdit) {
            return;
        }
        // Did the input value change after it was blurred and edited?
        if (this.didBlurAfterEdit && this.hasValue()) {
            // Clear the input
            this.clearTextInput();
        }
        // Reset the flag
        this.didBlurAfterEdit = false;
    }
    clearTextInput() {
        this.value = '';
    }
    hasValue() {
        return !!this.value;
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { 'in-item': hostContext('.item', this.el), 'has-value': this.hasValue(), 'has-focus': this.hasFocus })
        };
    }
    render() {
        renderHiddenInput(this.el, this.name, this.value, this.disabled);
        return [
            h("input", { ref: input => this.nativeInput = input, "aria-disabled": this.disabled ? 'true' : null, accept: this.accept, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, autoFocus: this.autofocus, class: "native-input", disabled: this.disabled, inputMode: this.inputmode, min: this.min, max: this.max, minLength: this.minlength, maxLength: this.maxlength, multiple: this.multiple, name: this.name, pattern: this.pattern, placeholder: this.placeholder, results: this.results, readOnly: this.readonly, required: this.required, spellCheck: this.spellcheck, step: this.step, size: this.size, type: this.type, value: this.value, onInput: this.onInput.bind(this), onBlur: this.onBlur.bind(this), onFocus: this.onFocus.bind(this), onKeyDown: this.onKeydown.bind(this) }),
            h("slot", null),
            (this.clearInput && !this.readonly && !this.disabled) && h("button", { type: "button", class: "input-clear-icon", onTouchStart: this.clearTextInput.bind(this), onMouseDown: this.clearTextInput.bind(this) })
        ];
    }
    static get is() { return "ion-input"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "accept": {
            "type": String,
            "attr": "accept"
        },
        "autocapitalize": {
            "type": String,
            "attr": "autocapitalize"
        },
        "autocomplete": {
            "type": String,
            "attr": "autocomplete"
        },
        "autocorrect": {
            "type": String,
            "attr": "autocorrect"
        },
        "autofocus": {
            "type": Boolean,
            "attr": "autofocus"
        },
        "clearInput": {
            "type": Boolean,
            "attr": "clear-input"
        },
        "clearOnEdit": {
            "type": Boolean,
            "attr": "clear-on-edit",
            "mutable": true
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "debounce": {
            "type": Number,
            "attr": "debounce",
            "watchCallbacks": ["debounceChanged"]
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "watchCallbacks": ["disabledChanged"]
        },
        "el": {
            "elementRef": true
        },
        "focus": {
            "method": true
        },
        "hasFocus": {
            "state": true
        },
        "inputmode": {
            "type": String,
            "attr": "inputmode"
        },
        "max": {
            "type": String,
            "attr": "max"
        },
        "maxlength": {
            "type": Number,
            "attr": "maxlength"
        },
        "min": {
            "type": String,
            "attr": "min"
        },
        "minlength": {
            "type": Number,
            "attr": "minlength"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "pattern": {
            "type": String,
            "attr": "pattern"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "results": {
            "type": Number,
            "attr": "results"
        },
        "size": {
            "type": Number,
            "attr": "size"
        },
        "spellcheck": {
            "type": Boolean,
            "attr": "spellcheck"
        },
        "step": {
            "type": String,
            "attr": "step"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true,
            "watchCallbacks": ["valueChanged"]
        }
    }; }
    static get events() { return [{
            "name": "ionInput",
            "method": "ionInput",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionChange",
            "method": "ionChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionStyle",
            "method": "ionStyle",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionBlur",
            "method": "ionBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionFocus",
            "method": "ionFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionInputDidLoad",
            "method": "ionInputDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionInputDidUnload",
            "method": "ionInputDidUnload",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ion-input:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-input:**/"; }
}
let inputIds = 0;
