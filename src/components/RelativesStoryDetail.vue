<script setup>
import { useRoute } from 'vue-router'
import { getRealtivesStoryById } from '@/api/relativesSearch';
import { ref } from 'vue'
const relativesStoryDetail = ref({
    id: '',
    title: '',
    source: '',
    content: '',
    time: ''
})

const route = useRoute()

const getRealtivesStoryDetail = async () => {
    const res = await getRealtivesStoryById(route.query.id)
    relativesStoryDetail.value = res.data
    relativesStoryDetail.value.time = relativesStoryDetail.value?.time?.replace('T', ' ')
}
getRealtivesStoryDetail()

</script>
<template>
    <div style="width: 100%;">
        <div style="margin: 20px;">
            <span>
                当前位置：寻亲故事 >{{ relativesStoryDetail.title }}
            </span>
        </div>
        <el-card style="margin: 20px;">
            <div style="font-size: 24px; text-align: center;font-weight: bold;">{{
                relativesStoryDetail.title }}</div>
            <div style="text-align: center;margin-top: 10px;">
                <div>时间：{{ relativesStoryDetail.time }}</div>
                <div>信息来源：{{ relativesStoryDetail.source }}</div>
            </div>
            <div style="display: flex;justify-content: center;">
                <div
                    style="border-style: none; border-bottom: 1px solid #666;height: 1px;width: 100%;background-color: #dcdfe6;margin-top: 20px;margin-bottom: 20px;">
                </div>
            </div>
            <div class="content">{{ relativesStoryDetail.content }}</div>
        </el-card>
    </div>
</template>
<style lang="scss" scoped>
.content {
    line-height: 3;
    font-size: 18px;
    text-align: justify;
    font-family: '微软雅黑';
}
</style>