<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getNewsById } from '@/api/news';

const route = useRoute()
const router = useRouter()
const hotNewsDetailData = ref({
    time: ''
})

const getNewsDetail = async () => {
    const res = await getNewsById(route.query.id)
    hotNewsDetailData.value = res.data
}

const goToNews = () => {
    router.push('/memorial/hotNews')
}

getNewsDetail()
</script>
<template>
    <div style="margin: 20px;">
        <span>
            当前位置：
            <span class="text-news" @click="goToNews">热点资讯</span>
            > {{ hotNewsDetailData.title }}
        </span>
        <el-card style="margin: 20px;">
            <span class="title">{{ hotNewsDetailData.title }}</span>
            <div class="info">
                <p style="margin-right: 40px;">信息来源：{{ hotNewsDetailData.source }}</p>
                <p>时间：{{ hotNewsDetailData.time.substring(0, 10) }}</p>
            </div>
            <div class="content">
                <div style="display: flex;justify-content: center;">
                    <div
                        style="border-style: none; border-bottom: 1px solid #666;height: 1px;width: 100%;background-color: #dcdfe6;margin-top: 20px;margin-bottom: 20px;">
                    </div>
                </div>
                <div>{{ hotNewsDetailData.content }}</div>
            </div>
        </el-card>
    </div>
</template>
<style lang="scss" scoped>
.text-news {
    &:hover {
        color: red;
        cursor: pointer;
        transition: all 0.2s ease;
    }
}

.title {
    font-size: 1.5em;
    font-weight: bold;
    display: flex;
    justify-content: center;
}

.info {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.content {
    text-align: justify;
    line-height: 3;
    font-family: '宋体';
    font-size: 20px;
}
</style>