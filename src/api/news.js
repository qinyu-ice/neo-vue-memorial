import request from '@/utils/request'

export const getNewsById = (id) => {
    return request.get(`news/${id}`)
}

export const allNewsList = (page, pageSize, title) => {
    return request.get(`news/${page}/${pageSize}?title=${title}`)
}

export const addNewsData = (addData) => {
    return request.post('news/add', addData)
}

export const updateNews = (editData) => {
    return request.post('news/update', editData)
}

export const deleteNews = (id) => {
    return request.delete(`news/delete/${id}`)
}

export const uploadImg = (file) => {
    return request.post('news/upload', file)
}