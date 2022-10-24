const sequelize = require('sequelize')
const connection = require('./database')

const Users = connection.define('users', {
  Name: {
    type: sequelize.STRING,
    allowNull: false
  },
  Password: {
    type: sequelize.STRING,
    allowNull: false
  }
});

Users.sync({force: false}).then(()=>{console.log('Tabela de usuários criada!')})

module.exports = Users