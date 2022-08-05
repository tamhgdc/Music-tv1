import { loadWeb } from "./utils.js";

// Định tuyến
const root = null;
const useHash = true; // Defaults to: false
const hash = "#"; // Defaults to: '#'
window.router = new Navigo(root, useHash, hash);

const $app = document.getElementById("app");

loadWeb();

// View list genre
window.router.on('/mainScreen/listGenre', () => {
    document.querySelector('main-screen').shadow.getElementById('app-content').innerHTML = `<list-genre></list-genre>`;
}).resolve();

// view list music has type is genre
window.router.on('/mainScreen/listGenre/:genre', (params) => {
    document.querySelector('main-screen').shadow.getElementById('app-content').innerHTML = `<list-music name="${params.genre}"></list-music>`;
}).resolve();

// view listen to music
window.router.on('/mainScreen/songPage/:id/:name', (params) => {
    document.querySelector('main-screen').shadow.getElementById('app-content').innerHTML = `<song-page id="${params.id}" name="${params.name}"></song-page>`;
}).resolve();

// view listen music love
window.router.on('/mainScreen/listYT/:id/:name', (params) => {
    document.querySelector('main-screen').shadow.querySelector('addtional-page').remove();
    document.querySelector('main-screen').shadow.querySelector('bar-page').insertAdjacentHTML('afterend', `<addtional-page name="listYT"></addtional-page>`)
    document.querySelector('main-screen').shadow.getElementById('app-content').innerHTML = `<song-page id="${params.id}" name="${params.name}"></song-page>`
}).resolve()

// view list music love
window.router.on('/mainScreen/listYT', () => {
    document.querySelector('main-screen').shadow.querySelector('addtional-page').remove();
    document.querySelector('main-screen').shadow.querySelector('bar-page').insertAdjacentHTML('afterend', `<addtional-page name="listYT"></addtional-page>`)
}).resolve();

// view admin home page
window.router.on('/mainAdminScreen', () => {
    $app.innerHTML = `<preloading-page></preloading-page>`;
    setTimeout(() => {
        $app.insertAdjacentHTML('beforeend', `<main-admin-screen></main-admin-screen>`);
    }, 10)
}).resolve()

// view musics admin
window.router.on('/mainAdminScreen/Musics', () => {
    document.querySelector('main-admin-screen').shadow.getElementById('app-admin-content').innerHTML = `<music-admin></music-admin>`;
}).resolve()

// view uploads admin
window.router.on('/mainAdminScreen/Uploads', () => {
    document.querySelector('main-admin-screen').shadow.getElementById('app-admin-content').innerHTML = `<upload-admin></upload-admin>`;
}).resolve()

// view requests admin
window.router.on('/mainAdminScreen/Requests', () => {
    document.querySelector('main-admin-screen').shadow.getElementById('app-admin-content').innerHTML = `<request-admin></request-admin>`;
}).resolve()

// view suggestions admin
window.router.on('/mainAdminScreen/Suggestions', () => {
    document.querySelector('main-admin-screen').shadow.getElementById('app-admin-content').innerHTML = `<suggestion-admin></suggestion-admin>`;
}).resolve()

// view users admin
window.router.on('/mainAdminScreen/Users', () => {
    document.querySelector('main-admin-screen').shadow.getElementById('app-admin-content').innerHTML = `<user-admin></user-admin>`;
}).resolve()

window.router.on('/', () => {
    $app.innerHTML = `<preloading-page></preloading-page>`;
    setTimeout(() => {
        $app.insertAdjacentHTML('beforeend', `<main-screen></main-screen>`);
    }, 10)
}).resolve();

