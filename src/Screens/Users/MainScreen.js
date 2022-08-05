// Giao diện màn hình chính

import { style } from "../../CSS/style.js";

class MainScreen extends HTMLElement {
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
        <menu-page></menu-page>
        <bar-page></bar-page>
        <addtional-page name="noListYT"></addtional-page>
        <register-form></register-form>
        <loggin-form></loggin-form>
        <upload-form></upload-form>
        <request-form></request-form>
        <suggestion-form></suggestion-form>
        <confirm-love></confirm-love>
        <div id="app-content">
            <list-music name="top"></list-music>
        </div>`;
        this.shadow.innerHTML = template;
    }
}

window.customElements.define('main-screen', MainScreen);