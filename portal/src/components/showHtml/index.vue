<template>
  <div class="container">
    <div class="show-loading" v-if="loading" >
      <n-spin :show="loading">
        <template #icon>
          <n-icon>
            <Reload />
          </n-icon>
        </template>
      </n-spin>
    </div>
    <template v-if="!loading">
      <div class="iframe-box">
        <iframe class="iframe" :src="url" frameborder="0"></iframe>
      </div>
      <n-card title="JS代码" v-if="jsCodeStr">
        <v-md-editor v-model="jsCodeStr" mode="preview" :codemirror-config="{ lineNumbers: true }" @copy-code-success="handleCopyCodeSuccess"></v-md-editor>
      </n-card>
      <n-card title="HTML代码" v-if="htmlCodeStr">
        <v-md-editor v-model="htmlCodeStr" mode="preview" :codemirror-config="{ lineNumbers: true }" @copy-code-success="handleCopyCodeSuccess"></v-md-editor>
      </n-card>
      <n-card class="log-container" title="执行日志" v-if="logs.length">
        <p v-for="(log, index) in logs" :key="index">
          <span>-></span>
          <span style="margin-left: 10px">{{ log }}</span>
        </p>
      </n-card>
    </template>
  </div>
</template>
<script setup>
import {ref, watch} from "vue";
import axios from 'axios'
import { useLoadingBar, useMessage } from 'naive-ui'
import { Reload } from '@vicons/ionicons5'

const props = defineProps({
  path: String
})
const url = ref('')

const loadingBar = useLoadingBar()
const message = useMessage()
const originalLog = console.log;

const jsCodeStr = ref('')
const htmlCodeStr = ref('')
const jsCode = ref('')
const htmlCode = ref('')
const logs = ref([])
const loading = ref(true)

function handleCopyCodeSuccess(code) {
  navigator.clipboard.writeText(code).then(() => {
    message.success("文本已复制到剪贴板!");
  }).catch(err => {
    message.error( "复制失败: " + err);
  });
}

watch(() => props.path, () => {
  if (!props.path) return
  loadingBar.start()
  logs.value = []
  loading.value = true
  console.log = (...args) => {
    logs.value.push(args.map(i => {
      if (typeof i === 'object' && i !== null) {
        return JSON.stringify(i, null, 2)
      }
      return i + ''
    }).join(' ')); // 将输出添加到 logs 中
    originalLog.apply(console, args); // 保持原有 console.log 功能
  };
  setTimeout(() => {
    url.value = `${props.path.replace('/public', import.meta.env.DEV ? '': '/promote-tips')}/index.html`
    const jsUrl = `${props.path.replace('/public', import.meta.env.DEV ? '': '/promote-tips')}/index.js`
    const htmlUrl = `${props.path.replace('/public', import.meta.env.DEV ? '': '/promote-tips')}/index.html`
    Promise.allSettled([axios.get(jsUrl), axios.get(htmlUrl)]).then(([jsData, htmlData]) => {
      if (jsData.status === 'fulfilled') {
        const _code = jsData.value.data;
        if (!_code.startsWith('<!doctype html>')){
          jsCode.value = _code.replace(/\/\/# sourceMappingURL=(.*)$/, '')
          jsCodeStr.value = `\`\`\`js\n${jsCode.value}\n\`\`\``
        }
      }
      if (htmlData.status === 'fulfilled') {
        const _code = htmlData.value.data;
        htmlCode.value = _code.replace(/\/\/# sourceMappingURL=(.*)$/, '')
        htmlCodeStr.value = `\`\`\`html\n${htmlCode.value}\n\`\`\``
      }
    }).finally(() => {
      loadingBar.finish()
      loading.value = false
    })
  })
}, { immediate: true })
</script>
<style scoped>
.container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  overflow-x: hidden;
  overflow-y: auto;
}

.show-loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.iframe-box {
  box-sizing: border-box;
  width: calc(100% - 80px);
  height: 80%;
  margin: 40px;
  border: 1px solid #f0f0f0;
  flex-shrink: 0;
  border-radius: 10px;
}

.iframe {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}


.log-container {
  width: calc(100% - 80px);
  margin: 20px 40px;
}
</style>
