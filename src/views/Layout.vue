<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const activeIndex = ref('home')
const src = '/src/assets/layout_top.png'
const route = useRoute()
const handleSelect = (key, keyPath) => {
  activeIndex.value = key
  console.log(key, keyPath)
  console.log(activeIndex.value)
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
      <el-header style="padding: 0px;margin-top: -5px;">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#bd0010" active-text-color="#ffffff" router>
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
      <el-footer>
        <div style="height: 100%;margin-top: 50px;">
          <div class="footer-div">主办单位：省退役军人事务厅承办单位：省烈士纪念设施保护中心（省烈士遗骸搜寻鉴定中心）</div><br>
          <div class="footer-div">ICP备案编号：蜀ICP备19003563号</div><br>
          <div class="footer-div">友情链接：中华英烈网|省退役军人事务厅官网|广西英烈网上祭扫|浙江英烈网|山东英烈网</div><br>
          <div class="footer-div"> © 2024.5.21 SiChuanHero Tech and Fun. All rights reserved.</div><br>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>


<style scoped>
.el-menu--horizontal>.el-menu-item {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  padding-top: 0px;
}

.el-container {
  width: 100%;
  margin: 0px;
}

.el-menu--horizontal {
  display: flex;
  /* 启用弹性布局 */
  justify-content: space-around;
  /* 子项自动平均分布间距 */
}

.el-footer {
  height: 150px;
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
</style>