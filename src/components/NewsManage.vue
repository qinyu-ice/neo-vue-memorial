<script setup>
import { ElMessage } from 'element-plus';
import { Edit, Delete, Search, UploadFilled } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { allNewsList, addNewsData, updateNews, deleteNews, uploadImg } from '@/api/news';

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
const addData = ref({})
const initEditData = () => ({})
const editData = ref(initEditData())
const deleteData = ref()

const formatTime = (row, column) => {
    const timeStr = row[column.prop] || row.time;
    return String(timeStr).substring(0, 10)
}
const title = ref('')
const currentSearchKeyword = ref('')
const showPreview = ref(false)
const previewImg = ref('')
const uploadUrl = ref()
const fileInput = ref(null)
const addFormRef = ref()
const editFormRef = ref()
const tableLoading = ref(true)
const showSearchBox = ref(false)
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)

// 定义表单校验规则
const formRules = reactive({
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
    ],
    subtitle: [
        { required: true, message: '请输入副标题', trigger: 'blur' },
    ],
    source: [
        { required: true, message: '请输入来源', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '请输入内容', trigger: 'blur' },
    ]
})

const getNewsList = async (page, pageSize, title = '') => {
    const searchTitle = title || currentSearchKeyword.value
    //获取分类列表
    const res = await allNewsList(page, pageSize, searchTitle)
    if (res.code === 200 && res.data.data != null) {
        tableLoading.value = false
    }
    tableData.value = res.data.data
    total.value = res.data.total
}
getNewsList(1, 5)
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    getNewsList(pageNum.value, pageSize.value)
}

