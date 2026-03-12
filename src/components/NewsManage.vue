<script setup>
import { ElMessage } from 'element-plus';
import { Edit, Delete, Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref()//总条数
const pageSize = ref(5)//每页条数

const tableData = ref([
    {
        id: '',
        title: '',
        source: '',
        content: '',
        time: ''
    }
])
const formatTime = (row, column) => {
    const timeStr = row[column.prop] || row.time;
    return String(timeStr).substring(0, 10)
}
const title = ref('')
const tableLoading = ref(true)
const showSearchBox = ref(false)

const add = () => {
    ElMessage.success('点击了新增按钮')
}

const edit = () => {
    ElMessage.success('点击了编辑按钮')
}

const remove = () => {
    ElMessage.success('点击了删除按钮')
}

const searchInfo = () => {
    showSearchBox.value = true
}
</script>
<template>
    <div class="info-manage">
        <div v-loading="false" class="table">
            <div class="table-top">
                <el-button type="danger" @click="add">新增</el-button>
                <div>
                    <el-input class="info-input" v-if="showSearchBox" v-model="title"
                        style="width: 150px; margin-right: 10px" placeholder="请输入热点资讯标题" />
                    <el-icon @click="searchInfo">
                        <Search style="color: red;" />
                    </el-icon>
                </div>
            </div>
            <el-table class="info-table" :data="tableData" border>
                <el-table-column prop="id" label="序号" width="80" />
                <el-table-column prop="title" label="标题" width="300" />
                <el-table-column prop="source" label="来源" width="250" />
                <el-table-column prop="content" label="内容" width="400" show-overflow-tooltip />
                <el-table-column prop="time" label="发布时间" width="120" :formatter="formatTime" />
                <el-table-column class="operation" label="操作" width="130">
                    <template #default="scope">
                        <el-link type="danger" :icon="Edit" @click="edit(scope.row)" class="operation-link">修改</el-link>
                        <el-link type="danger" :icon="Delete" @click="remove(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="info-pagination" v-model:current-page="pageNum" v-model:page-size="pageSize"
                layout="jumper, total, prev, pager, next" background :total="total" @current-change="onCurrentChange"
                style="margin-top: 50px; justify-content:center; margin-bottom: 50px;" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.table {
    margin-top: 50px;
}

.table-top {
    display: flex;
    justify-content: space-between;
    height: 50px;
}

:deep(.info-input) {
    --el-input-bg-color: rgb(255, 240, 240);
    --el-input-text-color: red;
    --el-input-border-color: rgb(255, 200, 200);
    --el-input-hover-border-color: rgb(255, 150, 150);
    --el-input-focus-border-color: red;
}

:deep(.info-input) ::-webkit-input-placeholder {
    color: rgb(255, 140, 140) !important;
}

:deep(.info-input) :-moz-placeholder {
    color: rgb(255, 140, 140) !important;
    opacity: 1 !important;
}

:deep(.info-input) ::-moz-placeholder {
    color: rgb(255, 140, 140) !important;
    opacity: 1 !important;
}

:deep(.info-input) :-ms-input-placeholder {
    color: rgb(255, 140, 140) !important;
}

:deep(.info-table) {
    --el-table-header-text-color: red;
    color: red;

    &:hover {
        --el-table-row-hover-bg-color: rgb(255, 240, 240);
    }
}

:deep(.info-pagination) {
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

.operation-link {
    margin-right: 15px;
}
</style>