const controlador = {
    home: function(req, res) {
        res.render('index');
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
    
    }

module.exports = controlador;