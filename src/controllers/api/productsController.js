const {Sequelize} = require('../../database/models');
const db = require('../../database/models');


module.exports = {
    categories: (req, res) => {
        db.Product_categories.findAll()
        .then(categories => {
            categories = categories.map( category => category = { id: category.id ,name: category.name, url: "http://motorbikezone.harokuapp.com/products/?search=category&buscador="+ category.name})
            let categorias = {
                "meta": {
                    "status": 200,
                    "count": categories.length,
                    "url": "/api/products/categories"
                },
                "data": categories
            }
            return res.json(categorias)
        })
        .catch(error => {
            console.log(error);
            res.render(dbError)
        })
    },
    colors: (req, res) => {
        db.Colors.findAll()
        .then(colors => {
            colors = colors.map( color => color = { id: color.id ,name: color.name})
            let colores = {
                "meta": {
                    "status": 200,
                    "count": colors.length,
                    "url": "/api/products/colors"
                },
                "data": colors
            }
            return res.json(colores)
        })
        .catch(error => {
            console.log(error);
            res.render(dbError)
        })
    },
    brands: (req, res) => {
        db.Brands.findAll()
        .then(brands => {
            brands = brands.map( brand => brand = { id: brand.id ,name: brand.name})
            let marcas = {
                "meta": {
                    "status": 200,
                    "count": brands.length,
                    "url": "/api/products/brands"
                },
                "data": brands
            }
            return res.json(marcas)
        })
        .catch(error => {
            console.log(error);
            res.render(dbError)
        })
    },
    productDetail: (req, res) => {
        db.Products.findByPk(req.params.id, {
            include: [{
                association: 'brand'
            }, {
                association: 'categories'
            }, {
                association: 'colors'
            }]
        })
        .then( product => {
            product.colors.map(image => image.Images.image = 'http://motorbikezone.harokuapp.com/images/products/' + image.Images.image)

            let productResponse = {
                "meta": {
                    "status": 200,
                    "url": "http://motorbikezone.harokuapp.com/api/products/" + req.params.id,
                    "urlDetail": "http://motorbikezone.harokuapp.com/products/" + req.params.id,
                },
                "data": product
            }
            return res.json(productResponse)
        })
    },
    products: async function(req, res) {
        let products
        let categories
        let countByCategory = {}

        let page = 1
        let productsPerPage = 10
        if(req.params.page) {
            page = parseInt(req.params.page) + 1
        }
        
        try {
            products = await db.Products.findAndCountAll({
                include: [{
                    association: 'brand'
                }, {
                    association: 'colors'
                }],
                limit: productsPerPage,
                offset: (page-1)*productsPerPage,
                order: [
                    ['updated_at', 'DESC']
                ]
            })
            categories = await db.Product_categories.findAll()
            for (const category of categories) {
                let categorySum
                try {categorySum = await db.Products.count({
                    where: {
                        category_id: category.dataValues.id
                    }
                })}
                catch (error) {
                    return res.status(404).json({
                        error,
                        message: 'Error de Base de Datos'
                    })
                }
                countByCategory[category.dataValues.name] = categorySum
            }
        } catch (error) {
            return res.status(404).json({
                error,
                message: 'Error de Base de Datos'
            })
        }
        let productsCount = products.count
        products = products.rows
        products = products.map( product => product = {id: product.id, name: product.name, description: product.description, brand: product.brand.name, detail: 'http://motorbikezone.harokuapp.com/products/'+product.id, image: 'http://motorbikezone.harokuapp.com/images/products/' + product.colors[0].Images.image})

        let previous
        if( page > 1 ) {
            let previouspage = parseInt(page) - 2
            if(previouspage == 0){
                previous = 'http://motorbikezone.harokuapp.com/api/products/list/'
            } else {
            previous = 'http://motorbikezone.harokuapp.com/api/products/list/' + previouspage
            }
        } else {
            previous = ''
        }

        let maxpage = Math.ceil(productsCount / productsPerPage)
        let next
        if( page < maxpage ) {
            next = 'http://motorbikezone.harokuapp.com/api/products/list/' + page
        } else {
            next = ''
        }

        let productsResponse = {
            "meta": {
                "status": 200,
                "count": productsCount,
                "countByCategory": countByCategory,
                "previous": previous,
                "next": next,
            },
            "data": {
                "products": products
            }
        }
        return res.json(productsResponse)
    
    }
}