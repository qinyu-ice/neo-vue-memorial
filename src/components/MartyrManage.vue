<script setup>
import { ref, reactive } from 'vue';
import { Edit, Delete, Search, UploadFilled } from '@element-plus/icons-vue'
import { allHeroPage, martyrAdd, uploadMartyrPhoto, deleteMartyr, updateMartyr } from '@/api/martyrs'
import { ElMessage } from 'element-plus';

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref()//总条数
const pageSize = ref(5)//每页条数

const tableData = ref([
    {
        id: '',
        photo: '',
        name: '',
        hometown: '',
        gender: '',
        politicsStatus: '',
        birthDate: '',
        dept: '',
        position: '',
        achievement: '',
        deathDate: '',
        deathCampaign: '',
        deathAddress: '',
        buryPoint: '',
        deeds: ''
    }
])
const addData = ref({
    photo: '',
    name: '',
    hometown: '',
    gender: 0,
    politicsStatus: '',
    birthDate: '',
    dept: '',
    position: '',
    achievement: '',
    deathDate: '',
    deathCampaign: '',
    deathAddress: '',
    buryPoint: '',
    deeds: ''
})
const initEditData = () => ({
    photo: '',
    name: '',
    hometown: '',
    gender: 0,
    politicsStatus: '',
    birthDate: '',
    dept: '',
    position: '',
    achievement: '',
    deathDate: '',
    deathCampaign: '',
    deathAddress: '',
    buryPoint: '',
    deeds: ''
})
const editData = ref(initEditData()) // 初始化编辑数据
const name = ref('')
const currentSearchKeyword = ref('')
const deleteData = ref()
const addFormRef = ref()
const editFormRef = ref()
const uploadUrl = ref()
const fileInput = ref(null)
const tableLoading = ref(true)
const showSearchBox = ref(false)
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)

// 性别格式化函数
const formatGender = (row, column) => {
    switch (row.gender) {
        case 1: return '男';
        case 2: return '女';
        default: return '未知';
    }
}

const formRules = reactive({
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    hometown: [
        { required: true, message: '请输入籍贯', trigger: 'blur' }
    ],
    politicsStatus: [
        { required: true, message: '请输入政治面貌', trigger: 'blur' }
    ],
    birthDate: [
        { required: true, message: '请选择出生日期', trigger: 'blur' }
    ],
    dept: [
        { required: true, message: '请输入生前单位', trigger: 'blur' }
    ],
    position: [
        { required: true, message: '请输入生前职位', trigger: 'blur' }
    ],
    achievement: [
        { required: true, message: '请输入立功情况', trigger: 'blur' }
    ],
    deathDate: [
        { required: true, message: '请选择牺牲日期', trigger: 'blur' }
    ],
    deathCampaign: [
        { required: true, message: '请输入牺牲战役', trigger: 'blur' }
    ],
    deathAddress: [
        { required: true, message: '请输入牺牲地址', trigger: 'blur' }
    ],
    buryPoint: [
        { required: true, message: '请输入安葬地点', trigger: 'blur' }
    ],
    deeds: [
        { required: true, message: '请输入烈士事迹', trigger: 'blur' }
    ]
})

const getAllHeroPage = async (page, pageSize, name = '') => {
    const searchName = name || currentSearchKeyword.value
    //获取分类列表
    const res = await allHeroPage(page, pageSize, searchName)
    if (res.code === 200 && res.data.data != null) {
        tableLoading.value = false
    }
    tableData.value = res.data.data
    if (tableData.value == null) {
        ElMessage.error('暂无烈士数据')
    }
    total.value = res.data.total
}
getAllHeroPage(1, 5)
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    getAllHeroPage(pageNum.value, pageSize.value)
}

const searchMartyr = async () => {
    showSearchBox.value = true
    // 将搜索关键词持久化
    currentSearchKeyword.value = name.value
    await getAllHeroPage(1, 5, currentSearchKeyword.value)

    if (currentSearchKeyword.value) {
        showSearchBox.value = false
        ElMessage.success(`搜索到${total.value}条符合条件`)
    }
    // 只清空输入框，保留持久化的关键词
    name.value = ''
    pageNum.value = 1
}

const add = () => {
    showAddDialog.value = true
}

