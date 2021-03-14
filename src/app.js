const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require ('express-session');
const authentication = require ('./middlewares/authentication')


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use (session ({secret: "secreto", resave: false , saveUninitialized: true}));
app.use(authentication)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const mainRoutes = require ('./routes/main');
const productRoutes = require ('./routes/products');
const userRoutes = require ('./routes/users');
const productsApiRoutes = require('./routes/api/products')
const usersApiRoutes = require('./routes/api/users')

app.use ('/', mainRoutes);
app.use ('/products', productRoutes);
app.use ('/users' , userRoutes);
app.use ('/api/users', usersApiRoutes)
app.use ('/api/products', productsApiRoutes)

//catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('not-found');
// });

module.exports = app;
