window.addEventListener('load', function(){
    let qs = function(text) {
        return document.querySelector(text)
    }
    let qsa = function(text) {
        return document.querySelectorAll(text)
    }

    let regexImage = /([0-9a-zA-Z\._-]+.(png|PNG|gif|GIF|jp[e]?g|JP[E]?G))/g

    let name = qs('#name')
    let category = qs('#category')
    let brand = qs('#brand')
    let price = qs('#price')
    let discount = qs('#discount')
    let year = qs('#year')
    let description = qs('#description')
    let image = qs('#image')
    let color = qs('#color')
    let createForm = qs('.create-form')
    
    let nameError = qs('#nameError')
    let categoryError = qs('#categoryError')
    let brandError = qs('#brandError')
    let priceError = qs('#priceError')
    let discountError = qs('#discountError')
    let yearError = qs('#yearError')
    let descriptionError = qs('#descriptionError')
    let imageError = qs('#imageError')
    let colorError = qs('#colorError')
    
    name.addEventListener('blur', function(){
        if(name.value.length<5){
            nameError.innerHTML = `<small>El nombre debe tener al menos 5 caracteres</small>`
            nameError.style.visibility = "visible"
        } else {
            nameError.innerHTML = ``
            nameError.style.visibility = "hidden"
        }
    })
    category.addEventListener('input', function(){
        if (Number.isInteger(Number(category.value))) {
            categoryError.innerHTML = ``
            categoryError.style.visibility = "hidden"
        } else {
            categoryError.innerHTML = `<small>Este campo es obligatorio</small>`
            categoryError.style.visibility = "visible"
        }
    })
    brand.addEventListener('input', function(){
        if (Number.isInteger(Number(brand.value))) {
            brandError.innerHTML = ``
            brandError.style.visibility = "hidden"
        } else {
            brandError.innerHTML = `<small>Este campo es obligatorio</small>`
            brandError.style.visibility = "visible"
        }
    })
    price.addEventListener('blur', function(){
        if (Number.isInteger(Number(price.value)) && Number(price.value) > 0) {
            priceError.innerHTML = ``
            priceError.style.visibility = "hidden"
        } else {
            priceError.innerHTML = `<small>El precio debe ser un número mayor a cero</small>`
            priceError.style.visibility = "visible"
        }
    })
    discount.addEventListener('blur', function(){
        if (Number.isInteger(Number(discount.value)) && Number(discount.value) >= 0) {
            discountError.innerHTML = ``
            discountError.style.visibility = "hidden"
        } else {
            discountError.innerHTML = `<small>Debe ingresar un valor de descuento</small>`
            discountError.style.visibility = "visible"
        }
    })
    year.addEventListener('blur', function(){
        if (Number.isInteger(Number(year.value)) && year.value.length == 4) {
            yearError.innerHTML = ``
            yearError.style.visibility = "hidden"
        } else {
            yearError.innerHTML = `<small>Debe ingresar un año en formato YYYY</small>`
            yearError.style.visibility = "visible"
        }
    })
    description.addEventListener('blur', function(){
        if(description.value.length <20) {
            descriptionError.innerHTML = `<small>La descripción debe tener al menos 20 caracteres</small>`
            descriptionError.style.visibility = "visible"
        } else {
            descriptionError.innerHTML = ``
            descriptionError.style.visibility = "hidden"
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
    color.addEventListener('input', function(){
        if (Number.isInteger(Number(color.value))) {
            colorError.innerHTML = ``
            colorError.style.visibility = "hidden"
        } else {
            colorError.innerHTML = `<small>Este campo es obligatorio</small>`
            colorError.style.visibility = "visible"
        }
    })

    createForm.addEventListener('submit', function(event){
        event.preventDefault()
        let i = 0
        if(name.value.length<5){
            nameError.innerHTML = `<small>El nombre debe tener al menos 5 caracteres</small>`
            nameError.style.visibility = "visible"
            i++
        }
        if (!Number.isInteger(Number(category.value))) {
            categoryError.innerHTML = `<small>Este campo es obligatorio</small>`
            categoryError.style.visibility = "visible"
        }
        if (!Number.isInteger(Number(brand.value))) {
            brandError.innerHTML = `<small>Este campo es obligatorio</small>`
            brandError.style.visibility = "visible"
            i++
        }
        if (!Number.isInteger(Number(price.value)) || Number(price.value) <= 0) {
            priceError.innerHTML = `<small>El precio debe ser un número mayor a cero</small>`
            priceError.style.visibility = "visible"
            i++
        }
        if (!Number.isInteger(Number(discount.value)) || Number(discount.value) < 0) {
            discountError.innerHTML = `<small>Debe ingresar un valor de descuento</small>`
            discountError.style.visibility = "visible"
            i++
        }
        if (!Number.isInteger(Number(year.value)) || year.value.length != 4) {
            yearError.innerHTML = `<small>Debe ingresar un año en formato YYYY</small>`
            yearError.style.visibility = "visible"
            i++
        }
        if(description.value.length <20) {
            descriptionError.innerHTML = `<small>La descripción debe tener al menos 20 caracteres</small>`
            descriptionError.style.visibility = "visible"
            i++
        }
        if(!image.files[0].name.match(regexImage)) {
            imageError.innerHTML = `<small>El archivo ingresado no es una imagen</small>`
            imageError.style.visibility = "visible"
            i++
        }
        if (!Number.isInteger(Number(color.value))) {
            colorError.innerHTML = `<small>Este campo es obligatorio</small>`
            colorError.style.visibility = "visible"
            i++
        }

        if(i == 0) {
            swal("Exito", "El producto fue creado", "success")
            .then(() => {
                createForm.submit()
            })
        }
    })


})