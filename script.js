//Elementos do Canvas
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

//Botões
const comecar = document.getElementById("comecar");
const recomecar = document.getElementById("recomecar");

comecar.addEventListener("click", () => {
  if ((comecar.textContent = "Começar")) {
    comecar.textContent = "Parar";
    recomecar.disabled = false;
  } else {
    comecar.textContent = "Parar";
  }
});

// Array para guardar os átomos
const atoms = [];

// Class para o circulo que contem as particulas
class Atomo {
  constructor(
    x,
    y,
    raioNucleo,
    corNucleo,
    numeroEletrons,
    raioOrbita,
    corEletrons
  ) {
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

  draw() {}
}

// class para as particulas no interior do circulo
class Particulas {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 20;
    this.dx = Math.random() * 2;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.fill();
  }

  move() {
    this.x = Math.random() * this.x + this.dx;
    this.y = Math.random() * this.y - this.dx;
  }
}
