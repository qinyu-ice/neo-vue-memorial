<script setup>
import {ref} from 'vue';
import {Delete, Search} from '@element-plus/icons-vue'
import {getRecordPage} from '@/api/martyrs'
import {ElMessage} from 'element-plus';
import {deleteRecord} from '@/api/martyrs';

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref()//总条数
const pageSize = ref(5)//每页条数

const tableData = ref([
  {
    id: '',
    username: '',
    martyrName: '',
    flower: 0,
    message: '',
    time: ''
  }
])

const searchKeyWord = ref('')
const tableLoading = ref(true)
const showSearchBox = ref(false)
const showDeleteDialog = ref(false)
const currentSearchKeyword = ref('')
const deleteData = ref()

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

const remove = (row) => {
  deleteData.value = {...row}
  showDeleteDialog.value = true
}

const removeRecord = async () => {
  try {
    const result = await deleteRecord(deleteData.value.id)
    showDeleteDialog.value = false
    ElMessage.success(result.msg)
    pageNum.value = 1
    pageSize.value = 5
    await getAllRecordList(pageNum.value, pageSize.value)
  } catch (error) {
    ElMessage.error('删除失败')
    console.error('error：', error)
  }
}

const cancel = () => {
  showDeleteDialog.value = false
  handleClose()
}

const handleClose = (done) => {
  // ElMessageBox.confirm('确认关闭？')
  // .then(() => {
  // 关闭前重置表单
  done && done()
  // })
  // .catch(() => {
  // })
}
</script>
<template>
  <div class="record-manage">
    <div v-loading="tableLoading" class="table">
      <div class="table-top">
        <div>
          <el-input class="record-input" v-if="showSearchBox" v-model="searchKeyWord"
                    style="width: 150px; margin-right: 10px" placeholder="请输入用户名"/>
          <el-icon @click="searchRecord">
            <Search style="color: red;"/>
          </el-icon>
        </div>
      </div>
      <el-table class="record-table" :data="tableData" border>
        <el-table-column label="序号" width="80" align="center">
          <template #default="scoped">
            {{ (pageNum - 1) * pageSize + scoped.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120"/>
        <el-table-column prop="martyrName" label="烈士姓名" width="120"/>
        <el-table-column prop="flower" label="献花数量" width="120"/>
        <el-table-column prop="message" label="留言内容" width="300" show-overflow-tooltip/>
        <el-table-column prop="time" label="纪念时间" width="120" :formatter="formatTime"/>
        <el-table-column class="operation" label="操作" width="70">
          <template #default="scope">
            <el-link type="danger" :icon="Delete" @click="remove(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="record-pagination" v-model:current-page="pageNum" v-model:page-size="pageSize"
                     layout="jumper, total, prev, pager, next" background :total="total"
                     @current-change="onCurrentChange"
                     style="margin-top: 50px; justify-content:center; margin-bottom: 50px;"/>
    </div>
    <!-- 删除弹窗 -->
    <div>
      <el-dialog v-model="showDeleteDialog" title="删除" width="500">
        <span>是否删除{{ deleteData.username }}给{{ deleteData.martyrName }}烈士的留言？</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="removeRecord">
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
  justify-content: flex-end;
  height: 50px;
}

:deep(.record-input) {
  --el-input-bg-color: rgb(255, 240, 240);
  --el-input-text-color: red;
  --el-input-border-color: rgb(255, 200, 200);
  --el-input-hover-border-color: rgb(255, 150, 150);
  --el-input-focus-border-color: red;
}

:deep(.record-input) ::-webkit-input-placeholder {
  color: rgb(255, 140, 140) !important;
}

:deep(.record-input) :-moz-placeholder {
  color: rgb(255, 140, 140) !important;
  opacity: 1 !important;
}

:deep(.record-input) ::-moz-placeholder {
  color: rgb(255, 140, 140) !important;
  opacity: 1 !important;
}

:deep(.record-input) :-ms-input-placeholder {
  color: rgb(255, 140, 140) !important;
}

:deep(.record-table) {
  --el-table-header-text-color: red;
  color: red;

  &:hover {
    --el-table-row-hover-bg-color: rgb(255, 240, 240);
  }
}

:deep(.record-pagination) {
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