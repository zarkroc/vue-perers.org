import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Skills from '../views/Skills.vue'
import WorkHistory from '../views/WorkHistory.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/skills',
    name: 'skills',
    component: Skills
  },
  {
    path: '/workHistory',
    name: 'workHistory',
    component: WorkHistory
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
