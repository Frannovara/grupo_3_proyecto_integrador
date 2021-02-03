module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Carts';
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
        status: {
            type: dataTypes.STRING,
        },
        total: {
            type: dataTypes.FLOAT(3,1),
        },
        user_id: {
            type: dataTypes.BIGINT,
        }

    }
    let config = {
        tableName: 'carts',
        timestamps: true, 
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAT: 'deleted_at'
    }
    
    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function(models) {
        Cart.belongsTo(models.Users, {
            as: 'carts',
            foreignKey: 'user_id'
        })
        /* , Cart.hasMany(models.products, {
            as: 'cart_product',
            foreignKey: 'cart_id'
        }) */
    }

    return Cart;
}