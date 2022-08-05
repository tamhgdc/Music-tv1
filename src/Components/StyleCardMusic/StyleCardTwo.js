// Print music to Card style two

import { style } from "../../CSS/style.js";


class CardTwo extends HTMLElement {
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
        <div class="music-two-content">
            <div class="music-two-img"><i class="fas fa-music"></i></div>
            <div class="music-two-info">
                <div class="music-two-name"></div>
                <div class="music-two-singer"></div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        this.shadow.querySelector('.music-two-name').textContent = this.name;
        this.shadow.querySelector('.music-two-singer').textContent = this.singer;

        // Song music
        this.shadow.querySelector('.music-two-name').addEventListener('click', () => {
            router.navigate(`/mainScreen/songPage/${this.id}/0`);
        })
    }

    get id() {
        return this.getAttribute('id');
    }

    get name() {
        return this.getAttribute('name');
    }
    
    get singer() {
        return this.getAttribute('singer');
    }
}

window.customElements.define('card-music-two', CardTwo);