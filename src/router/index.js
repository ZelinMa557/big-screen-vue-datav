import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/BigScreen.vue')
  },
  {
    path : "/small",
    name : "small",
    component: () => import('../views/SmallScreen.vue')
  },
]
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router