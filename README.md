# Grupo3-repo

## Integrantes del equipo
### Franco Novara
#### Músico, 22 años. Aficionado de la guitarra y trabajo en una empresa dedicada al SEO.
### Valentina Damonte
#### Estudiante de diseño, 21 años. 
### Lautaro Porlan
#### Tecnico en electronica, 28 años. Trabajo para NCR Argentina, me gusta viajar, el futbol y el gamming
### Francisco Lukac
#### Ingeniero Civil, 29 años. Me gusta tocar la batería y la guitarra.


## Temática del Market Place
### ¿Que productos o servicios brindará el sitio?
##### El servicio será dedicado a la industria de motocicletas, desde la venta de las mismas hasta accesorios relacionados con su conducción.
### ¿Quién será nuestra audiencia objetivo?
##### Nuestra audiencia objetivo son las personas adeptas a la industria automotriz, específicamente en motocicletas y productos afines a su uso.
### ¿Cómo ajustaremos nuestra oferta a ese público?
##### Ajustaremos nuestra oferta a ese público brindando un amplio e intuitivo catálogo del rubro con productos que puedan satisfacer cualquier posibilidad económica de los clientes.


## Referentes
##### Mercado Libre https://www.mercadolibre.com.ar/
##### Amazon https://www.amazon.com/
##### Coppel https://www.coppel.com.ar/
##### Harley-Davidson https://harley-davidson.com.ar/
##### https://www.purecycles.com/
##### https://argentina.benelli.com

## Link tablero Trello
##### https://trello.com/b/t020Y50o/trabajo-integrador-gr-3

## Usuarios de prueba
#### Si bien hay una base de datos de usuarios, los usuarios de prueba utilizados son los siguientes:
##### Usuario administrador ==> email: admin@prueba.com  password: admin1234
##### Usuario administrador ==> email: user@prueba.com  password: user1234

## CRUD
- USERS:
    - CREATE: En el proceso de registro, el controlador busca en la db si el mail existe (incluyendo los usuarios eliminados) y verifica si el mail ya está en uso. De estarlo envía un error de no existir permite el registro en la db. Al registrarse, automáticamente realiza el login, y redirige a la página de perfil.
    - READ: En el proceso de Login, el controlador busca en la db si el mail existe (incluyendo los usuarios eliminados), de existir y no estar eliminado, realiza el login. Si existe y está eliminado, lo restaura y realiza el login. Si el mail o la contraseña no son correctos no realiza el login. Actualmente no muestra los errores del validador en pantalla. Al realizar el login, guarda al usuario en la session, y desde ahí carga la información en el perfil.
        - Si el usuario no recuerda su contraseña, tiene la posibilidad de regenerarla. De esta manera le llegará un mail con una nueva contraseña. El método de la nueva contraseña no verifica si el mail ingresado es de un usuario registrado, pero redirige automáticamente al login.
    - UPDATE: El update se realiza por partes:
        - Por un lado permite actualizar la foto de perfil. En este caso, si la foto no es cuadrada se termina viendo mal.
        - Por otro lado permite actualizar los datos del usuario junto con su contraseña. Si la contraseña no es completada, mantiene la contraseña anterior.
    - DELETE: El sistema no permite eliminar un usuario administrador. Y si un usuario quiere eliminar su cuenta le pide confirmación. Luego realiza un soft-delete, cierra sesión, elimina la cookie si existe, y redirige al login.