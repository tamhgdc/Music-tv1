// Thông tin page

import { style } from "../../CSS/style.js";
import { checkLoggin, getData, xoa_dau} from "../../utils.js";

class BarPage extends HTMLElement {
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
        <div id="bar-page" class="d-flex pt-2">
            <div class="bar-search input-group mb-3">
                <span class="input-group-text icon-search-page"><i class="fas fa-search"></i></span>
                <input type="search" id="search-page" placeholder="Tìm bài hát hoặc tên ca sĩ" aria-label="Username" aria-describedby="basic-addon1">
                <div class="result-search-page">
                </div>
            </div>
            <div class="bar-icon d-flex">
                <div class="bar-icon-menu">
                    <i class="fas fa-ellipsis-h"></i>
                    <div class="bar-menu position-absolute scale-up-ver-top">
                        <div>Đăng bài hát</div>
                        <div>Yêu cầu bài hát</div>
                        <div>Phản hồi</div>
                    </div>
                </div>
                <div class="bar-icon-user">
                    <i class="fas fa-user-circle ms-4"></i>
                    <i class="far fa-user-circle ms-4"></i>
                    <div class="bar-menu position-absolute bar-loggin">
                        <div class="name-user"></div>
                        <div class="bar-love">Danh sách yêu thích</div>
                        <div class="bar-logout">Đăng xuất</div>
                    </div>
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        // Onload web
        if(checkLoggin()) {
            this.shadow.querySelector('.name-user').textContent = ``;
            this.shadow.querySelector('.fa-user-circle').style.display = 'none';
            this.shadow.querySelector('.far').style.display = 'block';
        }
        else {
            this.shadow.querySelector('.name-user').textContent = `Hello, ${localStorage.getItem('logginState')}`;
            this.shadow.querySelector('.fa-user-circle').style.display = 'block';
            this.shadow.querySelector('.far').style.display = 'none';
        }

        // Process icon menu
        this.shadow.querySelector('.bar-icon-menu').addEventListener('mouseover', () => {
            this.shadow.querySelector('.bar-icon-menu .bar-menu').style.display = 'block';
        })

        this.shadow.querySelector('.bar-icon-menu').addEventListener('mouseout', () => {
            this.shadow.querySelector('.bar-icon-menu .bar-menu').style.display = 'none';
        })

        const listMenu = this.shadow.querySelectorAll('.bar-menu div');

        // Get upload form
        listMenu[0].addEventListener('click', () => {
            if(checkLoggin()) {
                document.querySelector('main-screen').shadow.querySelector('loggin-form').style.display = 'block';
            }
            else {
                document.querySelector('main-screen').shadow.querySelector('upload-form').style.display = 'block';
                document.querySelector('main-screen').shadow.querySelector('upload-form').shadow.querySelector('form').reset();
            }
        })

        // Get request form
        listMenu[1].addEventListener('click', () => {
            document.querySelector('main-screen').shadow.querySelector('request-form').style.display = 'block';
            if(checkLoggin()) {
                document.querySelector('main-screen').shadow.querySelector('request-form').shadow.querySelector('.form-other').style.display = 'block';
            }
            else {
                document.querySelector('main-screen').shadow.querySelector('request-form').shadow.querySelector('.form-other').style.display = 'none';
            }
            document.querySelector('main-screen').shadow.querySelector('request-form').shadow.querySelector('form').reset();
        })

        //Get suggetion form
        listMenu[2].addEventListener('click', () => {
            document.querySelector('main-screen').shadow.querySelector('suggestion-form').style.display = 'block';
            if(checkLoggin()) {
                document.querySelector('main-screen').shadow.querySelector('suggestion-form').shadow.querySelector('.form-other').style.display = 'block';
            }
            else {
                document.querySelector('main-screen').shadow.querySelector('suggestion-form').shadow.querySelector('.form-other').style.display = 'none';
            }
            document.querySelector('main-screen').shadow.querySelector('suggestion-form').shadow.querySelector('form').reset();
        })

