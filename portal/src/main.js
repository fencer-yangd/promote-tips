import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

createApp(App).use(router).mount('#app')
