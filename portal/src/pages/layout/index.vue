<template>
  <div class="root-view">
    <p-c-view v-if="isPC" />
    <mobile-view v-else />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { IsPC } from '@/utils'
import PCView from './pc/index.vue'
import MobileView from './mobile/index.vue'

const isPC = computed(() => IsPC())

</script>

<style scoped>
.root-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
