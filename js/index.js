const canvas = document.getElementById("jsCanvas");
const jsRange = document.getElementById("jsRange");
const jsColor = document.getElementsByClassName("jsColor");
const jsFill = document.getElementById("jsFill");
const jsSave = document.getElementById("jsSave");
const ctx = canvas.getContext("2d");

let painting = false;
let filling = false;
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "black";
ctx.lineWidth = 5;
ctx.fillStyle = "black";
function paintingStart() {
  painting = true;
}

function paintingStop() {
  painting = false;
}
function mouseMove(event) {
  const offSetX = event.offsetX;
  const offSetY = event.offsetY;
  if (filling === true) {
    return false;
  }
  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(offSetX, offSetY);
  } else {
    ctx.lineTo(offSetX, offSetY);
    ctx.stroke();
  }
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

function handleColorChange(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
}

function canvasFilling(event) {
  if (filling === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function textChange() {
  if (jsFill.innerText === "FILL") {
    jsFill.innerText = "PAINT";
    filling = true;
    canvas.addEventListener("click", canvasFilling);
  } else {
    jsFill.innerText = "FILL";
    filling = false;
  }
}

function mouseRightStop(event) {
  event.preventDefault();
}

function handleSave(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "My painting";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", mouseMove);
  canvas.addEventListener("mousedown", paintingStart);
  canvas.addEventListener("mouseup", paintingStop);
  canvas.addEventListener("mouseleave", paintingStop);
  canvas.addEventListener("contextmenu", mouseRightStop);
}

if (jsRange) {
  jsRange.addEventListener("input", handleRangeChange);
}

Array.from(jsColor).forEach((color) =>
  color.addEventListener("click", handleColorChange)
);

if (jsFill) {
  jsFill.addEventListener("click", textChange);
}

if (jsSave) {
  jsSave.addEventListener("click", handleSave);
}
