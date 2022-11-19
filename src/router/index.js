import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'base',
    component: () => import('../views/base.vue')
  },
  {
    path: '/zIndex',
    name: 'zIndex',
    component: () => import('../views/zIndex.vue')
  },
  {
    path: '/remember',
    name: 'remember',
    component: () => import('../views/remember.vue')
  },
  {
    path: '/scroll',
    name: 'scroll',
    component: () => import('../views/scroll.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
