<script setup>
import { ref } from 'vue'
import router from '@/router'
import { useTokenStore } from '@/stores/token'
//分页条数据模型
const pageNum = ref(1)//当前页
const pageNum1 = ref(1)//当前页
const total = ref(35)//总条数
const pageSize = ref(4)//每页条数
const pageSize1 = ref(6)//每页条数

const tokenStore = useTokenStore()

// 模拟数据
const searchRelativesInfoData = Array(6).fill({
    title: '为xxx寻找亲人',
    time: '2025-04-05',
})

const searchRelativesStoreData = ref([{
    id: '',
    title: '',
    time: '',
}])

const pushSearch = () => {
    router.push('/memorial/martyrsSearchRelatives')
}

const tokenValue = () => {
    tokenStore.tokenIsExist()
}

import { realtivesStoryList } from '@/api/relativesSearch'

const getRealtivesStoryList = async () => {
    await realtivesStoryList(
        pageNum1.value,
        pageSize1.value,
    ).then(res => {
        searchRelativesStoreData.value = res.data.data
        total.value = res.data.total
    })
}

tokenValue()
getRealtivesStoryList()

</script>

<template>
    <div style="width: 100%;">
        <div style="margin: 20px;">
            <div @click="pushSearch">
                <span style="color: red; font-weight: bolder; font-size: x-large;">
                    当前位置：烈士寻亲
                </span>
            </div>
        </div>
        <el-card>
            <img src="https://www.scmartyrs.cn/static/img/banner.fbc77c50.png" class="img">
        </el-card>
        <el-row>
            <el-card class="card-item">
                <div class="thick-underline">
                    <img src="/src/assets/book.png" style="width: 15px; margin-right: 10px;" />
                    <el-text class="red-large-text">
                        寻亲信息
                    </el-text>
                </div>
                <div style="height: 300px;">
                    <ul class="list">
                        <li v-for="item in searchRelativesInfoData" :key="item.id">
                            <router-link class="title-link"
                                :to="{ path: '/memorial/relativesInfoDetail', query: { id: item.id } }"
                                style="text-decoration: none;font-size: large;color: #303133;margin-top: 5px;">{{
                                    item.title
                                }}</router-link>
                            <span>{{ item.time.substring(0, 10) }}</span>
                        </li>
                    </ul>
                </div>
                <el-pagination class="pagination" v-model:current-page="pageNum" :page-size="6"
                    layout="jumper,total,prev,pager,next" background :total=searchRelativesInfoData.length
                    style="margin-top: 20px; justify-content:center" @update:current-page=""></el-pagination>
            </el-card>
            <el-card class="card-item" style="margin-left:29px;">
                <div class="thick-underline">
                    <img src="/src/assets/story.png" style="width: 15px; margin-right: 10px;" />
                    <el-text class="red-large-text">
                        寻亲故事
                    </el-text>
                </div>
                <div style="height: 300px;">
                    <ul class="list">
                        <li v-for="item in searchRelativesStoreData" :key="item.id">
                            <router-link class="title-link"
                                :to="{ path: '/memorial/relativesStoryDetail', query: { id: item.id } }"
                                style="text-decoration: none;font-size: large;color: #303133;margin-top: 5px;">{{
                                    item.title
                                }}</router-link>
                            <span>{{ item.time.substring(0, 10) }}</span>
                        </li>
                    </ul>
                </div>
                <el-pagination class="pagination" v-model:current-page="pageNum1" :page-size="pageSize1" :total="total"
                    layout="jumper,total,prev,pager,next" background style="margin-top: 20px; justify-content:center;"
                    @update:current-page="getRealtivesStoryList">
                </el-pagination>
            </el-card>
        </el-row>
        <el-row style="margin-bottom: 20px;">
            <el-card class="card-item2">
                <el-text class="card-item2-text red-large-text">
                    烈士寻亲政府公共服务平台
                </el-text>
                <div class="card-item2-underline"></div>
                <div class="container">
                    <div><img src="https://www.scmartyrs.cn/static/img/xiaochengxu.99c842f5.png"></div>
                    <div>
                        <img src="/src/assets/erweima.png">
                        <el-text
                            style="font-size: 16px; margin-left: 10px; color: #303133;">扫码登录烈士寻亲政府公共服务平台，提供烈士寻亲线索，帮助烈士早日找到亲人。</el-text>
                    </div>
                </div>
            </el-card>
            <el-card class="card-item2" style="margin-left:29px;">
                <el-text class="card-item2-text red-large-text" style="margin-bottom: 20px;">寻亲登记</el-text>
                <el-text style="font-size: 15px; color: #303133;">
                    2019年9月24日，省退役军人事务厅与今日头条正式签署合作备忘录，
                    联合开展“寻找烈士亲人·传承英烈精神”公益活动。如有烈士后人相关线索，
                    欢迎联系今日头条“头条寻人”栏目（邮箱：xunren@toutiao.com）。</el-text>
            </el-card>
        </el-row>
    </div>
</template>

<style scoped>
.img {
    width: 100%;
    height: 100%;
}

.card-item {
    height: 450px;
    width: 740px;
    margin-top: 20px;
}

.card-item2 {
    height: 300px;
    width: 740px;
    margin-top: 20px;
}

.red-large-text {
    color: #c72624;
    /* 推荐使用Element UI的红色主题色 */
    font-size: 1.5rem;
    /* 相对单位更灵活 */
    font-weight: 700;
    /* 增加可读性 */
}

.thick-underline {
    position: relative;
    padding-bottom: 2px;
    /* 调整下划线与文字距离 */
}

.thick-underline::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 140px;
    height: 5px;
    /* 下划线粗细 */
    background-color: #c72624;
    /* 颜色，可替换 */
}

.data {
    font-size: 18px
}

.card-item2-text {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
}

.card-item2-underline {
    position: relative;
    padding-bottom: 2px;
    /* 调整下划线与文字距离 */
}

.card-item2-underline::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.1px;
    /* 下划线粗细 */
    background-color: #cccccc;
    /* 颜色，可替换 */
}

.container {
    display: flex;
    align-items: center;
}

.img-wrapper {
    margin-right: 15px;
}

.text-wrapper {
    line-height: 1.5;
}

.list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-top: 10px;
}

.list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px dashed #ccc;
    /* 添加底部虚线边框 */
}

.title-link:hover {
    color: red !important;
}

:deep(.pagination) {
    color: red;
    --el-pagination-hover-color: red;
    --el-pagination-text-color: red;
    --el-pagination-button-bg-color: rgb(255, 230, 230);
    --el-pagination-button-color: red;
    --el-pagination-button-disabled-color: red;
    --el-pagination-button-disabled-bg-color: red;

    .el-input {
        --el-input-text-color: red;

        .el-input__wrapper {
            background-color: transparent;
            box-shadow: 0 0 0 1px red;
        }
    }
}

:deep(.el-pagination.is-background .el-pager li.is-active) {
    background-color: red;
}

:deep(.el-pagination__jump) {
    color: red;
}

:deep(.el-pagination__total) {
    color: red;
}

:deep(.el-pagination.is-background .btn-prev:disabled) {
    color: red;
    background-color: rgb(255, 245, 245);
}

:deep(.el-pagination.is-background .btn-next:disabled) {
    color: red;
    background-color: rgb(255, 245, 245);
}
</style>