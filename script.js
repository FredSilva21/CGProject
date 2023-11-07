const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener("load", followMouse());

let animationFrameId;
let menuCircles = [];

let simulationRunning = false;
let electronSpeed = 50;
let protonCount = 1; // Set an initial proton count
let atomCount = 0;

startButton.addEventListener("click", () => {
  if (!simulationRunning) {
    startSimulation();
    startButton.style.display = "none";
    restartButton.style.display = "block";
    simulationRunning = true;
  }
});

restartButton.addEventListener("click", () => {
  if (simulationRunning) {
    resetSimulation();
    startButton.style.display = "block";
    restartButton.style.display = "none";
    simulationRunning = false;
  }
});

//Menu Functions
function drawCircle(x, y) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, 2 * Math.PI);
  ctx.fill();
}

for (let i = 0; i < 10; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  menuCircles.push({ x, y });
}

function animateCircles() {
  requestAnimationFrame(animateCircles);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < menuCircles.length; i++) {
    const circle = menuCircles[i];
    drawCircle(circle.x, circle.y);
  }
}
function followMouse() {
  canvas.addEventListener("mousemove", (event) => {
    for (let i = 0; i < menuCircles.length; i++) {
      const circle = menuCircles[i];
      const dx = event.clientX - circle.x;
      const dy = event.clientY - circle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 10) {
        const angle = Math.atan2(dy, dx);
        const moveDistance = distance - 10; // Move the circle 10 pixels closer to the mouse
        const moveX = Math.cos(angle) * moveDistance * 0.05; // Adjust the 0.05 value for smoother transition
        const moveY = Math.sin(angle) * moveDistance * 0.05; // Adjust the 0.05 value for smoother transition

        // Update the circle's position
        circle.x += moveX;
        circle.y += moveY;
      }
    }
  });
}

animateCircles();

function startSimulation() {
  console.log("TESTE");
}
