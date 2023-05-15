// Elementos.
const canvas = document.getElementById("canvas");
const modeButton = document.getElementById("modeButton");
const colorPicker = document.getElementById("colorPicker");

// Contexto 2D do canvas.
const context = canvas.getContext("2d");

// Largura e altura do canvas.
const canvasWidth = 600;
const canvasHeight = 600;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Variáveis.
const pixelSize = 20;
let isErasing = false;
let shouldDraw = false;
let drawColor = "#000000";

// Calcula o número de pixels na horizontal e vertical.
const numPixelsX = canvasWidth / pixelSize;
const numPixelsY = canvasHeight / pixelSize;

// Desenha a mesa xadrez.
const canvasColor = ["#FFFFFF", "#F2F2F2"];

// Função para desenhar o canvas.
function drawCanvas() {
  for (let x = 0; x < numPixelsX; x++) {
    for (let y = 0; y < numPixelsY; y++) {
      const pixelX = x * pixelSize;
      const pixelY = y * pixelSize;
      const color = canvasColor[(x + y) % canvasColor.length];

      context.fillStyle = color;
      context.fillRect(pixelX, pixelY, pixelSize, pixelSize);
    }
  }

  if (isErasing) switchMode();
}

// Função para desenhar um pixel.
function drawPixel(pixelX, pixelY, drawColor) {
  pixelX = Math.floor(pixelX / pixelSize) * pixelSize;
  pixelY = Math.floor(pixelY / pixelSize) * pixelSize;

  if (isErasing) {
    context.fillStyle =canvasColor[(pixelX / pixelSize + pixelY / pixelSize) % canvasColor.length];
  } else {
    context.fillStyle = drawColor;
  }

  context.fillRect(pixelX, pixelY, pixelSize, pixelSize);
}

// Função para mudar o modo.
function switchMode() {
  isErasing = !isErasing;

  modeButton.innerHTML = isErasing ? "Lápis" : "Borracha";
  context.fillStyle = isErasing ? "#FFFFFF" : "#000000";
}

// Inicialização.
drawCanvas();

// Event listeners.
canvas.addEventListener("mousedown", (e) => (shouldDraw = true));
canvas.addEventListener("mouseup", (e) => (shouldDraw = false));
canvas.addEventListener("mousemove", (e) => shouldDraw && drawPixel(e.offsetX, e.offsetY, drawColor));
canvas.addEventListener("click", (e) => drawPixel(e.offsetX, e.offsetY));
colorPicker.addEventListener("change", (e) => (drawColor = colorPicker.value));