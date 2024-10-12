<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <div class="page">
        <router-view></router-view>
      </div>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
<script setup lang="ts">
</script>
