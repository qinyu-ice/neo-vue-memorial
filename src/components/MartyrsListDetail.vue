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
        <el-card
            style="margin: 40px;width: 100%;background:url('https://www.scmartyrs.cn/static/img/bg.8f034237.png');">
            <div style="display: flex;justify-content: space-around;margin-bottom: 40px;">
                <div>
                    <div style="display: flex;width: 70%;justify-content: left;flex-wrap: wrap;">
                        <div
                            style="margin-bottom: 10px;width: 100%;display: flex;justify-content: left;font-size: small;color: #a11a1a;font-weight: bold;">
                            ||基本信息
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                性别:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ martyrDetail.gender }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                籍贯:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ martyrDetail.hometown }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                政治面貌:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ martyrDetail.politicsStatus }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                出生日期:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ martyrDetail.birthDate }}
                            </span>
                        </div>
                    </div>
                    <div style="display: flex;width: 70%;justify-content: left;flex-wrap: wrap;margin-top: 20px;">

                        <div
                            style="margin-bottom: 10px;width: 50%;display: flex;justify-content: left;font-size: small;color: #a11a1a;font-weight: bold;">
                            ||生前情况
                        </div>
                        <div
                            style="margin-bottom: 10px;width: 50%;display: flex;justify-content: left;font-size: small;color: #a11a1a;font-weight: bold;">
                            ||牺牲情况
                        </div>
                        <div style="width: 50%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                生前单位:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ martyrDetail.dept }}
                            </span>
                        </div>
                        <div style="width: 50%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                牺牲时间:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ martyrDetail.deathDate }}
                            </span>
                        </div>
                        <div style="width: 50%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                生前职位:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ martyrDetail.position }}
                            </span>
                        </div>
                        <div style="width: 50%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                牺牲战役:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ martyrDetail.deathCampaign }}
                            </span>
                        </div>
                        <div style="width: 50%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                立功情况:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ martyrDetail.achievement }}
                            </span>
                        </div>
                        <div style="width: 50%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                牺牲地点:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ martyrDetail.deathAddress }}
                            </span>
                        </div>
                        <div style="width: 50%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">

                            </span>
                            <span style="color: #ffffff;font-size: small;">

                            </span>
                        </div>
                        <div style="width: 50%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                安葬地:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ martyrDetail.buryPoint }}
                            </span>
                        </div>
                    </div>
                </div>
                <div style="width: 30%;">
                    <div style="width: 100%;display: flex;justify-content: center;margin-bottom: 10px;">
                        <img style="width: 60%;height: 250px; cursor: pointer;" :src="martyrDetail.photo" alt="烈士照片"
                            @click="showBigImage = true; bigImageUrl = martyrDetail.photo">
                    </div>
                    <!-- 图片放大弹窗（遮罩层） -->
                    <div v-if="showBigImage" class="image-preview-mask" @click="showBigImage = false">
                        <img class="big-image" :src="bigImageUrl" alt="放大的烈士照片" @click.stop>
                    </div>
                    <span
                        style="color: #ffffff;font-weight: bold;font-size: x-large;margin-right: 10px;display: flex;justify-content: center;">
                        {{ martyrDetail.name }}
                    </span>
                    <span style="margin-top: 40px;margin-right: 10px;display: flex;justify-content: center;">
                        <el-button type="danger" Plain @click="visibleDrawer = true">祭奠先烈</el-button>
                    </span>
                </div>
            </div>
            <div
                style="margin-bottom: 10px;width: 100%;display: flex;justify-content: left;font-size: small;color: #a11a1a;font-weight: bold;">
                ||烈士事迹
            </div>
            <div style="width: 70%;display: flex;justify-content: left;margin-bottom: 10px;">
                <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;text-indent: 2em;">
                    {{ martyrDetail.deeds }}
                </span>
            </div>
            <div
                style="margin-bottom: 10px;width: 100%;display: flex;justify-content: left;font-size: small;color: #a11a1a;">
                温馨提示:
            </div>
            <div style="width: 70%;display: flex;justify-content: left;margin-bottom: 10px;">
                <span style="color: #ffffff;font-size: small;margin-right: 10px;text-indent: 2em;">
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
                            <img style="margin-top: 20px; width: 150px;height: 200px;" :src="martyrDetail.photo" alt="">
                        </div>
                        <div style="width: 60%;">
                            <div
                                style="margin-top: 10px;width: 100%;display: flex;font-size: large;color: #f5d94c;font-weight: bold;">
                                {{ martyrDetail.name }}烈士
                            </div>
                            <div style="margin-top: 10px;width: 100%;display: flex;font-size: small;color: #ffffff;">
                                {{ martyrDetail.deeds }}
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 100%;display: flex;justify-content: center;margin-top: 25px;">
                    <div style="width: 100%;height: 70vh;display: flex;justify-content: space-around;">
                        <div style="width: 50%;display: flex;justify-content: center;margin-top: 20px;">
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
                                    <el-button @click="showFlower" type="warning" text
                                        style="font-weight: bold;font-size: medium;">
                                        献花
                                    </el-button>
                                </div>

                            </div>
                        </div>
                        <div style="width: 50%;display: flex;justify-content: center;margin-top: 50px;">
                            <div>
                                <div>
                                    <el-select v-model="textarea" placeholder="Select" size="large"
                                        style="width: 300px">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                    <el-input v-model="textarea" style="width: 300px;" :rows="8" type="textarea"
                                        placeholder="请输入寄语" />
                                </div>
                                <div style="display: flex;justify-content: center;margin-top: 30px;">
                                    <el-button type="warning" text style="font-weight: bold;font-size: medium;"
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
</style>