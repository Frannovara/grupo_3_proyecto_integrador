window.addEventListener('load', () => {
    let qs = function(text) {
        return document.querySelector(text)
    }

    let buttonPass = qs('.viewPass')
    let buttonRePass = qs('.viewRePass')
    let pass = qs('#password')
    let rePass = qs('#re_password')

    buttonPass.addEventListener('mousedown', () => {
        pass.setAttribute('type', 'text')
    })
    buttonPass.addEventListener('mouseup', () => {
        pass.setAttribute('type', 'password')
    })
    buttonRePass.addEventListener('mousedown', () => {
        rePass.setAttribute('type', 'text')
    })
    buttonRePass.addEventListener('mouseup', () => {
        rePass.setAttribute('type', 'password')
    })
})