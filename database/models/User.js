module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Users';
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        }

    }
    let config = {
        tableName: 'users',
        timestamps: false
    }
    
    const User = sequelize.define(alias, cols, config);

    return User;
}