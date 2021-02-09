module.exports = (sequelize , dataTypes) =>{
    let alias = "Product_categories"
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
        tableName: 'product_categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    

    const Product_category = sequelize.define(alias, cols, config);
    Product_category.associate = (models =>{
        Product_category.hasMany(models.Products,{
            as : "product_category",
            foreignKey : 'category_id'
        })
    })

    return Product_category;
}