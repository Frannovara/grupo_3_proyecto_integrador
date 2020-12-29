const { name } = require('ejs');
const { json } = require('express');
const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controladorProductos = {
    list: function(req, res) {
      res.render('./products/list', {products, toThousand})
    },
    detail: function(req, res) {
      const product = products.find(item =>  item.id == req.params.id);
		  if(product.discount) {
			  product.finalPrice = toThousand(product.price * (1 - product.discount/100))
		  } else {
			  product.price = toThousand (product.price)
		  }
      res.render('./products/detail' , {product, title: product.name});
    },
    delete : function (req , res){
      const productsFiltered = products.filter((product) => product.id != req.params.id);
      let productsJSON = JSON.stringify(productsFiltered);
      fs.writeFileSync (productsFilePath , productsJSON);
      res.render('./products/edit')
    },
    cart: function (req,res) {
      res.render('./products/cart')
    },
    create: (req, res) => {
     
      res.render('./products/create')
    },
    edit: (req, res) => {
      res.render ('./products/edit')
    },
    
}

module.exports = controladorProductos;