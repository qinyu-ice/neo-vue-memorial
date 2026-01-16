import requset from "@/utils/request";


//分类列表查询
// export const articleCategoryList = () =>{
//     const tokenStore = useTokenStore()
//     //在pinia中定义的响应式对象不需要.value可以直接访问
//     return requset.get('/article/category',{headers:{'Authorization':tokenStore.token}})
// }
export const heroPage = (params) => {
    console.log(params)
    const { page, pageSize, name } = params;
    return requset.get(`martyr/${page}/${pageSize}?name=${name}`)
    // return requset.get('/admin/category/page')
}

// 高级搜索查询
export const martyrAdvancedSearch = (params) => {
    console.log(params)
    const { page, pageSize, ...martyr } = params
    console.log("martyr", martyr)
    return requset.get(`martyr/smartSearch/${page}/${pageSize}`, { params: martyr })
}
// 烈士详情查询
export const martyrsDetail = (id) => {
    return requset.get(`martyr/${id}`);
}

// 添加烈士纪念留言
export const martyrLeaveMessage = (leaveMessage) => {
    console.log(leaveMessage)
    return requset.post(`record`, leaveMessage);
}

// 获取所有烈士纪念留言
export const martyrAllLeaveMessage = () => {
    return requset.get(`record/1/10`)
}