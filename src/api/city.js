import requset from "@/utils/request";
import { useTokenStore } from "@/stores/token";


//分类列表查询
// export const articleCategoryList = () =>{
//     const tokenStore = useTokenStore()
//     //在pinia中定义的响应式对象不需要.value可以直接访问
//     return requset.get('/article/category',{headers:{'Authorization':tokenStore.token}})
// }
export const cityList = () =>{
    return requset.get('/cities/all')
    // return requset.get('/admin/category/page')
}
//文章分类添加
export const articleCategoryAdd = (data) =>{
    return requset.post('/article/category',data)
}

//文章分类修改
export const articleCategoryUpdate = (data) =>{
    return requset.put('/article/category',data)
}

//文章分类删除
export const articleCategoryDelete = (id) =>{
    return requset.delete(`/article/category/${id}`)
}

//文章列表查询
export const articleList = (params) =>{
    return requset.get('/article',{params:params})
}

//文章添加
export const articleAdd = (data) =>{
    return requset.post('/article',data)
}