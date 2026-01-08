import requset from "@/utils/request";

// 寻亲故事查询
export const realtivesStoryList = (page, pageSize) => {
    return requset.get(`story/${page}/${pageSize}`)
}

// 寻亲故事详情
export const getRealtivesStoryById = (id) => {
    return requset.get(`story/${id}`)
}