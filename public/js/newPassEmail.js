window.addEventListener('load', ()=> {

    fetch('/api/users')
    .then(response => {
        return response.json()
    })
    .then(dataDecode => {
        console.log(dataDecode)
        users = dataDecode.data;
        console.log(users);
    })

    let emailNewPass = document.querySelector('#email-newPass')
    let emailNewPassErrors = document.querySelector('#email-new-pass-errors')
    let form = document.querySelector('.new-pass-form')

    emailNewPass.addEventListener('blur', function() {
        console.log(users.indexOf(this.value));
        if (users.indexOf(this.value) == -1 ) {
            emailNewPassErrors.innerHTML = `<small>El email ingresado no corresponde con un email registrado</small>`
            emailNewPassErrors.style.visibility = 'visible'
        } else {
            emailNewPassErrors.innerHTML = ``
            emailNewPassErrors.style.visibility = 'hidden'
        }
    })
    form.addEventListener('submit', function(event) {
        event.preventDefault()
        if(users.indexOf(emailNewPass.value) == -1) {
            emailNewPassErrors.innerHTML = `<small>El email ingresado no corresponde con un email registrado</small>`
            emailNewPassErrors.style.visibility = 'visible'
        } else {
            swal("Exito","Revise su email para regenerar su contraseña","success")
            .then( () => {
                form.submit()
            })
        }
    })

})