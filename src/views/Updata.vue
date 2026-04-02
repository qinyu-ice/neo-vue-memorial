<script setup>
import {useRouter} from 'vue-router'
import {ref} from 'vue'
import {ElMessage} from 'element-plus'
import {useTokenStore} from '@/stores/token'
import useUserInfoStore from '@/stores/userInfo'

const tokenStore = useTokenStore()
const form = ref({
  username: '',
  password: '',
  repassword: ''
});
const userInfoStore = useUserInfoStore()
form.value.username = userInfoStore.info.username
// 表单校验的ref
const loginRef = ref()

const rules = {
  password: [
    {required: true, message: '请输入原密码', trigger: 'blur'},
    {pattern: /^\S{5,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur'}
  ],
  repassword: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    {pattern: /^\S{5,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur'}
  ]
}

const router = useRouter()

import {userUpdataService} from '@/api/user'

const updataFn = async () => {
  // 先校验输入格式是否合法
  const valid = await loginRef.value.validate()
  if (valid) {
    // 调用登录接口
    await userUpdataService(form.value)
    ElMessage.success('修改成功')
    // 跳转到登录页
    router.push('/login')
    tokenStore.removeToken()
    userInfoStore.removeUserInfo()
  } else {
    ElMessage.success('密码或用户名不合法')
    return false
  }
}

const completeInfo = () => {
  router.push('/memorial/completeInfo')
}

const loginOut = () => {
  router.push('/login')
  tokenStore.removeToken()
  userInfoStore.removeUserInfo()
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
    <el-form label-width="0px" class="login-box" :model="form" :rules="rules" ref="loginRef">
      <div class="title-box">修改密码</div>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="" disabled></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入原密码" clearable></el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input type="password" v-model="form.repassword" placeholder="请输入新密码" clearable></el-input>
      </el-form-item>
      <el-form-item class="my-el-form-item">
        <el-button type="danger" style="width: 100%;" @click="updataFn">修改</el-button>
      </el-form-item>
      <el-form-item class="my-el-form-item">
        <el-button type="danger" style="width: 100%;" @click="completeInfo">更新个人信息</el-button>
      </el-form-item>
      <el-form-item class="my-el-form-item">
        <el-button type="danger" style="width: 100%;" @click="loginOut">退出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<style lang="less" scoped>
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
  background-size: cover;
  background-image: url('../assets/login_bg.png');
  overflow: hidden; // 防止页面滚动条闪动
}

// .background::before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   margin-top: 65vh;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.3);
//   /* 黑色半透明 */
//   z-index: 1;
//   /* 确保伪元素在背景图之上 */
// }

.rain {
  position: relative;
  display: flex;
}

.rain span {
  position: relative;
  width: 20px;
  height: 20px;
  background-color: #ff0000;
  margin: 0 4px;
  border-radius: 50%;
  box-shadow: 0 0 10px 5px rgba(255, 50, 50, 0.5),
    /* 微调颜色和透明度 */ 0 0 30px 15px rgba(200, 50, 50, 0.3),
  0 0 50px 30px rgba(200, 50, 55, 0.1);
  animation: animate 15s linear infinite;
  animation-duration: calc(200s / var(--i));
}

.rain span:nth-child(even) {
  background: #ff0000;
  /* 红色调 */
  box-shadow: 0 0 10px 5px rgba(255, 50, 50, 0.5),
    /* 颜色和透明度 */ 0 0 30px 15px rgba(200, 50, 50, 0.3),
  0 0 50px 30px rgba(200, 50, 55, 0.1);
}


@keyframes animate {
  0% {
    transform: translateY(100vh) scale(0);
  }

  100% {
    transform: translateY(0vh) scale(1);
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
    color: white;
  }

  :deep(.el-input__icon) {
    color: red;
  }

  :deep(.el-button) {
    --el-button-bg-color: rgb(255, 100, 100);
    --el-button-focus-color: red;
  }

  :deep(.el-input) {
    --el-input-bg-color: rgb(255, 240, 240);
    --el-input-text-color: red;
    --el-input-border-color: rgb(255, 200, 200);
    --el-input-hover-border-color: rgb(255, 150, 150);
    --el-input-focus-border-color: red;
    --el-disabled-text-color: red;
    --el-disabled-bg-color: rgb(255, 240, 240);
  }

  :deep(.el-input) ::-webkit-input-placeholder {
    color: rgb(255, 140, 140) !important;
  }

  :deep(.el-input) :-moz-placeholder {
    color: rgb(255, 140, 140) !important;
    opacity: 1 !important;
  }

  :deep(.el-input) ::-moz-placeholder {
    color: rgb(255, 140, 140) !important;
    opacity: 1 !important;
  }

  :deep(.el-input) :-ms-input-placeholder {
    color: rgb(255, 140, 140) !important;
  }
}
</style>