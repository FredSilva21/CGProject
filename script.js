// First entry window
window.addEventListener("DOMContentLoaded", () => {
  // Create additional balls dynamically
  const numBalls = 20; // Adjust the number of balls
  const background = document.querySelector(".background");

  for (let i = 0; i < numBalls; i++) {
    const ball = document.createElement("div");
    ball.className = "ball";
    ball.style.top = `${Math.random() * 100}vh`;
    ball.style.animationDuration = `${Math.random() * 3 + 1}s`; // Adjust animation duration
    background.appendChild(ball);
  }
});

// Temperature number display
let temperature = 50;

const temperatureValueDisplay = document.getElementById(
  "temperatureValueDisplay"
);
const temperatureRangeInput = document.getElementById("temperatureRangeInput");

temperatureRangeInput.addEventListener("input", () => {
  temperature = temperatureRangeInput.value;
});

// Second entry window
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = canvas.width,
  H = canvas.height;

function startSimulation() {
  const particles = [];

  for (let i = 0; i < 16; i++) {
    const particle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 15,
      color: "yellow",
      speed: Math.random() * 5 + 1,
      angle: Math.random() * 2 * Math.PI,
    };

    particles.push(particle);
  }

  simulationRunning = true;
  animate(particles);
}

let animationFrameId;
let menuCircles = [];

let simulationRunning = false;
let electronSpeed = 50;

// Atom Creation
function atom() {
  // Outer circle
  circle.drawCircle(200, 200, 100);
  // Inner circle
  circle.drawCircle2(200, 200, 40);
  // Electrons on top of the circle
  molecule.drawElectrons();
  // Electrons on top of the inner circle
  molecule.drawElectrons2();
  // Protons in the middle of the circle
  drawProtons();
}

// Object to the creation of the electrons oxygen
let electrons = {
  color: "blue",
  D: 20,
  R: 100,
  numElectrons: 6, // Outside electrons
  numElectronsInside: 2, // Inside electrons
  ang: 0,

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    let posX = 200 + this.R * Math.cos((Math.PI / 180) * this.ang);
    let posY = 200 + this.R * Math.sin((Math.PI / 180) * this.ang);
    ctx.arc(posX, posY, this.D / 2, 0, 2 * Math.PI);
    ctx.fill();
  },

  drawInner() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    let posX = 165 + this.R * Math.cos((Math.PI / 240) * this.ang);
    let posY = 200 + this.R * Math.sin((Math.PI / 180) * this.ang);
    ctx.arc(posX, posY, this.D / 2, 0, 2 * Math.PI);
    ctx.fill();
  },
};

let circle = {
  // Drawing the outer circle
  drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255,255,255)";
    ctx.stroke();
  },
  // Drawing the inner circle
  drawCircle2(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255,255,255)";
    ctx.stroke();
  },
};

let molecule = {
  // For loop to generate several electrons
  drawElectrons() {
    for (let i = 0; i < electrons.numElectrons; i++) {
      electrons.draw();
      electrons.ang += 360 / electrons.numElectrons;
    }
  },

  drawElectrons2() {
    for (let i = 0; i < electrons.numElectronsInside; i++) {
      electrons.drawInner();
      electrons.ang += 360 / electrons.numElectronsInside;
    }
  },
};

function drawProtons() {
  console.log("Protons");
}

atom();
