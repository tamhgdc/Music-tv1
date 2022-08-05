// Tiêu đề chứa menu

import { style } from "../../CSS/style.js";
import { checkLoggin, loadWeb } from "../../utils.js";

class MenuPage extends HTMLElement {
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
        <div id="menu-page" class="position-fixed pt-3">
            <div id="menu-logo" class="text-center fs-4 mb-3"><i class="fas fa-compact-disc me-2"></i>Thư viện âm nhạc</div>
            <div class="menu-choose">
                <div>
                    <div class="menu-text menu-home">Trang chủ</div>
                    <div class="menu-text menu-genre">Thể Loại</div>
                </div>
                <div class="menu-sign-in border text-center">
                        <p>Tham gia với chúng tôi để tạo danh sách yêu thích của chính bạn!</p>
                        <button id="register" class="btn-sign-in button">Đăng ký ngay</button>
                </div>
                <div id="extra-page">
                    <p id="quote">"Âm nhạc là sự sống. Đó là lý do trái tim ta có nhịp đập."</p>
                    <p id="cite">𑁋 Louis Armstrong</p>
                    <div class="flexcenter column">
                        <span id="heartbeat">
                            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" fill="currentColor"
                                class="bi bi-soundwave" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5zm-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zm12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z" />
                            </svg><i class="fas fa-heartbeat heartbeat"></i><svg xmlns="http://www.w3.org/2000/svg"
                                width="65" height="65" fill="currentColor" class="bi bi-soundwave" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5zm-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zm12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div class="menu-icon d-flex position-absolute">
                <div>
                    <i class="fab fa-app-store-ios"></i>
                </div>
                <div>
                    <i class="fab fa-google-play"></i>
                </div>
                <div>
                    <i class="fab fa-facebook-square"></i>
                </div>
                <div>
                    <i class="fab fa-instagram"></i>
                </div>
                <div>
                    <i class="fab fa-twitter-square"></i>
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        // Onload Web
        if (checkLoggin()) {
            this.shadow.querySelector('.menu-sign-in').style.visibility = 'visible';
        }
        else {
            this.shadow.querySelector('.menu-sign-in').style.visibility = 'hidden';
        }

        this.shadow.getElementById('register').addEventListener('click', () => {
            document.querySelector('main-screen').shadow.querySelector('register-form').style.display = 'block';
        })

        // Process the loai

        this.shadow.querySelector('.menu-genre').addEventListener('click', () => {
            router.navigate('/mainScreen/listGenre');
        })

        // Proocess home

        this.shadow.querySelector('.menu-home').addEventListener('click', () => {
            const $app = document.getElementById("app");
            $app.innerHTML = `<preloading-page></preloading-page>`;
            setTimeout(() => {
                $app.insertAdjacentHTML('beforeend', `<main-screen></main-screen>`);
            }, 10)
            router.navigate('/');
        })

        this.shadow.querySelector('#menu-logo').addEventListener('click', () => {
            const $app = document.getElementById("app");
            $app.innerHTML = `<preloading-page></preloading-page>`;
            setTimeout(() => {
                $app.insertAdjacentHTML('beforeend', `<main-screen></main-screen>`);
            }, 10)
            router.navigate('/');
        })
    }
}

window.customElements.define('menu-page', MenuPage);