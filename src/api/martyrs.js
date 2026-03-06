import request from "@/utils/request";

export const heroPage = (params) => {
    const { page, pageSize, name } = params;
    return request.get(`martyr/${page}/${pageSize}?name=${name}`)
}

export const allHeroPage = (page, pageSize, name) => {
    return request.get(`martyr/all/${page}/${pageSize}?name=${name}`)
}

// 高级搜索查询
export const martyrAdvancedSearch = (params) => {
    const { page, pageSize, ...martyr } = params
    return request.get(`martyr/smartSearch/${page}/${pageSize}`, { params: martyr })
}
// 烈士详情查询
export const martyrsDetail = (id) => {
    return request.get(`martyr/${id}`);
}

// 添加烈士纪念留言
export const martyrLeaveMessage = (leaveMessage) => {
    return request.post(`record`, leaveMessage);
}

// 获取所有烈士纪念留言
export const allMessageList = () => {
    return request.get('record/all')
}

export const getRecordPage = (page, pageSize, searchKeyWord) => {
    return request.get(`record/${page}/${pageSize}?searchKeyWord=${searchKeyWord}`)
}

export const deleteRecord = (id) => {
    return request.delete(`record/delete/${id}`)
}

export const martyrAdd = (addData) => {
    return request.post('martyr/add', addData)
}

export const uploadMartyrPhoto = (file) => {
    return request.post('/martyr/upload', file)
}

export const deleteMartyr = (id) => {
    return request.delete(`/martyr/delete/${id}`)
}

export const updateMartyr = (editData) => {
    return request.post('/martyr/update', editData)
}