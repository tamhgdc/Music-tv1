// Form add, update Music

import { adminStyle } from "../../CSS/style.js";

class AddAdminForm extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: "open",
        });
    }
    static get observedAttributes() {

    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    connectedCallback() {
        const template = `
        ${adminStyle}
        <div id="form-add">
            <form>
                <div class="d-flex">
                    <div class="form-left">
                        <label>Tên bài hát<span style="color: red;">*</span></label>
                        <input type="text" class="half-input" id="name" placeholder="Name music..." autocomplete="off"><br><br>
                        <label>Ca sĩ<span style="color: red;">*</span></label>
                        <input type="text" class="half-input" id="singer" placeholder="Singer..." autocomplete="off"><br><br>
                    </div>
                    <div class="form-right">
                        <label>Tác giả<span style="color: red;">*</span></label>
                        <input type="text" class="half-input" id="author" placeholder="Author..." autocomplete="off"><br><br>
                        <label>Thể loại<span style="color: red;">*</span></label>
                        <input type="text" class="half-input" id="genre" placeholder="Genre..." autocomplete="off"><br><br>
                    </div>
                </div>
                <div>
                    <label>Link bài hát<span style="color: red;">*</span></label>
                    <input type="text" class="long-input" id="link" placeholder="Link music..." autocomplete="off"><br><br>
                    <label>Lời bài hát<span style="color: red;">*</span></label><br>
                    <textarea id="lyrics" class="long-input" placeholder="Lyrics of musis..." autocomplete="off"></textarea><br><br>
                </div>
            </form>
            <div class="form-process">
                <div class="form-result"></div>
                <div>
                    <button class="form-clear button">Clear</button>
                    <button class="form-add button">Add</button>
                    <button class="form-update button" style="display: none;">Update</button>
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        // Process clear

        this.shadow.querySelector('.form-clear').addEventListener('click', () => {
            this.shadow.querySelector('form').reset();
        })

        // Process add

        this.shadow.querySelector('.form-add').addEventListener('click', () => {
            const name = this.shadow.getElementById('name').value;
            const singer = this.shadow.getElementById('singer').value;
            const author = this.shadow.getElementById('author').value;
            const genre = this.shadow.getElementById('genre').value;
            const iframeUrl = this.shadow.getElementById('link').value;
            const lyrics = this.shadow.getElementById('lyrics').value;
            const result = this.shadow.querySelector('.form-result');
            result.style.color = 'red';
            if(name == "" || singer == "" || author == "" || genre == "" || iframeUrl == "" || lyrics == "") {
                result.textContent = 'Cần nhập đủ các trường có dấu *';
                setTimeout(() => {
                    result.textContent = '';
                }, 1000);
            }
            else {
                firebase.firestore().collection('musics').add({name, singer, author, genre, iframeUrl, lyrics}).then(() => {
                    result.style.color = 'green';
                    result.textContent = 'Thêm thành công';
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                })
            }
        })
    }
}


// export module
window.customElements.define("add-form", AddAdminForm);