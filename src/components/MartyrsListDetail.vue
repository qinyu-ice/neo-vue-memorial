<script setup>
const src = "https://www.scmartyrs.cn/static/img/bg.8f034237.png"
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const showBigImage = ref(false);
const flag = ref(0)
const textarea = ref('')
//控制抽屉是否显示
const visibleDrawer = ref(false)
const martyrDetail = ref({
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
});
const leaveMessage = ref({
    userId: '',
    martyrId: '',
    flower: '',
    message: ''
})

import { martyrLeaveMessage } from '@/api/martyrs'
import { useTokenStore } from '@/stores/token'
const martyrLeaveMessageAdd = async () => {
    leaveMessage.value.userId = useTokenStore().userInfo.id
    leaveMessage.value.martyrId = +route.query.id
    leaveMessage.value.flower = flag.value
    leaveMessage.value.message = textarea.value
    martyrLeaveMessage(leaveMessage.value)

    // const Piii = require('piii')
    // const piiiFilters = require('piii-filters')

    // const piii = new Piii({
    //     filters: [
    //         ...Object.values(piiiFilters)
    //     ]
    // });

    // leaveMessage.value.message = piii.filter(textarea.value);

    visibleDrawer.value = false
    textarea.value = ''
    flag.value = 0
    show1.value = false
    show2.value = false
    show3.value = false
    ElMessage.success('发布成功')
}


const showFlower = () => {
    flag.value++;
    if (flag.value == 1) {
        show1.value = true
        ElMessage.success('献花成功')
    } else if (flag.value == 2) {
        show2.value = true
        ElMessage.success('献花成功')
    } else if (flag.value == 3) {
        show3.value = true
        ElMessage.success('献花次数已达限制,请勿重复点击')
    }
}

import { martyrsDetail } from '@/api/martyrs'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// 获取烈士详情数据
const loadMartyrDetail = async () => {
    try {
        const id = route.query.id;
        const res = await martyrsDetail(id);
        if (res && res.data) {
            martyrDetail.value = res.data;
        } else {
            ElMessage.error('无法获取烈士详情数据');
        }
        if (martyrDetail.value.gender == 1) {
            martyrDetail.value.gender = '男'
        } else if (martyrDetail.value.gender == 2) {
            martyrDetail.value.gender = '女'
        }
    } catch (error) {
        console.error('获取烈士详情失败:', error);
        ElMessage.error('获取烈士详情失败，请稍后再试');
    }
};

const options = [
    {
        value: '缅怀革命先烈，纪念烈士，致敬英雄！',
        label: '缅怀革命先烈，纪念烈士，致敬英雄！'
    },
    {
        value: '英烈忠义传万代，后辈敬仰永记心，革命精神不敢忘，振国兴邦抒豪情！',
        label: '英烈忠义传万代，后辈敬仰永记心，革命精神不敢忘，振国兴邦抒豪情！'
    },
    {
        value: '清明笛响震长空，国举同哀悼烈忠。执甲逆行天使勇，施德顺义楚乡荣。沉疴败退苍间净，霾雾尽消日月明。抗疫牺牲酬壮志，国人躬默敬英雄！',
        label: '清明笛响震长空，国举同哀悼烈忠。执甲逆行天使勇，施德顺义楚乡荣。沉疴败退苍间净，霾雾尽消日月明。抗疫牺牲酬壮志，国人躬默敬英雄！'
    },
    {
        value: '忠骨入土英名在，幸福铭记先辈恩！',
        label: '忠骨入土英名在，幸福铭记先辈恩！'
    },
    {
        value: '先烈舍身卫家国，浩气长存天地间，传承红色薪火路，振兴中华勇向前！',
        label: '先烈舍身卫家国，浩气长存天地间，传承红色薪火路，振兴中华勇向前！'
    },
    {
        value: '清明祭语寄长空，万众含悲敬烈忠。白衣执甲临危勇，赤胆为民耀世荣。驱散阴霾天地阔，换来家国山河明。舍身抗疫昭青史，千古流传颂伟英！',
        label: '清明祭语寄长空，万众含悲敬烈忠。白衣执甲临危勇，赤胆为民耀世荣。驱散阴霾天地阔，换来家国山河明。舍身抗疫昭青史，千古流传颂伟英！'
    },
    {
        value: '追思先烈功绩，弘扬爱国精神，致敬无畏英雄，砥砺奋勇前行！',
        label: '追思先烈功绩，弘扬爱国精神，致敬无畏英雄，砥砺奋勇前行！'
    }
]

