<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getInfoById } from '@/api/info';
import { ref } from 'vue'

const relativesInfoDetail = ref({
    time: ''
})


const route = useRoute()
const router = useRouter()

const getRealtivesInfoDetail = async () => {
    const res = await getInfoById(route.query.id)
    relativesInfoDetail.value = res.data
}

const goToInfo = () => {
    router.push('/memorial/martyrsSearchRelatives')
}

getRealtivesInfoDetail()

</script>
<template>
    <RouterView></RouterView>
    <div style="margin: 20px;">
        <span>
            当前位置：
            <span class="text-info" @click="goToInfo">寻亲信息</span>
            > {{ relativesInfoDetail.title }}
        </span>
    </div>
    <div :data="relativesInfoDetail" style="font-size: 24px; text-align: center;font-weight: bold;">{{
        relativesInfoDetail.title }}</div>
    <div style="text-align: center; margin-top: 10px; display: flex; justify-content: center;">
        <div style="margin-right: 40px;">信息来源：{{ relativesInfoDetail.source }}</div>
        <div>时间：{{ relativesInfoDetail.time.substring(0, 10) }}</div>
    </div>
    <div style="display: flex; justify-content: center; width: 100%;">
        <el-card style="width: 100%;background:url('https://www.scmartyrs.cn/static/img/bg.8f034237.png');">
            <div
                style="display: flex; width: 70%; justify-content: left; flex-wrap: wrap; margin-left: 30px; margin-top: 50px;">
                <div class="subtitle">
                    基 本 信 息
                </div>
                <div style="width: 100%; display: flex; justify-content: left; margin-bottom: 20px;">
                    <span class="field">
                        姓名:
                    </span>
                    <span style="color: #ffffff;font-size: medium;">
                        {{ relativesInfoDetail.name }}
                    </span>
                </div>
                <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                    <span class="field">
                        性别:
                    </span>
                    <span style="color: #ffffff;font-size: medium;">
                        {{ relativesInfoDetail.gender = 1 ? '男' : '女' }}
                    </span>
                </div>
                <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                    <span class="field">
                        籍贯:
                    </span>
                    <span style="color: #ffffff;font-size: medium;">
                        {{ relativesInfoDetail.hometown }}
                    </span>
                </div>
                <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                    <span class="field">
                        出生日期:
                    </span>
                    <span style="color: #ffffff;font-size: medium;">
                        {{ relativesInfoDetail.birthDate }}
                    </span>
                </div>
                <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                    <span class="field">
                        政治面貌:
                    </span>
                    <span style="color: #ffffff;font-size: medium;">
                        {{ relativesInfoDetail.politicsStatus }}
                    </span>
                </div>
                <div style="display: flex;">
                    <div>
                        <div class="subtitle">
                            其 他 信 息 资 料
                        </div>
                        <div style=" width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                            <span class="field">
                                生前部队:
                            </span>
                            <span style="color: #ffffff;font-size: medium;">
                                {{ relativesInfoDetail.dept }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                            <span class="field">
                                牺牲年月:
                            </span>
                            <span style="color: #ffffff;font-size: medium;">
                                {{ relativesInfoDetail.deathDate }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                            <span class="field">
                                牺牲战役或事件:
                            </span>
                            <span style="color: #ffffff;font-size: medium;">
                                {{ relativesInfoDetail.deathCampaign }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                            <span class="field">
                                牺牲地点:
                            </span>
                            <span style="color: #ffffff;font-size: medium;">
                                {{ relativesInfoDetail.deathAddress }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                            <span class="field">
                                其他情况:
                            </span>
                            <span style="color: #ffffff;font-size: medium;">
                                {{ relativesInfoDetail.other }}
                            </span>
                        </div>
                    </div>
                    <div style="margin-left: 400px;">
                        <div class="subtitle">
                            联 系 信 息
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                            <span class="field">
                                姓名:
                            </span>
                            <span style="color: #ffffff;font-size: medium;">
                                {{ relativesInfoDetail.contactName }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                            <span class="field">
                                联系地址:
                            </span>
                            <span style="color: #ffffff;font-size: medium;">
                                {{ relativesInfoDetail.contactAddress }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                            <span class="field">
                                电话:
                            </span>
                            <span style="color: #ffffff;font-size: medium;">
                                {{ relativesInfoDetail.contactPhone }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 20px;">
                            <span class="field">
                                电子邮箱:
                            </span>
                            <span style="color: #ffffff;font-size: medium;">
                                {{ relativesInfoDetail.contactEmail }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 50px;">
                <span
                    style="margin-left: 20px; margin-bottom: 10px; font-size: large; color: #c82625; font-weight: bold; ">温馨提示：</span>
                <span style="color: #ffffff;">烈士信息在整理完善过程中，若发现信息缺失或有误，欢迎指正！</span>
            </div>
        </el-card>
    </div>
</template>
<style lang="scss" scoped>
.text-info {
    &:hover {
        color: red;
        cursor: pointer;
        transition: all 0.2s ease;
    }
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
</style>