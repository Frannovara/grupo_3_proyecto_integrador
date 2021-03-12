window.addEventListener('load', function(){
    let qs = function(param) {
        return document.querySelector(param)
    }
    let qsa = function(param) {
        return document.querySelectorAll(param)
    }
    let deleteUserForm = qs('.delete-user-form')
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

})