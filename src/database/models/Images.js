module.exports = function(sequelize, dataTypes){
    let alias = "Images";

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
        image: {
            type : dataTypes.STRING,
            allowNull : false
        },
        product_id: {
            type: dataTypes.BIGINT,
        },
        color_id: {
            type: dataTypes.BIGINT,
        }
    }

    let config = {
        tableName: 'images',
        timestamps: true, 
        creadetAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAT: 'deleted_at'
    }

    const Images = sequelize.define(alias, cols, config);

    return Images;
}