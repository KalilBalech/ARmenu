// criar pedido
app.post('/order', (req, res) => {
  let lanche = req.body.burguer
  let batata = req.body.batatas
  let bebida = req.body.bebida
  let bloco = req.body.bloco
  let apartamento = req.body.apartamento
  let pagamento = req.body.pagamento

  // em rotas get, costuma-se usar app.render(), em rotas post app.redirect()
  res.redirect('/')
})

app.delete('/order', ()=> {

})