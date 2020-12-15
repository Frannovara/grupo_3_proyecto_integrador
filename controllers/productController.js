const controladorProductos = {
    productDetail: function(req, res) {
      res.render('productDetail');
    },
    productCart: function (req,res) {
      res.render('productCart')
    },
    productCreate: (req, res) => {
      res.render('productCreate')
    },
    productEdit: (req, res) => {
      res.render ('productEdit')
    },
}

module.exports = controladorProductos;