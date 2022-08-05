// Print music to Card style one

import { style } from "../../CSS/style.js";
import { checkLoggin } from "../../utils.js";

class CardOne extends HTMLElement {
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
        <div class="music-one-content">
            <img src="./image/img_music.png">
            <div class="music-one-info">
                <div class="music-one-name"></div>
                <div class="music-one-singer"></div>
            </div>
            <div class="music-one-others">
                <div class="music-one-seen"><i class="fas fa-headphones"></i></div>
                <div class="music-one-icon">
                    <i class="fas fa-play"></i>
                    <i class="far fa-heart heart-1"></i>
                    <i class="fas fa-heart heart-2"></i>
                </div>
            </div>
        </div><hr>`;
        this.shadow.innerHTML = template;

        this.shadow.querySelector('.music-one-name').textContent = this.name;
        this.shadow.querySelector('.music-one-singer').textContent = this.singer;
        this.shadow.querySelector('.music-one-seen i').textContent = this.countSeen;

        // Song music
        this.shadow.querySelector('.music-one-name').addEventListener('click', () => {
            router.navigate(`/mainScreen/songPage/${this.id}/0`);
        })

        this.shadow.querySelector('.fa-play').addEventListener('click', () => {
            router.navigate(`/mainScreen/songPage/${this.id}/0`);
        })

        // check heart
        if(this.checkHeart == "1") {
            this.shadow.querySelector('.heart-1').style.display = 'none';
            this.shadow.querySelector('.heart-2').style.display = 'block';
        }
        else {
            this.shadow.querySelector('.heart-1').style.display = 'block';
            this.shadow.querySelector('.heart-2').style.display = 'none';
        }

        // Heart
        this.shadow.querySelector('.heart-1').addEventListener('click', () => {
            if(checkLoggin()) {
                document.querySelector('main-screen').shadow.querySelector('loggin-form').style.display = 'block';
            }
            else {
                const confirm = document.querySelector('main-screen').shadow.querySelector('confirm-love');
                confirm.style.display = "block";
                confirm.shadow.querySelector(".confirm-name").textContent = `Thêm bài hát ${this.name} vào danh sách yêu thích của bạn`;
                confirm.shadow.querySelector(".confirm-button").style.display = 'block';
                localStorage.setItem('musicID', this.id);
                localStorage.setItem('listYT', this.listYT);
            }
        })


        this.shadow.querySelector('.heart-2').addEventListener('click', () => {
            const confirm = document.querySelector('main-screen').shadow.querySelector('confirm-love');
            confirm.style.display = "block";
            confirm.shadow.querySelector(".confirm-name").textContent = 'Bài hát đã có trong danh sách yêu thích';
            confirm.shadow.querySelector(".confirm-button").style.display = 'none';
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

    get countSeen() {
        return this.getAttribute('countSeen');
    }

    get listYT() {
        return this.getAttribute('listYT');
    }

    get checkHeart() {
        return this.getAttribute('checkHeart');
    }
}

window.customElements.define('card-music-one', CardOne);