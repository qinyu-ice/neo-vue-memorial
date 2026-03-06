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
const title = ref('')
const tableLoading = ref(true)
const showSearchBox = ref(false)

const add = () => {
    ElMessage.success('点击了新增按钮')
}

const searchInfo = () => {
    showSearchBox.value = true
}
</script>
<template>
    <div class="info-manage">
        <div v-loading="tableLoading" class="table">
            <div class="table-top">
                <el-button type="primary" @click="add">新增</el-button>
                <div>
                    <el-input v-if="showSearchBox" v-model="title" style="width: 150px; margin-right: 10px"
                        placeholder="请输入寻亲信息标题" />
                    <el-icon @click="searchInfo">
                        <Search />
                    </el-icon>
                </div>
            </div>
            <el-table :data="tableData" border>
                <el-table-column prop="id" label="序号" width="80" />
                <el-table-column prop="title" label="标题" width="300" />
                <el-table-column prop="source" label="来源" width="250" />
                <el-table-column prop="content" label="内容" width="400" show-overflow-tooltip />
                <el-table-column prop="time" label="发布时间" width="120" :formatter="formatTime" />
                <el-table-column class="operation" label="操作" width="130">
                    <template #default="scope">
                        <el-link type="primary" :icon="Edit" @click="edit(scope.row)"
                            class="operation-link">修改</el-link>
                        <el-link type="danger" :icon="Delete" @click="remove(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize"
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
    margin-bottom: 10px;
}

.operation-link {
    margin-right: 15px;
}
</style>