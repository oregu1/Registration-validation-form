document.addEventListener('DOMContentLoaded', function() {
    //ПОЛУЧАЕМ ДОСТУП К ЭЛЕМЕНТАМ ФОРМЫ
    const form = document.getElementById('form');
    const login = document.getElementById('login');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');

    //иконки ПОКАЗАТЬ и СПРЯТАТЬ пароль СДЕЛАЛ КОСТЫЛЬНО)))
    const iconOne = document.getElementById('iconOne')
    const iconTwo = document.getElementById('iconTwo')

    iconOne.addEventListener('click', ()=> {
        if(password.type === 'password') {
            password.setAttribute('type', 'text')
            iconOne.className = 'fas fa-eye-slash'
        } else {
            password.setAttribute('type', 'password')
            iconOne.className = 'fas fa-eye'
        }
    })

    iconTwo.addEventListener('click', ()=> {
        if(password2.type === 'password') {
            password2.setAttribute('type', 'text')
            iconTwo.className = 'fas fa-eye-slash'
        } else {
            password2.setAttribute('type', 'password')
            iconTwo.className = 'fas fa-eye'
        }
    })
 

    //ПРОВЕРКА ТЕЛЕФОНА
    let getInputNumbersValue = function(input) {
        return input.value.replace(/\D/g, "")
    }

    let onPhoneInput = function(e) {
        let input = e.target;
        let inputNumbersValue = getInputNumbersValue(input);
        let formattedInputValue = '';
        let selectionStart = input.selectionStart; //отслеживаем положение нашего курсора
        
        if(!inputNumbersValue) {
            return input.value = "";
        }

        //редактирование данных в середине или конце строки
        if(input.value.length != selectionStart) {
            if(e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return
        }

        //ДЕЛАЕМ ПРОВЕРКУ РУССКИЙ НОМЕР ИЛИ НЕТ
        if(['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
            //ЕСЛИ КЛИЕНТ ВВОДИТ НОМЕР С 7,8 ИЛИ 9 ТО РУССКИЙ НОМЕР
            if(inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            
            let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = firstSymbols + " ";

            if(inputNumbersValue.length > 1) {
                formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
            }
            if(inputNumbersValue.length >= 5) {
                formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
            }
            if(inputNumbersValue.length >= 8) {
                formattedInputValue += " " + inputNumbersValue.substring(7, 9);
            }
            if(inputNumbersValue.length >= 10) {
                formattedInputValue += " " + inputNumbersValue.substring(9, 11);
            }

        } else {
            //НЕ РУССКИЙ НОМЕР
            formattedInputValue = "+" + inputNumbersValue.substring(0, 16); //здесь ограничиваем длинну вводимых символов телефона до 15
            setErrormsg(phone, "Введите телефон в формате +7(999) 999 99 99")
        }
        input.value = formattedInputValue;
    }

    let onPhoneKeyDown = function(e) {
        //удаляем первую цифру
        let input = e.target
        if(e.keyCode == 8 && getInputNumbersValue(input).length == 1) {
            input.value = "";
        }
    }

    let onPhonePaste = function(e) {
        let pasted = e.clipboardData || window.clipboardData;
        let input = e.target;
        inputNumbersValue = getInputNumbersValue(input);

        if(pasted) {
            let pastedText = pasted.getData("Text");
            if(/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
            }
        }
    }

    phone.addEventListener('input', onPhoneInput);
    phone.addEventListener('keydown', onPhoneKeyDown);
    phone.addEventListener('paste', onPhonePaste);


  //ПРОВЕРКА ТЕЛЕФОНА


    form.addEventListener('submit', e => {
        //СБРАСЫВАЕМ БАЗОВОЕ ПОВЕДЕНИЕ ФОРМЫ
        e.preventDefault();

        //ЗАПУСКАЕМ ПРОВЕРКУ ЯЧЕЕК ФОРМЫ
        validate()
    })

    //ФУНКЦИЯ ПРОВЕРКИ
    function validate () {
        const loginValue = login.value.trim();
        const emailValue = email.value.trim();
        // const phoneValue = phone.value.replace(/\D/g, "");
        const passwordValue = password.value.trim();
        const password2Value = password2.value.trim();

        //Регулярные выражения
        const lettersRegExp = /^[A-Za-z0-9]+$/;
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


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
            if(phone.value === "") {
                setErrormsg(phone, "Укажите ваш телефон")
            } else if(phone.value.length < 10) {
                setErrormsg(phone, "Введите полностью ваш телефон")
            }
            else {
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


})
