<template>
  <div class="container" :key="path">
    <v-md-editor v-model="data" mode="preview" :codemirror-config="{ lineNumbers: true }" @copy-code-success="handleCopyCodeSuccess"></v-md-editor>
  </div>
</template>
<script setup>
import {ref, watch} from "vue";
import axios from 'axios'

const props = defineProps({
  path: String
})

const data = ref('')

function handleCopyCodeSuccess() {}

watch(() => props.path, () => {
  if (!props.path) return
  const url = new URL(`${props.path}/index.js`, import.meta.url)
  axios.get(url.href).then(res => {
    data.value = `\`\`\`js\n${res.data.replace(/\/\/# sourceMappingURL=(.*)$/, '')}\n\`\`\``
    
    console.log('res', data.value)
  })
}, { immediate: true })
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
