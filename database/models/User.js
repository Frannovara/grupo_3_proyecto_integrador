module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Users';
    let cols = {

    }
    let config = {
        tableName: 'users',
        tiempestamps: false
    }
    
    const User = sequelize.define(alias, cols, config);

    return User;
}