const goToMartyr = () => {
    router.push('/memorial/martyrsMuni')
}

loadMartyrDetail();
</script>

<template>
    <div style="margin: 20px;">
        <span>
            当前位置：
            <span class="text-info" @click="goToMartyr">烈士英名录</span>
            > {{ martyrDetail.name }}
        </span>
    </div>
    <div style="display: flex;justify-content: center;width: 100%;">
        <el-card style="width: 100%;background:url('https://www.scmartyrs.cn/static/img/bg.8f034237.png');">
            <div style="display: flex;justify-content: space-around;margin-bottom: 40px;">
                <div style="margin-top: 50px;">
                    <div style="display: flex;width: 100%;justify-content: left;flex-wrap: wrap;">
                        <div class="subtitle">
                            基 本 信 息
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                            <span class="field">
                                性别:
                            </span>
                            <span style="color: #ffffff;font-size: medium;">
                                {{ martyrDetail.gender }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                            <span class="field">
                                籍贯:
                            </span>
                            <span style="color: #ffffff;font-size: medium;">
                                {{ martyrDetail.hometown }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                            <span class="field">
                                政治面貌:
                            </span>
                            <span style="color: #ffffff;font-size: medium;">
                                {{ martyrDetail.politicsStatus }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                            <span class="field">
                                出生日期:
                            </span>
                            <span style="color: #ffffff;font-size: medium;">
                                {{ martyrDetail.birthDate }}
                            </span>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <div style="display: flex;justify-content: left;flex-wrap: wrap;margin-top: 20px;">
                            <div class="subtitle">
                                生 前 情 况
                            </div>
                            <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                                <span class="field">
                                    生前单位:
                                </span>
                                <span style="color: #ffffff;font-size: medium;">
                                    {{ martyrDetail.dept }}
                                </span>
                            </div>
                            <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                                <span class="field">
                                    生前职位:
                                </span>
                                <span style="color: #ffffff;font-size: medium;">
                                    {{ martyrDetail.position }}
                                </span>
                            </div>
                            <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                                <span class="field">
                                    立功情况:
                                </span>
                                <span style="color: #ffffff;font-size: medium;">
                                    {{ martyrDetail.achievement }}
                                </span>
                            </div>
                        </div>
                        <div style="display: flex;flex-wrap: wrap;margin-top: 20px;">
                            <div class="subtitle">
                                牺 牲 情 况
                            </div>
                            <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                                <span class="field">
                                    牺牲时间:
                                </span>
                                <span style="color: #ffffff;font-size: medium;">
                                    {{ martyrDetail.deathDate }}
                                </span>
                            </div>
                            <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                                <span class="field">
                                    牺牲战役:
                                </span>
                                <span style="color: #ffffff;font-size: medium;">
                                    {{ martyrDetail.deathCampaign }}
                                </span>
                            </div>
                            <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                                <span class="field">
                                    牺牲地点:
                                </span>
                                <span style="color: #ffffff;font-size: medium;">
                                    {{ martyrDetail.deathAddress }}
                                </span>
                            </div>
                            <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                                <span class="field">
                                    安葬地:
                                </span>
                                <span style="color: #ffffff;font-size: medium;">
                                    {{ martyrDetail.buryPoint }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 30%;">
                    <div
                        style="width: 100%;display: flex;justify-content: center;margin-top: 50px; margin-bottom: 20px;">
                        <img style="width: 80%;height: 80%; cursor: pointer;" :src="martyrDetail.photo" alt="烈士照片"
                            @click="showBigImage = true; bigImageUrl = martyrDetail.photo">
                    </div>
                    <!-- 图片放大弹窗（遮罩层） -->
                    <div v-if="showBigImage" class="image-preview-mask" @click="showBigImage = false">
                        <img class="big-image" :src="bigImageUrl" alt="放大的烈士照片" @click.stop>
                    </div>
                    <span
                        style="color: #ffffff;font-weight: bold;font-size: xx-large;margin-right: 10px;display: flex;justify-content: center;">
                        {{ martyrDetail.name }}
                    </span>
                    <span style="margin-top: 50px; display: flex; justify-content: center;">
                        <el-button class="memorial-button" type="danger" Plain @click="visibleDrawer = true">
                            <template #icon>
                                <img src="/src/assets/candle.png" class="candle-icon" />
                            </template>
                            祭奠先烈
                        </el-button>
                    </span>
                </div>
            </div>
            <div style="display: flex;width: 75%;justify-content: left;flex-wrap: wrap;margin-top: 20px;">
                <div class="subtitle">
                    烈 士 事 迹
                </div>
                <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                    <span
                        style="color: #ffffff;font-weight: bold;font-size: medium;margin-right: 10px;text-indent: 2em;">
                        {{ martyrDetail.deeds }}
                    </span>
                </div>
            </div>
            <div style="margin-top: 50px;">
                <span style="margin-bottom: 20px; font-size: large; color: #c82625; font-weight: bold; ">温馨提示：</span>
                <span style="color: #ffffff">
                    烈士信息在整理完善过程中，若发现信息缺失或有误，欢迎指正！
                </span>
            </div>
            <!-- 抽屉 -->
            <el-drawer v-model="visibleDrawer" title="致敬英烈" direction="rtl" size="50%"
                style="background:url('https://www.scmartyrs.cn/static/img/bg.8f034237.png');">
                <template #header="{ close, titleId, titleClass }">
                    <h2 :id="titleId" :class="titleClass"
                        style="color: #a11a1a;font-weight: bold;font-size: x-large;margin-left: 40px;">
                        祭奠先烈&nbsp;&nbsp;&nbsp;致敬英烈
                    </h2>
                </template>
                <div style="width: 100%;display: flex;justify-content: center;">
                    <div
                        style="width: 90%;border:5px solid #f5d94c;height: 40vh;display: flex;justify-content: space-around;">
                        <div style="width: 40%;display: flex;justify-content: center;">
                            <img style="margin-top: 40px; width: 150px;height: 200px;" :src="martyrDetail.photo" alt="">
                        </div>
                        <div style="width: 60%;">
                            <div
                                style="margin-top: 40px;width: 90%;display: flex;font-size: large;color: #f5d94c;font-weight: bold;">
                                {{ martyrDetail.name }}烈士
                            </div>
                            <div style="margin-top: 10px;width: 90%;display: flex;font-size: medium;color: #ffffff;">
                                {{ martyrDetail.deeds }}
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 100%; display: flex; justify-content: center; margin-top: 25px;">
                    <div style="width: 100%; height: 70vh; display: flex; justify-content: space-around;">
                        <div style="width: 50%; display: flex; justify-content: center; margin-top: 20px;">
                            <div>
                                <div data-v-112d36e2="" class="bouquetMain">
                                    <transition name="img1">
                                        <img class="img1" v-show="show1" data-v-112d36e2=""
                                            src="https://www.scmartyrs.cn/static/img/bouquet.49c9b37b.png" alt=""
                                            style="width: 90px;height: 160px;position: relative;left:30px;">
                                    </transition>
                                    <transition name="img2">
                                        <img class="img2" v-show="show2" data-v-112d36e2=""
                                            src="https://www.scmartyrs.cn/static/img/bouquet.49c9b37b.png" alt=""
                                            style="width: 90px;height: 160px;position: relative;left:0px;">
                                    </transition>
                                    <transition name="img3">
                                        <img class="img3" v-show="show3" data-v-112d36e2=""
                                            src="https://www.scmartyrs.cn/static/img/bouquet.49c9b37b.png" alt=""
                                            style="width: 90px;height: 160px;position: relative;left:-40px;">
                                    </transition>
                                </div>
                                <div style="margin-top: 30px;display: flex;justify-content: center;">
                                    <button data-v-112d36e2="" class="bouquetButImg">
                                        <img src="../assets/flower.png"
                                            style="width: 100px;height: 90px;margin-left: 6px;">
                                    </button>
                                </div>
                                <div style="margin-top: 10px;display: flex;justify-content: center;">
                                    <el-button @click="showFlower" type="danger" text
                                        style="font-weight: bold; font-size: medium; color: #c82625;">
                                        献花
                                    </el-button>
                                </div>
                            </div>
                        </div>
                        <div style="width: 50%;display: flex;justify-content: center;margin-top: 50px;">
                            <div>
                                <el-select v-model="textarea" placeholder="请选择留言模板"
                                    style="width: 300px; margin-left: 5px;">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                                <el-input v-model="textarea" style="width: 300px;" :rows="8" type="textarea"
                                    placeholder="请输入留言" />
                                <div style="display: flex; justify-content: center; margin-top: 20px;">
                                    <el-button type="danger" text
                                        style="font-weight: bold; font-size: medium; color: #c82625;"
                                        @click="martyrLeaveMessageAdd">
                                        发布留言
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </el-drawer>

        </el-card>
    </div>


</template>

<style scoped>
.text-info {
    &:hover {
        color: red;
        cursor: pointer;
        transition: all 0.2s ease;
    }
}

.el-textarea {
    display: inline-block;
    font-size: 14px;
    position: relative;
    vertical-align: bottom;
    width: 100%;
    border: 5px solid #000;
    color: #fff;
}

/* 全屏遮罩层样式 */
.image-preview-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    /* 半透明黑色背景 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    /* 确保遮罩层在最上层 */
}

/* 放大后的图片样式（保持比例，不超出屏幕） */
.big-image {
    max-width: 90vw;
    /* 最大宽度为视口90% */
    max-height: 90vh;
    /* 最大高度为视口90% */
    object-fit: contain;
    /* 保持图片比例，不拉伸变形 */
}

.bouquetMain img[data-v-112d36e2]:last-child {
    left: 250px;
    top: 30px;
    transform: rotate(30deg) scale(.8);
    z-index: 1;
}

.bouquetMain img[data-v-112d36e2]:nth-child(2) {
    left: 170px;
    z-index: 2;
}

.bouquetMain img[data-v-112d36e2]:first-child {
    left: 80px;
    top: 20px;
    transform: rotate(330deg) scale(.9);
    z-index: 1;
}

.bouquetButImg[data-v-112d36e2] {
    background-color: hsla(0, 0%, 100%, .5);
    border: 1px solid #ffed7f;
    border-radius: 50%;
    cursor: pointer;
    height: 100px;
    line-height: 100px;
    margin: 10px auto;
    width: 100px;
    display: flex;
    justify-content: center;
}

.subtitle {
    margin-bottom: 20px;
    padding-left: 10px;
    width: 100%;
    display: flex;
    justify-content: left;
    font-size: large;
    color: #c82625;
    font-weight: bold;
    border-left: 5px solid #c82625;
}

.field {
    color: #ffffff;
    font-weight: bold;
    font-size: medium;
    margin-right: 10px;
    margin-left: 15px;
}

:deep(.memorial-button) {
    --el-button-bg-color: #c82625;
    --el-button-border-color: #c82625;
    font-size: large;
    width: 150px;
    height: 50px;
}

.candle-icon {
    width: 30px;
    height: 30px;
    vertical-align: middle;
}
</style>