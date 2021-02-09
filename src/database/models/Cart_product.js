module.exports = function(sequelize, dataTypes){
    let alias = "Cart_product";

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT,
            allowNull:false
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
        subtotal: {
            type : dataTypes.DECIMAL,
            allowNull : false
        },
        units: {
            type : dataTypes.INTEGER,
            allowNull : false
        }
    }

    let config = {
        tableName: 'cart_product',
        timestamps: true, 
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }

    const Cart_product = sequelize.define(alias, cols, config);

    return Cart_product;
}