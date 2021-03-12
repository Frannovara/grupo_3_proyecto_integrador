window.addEventListener('load', ()=> {
    let email = document.querySelector('#email')
    let emailError = document.querySelector('#email-error')
    let form = document.querySelector('#contact-form')
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    email.addEventListener('blur', ()=> {
        if(email.value.match(regexEmail)) {
            emailError.innerHTML = ""
            emailError.style.visibility = 'hidden'
        } else {
            emailError.innerHTML = "<small>El email ingresado no corresponde con un email válido</small>"
            emailError.style.visibility = 'visible'
        }
    })
    form.addEventListener('submit', function(event) {
        event.preventDefault()
        let i=0
        if(!email.value.match(regexEmail)) {
            emailError.innerHTML = "<small>El email ingresado no corresponde con un email válido</small>"
            emailError.style.visibility = 'visible'
        } else {
            swal("Exito","El usuario fue registrado con éxito","success")
            .then(()=>{
                form.submit()
            })
        }
    })
})