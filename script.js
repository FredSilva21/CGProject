const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener("load", followMouse); // Remova os parênteses aqui

let animationFrameId;
let menuCircles = [];

let simulationRunning = false;
let electronSpeed = 50;

function followMouse() {
  const container = document.querySelector(".container");

  for (let i = 0; i < 16; i++) {
    const pElement = document.createElement("p");
    pElement.innerHTML = `<img src="red-circle-icon.svg" width="30" height="30" id="circle"></img>`;
    container.appendChild(pElement);

    // Posiciona as imagens aleatoriamente no início com algum espaçamento
    const randomX = Math.random() * (container.clientWidth - 30); // Subtrai 30 para evitar que as imagens fiquem fora do container
    const randomY = Math.random() * (container.clientHeight - 30); // Subtrai 30 para evitar que as imagens fiquem fora do container
    pElement.style.left = randomX + "px";
    pElement.style.top = randomY + "px";
  }

  container.addEventListener("mousemove", function (event) {
    updatePElementsPosition(event);
  });
}

function updatePElementsPosition(event) {
  const pElements = document.querySelectorAll(".container p");

  pElements.forEach((pElement, index) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const offset = 10 * (index + 1);

    pElement.style.left = mouseX - offset + "px";
    pElement.style.top = mouseY - offset + "px";
  });
}

function startSimulation() {
  console.log("TESTE");
}

