import request from "@/utils/request";

// 寻亲故事查询
export const realtivesStoryList = (page, pageSize) => {
    return request.get(`story/${page}/${pageSize}`)
}

// 寻亲故事详情
export const getRealtivesStoryById = (id) => {
    return request.get(`story/${id}`)
}