<script setup>
import { ref } from 'vue'
const cityHallModel = ref({
    name: '',
    img: '',
    introduction: '',
    phone: '',
    address: '',
    hint: ''
})

import { useRoute, useRouter } from 'vue-router'
import { getCityHallInfoById } from '@/api/cityHall'
const route = useRoute()
const router = useRouter()
const id = ref(0)
const init = async () => {
    if (route.query) {
        id.value = route.query.id
        let result = await getCityHallInfoById(id.value)
        cityHallModel.value = result.data
    } else {
        console.error('没有id')
    }
}

const goToPlace = () => {
    router.push('/memorial/cityHall')
}

init()
const centerDialogVisible = ref(false)
</script>

<template>
    <div style="margin: 20px;">
        <span>
            当前位置：
            <span class="text-info" @click="goToPlace">烈士纪念设施</span>
            > {{ cityHallModel.name }}
        </span>
    </div>
    <el-card style="margin: 20px;">
        <div style="display: flex;justify-content: space-between;">
            <div style="width: 65%;">
                <div style="border-bottom: 1px solid #ccc;width: 100%;">
                    <span
                        style="width: 100%; color: red; font-weight: bolder; font-size: medium; border-bottom:3px solid red;">{{
                            cityHallModel.name }}</span>
                </div>
                <div style="width: 100%; margin-top: 20px; display: flex; justify-content:space-around;">
                    <div style="display: flex; justify-content: left;">
                        <img :src=cityHallModel.img alt="" style="width: 35vh;height: 35vh;">
                    </div>
                    <div>
                        <div class="two-line-ellipsis" style="width: 90vh; height:11vh; font-size: medium;">
                            <p>
                                {{ cityHallModel.introduction }}
                            </p>
                        </div>
                        <p style="width: 100%;">
                            <span style="display: flex; justify-content: end;">
                                <el-button @click="centerDialogVisible = true" type="danger" plain
                                    style="height: 30px; font-size: medium;">查看更多 >></el-button>
                            </span>
                        </p>
                        <div style="margin-top: 20px; width: 100%;">
                            <span style="color: red; font-size: medium; font-weight: bold;">
                                设施荣誉
                            </span>
                        </div>
                        <div data-v-5d524d16="" id="baseBox" class="baseBox">
                            <span data-v-5d524d16="" class="base">国家级烈士纪念设施</span>
                            <span data-v-5d524d16="" class="base">省级爱国主义教育基地</span>
                            <span data-v-5d524d16="" class="base">省级国防教育基地</span>
                        </div>
                    </div>
                </div>

                <div>

                </div>
            </div>
            <div style="width: 30%;">
                <div class="box">
                    <div>
                        <div data-v-5d524d16="" class="guide">祭奠瞻仰指南</div>
                        <el-scrollbar style="height: 28vh;width:40vh;background: '';">
                            <p>
                                <span style="line-height: 1.75;font-size: small;">
                                    一、免费开放、文明祭扫（奠）、禁燃禁放；
                                </span>
                            </p>
                            <p>
                                <span style="line-height: 1.75;font-size: small;">
                                    二、陈列馆开放时间：9：00--16：30（星期二至星期日，星期一为闭馆维护日）；法定节假日、重要纪念日照常开放，临时闭馆提前告知；
                                </span>
                            </p>
                            <p>
                                <span style="line-height: 1.75;font-size: small;">
                                    三、来园祭扫（奠）或开展教育活动的单位和团体，请提前预约;
                                </span>
                            </p>
                            <p>
                                <span style="line-height: 1.75;font-size: small;">
                                    四、衣着整洁、仪容仪表得当、举止文明、保持肃静。
                                </span>
                            </p>
                        </el-scrollbar>
                    </div>
                </div>

            </div>
        </div>
        <div style="width: 50%;margin-top: 50px;">
            <div style="border-bottom: 1px solid #ccc;width: 100%;">
                <span
                    style="width: 100%;color: red;font-weight: bolder;font-size: medium;border-bottom:3px solid red;">联系方式和地址</span>
            </div>
            <div style="margin-top: 10px;">
                <div style="font-size: medium;font-weight: bold;">{{ cityHallModel.name }}</div>
                <div style="font-size: medium;margin-top: 3px;">电话：{{ cityHallModel.phone }}</div>
                <div style="font-size: medium;margin-top: 3px;">地址：{{ cityHallModel.address }}</div>
                <div style="font-size: medium;margin-top: 3px;">乘车提示：{{ cityHallModel.hint }}</div>
            </div>
        </div>
        <el-dialog v-model="centerDialogVisible" title="详细信息" width="500" center>
            <span>
                {{ cityHallModel.introduction }}
            </span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="danger" @click="centerDialogVisible = false">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </el-card>


</template>

<style scoped>
.text-info {
    &:hover {
        color: red;
        cursor: pointer;
        transition: all 0.2s ease;
    }
}

.guide[data-v-5d524d16] {
    border-bottom: 1px solid #ffffff;
    color: white;
    font-size: 18px;
    font-weight: 600;
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding-top: 6px;
    width: 40vh;
}

.box {
    display: flex;
    justify-content: center;
    height: 240px;
    width: 300px;
    background-image: url('../assets/declaration.png');
    margin: 10px;
    color: white;
}

.two-line-ellipsis {
    width: 200px;
    /* 限制容器宽度 */
    display: -webkit-box;
    /* 设置为WebKit内核的弹性盒子模型 */
    -webkit-box-orient: vertical;
    /* 垂直排列 */
    -webkit-line-clamp: 4;
    line-clamp: 4;
    /* 限制显示两行 */
    overflow: hidden;
    /* 隐藏超出范围的内容 */
    text-overflow: ellipsis;
    /* 使用省略号 */
    line-height: 1.5;
    text-indent: 2em;
    font-size: small;
}

.base[data-v-5d524d16] {
    background-color: #c82625;
    border: 4px solid #ddcaaf;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    height: 50px;
    line-height: 50px;
    margin-bottom: 5px;
    margin-top: 15px;
    margin-right: 10px;
    min-width: 100px;
    padding: 0 3px;
    text-align: center;
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}
</style>
