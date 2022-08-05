// Form phản hồi

import { style } from "../../CSS/style.js";
import { verifyEmail, checkLoggin } from "../../utils.js";

class SuggestionForm extends HTMLElement {
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
        <div id="suggestion">
            <div class="container-form">
                <div class="form col-6">
                    <div class="form-icon-close"><i class="far fa-times-circle"></i></div>
                    <div class="form-name">Liên hệ với chúng tôi</div>
                    <div class="form-note">Những trường có dấu (<span style="color: red;">*</span>) bắt buộc điền</div>
                    <form>
                        <div class="form-other">
                            <label>Email<span style="color: red;">*</span></label>
                            <input type="text" id="email" placeholder="tvam@gmail.com" autocomplete="off"><br><br>
                        </div>
                        <label>Chủ đề<span style="color: red;">*</span></label>
                        <input type="text" id="subject" placeholder="Bài hát, thiết kế, hỗ trợ người dùng,..." autocomplete="off"><br><br>
                        <label>Nội dung<span style="color: red;">*</span></label><br>
                        <textarea id="content" placeholder="...." autocomplete="off"></textarea><br><br>
                    </form>
                    <div class="form-process">
                        <div class="form-result"></div>
                        <button class="form-access button">Gửi</button>
                    </div>
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;
        
        this.shadow.querySelector('.form-icon-close').addEventListener('click', () => {
            document.querySelector('main-screen').shadow.querySelector('suggestion-form').style.display = 'none';
        })

        // Process suggestion music

        this.shadow.querySelector('.form-access').addEventListener('click', () => {
            const subject = this.shadow.getElementById('subject').value;
            const content = this.shadow.getElementById('content').value;
            const result = this.shadow.querySelector('.form-result');
            result.style.color = 'red';
            let email;
            if (checkLoggin()) {
                email = this.shadow.getElementById('email').value;
                if (email == "" || subject == "" || content == "") {
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
                    firebase.firestore().collection('suggestions').add({email, subject, content}).then(() => {
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
                if (subject == "" || content == "") {
                    result.textContent = 'Cần nhập đủ các trường có dấu *';
                    setTimeout(() => {
                        result.textContent = '';
                    }, 1000);
                }
                else {
                    firebase.firestore().collection('suggestions').add({email, subject, content}).then(() => {
                        result.style.color = 'green';
                        result.textContent = 'Cảm ơn bạn đã phản hồi cho chúng tôi';
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

window.customElements.define('suggestion-form', SuggestionForm);