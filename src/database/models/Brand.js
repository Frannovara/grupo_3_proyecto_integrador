module.exports = (sequelize , dataTypes) =>{
    let alias = 'Brands';
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
            allowNull : false
        }

    }
    let config = {
        tableName: 'brands',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
    const Brand = sequelize.define(alias, cols, config);
    Brand.associate = (models =>{
        Brand.hasMany(models.Products,{
            as : "products",
            foreignKey : 'brand_id'
        })
    })
    return Brand;
}