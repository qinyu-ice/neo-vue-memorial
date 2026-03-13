import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: Login // 登录页面组件
    },
    {
      path: '/',
      redirect: '/login', // 根路径重定向到登录页（核心修改）
      component: Layout, // 主布局组件
      children: [ // 嵌套子路由（保持原有配置）
        {
          path: '/memorial/home',
          component: Home
        },
        {
          path: '/memorial/cityHall',
          component: () => import('../views/CityHall.vue')
        },
        {
          path: '/memorial/hotNews',
          component: () => import('../components/HotNews.vue')
        },
        {
          path: '/memorial/hotNewsDetail',
          component: () => import('../components/HotNewsDetail.vue')
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
          path: '/memorial/relativesInfoDetail',
          component: () => import('../components/RelativesInfoDetail.vue')
        },
        {
          path: '/memorial/relativesStoryDetail',
          component: () => import('../components/RelativesStoryDetail.vue')
        },
        {
          path: '/memorial/hallMap',
          component: () => import('../views/HallMap.vue')
        },
        {
          path: '/memorial/updataUser',
          component: () => import('../views/Updata.vue')
        },
        {
          path: '/memorial/completeInfo',
          component: () => import('../components/CompleteInfo.vue')
        }
      ]
    },
    {
      path: '/back-end',
      component: () => import('../views/BackEndLayout.vue')
    }
  ]
})

export default router