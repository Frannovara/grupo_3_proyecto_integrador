const { BelongsTo } = require("sequelize/types");

module.exports = (sequelize, dataTypes) => {
    
    let alias = 'User_category';
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
        category: {
            type: dataTypes.STRING,
        }

    }
    let config = {
        tableName: 'user_categories',
        timestamps: true,
        creadetAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAT: 'deleted_at'
    }
    
    const User_category = sequelize.define(alias, cols, config);

    User_category.associate = function (modelos) {
        User_category.belongsTo(modelos.User, {
            as: 'user_category',
            foreignKey: 'category_id'
        })
    }

    return User;
}