window.addEventListener('load', function() {
    let apiFetch = function(url){
        fetch('url')
        .then(response => {
            return response.json()
        })
        .then(dataDecode => {
            data = dataDecode.data;
            return data
        })
    }

    let qs = function(param){
        return document.querySelector(param)
    }
    let color = qs('#actual_color')
    let category = qs('#actual_category')
    let brand = qs('#actual_brand')

    fetch('/api/products/colors')
    .then(response => {
        return response.json()
    })
    .then(dataDecode => {
        let colors = dataDecode.data;
        colors.forEach(element => {
            color.innerHTML += `<option value="${element.id}">${element.name}</option>`
        });
    })

    fetch('/api/products/brands')
    .then(response => {
        return response.json()
    })
    .then(dataDecode => {
        let brands = dataDecode.data;
        brands.forEach(element => {
            brand.innerHTML += `<option value="${element.id}">${element.name}</option>`
        });
    })
    
    fetch('/api/products/categories')
    .then(response => {
        return response.json()
    })
    .then(dataDecode => {
        let categories = dataDecode.data;
        categories.forEach(element => {
            category.innerHTML += `<option value="${element.id}">${element.name}</option>`
        });
    })

})