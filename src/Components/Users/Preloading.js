// Preloading

import { style } from "../../CSS/style.js";

class Preloading extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: 'open',
        })
    }

    static get observedAttributes() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    connectedCallback() {
        const template = `
        ${style}
        <div id="preload" class="preload-container text-center">
            <span class="fas fa-redo-alt preload-icon rotating"></span>
        </div>`;
        this.shadow.innerHTML = template;

        setTimeout(() => {
            this.remove();
        }, 1000)
    }
}

window.customElements.define('preloading-page', Preloading);