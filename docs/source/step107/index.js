const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const saveButton = document.querySelector('.save');
const clearButton = document.querySelector('.clear');

let isDrawing = false;
let first = null;

let paths = [];
let current = [];

saveButton.onclick = () => {
  displaySvg();
}

clearButton.onclick = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  const svg = document.querySelector('.svg');
  const pathDom = document.querySelector('svg path');
  paths = [];
  svg.removeAttribute('style');
  pathDom.setAttribute('d', '');
}

function displaySvg() {
  const svg = document.querySelector('svg');
  const svgDom = document.querySelector('.svg');
  svg.setAttribute('width', window.innerWidth);
  svg.setAttribute('height', window.innerHeight);
  svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);

  svgDom.setAttribute('style', 'display: block');
  drawSvg(paths);
}

function drawSvg(paths, pIdx = 0, idx = 0) {
  requestAnimationFrame(() => {
    if (paths.length === pIdx) return;
    if (paths[pIdx].length === idx) {
      drawSvg(paths, pIdx + 1, 0);
      return;
    }
    const pathDom = document.querySelector('svg path');
    const ePath = pathDom.getAttribute('d');
    const _path = paths[pIdx];
    if (!idx) {
      pathDom.setAttribute('d', `${ePath} M${_path[0].x},${_path[0].y} `);
    } else {
      pathDom.setAttribute('d', `${ePath} L${_path[idx].x},${_path[idx].y} `);
    }
    drawSvg(paths, pIdx, idx + 1)
  })
}

canvas.onmousedown = (e) => {
  isDrawing = true;
  ctx.beginPath();
  first = { x: e.clientX, y: e.clientY };
  current = [first];
}

canvas.onmousemove = (e) => {
  if (!isDrawing) return;
  drawLine({ x: e.clientX, y: e.clientY }, first);
  current.push({ x: e.clientX, y: e.clientY });
  first = { x: e.clientX, y: e.clientY };
}

canvas.onmouseup = () => {
  isDrawing = false;
  paths.push(current);
}


function drawLine(v1, v0) {
  ctx.moveTo(v0.x, v0.y);
  ctx.lineTo(v1.x, v1.y);
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'brown';
  ctx.lineCap = 'round';
  ctx.stroke();
}

