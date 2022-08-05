// Confirm

import { style } from "../../CSS/style.js";

class ConfirmLove extends HTMLElement {
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
        <div id="confirm">
            <div class="container-form">
                <div class="form-confirm col-4">
                    <div class="form-icon-close"><i class="far fa-times-circle"></i></div>
                    <div class="confirm-name">Thêm bài hát Name vào danh sách yêu thích của bạn</div>
                    <div class="confirm-button">
                        <button class="confirm-ok button">Đồng ý</button>
                        <button class="confirm-no button">Thêm sau</button>
                    </div>
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        // Close 
        this.shadow.querySelector('.fa-times-circle').addEventListener('click', () => {
            document.querySelector('main-screen').shadow.querySelector('confirm-love').style.display = 'none';
        })

        this.shadow.querySelector('.confirm-no').addEventListener('click', () => {
            document.querySelector('main-screen').shadow.querySelector('confirm-love').style.display = 'none';
        })

        // Confirm
        this.shadow.querySelector('.confirm-ok').addEventListener('click', async () => {
            const listUserYT = localStorage.getItem("listYT") + " " + localStorage.getItem('logginState');
            await firebase.firestore().collection('musics').doc(localStorage.getItem('musicID')).update({listUserYT});
            document.querySelector('main-screen').shadow.querySelector('confirm-love').style.display = 'none';
            location.reload();
        })
    }
}

window.customElements.define('confirm-love', ConfirmLove);