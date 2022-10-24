const sequelize = require('sequelize')
const connection = require('./database')

// aqui podemos criar uma tabela em que computamos os pedidos de cada lanche
// no sequelize, model é uma estrutura de dados que representa uma tabela no sql
// arquivos que geram models possuem sua letra inicial maiuscula

const Orders = connection.define('orders', {
  Burguer: {
    type: sequelize.STRING,
    allowNull: false
  },
  Beverage: {
    type: sequelize.STRING,
    allowNull: false
  },
  Fries: {
    type: sequelize.STRING,
    allowNull: false
  },
  Price: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  PaymentMethod: {
    type: sequelize.STRING,
    allowNull: false
  },
  Customer: {
    type: sequelize.INTEGER,
    allowNull: false
  }
});

Orders.sync({force: false}).then(()=>{console.log('Tabela de pedidos criada!')})

module.exports = Orders

// app.get('/order', ()=> {

// })

// app.post('/order', ()=> {
  
// })

// app.delete('/order', ()=> {

// })

// // ???
// app.put('/order', ()=> {

// })