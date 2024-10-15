<template>
<div class="container">
  <LogoGithub @click="toGithub('https://github.com/fencer-yangd/promote-tips')" class="github-icon" />
  <div class="div">一个用于记录前端知识的GIT仓库</div>
</div>
</template>
<script setup>
import { LogoGithub } from '@vicons/ionicons5'

function toGithub(url) {
  // 创建一个 <a> 元素
  const a = document.createElement('a');
  // 设置 <a> 元素的 href 属性为要打开的 URL
  a.href = url;
  // 设置 target 属性为 _blank 以打开新标签页
  a.target = '_blank';
  // 隐藏 <a> 元素
  a.style.display = 'none';
  // 将 <a> 元素添加到文档中
  document.body.appendChild(a);
  // 触发 <a> 元素的点击事件
  a.click();
  // 点击后移除 <a> 元素
  document.body.removeChild(a);
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background-color: darkgray;
}

.github-icon {
  width: 100px;
  height: 100px;
  color: #fff;
  cursor: pointer;
}

.div {
  position: relative;
  font-size: 60px;
  color: #fff;
  font-weight: 800;
  z-index: 0;
}
.div::before {
  content: '一个用于记录前端知识的GIT仓库';
  position: absolute;
  color: #000;
  transform: skew(50deg) translate(-42px, 18px) scaleY(0.5);
  z-index: -1;
  filter: blur(5px);
  -webkit-mask-image: linear-gradient(transparent, #000);
}
</style>
