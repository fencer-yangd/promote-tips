import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import naiveUI from 'naive-ui'
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

import Prism from 'prismjs';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';


VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

VueMarkdownEditor.use(createLineNumbertPlugin());
VueMarkdownEditor.use(createCopyCodePlugin());

createApp(App).use(router).use(naiveUI).use(VueMarkdownEditor).mount('#app')
