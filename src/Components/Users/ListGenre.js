// Hiển thị thể loại

import { style } from "../../CSS/style.js";
import '../StyleCardMusic/StyleCardTwo.js';
import { getData, mixArray } from "../../utils.js";

class ListGenre extends HTMLElement {
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
        <div id="list-genre">
            <div class="container-page">
                <div class="content">
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        // Sreen
        this.shadow.querySelector('.content').style.height = `${screen.height-155}px`;

        getData('musics').then((res) => {
            const listMusic = res;
            const listMusicGenre = [];
            for(let x of listMusic) {
                if(listMusicGenre[x.genre] == null) {
                    listMusicGenre[x.genre] = [];
                    listMusicGenre[x.genre].push(x);
                }
                else listMusicGenre[x.genre].push(x);
            }
            
            for(let i in listMusicGenre) {
                this.shadow.querySelector('.content').insertAdjacentHTML('beforeend', `
                <div class="list-name" id="${i}">${i} <span>Xem tất cả</span></div><hr>
                <div class="list-gerne-content">
                </div>`)
            }

            const nameList = this.shadow.querySelectorAll('.list-name');
            const domList = Array.from(this.shadow.querySelectorAll('.list-gerne-content'));
            const allView = Array.from(this.shadow.querySelectorAll('.list-name span'));

            for(let i in domList) {
                const max = listMusicGenre[nameList[i].id].length;
                const listMix = mixArray(listMusicGenre[nameList[i].id]);
                for(let index = 1; index < 5; ++index) {
                    const data = listMix[index-1];
                    domList[i].insertAdjacentHTML('beforeend', `<card-music-two id="${data.id}" name="${data.name}" singer="${data.singer}"></card-music-two>`);
                    if(index == max) break;
                }
            }
            
            // Process all view
            for(let i in allView) {
                allView[i].addEventListener('click', () => {
                    router.navigate(`/mainScreen/listGenre/${nameList[i].id}`);
                })
            }
        })

    }
}

window.customElements.define('list-genre', ListGenre);