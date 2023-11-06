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
const simulation = document.getElementById("simulation");
const menuAccess = document.getElementById("menuAccess");

// Array to store the atoms
const atoms = [];
// Defining the starting value
let temperature = 1;

// Boolean to check whether the simulation is running or not
let simulationOnGoing = false;

// Evaluate the value of the range input | Functional
temperatureRangeInput.addEventListener("input", () => {
  temperature = temperatureRangeInput.value;
  temperatureValueDisplay.textContent = temperature;
  console.log(temperature);
});

// start.addEventListener("click", () => {
//   menuAccess.display = "none";
//   simulation.style.display = "block";
//   start.styles.display = "none";

//   if (!simulationOnGoing) {
//     simulationOnGoing = true;
//   }
// });

start.addEventListener("click", () => {
  if (!simulationOnGoing) {
    // startSimulation();
    start.style.display = "none";
    restart.style.display = "block";
    simulationOnGoing = true;
  }
});

restart.addEventListener("click", () => {
  if (simulationOnGoing) {
    // resetSimulation();
    start.style.display = "block";
    restart.style.display = "none";
    temperatureRangeInput.style.display = "none";
    temperatureValueDisplay.style.display = "none";
    simulationOnGoing = false;
  }
});

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
class Particle {
  constructor(
    canvas,
    temperatureRangeInput,
    temperatureValueDisplay,
    containerRadius
  ) {
    this.canvas = canvas;
    this.temperatureRangeInput = temperatureRangeInput;
    this.temperatureValueDisplay = temperatureValueDisplay;
    this.containerRadius = containerRadius;
  }

  createParticles() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = 10;
    const temperature = this.temperatureRangeInput.value;
    const speed = temperature / 10;
    const angle = Math.random() * 2 * Math.PI;
    const color = Math.random() * 1 ? "blue" : "orange";

    const x = centerX + Math.cos(angle) * (this.containerRadius - radius);
    const y = centerY + Math.sin(angle) * (this.containerRad - radius);

    atoms.push(new Particle(x, y, radius, speed, color, this.containerRadius));
  }

  draw() {}

  move() {}
}

// Click event to place the atoms
canvas.addEventListener("click", createAtoms);

const animate = () => {};

animate();
