const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const spawn = require('child_process').spawn

const app = express()
app.use(cors({origin: "http://localhost:8080"}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// function middleware(req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// }

app.post('/order', (req, res) => {
  const childPython = spawn('python', ['./pythonWhatsAppMessaging/main.py', 'Bagaceira'])
  childPython.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })
  childPython.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })
  childPython.on('close', (code) => {
    console.log(`child process exit with code ${code}`)
  })
  res.send('A rota post deu certo!')
})
// essa process.env.PORT é definida pelo render
// process.env.PORT
app.listen(process.env.PORT, ()=>{
  console.log("API rodando!")
})