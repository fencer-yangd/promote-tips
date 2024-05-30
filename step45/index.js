const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d', {
  willReadFrequently: true
});

const PARTICLE_NUMBER = 1500;
let text = '';
const FONT_SIZE = 140;
const particles = new Array(PARTICLE_NUMBER).fill(null);
const COLOR = '#44444444';
const SIZE = [2, 7];
let imageData = null;
let startMoveTime = 0;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  
  for (let i = 0; i< particles.length; i++) {
    const rad = Math.random() * 2 * Math.PI;
    const size = getRandom(SIZE[0], SIZE[1]);
    const r = canvas.height / 2;
    particles[i] = {
      sx: cx + Math.cos(rad) * r,
      sy: cy + Math.sin(rad) * r,
      x: cx + Math.cos(rad) * r,
      y: cy + Math.sin(rad) * r,
      size
    }
    drawParticles(particles[i]);
  }
}

function drawParticles(particle) {
  ctx.fillStyle = COLOR;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}

function getText() {
  return new Date().toTimeString().substring(0, 8);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getBMP() {
  const { width, height } = canvas;
  clear();
  ctx.fillStyle ='#fff';
  ctx.textBaseline = 'middle';
  ctx.font = `${FONT_SIZE}px '手札体-简'`;
  const textWidth = ctx.measureText(text).width;
  ctx.fillText(text, (width - textWidth) / 2, (height - FONT_SIZE) / 2);
  return ctx.getImageData(0 ,0, width, height);
}

function update(imageData) {
  clear();
  const { width, height, data } = imageData;
  const dis = 4;
  const pxls = [];
  for (let w =0; w< width; w+=dis) {
    for (let h=0; h< height; h+=dis) {
      const i = (w + h * width) * 4;
      if (data[i] > 10) {
        pxls.push([w, h]);
      }
    }
  }
  const count = Math.min(particles.length, pxls.length);
  const duration = 400;
  const timeSpan = Date.now()- startMoveTime;
  for (let i = 0; i < count; i++) {
    const p = particles[i];
    const {sx, sy} = p;
    const [tx, ty] = pxls[i];
    const disX = tx - sx;
    const disY = ty - sy;
    let moveX = (disX / duration) * timeSpan,
      moveY = (disY / duration) * timeSpan;
    if (Math.abs(moveX) > Math.abs(disX)) {
      moveX = disX
    }
    if (Math.abs(moveY) > Math.abs(disY)) {
      moveY = disY
    }
    p.x = sx + moveX
    p.y = sy + moveY
    
    drawParticles(p)
  }
}

function fps() {
  requestAnimationFrame(() => {
    const curText = getText();
    if (curText !== text) {
      text = curText;
  
      for (const p of particles) {
        p.sx = p.x;
        p.sy = p.y;
      }
      
      startMoveTime = Date.now();
      imageData = getBMP();
    }
    update(imageData);
    fps();
  })
}
init();
fps();
