<script setup>
import {ref, shallowRef, reactive} from 'vue'
import {ElMessage} from 'element-plus'
import {Edit, Delete, UploadFilled, Location} from '@element-plus/icons-vue'
import {cityHallPage, uploadCityHallImage, addCityHall, updateCityHall, deleteCityHall} from '@/api/cityHall'
import {Search} from '@element-plus/icons-vue'
import AMap from './AMap.vue'

const tableData = ref([
  {
    id: '',
    name: '',
    img: '',
    longitude: '',
    latitude: '',
    introduction: '',
    phone: '',
    address: '',
    hint: ''
  }
])
const initEditData = () => ({
  name: '',
  img: '',
  longitude: '',
  latitude: '',
  introduction: '',
  phone: '',
  address: '',
  hint: ''
})
const editData = ref(initEditData()) // 初始化编辑数据
const addData = ref({
  name: '',
  img: '',
  longitude: '',
  latitude: '',
  introduction: '',
  phone: '',
  address: '',
  hint: ''
})
//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref()//总条数
const pageSize = ref(5)//每页条数

const tableLoading = ref(true)
const showEditDialog = ref(false)
const showAddDialog = ref(false)
const showDeleteDialog = ref(false)
const showSearchBox = ref(false)
const showAddLocation = ref(false)
const showEditLocation = ref(false)
const searchAddress = ref()
const mapCenter = ref([107.484767, 31.211277]);
const mapZoom = ref(13);
const mapInstance = shallowRef(null);
const geocoder = shallowRef(null);
const isAddMode = ref(true)
const fileInput = ref(null)
const uploadUrl = ref()
const addFormRef = ref()
const editFormRef = ref()
const deleteData = ref()
const placeName = ref('')
const currentSearchKeyword = ref('')
const showPreview = ref(false)
const previewImg = ref('')

const formRules = reactive({
  name: [
    {required: true, message: '请输入名称', trigger: 'blur'}
  ],
  longitude: [
    {required: true, message: '请输入经度', trigger: 'blur'}
  ],
  latitude: [
    {required: true, message: '请输入纬度', trigger: 'blur'}
  ],
  introduction: [
    {required: true, message: '请输入介绍', trigger: 'blur'}
  ],
  phone: [
    {required: true, message: '请输入手机号或座机号', trigger: 'blur'},
    {
      pattern: /^(1[3-9]\d{9})|(\d{3,4}-\d{7,8})$/,
      message: '请输入正确的11位手机号或座机号（格式如：0818-5984363）',
      trigger: 'blur'
    }
  ],
  address: [
    {required: true, message: '请输入地址', trigger: 'blur'}
  ],
  hint: [
    {required: true, message: '请输入乘车提示', trigger: 'blur'}
  ]
})

const getCityHallPage = async (page, pageSize, name = '') => {
  //获取分类列表
  const searchName = name || currentSearchKeyword.value
  const res = await cityHallPage(page, pageSize, searchName)
  if (res.code === 200 && res.data.data != null) {
    tableLoading.value = false
  }
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
    console.error('表单校验失败：', error)
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
  editData.value = {...row}
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

  const result = await uploadCityHallImage(formData)
  uploadUrl.value = result.data

  // 清空文件选择框的值，确保同一文件可以重复选择
  e.target.value = ''
}

const remove = (row) => {
  deleteData.value = {...row}
  showDeleteDialog.value = true
}

const removeCityHall = async () => {
  try {
    const result = await deleteCityHall(deleteData.value.id)
    showDeleteDialog.value = false
    ElMessage.success(result.msg)
    pageNum.value = 1
    pageSize.value = 5
    await getCityHallPage(pageNum.value, pageSize.value)
  } catch (error) {
    ElMessage.error('删除失败')
    console.error('error：', error)
  }
}

// 打开新增地址弹窗时标记为新增模式
const getAddLocation = () => {
  showAddLocation.value = true
  isAddMode.value = true
  // 重置地图中心点为默认值
  mapCenter.value = [107.484767, 31.211277]
  mapZoom.value = 16
}

