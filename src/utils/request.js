//定制请求的实例
//导入axios npm install axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/token'
//由于浏览器的同源策略，在浏览器端无法直接访问不同源的本地服务器，需要通过代理解决
// const baseUrl = 'http://127.0.0.1:8080/admin'
const baseUrl = '/api/req' //没有指定源 会在axios所在源（页面源）进行拼接
const instance = axios.create({
    baseURL: baseUrl,
    timeout: 20000
})
import router from '@/router'
const success = ['SUCCESS', 'REGISTER_SUCCESS', 'LOGIN_SUCCESS', 'GET_ALL_CITIES_SUCCESS',
    'GET_ALL_MARTYRS_ITEM_SUCCESS', 'GET_MARTYRS_ITEM_SUCCESS', 'GET_ALL_MARTYRS_ITEM_BY_CID_SUCCESS']
//添加请求拦截器
instance.interceptors.request.use(config => {
    //在发送请求之前做些什么
    //在请求头中添加token
    // config.headers.Authorization = window.sessionStorage.getItem('Authorization')
    if (config.url?.includes('email')) {
        return config
    }
    const tokenStore = useTokenStore()
    config.headers.Authorization = 'Bearer ' + tokenStore.token
    return config
}, error => {
    //对请求错误做些什么
    return Promise.reject(error)//异步的状态转换为失败的状态
})

//添加响应拦截器
instance.interceptors.response.use(response => {
    //判断业务状态码
    if (200 === response.data.code) {
        // ElMessage.success(response.data.msg)
        // window.sessionStorage.setItem('Authorization',response.data.data)
        //对响应数据做些什么
        return response.data
    }
    alert(response.data.msg ? response.data.msg : '未知错误')
    return Promise.reject(response.data)
}, error => {
    //对响应错误做些什么
    if (error.response.status === 401) {
        // alert('请先登录')
        ElMessage.error(error.response.data.message)
        router.push('/login')
        return error.response.data
    } else {
        ElMessage.error('服务异常')
    }
    return Promise.reject(error)//异步的状态转换为失败的状态
})

export default instance;