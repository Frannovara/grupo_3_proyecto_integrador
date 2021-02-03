module.exports = (sequelize, dataTypes) => {
    
    let alias = 'User_categories';
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
        name: {
            type: dataTypes.STRING,
        }

    }
    let config = {
        tableName: 'user_categories',
        timestamps: true,
        creadetAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    
    const User_category = sequelize.define(alias, cols, config);

     User_category.associate = function(models) {
         User_category.hasMany(models.Users, {
             as: 'user_category',
             foreignKey: 'category_id'
         })
     }

    return User_category;
}