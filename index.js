const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const spawn = require('child_process').spawn

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

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

app.listen(6969, ()=>{
  console.log("API rodando!")
})