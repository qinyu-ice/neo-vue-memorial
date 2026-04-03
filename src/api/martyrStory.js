import request from "@/utils/request";

export const allMartyrStoryService = (page, pageSize, title) => {
    return request.get(`martyrStory/${page}/${pageSize}?title=${title}`)
}

export const getMartyrStoryById = (id) => {
    return request.get(`martyrStory/${id}`)
}

export const addMartyrStory = (addData) => {
    return request.post('martyrStory/add', addData)
}

export const updateMartyrStory = (updateData) => {
    return request.post('martyrStory/update', updateData)
}

export const deleteMartyrStory = (id) => {
    return request.delete(`martyrStory/delete/${id}`)
}