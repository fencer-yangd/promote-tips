<template>
  <div class="container" :key="path">
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
      <v-md-editor v-model="data" mode="preview" :codemirror-config="{ lineNumbers: true }" @copy-code-success="handleCopyCodeSuccess"></v-md-editor>
      <n-button @click="runCode" class="run-button" type="primary">
        运行
      </n-button>
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
import {useLoadingBar, useMessage} from 'naive-ui'
import { Reload } from '@vicons/ionicons5'

const props = defineProps({
  path: String
})
const message = useMessage()
const loadingBar = useLoadingBar()
const originalLog = console.log;

const data = ref('')
const code = ref('')
const logs = ref([])
const errorLogs = ref([])
const loading = ref(true)

function handleCopyCodeSuccess(code) {
  navigator.clipboard.writeText(code).then(() => {
    message.success("文本已复制到剪贴板!");
  }).catch(err => {
    message.error( "复制失败: " + err);
  });
}

function runCode() {
  logs.value = [];
  errorLogs.value = [];
  // 3. 创建一个新的函数执行 JS 文件的内容（支持异步）
  eval(code.value);
}


watch(() => props.path, () => {
  if (!props.path) return
  code.value = ''
  data.value = ''
  logs.value = []
  errorLogs.value = []
  console.log = (...args) => {
    logs.value.push(args.map(i => {
      if (typeof i === 'object' && i !== null) {
        return JSON.stringify(i, null, 2)
      }
      return i + ''
    }).join(' ')); // 将输出添加到 logs 中
    originalLog.apply(console, args); // 保持原有 console.log 功能
  };
  loadingBar.start()
  logs.value = []
  loading.value = true
  const url = new URL(`${props.path.replace('/public', import.meta.env.DEV ? '': '/promote-tips')}/index.js`, import.meta.url)
  axios.get(url.href).then(res => {
    code.value = res.data.replace(/\/\/# sourceMappingURL=(.*)$/, '')
    data.value = `\`\`\`js\n${code.value}\n\`\`\``
  }).finally(() => {
    loadingBar.finish()
    loading.value = false
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

.run-button {
  margin: 10px 0 0 40px;
  width: 200px;
}

.log-container {
  width: calc(100% - 80px);
  margin: 20px 40px;
}
</style>
