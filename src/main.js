import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './style.css'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'// 引入element-plus中文包
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'

// 初始化高德地图
window._AMapSecurityConfig = {
  securityJsCode: "f27caa65d8aa7dd7ec207568e99fb7e9",
}

const app = createApp(App)// 创建vue实例
const pinia = createPinia()
const persistedstate = createPersistedState()
pinia.use(persistedstate)
app.use(router)
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn,
})// 挂载element-plus
app.mount('#app')// 挂载到id为app的div上