const addMartyr = async () => {
    try {
        const url = new URL(uploadUrl.value)
        addData.value.photo = url.pathname
        if (addData.value.gender != 0) {
            const result = await martyrAdd(addData.value)
            showAddDialog.value = false
            ElMessage.success(result.msg)
            pageNum.value = 1
            pageSize.value = 5
            await getAllHeroPage(pageNum.value, pageSize.value)
            addFormRef.value?.resetFields()
            uploadUrl.value = ''
        } else {
            ElMessage.error('性别不能为空')
        }
    } catch (error) {
        // 校验失败
        ElMessage.error('表单填写有误，请检查')
        console.log('表单校验失败：', error)
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

    const result = await uploadMartyrPhoto(formData)
    uploadUrl.value = result.data

    // 清空文件选择框的值，确保同一文件可以重复选择
    e.target.value = ''
}

const edit = (row) => {
    editData.value = { ...row }
    showEditDialog.value = true
}

const editMartyr = async () => {
    try {
        await editFormRef.value.validate()
        if (uploadUrl.value) {
            const url = new URL(uploadUrl.value)
            editData.value.photo = url.pathname
        } else {
            const originUrl = new URL(editData.value.photo)
            editData.value.photo = originUrl.pathname
        }
        const result = await updateMartyr(editData.value)
        showEditDialog.value = false
        ElMessage.success(result.msg)
        pageNum.value = 1
        pageSize.value = 5
        await getAllHeroPage(pageNum.value, pageSize.value)
        editFormRef.value?.resetFields()
        uploadUrl.value = ''
        editData.value = initEditData()
    } catch (error) {
        // 校验失败
        ElMessage.error('表单填写有误，请检查')
        console.log('表单校验失败：', error)
    }
}

const remove = (row) => {
    deleteData.value = { ...row }
    showDeleteDialog.value = true
}

const removeMartyr = async () => {
    try {
        const result = await deleteMartyr(deleteData.value.id)
        showDeleteDialog.value = false
        ElMessage.success(result.msg)
        pageNum.value = 1
        pageSize.value = 5
        await getAllHeroPage(pageNum.value, pageSize.value)
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
    uploadUrl.value = ''
    done && done()
    // })
    // .catch(() => {
    // })
}
</script>
<template>
    <div class="martyr-manage">
        <div v-loading="tableLoading" class="table">
            <div class="table-top">
                <el-button type="danger" @click="add">新增</el-button>
                <div>
                    <el-input class="martyr-input" v-if="showSearchBox" v-model="name"
                        style="width: 150px; margin-right: 10px" placeholder="请输入烈士姓名" />
                    <el-icon @click="searchMartyr">
                        <Search style="color: red;" />
                    </el-icon>
                </div>
            </div>
            <el-table class="martyr-table" :data="tableData" border>
                <el-table-column prop="id" label="序号" width="80" />
                <el-table-column prop="photo" label="烈士碑像" width="100">
                    <template #default="scope">
                        <img :src="scope.row.photo" alt="展示图片"
                            style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px;">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="80" />
                <el-table-column prop="hometown" label="籍贯" width="80" />
                <el-table-column prop="gender" label="性别" width="80" :formatter="formatGender" />
                <el-table-column prop="politicsStatus" label="政治面貌" width="90" />
                <el-table-column prop="birthDate" label="出生日期" width="90" />
                <el-table-column prop="dept" label="生前单位" width="90" />
                <el-table-column prop="position" label="生前职位" width="90" />
                <el-table-column prop="achievement" label="立功情况" width="90" />
                <el-table-column prop="deathDate" label="牺牲日期" width="100" />
                <el-table-column prop="deathCampaign" label="牺牲战役" width="90" show-overflow-tooltip />
                <el-table-column prop="deathAddress" label="牺牲地址" width="90" show-overflow-tooltip />
                <el-table-column prop="buryPoint" label="安葬地点" width="90" show-overflow-tooltip />
                <el-table-column prop="deeds" label="烈士事迹" width="90" show-overflow-tooltip />
                <el-table-column class="operation" label="操作" width="130">
                    <template #default="scope">
                        <el-link type="danger" :icon="Edit" @click="edit(scope.row)" class="operation-link">修改</el-link>
                        <el-link type="danger" :icon="Delete" @click="remove(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="martyr-pagination" v-model:current-page="pageNum" v-model:page-size="pageSize"
                layout="jumper, total, prev, pager, next" background :total="total" @current-change="onCurrentChange"
                style="margin-top: 50px; justify-content:center; margin-bottom: 50px;" />
        </div>
        <!-- 新增弹窗 -->
        <div>
            <el-dialog v-model="showAddDialog" title="新增" width="500" :before-close="handleClose">
                <el-form :model="addData" :rules="formRules" ref="addFormRef" label-width="auto"
                    style="max-width: 600px">
                    <el-form-item label="烈士碑像" prop="photo">
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
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="addData.name" />
                    </el-form-item>
                    <el-form-item label="籍贯" prop="hometown">
                        <el-input v-model="addData.hometown" />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="addData.gender">
                            <el-radio value=1>男</el-radio>
                            <el-radio value=2>女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="政治面貌" prop="politicsStatus">
                        <el-input v-model="addData.politicsStatus" />
                    </el-form-item>
                    <el-form-item label="出生日期" prop="birthDate">
                        <el-input v-model="addData.birthDate" />
                    </el-form-item>
                    <el-form-item label="生前单位" prop="dept">
                        <el-input v-model="addData.dept" />
                    </el-form-item>
                    <el-form-item label="生前职位" prop="position">
                        <el-input v-model="addData.position" />
                    </el-form-item>
                    <el-form-item label="立功情况" prop="achievement">
                        <el-input v-model="addData.achievement" />
                    </el-form-item>
                    <el-form-item label="牺牲日期" prop="deathDate">
                        <el-input v-model="addData.deathDate" />
                    </el-form-item>
                    <el-form-item label="牺牲战役" prop="deathCampaign">
                        <el-input v-model="addData.deathCampaign" />
                    </el-form-item>
                    <el-form-item label="牺牲地址" prop="deathAddress">
                        <el-input v-model="addData.deathAddress" />
                    </el-form-item>
                    <el-form-item label="安葬地点" prop="buryPoint">
                        <el-input v-model="addData.buryPoint" />
                    </el-form-item>
                    <el-form-item label="烈士事迹" prop="deeds">
                        <el-input type="textarea" autosize v-model="addData.deeds" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="addMartyr">
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
                    <el-form-item label="烈士碑像" prop="photo">
                        <input ref="fileInput" type="file" accept="image/*" style="display: none"
                            @change="handleFileChange" />
                        <img :src="uploadUrl ? uploadUrl : editData.photo" alt="展示图片"
                            style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;" @click="upload">
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="editData.name" />
                    </el-form-item>
                    <el-form-item label="籍贯" prop="hometown">
                        <el-input v-model="editData.hometown" />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="editData.gender">
                            <el-radio :value=1>男</el-radio>
                            <el-radio :value=2>女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="政治面貌" prop="politicsStatus">
                        <el-input v-model="editData.politicsStatus" />
                    </el-form-item>
                    <el-form-item label="出生日期" prop="birthDate">
                        <el-input v-model="editData.birthDate" />
                    </el-form-item>
                    <el-form-item label="生前单位" prop="dept">
                        <el-input v-model="editData.dept" />
                    </el-form-item>
                    <el-form-item label="生前职位" prop="position">
                        <el-input v-model="editData.position" />
                    </el-form-item>
                    <el-form-item label="立功情况" prop="achievement">
                        <el-input v-model="editData.achievement" />
                    </el-form-item>
                    <el-form-item label="牺牲日期" prop="deathDate">
                        <el-input v-model="editData.deathDate" />
                    </el-form-item>
                    <el-form-item label="牺牲战役" prop="deathCampaign">
                        <el-input v-model="editData.deathCampaign" />
                    </el-form-item>
                    <el-form-item label="牺牲地址" prop="deathAddress">
                        <el-input v-model="editData.deathAddress" />
                    </el-form-item>
                    <el-form-item label="安葬地点" prop="buryPoint">
                        <el-input v-model="editData.buryPoint" />
                    </el-form-item>
                    <el-form-item label="烈士事迹" prop="deeds">
                        <el-input type="textarea" autosize v-model="editData.deeds" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="editMartyr">
                            确认
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
        <!-- 删除弹窗 -->
        <div>
            <el-dialog v-model="showDeleteDialog" title="删除" width="500">
                <span>是否删除{{ deleteData.name }}？</span>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="removeMartyr">
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

:deep(.martyr-input) {
    --el-input-bg-color: rgb(255, 240, 240);
    --el-input-text-color: red;
    --el-input-border-color: rgb(255, 200, 200);
    --el-input-hover-border-color: rgb(255, 150, 150);
    --el-input-focus-border-color: red;
}

:deep(.martyr-input) ::-webkit-input-placeholder {
    color: rgb(255, 140, 140) !important;
}

:deep(.martyr-input) :-moz-placeholder {
    color: rgb(255, 140, 140) !important;
    opacity: 1 !important;
}

:deep(.martyr-input) ::-moz-placeholder {
    color: rgb(255, 140, 140) !important;
    opacity: 1 !important;
}

:deep(.martyr-input) :-ms-input-placeholder {
    color: rgb(255, 140, 140) !important;
}

:deep(.martyr-table) {
    --el-table-header-text-color: red;
    color: red;

    &:hover {
        --el-table-row-hover-bg-color: rgb(255, 240, 240);
    }
}

:deep(.martyr-pagination) {
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