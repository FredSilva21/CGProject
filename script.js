// Canvas Element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// DOM Elements Retrieval
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const temperatureRangeInput = document.getElementById("temperatureRangeInput");
const temperatureValueDisplay = document.getElementById(
  "temperatureValueDisplay"
);

// Array to store the atoms
const atoms = [];
// Defining the starting value
let temperature = 1;

// Evaluate the value of the range input
temperatureRangeInput.addEventListener("input", () => {
  temperature = temperatureRangeInput.value;
  temperatureValueDisplay.textContent = temperature;
  console.log(temperature);
});

// start.addEventListener("click", () => {
//   if ((start.textContent = "Start")) {
//     start.textContent = "Stop";
//     restart.disabled = false;
//   } else {
//     start.textContent = "Stop";
//   }
// });

const createAtoms = (e) => {};

// Class para o circulo que contem as particulas
class Atomo {
  constructor(
    x,
    y,
    radius,
    corNucleo,
    numeroEletrons,
    raioOrbita,
    corEletrons
  ) {
    this.x = x; // Coordenada x do centro do átomo no canvas
    this.y = y; // Coordenada y do centro do átomo no canvas
    this.radius = radius; // Radius do núcleo
    this.corNucleo = corNucleo; // Cor do núcleo
    this.numeroEletrons = numeroEletrons; // Número de elétrons
    this.raioOrbita = raioOrbita; // Raio da órbita dos elétrons
    this.corEletrons = corEletrons; // Cor dos elétrons

    this.nucleo = { x: this.x, y: this.y }; // Posição do núcleo
    this.eletrons = []; // Array para armazenar informações sobre os elétrons
  }

  draw() {}
}

// Class for the particles inside the circle
class Particles {
  constructor(x, y, radius, speed, angle, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.angle = angle;
    this.color = color;
    this.magnitude = 2;
    this.OffsetX = Math.random() * this.magnitude;
    this.OffsetY = Math.random() * this.magnitude;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  move() {
    this.x = Math.random() * this.x + this.dx;
    this.y = Math.random() * this.y - this.dx;
  }
}

// Click event to place the atoms
canvas.addEventListener("click", createAtoms);

const animate = () => {};

animate();
