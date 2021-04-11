window.addEventListener('load', ()=> {
    let qs = function(p) {
        return document.querySelector(p)
    }
    
    let categories = qs('.listado-categorias')

    fetch('/api/products/categories')
    .then(response => {
        return response.json()
    })
    .then(dataDecode => {
        dataDecode.data.forEach(category => {
            categories.innerHTML += `<h4><a  class="listado-categorias-link" href=${category.url}>${category.name}</a></h4>`
        });
    })

})