        // Process icon user
        this.shadow.querySelector('.far').addEventListener('click', () => {
            if(checkLoggin()) {
                document.querySelector('main-screen').shadow.querySelector('loggin-form').style.display = 'block';
                document.querySelector('main-screen').shadow.querySelector('loggin-form').shadow.querySelector('form').reset();
            }
        })

        this.shadow.querySelector('.bar-icon-user').addEventListener('mouseover', () => {
            if(!checkLoggin()) {
                this.shadow.querySelector('.bar-icon-user .bar-menu').style.display = 'block';
            }
        })

        this.shadow.querySelector('.bar-icon-user').addEventListener('mouseout', () => {
            if(!checkLoggin()) {
                this.shadow.querySelector('.bar-icon-user .bar-menu').style.display = 'none';
            }
        })

        // Process list yeu thich
        this.shadow.querySelector('.bar-love').addEventListener('click', () => {
            router.navigate('/mainScreen/listYT');
        })

        // Process logout 

        this.shadow.querySelector('.bar-logout').addEventListener('click', () => {
            localStorage.setItem('logginState', '-1');
            this.shadow.querySelector('.fa-user-circle').style.display = 'none';
            this.shadow.querySelector('.bar-icon-user .bar-menu').style.display = 'none';
            this.shadow.querySelector('.far').style.display = 'block';
            document.querySelector('main-screen').shadow.querySelector('menu-page').shadow.querySelector('.menu-sign-in').style.visibility = 'visible';
            router.navigate('/');
            location.reload();
        })

        // Process search 
        getData('musics').then((res) => {
            const listMusic = res;
            this.shadow.getElementById('search-page').addEventListener('input', () => {
                const search = this.shadow.querySelector('.result-search-page');
                const listSearch = search.querySelectorAll('div');
                for(let i=0; i < listSearch.length; ++i) {
                    listSearch[i].remove();
                }
                const keyWord = this.shadow.getElementById('search-page').value;
                if(keyWord == "") {
                    this.shadow.querySelector('.result-search-page').style.display = 'none';
                }
                else {
                    this.shadow.querySelector('.result-search-page').style.display = 'block';
                    let count = 0;
                    for(let x of listMusic) {
                        if (xoa_dau(x.name).toLowerCase().search(keyWord.toLowerCase()) != -1 || xoa_dau(x.singer).toLowerCase().search(keyWord.toLowerCase()) != -1) {
                            this.shadow.querySelector('.result-search-page').insertAdjacentHTML('beforeend', `
                            <div id="${x.id}">
                                <p class="search-name">${x.name}</p>
                                <p class="search-singer">${x.singer}</p>
                                <hr>
                            </div>`);
                            count++;
                        }
                    }
                    const search = this.shadow.querySelector('.result-search-page');
                    const listSearch = search.querySelectorAll('div');
                    for(let i=0; i < listSearch.length; ++i) {
                        listSearch[i].addEventListener('click', () => {
                            router.navigate(`/mainScreen/songPage/${listSearch[i].id}/0`);
                            this.shadow.getElementById('search-page').value = "";
                            this.shadow.querySelector('.result-search-page').style.display = 'none';
                        });
                    }

                    if (count == 0) {
                        this.shadow.querySelector('.result-search-page').style.height = "auto";
                        this.shadow.querySelector('.result-search-page').style.overflowY = "hidden";
                        this.shadow.querySelector('.result-search-page').insertAdjacentHTML('beforeend', `
                            <div class="no-search-page">Không tìm thấy kết quả phù hợp</div>`);
                    }
                    else if (count > 6) {
                        this.shadow.querySelector('.result-search-page').style.height = "300px";
                        this.shadow.querySelector('.result-search-page').style.overflowY = "auto";
                    }
                    else {
                        this.shadow.querySelector('.result-search-page').style.height = "auto";
                        this.shadow.querySelector('.result-search-page').style.overflowY = "hidden";
                    }
                }
            })
        })
    }
}

window.customElements.define('bar-page', BarPage);