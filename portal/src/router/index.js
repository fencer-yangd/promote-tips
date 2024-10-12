import { createMemoryHistory, createRouter } from 'vue-router'
import Layout from '@/pages/Layout/index.vue'


const routes = [
  {
    name: 'layout',
    path: '/',
    component: Layout
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
