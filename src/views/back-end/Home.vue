<script setup>
import { ref } from 'vue'
import PlaceManage from '@/components/PlaceManage.vue'
import MartyrManage from '@/components/MartyrManage.vue'
import InfoManage from '@/components/InfoManage.vue'
import StoryManage from '@/components/StoryManage.vue'
import RecordManage from '@/components/RecordManage.vue'
import UserManage from '@/components/UserManage.vue'

const activeName = ref('place')

const handleClick = (tab, event) => {
    console.log(tab, event);
}
</script>
<template>
    <div class="back-end">
        <h1 class="title">后端管理页面</h1>
        <div class="middle">
            <div class="middle-top">
                <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="烈士纪念设施管理" name="place"></el-tab-pane>
                    <el-tab-pane label="烈士信息管理" name="martyr"></el-tab-pane>
                    <el-tab-pane label="寻亲信息管理" name="info"></el-tab-pane>
                    <el-tab-pane label="寻亲故事管理" name="story"></el-tab-pane>
                    <el-tab-pane label="留言管理" name="record"></el-tab-pane>
                    <el-tab-pane label="用户管理" name="user"></el-tab-pane>
                </el-tabs>
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
        </div>
    </div>
</template>

<style scoped lang="scss">
// .back-end {
// background: url('@/assets/declaration.png');
// background-size: cover;
// }

.title {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.middle {
    margin-top: 20px;
}

.middle-top {
    display: flex;
    justify-content: center;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
    width: 100%;
}

.manage {
    display: flex;
    justify-content: center;
}
</style>