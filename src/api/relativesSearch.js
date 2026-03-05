import request from "@/utils/request";

// 寻亲故事查询
export const realtivesStoryList = (page, pageSize) => {
    return request.get(`story/${page}/${pageSize}`)
}

export const allStoryList = (page, pageSize, title) => {
    return request.get(`story/all/${page}/${pageSize}?title=${title}`)
}

// 寻亲故事详情
export const getRealtivesStoryById = (id) => {
    return request.get(`story/${id}`)
}

export const addStoryData = (addData) => {
    return request.post('story/add', addData)
}

export const updateStory = (editData) => {
    return request.post('story/update', editData)
}

export const deleteStory = (id) => {
    return request.delete(`story/delete/${id}`)
}