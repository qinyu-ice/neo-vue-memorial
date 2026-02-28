<script setup>
import { onMounted, ref, reactive } from 'vue'
import { userAllService, userAddService, userDeleteService, userInfoUpdateService, userUpdataService } from '@/api/user'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Edit, Delete, View as IconView, Lock } from '@element-plus/icons-vue'

const tableData = ref([
    {
        realName: '',
        username: '',
        email: '',
        phone: '',
        isDelete: ''
    }
])
const userAddData = reactive({})
const userEditData = reactive({})
const userResetPasswordData = reactive({})
const currentId = ref()
const showDeleteDialog = ref(false)
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showResetPasswordDialog = ref(false)
// 表单引用（用于手动触发校验）
const addFormRef = ref(null)
const editFormRef = ref(null)
const resetPasswordFormRef = ref(null)
// 定义表单校验规则
const formRules = reactive({
    // 真实姓名：必填，长度至少2-10个字符
    realName: [
        { required: true, message: '请输入真实姓名', trigger: 'blur' },
        { min: 2, max: 10, message: '真实姓名长度在2到10个字符之间', trigger: 'blur' }
    ],
    // 用户名：必填，字母/数字/下划线，长度4-20
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9_]{4,20}$/, message: '用户名只能包含字母、数字和下划线，长度4-20', trigger: 'blur' }
    ],
    // 邮箱：必填，符合邮箱格式
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
    ],
    // 手机号：必填，11位数字，符合手机号格式
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的11位手机号', trigger: 'blur' }
    ]
})

