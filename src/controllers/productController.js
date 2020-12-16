const controladorProductos = {
    productDetail: function(req, res) {
      res.render('./products/productDetail');
    },
    productCart: function (req,res) {
      res.render('./products/productCart')
    },
    productCreate: (req, res) => {
      res.render('./products/productCreate')
    },
    productEdit: (req, res) => {
      res.render ('./products/productEdit')
    },
}

module.exports = controladorProductos;