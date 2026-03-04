<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Edit, Delete, View as IconView, UploadFilled } from '@element-plus/icons-vue'
import { cityHallPage, uploadCityHallImage, addCityHall, updateCityHall, deleteCityHall } from '@/api/cityHall'
import { Search } from '@element-plus/icons-vue'

const tableData = ref([
    {
        id: '',
        name: '',
        img: '',
        introduction: '',
        phone: '',
        address: '',
        hint: ''
    }
])
const initEditData = () => ({
    name: '',
    img: '',
    introduction: '',
    phone: '',
    address: '',
    hint: ''
})
const editData = ref(initEditData()) // 初始化编辑数据
const addData = ref({
    name: '',
    img: '',
    introduction: '',
    phone: '',
    address: '',
    hint: ''
})
//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref()//总条数
const pageSize = ref(5)//每页条数

const showEditDialog = ref(false)
const showAddDialog = ref(false)
const showDeleteDialog = ref(false)
const showSearchBox = ref(false)
const fileInput = ref(null)
const uploadUrl = ref()
const addFormRef = ref()
const editFormRef = ref()
const deleteId = ref()
const placeName = ref('')
const currentSearchKeyword = ref('')

const formRules = reactive({
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    introduction: [
        { required: true, message: '请输入介绍', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号或座机号', trigger: 'blur' },
        {
            pattern: /^(1[3-9]\d{9})|(\d{3,4}-\d{7,8})$/,
            message: '请输入正确的11位手机号或座机号（格式如：0818-5984363）',
            trigger: 'blur'
        }
    ],
    address: [
        { required: true, message: '请输入地址', trigger: 'blur' }
    ],
    hint: [
        { required: true, message: '请输入乘车提示', trigger: 'blur' }
    ]
})

const getCityHallPage = async (page, pageSize, name = '') => {
    //获取分类列表
    const searchName = name || currentSearchKeyword.value
    const res = await cityHallPage(page, pageSize, searchName)
    tableData.value = res.data.data
    total.value = res.data.total
}
getCityHallPage(1, 5)
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    getCityHallPage(pageNum.value, pageSize.value)
}

const add = () => {
    showAddDialog.value = true
}

const addPlace = async () => {
    try {
        await addFormRef.value.validate()
        const url = new URL(uploadUrl.value)
        addData.value.img = url.pathname
        const result = await addCityHall(addData.value)
        showAddDialog.value = false
        ElMessage.success(result.msg)
        pageNum.value = 1
        pageSize.value = 5
        await getCityHallPage(pageNum.value, pageSize.value)
        addFormRef.value?.resetFields()
        uploadUrl.value = ''
    } catch (error) {
        // 校验失败
        ElMessage.error('表单填写有误，请检查')
        console.log('表单校验失败：', error)
    }
}

const searchCityHall = async () => {
    showSearchBox.value = true
    // 将搜索关键词持久化
    currentSearchKeyword.value = placeName.value
    await getCityHallPage(1, 5, currentSearchKeyword.value)

    if (currentSearchKeyword.value) {
        showSearchBox.value = false
        ElMessage.success(`搜索到${total.value}条符合条件`)
    }
    // 只清空输入框，保留持久化的关键词
    placeName.value = ''
    pageNum.value = 1
}

const edit = (row) => {
    showEditDialog.value = true
    editData.value = { ...row }
}

const editPlace = async () => {
    try {
        await editFormRef.value.validate()
        if (uploadUrl.value) {
            const url = new URL(uploadUrl.value)
            editData.value.img = url.pathname
        } else {
            const originUrl = new URL(editData.value.img)
            editData.value.img = originUrl.pathname
        }
        const result = await updateCityHall(editData.value)
        showEditDialog.value = false
        ElMessage.success(result.msg)
        pageNum.value = 1
        pageSize.value = 5
        await getCityHallPage(pageNum.value, pageSize.value)
        editFormRef.value?.resetFields()
        uploadUrl.value = ''
        editData.value = initEditData()
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

    const result = await uploadCityHallImage(formData)
    uploadUrl.value = result.data

    // 清空文件选择框的值，确保同一文件可以重复选择
    e.target.value = ''
}

const remove = (row) => {
    deleteId.value = row.id
    showDeleteDialog.value = true
}

const removeCityHall = async () => {
    try {
        const result = await deleteCityHall(deleteId.value)
        showDeleteDialog.value = false
        ElMessage.success(result.msg)
        pageNum.value = 1
        pageSize.value = 5
        await getCityHallPage(pageNum.value, pageSize.value)
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
    <div class="place-manage">
        <div class="table">
            <div class="table-top">
                <el-button type="primary" @click="add">新增</el-button>
                <div>
                    <el-input v-if="showSearchBox" v-model="placeName" style="width: 150px; margin-right: 10px"
                        placeholder="请输入设施名称" />
                    <el-icon @click="searchCityHall">
                        <Search />
                    </el-icon>
                </div>
            </div>
            <el-table :data="tableData" border>
                <el-table-column prop="id" label="序号" width="80" />
                <el-table-column prop="name" label="名称" width="150" />
                <el-table-column prop="img" label="图片" width="110">
                    <template #default="scope">
                        <img :src="scope.row.img" alt="展示图片"
                            style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;">
                    </template>
                </el-table-column>
                <el-table-column prop="introduction" label="介绍" width="180" show-overflow-tooltip />
                <el-table-column prop="phone" label="电话" width="120" />
                <el-table-column prop="address" label="地址" width="100" show-overflow-tooltip />
                <el-table-column prop="hint" label="乘车提示" width="100" show-overflow-tooltip />
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
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="addData.name" />
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
                    <el-form-item label="介绍" prop="introduction">
                        <el-input v-model="addData.introduction" />
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="addData.phone" />
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="addData.address" />
                    </el-form-item>
                    <el-form-item label="乘车提示" prop="hint">
                        <el-input v-model="addData.hint" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="addPlace">
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
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="editData.name" />
                    </el-form-item>
                    <el-form-item label="图片" prop="img">
                        <input ref="fileInput" type="file" accept="image/*" style="display: none"
                            @change="handleFileChange" />
                        <img :src="uploadUrl ? uploadUrl : editData.img" alt="展示图片"
                            style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;" @click="upload">
                    </el-form-item>
                    <el-form-item label="介绍" prop="introduction">
                        <el-input v-model="editData.introduction" />
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="editData.phone" />
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="editData.address" />
                    </el-form-item>
                    <el-form-item label="乘车提示" prop="hint">
                        <el-input v-model="editData.hint" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="editPlace">
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
                        <el-button type="primary" @click="removeCityHall">
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