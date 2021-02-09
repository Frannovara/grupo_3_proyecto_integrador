 module.exports = (sequelize , dataTypes) =>{

    let alias = 'Products';
    let cols = {
        id : {
            autoIncrement : true,
            primaryKey : true,
            type : dataTypes.BIGINT,
            allowNull : false
        },
        name : {
            type : dataTypes.STRING,
            allowNull : false
        },
        description : {
            type : dataTypes.STRING,
            allowNull : false
        },
        year : {
            type : dataTypes.INTEGER,
            allowNull : false
        },
        base_price: {
            type : dataTypes.DECIMAL,
            allowNull : false
        },
        discount: {
            type : dataTypes.INTEGER, 
        },
        final_price: {
            type : dataTypes.DECIMAL,
        },
        created_at: {
            type: dataTypes.DATE,
        },
        updated_at: {
            type: dataTypes.DATE,
        },
        deleted_at: {
            type: dataTypes.DATE,
        },
        category_id: {
            type: dataTypes.BIGINT,
        },
        brand_id: {
            type: dataTypes.BIGINT
        }
    }
    let config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Product = sequelize.define(alias, cols, config);
    Product.associate = models =>{
        Product.belongsTo(models.Brands, {
            as : 'brand',
            foreignKey: 'brand_id'
        })
        
        Product.belongsTo(models.Product_categories, {
            as : 'categories',
            foreignKey: 'category_id'
        })
        Product.belongsToMany(models.Colors, {
            as: 'colors',
            through: 'Images',
            foreignKey: 'product_id',
            otherKey: 'color_id',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        })
        Product.belongsToMany(models.Carts, {
            as: 'buying_cart',
            through: 'Cart_product',
            foreignKey: 'product_id',
            otherKey: 'cart_id',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        })
    }

    return Product;
} 