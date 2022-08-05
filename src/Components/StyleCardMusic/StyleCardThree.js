// Print music to Card style three

import { style } from "../../CSS/style.js";


class CardThree extends HTMLElement {
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
        <div class="music-three-content">
            <div class="d-flex">   
                <div class="music-three-img"><i class="fas fa-music"></i></div>
                <div class="music-three-info">
                    <div class="music-three-name"></div>
                    <div class="music-three-singer"></div>
                </div>
            </div>
            <div><i id="removeYT" class="fas fa-eraser"></i></div>
        </div><hr class="col-10 ms-4">`;
        this.shadow.innerHTML = template;

        this.shadow.querySelector('.music-three-name').textContent = this.name;
        this.shadow.querySelector('.music-three-singer').textContent = this.singer;
        if (this.className != "") {
            this.shadow.getElementById('removeYT').style.display = 'block';

            // Song music
            this.shadow.querySelector('.music-three-name').addEventListener('click', () => {
                router.navigate(`/mainScreen/listYT/${this.id}/1`);
            })

            // Delete love music
            this.shadow.querySelector('.fa-eraser').addEventListener('click', async () => {
                const listUserYT = this.listYT.replace(localStorage.getItem('logginState'), " ");
                await firebase.firestore().collection('musics').doc(this.id).update({ listUserYT }).then(() => {
                    this.remove();
                })
            })
        }
        else {
            this.shadow.getElementById('removeYT').style.display = 'none';

            // Song music
            this.shadow.querySelector('.music-three-name').addEventListener('click', () => {
                router.navigate(`/mainScreen/songPage/${this.id}/0`);
            })
        }
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

    get className() {
        return this.getAttribute('class');
    }

    get listYT() {
        return this.getAttribute('listYT');
    }
}

window.customElements.define('card-music-three', CardThree);