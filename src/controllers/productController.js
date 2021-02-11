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
       
          include: [{association: 'brand'}, {association: 'categories'}, {association: 'colors'}],
          
        })
        .then(productsSearched => {
          console.log(productsSearched);
          
            //res.send(productsSearched)
            res.render('./products/list', {productsSearched, toThousand})
          
          
        })
        .catch(err => {
          res.send(err);
        })
      } else if (req.query.search == 'brand') {
        db.Brands.findOne({
          where: {
            name: { [Op.like]: '%'+ req.query.buscador + '%'}
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
            include:  [{association: 'brand'}, {association: 'colors'}, {association: 'categories'}],
            
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
            res.send(err);
          })
        })
        .catch(err => {
          res.send(err);
        })
      } else if (req.query.search == 'category') {
        db.Product_categories.findOne({
          where: {
            name: { [Op.like]: '%'+ req.query.buscador + '%'}
          }
        })
        .then(CategorySearched => {
          db.Products.findAll({
            where: {
              category_id: CategorySearched.id
            },
            order: [
              ['final_price', 'DESC']
            ],
            limit: 20,
        
            include:  [{association: 'brand'}, {association: 'colors'}, {association: 'categories'}],
            
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
            res.send(err);
          })
        })
      } else if (req.query.search == 'year') {
        db.Products.findAll({
          where: {
            year: { [Op.like]: '%'+ req.query.buscador + '%'}
          },
          order: [
            ['final_price', 'DESC']
          ],
          limit: 20,
        
          include: [{association: 'brand'}, {association: 'colors'}, {association: 'categories'}],
          
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
          res.send(err);
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

      /*Esta búsqueda tiene que devolver el color perteneciente, y también la marca. */
      let requestProductToShow = db.Products.findOne({
        where: {
          id: req.params.id
        },
          include: [{association: 'brand'}, {association: 'categories'}, {association: 'colors'}],
          
        /* También crear la limitación de búsqueda por color.*/ 
      })
      
      let requestProductsInSale = db.Products.findAll({
        where: {
            discount: { [Op.ne]: 0}
        },
        limit: 10,
        include: [{association: 'brand'}, {association: 'categories'}, {association: 'colors'}],
        
    })

      
      /* Hacer una búsqueda de los productos en oferta bajo el nombre productsFilter excluyendo el producto actual */

       /*Hacer un promise all */
      Promise.all( [requestProductToShow,  requestProductsInSale])
      .then( function ([productToShow,  productsInSale]) {
        
        //res.send(colors)
        res.render('./products/detail' , {productToShow, title: productToShow.name, productsInSale, toThousand});
      })
        //res.send(productToShow)
      .catch(err => {
        res.send(err);
      })
		  
      
    },
    deleteConfirm : (req, res, next) => {
      deleteProduct(req)
      res.redirect('/products')
    },
    cart: function (req,res) {
      
      db.Carts.findOne({
        where: {
          user_id: req.session.user.id,
          status: null
        },
        include: [
          {association: 'item'}
        ]
      })
      .then( usersCart => {
        //console.log(usersCart);
        //return res.send(usersCart)
        if (usersCart != null && usersCart.item.length != 0) {
          db.Cart_product.sum('subtotal', {
            where: {
              cart_id: usersCart.id
            }
          })
          .then((total)=> {
          
          // res.send(total)
          res.render('./products/cart', {usersCart, total})
          })
          .catch(error => {res.send(error)})
        } else {
          let total
          res.render('./products/cart', {total})
        }
        
        
      })
     
    },
    create: (req, res) => {
      res.render('./products/create')
    },
    edit: (req, res, next) => {
      const productToEdit = products.find(item =>  item.id == req.params.id);
      res.render('./products/edit' , {productToEdit, title: 'Editando ' + productToEdit.name}) 
    },
    update : (req , res) =>{
      console.log(req.body)
      db.Products.update({
        name: req.body.name,
        base_price: req.body.price,
        discount: req.body.discount,
        year: req.body.year,
        description : req.body.description,
        final_price : req.body.price * (1 - req.body.discount),
        category_id : req.body.category ,
        brand_id : req.body.brand
    
      }, { where: {
        id: req.params.id
      }})
     .then( created => {
         created.addColors(req.body.color , {
          trough : {
              image : req.files[0].filename
            }
          })
        
        res.redirect('/')})
        .catch(error =>{
        res.send (error)
        })
    },
    createProduct: (req, res, next) => {
      newProduct(req);
     res.redirect('/')
    },
    buyCart: (req, res) => {
      db.Carts.update({
        status: 'finish'
      }, {
        where: {
          user_id: req.session.user.id,
          status: null
        }
      })
      .then(()=> {
        res.redirect('/')
      })
    },
    addToCart: (req, res) => {
      let requestCart = db.Carts.findOrCreate({
        where: {
          user_id: req.session.user.id,
          status: null
        },
        include: [
          {association: 'item'}
        ]
      })

      let requestProduct = db.Products.findByPk(req.params.id)
      
      Promise.all([requestCart, requestProduct])
      .then(([userCart, product]) => {
        
        
        db.Cart_product.findOne({
          where: {
            product_id: product.id,
            cart_id: userCart[0].id
          }
        })
        .then(item => {
          
          if (item != null) {
            console.log('hasta aca');
            //return res.send(item)
            db.Cart_product.update( {
              units: item.units + 1,
              subtotal: (item.units + 1) * product.final_price
            },{
              where: {
                product_id: product.id
              }
            })
            
              .then(()=> {
                res.redirect('/products/cart')
                //res.send(userCart)
              })
              
           
            .catch(error => {res.send(error)})
            
          } else {
            
            db.Cart_product.create({
              units: 1,
              subtotal: product.final_price,
              product_id: product.id,
              cart_id: userCart[0].id
            })
            
              .then(()=> {
                res.redirect('/products/cart')
                //res.send(userCart)
              })
            
            /* userCart.addItem(product.id , {
              through: {
                units: 1,
                subtotal: product.final_price,
              }
            }) */
            .then(() => {
                res.redirect('/products/cart')
            //res.send(userCart)
            }) 
            .catch( error => {res.send(error)})
          }
        })
        .catch( error => {res.send(error)})
      })
      .catch( error => {res.send(error)})
      
    },

    addOne: (req, res) => {
      let requestCart = db.Carts.findOne({
        where: {
          user_id: req.session.user.id,
          status: null
        },
        include: [
          {association: 'item'}
        ]
      })
      let requestProduct = db.Products.findByPk(req.params.id)
      
      Promise.all([requestCart, requestProduct])
      .then(([userCart, product]) => {
        
        
        db.Cart_product.findOne({
          where: {
            product_id: req.params.id,
            cart_id: userCart.id
          }
        })
        .then(item => {
          db.Cart_product.update( {
            units: item.units + 1,
            subtotal: (item.units + 1) * product.final_price
          },{
            where: {
              product_id: req.params.id,
              cart_id: userCart.id
            }
          })
          
            .then(()=> {
              res.redirect('/products/cart')
              //res.send(userCart)
            })
          
          .catch(error => { res.send(error)})
        })
        .catch(error => { res.send(error)})
      })
      .catch(error => { res.send(error)})
    },

    removeOne: (req, res) => {
      let requestCart = db.Carts.findOne({
        where: {
          user_id: req.session.user.id,
          status: null
        },
        include: [
          {association: 'item'}
        ]
      })
      let requestProduct = db.Products.findByPk(req.params.id)
      
      Promise.all([requestCart, requestProduct])
      .then(([userCart, product]) => {
        
        db.Cart_product.findOne({
          where: {
            product_id: req.params.id,
            cart_id: userCart.id
          }
        })
        .then(item => {
          
          if (item.units == 1) {
            db.Cart_product.destroy( {
              where: {
                product_id: req.params.id,
                cart_id: userCart.id
              }
            })
            .then(()=> {res.redirect('/products/cart')})
            .catch(error => {res.send(error)})
          } else {
          db.Cart_product.update( {
            units: item.units - 1,
            subtotal: (item.units - 1) * product.final_price
          },{
            where: {
              product_id: req.params.id,
              cart_id: userCart.id
            }
          })
          
            .then(()=> {
              res.redirect('/products/cart')
              //res.send(userCart)
            })
          
          .catch(error => { res.send(error)})
          }
        })
        .catch(error => { res.send(error)})
      })
      .catch(error => { res.send(error)})
    },


/* traemos al form de creacion las tablas brands , colors y prod_categories */

create2 : (req , res)=>{
  
     let requestBrands =  db.Brands.findAll()
     let requestCategories = db.Product_categories.findAll()
     let requestColors = db.Colors.findAll()

     Promise.all([requestBrands , requestCategories , requestColors])
     .then(([brands , categories , colors]) =>{
       res.render ('./products/create' , {brands , categories , colors})
     })},
    
  /* probar hacer este metodo con una function separada tambien */

createConfirm : (req , res) =>{
  
  console.log(req.body)
  db.Products.create({
    
    name: req.body.name,
    base_price: req.body.price,
    discount: req.body.discount,
    year: req.body.year,
    description : req.body.description,
    final_price : req.body.price * (1 - req.body.discount/100),
    category_id : req.body.category ,
    brand_id : req.body.brand

  })
  .then( created => {
      created.addColors(req.body.color , {
        through : {
          image : req.files[0].filename
        }
      })
      .catch(errors => {
       return res.send (errors)
      })
    console.log(created)

     res.redirect("/") 
  })
    
    .catch(error =>{
      return res.send (error)
    })
},
delete2: (req , res) =>{
    db.Products.destroy({
      where: {
        id: req.params.id
      }
    })
     .then( result =>{ if (result){
       res.redirect ('/')
     }}) 
     .catch(error =>{
       res.send (error)
     })
}




}



module.exports = controladorProductos
  
