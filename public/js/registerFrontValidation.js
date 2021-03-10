window.addEventListener('load', function() {
    let qs = function(a) {
        return document.querySelector(a)
    }
    let qsa = function(a) {
        return document.querySelectorAll(a)
    }
    
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/g


    let firstName = qs('#first_name')
    let lastName = qs('#last_name')
    let email = qs('#email')
    let password = qs('#password')
    let rePassword = qs('#re_password')
    let terms = qs('#terms')
    let form = qs('#register_form')

    let firstNameError = qs('#first_name_error')
    let lastNameError = qs('#last_name_error')
    let emailError = qs('#email_error')
    let passwordError = qs('#password_error')
    let rePasswordError = qs('#re_password_error')
    let termsError = qs('#terms_error')

    firstName.addEventListener('blur', function() {
        if(firstName.value.length < 2 ) {
            firstNameError.innerHTML = "<small>El nombre debe tener al menos 2 caracteres</small>"
            firstNameError.style.visibility = 'visible'
        } else {
            firstNameError.innerHTML = ""
            firstNameError.style.visibility = 'hidden'
        }
    })
    lastName.addEventListener('blur', function() {
        if(lastName.value.length < 2 ) {
            lastNameError.innerHTML = "<small>El apellido debe tener al menos 2 caracteres</small>"
            lastNameError.style.visibility = 'visible'
        } else {
            lastNameError.innerHTML = ""
            lastNameError.style.visibility = 'hidden'
        }
    })
    email.addEventListener('blur', function() {
        let emailOk = regexEmail.test(email.value)
        if(emailOk) {
            emailError.innerHTML = ""
            emailError.style.visibility = 'hidden'
        } else {
            emailError.innerHTML = "<small>El email ingresado no corresponde con un email válido</small>"
            emailError.style.visibility = 'visible'
        }
    })
    password.addEventListener('blur', function() {
        if(rePassword.value != "" && rePassword.value != password.value) {
            rePasswordError.innerHTML = "<small>Las contraseñas deben coincidir</small>"
            rePasswordError.style.visibility = 'visible'
        }
        let passwordOk = regexPassword.test(password.value)
        if(passwordOk) {
            passwordError.innerHTML =""
            passwordError.style.visibility = 'hidden'
        } else {
            passwordError.innerHTML = "<small>La contraseña debe tener al menos un número, una mayúscula, una mínuscula y 8 caracteres</small>"
            passwordError.style.visibility = 'visible'
        }
    })
    rePassword.addEventListener('blur', function() {
        if(password.value != "" && rePassword.value != password.value) {
            rePasswordError.innerHTML = "<small>Las contraseñas deben coincidir</small>"
            rePasswordError.style.visibility = 'visible'
        } else {
            rePasswordError.innerHTML = ""
            rePasswordError.style.visibility = 'hidden'
        }
    })
    terms.addEventListener('change', function(){
        if(!terms.checked) { 
            termsError.innerHTML = "<small>Debes aceptar los términos y condiciones</small>"
            termsError.style.visibility = 'visible'
        } else {
            termsError.innerHTML = ""
            termsError.style.visibility = 'hidden'
        }
    })

    form.addEventListener('submit', function(event) {
        event.preventDefault()
        let passwordOk = regexPassword.test(password.value)
        let emailOk = regexEmail.test(email.value)
        let i=0

        if(firstName.value.length < 2 ) {
            firstNameError.innerHTML = "<small>El nombre debe tener al menos 2 caracteres</small>"
            firstNameError.style.visibility = 'visible'
            i++
        }
        if(lastName.value.length < 2 ) {
            lastNameError.innerHTML = "<small>El apellido debe tener al menos 2 caracteres</small>"
            lastNameError.style.visibility = 'visible'
            i++
        }
        if(!emailOk) {
            emailError.innerHTML = "<small>El email ingresado no corresponde con un email válido</small>"
            emailError.style.visibility = 'visible'
            i++
        }
        if(!passwordOk) {
            passwordError.innerHTML = "<small>La contraseña debe tener al menos un número, una mayúscula, una mínuscula y 8 caracteres</small>"
            passwordError.style.visibility = 'visible'
            i++
        }
        if(rePassword.value != password.value) {
            rePasswordError.innerHTML = "<small>Las contraseñas deben coincidir</small>"
            rePasswordError.style.visibility = 'visible'
            i++
        }
        if(!terms.checked) { 
            termsError.innerHTML = "<small>Debes aceptar los términos y condiciones</small>"
            termsError.style.visibility = 'visible'
            i++
        }
        console.log(i);
        if( i>0 ) {
            event.preventDefault()
        }
    })
})