// 打开编辑地址弹窗时标记为编辑模式，并初始化地图中心点
const getEditLocation = () => {
  showEditLocation.value = true
  isAddMode.value = false
  // 用编辑数据初始化地图中心点
  if (editData.value.longitude && editData.value.latitude) {
    mapCenter.value = [Number(editData.value.longitude), Number(editData.value.latitude)]
    mapZoom.value = 16
  } else {
    mapCenter.value = [107.484767, 31.211277]
    mapZoom.value = 16
  }
}

// 地图初始化完成：创建地理编码实例 + 编辑模式标记点
const onMapInit = (map) => {
  mapInstance.value = map;

  // 1. 初始化地理编码插件
  geocoder.value = new window.AMap.Geocoder({
    city: '511700', // 达州市行政区划代码，更精准
    radius: 2000,
    extensions: 'all'
  });

  // 2. 编辑模式下：如果有经纬度，添加标记点
  if (!isAddMode.value && editData.value.longitude && editData.value.latitude) {
    const lng = Number(editData.value.longitude);
    const lat = Number(editData.value.latitude);

    // 校验经纬度有效性
    if (!isNaN(lng) && !isNaN(lat)) {
      // 创建标记点
      const marker = new window.AMap.Marker({
        position: [lng, lat],
        map: map, // 绑定到当前地图实例
        title: editData.value.name || '当前位置', // 标记点标题（可选）
        icon: new window.AMap.Icon({ // 自定义标记图标（可选）
          size: new window.AMap.Size(25, 34),
          image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          imageSize: new window.AMap.Size(25, 34)
        })
      });

      // 地图聚焦到标记点
      map.setCenter([lng, lat]);
      map.setZoom(15);
    }
  }

  // 3. 保留手动选点功能
  map.on('click', (e) => {
    const lng = e.lnglat.getLng().toFixed(6);
    const lat = e.lnglat.getLat().toFixed(6);
    mapCenter.value = [lng, lat];
    ElMessage.info(`已选中该位置：经度 ${lng}，纬度 ${lat}（点击「获取经纬度」即可填充）`);

    // 清除旧标记 + 添加新标记
    map.clearMap();
    new window.AMap.Marker({
      position: [lng, lat],
      map: map
    });
  });
};

const searchAddressToMap = async () => {
  if (!searchAddress.value) {
    ElMessage.warning('请输入具体地址');
    return;
  }
  if (!window.AMap) {
    ElMessage.error('高德地图未加载完成，请刷新页面重试');
    return;
  }

  // 精准配置：限定到达州市，提高解析精度
  const geocoder = new window.AMap.Geocoder({
    city: '511700', // 达州市行政区划代码
    radius: 2000,   // 搜索半径
    extensions: 'all' // 返回完整解析结果
  });

  geocoder.getLocation(searchAddress.value, (status, result) => {
    // 基础状态校验
    if (status !== 'complete' || result.info !== 'OK') {
      ElMessage.error(`地址解析失败：${result?.info || '地址不存在或格式错误'}`);
      return;
    }

    // 兼容两种返回格式
    let lng, lat;
    // 格式1：直接返回 position
    if (result.position) {
      lng = result.position.lng;
      lat = result.position.lat;
    }
    // 格式2：返回 geocodes 数组
    else if (result.geocodes && result.geocodes.length > 0) {
      const firstResult = result.geocodes[0];
      if (firstResult.location) {
        lng = firstResult.location.lng;
        lat = firstResult.location.lat;
      }
    }

    // 最终经纬度校验
    if (!lng || !lat || isNaN(lng) || isNaN(lat)) {
      ElMessage.error(`地址解析失败：未获取到有效经纬度，请尝试更具体的地址（如：达州市通川区XX路XX号）`);
      // 兜底：定位到达州市中心
      mapCenter.value = [107.484767, 31.211277];
      mapZoom.value = 12;
      return;
    }

    // 地图定位 + 标记
    try {
      mapCenter.value = [lng, lat];
      mapZoom.value = 15;

      if (mapInstance.value) {
        mapInstance.value.clearMap(); // 清除旧标记
        // 添加标记点并自定义样式
        const marker = new window.AMap.Marker({
          position: [lng, lat],
          map: mapInstance.value,
          title: searchAddress.value,
          icon: new window.AMap.Icon({
            size: new window.AMap.Size(25, 34),
            image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            imageSize: new window.AMap.Size(25, 34)
          })
        });
        // 自动聚焦到标记点
        mapInstance.value.setCenter([lng, lat]);
      }
      ElMessage.success(`定位成功：经度 ${lng.toFixed(6)}，纬度 ${lat.toFixed(6)}`);
    } catch (err) {
      ElMessage.error(`定位失败：${err.message}`);
      console.error('定位失败详情：', err);
    }
  });
};

