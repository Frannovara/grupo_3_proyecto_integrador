window.addEventListener('load', function(){

    let menuIcon = document.querySelector('#menu')
    let menuDesplegable = document.querySelector('.indice-desplegable')
    menuIcon.addEventListener('click', function(){
        menuDesplegable.classList.toggle('menu-visible')
    })
})