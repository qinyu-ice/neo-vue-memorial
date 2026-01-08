import requset from "@/utils/request";
import { useTokenStore } from "@/stores/token";


//分类列表查询
// export const articleCategoryList = () =>{
//     const tokenStore = useTokenStore()
//     //在pinia中定义的响应式对象不需要.value可以直接访问
//     return requset.get('/article/category',{headers:{'Authorization':tokenStore.token}})
// }
export const cityHallList = () => {
    return requset.get('/place')
    // return requset.get('/admin/category/page')
}
export const cityHallPage = (page, pageSize) => {
    return requset.get(`place/${page}/${pageSize}`)
}

export const getCityHallInfoById = (pid) => {
    return requset.get(`place/${pid}`)
}

export const getMapByip = (ip) => {
    return requset.get(`place/ip?ip=${ip}`)
}