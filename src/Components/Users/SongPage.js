// Page listen music

import { style } from "../../CSS/style.js";
import { checkLoggin } from "../../utils.js";

class SongPage extends HTMLElement {
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
        <div id="song-page">
                <div class="container-page">
                    <div class="content">
                        <div class="song-content">
                            <div class="song-info">
                                <div class="song-margin">
                                    <div class="song-name"></div>
                                    <div class="song-genre"></div>
                                </div>
                                <div class="song-iframe">
                                    <iframe src="" width="620px" height="312px" frameborder="0" allowfullscreen
                                        allow="autoplay"></iframe>
                                </div>
                            </div>
                            <div class="song-others song-margin">
                                <div class="song-other-info">
                                    <div class="song-other-left">
                                        <div class="song-other-name"></div>
                                        <div class="song-other-singer"></div>
                                        <div class="song-other-author"></div>
                                        <div class="song-other-lyrics">Lời bài hát: </div>
                                    </div>
                                </div><hr>
                                <div class="song-lyrics"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        this.shadow.innerHTML = template;

        firebase.firestore().collection('musics').doc(this.id).get().then((res) => {
            const data = res.data();
            this.shadow.querySelector('.song-name').innerHTML = `${data.name} <span class="song-singer">${data.singer}</span>`;
            this.shadow.querySelector('.song-genre').innerHTML = `${data.genre}`;
            this.shadow.querySelector('iframe').src = data.iframeUrl;
            this.shadow.querySelector('.song-other-name').textContent = `Bài hát: ${data.name}`;
            this.shadow.querySelector('.song-other-singer').textContent = `Ca sĩ: ${data.singer}`;
            this.shadow.querySelector('.song-other-author').textContent = `Tác giả: ${data.author}`;
            this.shadow.querySelector('.song-lyrics').innerHTML = data.lyrics;
            const countSeen = Number(data.countSeen) + 1;
            firebase.firestore().collection('musics').doc(this.id).update({ countSeen });
            if(this.name != "1") {
                document.querySelector('main-screen').shadow.querySelector('addtional-page').remove();
                document.querySelector('main-screen').shadow.querySelector('bar-page').insertAdjacentHTML('afterend', `<addtional-page name="${data.genre}"></addtional-page>`)
            }

            // Process love
            // this.shadow.querySelector('.fa-heart').addEventListener('click', () => {
            //     if (checkLoggin()) {
            //         document.querySelector('main-screen').shadow.querySelector('loggin-form').style.display = 'block';
            //     }
            //     else {
            //         const confirm = document.querySelector('main-screen').shadow.querySelector('confirm-love');
            //         confirm.style.display = "block";
            //         if (data.listUserYT.includes(localStorage.getItem('logginState'))) {
            //             confirm.shadow.querySelector(".confirm-name").textContent = 'Bài hát đã có trong danh sách yêu thích';
            //             confirm.shadow.querySelector(".confirm-button").style.display = 'none';
            //         }
            //         else {
            //             confirm.shadow.querySelector(".confirm-name").textContent = `Thêm bài hát ${data.name} vào danh sách yêu thích của bạn`;
            //             confirm.shadow.querySelector(".confirm-button").style.display = 'block';
            //         }
            //         localStorage.setItem('musicID', this.id);
            //         localStorage.setItem('listYT', data.listUserYT);
            //     }
            // })
        })
    }

    get id() {
        return this.getAttribute('id');
    }

    get name() {
        return this.getAttribute('name');
    }
}

window.customElements.define('song-page', SongPage)