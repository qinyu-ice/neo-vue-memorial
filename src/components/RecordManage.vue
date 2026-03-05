<script setup>
import { ref } from 'vue';
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import { getRecordPage } from '@/api/martyrs'
import { ElMessage } from 'element-plus';

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref()//总条数
const pageSize = ref(5)//每页条数

const tableData = ref([
    {
        id: '',
        username: '',
        martyrName: '',
        ignite: 0,
        flower: 0,
        message: '',
        time: ''
    }
])

const searchKeyWord = ref('')
const tableLoading = ref(true)
const showSearchBox = ref(false)
const currentSearchKeyword = ref('')

const formatTime = (row, column) => {
    const timeStr = row[column.prop] || row.time;
    return String(timeStr).substring(0, 10)
}

const getAllRecordList = async (page, pageSize, searchKeyWord = '') => {
    const searchRecord = searchKeyWord || currentSearchKeyword.value
    //获取分类列表
    const res = await getRecordPage(page, pageSize, searchRecord)
    if (res.code === 200 && res.data.data != null) {
        tableLoading.value = false
    }
    tableData.value = res.data.data
    if (tableData.value == null) {
        ElMessage.error('暂无寻亲故事数据')
    }
    total.value = res.data.total
}
getAllRecordList(1, 5)
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    getAllRecordList(pageNum.value, pageSize.value)
}

const searchRecord = async () => {
    showSearchBox.value = true
    // 将搜索关键词持久化
    currentSearchKeyword.value = searchKeyWord.value
    await getAllRecordList(1, 5, currentSearchKeyword.value)

    if (currentSearchKeyword.value) {
        showSearchBox.value = false
        ElMessage.success(`搜索到${total.value}条符合条件`)
    }
    // 只清空输入框，保留持久化的关键词
    searchKeyWord.value = ''
    pageNum.value = 1
}

// const add = () => {
//     ElMessage.success('点击了新增按钮')
// }

const edit = (row) => {
    ElMessage.success(`点击了序号${row.id}的编辑按钮`)
}

const remove = (row) => {
    ElMessage.error(`点击了序号${row.id}删除按钮`)
}
</script>
<template>
    <div class="record-manage">
        <div v-loading="tableLoading" class="table">
            <div class="table-top">
                <!-- <el-button type="primary" @click="add">新增</el-button> -->
                <div>
                    <el-input v-if="showSearchBox" v-model="searchKeyWord" style="width: 150px; margin-right: 10px"
                        placeholder="请输入用户名" />
                    <el-icon @click="searchRecord">
                        <Search />
                    </el-icon>
                </div>
            </div>
            <el-table :data="tableData" border>
                <el-table-column prop="id" label="序号" width="80" />
                <el-table-column prop="username" label="用户名" width="120" />
                <el-table-column prop="martyrName" label="烈士姓名" width="120" />
                <el-table-column prop="ignite" label="点燃蜡烛数量" width="120" show-overflow-tooltip />
                <el-table-column prop="flower" label="献花数量" width="120" :formatter="formatTime" />
                <el-table-column prop="message" label="留言内容" width="120" show-overflow-tooltip />
                <el-table-column prop="time" label="纪念时间" width="120" :formatter="formatTime" />
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
    justify-content: flex-end;
    margin-bottom: 10px;
}

.operation-link {
    margin-right: 15px;
}
</style>