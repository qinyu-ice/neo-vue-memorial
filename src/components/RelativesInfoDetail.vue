<script setup>
const RelativesInfoDetail = [
    {
        id: 1,
        name: '为袁吉芳烈士寻找亲人',
        time: '2025-04-10',
        sex: '男',
        nativePlace: '四川省通江县人',
        birthday: '1936-05-01',
        politicsStatus: '共产党员',

    },
]
</script>
<template>
    <RouterView></RouterView>
    <div style="margin: 20px;">
        <span>
            当前位置：寻亲信息 >{{ RelativesInfoDetail[0].name }}
        </span>
    </div>
    <div :data="RelativesInfoDetail" style="font-size: 24px; text-align: center;font-weight: bold;">{{
        RelativesInfoDetail[0].name }}</div>
    <div style="text-align: center;margin-top: 10px;">
        信息来源：四川省列保中心
    </div>
    <div style="display: flex;justify-content: center;width: 100%;">
        <el-card
            style="margin: 40px;width: 100%;background:url('https://www.scmartyrs.cn/static/img/bg.8f034237.png');">
            <div style="display: flex;width: 70%;justify-content: left;flex-wrap: wrap;margin-left: 20px;">
                <div
                    style="margin-bottom: 10px;width: 100%;display: flex;justify-content: left;font-size: medium;color: #a11a1a;font-weight: bold;">
                    || 基 本 信 息
                </div>
                <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                    <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                        姓名:
                    </span>
                    <span style="color: #ffffff;font-size: small;">
                        {{ RelativesInfoDetail[0].name }}
                    </span>
                </div>
                <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                    <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                        性别:
                    </span>
                    <span style="color: #ffffff;font-size: small;">
                        {{ RelativesInfoDetail[0].sex }}
                    </span>
                </div>
                <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                    <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                        籍贯:
                    </span>
                    <span style="color: #ffffff;font-size: small;">
                        {{ RelativesInfoDetail[0].sex }}
                    </span>
                </div>
                <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                    <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                        出生日期:
                    </span>
                    <span style="color: #ffffff;font-size: small;">
                        {{ RelativesInfoDetail[0].sex }}
                    </span>
                </div>
                <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                    <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                        政治面貌:
                    </span>
                    <span style="color: #ffffff;font-size: small;">
                        {{ RelativesInfoDetail[0].sex }}
                    </span>
                </div>
                <div style="display: flex;">
                    <div>
                        <div
                            style="margin-top: 20px;margin-bottom: 10px;width: 100%;display: flex;justify-content: left;font-size: medium;color: #a11a1a;font-weight: bold; ">
                            || 其 他 信 息 资 料
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                生前部队:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ RelativesInfoDetail[0].name }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                牺牲年月:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ RelativesInfoDetail[0].sex }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                牺牲战役或事件:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ RelativesInfoDetail[0].sex }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                牺牲地点:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ RelativesInfoDetail[0].sex }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                其他情况:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ RelativesInfoDetail[0].sex }}
                            </span>
                        </div>
                    </div>
                    <div style="margin-left: 400px;">
                        <div
                            style="margin-top: 20px;margin-bottom: 10px;width: 100%;display: flex;justify-content: left;font-size: medium;color: #a11a1a;font-weight: bold; ">
                            || 联 系 信 息
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                姓名:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ RelativesInfoDetail[0].name }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                联系地址:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ RelativesInfoDetail[0].sex }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                电话:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ RelativesInfoDetail[0].sex }}
                            </span>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: left;margin-bottom: 10px;">
                            <span style="color: #ffffff;font-weight: bold;font-size: small;margin-right: 10px;">
                                电子邮箱:
                            </span>
                            <span style="color: #ffffff;font-size: small;">
                                {{ RelativesInfoDetail[0].sex }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px;">
                <span
                    style="margin-left: 20px;margin-top: 40px;margin-bottom: 10px;font-size: medium;color: #a11a1a;font-weight: bold; ">温馨提示：</span>
                <span style="color: #ffffff;">烈士信息在整理完善过程中，若发现信息缺失或有误，欢迎指正！</span>
            </div>
        </el-card>
    </div>
</template>
<script scoped>

</script>