const { name } = require('ejs');
const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controladorProductos = {
    productDetail: function(req, res) {
      const product = products.find(item =>  item.id == req.params.id);
		  if(product.discount) {
			  product.finalPrice = toThousand(product.price * (1 - product.discount/100))
		  } else {
			  product.price = toThousand (product.price)
		  }
      res.render('./products/productDetail/:id' , {product, title: product.name});
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