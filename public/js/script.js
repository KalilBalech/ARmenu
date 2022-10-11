// window.addEventListener('load', (event) => {
  //   console.log('page is fully loaded');
  // });
  // window.switchSrc = (element, name) => {
    //   modelViewer.src = './assets/Models/' + name + '.glb';
    //   modelViewer.poster = './assets/BackgroundImages/' + name + '.webp';
    //   const slides = document.querySelectorAll(".slide");
    //   slides.forEach((element) => {element.classList.remove("selected");});
    //   element.classList.add("selected");
    // };
    
    // document.querySelector(".slider").addEventListener('beforexrselect', (ev) => {
      //   // Keep slider interactions from affecting the XR scene.
      //   ev.preventDefault();
      // });
      
const indexToObject = ['pobreMaria', 'tipoMequi', 'tipoMequidenovo', 'bagaceira', 'estojo']
const slideAmount = document.querySelectorAll('.mySlides').length
const modelViewer = document.querySelector("model-viewer");
// const axiosConfig = {
//   Headers: {
//     'Access-Control-Allow-Origin': "*"
//   }
// }
let currentSlide = 1;
let translatedPosition = 0

document.querySelector('body').style.height = window.innerHeight + 'px'

function nextSlide() {
  if(currentSlide < slideAmount){
    translatedPosition -= 85
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
    translatedPosition += 85
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
  translatedPosition += (targetSlide - currentSlide)*(-85)
  document.querySelector('.slideshow-container').style.transform=`translateX(${translatedPosition}vw)`
  document.querySelector('.slideshow-container').style.transition="all 0.5s"
  currentSlide = targetSlide
  console.log('O novo slide é o ' + currentSlide)
  exchangeModel(currentSlide)
  document.querySelector('.counter').innerHTML = `${currentSlide}/5`
}

function exchangeModel(index) {
  modelViewer.src = '../assets/models/' + indexToObject[index-1] + '.glb';
}
console.log(axios)

function getOrderDetails() {
  let div = document.getElementsByClassName('burguerInput')[0]
  let input = div.getElementsByTagName('input')[currentSlide - 1]
  
  input.checked = true
  document.getElementById("orderDetails").style.display = 'block'
}

function removeOrderDetails() {
  document.getElementById("orderDetails").style.display = 'none'
}
// lembrar de desativar o burguer selection se clicar no x do order details
// function makeOrder(){
//   axios.post("http://localhost:6969/order")
//   .then(res => console.log(`Deu certo: ${res}`))
//   .catch(error => console.log(`Deu errado: ${error}`))
// }