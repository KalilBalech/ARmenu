const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

// Database
const connection = require('./database/database')
const customersModel = require('./database/Customers')
const ordersModel = require('./database/Orders')
const usersModel = require('./database/Users')

connection.authenticate()
.then(()=>{console.log('Conexão feita com sucesso')})
.catch((erro)=>{console.log('Ocorreu um erro: '+ erro)})

// ejs é uma tecnologia de interpretação de arquivos html que é compreendida pelo express. Essa tecnologia é muito bom porque
//permite que html e js possam ser usados conjuntamente.
app.set('view engine', 'ejs')
// agora, precisamos habilitar a leitura de arquivos estáticos pelo express. Arquivos estáticos são arquivos que não se comunicam
// com base de dados, ou seja, .css, .js que se referem ao frontend, assets, etc...
// No geral, guardamos esses arquivos na pasta public
app.use(express.static('public'))

app.use(cors({origin: "*"}))
// o body-parser serve para que os dados enviados por formulário sejam legíveis pelo node numa estrutura familiar (json)
// os dados enviados ficarão no json 'req.body.' + (valor do atributo name da tag input)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", (req, res)=>{
  res.status(200)
  // o render é usado para renderizar arquivos front ejs no express. Não precisa colocar views/index.js, pois ao usar app.set('view engine', 'ejs')
  // torna-se obrigatorio o arquivo root do front se chamar 'views'. Aí, o res.render já procura dentro de views o arquivo do front
  // Agora a extensão do nosso arquivo front não é mais html, mas sim ejs
  res.render('index')
})

app.post('/order', async (req, res) => {
  const burguerToPrice = {'POBRE MARIA': 20, 'TIPO MEQUI': 25, 'CHORONA': 27, 'BAGACEIRA': 30, 'ATREVIDA': 30}
  const batataToPrice = {'COM BATATA PEQUENA': 8, 'COM BATATA MÉDIA': 13,'COM BATATA GRANDE': 16, 'SEM BATATA': 0}
  const bebidaToPrice = {'COCA-COLA': 6, 'GUARANÁ': 5, 'FANTA': 5, 'SCHWEPPES': 5, 'NENHUMA': 0}

  let lanche = req.body.burguer
  let batata = req.body.batatas
  let bebida = req.body.bebida
  let nome = req.body.nome
  let bloco = req.body.bloco
  let apartamento = parseInt(req.body.apartamento)
  let pagamento = req.body.pagamento
  let preco = burguerToPrice[lanche] + batataToPrice[batata] + bebidaToPrice[bebida]
  
  await customersModel.create({
    Name: nome,
    Block: bloco,
    Apartment: apartamento,
    OrderNumber: 0
  })

  let customer = await customersModel.findOne({where: {Name: nome, Block: bloco, Apartment: apartamento}})

  ordersModel.create({
    Burguer: lanche,
    Beverage: bebida,
    Fries: batata,
    Price: preco,
    PaymentMethod: pagamento,
    Customer: customer.id
  })

  res.redirect('/')
})

// autenticação do admin
app.get('/login', (req, res)=> {
  res.status(200)
  res.render('loginPage')
})

app.listen(6969, function(erro){
  if(erro){
    console.log(`Ocorreu um erro: ${erro}`)
  }
  else{
    console.log("API rodando na porta 6969!")
  }
})