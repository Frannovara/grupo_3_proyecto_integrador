# Grupo3-repo

## Integrantes del equipo
### Franco Novara
#### Músico, 22 años. Aficionado de la guitarra y trabajo en una empresa dedicada al SEO. 
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
##### Administrador ==> email: motorbikezone007@gmail.com password: Admin@1234
##### Usuario ==> password: User@1234

## IMPORTANTE: en el archivo app.js se encuentran comentadas las líneas que redirigen a la página de Error 404, para poder entender los errores que estamos teniendo, y poder hacer el debug de los mismos.

## CRUD
- USERS:
    - CREATE: En el proceso de registro, el controlador busca en la db si el mail existe (incluyendo los usuarios eliminados) y verifica si el mail ya está en uso. De estarlo envía un error, de no existir permite el registro en la db. Al registrarse, automáticamente realiza el login, y redirige a la página de perfil. Además al registrarse se validan las siguientes condiciones:
        - El campo nombre no puede estar vacío.
        - El campo apellido no puede estar vacío.
        - El campo email no puede estar vacío, y debe ser un email válido.
        - El campo contraseña no puede estar vacío, debe tener como mínimo 8 caracteres, y debe contener al menos una mínuscula, una mayúscula y un número.
        - El campo de repetir la contraseña no puede estar vacío, y debe ser igual al campo contraseña.
        - El checkbox de Términos y Condiciones debe estar chequeado.

    - READ: En el proceso de Login, el controlador busca en la db si el mail existe (incluyendo los usuarios eliminados), de existir y no estar eliminado, realiza el login. Si existe y está eliminado, lo restaura y realiza el login. Si el mail o la contraseña no son correctos no realiza el login. 
    Actualmente el metodo login valida la existencia y comparacion de los campos, en caso de error arroja un unico mensaje en pantalla, el unico mensaje para el error de ambos campos es por una cuestion de seguridad.
     Al ingresar al perfil, busca en la db la información del usuario guardado en la sesión.
        - Si el usuario no recuerda su contraseña, tiene la posibilidad de regenerarla. De esta manera le llegará un mail con una nueva contraseña. El método de la nueva contraseña no verifica si el mail ingresado es de un usuario registrado, pero redirige automáticamente al login.

    - UPDATE: El update se realiza por partes:
        - Por un lado permite actualizar la foto de perfil. En este caso, si la foto no es cuadrada se termina viendo mal.
        - Por otro lado permite actualizar los datos del usuario sin considerar la contraseña, y valida que todos los campos estén completos, y que el email sea un email.
        - Por ultimo permite modificar la contraseña, validando que la misma cumpla los parámetros requeridos al registrarse.
        - A su vez, si un usuario olvida su contraseña puede regenerarla. Este método primero valida que el mail igresado para regenerarla sea de un usuario existente. Luego envía una nueva contraseña por mail, y actualiza la db con esa nueva contraseña.

    - DELETE: El sistema no permite eliminar un usuario administrador. Y si un usuario quiere eliminar su cuenta le pide confirmación. Luego realiza un soft-delete, cierra sesión, elimina la cookie si existe, y redirige al login.

- PRODUCTS:
    - CREATE: El metodo create en products se encuentra incompleto, aun falta compartir con las vistas de manera correcta el producto que se crea a partir de la info recibida por formulario.
    los productos se crean correctamente en db.
    - READ: La lectura de la base de datos se realiza en varias páginas diferentes, a continuación se explica el funcionamiento de cada una de ellas.
        - BUSCADOR: El buscador permite 4 opciones, buscar por marca, por categoría, por año o sin especificar. Si es por marca realiza una lectura de la base de datos con un "where" y un "like" que contenga lo que ha buscado el usuario en la columna de brand. Para categoría y año es igual. Si el usuario no especifíca, la búsqueda la realiza en la columna del nombre del producto. Luego muestra en una nueva vista los resultados de la búsqueda. Si no encuentra coincidencias entonces muestra un mensaje de que no se encontraron resultados.
        - PAGINA DE DETALLE: En la página de detalle se busca por el req.params.id al producto con sus relaciones, y todos los colores. Los colores para elegir surgen de la búsqueda. Aunque no tienen funcionalidad actualmente. El cambio de imagen de acuerdo al color elegido se realizará con JS para Front, ya que las imagenes de todos los colores están cargadas, pero con display none.
        - PAGINA DE INICIO: En la sección de ofertas, realiza una búsqueda en la db de todos los productos que estén en oferta, es decir que tengan un descuento no sea 0. Y limita la búsqueda a 10 productos.
    - UPDATE: El metodo update aun se encuentra pendiente, en proceso
    - DELETE: El metodo delete esta completo y funcional, realiza un softdelete activando la fila deleted_at para no perder datos o tambien para volver a "activar" el producto de ser necesario, aunque 
    esa funcionalidad aun no se encuentra programada ni se solicito en el sprint.
