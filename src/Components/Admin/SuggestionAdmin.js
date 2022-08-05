// Suggestion admin content

import { adminStyle } from "../../CSS/style.js";
import { getData, delData } from "../../utils.js";

class SuggestionAdmin extends HTMLElement {
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
        <div id="admin-suggestion">
            <div class="admin-content">
                <div class="admin-name">Quản lý phản hồi người dùng</div>
                <form class="form-view">
                    <label>Nội dung</label><br>
                    <textarea id="content" class="long-input view" placeholder="content..." autocomplete="off"></textarea><br><br>
                </form>
                <div class="form-result"></div>
                <div class="admin-list">
                    <table>
                        <tr>
                            <th class="col-3">Gmail</th>
                            <th class="col-6">Chủ đề</th>
                            <th class="col-3">Chức năng</th>
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

        getData('suggestions').then((res) => {
            const listSuggestion = res;
            printList(listSuggestion);
        })

        // Print list
        const printList = (listSuggestion) => {
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
            const max = listSuggestion.length;
            if(max == 0) {
                this.shadow.querySelector('.admin-next').style.visibility = 'hidden';
            }
            else {
                for (i = index - 1; i < index + 9; ++i) {
                    this.shadow.querySelector('table').insertAdjacentHTML('beforeend', `
                <tr>
                    <td>${listSuggestion[i].email}</td>
                    <td>${listSuggestion[i].subject}</td>
                    <td>
                        <button class="button form-add">View</button>
                        <button class="button form-delete" onlick="">Delete</button>
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
                            <td>${listSuggestion[i].email}</td>
                            <td>${listSuggestion[i].subject}</td>
                            <td>
                                <button class="button form-add">View</button>
                                <button class="button form-delete" onlick="">Delete</button>
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
                            <td>${listSuggestion[i].email}</td>
                            <td>${listSuggestion[i].subject}</td>
                            <td>
                                <button class="button form-add">View</button>
                                <button class="button form-delete" onlick="">Delete</button>
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

window.customElements.define('suggestion-admin', SuggestionAdmin);