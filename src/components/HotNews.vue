<script setup>
import {ref} from 'vue';
import {allNewsList} from '@/api/news';

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref()//总条数
const pageSize = ref(5)//每页条数

const hotNewsData = ref([{
  time: ''
}])

const getAllNewsList = async (page, pageSize) => {
  //获取分类列表
  const res = await allNewsList(page, pageSize, '')
  hotNewsData.value = res.data.data
  total.value = res.data.total
}
getAllNewsList(1, 5)
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  getAllNewsList(pageNum.value, pageSize.value)
}

</script>
<template>
  <div style="margin: 20px;">
        <span style="color: red; font-weight: bolder; font-size: x-large;">
            当前位置：热点资讯
        </span>
  </div>
  <el-card style="margin: 20px;">
    <div v-for="(item, index) in hotNewsData" :key="index">
      <div class="hot-news-contain">
        <div class="hot-news-img">
          <img :src="item.img"/>
        </div>
        <div class="hot-news-content">
                    <span>
                        <router-link class="news-title"
                                     :to="{ path: '/memorial/hotNewsDetail', query: { id: item.id } }">{{
                            item.title
                          }}</router-link>
                    </span>
          <p>{{ item.subtitle }}</p>
        </div>
        <div class="hot-news-time">
          <p>发布时间：{{ item.time.substring(0, 10) }}</p>
        </div>
      </div>
    </div>
    <el-pagination class="news-pagination" v-model:current-page="pageNum" v-model:page-size="pageSize"
                   layout="jumper, total, prev, pager, next" background :total="total" @current-change="onCurrentChange"
                   style="margin-top: 20px; justify-content:center; margin-bottom: 20px;"/>
  </el-card>
</template>
<style lang="scss" scoped>
.hot-news-contain {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #000;
}

.hot-news-img {
  width: 15%;
}

.hot-news-img > img {
  width: 190px;
  height: 100px;
}

.hot-news-content {
  width: 70%;
  font-size: medium;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  // 标题样式（包含hover效果）
  .news-title {
    font-weight: 600;
    font-size: medium;
    text-decoration: none;
    color: #333;
    line-height: 1.4;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    cursor: pointer; // 鼠标移上去显示手型，提示可点击
    transition: color 0.2s ease; // 颜色过渡动画，更丝滑

    // 鼠标悬浮时颜色变红
    &:hover {
      color: #f00; // 红色
    }
  }
}

.hot-news-content > span {
  font-weight: bold;
}

.hot-news-time {
  width: 12%;
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
</style>