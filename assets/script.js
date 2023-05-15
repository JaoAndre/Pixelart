// Elementos.
const canvas = document.getElementById("canvas");
const modeButton = document.getElementById("modeButton");

// Contexto 2D do canvas.
const context = canvas.getContext("2d");

// Largura e altura do canvas.
const canvasWidth = 600;
const canvasHeight = 600;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Tamanho do pixel.
const pixelSize = 20;

// Calcula o número de pixels na horizontal e vertical.
const numPixelsX = canvasWidth / pixelSize;
const numPixelsY = canvasHeight / pixelSize;

// Desenha a mesa xadrez.
const canvasColor = ["#FFFFFF", "#F2F2F2"];

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
  context.fillStyle = "#000000";
}

// Função para desenhar pixel.
function drawPixel(pixelX, pixelY) {
  pixelX = Math.floor(pixelX / pixelSize) * pixelSize;
  pixelY = Math.floor(pixelY / pixelSize) * pixelSize;

  if (isErasing) {
    context.fillStyle =
      canvasColor[
        (pixelX / pixelSize + pixelY / pixelSize) % canvasColor.length
      ];
  } else {
    context.fillStyle = "#000000";
  }

  context.fillRect(pixelX, pixelY, pixelSize, pixelSize);
}

// Função para mudar o modo.
function switchMode() {
  isErasing = !isErasing;

  modeButton.innerHTML = isErasing ? "Lápis" : "Borracha";
  context.fillStyle = isErasing ? "#FFFFFF" : "#000000";
}

// Variáveis.
let isErasing = false;
let shouldDraw = false;

// Inicialização.
drawCanvas();

// Event listeners.
canvas.addEventListener("mousedown", (e) => (shouldDraw = true));
canvas.addEventListener("mouseup", (e) => (shouldDraw = false));
canvas.addEventListener("mousemove", (e) => shouldDraw && drawPixel(e.offsetX, e.offsetY));
canvas.addEventListener("click", (e) => drawPixel(e.offsetX, e.offsetY));