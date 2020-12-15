const express = require ('express');
const app = express();
const mainRoutes = require ('./routes/main')
const productRoutes = require ('./routes/products')
const userRoutes = require ('./routes/users')


let PORT = 3000
// app.listen crea el servidor
app.listen (PORT, function () {
    console.log('Corriendo servidor en http://localhost:'+PORT+'/')
})
app.set ('view engine', 'ejs')



app.use ('/', mainRoutes)
app.use ('/products', productRoutes)
app.use ('/users' , userRoutes)
app.use (express.static (__dirname + '/public/'));
