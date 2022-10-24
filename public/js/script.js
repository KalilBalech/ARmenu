// window.addEventListener('resize', (event) => {
//   document.documentElement.style.setProperty('overflow', 'auto')
//   const metaViewport = document.querySelector("meta[name='viewport']")
//   metaViewport.setAttribute('content', 'height'=+ initialHeight + 'px, width=device-width, initial-scale=1.0')
// })

// não permir a existencia de um scroll minimo na pagina
window.addEventListener('load', () => {
  document.querySelector('body').style.height = window.innerHeight + 'px'
  document.getElementById('orderDetails').style.height = window.innerHeight * 0.85 + 'px'
})

const indexToBurguer = ['pobreMaria', 'tipoMequi', 'tipoMequidenovo', 'bagaceira', 'estojo'] // deve ser uma var de ambiente
const burguerToPrice = {'POBRE MARIA': 20, 'TIPO MEQUI': 25, 'CHORONA': 27, 'BAGACEIRA': 30, 'ATREVIDA': 30}
const batataToPrice = {'COM BATATA PEQUENA': 8, 'COM BATATA MÉDIA': 13,'COM BATATA GRANDE': 16, 'SEM BATATA': 0}
const bebidaToPrice = {'COCA-COLA': 6, 'GUARANÁ': 5, 'FANTA': 5, 'SCHWEPPES': 5, 'NENHUMA': 0}
const slideAmount = document.querySelectorAll('.mySlides').length
const modelViewer = document.querySelector("model-viewer")
document.querySelectorAll('.slideshow-container')[0].style.width = (slideAmount*85 + 10)+'vw'

let currentSlide = 1;
let translatedPosition = 0

function nextSlide() {
  if(currentSlide < slideAmount){
    if(currentSlide === slideAmount - 1)
      document.querySelector('.next').style.display = 'none'
    if(currentSlide === 1)
      document.querySelector('.prev').style.display = 'block'
    translatedPosition -= 100
    document.querySelector('.slideshow-container').style.transform=`translateX(${translatedPosition}vw)`
    document.querySelector('.slideshow-container').style.transition="all 0.5s"
    currentSlide ++
    console.log('O novo slide é o ' + currentSlide)
    exchangeModel(currentSlide)
    document.querySelector('.counter').innerHTML = `${currentSlide}/5`
  }
}

function previousSlide() {
  if(currentSlide > 1){
    if(currentSlide === slideAmount)
      document.querySelector('.next').style.display = 'block'
    if(currentSlide === 2)
      document.querySelector('.prev').style.display = 'none'
    translatedPosition += 100
    document.querySelector('.slideshow-container').style.transform=`translateX(${translatedPosition}vw)`
    document.querySelector('.slideshow-container').style.transition="all 0.5s"
    currentSlide --
    console.log('O novo slide é o ' + currentSlide)
    exchangeModel(currentSlide)
    document.querySelector('.counter').innerHTML = `${currentSlide}/5`
  }
}

function reachSlide(targetSlide) {
  document.getElementById('menu__toggle').checked = false
  translatedPosition += (targetSlide - currentSlide)*(-100)
  document.querySelector('.slideshow-container').style.transform=`translateX(${translatedPosition}vw)`
  document.querySelector('.slideshow-container').style.transition="all 0.5s"
  currentSlide = targetSlide
  console.log('O novo slide é o ' + currentSlide)
  exchangeModel(currentSlide)
  document.querySelector('.counter').innerHTML = `${currentSlide}/5`
  if(currentSlide === 1){
    document.querySelector('.prev').style.display = 'none'
    document.querySelector('.next').style.display = 'block'
  }
  else if(currentSlide === slideAmount){
    document.querySelector('.prev').style.display = 'block'
    document.querySelector('.next').style.display = 'none'
  }
  else {
    document.querySelector('.prev').style.display = 'block'
    document.querySelector('.next').style.display = 'block'
  }
}

function exchangeModel(index) {
  modelViewer.src = '../assets/models/' + indexToBurguer[index-1] + '.glb';
}

function getOrderDetails() {
  let div = document.getElementsByClassName('burguerInput')[0]
  let input = div.getElementsByTagName('input')[currentSlide - 1]
  input.checked = true

  document.getElementById('menu__toggle').setAttribute('disabled', 'disabled')
  document.getElementById("orderDetails").style.display = 'block'
  document.getElementById('orderDetailsBackground').style.display = 'block'

}

function removeOrderDetails() {
  document.getElementById('menu__toggle').disabled = false
  document.getElementById("orderDetails").style.display = 'none'
  document.getElementById('orderDetailsBackground').style.display = 'none'
}

function makeOrder(){
  let i, burguer, batatas, bebida, observacao, nome, bloco, apartamento, pagamento, mensagem, preco
  preco = 0

  let burguerInput = document.getElementsByName('burguer')
  for(i=0; i<burguerInput.length; i++){
    if(burguerInput[i].checked){
      burguer = burguerInput[i].value
      preco += burguerToPrice[burguerInput[i].value]
      break
    }
  }
  
  let batatasInput = document.getElementsByName('batatas')
  for(i=0; i<batatasInput.length; i++){
    if(batatasInput[i].checked){
      batatas = batatasInput[i].value
      preco += batataToPrice[batatasInput[i].value]
      break
    }
  }

  let bebidasInput = document.getElementsByName('bebida')
  for(i=0; i<bebidasInput.length; i++){
    if(bebidasInput[i].checked){
      bebida = bebidasInput[i].value
      preco += bebidaToPrice[bebidasInput[i].value]
      break
    }
  }

  observacao = document.getElementById('observação').value

  if(observacao === ''){
    observacao = ' Beijinhos ;)'
  }
  else{
    observacao = observacao.toUpperCase()
    observacao = ' AHH NÃO SE ESQUEÇA: ' + observacao + '. Beijinhos ;)'
  }

  nome = document.getElementById('nameInput').value
  if(nome === ''){
    nome = undefined
  }
  else{
    nome = nome.toUpperCase()
  }

  let blocoInput = document.getElementsByName('bloco')
  for(i=0; i<blocoInput.length; i++){
    if(blocoInput[i].checked){
      bloco = blocoInput[i].value
      break
    }
  }

  apartamento = document.getElementById('apartamento').value
  if(apartamento === ''){
    apartamento = undefined
  }


  let pagamentoInput = document.getElementsByName('pagamento')
  for(i=0; i<pagamentoInput.length; i++){
    if(pagamentoInput[i].checked){
      pagamento = pagamentoInput[i].value
      break
    }
  }

  mensagem = 'Oi Mariazinha, sua gostosa! Eu quero um ' + burguer + ', ' + batatas +
  ' e a minha bebida é ' + bebida + '. Mas manda rápido que eu tô com fome. Moro no Bloco ' + bloco + ', apartamento ' 
  + apartamento +'. Vou pagar no ' + pagamento +'. Meu nome é ' + nome + observacao

  console.log(burguer + ' ' + batatas + ' ' + bebida + ' ' + nome + ' ' + bloco + ' ' + apartamento + ' ' + pagamento)

  if(burguer && batatas && bebida && bloco && apartamento && pagamento){
    document.getElementById('invalidFields').innerText = ''
    window.open(`https://wa.me/55011962650823?text=${mensagem}`, '_blank')
  }
  else{
    document.getElementById('invalidFields').innerText = 'Preencha todos os campos, bebê!'
  }
}

function removeMenuBox(){
  document.getElementById('menu__toggle').checked = false
}
