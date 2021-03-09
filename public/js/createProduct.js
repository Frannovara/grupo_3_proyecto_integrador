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
        
    })
    category.addEventListener('blur', function(){

    })
    brand.addEventListener('blur', function(){

    })
    price.addEventListener('blur', function(){

    })
    discount.addEventListener('blur', function(){

    })
    year.addEventListener('blur', function(){

    })
    description.addEventListener('blur', function(){

    })
    image.addEventListener('blur', function(){

    })
    color.addEventListener('blur', function(){

    })


})