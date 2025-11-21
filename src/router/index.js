import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {path: '/', component: Home},

  {path: '/login', component: () => import('../views/Login.vue')},

  {path: '/dashboard', component: () => import('../views/Dashboard.vue')},

  {path: '/driver', component: () => import('../views/DriverManage.vue')},
  {path: '/driver/:id', component: () => import('../views/DriverDetail.vue')},

  {path: '/user', component: () => import('../views/UserManage.vue')},
  {path: '/user/:id', component: () => import('../views/UserDetail.vue')},

  {path: '/booking/', component: () => import('../views/BookingManage.vue')},
  {path: '/booking/:id', component: () => import('../views/BookingDetail.vue')},

  {path: '/app', component: () => import('../views/AppManage.vue')},
  {path: '/app/:id', component: () => import('../views/SettingDetail.vue')},


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
