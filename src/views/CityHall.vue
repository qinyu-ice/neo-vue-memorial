<script setup>
import { ref } from 'vue'
//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(64)//总条数
const pageSize = ref(16)//每页条数


import { cityHallPage } from '@/api/cityHall'
import { useTokenStore } from '@/stores/token'

const tokenStore = useTokenStore()
const cityHalls = ref([
    {
        "id": "0",
        "name": "达州市",
        "img": "#",
    },
])
const getCityHallPage = async (page, pageSize) => {
    //获取分类列表
    const res = await cityHallPage(page, pageSize, '')
    console.log(res)
    cityHalls.value = res.data.data
    total.value = res.data.total
}
getCityHallPage(1, 16)
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    getCityHallPage(pageNum.value, pageSize.value)
}

const tokenValue = () => {
    tokenStore.tokenIsExist()
}

tokenValue()
</script>

<template>
    <el-card class="page-container1" style="margin: 20px;">
        <template #header>
            <div class="header">
                <span style="color: red;font-weight: bolder;font-size: x-large;">达州市烈士纪念设施</span>
            </div>
        </template>
        <div style="display: flex;width: 100%;justify-content: space-around;flex-wrap: wrap;">
            <div v-for="cityHall in cityHalls" :key="cityHall.id"
                style="margin-top: 20px;display: block;width: 250px;height: 200px;background-color: rgb(249, 249, 249);">
                <span style="width: 100%;display: flex;justify-content: center;">
                    <img :src="cityHall.img" alt="图片走丢了" style="width:200px;height: 160px;">
                </span>
                <span style="width: 100%;display: flex;justify-content: center;font-size: small;">{{ cityHall.name
                }}</span>
                <span style="width: 100%;display: flex;justify-content: center;">
                    <router-link :to="{ path: '/memorial/hallDetail', query: { id: cityHall.id } }"
                        style="text-decoration: none;font-size: small;color: #a11a1a;">进入纪念设施>></router-link>
                </span>
            </div>
        </div>
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize"
            layout="jumper, total, prev, pager, next" background :total="total" @current-change="onCurrentChange"
            style="margin-top: 50px; justify-content:center" />
    </el-card>
</template>

<style scoped></style>
