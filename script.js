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
    this.R += Math.sin(this.ang) * 6;
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

// Circle Ellipse
class Circle {
  // Drawing a circle
  draw(x, y, radius) {
    ctx.beginPath();
    ctx.ellipse(x, y, 30, 100, Math.PI / 2, 0, 2 * Math.PI); // center
    ctx.moveTo(x+20,y+20)
    ctx.ellipse(x, y, 30, 120, Math.PI / 4, 0, 2 * Math.PI); // right
    ctx.moveTo(x+80,y+90)
    ctx.ellipse(x, y, 120, 30, Math.PI / 4, 0, 2 * Math.PI); // left
    ctx.strokeStyle = "rgba(255,255,255)";
    ctx.stroke();
  }

  updatePosition() {
    this.ang += 0.2;
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
    this.electrons = new Electron("blue", 20, 100, 150, 0);
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
  }

  // draws the electrons
  drawElectrons(electron, numElectrons) {
    for (let i = 0; i < numElectrons; i++) {
      electron.draw(
        this.x + electron.R * Math.cos((Math.PI / 360) * electron.ang),
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
    this.electrons.updatePosition(temperature * 2);
    this.innerElectrons.updatePosition(temperature * 2);
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

start.addEventListener("click", () => {
  secondPage.style.display = "block";
  let container = document.querySelector(".container");
  container.style.display = "none";
  canvas.style.display = "block";
});

restart.addEventListener("click", () => {
  secondPage.style.display = "none";
  let container = document.querySelector(".container");
  container.style.display = "block";
  temperatureRangeInput.value = 50;
  temperatureValueDisplay.textContent = 50;
  temperatureValueDisplay.style.color = "black";
  restart.style.animation = "";
  temperature = 50;
});

// Temperature control
const temperatureRangeInput = document.getElementById("temperatureRangeInput");
const temperatureValueDisplay = document.getElementById(
  "temperatureValueDisplay"
);

temperatureRangeInput.addEventListener("input", function () {
  // Update the temperature variable when the range input changes
  temperature = parseInt(temperatureRangeInput.value);
  const animationDuration = 0.5 / (temperature / 50);
  temperatureValueDisplay.textContent = temperature;
  if (temperature > 50) {
    temperatureValueDisplay.style.color = "orange";
    restart.style.animation = `shake ${animationDuration}s infinite`;
  } else if (temperature < 50) {
    temperatureValueDisplay.style.color = "blue";
    restart.style.animation = "";
  } else {
    temperatureValueDisplay.style.color = "white";
  }
});

let animationFrameId;
let electronSpeed = 50;

// Initiating the Start of the animation and the atoms
let atoms = [];

//
for (let i = 0; i < 6; i++) {
  let newAtom;
  do {
    newAtom = new Atom(Math.random() * W, Math.random() * H);
  } while (checkOverlap(newAtom, atoms));

  atoms.push(newAtom);
}

// Entry animation
function movingBalls() {
  // Create additional balls dynamically
  const numBalls = 30; // Adjust the number of balls
  const background = document.querySelector(".background");
  for (let i = 0; i < numBalls; i++) {
    const ball = document.createElement("div");
    ball.className = "ball";
    ball.style.top = `${Math.random() * 100}vh`;
    ball.style.animationDuration = `${Math.random() * 4 + 1}s`; // Adjust animation duration
    background.appendChild(ball);
  }
}

// Check for atoms appearing on top of each other
function checkOverlap(newAtom, existingAtoms) {
  for (let i = 0; i < existingAtoms.length; i++) {
    const distance = calculateDistance(
      newAtom.x,
      newAtom.y,
      existingAtoms[i].x,
      existingAtoms[i].y
    );
    const minDistance = newAtom.radius + existingAtoms[i].radius;

    if (distance <= minDistance) {
      return true; // Overlaps with an existing atom
    }
  }
  return false; // No overlap
}

// Calculate distance
function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Function to check colliding circles
function checkCollision(atom1, atom2) {
  const dx = atom2.x - atom1.x;
  const dy = atom2.y - atom1.y;
  const dz = dx * dx + dy * dy;
  const distance = atom2.radius + atom2.radius;
  return distance * distance >= dz;
}

// Activating circular movement
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  for (let i = 0; i < atoms.length; i++) {
    atoms[i].updatePosition();
    atoms[i].draw();
    atoms[i].moveRandomly();

    // Loop to check collisions
    for (let j = i + 1; j < atoms.length; j++) {
      if (checkCollision(atoms[i], atoms[j])) {
        // Handle the collision movement
        const tempVx = atoms[i].vx;
        const tempVy = atoms[i].vy;

        atoms[i].vx = atoms[j].vx;
        atoms[i].vy = atoms[j].vy;

        atoms[j].vx = tempVx;
        atoms[j].vy = tempVy;
      }
    }

    ctx.closePath();
  }

  requestAnimationFrame(animate);
}
animate();
