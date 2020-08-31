import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/nasa',
    component: () => import('@/Index.vue'),
    children: [
      { path: '', component: () => import('@/views/nasa/Index.vue') },
      { path: 'apod', component: () => import('@/views/nasa/Apod.vue') },
      { path: 'epic', component: () => import('@/views/nasa/Epic.vue') },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
