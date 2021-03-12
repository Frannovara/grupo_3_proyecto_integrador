window.addEventListener('load', () => {
    let qs = function(a) {
        return document.querySelector(a)
    }
    let qsa = function(a) {
        return document.querySelectorAll(a)
    }
    
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/g

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
        }
     )



























})