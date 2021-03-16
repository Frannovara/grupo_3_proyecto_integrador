window.addEventListener('load', function() {
    let qs = function(text) {
        return document.querySelector(text)
    }
    let qsa = function(text) {
        return document.querySelectorAll(text)
    }

    let colorButtons = qsa('.dot')
    let images = []
    for (let i = 0; i < colorButtons.length; i++) {
        images[i] = document.getElementById('bike'+i)
    }
    for (let i = 0; i < colorButtons.length-1; i++) {
        colorButtons[i].addEventListener('click', () => {
            for (let j = 0; j < images.length; j++) {
                if (i == j) {
                    images[j].style.display = 'block'
                } else {
                    images[j].style.display = 'none'
                }      
            }
        })
    }
    
})