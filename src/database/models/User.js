module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Users';
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.BIGINT,
            allowNull:false
        },
        first_name: {
            type: dataTypes.STRING,
            allowNull:false},
        last_name:{
            type: dataTypes.STRING,
            allowNull:false
        },
        email:{
            type: dataTypes.STRING,
            allowNull:false
        },
        password:{
            type: dataTypes.STRING,
            allowNull:false
        },
        profile_image:{
            type: dataTypes.STRING,
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
        }

    }
    let config = {
        tableName: 'users',
        timestamps: true,
        creadetAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAT: 'deleted_at'
    }
    
    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.hasMany(models.User_categories, {
            as: 'user_category',
            foreignKey: 'category_id'
        }),
        User.hasMany(models.Carts, {
            as: 'carts',
            foreignKey: 'user_id'
        })
    }

    return User;
}