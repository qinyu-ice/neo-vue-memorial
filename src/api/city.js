import request from "@/utils/request";


//分类列表查询
// export const articleCategoryList = () =>{
//     const tokenStore = useTokenStore()
//     //在pinia中定义的响应式对象不需要.value可以直接访问
//     return requset.get('/article/category',{headers:{'Authorization':tokenStore.token}})
// }
export const cityList = () => {
    return request.get('/cities/all')
    // return requset.get('/admin/category/page')
}
//文章分类添加
export const articleCategoryAdd = (data) => {
    return request.post('/article/category', data)
}

//文章分类修改
export const articleCategoryUpdate = (data) => {
    return request.put('/article/category', data)
}

//文章分类删除
export const articleCategoryDelete = (id) => {
    return request.delete(`/article/category/${id}`)
}

//文章列表查询
export const articleList = (params) => {
    return request.get('/article', { params: params })
}

//文章添加
export const articleAdd = (data) => {
    return request.post('/article', data)
}