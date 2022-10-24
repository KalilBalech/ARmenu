const Sequelize = require('sequelize')

const connection = new Sequelize('cardapiomariazzinha', 'root', process.env.DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection
// instalou o myslq2 para mexer com o mysql especificamente no node
// realizou a conexao com nosso banco de dados
// exportou a conexao -- module.exports