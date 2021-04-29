require('dotenv').config()

module.exports = {
  "development": {
    "username": 'bd8547fcc3116c',
    "password": 'ad50488e',
    "database": 'heroku_c287edf3bb7864d',
    "port": process.env.PORT_DB,
    "host": '@us-cdbr-east-03.cleardb.com',
    "dialect": "mysql",
    "operatorsAliases": false,
    "logging": false, /* No muestra las queries en la consola */
    "define": {
      "paranoid": true
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