const searchNews = async () => {
    showSearchBox.value = true
    // 将搜索关键词持久化
    currentSearchKeyword.value = title.value
    await getNewsList(1, 5, currentSearchKeyword.value)

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

const addNews = async () => {
    try {
        const url = new URL(uploadUrl.value)
        addData.value.img = url.pathname
        const result = await addNewsData(addData.value)
        showAddDialog.value = false
        ElMessage.success(result.msg)
        pageNum.value = 1
        pageSize.value = 5
        await getNewsList(pageNum.value, pageSize.value)
        addFormRef.value?.resetFields()
        uploadUrl.value = ''
    } catch (error) {
        // 校验失败
        ElMessage.error('表单填写有误，请检查')
        console.error('表单校验失败：', error)
    }
}

const upload = async () => {
    await fileInput.value.click()
}

// 处理文件选择后的逻辑
const handleFileChange = async (e) => {
    // 获取选中的文件列表
    const files = e.target.files
    if (files.length === 0) {
        ElMessage.info('未选择任何文件')
        return
    }

    // 创建 FormData 对象（唯一能被 MultipartFile 解析的格式）
    const formData = new FormData();
    // 关键：参数名 "file" 必须和后端 @RequestParam("file") 完全一致
    formData.append("file", files[0]);

    const result = await uploadImg(formData)
    uploadUrl.value = result.data

    // 清空文件选择框的值，确保同一文件可以重复选择
    e.target.value = ''
}

const edit = (row) => {
    editData.value = { ...row }
    showEditDialog.value = true
}

const editNews = async () => {
    try {
        await editFormRef.value.validate()
        if (uploadUrl.value) {
            const url = new URL(uploadUrl.value)
            editData.value.img = url.pathname
        } else {
            const originUrl = new URL(editData.value.img)
            editData.value.img = originUrl.pathname
        }
        const result = await updateNews(editData.value)
        showEditDialog.value = false
        ElMessage.success(result.msg)
        pageNum.value = 1
        pageSize.value = 5
        await getNewsList(pageNum.value, pageSize.value)
        editFormRef.value?.resetFields()
        uploadUrl.value = ''
        editData.value = initEditData()
    } catch (error) {
        // 校验失败
        ElMessage.error('表单填写有误，请检查')
        console.error('表单校验失败：', error)
    }
}

const remove = (row) => {
    deleteData.value = { ...row }
    showDeleteDialog.value = true
}

const removeNews = async () => {
    try {
        const result = await deleteNews(deleteData.value.id)
        showDeleteDialog.value = false
        ElMessage.success(result.msg)
        pageNum.value = 1
        pageSize.value = 5
        await getNewsList(pageNum.value, pageSize.value)
    } catch (error) {
        ElMessage.error('删除失败')
        console.error('error：', error)
    }
}

const openPreview = (url) => {
    previewImg.value = url
    showPreview.value = true
    // 禁止页面滚动
    document.body.style.overflow = 'hidden'
}

// 关闭预览
const closePreview = () => {
    showPreview.value = false
    document.body.style.overflow = ''
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
    uploadUrl.value = ''
    done && done()
    // })
    // .catch(() => {
    // })
}
</script>
<template>
    <div class="news-manage">
        <div v-loading="tableLoading" class="table">
            <div class="table-top">
                <el-button type="danger" @click="add">新增</el-button>
                <div>
                    <el-input class="news-input" v-if="showSearchBox" v-model="title"
                        style="width: 150px; margin-right: 10px" placeholder="请输入热点资讯标题" />
                    <el-icon @click="searchNews">
                        <Search style="color: red;" />
                    </el-icon>
                </div>
            </div>
            <el-table class="news-table" :data="tableData" border>
                <el-table-column prop="id" label="序号" width="80" />
                <el-table-column prop="title" label="标题" width="200" show-overflow-tooltip />
                <el-table-column prop="subtitle" label="副标题" width="200" show-overflow-tooltip />
                <el-table-column prop="img" label="图片" width="100">
                    <template #default="scope">
                        <img :src="scope.row.img" alt="展示图片" @click="openPreview(scope.row.img)"
                            style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px;">
                    </template>
                </el-table-column>
                <el-table-column prop="source" label="来源" width="250" show-overflow-tooltip />
                <el-table-column prop="content" label="内容" width="400" show-overflow-tooltip />
                <el-table-column prop="time" label="发布时间" width="120" :formatter="formatTime" />
                <el-table-column class="operation" label="操作" width="130">
                    <template #default="scope">
                        <el-link type="danger" :icon="Edit" @click="edit(scope.row)" class="operation-link">修改</el-link>
                        <el-link type="danger" :icon="Delete" @click="remove(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 图片放大预览 -->
            <div v-if="showPreview" class="preview-mask" @click="closePreview" @keyup.esc="closePreview" tabindex="0">
                <img :src="previewImg" class="preview-img" />
            </div>
            <el-pagination class="news-pagination" v-model:current-page="pageNum" v-model:page-size="pageSize"
                layout="jumper, total, prev, pager, next" background :total="total" @current-change="onCurrentChange"
                style="margin-top: 50px; justify-content:center; margin-bottom: 50px;" />
        </div>
        <!-- 新增弹窗 -->
        <div>
            <el-dialog v-model="showAddDialog" title="新增" width="500" :before-close="handleClose">
                <el-form :model="addData" :rules="formRules" ref="addFormRef" label-width="auto"
                    style="max-width: 600px">
                    <el-form-item label="标题" prop="title">
                        <el-input type="textarea" autosize v-model="addData.title" />
                    </el-form-item>
                    <el-form-item label="副标题" prop="subtitle">
                        <el-input type="textarea" autosize v-model="addData.subtitle" />
                    </el-form-item>
                    <el-form-item label="来源" prop="source">
                        <el-input v-model="addData.source" />
                    </el-form-item>
                    <el-form-item label="图片" prop="img">
                        <el-icon v-if="!uploadUrl" :size="20" @click="upload">
                            <UploadFilled />
                            <el-input ref="fileInput" type="file" accept="image/*" style="display: none"
                                @change="handleFileChange" />
                        </el-icon>
                        <input ref="fileInput" type="file" accept="image/*" style="display: none"
                            @change="handleFileChange" />
                        <img v-if="uploadUrl" :src="uploadUrl"
                            style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;" @click="upload">
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <el-input type="textarea" autosize v-model="addData.content" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="addNews">
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
                        <el-input type="textarea" autosize v-model="editData.title" />
                    </el-form-item>
                    <el-form-item label="副标题" prop="subtitle">
                        <el-input type="textarea" autosize v-model="editData.subtitle" />
                    </el-form-item>
                    <el-form-item label="来源" prop="source">
                        <el-input v-model="editData.source" />
                    </el-form-item>
                    <el-form-item label="图片" prop="photo">
                        <input ref="fileInput" type="file" accept="image/*" style="display: none"
                            @change="handleFileChange" />
                        <img :src="uploadUrl ? uploadUrl : editData.img" alt="展示图片"
                            style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;" @click="upload">
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
                        <el-button type="primary" @click="editNews">
                            确认
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
        <!-- 删除弹窗 -->
        <div>
            <el-dialog v-model="showDeleteDialog" title="删除" width="500">
                <span>是否删除{{ deleteData.title }}？</span>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="removeNews">
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
    height: 50px;
}

.preview-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    cursor: zoom-out;
    animation: fadeIn 0.3s ease;
}

/* 放大后的图片 */
.preview-img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
    animation: zoomIn 0.3s ease;
}

/* 动画 */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes zoomIn {
    from {
        transform: scale(0.8);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

:deep(.news-input) {
    --el-input-bg-color: rgb(255, 240, 240);
    --el-input-text-color: red;
    --el-input-border-color: rgb(255, 200, 200);
    --el-input-hover-border-color: rgb(255, 150, 150);
    --el-input-focus-border-color: red;
}

:deep(.news-input) ::-webkit-input-placeholder {
    color: rgb(255, 140, 140) !important;
}

:deep(.news-input) :-moz-placeholder {
    color: rgb(255, 140, 140) !important;
    opacity: 1 !important;
}

:deep(.news-input) ::-moz-placeholder {
    color: rgb(255, 140, 140) !important;
    opacity: 1 !important;
}

:deep(.news-input) :-ms-input-placeholder {
    color: rgb(255, 140, 140) !important;
}

:deep(.news-table) {
    --el-table-header-text-color: red;
    color: red;

    &:hover {
        --el-table-row-hover-bg-color: rgb(255, 240, 240);
    }
}

:deep(.news-pagination) {
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