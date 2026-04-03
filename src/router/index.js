import {createRouter, createWebHistory} from 'vue-router'
import {useTokenStore} from '@/stores/token'
import useUserInfoStore from '@/stores/userInfo'
import {ElMessage} from 'element-plus'
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
            component: Layout,
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

router.beforeEach((to, from, next) => {
    const tokenStore = useTokenStore()
    const userInfoStore = useUserInfoStore()

    const hasToken = !!tokenStore.token

    // 1、没有 token → 直接拦截
    if (!hasToken) {
        if (to.path === '/back-end') {
            ElMessage.error('请先登录管理员账号')
            return next('/login')
        }
        if (to.path !== '/login') {
            ElMessage.error('请先登录用户账号')
            return next('/login')
        }
        return next()
    }

    // 2、有 token → 已经登录，处理权限和限制
    if (to.path === '/login' && hasToken) {
        if (userInfoStore.info.permission === 2) {
            ElMessage.error('如需返回登录页面，请先退出用户账号')
            return next('/memorial/home')
        } else {
            ElMessage.error('如需返回登录页面，请先退出管理员账号')
            return next('/back-end')
        }
    }

    // 3、有 token → 管理员已登录，限制访问网页
    if (to.path.startsWith('/memorial') && hasToken) {
        if (userInfoStore.info.permission === 1) {
            ElMessage.error('如需访问网站，请登录用户账号')
            return next('/back-end')
        }
    }

    // 4、普通用户 → 访问后台 → 拦截
    if (to.path.startsWith('/back-end') && hasToken) {
        if (userInfoStore.info.permission === 2) {
            ElMessage.error('当前用户账号无权限，请登录管理员账号')
            return next('/memorial/home')
        }
    }

    next()
})

export default router