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

## IMPORTANTE: en el archivo app.js se encuentran comentadas las líneas que redirigen a la página de Error 404, para poder entender los errores que estamos teniendo, y poder hacer el debug de los mismos.

## CRUD
- USERS:
    - CREATE: En el proceso de registro, el controlador busca en la db si el mail existe (incluyendo los usuarios eliminados) y verifica si el mail ya está en uso. De estarlo envía un error de no existir permite el registro en la db. Al registrarse, automáticamente realiza el login, y redirige a la página de perfil. Además al registrarse se validan las siguientes condiciones:
        - El campo nombre no puede estar vacío.
        - El campo apellido no puede estar vacío.
        - El campo email no puede estar vacío, y debe ser un email válido.
        - El campo contraseña no puede estar vacío, debe tener como mínimo 8 caracteres, y debe contener al menos una mínuscula, una mayúscula y un número.
        - El campo de repetir la contraseña no puede estar vacío, y debe ser igual al campo contraseña.
        - El checkbox de Términos y Condiciones debe estar chequeado.

    - READ: En el proceso de Login, el controlador busca en la db si el mail existe (incluyendo los usuarios eliminados), de existir y no estar eliminado, realiza el login. Si existe y está eliminado, lo restaura y realiza el login. Si el mail o la contraseña no son correctos no realiza el login. Actualmente el validador del login no funciona correctamente, porque no verifica si el mail es existente. Al ingresar al perfil, busca en la db la información del usuario guardado en la sesión.
        - Si el usuario no recuerda su contraseña, tiene la posibilidad de regenerarla. De esta manera le llegará un mail con una nueva contraseña. El método de la nueva contraseña no verifica si el mail ingresado es de un usuario registrado, pero redirige automáticamente al login.

    - UPDATE: El update se realiza por partes:
        - Por un lado permite actualizar la foto de perfil. En este caso, si la foto no es cuadrada se termina viendo mal.
        - Por otro lado permite actualizar los datos del usuario sin considerar la contraseña, y valida que todos los campos estén completos, y que el email sea un email.
        - Por ultimo permite modificar la contraseña, validando que la misma cumpla los parámetros requeridos al registrarse.

    - DELETE: El sistema no permite eliminar un usuario administrador. Y si un usuario quiere eliminar su cuenta le pide confirmación. Luego realiza un soft-delete, cierra sesión, elimina la cookie si existe, y redirige al login.

- PRODUCTS