// Music admin content

import { adminStyle } from "../../CSS/style.js";
import { getData, xoa_dau, delData } from "../../utils.js";

class MusicAdmin extends HTMLElement {
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
        <div id="admin-music">
            <div class="admin-content">
                <div class="admin-name">Quản lý thư viện âm nhạc</div>
                <add-form></add-form>
                <div class="admin-list">
                    <form>
                        <label for="admin-music-search">Tìm kiếm</label>
                        <input type="search" id="search-music-admin" placeholder="Tìm bài hát..."
                            aria-label="Username" aria-describedby="basic-addon1">
                    </form>
                    <table>
                        <tr>
                            <th class="col-9">Tên bài hát</th>
                            <th>Chức năng</th>
                        </tr>
                    </table>
                    <div class="admin-change">
                        <button class="button-change button admin-pre"><i class="fas fa-arrow-left"></i></button>
                        <p class="admin-count-page">1</p>
                        <button class="button-change button admin-next"><i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        // Sreen
        this.shadow.querySelector('.admin-content').style.minHeight = `${screen.height-100}px`;

        getData('musics').then((res) => {
            const listMusic = res;
            printList(listMusic);

            // Search music admin
            this.shadow.getElementById('search-music-admin').addEventListener('input', () => {
                const keyWord = this.shadow.getElementById('search-music-admin').value;
                const listSearch = [];
                for(let x of listMusic) {
                    if (xoa_dau(x.name).toLowerCase().search(keyWord.toLowerCase()) != -1 || xoa_dau(x.singer).toLowerCase().search(keyWord.toLowerCase()) != -1) {
                        listSearch.push(x);
                    }
                }
                printList(listSearch);
            })

        })

        // Print list
        const printList = (listMusic) => {
            removeList();
            const countPage = this.shadow.querySelector('.admin-count-page');
            if (countPage.textContent == "1") {
                this.shadow.querySelector('.admin-pre').style.visibility = 'hidden';
            }
            else {
                this.shadow.querySelector('.admin-pre').style.visibility = 'visible';
            }
            let index = 1;
            let i;
            const max = listMusic.length;
            if(max == 0) {
                this.shadow.querySelector('.admin-next').style.visibility = 'hidden';
            }
            else {
                for (i = index - 1; i < index + 9; ++i) {
                    this.shadow.querySelector('table').insertAdjacentHTML('beforeend', `
                <tr>
                    <td>${listMusic[i].name} - <span>${listMusic[i].singer}</span></td>
                    <td>
                        <button class="button form-update">Update</button>
                        <button class="button form-delete">Delete</button>
                    </td>
                </tr>`);
                    if (i == max - 1) {
                        this.shadow.querySelector('.admin-next').style.visibility = 'hidden';
                        break;
                    }
                }
                index += i;
    
                // Process next page 
                this.shadow.querySelector('.admin-next').addEventListener('click', () => {
                    if (index != max+1) {
                        const countPage = this.shadow.querySelector('.admin-count-page');
                        countPage.textContent = Number(countPage.textContent) + 1;
                        this.shadow.querySelector('.admin-pre').style.visibility = 'visible';
                        removeList();
                        for (let i = index - 1; i < index + 9; ++i) {
                            this.shadow.querySelector('table').insertAdjacentHTML('beforeend', `
                        <tr>
                            <td>${listMusic[i].name} - <span>${listMusic[i].singer}</span></td>
                            <td>
                                <button class="button form-update">Update</button>
                                <button class="button form-delete">Delete</button>
                            </td>
                        </tr>`);
                            if (i == max - 1) {
                                this.shadow.querySelector('.admin-next').style.visibility = 'hidden';
                                break;
                            }
                        }
                        index += i;
                    }
                })
    
                // Process pre page
                this.shadow.querySelector('.admin-pre').addEventListener('click', () => {
                    index -= 20;
                    if (index == 1) {
                        this.shadow.querySelector('.admin-pre').style.visibility = 'hidden';
                    }
                    const countPage = this.shadow.querySelector('.admin-count-page');
                    countPage.textContent = Number(countPage.textContent) - 1;
                    this.shadow.querySelector('.admin-next').style.visibility = 'visible';
                    removeList();
                    for (let i = index - 1; i < index + 9; ++i) {
                        this.shadow.querySelector('table').insertAdjacentHTML('beforeend', `
                        <tr>
                            <td>${listMusic[i].name} - <span>${listMusic[i].singer}</span></td>
                            <td>
                                <button class="button form-update">Update</button>
                                <button class="button form-delete">Delete</button>
                            </td>
                        </tr>`);
                    }
                    index += i;
                })
            }
        }

        // Remove list table

        const removeList = () => {
            const listTr = this.shadow.querySelectorAll('tr');
            for (let i = 1; i < listTr.length; ++i) {
                listTr[i].remove();
            }
        }
    }
}

window.customElements.define('music-admin', MusicAdmin);