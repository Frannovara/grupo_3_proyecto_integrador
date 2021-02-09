module.exports = function(sequelize, dataTypes){
    let alias = "Colors";

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
            type : dataTypes.STRING,
        }
    }

    let config = {
        tableName: 'colors',
        timestamps: true, 
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }

    const Colors = sequelize.define(alias, cols, config);

    Colors.associate = function(models) {
        Colors.belongsToMany(models.Products, {
            as: 'product_color',
            through: 'Images',
            foreignKey: 'color_id',
            otherKey: 'product_id',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        })
    }

    return Colors;
}