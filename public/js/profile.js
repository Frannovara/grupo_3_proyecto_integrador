window.addEventListener('load', function(){
    let qs = function(param) {
        return document.querySelector(param)
    }
    let qsa = function(param) {
        return document.querySelectorAll(param)
    }

    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    let regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g
    let regexImage = /([0-9a-zA-Z\._-]+.(png|PNG|gif|GIF|jp[e]?g|JP[E]?G))/g


    let imageButton = qs('#change-image-button')
    let changePasswordButton = qs('#change-password-button')
    let editUserButton = qs('#edit-user-button')
    let password = qs('#password')
    let rePassword = qs('#re_password')
    let image = qs('#image')
    let email = qs('#email')
    let firstName = qs('#first_name')
    let lastName = qs('#last_name')
    
    let editForm = qs('#edit-user-form')
    let passwordForm = qs('#password-form')
    let imageForm = qs('#image-form')

    let closeImage = qs('#close-image')
    let closeEdit = qs('#close-edit')
    let closePassword = qs('#close-password')
    let passwordError = qs('#password_error')
    let rePasswordError = qs('#re_password_error')
    let imageError = qs('#image_error')
    let emailError = qs('#email-errors')
    let lastNameError = qs('#last-name-errors')
    let firstNameError = qs('#first-name-errors')

    imageButton.addEventListener('click', ()=>{
        qs('#profile-image-form').style.display = 'block'
    })
    changePasswordButton.addEventListener('click', ()=>{
        qs('#change-password-form').style.display = 'block'
    })
    editUserButton.addEventListener('click', ()=>{
        qs('#edit-user-form').style.display = 'block'
    })

    closeEdit.addEventListener('click', function() {
        qs('#edit-user-form').style.display = 'none'
    })
    closeImage.addEventListener('click', function() {
        qs('#profile-image-form').style.display = 'none'
    })
    closePassword.addEventListener('click', function() {
        qs('#change-password-form').style.display = 'none'
    })

    password.addEventListener('blur', function() {
        if(rePassword.value != "" && rePassword.value != password.value) {
            rePasswordError.innerHTML = "<small>Las contraseñas deben coincidir</small>"
            rePasswordError.style.visibility = 'visible'
        }
        
        if(password.value.match(regexPassword)) {
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

    passwordForm.addEventListener('submit', function(event){
        event.preventDefault()
        let i=0
        if(!password.value.match(regexPassword)) {
            passwordError.innerHTML = "<small>La contraseña debe tener al menos un número, una mayúscula, una mínuscula y 8 caracteres</small>"
            passwordError.style.visibility = 'visible'
            i++
        }
        if(rePassword.value != password.value) {
            rePasswordError.innerHTML = "<small>Las contraseñas deben coincidir</small>"
            rePasswordError.style.visibility = 'visible'
            i++
        }
        if( i == 0 ) {
            swal("Exito","La contraseña fue modificada con éxito","success")
            .then(()=>{
                passwordForm.submit()
            })
        }
    })

    image.addEventListener('input', function(){
        if(!image.files[0].name.match(regexImage)) {
            imageError.innerHTML = `<small>El archivo ingresado no es una imagen</small>`
            imageError.style.visibility = "visible"
        } else {
            imageError.innerHTML = ``
            imageError.style.visibility = "hidden"
        }
    })

    imageForm.addEventListener('submit', function(event){
        event.preventDefault()
        let i = 0
        if(!image.files[0].name.match(regexImage)) {
            imageError.innerHTML = `<small>El archivo ingresado no es una imagen</small>`
            imageError.style.visibility = "visible"
            i++
        }
        if(i == 0) {
            swal("Exito", "Se modificó la imagen de perfil", "success")
            .then(() => {
                imageForm.submit()
            })
        }
    })

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
        if(email.value.match(regexEmail)) {
            emailError.innerHTML = ""
            emailError.style.visibility = 'hidden'
        } else {
            emailError.innerHTML = "<small>El email ingresado no corresponde con un email válido</small>"
            emailError.style.visibility = 'visible'
        }
    })

    editForm.addEventListener('submit', function(event) {
        event.preventDefault()
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
        if(!email.value.match(regexEmail)) {
            emailError.innerHTML = "<small>El email ingresado no corresponde con un email válido</small>"
            emailError.style.visibility = 'visible'
            i++
        }
        if( i == 0 ) {
            swal("Exito","El usuario fue registrado con éxito","success")
            .then(()=>{
                editForm.submit()
            })
        }
    })
})