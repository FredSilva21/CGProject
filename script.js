//Elementos do Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

//Botões 
const comecar=document.getElementById("comecar")
const recomecar=document.getElementById("recomecar")

comecar.addEventListener("click",function(){
  if(comecar.textContent="Começar"){
    comecar.textContent="Parar"
    recomecar.disabled=false
  }else{
    comecar.textContent="Parar"
  }
  
})

// Array para guardar os átomos
const atoms = [];
class Atomo {
  constructor(x, y, raioNucleo, corNucleo, numeroEletrons, raioOrbita, corEletrons) {
    this.x = x; // Coordenada x do centro do átomo no canvas
    this.y = y; // Coordenada y do centro do átomo no canvas
    this.raioNucleo = raioNucleo; // Raio do núcleo
    this.corNucleo = corNucleo; // Cor do núcleo
    this.numeroEletrons = numeroEletrons; // Número de elétrons
    this.raioOrbita = raioOrbita; // Raio da órbita dos elétrons
    this.corEletrons = corEletrons; // Cor dos elétrons

    this.nucleo = { x: this.x, y: this.y }; // Posição do núcleo
    this.eletrons = []; // Array para armazenar informações sobre os elétrons
  }

  draw(){

  }
}
