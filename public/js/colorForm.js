window.addEventListener('load', ()=>{
    let qs = function(p) {
        return document.querySelector(p)
    }
    
    let regexImage = /([0-9a-zA-Z\._-]+.(png|PNG|gif|GIF|jp[e]?g|JP[E]?G))/g

    let image = qs('#image')
    let color = qs('#color')
    let colorForm = qs('.add-color-form')

    let imageError = qs('#image-error')
    let colorError = qs('#color-error')

    image.addEventListener('input', function() {
        if(!this.files[0].name.match(regexImage)) {
            imageError.innerHTML = `<small>El archivo seleccionado no es una imagen</small>`
            imageError.style.visibility = 'visible'
        } else {
            imageError.style.visibility = 'hidden'
        }
    })
    color.addEventListener('input', function() {
        if(this.value == 0) {
            colorError.innerHTML = `<small>Debe seleccionar un color</small>`
            colorError.style.visibility = 'visible'
        } else {
            colorError.style.visibility = 'hidden'
        }
    })

    colorForm.addEventListener('submit', function (event) {
        event.preventDefault()
        let i = 0
        if(color.value == 0) {
            colorError.innerHTML = `<small>Debe seleccionar un color</small>`
            colorError.style.visibility = 'visible'
            i++
        }
        if(!image.files[0].name.match(regexImage)) {
            imageError.innerHTML = `<small>El archivo seleccionado no es una imagen</small>`
            imageError.style.visibility = 'visible'
            i++
        }
        if(i==0){
            sweetAlert("Exito","El formulario se cargó correctamente","success")
            .then(()=>{
                colorForm.submit()
            })
        }
    })
})