- CARRITO DE COMPRAS:
    - CREATE: Al agregar un producto al carrito de compras, realiza un findOrCreate en la tabla Carts, para ver si ya existe algún carrito de compras pendiente para ese usuario. Una vez que hay un carrito pendiente, agrega una instancia en la tabla pivot con el producto. Si el producto ya se encuentra en el carrito, aumenta en 1 la cantidad de unidades a comprar.
    - READ: Al redirigir a la página del carrito, realiza una búsqueda de los carritos pendientes para el usuario logueado, y muestra los productos asociados.
    - UPDATE: Si se modifica la cantidad de unidades, se actualiza la tabla pivot. 
    - DELETE: Si las unidades llegan a 0 se realiza un soft.delete, y el producto no se muestra mas en el carrito.
- FORMULARIO DE EDICIÓN DE BASE DE DATOS:
    Este formulario permite al administrador editar y crear nuevas categorias, marcas y colores, para tenerlos en la base de datos y disponibles para la creación y edición de productos.
    
## VALIDACIONES DEL FRONT
    - LOGIN: -Compara y valida el formato de ambos campos con regex.
                La contraseña debe tener mayuscula, minuscula, un numero y al menos 8 caracteres.
                El email debe respetar el formato de un email.
             -Compara el campo Email se encuentre registrado mediante una consulta con una API
             -Mediante prevent default detiene el submit del formulario hasta que no haya errores   
    - REGISTRO: Si todas las validaciones son correctas muestra un sweet alert y luego hace el submit del formulario.
        - NOMBRE: debe ser al menos 2 caracteres
        - APELLIDO: debe ser al menos 2 caracteres
        - EMAIL: valida que sea un email valido con regex, y luego valida que el email no este registrado a través de una API que devuelve un booleano.
        - CONTRASEÑA: La misma debe tener al menos una mayúscula, una minúscula, un número, un caracter especial, y entre 8 y 64 caracteres. Todo a través de una regex
        - REPETICIÓN DE CONTRASEÑA: Debe ser igual al campo Contraseña.
        - TERMINOS Y CONDICIONES: Se debe haber aceptado los terminos y condiciones.
    - CREACIÓN DEL PRODUCTO:
        - NOMBRE: debe tener al menos 5 caracteres.
        - CATEGORIA: debe ser un número (id). Esto previene que modifiquen el HTML y haya un error al procesar el formulario en el backend.
        - MARCA: debe ser un número (id).
        - PRECIO: Debe ser un número mayor a cero.
        - DESCUENTO: Debe ser un número mayor a cero.
        - AÑO: debe ser un número de 4 dígitos.
        - DESCRIPCIÓN: Debe tener al menos 20 caracteres.
        - IMAGEN: Debe ser una imagen con formato png, jpg, jpeg o gif. validado con una regex.
        -COLOR: Debe ser un número (id).
    - EDICIÓN DEL PRODUCTO
        - FALTA REALIZAR
    - RECUPERACIÓN DE CONTRASEÑA
        - EMAIL: el email debe ser un email válido (con regex), y debe estar registrado en la base de datos (a través de la misma API mencionada anteriormente).
    - FORMULARIO DE EDICIÓN DE BASE DE DATOS
        - CATEGORIA: al editar valida que sea un número.
        - MARCA: al editar valida que sea un número.
        - COLOR: al editar valida que sea un número.
    - FORMULARIO DE AGREGAR FOTO Y COLOR DE PRODUCTO:
        - IMAGEN: valida que sea una imagen con formato png, jpg, jpeg o gif con una regex
        - COLOR: Valida que se haya seleccionado una opción.
    - FORMULARIO DE CONTACTO
        - EMAIL: valida que sea un email válido
    - SUBIR AVATAR
        - IMAGEN: valida que sea una imagen con formato png, jpg, jpeg o gif con una regex
    - EDITAR USUARIO
        - NOMBRE: debe ser al menos 2 caracteres
        - APELLIDO: debe ser al menos 2 caracteres
        - EMAIL: valida que sea un email válido. FALTARÍA VALIDAR QUE ESE MAIL INGRESADO NO EXISTA.
    - MODIFICACIÓN DE CONTRASEÑA
        - CONTRASEÑA: La misma debe tener al menos una mayúscula, una minúscula, un número, un caracter especial, y entre 8 y 64 caracteres. Todo a través de una regex
        - REPETICIÓN DE CONTRASEÑA: Debe ser igual al campo Contraseña.
    - ELIMINAR USUARIO
        - No es estrictamente una validación, pero pregunta si está seguro de querer eliminar el usuario. No se puede eliminar al administrador.
    - VER CONTRASEÑA
        - Tampoco es una validación, pero permite ver la contraseña si se mantiene clickeado el botón de ver contraseña.