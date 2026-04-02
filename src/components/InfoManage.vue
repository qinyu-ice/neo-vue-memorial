<script setup>
import {ElMessage} from 'element-plus';
import {Edit, Delete, Search} from '@element-plus/icons-vue';
import {allInfoList, addInfoData, updateInfo, deleteInfo} from '@/api/info';
import {ref, reactive} from 'vue';

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref()//总条数
const pageSize = ref(5)//每页条数

const tableData = ref([])
const addData = ref({})
const initEditData = () => ({})
const editData = ref(initEditData())
const deleteData = ref()

const formatTime = (row, column) => {
  const timeStr = row[column.prop] || row.time;
  return String(timeStr).substring(0, 10)
}

const formatGender = (row, column) => {
  switch (row.gender) {
    case 1:
      return '男';
    case 2:
      return '女';
  }
}

const title = ref('')
const currentSearchKeyword = ref('')
const addFormRef = ref()
const editFormRef = ref()
const tableLoading = ref(true)
const showSearchBox = ref(false)
const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)

const formRules = reactive({
  title: [
    {required: true, message: '请输入标题', trigger: 'blur'}
  ],
  source: [
    {required: true, message: '请输入来源', trigger: 'blur'}
  ]
})

const getAllInfoList = async (page, pageSize, title = '') => {
  const searchTitle = title || currentSearchKeyword.value
  //获取分类列表
  const res = await allInfoList(page, pageSize, searchTitle)
  if (res.code === 200 && res.data.data != null) {
    tableLoading.value = false
  }
  tableData.value = res.data.data
  total.value = res.data.total
}
getAllInfoList(1, 5)
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  getAllInfoList(pageNum.value, pageSize.value)
}

