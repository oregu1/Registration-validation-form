"use strict"

let userLogin;
let userPassword;

const quitBtn = document.querySelector('.quitBtn')

quitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href="index.html"
})

function getFromLS() {
    userLogin = localStorage.getItem('username')
    userPassword = localStorage.getItem('password')

    const header = document.querySelector('.registration-header')
    let h2 = document.createElement('h2')
    h2.innerHTML = `Здравствуйте, ${userLogin}!`
    header.append(h2)
}
document.body.onload = getFromLS()
