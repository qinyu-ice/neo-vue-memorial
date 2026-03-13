<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const activeIndex = ref('home')
const src = '/src/assets/layout_top.png'
const route = useRoute()
const handleSelect = (key, keyPath) => {
  activeIndex.value = key
}

// 监听路由变化，同步activeIndex
watch(
  () => route.path, // 监听路由path的变化
  (newPath) => {
    // 映射路由path到菜单index
    // 如果路由path是/home，对应index是home
    const pathToIndexMap = {
      '/memorial/home': 'home',
      '/memorial/cityHall': 'cityHall',
      '/memorial/martyrsMuni': 'martyrsMuni',
      '/memorial/martyrsSearchRelatives': 'martyrsSearchRelatives',
      '/memorial/hallMap': 'hallMap',
      '/memorial/updataUser': 'updataUser'
    }
    // 更新activeIndex
    activeIndex.value = pathToIndexMap[newPath]
  },
  { immediate: true } // 立即执行一次，确保初始路由也能同步
)
</script>
<template>
  <el-image :src="src" style="margin: 0px;" />
  <div class="common-layout">
    <el-container>
      <el-header style="padding: 0px; margin-top: -5px;">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#d30101" active-text-color="#ffffff" router>
          <el-menu-item index="home">首页</el-menu-item>
          <el-menu-item index="cityHall">烈士纪念设施</el-menu-item>
          <el-menu-item index="martyrsMuni">烈士英名录</el-menu-item>
          <el-menu-item index="martyrsSearchRelatives">烈士寻亲</el-menu-item>
          <el-menu-item index="hallMap">地图全览</el-menu-item>
          <el-menu-item index="updataUser">用户</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer class="footer-div">
        <div style="height: 100%;margin-top: 20px; margin-bottom: 20px;">
          <div>主办单位：xxxxxxxxxxxxxxxxxxxx</div><br>
          <div>承办单位：xxxxxxxxxxxxxxxxxxxx</div><br>
          <div>ICP备案编号：xxxxxxxxxxxxxxxxxxxx</div><br>
          <div class="footer-link">友情链接：
            <div><a href="https://www.chinamartyrs.gov.cn/" target="_blank">中华英烈网</a>|</div>
            <div><a href="https://yinglie.chinamartyrs.gov.cn/25qm/" target="_blank">中国人民革命烈士纪念网</a>|</div>
            <div><a href="https://dva.sc.gov.cn/" target="_blank">省退役军人事务厅官网</a>|</div>
            <div><a href="https://www.zjgmls.net/" target="_blank">浙江革命烈士纪念馆</a>|</div>
            <div><a href="https://www.sdmartyrs.cn/" target="_blank">山东英烈网</a></div>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>


<style scoped>
.el-menu--horizontal>.el-menu-item.is-active {
  background-color: white;
  color: #c82625 !important;

}

.el-menu--horizontal>.el-menu-item {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  padding-top: 0px;
  font-size: medium;
  font-weight: 600;
  height: 60px;
  width: 253px;
  border: none;
  color: white;

  &:hover {
    background-color: white;
    color: #c82625 !important;
    font-size: larger;
  }
}

.el-container {
  width: 100%;
  margin: 0px;
}

.el-menu--horizontal {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #d30101;
}

.footer-div {
  height: 100%;
  background-color: #eee;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 0px;
  /* background-color: aliceblue; */
}

:root {
  --el-rate-void-color: red;
  --el-rate-fill-color: blue;
}

.el-main {
  --el-main-padding: 0px;
  box-sizing: border-box;
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  padding: var(--el-main-padding);
}

.footer-link {
  display: flex;
}
</style>