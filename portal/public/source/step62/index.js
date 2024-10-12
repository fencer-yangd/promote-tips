const audioRef = document.querySelector('#audio');

let isInit = false;
let audioContext,
  source, analysis, bufferLength, dataArray;

const canvas = document.createElement('canvas');
const canvasCtx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 300;
document.body.appendChild(canvas);
const draw = () => {
  requestAnimationFrame(draw);
  analysis.getByteFrequencyData(dataArray);
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] / 2;
    canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
    canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);
    x += barWidth + 1;
  }
};

audioRef.onplay = () => {
  if (!audioRef) return;
  if (!isInit) {
    audioContext = new AudioContext();
    source = audioContext.createMediaElementSource(audioRef);
    analysis = audioContext.createAnalyser();
    analysis.fftSize = 256;
    bufferLength = analysis.frequencyBinCount;
    dataArray = new Uint8Array(analysis.frequencyBinCount)
  }
  isInit = true;
  draw();
  if (!source || !analysis || !audioContext) return;
  source.connect(analysis);
  analysis.connect(audioContext.destination);
}
