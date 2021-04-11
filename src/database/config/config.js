require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.USERNAME_DB,
    "password": process.env.PASSWORD_DB,
    "database": process.env.NAME_DB,
    "port": process.env.PORT_DB,
    "host": process.env.HOST_DB,
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