const searchInfo = async () => {
  showSearchBox.value = true
  // 将搜索关键词持久化
  currentSearchKeyword.value = title.value
  await getAllInfoList(1, 5, currentSearchKeyword.value)

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

const addInfo = async () => {
  try {
    const result = await addInfoData(addData.value)
    showAddDialog.value = false
    ElMessage.success(result.msg)
    pageNum.value = 1
    pageSize.value = 5
    await getAllInfoList(pageNum.value, pageSize.value)
    addFormRef.value?.resetFields()
  } catch (error) {
    // 校验失败
    ElMessage.error('表单填写有误，请检查')
    console.error('表单校验失败：', error)
  }
}

const edit = (row) => {
  editData.value = {...row}
  showEditDialog.value = true
}

const editInfo = async () => {
  try {
    await editFormRef.value.validate()
    const result = await updateInfo(editData.value)
    showEditDialog.value = false
    ElMessage.success(result.msg)
    pageNum.value = 1
    pageSize.value = 5
    await getAllInfoList(pageNum.value, pageSize.value)
    editFormRef.value?.resetFields()
    editData.value = initEditData()
  } catch (error) {
    // 校验失败
    ElMessage.error('表单填写有误，请检查')
    console.error('表单校验失败：', error)
  }
}

const remove = (row) => {
  deleteData.value = {...row}
  showDeleteDialog.value = true
}

const removeInfo = async () => {
  try {
    const result = await deleteInfo(deleteData.value.id)
    showDeleteDialog.value = false
    ElMessage.success(result.msg)
    pageNum.value = 1
    pageSize.value = 5
    await getAllInfoList(pageNum.value, pageSize.value)
  } catch (error) {
    ElMessage.error('删除失败')
    console.error('error：', error)
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
  <div class="info-manage">
    <div v-loading="tableLoading" class="table">
      <div class="table-top">
        <el-button type="danger" @click="add">新增</el-button>
        <div>
          <el-input class="info-input" v-if="showSearchBox" v-model="title"
                    style="width: 150px; margin-right: 10px" placeholder="请输入寻亲信息标题"/>
          <el-icon @click="searchInfo">
            <Search style="color: red;"/>
          </el-icon>
        </div>
      </div>
      <el-table class="info-table" :data="tableData" border>
        <el-table-column label="序号" width="80" align="center">
          <template #default="scoped">
            {{ (pageNum - 1) * pageSize + scoped.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="150" show-overflow-tooltip/>
        <el-table-column prop="source" label="来源" width="100" show-overflow-tooltip/>
        <el-table-column prop="name" label="姓名" width="100" show-overflow-tooltip/>
        <el-table-column prop="gender" label="性别" width="80" :formatter="formatGender"/>
        <el-table-column prop="hometown" label="籍贯" width="100" show-overflow-tooltip/>
        <el-table-column prop="birthDate" label="出生日期" width="100"/>
        <el-table-column prop="politicsStatus" label="政治面貌" width="100" show-overflow-tooltip/>
        <el-table-column prop="dept" label="生前部队" width="100" show-overflow-tooltip/>
        <el-table-column prop="deathDate" label="牺牲日期" width="100"/>
        <el-table-column prop="deathCampaign" label="牺牲战役" width="100" show-overflow-tooltip/>
        <el-table-column prop="deathAddress" label="牺牲地点" width="100" show-overflow-tooltip/>
        <el-table-column prop="time" label="发布时间" width="100" :formatter="formatTime"/>
        <el-table-column class="operation" label="操作" width="130">
          <template #default="scope">
            <el-link type="danger" :icon="Edit" @click="edit(scope.row)" class="operation-link">修改</el-link>
            <el-link type="danger" :icon="Delete" @click="remove(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="info-pagination" v-model:current-page="pageNum" v-model:page-size="pageSize"
                     layout="jumper, total, prev, pager, next" background :total="total"
                     @current-change="onCurrentChange"
                     style="margin-top: 50px; justify-content:center; margin-bottom: 50px;"/>
    </div>
    <!-- 新增弹窗 -->
    <div>
      <el-dialog v-model="showAddDialog" title="新增" width="500" :before-close="handleClose">
        <el-form :model="addData" :rules="formRules" ref="addFormRef" label-width="auto"
                 style="max-width: 600px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="addData.title"/>
          </el-form-item>
          <el-form-item label="来源" prop="source">
            <el-input v-model="addData.source"/>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addData.name"/>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="addData.gender">
              <el-radio value=1>男</el-radio>
              <el-radio value=2>女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="籍贯" prop="hometown">
            <el-input v-model="addData.hometown"/>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthDate">
            <el-input v-model="addData.birthDate"/>
          </el-form-item>
          <el-form-item label="政治面貌" prop="politicsStatus">
            <el-input v-model="addData.politicsStatus"/>
          </el-form-item>
          <el-form-item label="生前部队" prop="dept">
            <el-input v-model="addData.dept"/>
          </el-form-item>
          <el-form-item label="牺牲日期" prop="deathDate">
            <el-input v-model="addData.deathDate"/>
          </el-form-item>
          <el-form-item label="牺牲战役" prop="deathCampaign">
            <el-input v-model="addData.deathCampaign"/>
          </el-form-item>
          <el-form-item label="牺牲地点" prop="deathAddress">
            <el-input v-model="addData.deathAddress"/>
          </el-form-item>
          <el-form-item label="其他情况" prop="other">
            <el-input type="textarea" autosize v-model="addData.other"/>
          </el-form-item>
          <el-form-item label="联系姓名" prop="contactName">
            <el-input v-model="addData.contactName"/>
          </el-form-item>
          <el-form-item label="联系地址" prop="contactAddress">
            <el-input v-model="addData.contactAddress"/>
          </el-form-item>
          <el-form-item label="联系电话" prop="contactPhone">
            <el-input v-model="addData.contactPhone"/>
          </el-form-item>
          <el-form-item label="联系邮箱" prop="contactEmail">
            <el-input v-model="addData.contactEmail"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="addInfo">
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
            <el-input v-model="editData.title"/>
          </el-form-item>
          <el-form-item label="来源" prop="source">
            <el-input v-model="editData.source"/>
          </el-form-item>
          <el-form-item label="发布时间" prop="time">
            <el-date-picker type="datetime" v-model="editData.time" value-format="YYYY-MM-DDTHH:mm:ss"/>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editData.name"/>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="editData.gender">
              <el-radio :value=1>男</el-radio>
              <el-radio :value=2>女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="籍贯" prop="hometown">
            <el-input v-model="editData.hometown"/>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthDate">
            <el-input v-model="editData.birthDate"/>
          </el-form-item>
          <el-form-item label="政治面貌" prop="politicsStatus">
            <el-input v-model="editData.politicsStatus"/>
          </el-form-item>
          <el-form-item label="生前部队" prop="dept">
            <el-input v-model="editData.dept"/>
          </el-form-item>
          <el-form-item label="牺牲日期" prop="deathDate">
            <el-input v-model="editData.deathDate"/>
          </el-form-item>
          <el-form-item label="牺牲战役" prop="deathCampaign">
            <el-input v-model="editData.deathCampaign"/>
          </el-form-item>
          <el-form-item label="牺牲地点" prop="deathAddress">
            <el-input v-model="editData.deathAddress"/>
          </el-form-item>
          <el-form-item label="其他情况" prop="other">
            <el-input type="textarea" autosize v-model="editData.other"/>
          </el-form-item>
          <el-form-item label="联系姓名" prop="contactName">
            <el-input v-model="editData.contactName"/>
          </el-form-item>
          <el-form-item label="联系地址" prop="contactAddress">
            <el-input v-model="editData.contactAddress"/>
          </el-form-item>
          <el-form-item label="联系电话" prop="contactPhone">
            <el-input v-model="editData.contactPhone"/>
          </el-form-item>
          <el-form-item label="联系邮箱" prop="contactEmail">
            <el-input v-model="editData.contactEmail"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="editInfo">
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
            <el-button type="primary" @click="removeInfo">
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