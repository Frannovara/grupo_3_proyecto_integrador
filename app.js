const express = require ('express');

const app = express();

let PORT = 3000


// app.listen crea el servidor
app.listen (PORT, function () {
    console.log('Corriendo servidor en http://localhost:'+PORT+'/')
})

//links a las distintas páginas
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
})
app.get('/login', function (req,res) {
    res.sendFile(__dirname + '/views/login.html')
})
app.get('/productoCart', function (req,res) {
    res.sendFile(__dirname + '/views/productoCart.html')
})
app.get('/login', function (req,res) {
    res.sendFile(__dirname + '/views/login.html')
})
app.get('/login', function (req,res) {
    res.sendFile(__dirname + '/views/login.html')
})
app.get('/login', function (req,res) {
    res.sendFile(__dirname + '/views/login.html')
})

//links de las imagenes y stylesheet
app.get('*', function (req,res) {
    res.sendFile(__dirname + '/public/' + req.url)
})