// 获取经纬度并自动填充到表单
const getLngAndLat = () => {
  if (!mapInstance.value) {
    ElMessage.error('地图未初始化完成');
    return;
  }
  const center = mapInstance.value.getCenter();
  const lng = center.getLng().toFixed(6);
  const lat = center.getLat().toFixed(6);

  // 根据模式填充到新增/编辑表单
  if (isAddMode.value) {
    addData.value.longitude = lng
    addData.value.latitude = lat
    showAddLocation.value = false
    searchAddress.value = ''
  } else {
    editData.value.longitude = lng
    editData.value.latitude = lat
    showEditLocation.value = false
    searchAddress.value = ''
  }

  ElMessage.success(`经纬度已填充：经度${lng}，纬度${lat}`);
};

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

const handleCloseMap = (done) => {
  searchAddress.value = ''
  done && done()
}
</script>
<template>
  <div class="place-manage">
    <div v-loading="tableLoading" class="table">
      <div class="table-top">
        <el-button type="danger" @click="add">新增</el-button>
        <div>
          <el-input class="place-input" v-if="showSearchBox" v-model="placeName"
                    style="width: 150px; margin-right: 10px;" placeholder="请输入设施名称"/>
          <el-icon @click="searchCityHall">
            <Search style="color: red;"/>
          </el-icon>
        </div>
      </div>
      <el-table class="place-table" :data="tableData" border>
        <el-table-column label="序号" width="80" align="center">
          <template #default="scoped">
            {{ (pageNum - 1) * pageSize + scoped.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="200"/>
        <el-table-column prop="img" label="图片" width="110">
          <template #default="scope">
            <img :src="scope.row.img" alt="展示图片" @click="openPreview(scope.row.img)"
                 style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;">
          </template>
        </el-table-column>
        <el-table-column prop="introduction" label="介绍" width="180" show-overflow-tooltip/>
        <el-table-column prop="phone" label="电话" width="120"/>
        <el-table-column prop="address" label="地址" width="300" show-overflow-tooltip/>
        <el-table-column prop="hint" label="乘车提示" width="150" show-overflow-tooltip/>
        <el-table-column class="operation" label="操作" width="130">
          <template #default="scope">
            <el-link type="danger" :icon="Edit" @click="edit(scope.row)" class="operation-link">修改</el-link>
            <el-link type="danger" :icon="Delete" @click="remove(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 图片放大预览 -->
      <div v-if="showPreview" class="preview-mask" @click="closePreview" @keyup.esc="closePreview" tabindex="0">
        <img :src="previewImg" class="preview-img"/>
      </div>
      <el-pagination class="place-pagination" v-model:current-page="pageNum" v-model:page-size="pageSize"
                     layout="jumper, total, prev, pager, next" background :total="total"
                     @current-change="onCurrentChange"
                     style="margin-top: 50px; justify-content:center; margin-bottom: 50px;"/>
    </div>
    <!-- 新增弹窗 -->
    <div>
      <el-dialog v-model="showAddDialog" title="新增" width="500" :before-close="handleClose">
        <el-form :model="addData" :rules="formRules" ref="addFormRef" label-width="auto"
                 style="max-width: 600px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="addData.name"/>
          </el-form-item>
          <el-form-item label="图片" prop="img">
            <el-icon v-if="!uploadUrl" :size="20" @click="upload">
              <UploadFilled/>
              <el-input ref="fileInput" type="file" accept="image/*" style="display: none"
                        @change="handleFileChange"/>
            </el-icon>
            <input ref="fileInput" type="file" accept="image/*" style="display: none"
                   @change="handleFileChange"/>
            <img v-if="uploadUrl" :src="uploadUrl"
                 style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;" @click="upload">
          </el-form-item>
          <div class="location">
            <div>
              <el-form-item label="经度" prop="longitude">
                <el-input style="width: 360px" v-model="addData.longitude"/>
              </el-form-item>
              <el-form-item label="纬度" prop="latitude">
                <el-input style="width: 360px" v-model="addData.latitude"/>
              </el-form-item>
            </div>
            <el-form-item>
              <el-icon :size="20" style="margin-left: 20px;" @click="getAddLocation">
                <Location/>
              </el-icon>
              <el-dialog title="获取经纬度" v-model="showAddLocation" :before-close="handleCloseMap">
                <el-input style="margin-bottom: 10px;" v-model="searchAddress" placeholder="请输入搜索地址"
                          @keyup.enter="searchAddressToMap"></el-input>
                <AMap :center="mapCenter" :zoom="mapZoom" :visible="showAddLocation"
                      @init="onMapInit"/>
                <div class="button">
                  <el-button type="primary" @click="getLngAndLat">获取经纬度</el-button>
                </div>
              </el-dialog>
            </el-form-item>
          </div>
          <el-form-item label="介绍" prop="introduction">
            <el-input type="textarea" autosize v-model="addData.introduction"/>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="addData.phone"/>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="addData.address"/>
          </el-form-item>
          <el-form-item label="乘车提示" prop="hint">
            <el-input type="textarea" autosize v-model="addData.hint"/>
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
            <el-input v-model="editData.name"/>
          </el-form-item>
          <el-form-item label="图片" prop="img">
            <input ref="fileInput" type="file" accept="image/*" style="display: none"
                   @change="handleFileChange"/>
            <img :src="uploadUrl ? uploadUrl : editData.img" alt="展示图片"
                 style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;" @click="upload">
          </el-form-item>
          <div class="location">
            <div>
              <el-form-item label="经度" prop="longitude">
                <el-input style="width: 360px" v-model="editData.longitude"/>
              </el-form-item>
              <el-form-item label="纬度" prop="latitude">
                <el-input style="width: 360px" v-model="editData.latitude"/>
              </el-form-item>
            </div>
            <el-form-item>
              <el-icon :size="20" style="margin-left: 20px;" @click="getEditLocation">
                <Location/>
              </el-icon>
              <el-dialog title="获取经纬度" v-model="showEditLocation" :before-close="handleCloseMap">
                <el-input style="margin-bottom: 10px;" v-model="searchAddress" placeholder="请输入搜索地址"
                          @keyup.enter="searchAddressToMap"></el-input>
                <AMap :center="mapCenter" :zoom="mapZoom" :visible="showEditLocation"
                      @init="onMapInit"/>
                <div class="button">
                  <el-button type="primary" @click="getLngAndLat">获取经纬度</el-button>
                </div>
              </el-dialog>
            </el-form-item>
          </div>
          <el-form-item label="介绍" prop="introduction">
            <el-input type="textarea" autosize v-model="editData.introduction"/>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="editData.phone"/>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="editData.address"/>
          </el-form-item>
          <el-form-item label="乘车提示" prop="hint">
            <el-input type="textarea" autosize v-model="editData.hint"/>
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
        <span>是否删除{{ deleteData.name }}？</span>
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
  height: 50px;
}

:deep(.place-input) {
  --el-input-bg-color: rgb(255, 240, 240);
  --el-input-text-color: red;
  --el-input-border-color: rgb(255, 200, 200);
  --el-input-hover-border-color: rgb(255, 150, 150);
  --el-input-focus-border-color: red;
}

:deep(.place-input) ::-webkit-input-placeholder {
  color: rgb(255, 140, 140) !important;
}

:deep(.place-input) :-moz-placeholder {
  color: rgb(255, 140, 140) !important;
  opacity: 1 !important;
}

:deep(.place-input) ::-moz-placeholder {
  color: rgb(255, 140, 140) !important;
  opacity: 1 !important;
}

:deep(.place-input) :-ms-input-placeholder {
  color: rgb(255, 140, 140) !important;
}

:deep(.place-table) {
  --el-table-header-text-color: red;
  color: red;

  &:hover {
    --el-table-row-hover-bg-color: rgb(255, 240, 240);
  }
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

:deep(.place-pagination) {
  color: red;
  --el-pagination-hover-color: red;
  --el-pagination-text-color: red;
  --el-pagination-button-bg-color: rgb(255, 200, 200);
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

.location {
  display: flex;
}

.button {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>