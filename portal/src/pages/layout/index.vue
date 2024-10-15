<template>
  <div>
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

</style>
