const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Array para guardar os átomos
const atoms = [];

class Atomo {
  draw(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  update() {}
}

function init() {}
