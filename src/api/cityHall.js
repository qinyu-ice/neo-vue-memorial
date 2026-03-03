import request from "@/utils/request";

export const cityHallList = () => {
    return request.get('/place')
    // return requset.get('/admin/category/page')
}

export const cityHallPage = (page, pageSize, name) => {
    return request.get(`place/${page}/${pageSize}?name=${name}`)
}

export const getCityHallInfoById = (id) => {
    return request.get(`place/${id}`)
}

export const getMapByip = (ip) => {
    return request.get(`place/ip?ip=${ip}`)
}

export const uploadCityHallImage = (file) => {
    return request.post('place/upload', file)
}

export const addCityHall = (addData) => {
    return request.post('place/add', addData)
}

export const updateCityHall = (editData) => {
    return request.post('/place/update', editData)
}

export const deleteCityHall = (id) => {
    return request.delete(`/place/delete/${id}`)
}