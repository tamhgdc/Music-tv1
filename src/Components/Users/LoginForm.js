// Form đăng nhập

import { style } from "../../CSS/style.js";
import { sha1 } from "../../utils.js";

class LogginForm extends HTMLElement {
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
        <div id="loggin">
            <div class="container-form">
                <div class="form col-6">
                    <div class="form-icon-close"><i class="far fa-times-circle"></i></div>
                    <div class="d-flex">
                        <div class="form-left">
                            <div class="form-name">Đăng nhập</div>
                            <div class="form-note">Những trường có dấu (<span style="color: red;">*</span>) bắt buộc
                                điền</div>
                            <form>
                                <label>Tên đăng nhập<span style="color: red;">*</span></label>
                                <input type="text" id="user" placeholder="Username or email..."
                                    autocomplete="off"><br><br>
                                <label>Mật khẩu<span style="color: red;">*</span></label>
                                <input type="password" id="pass" placeholder="Password..."
                                    autocomplete="off"><br><br>
                            </form>
                            <div class="form-process">
                                <div class="form-result"></div>
                                <button class="form-access button">Đăng nhập</button>
                                <div class="form-change">Nếu bạn chưa có tài khoản? <span>Đăng ký ngay</span></div>
                            </div>
                        </div>
                        <div class="vl">
                            <span class="vl-innertext">or</span>
                        </div>
                        <div class="form-right">
                            <div class="text-center">Hoặc đăng nhập với</div>
                            <a class="fb loggin-others">
                                <i class="fa fa-facebook fa-fw"></i> Login with Facebook
                            </a>
                            <a class="twitter loggin-others">
                                <i class="fa fa-twitter fa-fw"></i> Login with Twitter
                            </a>
                            <a class="google loggin-others"><i class="fa fa-google fa-fw">
                                </i> Login with Google+
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        this.shadow.querySelector('.form-icon-close').addEventListener('click', () => {
            document.querySelector('main-screen').shadow.querySelector('loggin-form').style.display = 'none';
        })

        this.shadow.querySelector('.form-change span').addEventListener('click', () => {
            document.querySelector('main-screen').shadow.querySelector('loggin-form').style.display = 'none';
            document.querySelector('main-screen').shadow.querySelector('register-form').style.display = 'block';
            document.querySelector('main-screen').shadow.querySelector('register-form').shadow.querySelector('form').reset();
        })

        // Process loggin

        this.shadow.querySelector('.form-access').addEventListener('click', async () => {
            const username = this.shadow.getElementById('user').value;
            const pass = this.shadow.getElementById('pass').value;
            const result = this.shadow.querySelector('.form-result');
            result.style.color = 'red';
            if (username == "" || pass == "") {
                result.textContent = 'Cần nhập đủ các trường có dấu *';
                setTimeout(() => {
                    result.textContent = '';
                }, 1000);
            }
            else {
                const responseEmail = await firebase.firestore().collection("users").where("email", "==", username).where("password", "==", sha1(pass)).get();
                const responseAccount = await firebase.firestore().collection("users").where("username", "==", username).where("password", "==", sha1(pass)).get();
                if (!responseEmail.empty || !responseAccount.empty) {
                    if (!responseEmail.empty) {
                        if (responseEmail.docs[0].data().role == "user") {
                            result.style.color = "green";
                            result.textContent = "Đăng nhập thành công";
                            setTimeout(() => {
                                localStorage.setItem('logginState', `${responseEmail.docs[0].data().username}`);
                                localStorage.setItem('emailLoggin', `${responseEmail.docs[0].data().email}`);
                                document.querySelector('main-screen').shadow.querySelector('bar-page').shadow.querySelector('.name-user').textContent = `Hello, ${responseEmail.docs[0].data().username}`;
                                result.textContent = '';
                                document.querySelector('main-screen').shadow.querySelector('menu-page').shadow.querySelector('.menu-sign-in').style.visibility = 'hidden';
                                document.querySelector('main-screen').shadow.querySelector('bar-page').shadow.querySelector('.fa-user-circle').style.display = 'block';
                                document.querySelector('main-screen').shadow.querySelector('bar-page').shadow.querySelector('.far').style.display = 'none';
                                document.querySelector('main-screen').shadow.querySelector('loggin-form').style.display = 'none';
                                location.reload();
                            }, 500);
                        }
                        else {
                            router.navigate('/mainAdminScreen');
                            localStorage.setItem('mainScreen', 'mainAdminScreen');
                        }
                    }
                    else if (!responseAccount.empty) {
                        if (responseAccount.docs[0].data().role == "user") {
                            result.style.color = "green";
                            result.textContent = "Đăng nhập thành công";
                            setTimeout(() => {
                                localStorage.setItem('logginState', `${responseAccount.docs[0].data().username}`);
                                localStorage.setItem('emailLoggin', `${responseAccount.docs[0].data().email}`);
                                document.querySelector('main-screen').shadow.querySelector('bar-page').shadow.querySelector('.name-user').textContent = `Hello, ${responseAccount.docs[0].data().username}`;
                                result.textContent = '';
                                document.querySelector('main-screen').shadow.querySelector('menu-page').shadow.querySelector('.menu-sign-in').style.visibility = 'hidden';
                                document.querySelector('main-screen').shadow.querySelector('bar-page').shadow.querySelector('.fa-user-circle').style.display = 'block';
                                document.querySelector('main-screen').shadow.querySelector('bar-page').shadow.querySelector('.far').style.display = 'none';
                                document.querySelector('main-screen').shadow.querySelector('loggin-form').style.display = 'none';
                                location.reload();
                            }, 500);
                        }
                        else {
                            router.navigate('/mainAdminScreen');
                            localStorage.setItem('mainScreen', 'mainAdminScreen');
                        }
                    }
                }
                else {
                    result.textContent = "Thông tin đăng nhập sai";
                    setTimeout(() => {
                        result.textContent = '';
                    }, 1000);
                }
            }
        })
    }
}

window.customElements.define('loggin-form', LogginForm)
