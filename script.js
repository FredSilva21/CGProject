//Menu
window.addEventListener("DOMContentLoaded", function () {
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

const start = document.getElementById("startButton");
start.addEventListener("click", function () {
  let background = document.querySelector(".background");
  background.style.display = "none";
  document.body.innerHTML = `
    <canvas id="canvas"></canvas>
    <div id="simulation">
      <!--Temperature-->
      <div id="temperature"><label for="temperatureRangeInput">Temperature:</label>
        <input
          type="range"
          max="100"
          min="0"
          step="1"
          value="50"
          id="temperatureRangeInput"
        />
        <span id="temperatureValueDisplay">50</span>
      </div>
      <button type="button" id="restart" disabled>Restart</button>
    </div>`;

  const temperatureRangeInput = document.getElementById("temperatureRangeInput");
  const temperatureValueDisplay = document.getElementById("temperatureValueDisplay");
  const temperatureLabel = document.querySelector("#temperature label");

  temperatureRangeInput.addEventListener("input", function () {
    temperatureValueDisplay.textContent = temperatureRangeInput.value;
    if (temperatureRangeInput.value > 50) {
      temperatureLabel.style.color = "orange";
      temperatureValueDisplay.style.color="orange"
    }else if(temperatureRangeInput.value < 50){
      temperatureLabel.style.color = "blue";
      temperatureValueDisplay.style.color="blue"
    }else{
      temperatureLabel.style.color = "white";
      temperatureValueDisplay.style.color="white"
    }
    
  });
});




//Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = screen.width,
  H = screen.height;
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
  drawElectrons();
  // Electrons on top of the inner circle
  drawElectrons2();
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
// For loop to generate several electrons
function drawElectrons() {
  for (let i = 0; i < electrons.numElectrons; i++) {
    electrons.draw();
    electrons.ang += 360 / electrons.numElectrons;
  }
}

function drawElectrons2() {
  for (let i = 0; i < electrons.numElectronsInside; i++) {
    electrons.drawInner();
    electrons.ang += 360 / electrons.numElectronsInside;
  }
}

function drawProtons() {
  console.log("Protons");
}

atom();
