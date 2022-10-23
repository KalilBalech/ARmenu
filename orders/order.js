



// criar pedido
app.post('/order', (req, res) => {
  let lanche = req.body.burguer
  let batata = req.body.batatas
  let bebida = req.body.bebida
  let bloco = req.body.bloco
  let apartamento = req.body.apartamento
  let pagamento = req.body.pagamento

  // const childPython = spawn('python', ['./pythonWhatsAppMessaging/main.py', lanche, batata, bebida, bloco, apartamento, pagamento])
  // childPython.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`)
  // })
  // childPython.stderr.on('data', (data) => {
  //   console.error(`stderr: ${data}`)
  // })
  // childPython.on('close', (code) => {
  //   console.log(`child process exit with code ${code}`)
  // })
  // em rotas get, costuma-se usar app.render(), em rotas post app.redirect()
  res.redirect('/')
})

app.delete('/order', ()=> {

})