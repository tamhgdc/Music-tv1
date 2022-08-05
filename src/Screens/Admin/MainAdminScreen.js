// Giao diện màn hình chính admin

import { style } from "../../CSS/style.js";

class MainAdminScreen extends HTMLElement {
    constructor(){
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
        <menu-admin></menu-admin>
        <div id="app-admin-content">
    
        </div>`;
        this.shadow.innerHTML = template;
    }
}

window.customElements.define('main-admin-screen', MainAdminScreen);