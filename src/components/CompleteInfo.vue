<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import useUserInfoStore from '@/stores/userInfo'
import { ElMessage } from 'element-plus'
import { userInfoUpdateService } from '@/api/user'

const router = useRouter()
const userInfo = ref({
    id: 0,
    username: '',
    realName: '',
    phone: ''
});

const userInfoStore = useUserInfoStore()
userInfo.value.username = userInfoStore.info.username
userInfo.value.id = userInfoStore.info.id

// 表单校验的ref
const formRef = ref()

const rules = {
    realName: [
        { required: true, message: '请输入真实姓名', trigger: 'blur' },
        { min: 2, max: 10, message: '真实姓名长度在2到10个字符之间', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的11位手机号', trigger: 'blur' }
    ]
}

const submit = async () => {
    // 先校验输入格式是否合法
    const valid = await formRef.value.validate()
    if (valid) {
        // 调用登录接口
        await userInfoUpdateService(userInfo.value)
        ElMessage.success('提交成功')
        // 跳回
        router.push('/memorial/updataUser')
    } else {
        ElMessage.success('真实姓名或电话号码不合法')
        return false
    }
}

const goBack = () => {
    console.log(userInfoStore.info)
    router.push('/memorial/updataUser')
}
</script>
<template>
    <div class="background">
        <!-- 下雨效果 -->
        <div class="rain">
            <span style="--i:64;"></span>
            <span style="--i:33;"></span>
            <span style="--i:21;"></span>
            <span style="--i:95;"></span>
            <span style="--i:42;"></span>
            <span style="--i:17;"></span>
            <span style="--i:88;"></span>
            <span style="--i:50;"></span>
            <span style="--i:10;"></span>
            <span style="--i:77;"></span>
            <span style="--i:3;"></span>
            <span style="--i:29;"></span>
            <span style="--i:72;"></span>
            <span style="--i:5;"></span>
            <span style="--i:90;"></span>
            <span style="--i:49;"></span>
            <span style="--i:14;"></span>
            <span style="--i:61;"></span>
            <span style="--i:38;"></span>
            <span style="--i:81;"></span>
            <span style="--i:64;"></span>
            <span style="--i:33;"></span>
            <span style="--i:21;"></span>
            <span style="--i:95;"></span>
            <span style="--i:42;"></span>
            <span style="--i:17;"></span>
            <span style="--i:88;"></span>
            <span style="--i:50;"></span>
            <span style="--i:10;"></span>
            <span style="--i:77;"></span>
            <span style="--i:3;"></span>
            <span style="--i:29;"></span>
            <span style="--i:72;"></span>
            <span style="--i:5;"></span>
            <span style="--i:90;"></span>
            <span style="--i:49;"></span>
            <span style="--i:14;"></span>
            <span style="--i:61;"></span>
            <span style="--i:38;"></span>
            <span style="--i:81;"></span>
            <span style="--i:21;"></span>
            <span style="--i:95;"></span>
            <span style="--i:42;"></span>
            <span style="--i:17;"></span>
            <span style="--i:88;"></span>
            <span style="--i:50;"></span>
            <span style="--i:10;"></span>
            <span style="--i:77;"></span>
            <span style="--i:3;"></span>
            <span style="--i:29;"></span>
            <span style="--i:14;"></span>
            <span style="--i:61;"></span>
        </div>
        <el-form label-width="0px" class="login-box" :model="userInfo" :rules="rules" ref="formRef">
            <div class="title-box">补全个人信息</div>
            <el-form-item prop="username">
                <el-input v-model="userInfo.username" placeholder="" disabled></el-input>
            </el-form-item>
            <el-form-item prop="realName">
                <el-input v-model="userInfo.realName" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input v-model="userInfo.phone" placeholder="请输入电话号码"></el-input>
            </el-form-item>
            <el-form-item class="my-el-form-item">
                <el-button type="primary" class="btn-login" @click="submit">提交</el-button>
            </el-form-item>
            <el-form-item class="my-el-form-item">
                <el-button type="primary" style="width: 100%;" @click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped lang="scss">
body {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.background {
    width: 100%;
    height: 100vh;
    background-size: auto;
    background-image: url('../assets/login_bg.png');
    overflow: hidden; // 防止页面滚动条闪动
}

.background::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 65vh;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    /* 黑色半透明 */
    z-index: 1;
    /* 确保伪元素在背景图之上 */
}

.rain {
    position: relative;
    display: flex;
}

.rain span {
    position: relative;
    width: 20px;
    height: 20px;
    background-color: #eee;
    margin: 0 4px;
    border-radius: 50%;
    box-shadow: 0 0 10px 5px rgba(238, 238, 238, 0.5),
        /* 微调颜色和透明度 */
        0 0 30px 15px rgba(238, 238, 238, 0.3),
        /* 模糊半径和扩散范围 */
        0 0 50px 30px rgba(221, 221, 221, 0.2);
    animation: animate 15s linear infinite;
    animation-duration: calc(200s / var(--i));
}

.rain span:nth-child(even) {
    background: #ff8800;
    /* 橙色调 */
    box-shadow: 0 0 10px 5px rgba(255, 150, 50, 0.5),
        /* 颜色和透明度 */
        0 0 30px 15px rgba(200, 100, 50, 0.3),
        0 0 50px 30px rgba(200, 50, 50, 0.1);
}


@keyframes animate {
    0% {
        transform: translateY(100vh) scale(0);
    }

    100% {
        transform: translateY(-10vh) scale(1);
    }
}

.login-box {
    margin-top: 60vh;
    z-index: 10;
    width: 400px;
    height: 420px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    box-shadow: #dddddd 0 0 100px;

    .title-box {
        height: 100px;
        line-height: 100px;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        color: #00aaff;
    }

    .el-form-item {
        margin-bottom: 20px;
    }

    .btn-login {
        width: 100%;
    }

    .el-link {
        margin-top: 25px;
    }
}
</style>