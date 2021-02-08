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

const newProductDb = function(req) {
  
    db.Brands.findAll()
      .then(brands =>{
        return brands
      })
    db.Product_categories.findAll()
      .then(prodCats =>{
        return prodCats 
      })  
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
          limit: 20,
       
          include: [{association: 'brand'}, {association: 'images'}, {association: 'products_categories'}],
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
        db.Brands.findOne({
          where: {
            name: { [Op.like]: '%'+req.query.buscador+'%'}
          }
        })
        .then(brandSearched => {
          db.Products.findAll({
            where: {
              brand_id: brandSearched.id
            },
            order: [
              ['final_price', 'DESC']
            ],
            limit: 20,
         
            include:  [{association: 'brand'}, {association: 'images'}, {association: 'products_categories'}],
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
        })
        .catch(err=> {
          console.log(err);
        })
        
      } else if (req.query.search == 'category') {
        db.Product_categories.findOne({
          where: {
            name: { [Op.like]: '%'+req.query.buscador+'%'}
          }
        })
        .then(categorySearched => {
        db.Products.findAll({
          where: {
            category_id: categorySearched.id
          },
          order: [
            ['final_price', 'DESC']
          ],
          limit: 20,
       
          include:  [{association: 'brand'}, {association: 'images'}, {association: 'products_categories'}],
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
      })
      .catch(err => {console.log(err);})

      } else if (req.query.search == 'year') {
        db.Products.findAll({
          where: {
            year: { [Op.like]: '%'+ req.query.buscador + '%'}
          },
          order: [
            ['final_price', 'DESC']
          ],
          limit: 20,
        
          include: [{association: 'brand'}, {association: 'images'}, {association: 'products_categories'}],
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

      /*Esta búsqueda tiene que devolver el color perteneciente, y también la marca. */
      let requestProductToShow = db.Products.findAll({
        where: {
          id: req.params.id
        },
          include: [{association: 'brand'}, {association: 'products_categories'}, {association: 'colors'}],
          raw: true,
          nest: true,
        /* También crear la limitación de búsqueda por color.*/ 
      })
      
      let requestProductsInSale = db.Products.findAll({
        where: {
            discount: { [Op.ne]: 0}
        },
        limit: 10,
        include: [{association: 'brand'}, {association: 'products_categories'}, {association: 'colors'}],
        raw: true,
        nest: true,
    })

      
      /* Hacer una búsqueda de los productos en oferta bajo el nombre productsFilter excluyendo el producto actual */

       /*Hacer un promise all */
      Promise.all( [requestProductToShow,  requestProductsInSale])
      .then( function ([productToShow,  productsInSale]) {
        
        //res.send(productToShow)
        res.render('./products/detail' , {productToShow, title: productToShow.name, productsInSale, toThousand});
      })
        
     
     
        //res.send(productToShow)
      
      .catch(err => {
        console.log(err);
      })
		  
      
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
      
    },


/* traemos al form de creacion las tablas brands y prod_categories */


create2 : (req , res)=>{
  
  db.Product_categories.findAll()
    .then(prodCats =>{
      console.log(prodCats)
      return res.render('./products/create' , { prodCats: prodCats}) 
    })  },

  /* probar hacer este metodo con una function separada tambien */

createConfirm : (req , res) =>{
  console.log(req.body)
  db.Products.create({
    name: req.body.name,
    brand: req.body.brand,
    base_price: req.body.price,
    discount: req.body.discount,
    year: req.body.year,
    description : req.body.description,
    image: req.files[0].filename,
    color: req.body.color,

  });
  res.redirect('/')
}
}


module.exports = controladorProductos
  
