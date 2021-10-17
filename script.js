//ПОЛУЧАЕМ ДОСТУП К ЭЛЕМЕНТАМ ФОРМЫ
const form = document.getElementById('form');
const login = document.getElementById('login');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const submitBtn = document.getElementById('submitBtn')

form.addEventListener('submit', e => {
    //СБРАСЫВАЕМ БАЗОВОЕ ПОВЕДЕНИЕ ФОРМЫ
    e.preventDefault();

    //ЗАПУСКАЕМ ПРОВЕРКУ ЯЧЕЕК ФОРМЫ
    validate()
    
})

// showHidePassword()

//ФУНКЦИЯ ПРОВЕРКИ
function validate () {
    const loginValue = login.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    const lettersRegExp = /^[A-Za-z0-9]+$/;
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegExp =  /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;

    let loginValid = false
    let emailValid = false
    let phoneValid = false
    let passwordValid = false
    let password2Valid = false

    //ПРОВЕРКА ЛОГИНА
    if(loginValue === "") {
        setErrormsg(login, 'Введите ваш логин')
    } else if(loginValue.length < 6) {
        setErrormsg(login, 'Логин должен быть не менее 6 символов')
    } else if(!lettersRegExp.test(loginValue)) {
        setErrormsg(login, 'Логин должен содержать только латинские буквы и цифры')
    } else {
        success(login)
        loginValid = true
    }

    //ПРОВЕРКА ПОЧТЫ
    if(emailValue === "") {
        setErrormsg(email, 'Введите ваш Email в формате example@gmail.com')
    } else if (!emailRegExp.test(emailValue)) {
        setErrormsg(email, 'Введите ваш Email в формате example@gmail.com')
    } else {
        success(email)
        emailValid = true
    }

    //ПРОВЕРКА ТЕЛЕФОНА
    if(phoneValue === "") {
        setErrormsg(phone, "Укажите ваш телефон")
    } else if(!phoneRegExp.test(phoneValue)) {
        setErrormsg(phone, "Введите телефон в формате +7(999) 999 99 99")
    } else if(phoneValue.length != 17) {
        setErrormsg(phone, "Введите телефон в формате +7(999) 999 99 99")
    } else {
        success(phone)
        phoneValid = true
    }

    //ПРОВЕРКА ПАРОЛЯ
    if(passwordValue.length < 8) {
        setErrormsg(password, "Пароль должен быть не менее 8 символов")
    }else {
        success(password)
        passwordValid = true
    }

    if(password2Value != passwordValue) {
        setErrormsg(password2, "Пароли должны совпадать")
    } else if(password2Value === "") {
        setErrormsg(password2, "Пароль должен быть не менее 8 символов")
    } else {
        success(password2)
        password2Valid = true
    }

    //ЕСЛИ ВСЕ ПОЛЯ ЗАПОЛНЕНЫ. ДОБАВЛЯЕМ ДАННЫЕ login & password в LocalStorage И ДЕЛАЕМ redirect на greet.html
    if(loginValid && emailValid && phoneValid && passwordValid && password2Valid == true) {
        saveToLS(loginValue, passwordValue)
        window.location.href="greet.html"
    } else {
        return setErrormsg(input, errorMessages)
    }
    
}

//ФУНКЦИЯ ВЫДАЧИ ОШИБКИ
function setErrormsg(input, errorMessages) {
    const formControl = input.parentElement;
    small = formControl.querySelector('#errorMsg')
    small.innerText = errorMessages
    small.classList.remove('hidden');
    input.classList.add('error')
}

function success(input) {
    const formControl = input.parentElement;
    small = formControl.querySelector('#errorMsg')
    small.classList.add('hidden');
    input.classList.remove('error')
}

//СОХРАНЯЕМ ДАННЫЕ В LocalStorage
function saveToLS(userLogin, userPassword) {
    userLogin = login.value.trim()
    userPassword = password.value.trim()
    const user = {
        username: userLogin,
        password: userPassword
    }
    localStorage.setItem('username', user.username)
    localStorage.setItem('password', user.password)
}

