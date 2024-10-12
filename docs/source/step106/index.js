const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.translate(ctx.canvas.width / 2, ctx.canvas.height);
ctx.scale(1, -1);
ctx.lineCap = 'round';

function drawBranch(v0 = { x: 0, y: 0 }, length = 100, think = 20, dir = 90, time = Date.now()) {
  requestAnimationFrame(() => {
    if (Date.now() - time < 200) {
      drawBranch(v0, length, think, dir, time);
      return;
    }
    if (think <= 2) {
      ctx.beginPath();
      ctx.ellipse(v0.x, v0.y, think * 5, think * 5, 0, 0, 2 * Math.PI);
      ctx.fillStyle = Math.random() > 0.5 ? '#b0601f' : '#c49659';
      ctx.fill();
      return
    }

    const v1 = {
      x: v0.x + length * Math.cos(Math.PI / 180 * dir),
      y: v0.y + length * Math.sin(Math.PI / 180 * dir),
    };

    ctx.beginPath();
    ctx.moveTo(v0.x, v0.y);
    ctx.lineTo(v1.x, v1.y);
    ctx.lineWidth = think;
    ctx.strokeStyle = 'brown';
    ctx.stroke();
    let left = false;
    let right = false;
    if (Math.random() > 0.2) {
      left = true;
      drawBranch(v1, length * 0.85, think * 0.8, dir + 20);
    }
    if (Math.random() > 0.2) {
      right = true;
      drawBranch(v1, length * 0.85, think * 0.8, dir - 20);
    }
    if (!left && !right) {
      ctx.beginPath();
      ctx.ellipse(v1.x, v1.y, 10, 10, 0, 0, 2 * Math.PI);
      ctx.fillStyle = Math.random() > 0.5 ? '#b0601f' : '#c49659';
      ctx.fill();
    }
  })
}

drawBranch();
