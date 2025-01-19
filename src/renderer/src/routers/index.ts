import {createWebHashHistory, createRouter} from 'vue-router'


const routes = [
  {path: '/', component: () => import('@renderer/layouts/index.vue')},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
