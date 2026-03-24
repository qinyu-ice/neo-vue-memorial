<script setup>
import { useRoute, useRouter } from 'vue-router'
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
const router = useRouter()

const getRealtivesStoryDetail = async () => {
    const res = await getRealtivesStoryById(route.query.id)
    relativesStoryDetail.value = res.data
}

const goToStory = () => {
    router.push('/memorial/martyrsSearchRelatives')
}

getRealtivesStoryDetail()

</script>
<template>
    <div style="width: 100%;">
        <div style="margin: 20px;">
            <span>
                当前位置：
                <span class="text-story" @click="goToStory">寻亲故事</span>
                > {{ relativesStoryDetail.title }}
            </span>
        </div>
        <el-card style="margin: 20px;">
            <div style="font-size: 24px; text-align: center;font-weight: bold;">{{
                relativesStoryDetail.title }}</div>
            <div style="text-align: center; margin-top: 10px; display: flex; justify-content: center;">
                <div style="margin-right: 40px;">信息来源：{{ relativesStoryDetail.source }}</div>
                <div>时间：{{ relativesStoryDetail.time.substring(0, 10) }}</div>
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
.text-story {
    &:hover {
        color: red;
        cursor: pointer;
        transition: all 0.2s ease;
    }
}

.content {
    line-height: 3;
    font-size: 18px;
    text-align: justify;
    font-family: '微软雅黑';
}
</style>