window.addEventListener('load', function() {
    let qs = function(a) {
        return document.querySelector(a)
    }
    let qsa = function(a) {
        return document.querySelectorAll(a)
    }
    
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/g

    let email = qs('#email')
    let password = qs('#password')
    let form = qs('.login-form')
    



























})