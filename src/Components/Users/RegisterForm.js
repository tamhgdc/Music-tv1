// Form đăng ký
import { style } from "../../CSS/style.js";
import { verifyEmail, verifyPassword, sha1 } from "../../utils.js";

class RegisterForm extends HTMLElement {
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
        <div id="register">
            <div class="container-form">
                <div class="form col-6">
                    <div class="form-icon-close"><i class="far fa-times-circle"></i></div>
                    <div class="form-name">Đăng ký</div>
                    <div class="form-note">Những trường có dấu (<span style="color: red;">*</span>) bắt buộc điền</div>
                    <form>
                        <label>E-mail<span style="color: red;">*</span></label>
                        <input type="text" id="email" placeholder="thuvienamnhac@gmail.com" autocomplete="off"><br><br>
                        <label>Tên tài khoản<span style="color: red;">*</span></label>
                        <input type="text" id="user" placeholder="amnhac123" autocomplete="off"><br><br>
                        <label>Mật khẩu<span style="color: red;">*</span></label>
                        <input type="password" id="pass" placeholder="Aye123456" autocomplete="off">
                        <i class="far fa-question-circle"></i><br><br>
                        <div class="password-sup">
                            <p>- Mật khẩu tối thiểu 8 kí tự, bao gồm chữ và số</p>
                            <p>- Chứa ít nhất 1 chữ hoa, 1 chữ in thường và 1 chữ số.</p>
                        </div>
                        <label>Nhập lại mật khẩu<span style="color: red;">*</span></label>
                        <input type="password" id="passRepeat" placeholder="..." autocomplete="off"><br><br>
                    </form>
                    <div class="form-process">
                        <div class="form-result"></div>
                        <button class="form-access button">Đăng ký</button>
                        <div class="form-change">Nếu bạn đã có tài khoản?  <span>Đăng nhập ngay</span></div>
                    </div>
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        // Close form
        this.shadow.querySelector('.form-icon-close').addEventListener('click', () => {
            document.querySelector('main-screen').shadow.querySelector('register-form').style.display = 'none';
        })

        // Change page login
        this.shadow.querySelector('.form-change span').addEventListener('click', () => {
            document.querySelector('main-screen').shadow.querySelector('register-form').style.display = 'none';
            document.querySelector('main-screen').shadow.querySelector('loggin-form').style.display = 'block';
            document.querySelector('main-screen').shadow.querySelector('loggin-form').shadow.querySelector('form').reset();
        })

        // Password support hover 
        this.shadow.querySelector('.fa-question-circle').addEventListener('mouseover', () => {
            this.shadow.querySelector('.password-sup').style.display = "block";
        })

        this.shadow.querySelector('.fa-question-circle').addEventListener('mouseout', () => {
            this.shadow.querySelector('.password-sup').style.display = "none";
        })

        // Process resgister

        this.shadow.querySelector('.form-access').addEventListener('click', async () => {
            const email = this.shadow.getElementById('email').value;
            const username = this.shadow.getElementById('user').value;
            const pass = this.shadow.getElementById('pass').value;
            const repeatPass = this.shadow.getElementById('passRepeat').value;
            const result = this.shadow.querySelector('.form-result');
            result.style.color = 'red';
            if (email == "" || username == "" || pass == "" || repeatPass == "") {
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
            else if (!verifyPassword(pass)){
                result.textContent = 'Mật khẩu chỉ bao gồm chữ hoặc số, tối thiểu 8 kí tự chứa ít nhất 1 chữ số, 1 chữ in thường và 1 chữ in hoa';
                setTimeout(() => {
                    result.textContent = '';
                }, 1000);
            }
            else if (pass != repeatPass) {
                result.textContent = "Nhập lại mật khẩu không đúng!";
                this.shadow.getElementById("pass").value = "";
                this.shadow.getElementById("passRepeat").value = "";
                setTimeout(() => {
                    result.textContent = '';
                }, 1000);
            }
            else {
                const responseEmail = await firebase.firestore().collection("users").where("email", "==", email).get();
                const responseAccount = await firebase.firestore().collection("users").where("username", "==", username).get();
                if(!responseEmail.empty) {
                    result.textContent = "Email đã tồn tại!";
                    setTimeout(() => {
                        result.textContent = '';
                    }, 1000);
                }
                else if(!responseAccount.empty) {
                    result.textContent = "Tài khoản đã tồn tại!";
                    setTimeout(() => {
                        result.textContent = '';
                    }, 1000);
                }
                else {
                    const password = sha1(pass);
                    const role = 'user';
                    await firebase.firestore().collection("users").add({email, username, password, role});
                    result.style.color = "green";
                    result.textContent = "Đăng ký thành công";
                    setTimeout(() => {
                        result.textContent = '';
                        document.querySelector('main-screen').shadow.querySelector('register-form').style.display = 'none';
                        document.querySelector('main-screen').shadow.querySelector('loggin-form').style.display = 'block';
                        document.querySelector('main-screen').shadow.querySelector('loggin-form').shadow.querySelector('form').reset();
                    }, 1000)
                }
            }
        })
    }
}

window.customElements.define('register-form', RegisterForm);