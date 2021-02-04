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
            allowNull:false,
        },
        password:{
            type: dataTypes.STRING,
            allowNull:false
        },
        profile_image:{
            type: dataTypes.STRING,
            defaultValue: "/images/users/default.png"
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
            defaultValue: 2
        }

    }
    let config = {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    
    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.belongsTo(models.User_categories, {
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