<template>
  <div class="container">
    <div class="show-loading" v-if="loading" >
      <van-loading type="spinner" />
    </div>
    <template v-if="!loading">
      <van-collapse v-model="coll">
        <van-collapse-item title="TS代码" name="1" v-if="tsCodeStr">
          <v-md-editor v-model="tsCodeStr" mode="preview" :codemirror-config="{ lineNumbers: true }" @copy-code-success="handleCopyCodeSuccess"></v-md-editor>
        </van-collapse-item>
        <van-collapse-item title="JS代码" name="2" v-if="jsCodeStr">
          <v-md-editor v-model="jsCodeStr" mode="preview" :codemirror-config="{ lineNumbers: true }" @copy-code-success="handleCopyCodeSuccess"></v-md-editor>
        </van-collapse-item>
      </van-collapse>
      <van-button @click="runCode" class="run-button" type="primary">
        运行
      </van-button>
      <div class="log-container" title="执行日志" v-if="logs.length">
        <p v-for="(log, index) in logs" :key="index">
          <span>-></span>
          <span style="margin-left: 10px">{{ log }}</span>
        </p>
      </div>
    </template>
  </div>
</template>
<script setup>
import { Loading  as  VanLoading, showToast, Button as VanButton, Collapse as VanCollapse, CollapseItem as  VanCollapseItem  } from 'vant';
import {ref, watch} from "vue";
import {useLoadingBar} from "naive-ui";
import axios from "axios";

const props = defineProps({
  path: String
})

const loadingBar = useLoadingBar()
const originalLog = console.log;

const tsCodeStr = ref('')
const jsCodeStr = ref('')
const tsCode = ref('')
const jsCode = ref('')
const logs = ref([])
const loading = ref(true)
const coll = ref([])

function handleCopyCodeSuccess(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast("文本已复制到剪贴板!");
  }).catch(err => {
    showToast( "复制失败: " + err);
  });
}


function runCode() {
  logs.value = [];
  // 3. 创建一个新的函数执行 JS 文件的内容（支持异步）
  eval(jsCode.value);
}

watch(() => props.path, () => {
  if (!props.path) return
  tsCode.value = ''
  tsCodeStr.value = ''
  jsCode.value = ''
  jsCodeStr.value = ''
  logs.value = []
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
  const tsUrl = `${props.path.replace('/public', import.meta.env.DEV ? '' : '/promote-tips')}/index.ts`
  const jsUrl = `${props.path.replace('/public', import.meta.env.DEV ? '' : '/promote-tips')}/_index.js`
  Promise.allSettled([axios.get(tsUrl), axios.get(jsUrl)]).then(([tsData, jsData]) => {
    if (tsData.status === 'fulfilled') {
      const _code = tsData.value.data;
      if (!_code.startsWith('<!doctype html>')) {
        tsCode.value = _code.replace(/\/\/# sourceMappingURL=(.*)$/, '')
        tsCodeStr.value = `\`\`\`js\n${tsCode.value}\n\`\`\``
      }
    }
    if (jsData.status === 'fulfilled') {
      const _code = jsData.value.data;
      if (!_code.startsWith('<!doctype html>')) {
        jsCode.value = _code.replace(/\/\/# sourceMappingURL=(.*)$/, '')
        jsCodeStr.value = `\`\`\`js\n${jsCode.value}\n\`\`\``
      }
    }
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

.md-card {
}

.run-button {
  margin: 10px 0 0 40px;
  width: 200px;
}


.log-container {
  width: calc(100% - 80px);
  margin: 20px 40px;
}

:deep(.v-md-editor) {
  background-color: transparent;
}

:deep(.vuepress-markdown-body) {
  background-color: transparent;
}
</style>
