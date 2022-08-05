// Hiển thị một danh sách bài hát phù hợp

import { style } from "../../CSS/style.js";
import '../StyleCardMusic/StyleCardOne.js';
import { checkLoggin, getData } from "../../utils.js";

class ListMusic extends HTMLElement {
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
        <div id="list-music">
            <div class="container-page">
                <div class="content">
                    <div class="list-name"></div><hr>
                    <div class="list-content">
                    </div>
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        // Sreen
        this.shadow.querySelector('.content').style.height = `${screen.height-155}px`;

        getData('musics').then((res) => {
            const listMusic = res.sort((a, b) => b.countSeen - a.countSeen);
            const listContent = this.shadow.querySelector('.list-content');
            if (this.name == 'top') {
                this.shadow.querySelector('.list-name').textContent = `Top bài hát hay nhất`;
                let index = 1;
                let checkHeart;
                for (let x of listMusic) {
                    if(!checkLoggin()) {
                        if(x.listUserYT.includes(localStorage.getItem("logginState"))) {
                            checkHeart = 1;
                        }
                        else checkHeart = 0;
                    }
                    else {
                        checkHeart = 0;
                    }
                    listContent.insertAdjacentHTML('beforeend', `<card-music-one id="${x.id}" name="${x.name}" singer="${x.singer}" countSeen="${x.countSeen}" listYT="${x.listUserYT}" checkHeart="${checkHeart}"></card-music-one>`);
                    index++;
                    if(index == 100) break;
                }
            }
            else {
                const name = this.name;
                this.shadow.querySelector('.list-name').textContent = name;
                let index = 1;
                for (let x of listMusic) {
                    let checkHeart;
                    if (x.genre == name) {
                        if(!checkLoggin()) {
                            if(x.listUserYT.includes(localStorage.getItem("logginState"))) {
                                checkHeart = 1;
                            }
                            else che
                        }
                        else {
                            checkHeart = 0;
                        }
                        listContent.insertAdjacentHTML('beforeend', `<card-music-one id="${x.id}" name="${x.name}" singer="${x.singer}" countSeen="${x.countSeen}" listYT="${x.listUserYT}" checkHeart="${checkHeart}"></card-music-one>`);
                        index++;
                        if(index == 100) break;
                    }
                }
            }
        })

    }

    get name() {
        return this.getAttribute('name');
    }
}

window.customElements.define('list-music', ListMusic);