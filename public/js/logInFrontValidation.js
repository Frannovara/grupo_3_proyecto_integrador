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
    let form = qs('#login_form')

    let emailError = qs('#email_error')
    let passwordError = qs('#password_error')


    


    email.addEventListener('blur', () =>{ 
        /* let emailCheck = regexEmail.test(email.value) */
        if(email.value.match(regexEmail)){
            emailError.innerHTML = ""
            emailError.style.visibility = 'hidden'
        } else {
            emailError.innerHTML = "<small>El formato del email es incorrecto</small>"
            emailError.style.visibility = 'visible'
        }
        })
    
    password.addEventListener('blur' ,() =>{
        
        if(password.value.match(regexPassword)){
            passwordError.innerHTML = ""
            passwordError.style.visibility = 'hidden'
        } else {
            passwordError.innerHTML = "<small>El formato de la contraseña no es valido</small>"
            passwordError.style.visibility = 'visible'
        }
       
    })


    form.addEventListener('submit' , (e) =>{
        e.preventDefault();
        let i = 0;

        if(!email.value.match(regexEmail)){
            emailError.innerHTML = "<small>El formato del email es incorrecto</small>"
            emailError.style.visibility = 'visible'
            i++
        }else{
            fetch(`/api/users/${email.value}`)
            .then(response => {
                return response.json()
            })
            .then(apiData => {
                let notRegistered = apiData.email;
                if(!notRegistered){
                    emailError.innerHTML = `<small>El email ingresado no se encuentra registrado</small>`
                    emailError.style.visibility = 'visible'
                    i++
                }


            })
        }
        if(!password.value.match(regexPassword)){
            passwordError.innerHTML = "<small>El formato de la contraseña no es valido</small>"
            passwordError.style.visibility = 'visible'
            i++
        }
        if(i == 0){
            
                form.submit()
            
        }


    } )
     

})
























