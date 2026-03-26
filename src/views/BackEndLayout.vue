<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import useUserInfoStore from '@/stores/userInfo'
import NewsManage from '@/components/NewsManage.vue'
import PlaceManage from '@/components/PlaceManage.vue'
import MartyrManage from '@/components/MartyrManage.vue'
import InfoManage from '@/components/InfoManage.vue'
import StoryManage from '@/components/StoryManage.vue'
import RecordManage from '@/components/RecordManage.vue'
import UserManage from '@/components/UserManage.vue'

const activeName = ref('news')

const handleClick = (tab, event) => {

}

const router = useRouter()
const tokenStore = useTokenStore()
const userInfoStore = useUserInfoStore()

const exit = () => {
    router.push('/login')
    tokenStore.removeToken()
    userInfoStore.removeUserInfo()
}
</script>
<template>
    <div class="back-end">
        <h1 class="title">后端管理页面</h1>
        <div class="middle">
            <div class="middle-top">
                <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="热点资讯管理" name="news"></el-tab-pane>
                    <el-tab-pane label="烈士纪念设施管理" name="place"></el-tab-pane>
                    <el-tab-pane label="烈士信息管理" name="martyr"></el-tab-pane>
                    <el-tab-pane label="寻亲信息管理" name="info"></el-tab-pane>
                    <el-tab-pane label="寻亲故事管理" name="story"></el-tab-pane>
                    <el-tab-pane label="留言管理" name="record"></el-tab-pane>
                    <el-tab-pane label="账号管理" name="user"></el-tab-pane>
                    <el-tab-pane label="退出" name="exit"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="manage" v-if="activeName === 'news'">
                <news-manage></news-manage>
            </div>
            <div class="manage" v-if="activeName === 'place'">
                <place-manage></place-manage>
            </div>
            <div class="manage" v-if="activeName === 'martyr'">
                <martyr-manage></martyr-manage>
            </div>
            <div class="manage" v-if="activeName === 'info'">
                <info-manage></info-manage>
            </div>
            <div class="manage" v-if="activeName === 'story'">
                <story-manage></story-manage>
            </div>
            <div class="manage" v-if="activeName === 'record'">
                <record-manage></record-manage>
            </div>
            <div class="manage" v-if="activeName === 'user'">
                <user-manage></user-manage>
            </div>
            <div class="exit-manage" v-if="activeName === 'exit'">
                <span class="span-text">如需查看网页，请点击下方退出按钮，返回登录页面，登录用户账号</span>
                <el-button class="el-button" type="danger" @click="exit">退出</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.back-end {
    background: url('@/assets/back_end_bg.jpg') no-repeat center center fixed;
    background-size: cover;
    min-height: 100vh;
}

.title {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    color: red;
}

.middle {
    margin-top: 20px;
}

.middle-top {
    display: flex;
    justify-content: center;
}

:deep(.demo-tabs.el-tabs--card>.el-tabs__header .el-tabs__nav) {
    border: none;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__item) {
    border-left: none;
}

:deep(.el-tabs__item) {
    color: white;
    background-color: rgb(255, 90, 90);
    font-size: large;
    font-weight: bold;
}

:deep(.el-tabs__item:hover) {
    color: red;
    background-color: rgb(255, 200, 200);
}

:deep(.el-tabs__item.is-active) {
    color: red;
    background-color: transparent;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active) {
    border-bottom: 2px solid red;
}

.manage {
    display: flex;
    justify-content: center;
}

.exit-manage {
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
}

.span-text {
    color: red;
    font-size: x-large;
    font-weight: bold;
    margin-top: 100px;
}

.el-button {
    margin-top: 50px;
    width: 100px;
    height: 50px;
    font-size: xx-large;
    font-weight: bold;
}
</style>