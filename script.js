// ... (Your previous code)

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let electronSpeed = 50;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  atom();
  requestAnimationFrame(animate);
}

// Menu initialization
window.addEventListener("DOMContentLoaded", function () {
  const numBalls = 20;
  const background = document.querySelector(".background");

  for (let i = 0; i < numBalls; i++) {
    const ball = document.createElement("div");
    ball.className = "ball";
    ball.style.top = `${Math.random() * 100}vh`;
    ball.style.animationDuration = `${Math.random() * 3 + 1}s`;
    background.appendChild(ball);
  }
});

// Start button click event
const start = document.getElementById("startButton");
start.addEventListener("click", function () {
  let background = document.querySelector(".background");
  background.style.display = "none";
  document.body.innerHTML = `
    <canvas id="canvas"></canvas>
    <div id="simulation">
      <!--Temperature-->
      <div id="temperature">
        <label for="temperatureRangeInput">Temperature:</label>
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
      temperatureValueDisplay.style.color = "orange";
    } else if (temperatureRangeInput.value < 50) {
      temperatureLabel.style.color = "blue";
      temperatureLabel.style.animation = "shake 0.5s infinite"; // Adjust animation parameters
      temperatureValueDisplay.style.color = "blue";
    } else {
      temperatureLabel.style.color = "white";
      temperatureValueDisplay.style.color = "white";
    }
  });

  animate();
});

// Atom Creation
function atom() {
  // Your drawing code for the atom goes here
  circle.drawCircle(200, 200, 100);
  circle.drawCircle2(200, 200, 40);
  drawElectrons();
  drawElectrons2();
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

let protons = {
  color: "red", 
  D: 20,
  R: 200, 
  numProtons:1,
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
    let posX = 200 + this.R * Math.cos((Math.PI / 240) * this.ang);
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
  for (let i = 0; i < protons.numProtons; i++) {
    protons.drawInner();
    protons.ang += 360 / protons.numProtons;
  }
}


