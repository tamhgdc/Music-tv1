// Menu Admin

import { adminStyle } from "../../CSS/style.js";

class MenuAdmin extends HTMLElement {
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
        ${adminStyle}
        <div id="menu-admin-page" class="position-fixed pt-3">
            <div class="menu-choose">
                <div>
                    <div class="menu-admin-text admin-musics">Thư viện âm nhạc</div>
                    <div class="menu-admin-text admin-uploads">Xử lý yêu cầu</div>
                    <div class="menu-admin-text admin-suggestions">Phản hồi</div>
                    <div class="menu-admin-text admin-users">Tài khoản người dùng</div>
                    <div class="menu-admin-text admin-logout">Đăng xuất</div>
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        // Active choose - đổi màu khi click vào

        const listDiv = this.shadow.querySelectorAll('.menu-admin-text');
        for(let i=0; i<listDiv.length; ++i) {
            listDiv[i].addEventListener('click', () => {
                for(let j=0; j<listDiv.length; ++j) {
                    listDiv[j].style.background = `rgba(129, 201, 211, 0.05)`;
                    listDiv[j].style.color =  `#0a7d9a`;
                }
                listDiv[i].style.background = `rgba(17, 110, 122, 0.05)`;
                listDiv[i].style.color = `#67bcd1`;
            })
        }

        // Process choose
        this.shadow.querySelector('.admin-musics').addEventListener('click', () => {
            router.navigate('/mainAdminScreen/Musics');
        })

        this.shadow.querySelector('.admin-uploads').addEventListener('click', () => {
            router.navigate('/mainAdminScreen/Uploads');
        })

        this.shadow.querySelector('.admin-suggestions').addEventListener('click', () => {
            router.navigate('/mainAdminScreen/Suggestions');
        })

        this.shadow.querySelector('.admin-users').addEventListener('click', () => {
            router.navigate('/mainAdminScreen/Users');
        })

        this.shadow.querySelector('.admin-logout').addEventListener('click', () => {
            router.navigate('/');
            localStorage.setItem('mainScreen', 'user')
        })
    }
}

window.customElements.define('menu-admin', MenuAdmin);