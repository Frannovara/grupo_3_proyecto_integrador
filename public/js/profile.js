window.addEventListener('load', function(){
    let qs = function(param) {
        return document.querySelector(param)
    }
    let qsa = function(param) {
        return document.querySelectorAll(param)
    }

    let imageButton = qs('#change-image-button')
    let changePasswordButton = qs('#change-password-button')
    let editUserButton = qs('#edit-user-button')
    let deleteUserForm = qs('.delete-user-form')

    imageButton.addEventListener('click', ()=>{
        console.log('ele evento fucniona');
        qs('#profile-image-form').style.display = 'block'
    })
    changePasswordButton.addEventListener('click', ()=>{
        qs('#change-password-form').style.display = 'block'
    })
    deleteUserForm.addEventListener('submit', (event)=>{
        event.preventDefault()
        swal({
            title: "¿Estás seguro?",
            text: "Si te arrepentís podes regenerar tu usuario en el login",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Usuario eliminado correctamente", {
                icon: "success",
              })
              .then(()=>{
                  deleteUserForm.submit()
              })
            } 
          })
    })
    editUserButton.addEventListener('click', ()=>{
        qs('#edit-user-form').style.display = 'block'
    })

})