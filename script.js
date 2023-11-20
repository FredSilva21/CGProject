// Atom Creation
// Creation of the electron properties
class Electron {
  constructor(color, D, R, ang) {
    this.color = color;
    this.D = D;
    this.R = R;
    this.ang = ang;
  }

  draw(posX, posY) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(posX, posY, this.D / 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Movement
  updatePosition(temperature) {
    const vibrationSpeed = 0.5 * (temperature / 50);
    this.ang += vibrationSpeed;
    this.R += Math.sin(this.ang) * 4;
  }
}

class Neutron {
  constructor(color, D, R, ang) {
    this.color = color;
    this.D = D;
    this.R = R;
    this.ang = ang;
  }

  draw(posX, posY) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(posX, posY, this.D / 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  updatePosition(temperature) {
    const vibrationSpeed = 0.5 * (temperature / 50);
    this.ang += vibrationSpeed;
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
    this.vx = Math.floor(Math.random() * 3 + 1);
    this.vy = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    this.radius = 100;
    this.circle = new Circle();
    this.electrons = new Electron("blue", 20, 100, 0);
    this.innerElectrons = new Electron("blue", 20, 40, 0);
    this.neutrons = new Neutron("gray", 20, 0, 0);
  }

  // Draws the atom
  draw() {
    // Outer circle
    this.circle.draw(this.x, this.y, 100);
    // Inner circle
    this.circle.draw(this.x, this.y, 40);
    // Electrons on top of the circle
    this.drawElectrons(this.electrons, 6);
    // Electrons on top of the inner circle
    this.drawElectrons(this.innerElectrons, 2);
    // Neutron
    this.drawNeutron(this.neutrons, this.x, this.y);

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
        this.x + electron.R * Math.cos((Math.PI / 180) * electron.ang),
        this.y + electron.R * Math.sin((Math.PI / 180) * electron.ang)
      );
      electron.ang += 360 / numElectrons;
    }
  }

  drawNeutron(neutrons, centerX, centerY) {
    neutrons.draw(centerX, centerY);
  }

  // updates the position
  updatePosition() {
    this.circle.updatePosition();
    this.electrons.updatePosition(temperature);
    this.innerElectrons.updatePosition(temperature);
    this.neutrons.updatePosition(temperature);

    this.angle += 0.2;
    this.R += Math.sin(this.angle) * 4;
  }

  moveRandomly() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.radius > W) {
      this.x = W - this.radius;
      this.vx *= -1;
    } else if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.vx *= -1;
    }

    if (this.y + this.radius > H) {
      this.y = H - this.radius;
      this.vy *= -1;
    } else if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.vy *= -1;
    }
  }
}

// First entry window
window.addEventListener("DOMContentLoaded", () => {
  movingBalls();
});

let temperature = 50;

//Second Page
let canvas = document.getElementById("canvas");
// Canvas definition
let ctx = canvas.getContext("2d");
const W = canvas.width,
  H = canvas.height;

let secondPage = document.querySelector(".secondPage");
secondPage.style.display = "none";

// Start and Restart button click event
const start = document.getElementById("startButton");
let restart = document.getElementById("restart");

start.addEventListener("click", function () {
  secondPage.style.display = "block";
  let container = document.querySelector(".container");
  container.style.display = "none";
  canvas.style.display = "block";
  canvas.width = 1300;
  canvas.height = 650;
});

restart.addEventListener("click", function () {
  secondPage.style.display = "none";
  let container = document.querySelector(".container");
  container.style.display = "block";
});

// Temperature control
const temperatureRangeInput = document.getElementById("temperatureRangeInput");
const temperatureValueDisplay = document.getElementById(
  "temperatureValueDisplay"
);

temperatureRangeInput.addEventListener("input", function () {
  // Update the temperature variable when the range input changes
  temperature = parseInt(temperatureRangeInput.value);

  temperatureValueDisplay.textContent = temperature;
  if (temperature > 50) {
    temperatureValueDisplay.style.color = "orange";
  } else if (temperature < 50) {
    temperatureValueDisplay.style.color = "blue";
  } else {
    temperatureValueDisplay.style.color = "white";
  }
});

let animationFrameId;
let electronSpeed = 50;

// Initiating the Start of the animation and the atoms
let atoms = [];

for (let i = 0; i < 6; i++) {
  atoms.push(new Atom(Math.random() * W, Math.random() * H));
}

// Entry animation
function movingBalls() {
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
}

// Activating circular movement
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  for (let i = 0; i < atoms.length; i++) {
    atoms[i].updatePosition();
    atoms[i].draw();
    atoms[i].moveRandomly();
    ctx.closePath();
  }

  requestAnimationFrame(animate);
}

animate();
