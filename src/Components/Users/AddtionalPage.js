import { style } from "../../CSS/style.js";
import { getData, mixArray } from "../../utils.js";

class AddtionalPage extends HTMLElement {
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
        <div id="addtional-page" class="position-fixed">
            <div class="addtional-content">
                <div class="addtional-name"></div>
                <div class="addtional-music">
                </div>
            </div>
            <div class="addtional-img">
                <img src="./image/LOGO.png">
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        getData('musics').then((res) => {
            if(this.name == "noListYT") {
                const listMusic = mixArray(res);
                this.shadow.querySelector('.addtional-name').textContent = 'Hôm nay nghe gì';
                for(let i = 0; i<10; ++i) {
                    const data = listMusic[i];
                    this.shadow.querySelector('.addtional-music').insertAdjacentHTML('beforeend', `<card-music-three id="${data.id}" name="${data.name}" singer="${data.singer}" class=""></card-music-three>`);
                }
            }
            else if(this.name == "listYT"){
                this.shadow.querySelector('.addtional-name').textContent = 'Danh sách yêu thích';
                const listYT = [];
                for(let x of res) {
                    if(x.listUserYT.includes(localStorage.getItem('logginState'))) listYT.push(x);
                }
                if(listYT.length == 0) {
                    this.shadow.querySelector('.addtional-music').insertAdjacentHTML('beforeend', `<div class="text-center">Bạn chưa có bài hát yêu thích nào cả</div>`)
                }
                else {
                    listYT.forEach((data) => {
                        this.shadow.querySelector('.addtional-music').insertAdjacentHTML('beforeend', `<card-music-three id="${data.id}" name="${data.name}" singer="${data.singer}" class="1" listYT="${data.listUserYT}"></card-music-three>`)
                    })
                }
            }
            else {
                this.shadow.querySelector('.addtional-name').textContent = this.name;
                const genre = this.name.toLowerCase();
                const listMusicGenre = [];
                for(let x of res) {
                    if(x.genre.toLowerCase() == genre) listMusicGenre.push(x);
                }
                listMusicGenre.forEach((data) => {
                    this.shadow.querySelector('.addtional-music').insertAdjacentHTML('beforeend', `<card-music-three id="${data.id}" name="${data.name}" singer="${data.singer}" class=""></card-music-three>`)
                })
            }
        })
    }

    get name() {
        return this.getAttribute('name');
    }
}

window.customElements.define('addtional-page', AddtionalPage);