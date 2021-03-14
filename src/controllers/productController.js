const {Sequelize} = require('../database/models');
const db = require('../database/models');
const Op = Sequelize.Op

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controladorProductos = {
    list: function (req, res) {
        console.log(req.query);
        let searched = req.query.buscador
        let search_category = req.query.search
        if (req.query.search == 'all') {
            db.Products.findAll({
                    where: {
                        name: {
                            [Op.like]: '%' + req.query.buscador + '%'
                        }
                    },
                    order: [
                        ['final_price', 'DESC']
                    ],
                    limit: 20,

                    include: [{
                        association: 'brand'
                    }, {
                        association: 'categories'
                    }, {
                        association: 'colors'
                    }],

                })
                .then(productsSearched => {
                    console.log(productsSearched);

                    //res.send(productsSearched)
                    res.render('./products/list', {
                        productsSearched,
                        toThousand,
                        title: req.query.buscaror + ' -'
                    })


                })
                .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
        } else if (req.query.search == 'brand') {
            db.Brands.findOne({
                    where: {
                        name: {
                            [Op.like]: '%' + req.query.buscador + '%'
                        }
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
                            include: [{
                                association: 'brand'
                            }, {
                                association: 'colors'
                            }, {
                                association: 'categories'
                            }],

                        })
                        .then(productsSearched => {
                            if (productsSearched.length > 0) {
                                res.render('./products/list', {
                                    productsSearched,
                                    toThousand,
                                    title: req.query.buscaror + ' -'
                                })
                            } else {
                                let emptySearch = true
                                res.render('./products/list', {
                                    searched,
                                    search_category,
                                    emptySearch,
                                    title: req.query.buscaror + ' -'
                                })
                            }
                        })
                        .catch(err => {
                                console.log(err);
                                res.render('dbError')
                            })
                })
                .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
        } else if (req.query.search == 'category') {
            db.Product_categories.findOne({
                    where: {
                        name: {
                            [Op.like]: '%' + req.query.buscador + '%'
                        }
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

                            include: [{
                                association: 'brand'
                            }, {
                                association: 'colors'
                            }, {
                                association: 'categories'
                            }],

                        })
                        .then(productsSearched => {
                            if (productsSearched.length > 0) {
                                res.render('./products/list', {
                                    productsSearched,
                                    toThousand,
                                    title: req.query.buscaror + ' -'
                                })
                            } else {
                                let emptySearch = true
                                res.render('./products/list', {
                                    searched,
                                    search_category,
                                    emptySearch,
                                    title: req.query.buscaror + ' -'
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            res.render('dbError')
                        })
                })
        } else if (req.query.search == 'year') {
            db.Products.findAll({
                    where: {
                        year: {
                            [Op.like]: '%' + req.query.buscador + '%'
                        }
                    },
                    order: [
                        ['final_price', 'DESC']
                    ],
                    limit: 20,

                    include: [{
                        association: 'brand'
                    }, {
                        association: 'colors'
                    }, {
                        association: 'categories'
                    }],

                })
                .then(productsSearched => {
                    if (productsSearched.length > 0) {
                        res.render('./products/list', {
                            productsSearched,
                            toThousand,
                            title: req.query.buscaror + ' -'
                        })
                    } else {
                        let emptySearch = true
                        res.render('./products/list', {
                            searched,
                            search_category,
                            emptySearch,
                            title: req.query.buscaror + ' -'
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
        }
    },
    detail: function (req, res) {
        /* SI HAY UN USUARIO LOGUEADO, GUARDAR EL PRODUCTO EN LA TABLA VIEWS */
        if(req.session.user) {
            db.Views.create({
                    user_id: req.session.user.id,
                    product_id: req.params.id
            }).then(()=>{

            })
            .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
        }

        /*Esta búsqueda tiene que devolver el color perteneciente, y también la marca. */
        let requestProductToShow = db.Products.findByPk(req.params.id, {
            include: [{
                association: 'brand'
            }, {
                association: 'categories'
            }, {
                association: 'colors'
            }],
        })
        let requestColors = db.Colors.findAll()
        let requestProductsInSale = db.Products.findAll({
            where: {
                discount: {
                    [Op.ne]: 0
                }
            },
            limit: 10,
            include: [{
                association: 'brand'
            }, {
                association: 'categories'
            }, {
                association: 'colors'
            }],

        })


        /* Hacer una búsqueda de los productos en oferta bajo el nombre productsFilter excluyendo el producto actual */

        /*Hacer un promise all */
        Promise.all([requestProductToShow, requestProductsInSale, requestColors])
            .then(function ([productToShow, productsInSale, colors]) {

                //res.send(colors)
                res.render('./products/detail', {
                    productToShow,
                    title: productToShow.name,
                    productsInSale,
                    toThousand,
                    colors
                });
            })
            //res.send(productToShow)
            .catch(err => {
                console.log(err);
                res.render('dbError')
            })


    },
    cart: function (req, res) {

        db.Carts.findOne({
                where: {
                    user_id: req.session.user.id,
                    status: null
                },
                include: [{
                    association: 'item'
                }]
            })
            .then(usersCart => {
                //console.log(usersCart);
                //return res.send(usersCart)
                if (usersCart != null && usersCart.item.length != 0) {
                    db.Cart_product.sum('subtotal', {
                            where: {
                                cart_id: usersCart.id
                            }
                        })
                        .then((total) => {

                            // res.send(total)
                            res.render('./products/cart', {
                                usersCart,
                                total,
                                title: 'Carrito -'
                            })
                        })
                        .catch(err => {
                                console.log(err);
                                res.render('dbError')
                            })
                } else {
                    let total
                    res.render('./products/cart', {
                        total,
                        title: 'Carrito -'
                    })
                }


            })

    },
    edit: (req, res, next) => {
        const productToEdit = products.find(item => item.id == req.params.id);
        res.render('./products/edit', {
            productToEdit,
            title: 'Edit ' + productToEdit.name
        })
    },
    update: (req, res) => {
        console.log(req.body)
        db.Products.update({
                name: req.body.name,
                base_price: req.body.price,
                discount: req.body.discount,
                year: req.body.year,
                description: req.body.description,
                final_price: req.body.price * (1 - req.body.discount),
                category_id: req.body.category,
                brand_id: req.body.brand

            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(created => {
                created.addColors(req.body.color, {
                    trough: {
                        image: req.files[0].filename
                    }
                })

                res.redirect('/')
            })
            .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
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
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                console.log(err);
                res.render('dbError')
            })
    },
    addToCart: (req, res) => {
        let requestCart = db.Carts.findOrCreate({
            where: {
                user_id: req.session.user.id,
                status: null
            },
            include: [{
                association: 'item'
            }]
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
                            db.Cart_product.update({
                                    units: item.units + 1,
                                    subtotal: (item.units + 1) * product.final_price
                                }, {
                                    where: {
                                        product_id: product.id
                                    }
                                })

                                .then(() => {
                                    res.redirect('/products/cart')
                                    //res.send(userCart)
                                })
                                .catch(err => {
                                        console.log(err);
                                        res.render('dbError')
                                    })

                        } else {

                            db.Cart_product.create({
                                    units: 1,
                                    subtotal: product.final_price,
                                    product_id: product.id,
                                    cart_id: userCart[0].id
                                })

                                .then(() => {
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
                                .catch(err => {
                                        console.log(err);
                                        res.render('dbError')
                                    })
                        }
                    })
                    .catch(err => {
                            console.log(err);
                            res.render('dbError')
                        })
            })
            .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })

    },
    addOne: (req, res) => {
        let requestCart = db.Carts.findOne({
            where: {
                user_id: req.session.user.id,
                status: null
            },
            include: [{
                association: 'item'
            }]
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
                        db.Cart_product.update({
                                units: item.units + 1,
                                subtotal: (item.units + 1) * product.final_price
                            }, {
                                where: {
                                    product_id: req.params.id,
                                    cart_id: userCart.id
                                }
                            })

                            .then(() => {
                                res.redirect('/products/cart')
                                //res.send(userCart)
                            })
                            .catch(err => {
                                    console.log(err);
                                    res.render('dbError')
                                })
                    })
                    .catch(err => {
                            console.log(err);
                            res.render('dbError')
                        })
            })
            .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
    },
    removeOne: (req, res) => {
        let requestCart = db.Carts.findOne({
            where: {
                user_id: req.session.user.id,
                status: null
            },
            include: [{
                association: 'item'
            }]
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
                            db.Cart_product.destroy({
                                    where: {
                                        product_id: req.params.id,
                                        cart_id: userCart.id
                                    }
                                })
                                .then(() => {
                                    res.redirect('/products/cart')
                                })
                                .catch(err => {
                                        console.log(err);
                                        res.render('dbError')
                                    })
                        } else {
                            db.Cart_product.update({
                                    units: item.units - 1,
                                    subtotal: (item.units - 1) * product.final_price
                                }, {
                                    where: {
                                        product_id: req.params.id,
                                        cart_id: userCart.id
                                    }
                                })

                                .then(() => {
                                    res.redirect('/products/cart')
                                    //res.send(userCart)
                                })
                                .catch(err => {
                                        console.log(err);
                                        res.render('dbError')
                                    })
                        }
                    })
                    .catch(err => {
                            console.log(err);
                            res.render('dbError')
                        })
            })
            .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
    },
    /* traemos al form de creacion las tablas brands , colors y prod_categories */

    create: (req, res) => {

        let requestBrands = db.Brands.findAll()
        let requestCategories = db.Product_categories.findAll()
        let requestColors = db.Colors.findAll()

        Promise.all([requestBrands, requestCategories, requestColors])
            .then(([brands, categories, colors]) => {
                res.render('./products/create', {
                    brands,
                    categories,
                    colors,
                    title: 'Create Product -'
                })
            })
            .catch(err => {
                console.log(err);
                res.render('dbError')
            })
    },

    /* probar hacer este metodo con una function separada tambien */

    createConfirm: (req, res) => {

        console.log(req.body)
        db.Products.create({
                name: req.body.name,
                base_price: req.body.price,
                discount: req.body.discount,
                year: req.body.year,
                description: req.body.description,
                final_price: req.body.price * (1 - req.body.discount / 100),
                category_id: req.body.category,
                brand_id: req.body.brand

            })
            .then(created => {
                //return res.send(created)
                db.Images.create({
                    image: req.files[0].filename,
                    product_id: created.id,
                    color_id: req.body.color
                })
                .then( ()=> {
                    res.redirect("/products/"+created.id)
                })
                .catch(err => {
                        console.log(err);
                        res.render('dbError')
                    })
            })
            .catch(err => {
                console.log(err);
                res.render('dbError')
            })
    },
    delete: (req, res) => {
        db.Products.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                if (result) {
                    res.redirect('/')
                }
            })
            .catch(err => {
                    console.log(err);
                    res.render('dbError')
                })
    },
    addColor: (req, res) => {
        db.Images.create({
                image: req.files[0].filename,
                product_id: req.params.id,
                color_id: req.body.color
            })
            .then(() => {
                return res.redirect("/products/" + req.params.id)
            })
            .catch(err => {
                console.log(err);
                res.render('dbError')
            })
    },
    databaseForm: (req, res) => {
        res.render('./products/dbForm', {title: 'Database Form -'})
    },
    newCategory: (req,res) => {
        db.Product_categories.create({
            name: req.body.category
        })
        .then( () => {
            return res.redirect('/')
        })
        .catch(err => {
            console.log(err);
            res.render('dbError')
        })
    },
    newBrand: (req,res) => {
        db.Brands.create({
            name: req.body.brand
        })
        .then( () => {
            return res.redirect('/')
        })
        .catch(err => {
            console.log(err);
            res.render('dbError')
        })
    },
    newColor: (req,res) => {
        db.Colors.create({
            name: req.body.color
        })
        .then( () => {
            return res.redirect('/')
        })
        .catch(err => {
            console.log(err);
            res.render('dbError')
        })
    },
    editCategory: (req,res) => {
        db.Product_categories.update({
            name: req.body.category
        }, {
            where: {
                id: req.body.actual_category
            }
        })
        .then( () => {
            return res.redirect('/')
        })
        .catch(err => {
            console.log(err);
            res.render('dbError')
        })
    },
    editBrand: (req,res) => {
        db.Brands.update({
            name: req.body.brand
        }, {
            where: {
                id: req.body.actual_brand
            }
        })
        .then( () => {
            return res.redirect('/')
        })
        .catch(err => {
            console.log(err);
            res.render('dbError')
        })
    },
    editColor: (req,res) => {
        db.Colors.update({
            name: req.body.color
        }, {
            where: {
                id: req.body.actual_color
            }
        })
        .then( () => {
            return res.redirect('/')
        })
        .catch(err => {
            console.log(err);
            res.render('dbError')
        })
    }
}


module.exports = controladorProductos