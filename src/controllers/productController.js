const { name } = require('ejs');
const { json } = require('express');
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('../database/models');
const db = require('../database/models');
const Op = Sequelize.Op

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const newProduct = function(req) {
	let newProduct = {
		id: Date.now(),
		...req.body,
		image: req.files[0].filename
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
			product.name = req.body.name
			product.price = req.body.price
			product.discount = Number(req.body.discount)
			product.image = req.files[0].filename
			product.category = req.body.category
      product.description = req.body.description
      product.year = req.body.year
      product.kms = req.body.kms
      product.color = req.body.color
      const productJson = JSON.stringify(products)
	    fs.writeFileSync(productsFilePath, productJson)
	    return product.id
		}
	})
}

const deleteProduct = function(req) {
	const productsNotDeleted = products.filter((product) => product.id != req.params.id)
	let productsJSON = JSON.stringify(productsNotDeleted);
  fs.writeFileSync(productsFilePath, productsJSON)
  
  
}

const controladorProductos = {
    list: function(req, res) {
      console.log(req.query);
      let searched = req.query.buscador
      let search_category = req.query.search
      if (req.query.search == 'all'){
        db.Products.findAll({
          where: {
            name: { [Op.like]: '%'+ req.query.buscador + '%'}
          },
          order: [
            ['final_price', 'DESC']
          ],
          limit: 20
        }, {
          include: [{association: 'brand'}, {association: 'images'}, {association: 'product_category'}],
          raw: true,
          nest: true,
        })
        .then(productsSearched => {
          console.log(productsSearched);
          if (productsSearched.length > 0) {
            res.render('./products/list', {productsSearched, toThousand})
          } else {
            let emptySearch  = true
            res.render('./products/list', {searched, search_category, emptySearch})
          }
          
        })
        .catch(err => {
          console.log(err);
        })
      } else if (req.query.search == 'brand') {
        db.Products.findAll({
          where: {
            brand: { [Op.like]: '%'+ req.query.buscador + '%'}
          },
          order: [
            ['final_price', 'DESC']
          ],
          limit: 20
        }, {
          include: ['brand', 'Product', 'Products'],
          raw: true,
          nest: true,
        })
        .then(productsSearched => {
          if (productsSearched.length > 0) {
            res.render('./products/list', {productsSearched, toThousand})
          } else {
            let emptySearch = true
            res.render('./products/list', {searched, search_category, emptySearch})
          }
        })
        .catch(err => {
          console.log(err);
        })
      } else if (req.query.search == 'category') {
        db.Products.findAll({
          where: {
            category: { [Op.like]: '%'+ req.query.buscador + '%'}
          },
          order: [
            ['final_price', 'DESC']
          ],
          limit: 20
        }, {
          include: ['brand', 'Product', 'Products'],
          raw: true,
          nest: true,
        })
        .then(productsSearched => {
          if (productsSearched.length > 0) {
            res.render('./products/list', {productsSearched, toThousand})
          } else {
            let emptySearch = true
            res.render('./products/list', {searched, search_category, emptySearch})
          }
        })
        .catch(err => {
          console.log(err);
        })
      } else if (req.query.search == 'year') {
        db.Products.findAll({
          where: {
            year: { [Op.like]: '%'+ req.query.buscador + '%'}
          },
          order: [
            ['final_price', 'DESC']
          ],
          limit: 20
        }, {
          include: ['brand', 'Product', 'Products'],
          raw: true,
          nest: true,
        })
        .then(productsSearched => {
          if (productsSearched.length > 0) {
            res.render('./products/list', {productsSearched, toThousand})
          } else {
            let emptySearch = true
            res.render('./products/list', {searched, search_category, emptySearch})
          }
        })
        .catch(err => {
          console.log(err);
        })
      }      
    },
    detail: function(req, res) {
      let product = products.find(item =>  item.id == req.params.id);
		  if(product.discount) {
			  product.finalPrice = toThousand(product.price * (1 - product.discount/100))
		  } else {
			  product.price = toThousand (product.price)
      }
      let productsFilter = products.filter((bikes) => bikes.id != req.params.id)
      let filterByName = products.filter((item) => product.name == item.name)

      res.render('./products/detail' , {product, title: product.name, productsFilter, toThousand, filterByName});
    },
    deleteConfirm : (req, res, next) => {
      deleteProduct(req)
      res.redirect('/products')
    },
    cart: function (req,res) {
      res.locals.cart = req.session.cart
      console.log(res.locals.cart);
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
      editProduct(req)
      res.redirect('/')
    },
    createProduct: (req, res, next) => {
      newProduct(req);
     res.redirect('/')
    },
    buyCart: (req, res) => {

    },
    addToCart: (req, res) => {
      if (typeof req.session.cart != 'undefined') {
        db.Products.findByPk(req.params.id)
        .then(product => {
        req.session.cart.push(product)
        res.locals.cart = req.session.cart
        return res.redirect('/products/cart')
        })
        .catch( err => {
        console.log(err);
        })
      } else {
        db.Products.findByPk(req.params.id)
        .then(product => {
        req.session.cart = [product]
        res.locals.cart = req.session.cart
        return res.redirect('/products/cart')
        })
        .catch( err => {
        console.log(err);
        })
      }
      
    }
}

module.exports = controladorProductos