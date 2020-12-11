const controlador = {
    home: function(req, res) {
        res.render('index');
      },
    productDetail: function(req, res) {
        res.render('productDetail');
      },
    login: function (req,res) {
        res.render('login')
    },
    productCart: function (req,res) {
        res.render('productCart')
    },
    nosotros: function (req,res) {
        res.render('nosotros')
    },
    contact: (req,res) => {
        res.render('contact')
    },
    help: (req,res) => {
        res.render ('help')
    },
    register: (req,res) => {
        res.render ('register')
    },
    }

module.exports = controlador;