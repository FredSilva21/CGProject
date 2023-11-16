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

let temperature = 50;

// Start button click event
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
          value="${temperature}"
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
    // Update the temperature variable when the range input changes
    temperature = parseInt(temperatureRangeInput.value);
    
    temperatureValueDisplay.textContent = temperature;
    if (temperature > 50) {
      temperatureLabel.style.color = "orange";
      temperatureValueDisplay.style.color = "orange";
    } else if (temperature < 50) {
      temperatureLabel.style.color = "blue";
      temperatureValueDisplay.style.color = "blue";
    } else {
      temperatureLabel.style.color = "white";
      temperatureValueDisplay.style.color = "white";
    }
  });
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
// Creation of the electron properties
class Electron {
  constructor(color, D, R, numElectrons, ang) {
    this.color = color;
    this.D = D;
    this.R = R;
    this.numElectrons = numElectrons;
    this.ang = ang;
  }

  draw(posX, posY) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(posX, posY, this.D / 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Movement
  updatePosition() {
    this.ang += 0.2;
    this.R += Math.sin(this.ang) * 4;
  }
}

// circle
//! Revision
class Circle {
  // Drawing a circle
  draw(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255,255,255)";
    ctx.stroke();
  }

  updatePosition() {
    this.ang += 0.2;
    this.R += Math.sin(this.ang) * 4;
  }
}

// Atom: Inner and outer circle and electrons
class Atom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.radius = 100;
    this.circle = new Circle();
    this.electrons = new Electron("blue", 20, 100, 6, 0);
    this.innerElectrons = new Electron("blue", 20, 40, 2, 0);
  }

  // Draws the atom
  draw() {
    // Outer circle
    this.circle.draw(200, 200, 100);
    // Inner circle
    this.circle.draw(200, 200, 40);
    // Electrons on top of the circle
    this.drawElectrons(this.electrons, 6);
    // Electrons on top of the inner circle
    this.drawElectrons(this.innerElectrons, 2);
    // Protons in the middle of the circle
    // this.drawProtons();
    // this.circle.drawCircle(this.x, this.y, 100);
    // this.circle.drawCircle(this.x, this.y, 40);
    // this.electrons.draw();
    // this.innerElectrons.drawInner();
  }

  // draws the electrons
  drawElectrons(electron, numElectrons) {
    for (let i = 0; i < numElectrons; i++) {
      electron.draw(
        200 + electron.R * Math.cos((Math.PI / 180) * electron.ang),
        200 + electron.R * Math.sin((Math.PI / 180) * electron.ang)
      );
      electron.ang += 360 / numElectrons;
    }
  }

  // updates the position
  updatePosition() {
    this.circle.updatePosition();
    this.electrons.updatePosition(this.x, this.y);
    this.innerElectrons.updatePosition(this.x, this.y);
  }

  // drawProtons() {
  //   console.log("Protons");
  // }
}

// Activating circular movement
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  atom.updatePosition();
  atom2.updatePosition();
  atom.draw();
  atom2.draw();
  requestAnimationFrame(animate);
}

// Initiating the Start of the animation and the atoms
let atom = new Atom(100, 100);
let atom2 = new Atom(300, 300);
animate();

