const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const button = document.getElementById("jsFillBtn");

INITIAL_STYLE = "";
CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.lineWidth = 5;
ctx.strokeStyle = INITIAL_STYLE;
ctx.fillStyle = INITIAL_STYLE;

let painting = false;
let filling = false;

function paintingStop() {
  painting = false;
}
function paintingStart() {
  painting = true;
}

function mouseMove(event) {
  const offSetX = event.offsetX;
  const offSetY = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(offSetX, offSetY);
  } else {
    ctx.lineTo(offSetX, offSetY);
    ctx.stroke();
  }
}

function handleFilling() {
  filling = !filling;
  if (filling === true) {
    button.innerText = "Paint";
    canvas.addEventListener("mousemove", paintingStop);
    canvas.addEventListener("click", handleClick);
  } else {
    button.innerText = "Fill";
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mousedown", paintingStart);
    canvas.addEventListener("mouseup", paintingStop);
    canvas.addEventListener("mouseout", paintingStop);
  }
}

function handleRange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", mouseMove);
  canvas.addEventListener("mousedown", paintingStart);
  canvas.addEventListener("mouseup", paintingStop);
  canvas.addEventListener("mouseout", paintingStop);
}

const arrColor = Array.from(color);

arrColor.forEach((color) => color.addEventListener("click", handleColor));

if (range) {
  range.addEventListener("input", handleRange);
}

if (button) {
  button.addEventListener("click", handleFilling);
}
