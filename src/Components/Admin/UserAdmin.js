// User admin content

import { adminStyle } from "../../CSS/style.js";
import { getData, xoa_dau, delData, verifyEmail, verifyPassword, sha1 } from "../../utils.js";

class UserAdmin extends HTMLElement {
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
        <div id="admin-user">
            <div class="admin-content">
                <div class="admin-name">Quản lý tài khoản người dùng</div>
                <div class="admin-list">
                    <form id="add-user">
                        <label for="add-user-email">Email<span style="color: red;">*</span></label>
                        <input type="search" class="input-add-user" id="add-user-email" placeholder="username@gmail.com"
                            aria-label="Username" aria-describedby="basic-addon1" autocomplete="off">
                        <label for="add-user-user">Tên tài khoản<span style="color: red;">*</span></label>
                        <input type="search" class="input-add-user" id="add-user-user" placeholder="username1"
                            aria-label="Username" aria-describedby="basic-addon1" autocomplete="off">
                        <label for="add-user-password">Mật khẩu<span style="color: red;">*</span></label>
                        <input type="search" class="input-add-user" id="add-user-pass" placeholder="Abcxy123"
                            aria-label="Username" aria-describedby="basic-addon1" autocomplete="off">
                    </form>
                    <div class="but-add-user">
                        <div class="form-result"></div> 
                        <div>
                            <button class="form-clear button">Clear</button>
                            <button class="form-add button">Add</button>
                        </div>
                    </div>
                    <form>
                        <label for="admin-music-search">Tìm kiếm</label>
                        <input type="search" id="search-user-admin" placeholder="Tìm tài khoản..."
                            aria-label="Username" aria-describedby="basic-addon1">
                    </form>
                    <table>
                        <tr>
                            <th class="col-4">Gmail</th>
                            <th class="col-4">Tên tài khoản</th>
                            <th class="col-4">Chức năng</th>
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
        this.shadow.querySelector('.admin-content').style.minHeight = `${screen.height - 100}px`;

        getData('users').then((res) => {
            const listUser = [];
            res.forEach((data) => {
                if (data.role == "user") listUser.push(data);
            })
            printList(listUser);

            // Search user admin
            this.shadow.getElementById('search-user-admin').addEventListener('input', () => {
                const keyWord = this.shadow.getElementById('search-user-admin').value;
                const listSearch = [];
                for (let x of listUser) {
                    if (xoa_dau(x.email).toLowerCase().search(keyWord.toLowerCase()) != -1 || xoa_dau(x.username).toLowerCase().search(keyWord.toLowerCase()) != -1) {
                        listSearch.push(x);
                    }
                }
                printList(listSearch);
            })
        })

        // Print list
        const printList = (listUser) => {
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
            const max = listUser.length;
            if (max == 0) {
                this.shadow.querySelector('.admin-next').style.visibility = 'hidden';
            }
            else {
                for (i = index - 1; i < index + 9; ++i) {
                    this.shadow.querySelector('table').insertAdjacentHTML('beforeend', `
                <tr>
                    <td>${listUser[i].email}</span></td>
                    <td>${listUser[i].username}</td>
                    <td>
                        <button class="button form-delUser button-delete">Xóa tài khoản</button>
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
                    if (index != max + 1) {
                        const countPage = this.shadow.querySelector('.admin-count-page');
                        countPage.textContent = Number(countPage.textContent) + 1;
                        this.shadow.querySelector('.admin-pre').style.visibility = 'visible';
                        removeList();
                        for (let i = index - 1; i < index + 9; ++i) {
                            this.shadow.querySelector('table').insertAdjacentHTML('beforeend', `
                        <tr>
                            <td>${listUser[i].email}</span></td>
                            <td>${listUser[i].username}</td>
                            <td>
                                <button class="button form-delUser button-delete">Xóa tài khoản</button>
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
                            <td>${listUser[i].email}</span></td>
                            <td>${listUser[i].username}</td>
                            <td>
                                <button class="button form-delUser button-delete">Xóa tài khoản</button>
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

        // Clear form 
        this.shadow.querySelector('.form-clear').addEventListener('click', () => {
            this.shadow.getElementById('add-user').reset();
        })

        // Add user
        this.shadow.querySelector('.form-add').addEventListener('click', async () => {
            const email = this.shadow.getElementById('add-user-email').value;
            const username = this.shadow.getElementById('add-user-user').value;
            const pass = this.shadow.getElementById('add-user-pass').value;
            const result = this.shadow.querySelector('.form-result');
            result.style.color = 'red';
            if (email == "" || username == "" || pass == "") {
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
            else if (!verifyPassword(pass)) {
                result.textContent = 'Mật khẩu chỉ bao gồm chữ hoặc số, tối thiểu 8 kí tự chứa ít nhất 1 chữ số, 1 chữ in thường và 1 chữ in hoa';
                setTimeout(() => {
                    result.textContent = '';
                }, 1000);
            }
            else {
                const responseEmail = await firebase.firestore().collection("users").where("email", "==", email).get();
                const responseAccount = await firebase.firestore().collection("users").where("username", "==", username).get();
                if (!responseEmail.empty) {
                    result.textContent = "Email đã tồn tại!";
                    setTimeout(() => {
                        result.textContent = '';
                    }, 1000);
                }
                else if (!responseAccount.empty) {
                    result.textContent = "Tài khoản đã tồn tại!";
                    setTimeout(() => {
                        result.textContent = '';
                    }, 1000);
                }
                else {
                    const password = sha1(pass);
                    const role = "user";
                    firebase.firestore().collection('users').add({ email, username, password, role }).then(() => {
                        result.style.color = 'green';
                        result.textContent = 'Thêm thành công';
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    })
                }
            }
        })
    }
}

window.customElements.define('user-admin', UserAdmin);