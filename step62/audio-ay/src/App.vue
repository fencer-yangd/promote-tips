<script setup lang="ts">
import {onMounted, ref} from "vue";
import sound from './assets/1.mp3';

const audioRef = ref<HTMLAudioElement>();

onMounted(() => {
  if (!audioRef.value) return;
  let isInit = false;
  let audioContext: AudioContext,
    source:  MediaElementAudioSourceNode, analysis:  AnalyserNode, bufferLength: number, dataArray: Uint8Array;

  const canvas = document.createElement('canvas');
  const canvasCtx = canvas.getContext('2d');
  if (!canvasCtx) return;
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

  audioRef.value.onplay = () => {
    if (!audioRef.value) return;
    if (!isInit) {
      audioContext = new AudioContext();
      source = audioContext.createMediaElementSource(audioRef.value);
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
});

</script>

<template>
  <div>
    <audio ref="audioRef" :src="sound" :controls="true"></audio>
    <el-button type="primary"></el-button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
