import request from '@/utils/request'

export const getInfoById = (id) => {
    return request.get(`info/${id}`)
}

export const allInfoList = (page, pageSize, title) => {
    return request.get(`info/${page}/${pageSize}?title=${title}`)
}

export const addInfoData = (addData) => {
    return request.post('info/add', addData)
}

export const updateInfo = (editData) => {
    return request.post('info/update', editData)
}

export const deleteInfo = (id) => {
    return request.delete(`info/delete/${id}`)
}