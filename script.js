const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let animationFrameId;
let circles = [];

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


function drawCircle(x, y) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, 2 * Math.PI);
  ctx.fill();
}

function animateCircles() {
  requestAnimationFrame(animateCircles);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      circle.x += (circle.targetX - circle.x) * 0.1;
      circle.y += (circle.targetY - circle.y) * 0.1;
      drawCircle(circle.x, circle.y);
  }
}

canvas.addEventListener("mousemove", (event) => {
  if (circles.length < 8) {
      const circle = {
          x: event.clientX,
          y: event.clientY,
          targetX: event.clientX,
          targetY: event.clientY,
      };
      circles.push(circle);
  }
});

animateCircles();
