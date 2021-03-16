window.addEventListener('load', ()=> {

    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g


    let emailNewPass = document.querySelector('#email-newPass')
    let emailNewPassErrors = document.querySelector('#email-new-pass-errors')
    let form = document.querySelector('.new-pass-form')


    form.addEventListener('submit', function(event) {
        event.preventDefault()
        if(!emailNewPass.value.match(regexEmail)) {
            emailNewPassErrors.innerHTML = `<small>El email ingresado no corresponde con un email válido</small>`
            emailNewPassErrors.style.visibility = 'visible'
        } else {
            fetch(`/api/users/${emailNewPass.value}`)
            .then(response => {
                return response.json()
            })
            .then(dataDecode => {
                let register = dataDecode.email;
                console.log(register);
                if (!register) {
                    emailNewPassErrors.innerHTML = `<small>El email ingresado no corresponde con un email registrado</small>`
                    emailNewPassErrors.style.visibility = 'visible'
                } else {
                    swal("Exito","Revise su email para regenerar su contraseña","success")
            .then( () => {
                form.submit()
            })
                }
            })
        }
    })

})