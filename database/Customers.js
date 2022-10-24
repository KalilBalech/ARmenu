const sequelize = require('sequelize')
const connection = require('./database')

const Customers = connection.define('customers', {
  Name: {
    type: sequelize.STRING,
    allowNull: false
  },
  Block: {
    type: sequelize.STRING,
    allowNull: false
  },
  Apartment: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  OrderNumber: {
    type: sequelize.INTEGER,
    allowNull: false
  }
});

Customers.sync({force: false}).then(()=>{console.log('Tabela de clientes criada!')})

module.exports = Customers