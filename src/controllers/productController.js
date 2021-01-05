const { name } = require('ejs');
const { json } = require('express');
const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const newProduct = function(req) {
	let newProduct = {
		id: generateID(),
		...req.body,
		image: req.files[0].filename,
	};
	products.push(newProduct);
	let productsJSON = JSON.stringify(products);
	fs.writeFileSync(productsFilePath, productsJSON)
	return newProduct.id
}

const editProduct = function (req) {
	products.forEach((product) => {
		if (product.id == req.params.id) {
			// product = { ...product, ...req.body, image: req.files[0].filename }
			product.name = name
			product.price = price
			product.discount = Number(product.discount)
			product.image = req.files[0].filename
			product.category = category
			product.description = description
		}
	})
	const productJson = JSON.stringify(products)
	fs.writeFileSync(productsFilePath, productJson)
	return product.id
}

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
      let productsFilter = products.filter((product) => product.id != req.params.id)

      res.render('./products/detail' , {product, title: product.name, productsFilter, toThousand});
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
    edit: (req, res, next) => {
      const productToEdit = products.find(item =>  item.id == req.params.id);
      res.render('./products/edit' , {productToEdit, title: 'Editando ' + productToEdit.name}) 
    },
    confirm: (req, res, next) => {
      const id = editProduct(req)
      res.redirect('/products/' + id)
    },
    createProduct: (req, res, next) => {
      const id = newProduct(req);
      res.redirect('/')
    }
}

module.exports = controladorProductos