const passwordRules = reactive({
    password: [
        { required: true, message: '请输入原密码', trigger: 'blur' },
        { pattern: /^\S{5,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
    ],
    repassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { pattern: /^\S{5,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
    ]
})

const getTableData = async () => {
    const result = await userAllService()
    tableData.value = result.data
    if (tableData.value == null) {
        ElMessage.error('暂无用户')
    }
}

const addUserService = async (data) => {
    const result = await userAddService(data)
}

const deleteUserService = async (id) => {
    const result = await userDeleteService(id)
}

const add = () => {
    showAddDialog.value = true
}
const edit = (row) => {
    showEditDialog.value = true
    userEditData.value = row
}
const remove = (row) => {
    showDeleteDialog.value = true
    currentId.value = row.id
}
const reset = (row) => {
    showResetPasswordDialog.value = true
    userResetPasswordData.username = row.username
}

const addUser = async () => {
    try {
        await addFormRef.value.validate()
        // 新增接口调用逻辑
        const addData = {
            realName: userAddData.realName,
            username: userAddData.username,
            email: userAddData.email,
            phone: userAddData.phone
        }
        await addUserService(addData)
        ElMessage.success('新增用户成功')
        await getTableData()
        showAddDialog.value = false
        // 重置表单
        addFormRef.value.resetFields()
    } catch (error) {
        // 校验失败
        ElMessage.error('表单填写有误，请检查')
        console.log('表单校验失败：', error)
    }
}

const editUser = async () => {
    try {
        await editFormRef.value.validate()
        // 新增接口调用逻辑
        await userInfoUpdateService(userEditData.value)
        ElMessage.success('更新用户成功')
        await getTableData()
        showEditDialog.value = false
        // 重置表单
        editFormRef.value.resetFields()
    } catch (error) {
        // 校验失败
        ElMessage.error('表单填写有误，请检查')
        console.log('表单校验失败：', error)
    }
}

const deleteUser = async () => {
    try {
        await deleteUserService(currentId.value)
        ElMessage.success('删除用户成功')
        await getTableData()
        showDeleteDialog.value = false
    } catch (error) {
        ElMessage.error('删除用户失败')
        console.log('error：', error)
    }
}

const resetPassword = async () => {
    try {
        await resetPasswordFormRef.value.validate()
        // 新增接口调用逻辑
        await userUpdataService(userResetPasswordData)
        ElMessage.success('重置密码成功')
        showResetPasswordDialog.value = false
        // 重置表单
        resetPasswordFormRef.value.resetFields()
    } catch (error) {
        // 校验失败
        ElMessage.error('表单填写有误，请检查')
        console.log('表单校验失败：', error)
    }
}

const cancel = () => {
    showDeleteDialog.value = false
    showAddDialog.value = false
    showEditDialog.value = false
    showResetPasswordDialog.value = false
    handleClose()
}

const handleClose = (done) => {
    // ElMessageBox.confirm('确认关闭？')
    // .then(() => {
    // 关闭前重置表单
    addFormRef.value?.resetFields()
    editFormRef.value?.resetFields()
    resetPasswordFormRef.value?.resetFields()
    done()
    // })
    // .catch(() => {
    // })
}

onMounted(() => {
    getTableData()
})
</script>
<template>
    <div class="user-manage">
        <div class="table">
            <el-button type="primary" @click="add()">新增</el-button>
            <el-table :data="tableData" border>
                <el-table-column prop="id" label="序号" width="80">
                    <template #default="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="realName" label="姓名" width="100" />
                <el-table-column prop="username" label="用户名" width="100" />
                <el-table-column prop="email" label="邮箱" width="180" />
                <el-table-column prop="phone" label="电话" width="180" />
                <el-table-column prop="isDelete" label="是否删除" width="100">
                    <template #default="scope">
                        {{ scope.row.isDelete === 0 ? '否' : '是' }}
                    </template>
                </el-table-column>
                <el-table-column class="operation" label="操作" width="210">
                    <template #default="scope">
                        <el-link type="primary" :icon="Edit" @click="edit(scope.row)"
                            class="operation-link">修改</el-link>
                        <el-link type="danger" :icon="Delete" @click="remove(scope.row)"
                            class="operation-link">删除</el-link>
                        <el-link type="danger" :icon="Lock" @click="reset(scope.row)">重置密码</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 删除弹窗 -->
        <div>
            <el-dialog v-model="showDeleteDialog" title="删除" width="500">
                <span>是否删除</span>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="deleteUser">
                            确认
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
        <!-- 新增用户弹窗 -->
        <div>
            <el-dialog v-model="showAddDialog" title="新增" width="500" :before-close="handleClose">
                <el-form :model="userAddData" :rules="formRules" ref="addFormRef" label-width="auto"
                    style="max-width: 600px">
                    <el-form-item label="真实姓名" prop="realName">
                        <el-input v-model="userAddData.realName" />
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userAddData.username" />
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="userAddData.email" />
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="userAddData.phone" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="addUser">
                            确认
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
        <!-- 编辑用户弹窗 -->
        <div>
            <el-dialog v-model="showEditDialog" title="编辑" width="500" :before-close="handleClose">
                <el-form :model="userEditData.value" :rules="formRules" ref="editFormRef" label-width="auto"
                    style="max-width: 600px">
                    <el-form-item label="真实姓名" prop="realName">
                        <el-input v-model="userEditData.value.realName" />
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userEditData.value.username" />
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="userEditData.value.email" />
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="userEditData.value.phone" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="editUser">
                            确认
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
        <!-- 重置密码弹窗 -->
        <div>
            <el-dialog v-model="showResetPasswordDialog" title="重置密码" width="500" :before-close="handleClose">
                <el-form class="reset-password-form" :model="userResetPasswordData" :rules="passwordRules"
                    ref="resetPasswordFormRef" label-width="auto" style="max-width: 600px">
                    <el-form-item prop="username">
                        <el-input v-model="userResetPasswordData.username" disabled />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="userResetPasswordData.password" placeholder="请输入原密码" type="password"
                            show-password />
                    </el-form-item>
                    <el-form-item prop="repassword">
                        <el-input v-model="userResetPasswordData.repassword" placeholder="请输入新密码" type="password"
                            show-password />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="resetPassword">
                            确认
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<style scoped lang="scss">
.table {
    margin-top: 50px;
}

.table>.el-button {
    margin-bottom: 10px;
}

.operation-link {
    margin-right: 15px;
}

.reset-password-form>.el-form-item>.el-input {
    margin-top: 20px;
}
</style>