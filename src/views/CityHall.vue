<script setup>
import { ref } from 'vue'
import { cityHallPage } from '@/api/cityHall'
import { useTokenStore } from '@/stores/token'

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(64)//总条数
const pageSize = ref(15)//每页条数

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
    cityHalls.value = res.data.data
    total.value = res.data.total
}
getCityHallPage(1, 15)
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
    <div style="width: 100%;">
        <div style="margin: 20px;">
            <span style="color: red; font-weight: bolder; font-size: x-large;">当前位置：烈士纪念设施</span>
        </div>
        <div style="display: flex; width: 100%; justify-content: space-around;flex-wrap: wrap;">
            <div v-for="cityHall in cityHalls" :key="cityHall.id"
                style="margin-top: 20px; display: block; width: 260px; height: auto; background-color: rgb(249, 249, 249);">
                <span style="width: 100%; display: flex; justify-content: center;">
                    <img :src="cityHall.img" alt="图片走丢了" style="width:200px;height: 160px;">
                </span>
                <span class="place-name">{{ cityHall.name }}</span>
                <span style="width: 100%; display: flex; justify-content: center;">
                    <router-link :to="{ path: '/memorial/hallDetail', query: { id: cityHall.id } }"
                        class="link-text">进入纪念设施 >></router-link>
                </span>
            </div>
        </div>
        <el-pagination class="cityhall-pagination" v-model:current-page="pageNum" v-model:page-size="pageSize"
            layout="jumper, total, prev, pager, next" background :total="total" @current-change="onCurrentChange"
            style="margin-top: 50px; margin-bottom: 20px; justify-content:center" />
    </div>
</template>

<style scoped>
:deep(.cityhall-pagination) {
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

.place-name {
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: medium
}

.link-text {
    text-decoration: none;
    font-size: medium;
    color: red;

    &:hover {
        cursor: pointer;
        transition: all 0.2s ease;
    }
}
</style>
