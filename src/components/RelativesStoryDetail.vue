<script setup>
import { useRouter, useRoute } from 'vue-router'
import { getRealtivesStoryById } from '@/api/relativesSearch';
import { onBeforeMount, onMounted } from 'vue';
import { ref } from 'vue'
const RelativesStoryDetail = ref({
    id: '',
    title: '',
    source: '',
    content: '',
    time: ''
})

const router = useRouter()
const route = useRoute()

const getRealtivesStoryDetail = async () => {
    const res = await getRealtivesStoryById(route.query.id)
    RelativesStoryDetail.value = res.data
}
getRealtivesStoryDetail()

</script>
<template>
    <div style="width: 100%;">
        <div style="margin: 20px;">
            <span>
                当前位置：寻亲故事 >{{ RelativesStoryDetail.title }}
            </span>
        </div>
        <div style="font-size: 24px; text-align: center;font-weight: bold;">{{
            RelativesStoryDetail.title }}</div>
        <div style="text-align: center;margin-top: 10px;">
            信息来源：{{ RelativesStoryDetail.source }} 时间：{{ RelativesStoryDetail.time }}
        </div>
        <div style="display: flex;justify-content: center;">
            <div
                style="border-style: none; border-bottom: 1px solid #666;height: 1px;width: 90%;background-color: #dcdfe6;margin-top: 20px;margin-bottom: 20px;">
            </div>
        </div>
        <div style="text-align: center;">{{ RelativesStoryDetail.content }}</div>
    </div>
</template>
<script scoped>

</script>