import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Layout, redirect: '/memorial/home', children: [
        {
          path: '/memorial/home',
          component: Home
        },
        {
          path: '/memorial/cityHall',
          component: () => import('../views/CityHall.vue')
        },
        {
          path: '/memorial/hallDetail',
          component: () => import('../components/HallDetail.vue')
        },
        {
          path: '/memorial/martyrsMuni',
          component: () => import('../views/MartyrsMuni.vue')
        },
        {
          path: '/memorial/martyrDetail',
          component: () => import('../components/MartyrsListDetail.vue')
        },
        {
          path: '/memorial/martyrsSearchRelatives',
          component: () => import('../views/MartyrsSearchRelatives.vue')
        },
        {
          path: '/memorial/RelativesInfoDetail',
          component: () => import('../components/RelativesInfoDetail.vue')
        },
        {
          path: '/memorial/RelativesStoryDetail',
          component: () => import('../components/RelativesStoryDetail.vue')
        },
        {
          path: '/memorial/MemorialHall',
          component: () => import('../views/MemorialHall.vue')
        },
        {
          path: '/memorial/updataUser',
          component: () => import('../views/Updata.vue')
        }
      ]
    },
  ]
})

export default router
