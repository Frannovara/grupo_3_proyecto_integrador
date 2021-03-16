window.addEventListener('load', () => {
    let qs = function(a) {
        return document.querySelector(a)
    }
    let qsa = function(a) {
        return document.querySelectorAll(a)
    }
    
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    let regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g

    let email = qs('#email')
    let password = qs('#password')
    let form = qs('.login-form')

    let emailError = qs('#email_error')
    let passwordError = qs('#password_error')


    


    window.addEventListener('blur', () =>{ 
        let emailCheck = regexEmail.test(email.value)
        if(emailCheck){
            emailError.innerHTML = ""
            emailError.style.visibility = 'hidden'
        } else {
            emailError.innerHTML = "<small>El email ingresado no corresponde con un email válido</small>"
            emailError.style.visibility = 'visible'
        }
        })
    
    window.addEventListener('blur' ,() =>{
        /* let passwordCheck = regexPassword.match(password.value) */
        if(password.value.match(regexPassword)){
            passwordError.innerHTML = ""
            passwordError.style.visibility = 'hidden'
        } else {
            passwordError.innerHTML = "<small>La contraseña no es valida</small>"
            passwordError.style.visibility = 'visible'
        }
       
    })
     


























})