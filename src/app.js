const express = require ('express');
const app = express();
const mainRoutes = require ('./routes/main');
const productRoutes = require ('./routes/products');
const userRoutes = require ('./routes/users');
const methodOverride = require('method-override');
const path = require ('path');


let PORT = 3001
// app.listen crea el servidor
app.listen (PORT, function () {
    console.log('Corriendo servidor en http://localhost:'+ PORT +'/')
})
app.use(methodOverride('_method'));
app.set ('view engine', 'ejs');
app.set ('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use ('/', mainRoutes);
app.use ('/products', productRoutes);
app.use ('/users' , userRoutes);
app.use(express.static(path.join(__dirname, '../public/')));


app.use((req,res,next) => {
    res.status(404).render('not-found')
})
