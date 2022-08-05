// Form yêu cầu

import { style } from "../../CSS/style.js";
import { verifyEmail, checkLoggin } from "../../utils.js";

class RequestForm extends HTMLElement {
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
        <div id="request">
            <div class="container-form">
                <div class="form col-6">
                    <div class="form-icon-close"><i class="far fa-times-circle"></i></div>
                    <div class="form-name">Yêu cầu bài hát</div>
                    <div class="form-note">Những trường có dấu (<span style="color: red;">*</span>) bắt buộc điền</div>
                    <form>
                        <div class="form-other">
                            <label>Email<span style="color: red;">*</span></label>
                            <input type="text" id="email" placeholder="thuvienamnhac@gmail.com" autocomplete="off"><br><br>
                        </div>
                        <label>Tên bài hát<span style="color: red;">*</span></label>
                        <input type="text" id="name" placeholder="Yêu Cô Bạn Thân" autocomplete="off"><br><br>
                        <label>Ca sĩ<span style="color: red;">*</span></label>
                        <input type="text" id="singer" placeholder="Bằng Cường" autocomplete="off"><br><br>
                        <label>Tác giả<span style="color: red;">*</span></label>
                        <input type="text" id="author" placeholder="Bằng Cường" autocomplete="off"><br><br>
                    </form>
                    <div class="form-process">
                        <div class="form-result"></div>
                        <button class="form-access button">Yêu cầu bài hát</button>
                    </div>
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        // Close Form
        this.shadow.querySelector('.form-icon-close').addEventListener('click', () => {
            document.querySelector('main-screen').shadow.querySelector('request-form').style.display = 'none';
        })

        // Process request music

        this.shadow.querySelector('.form-access').addEventListener('click', async () => {
            const name = this.shadow.getElementById('name').value;
            const singer = this.shadow.getElementById('singer').value;
            const author = this.shadow.getElementById('author').value;
            const result = this.shadow.querySelector('.form-result');
            result.style.color = 'red';
            let email;
            if (checkLoggin()) {
                email = this.shadow.getElementById('email').value;
                if (email == "" || name == "" || singer == "" || author == "") {
                    result.textContent = 'Cần nhập đủ các trường có dấu *';
                    setTimeout(() => {
                        result.textContent = '';
                    }, 1000);
                }
                else if (!verifyEmail(email)) {
                    result.textContent = 'Email không hợp lệ';
                    setTimeout(() => {
                        result.textContent = '';
                    }, 1000);
                }
                else {
                    firebase.firestore().collection('uploads').add({email, name, singer, author, type: "Yêu cầu bài hát"}).then(() => {
                        result.style.color = 'green';
                        result.textContent = 'Hệ thống đã ghi nhận yêu cầu của bạn';
                        setTimeout(() => {
                            result.textContent = '';
                            this.shadow.querySelector('form').reset();
                        }, 1000);
                    })
                }
            }
            else {
                email = localStorage.getItem('emailLoggin');
                if (name == "" || singer == "" || author == "") {
                    result.textContent = 'Cần nhập đủ các trường có dấu *';
                    setTimeout(() => {
                        result.textContent = '';
                    }, 1000);
                }
                else {
                    firebase.firestore().collection('uploads').add({email, name, singer, author, type: "Yêu cầu bài hát"}).then(() => {
                        result.style.color = 'green';
                        result.textContent = 'Hệ thống đã ghi nhận yêu cầu của bạn';
                        setTimeout(() => {
                            result.textContent = '';
                            this.shadow.querySelector('form').reset();
                        }, 1000);
                    })
                }
            }
        })
    }
}

window.customElements.define('request-form', RequestForm);