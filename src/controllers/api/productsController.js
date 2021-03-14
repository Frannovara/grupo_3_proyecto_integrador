const {Sequelize} = require('../../database/models');
const db = require('../../database/models');


module.exports = {
    categories: (req, res) => {
        db.Product_categories.findAll()
        .then(categories => {
            categories = categories.map( category => category = { id: category.id ,name: category.name})
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
    }
}