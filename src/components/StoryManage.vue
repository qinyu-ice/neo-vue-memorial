<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import { allStoryList, addStoryData, updateStory, deleteStory } from '@/api/relativesSearch';

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

const addData = ref({
    title: '',
    source: '',
    content: '',
    time: ''
})

const initEditData = () => ({
    title: '',
    source: '',
    content: '',
    time: ''
})
const editData = ref(initEditData())

const title = ref('')
const currentSearchKeyword = ref('')
const deleteId = ref()
const addFormRef = ref()
const editFormRef = ref()
const tableLoading = ref(true)
const showSearchBox = ref(false)
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)

const formatTime = (row, column) => {
    const timeStr = row[column.prop] || row.time;
    return String(timeStr).substring(0, 10)
}

const formRules = reactive({
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' }
    ],
    source: [
        { required: true, message: '请输入来源', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '请输入内容', trigger: 'blur' }
    ]
})

const getAllStoryList = async (page, pageSize, title = '') => {
    const searchTitle = title || currentSearchKeyword.value
    //获取分类列表
    const res = await allStoryList(page, pageSize, searchTitle)
    if (res.code === 200 && res.data.data != null) {
        tableLoading.value = false
    }
    tableData.value = res.data.data
    if (tableData.value == null) {
        ElMessage.error('暂无寻亲故事数据')
    }
    total.value = res.data.total
}
getAllStoryList(1, 5)
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    getAllStoryList(pageNum.value, pageSize.value)
}

const searchStory = async () => {
    showSearchBox.value = true
    // 将搜索关键词持久化
    currentSearchKeyword.value = title.value
    await getAllStoryList(1, 5, currentSearchKeyword.value)

    if (currentSearchKeyword.value) {
        showSearchBox.value = false
        ElMessage.success(`搜索到${total.value}条符合条件`)
    }
    // 只清空输入框，保留持久化的关键词
    title.value = ''
    pageNum.value = 1
}

const add = () => {
    showAddDialog.value = true
}

const addStory = async () => {
    try {
        const result = await addStoryData(addData.value)
        showAddDialog.value = false
        ElMessage.success(result.msg)
        pageNum.value = 1
        pageSize.value = 5
        await getAllStoryList(pageNum.value, pageSize.value)
        addFormRef.value?.resetFields()
    } catch (error) {
        // 校验失败
        ElMessage.error('表单填写有误，请检查')
        console.log('表单校验失败：', error)
    }
}

const edit = (row) => {
    editData.value = { ...row }
    showEditDialog.value = true
}

const editStory = async () => {
    try {
        await editFormRef.value.validate()
        const result = await updateStory(editData.value)
        showEditDialog.value = false
        ElMessage.success(result.msg)
        pageNum.value = 1
        pageSize.value = 5
        await getAllStoryList(pageNum.value, pageSize.value)
        editFormRef.value?.resetFields()
        editData.value = initEditData()
    } catch (error) {
        // 校验失败
        ElMessage.error('表单填写有误，请检查')
        console.log('表单校验失败：', error)
    }
}

const remove = (row) => {
    deleteId.value = row.id
    showDeleteDialog.value = true
}

const removeStory = async () => {
    try {
        const result = await deleteStory(deleteId.value)
        showDeleteDialog.value = false
        ElMessage.success(result.msg)
        pageNum.value = 1
        pageSize.value = 5
        await getAllStoryList(pageNum.value, pageSize.value)
    } catch (error) {
        ElMessage.error('删除失败')
        console.log('error：', error)
    }
}

const cancel = () => {
    showAddDialog.value = false
    showEditDialog.value = false
    showDeleteDialog.value = false
    handleClose()
}

const handleClose = (done) => {
    // ElMessageBox.confirm('确认关闭？')
    // .then(() => {
    // 关闭前重置表单
    addFormRef.value?.resetFields()
    editFormRef.value?.resetFields()
    editData.value = initEditData() // 清空编辑数据
    done && done()
    // })
    // .catch(() => {
    // })
}
</script>
<template>
    <div class="story-manage">
        <div v-loading="tableLoading" class="table">
            <div class="table-top">
                <el-button type="primary" @click="add">新增</el-button>
                <div>
                    <el-input v-if="showSearchBox" v-model="title" style="width: 150px; margin-right: 10px"
                        placeholder="请输入故事标题" />
                    <el-icon @click="searchStory">
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
        <!-- 新增弹窗 -->
        <div>
            <el-dialog v-model="showAddDialog" title="新增" width="500" :before-close="handleClose">
                <el-form :model="addData" :rules="formRules" ref="addFormRef" label-width="auto"
                    style="max-width: 600px">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="addData.title" />
                    </el-form-item>
                    <el-form-item label="来源" prop="source">
                        <el-input v-model="addData.source" />
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <el-input type="textarea" autosize v-model="addData.content" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="addStory">
                            确认
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
        <!-- 编辑弹窗 -->
        <div>
            <el-dialog v-model="showEditDialog" title="编辑" width="500" :before-close="handleClose">
                <el-form :model="editData" :rules="formRules" ref="editFormRef" label-width="auto"
                    style="max-width: 600px">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="editData.title" />
                    </el-form-item>
                    <el-form-item label="来源" prop="source">
                        <el-input v-model="editData.source" />
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <el-input type="textarea" autosize v-model="editData.content" />
                    </el-form-item>
                    <el-form-item label="发布时间" prop="time">
                        <el-date-picker type="datetime" v-model="editData.time" value-format="YYYY-MM-DDTHH:mm:ss" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="editStory">
                            确认
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
        <!-- 删除弹窗 -->
        <div>
            <el-dialog v-model="showDeleteDialog" title="删除" width="500">
                <span>是否删除</span>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="removeStory">
                            确认
                        </el-button>
                    </div>
                </template>
            </el-dialog>
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