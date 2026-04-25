<script setup>
import {User, Lock, Message, Iphone} from '@element-plus/icons-vue'
import {ref} from 'vue'
import {ElMessage} from 'element-plus';
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
//控制邮箱注册
const isEmailRegister = ref(false)
//控制邮箱登录
const isEmailLogin = ref(false)
//控制账号密码登录
const isLogin = ref(true)
//控制邮箱登录方式
const emailLoginMethod = ref(false)
//定义数据类型
const registerData = ref({
  username: '',
  password: '',
  rePassword: '',
  email: ''
})

const emailData = ref({
  email: '',
  emailPassword: '',
  code: ''
})

const token = ref('')
//校验密码函数
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次重复密码'))
  } else if (value !== registerData.value.password) {
    callback(new Error("请确保两次输入的密码一致!"))
  } else {
    callback()
  }
}

//定义表单校验规则
const rules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 40, message: '长度在 3 到 40 个非空字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 1, max: 16, message: '长度在 6 到16 个非空字符', trigger: 'blur'}
  ],
  rePassword: [
    {validator: validatePass2, trigger: 'blur'}
  ],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '请输入正确的邮箱格式',
      trigger: 'blur'
    }
  ],
  emailPassword: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 1, max: 16, message: '长度在 6 到16 个非空字符', trigger: 'blur'}
  ],
  code: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur'}
  ]
}

//调用后台接口 完成注册
import {userLoginService, userRegisterService} from '@/api/user'
import {sendCode, emailRegister, codeLogin, passwordLogin} from '@/api/email'

//绑定数据,复用注册表单的数据模型
//表单数据校验
//登录函数
import {useTokenStore} from '@/stores/token'
import useUserInfoStore from '@/stores/userInfo';
import {useRouter} from 'vue-router'

const router = useRouter()
const tokenStore = useTokenStore()
const userInfoStore = useUserInfoStore()
const login = async () => {
  let result = await userLoginService(registerData.value)
  if (result.code === 200) {
    ElMessage.success(result.msg)
    // 将token保存到pinia中
    tokenStore.setToken(result.data.token)
    tokenStore.setUserInfo(result.data)
    userInfoStore.setUserInfo(result.data)
    // 跳转到首页 借助路由完成跳转
    if (result.data.permission == 1) {
      router.push('/back-end')
    } else {
      router.push('/memorial/home')
    }
  } else {
    ElMessage.error(result.msg)
  }
}

const emailLoginService = async () => {
  if (emailData.value.code != '') {
    let result = await codeLogin(emailData.value)
    if (result.code === 200) {
      ElMessage.success('邮箱验证码登录成功')
      // 将token保存到pinia中
      tokenStore.setToken(result.data.token)
      tokenStore.setUserInfo(result.data)
      userInfoStore.setUserInfo(result.data)
      // 跳转到首页 借助路由完成跳转
      if (result.data.permission == 1) {
        router.push('/back-end')
      } else {
        router.push('/memorial/home')
      }
    } else {
      // ElMessage.error(result.msg)
    }
  } else if (!emailLoginMethod.value) {
    let result = await passwordLogin(emailData.value)
    if (result.code === 200) {
      ElMessage.success('邮箱密码登录成功')
      // 将token保存到pinia中
      tokenStore.setToken(result.data.token)
      tokenStore.setUserInfo(result.data)
      userInfoStore.setUserInfo(result.data)
      // 跳转到首页 借助路由完成跳转
      if (result.data.permission == 1) {
        router.push('/back-end')
      } else {
        router.push('/memorial/home')
      }
    } else {
      // ElMessage.error(result.msg)
    }
  } else {
    await codeLogin(emailData.value)
  }
}

const register = async () => {
  let result = await userRegisterService(registerData.value)
  if (result.code === 200) {
    ElMessage.success(result.msg)
    // 跳转到首页 借助路由完成跳转
    isRegister.value = false
    isLogin.value = true
    router.push('/login')
  } else {
    ElMessage.error(result.msg)
  }
}

const emailRegisterService = async () => {
  let result = await emailRegister(emailData.value)
  if (result.code === 200) {
    isEmailRegister.value = false
    isEmailLogin.value = true
    emailData.value.code = ''
    ElMessage.success("邮箱注册成功")
  } else {
    // ElMessage.error(result.msg)
  }
}

const codeTime = ref('发送验证码')
const isCodeDisabled = ref(false)
// 定义倒计时定时器（用于清除）
let countdownTimer = null
const sendCodeService = async () => {
  let result = await sendCode(emailData.value.email)
  if (result.code === 200) {
    startCountdown()
    ElMessage.success('发送成功')
  }
}

// 倒计时核心逻辑
const startCountdown = () => {
  let count = 60
  // 立即更新按钮文本为60秒
  codeTime.value = `${count}秒后重新发送`
  // 禁用重复点击（可选，建议加）
  isCodeDisabled.value = true

  // 启动定时器，每秒执行一次
  countdownTimer = setInterval(() => {
    count--
    // 更新倒计时文本
    codeTime.value = `${count}秒后重新发送`

    // 倒计时结束
    if (count <= 0) {
      // 清除定时器
      clearInterval(countdownTimer)
      // 恢复原本文字
      codeTime.value = '发送验证码'
      // 恢复可点击状态
      isCodeDisabled.value = false
    }
  }, 1000)
}

//定义函数,清空数据模型的数据
const resetForm = () => {
  registerData.value = {
    username: '',
    password: '',
    rePassword: '',
    email: ''
  }
}
const resetEmailForm = () => {
  emailData.value = {
    email: '',
    emailPassword: '',
    code: ''
  }
}
</script>

<template>
  <el-row class="login-page">
    <!-- <el-col :span="15" class="bg"></el-col> -->
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
    <el-col :offset="8" class="form">
      <!-- 账号密码注册表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules"
               @keyup.enter="register(registerData)">
        <el-form-item>
          <h1 style="color: white; font-size: xx-large; padding-top: 20px;">英烈数字传承平台</h1>
        </el-form-item>
        <el-form-item>
          <h2 style="color: white;">账号密码注册</h2>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"
                    clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"
                    clearable></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                    v-model="registerData.rePassword" clearable></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input :prefix-icon="Message" placeholder="请输入邮箱" v-model="registerData.email"
                    clearable></el-input>
        </el-form-item>
        <el-link type="info" :underline="false" style="padding-bottom: 15px;"
                 @click="isEmailRegister = true; isRegister = false; resetForm();">
          邮箱注册
        </el-link>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="danger" auto-insert-space @click="register(registerData)">
            注册
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isRegister = false; isLogin = true; resetForm();">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 邮箱注册表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-if="isEmailRegister" :model="emailData"
               :rules="rules" @keyup.enter="emailRegisterService">
        <el-form-item>
          <h1 style="color: white; font-size: xx-large; padding-top: 20px;">英烈数字传承平台</h1>
        </el-form-item>
        <el-form-item>
          <h2 style="color: white;">邮箱注册</h2>
        </el-form-item>
        <el-form-item prop="email">
          <el-input :prefix-icon="Message" placeholder="请输入邮箱" v-model="emailData.email" clearable></el-input>
        </el-form-item>
        <el-form-item prop="emailPassword">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="emailData.emailPassword"
                    clearable></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input :prefix-icon="Iphone" placeholder="请输入验证码" v-model="emailData.code"
                    clearable></el-input>
        </el-form-item>
        <div class="flex" style="padding-bottom: 15px;">
          <el-link type="info" :underline="false"
                   @click="isRegister = true; isEmailRegister = false; resetEmailForm();">
            账号密码注册
          </el-link>
          <el-link type="info" :underline="false" :disabled="isCodeDisabled" @click="sendCodeService">
            {{ codeTime }}
          </el-link>
        </div>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="danger" auto-insert-space @click="emailRegisterService">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false"
                   @click="isEmailRegister = false; isLogin = true; resetEmailForm();">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 账号密码登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-if="isLogin" :model="registerData" :rules="rules"
               @keyup.enter="login">
        <el-form-item>
          <h1 style="color: white; font-size: xx-large; padding-top: 20px;">英烈数字传承平台</h1>
        </el-form-item>
        <el-form-item>
          <h2 style="color: white;">账号密码登录</h2>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"
                    clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                    v-model="registerData.password" clearable></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button" type="danger" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
        <el-form-item>
          <div class="flex">
            <el-link type="info" :underline="false"
                     @click="isRegister = true; isLogin = false; resetForm();">
              注册
            </el-link>
            <el-link type="info" :underline="false"
                     @click="isEmailLogin = true; isLogin = false; resetEmailForm();">
              邮箱登录
            </el-link>
          </div>
        </el-form-item>
      </el-form>
      <!-- 邮箱登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" :model="emailData" v-if="isEmailLogin" :rules="rules"
               @keyup.enter="emailLoginService">
        <el-form-item>
          <h1 style="color: white; font-size: xx-large; padding-top: 20px;">英烈数字传承平台</h1>
        </el-form-item>
        <el-form-item>
          <h2 style="color: white;">邮箱登录</h2>
        </el-form-item>
        <el-form-item prop="email">
          <el-input :prefix-icon="Message" placeholder="请输入邮箱" v-model="emailData.email" clearable></el-input>
        </el-form-item>
        <el-form-item prop="emailPassword" v-if="!emailLoginMethod">
          <el-input name="emailPassword" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                    v-model="emailData.emailPassword" clearable></el-input>
        </el-form-item>
        <el-link type="info" style="padding-bottom: 15px;" v-if="!emailLoginMethod" :underline="false"
                 @click="emailLoginMethod = true; emailData.emailPassword = ''">
          忘记密码？验证码登录
        </el-link>
        <el-form-item prop="code" v-if="emailLoginMethod">
          <el-input name="code" :prefix-icon="Iphone" type="code" placeholder="请输入验证码"
                    v-model="emailData.code" clearable></el-input>
        </el-form-item>
        <div class="flex" v-if="emailLoginMethod" style="padding-bottom: 15px;">
          <el-link type="info" :underline="false" @click="emailLoginMethod = false; emailData.code = ''">
            密码登录
          </el-link>
          <el-link type="info" :underline="false" :disabled="isCodeDisabled" @click="sendCodeService">
            {{ codeTime }}
          </el-link>
        </div>
        <!-- 邮箱登录按钮 -->
        <el-form-item>
          <el-button class="button" type="danger" @click="emailLoginService" auto-insert-space>登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isLogin = true; isEmailLogin = false; resetForm();">
            账号密码登录
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 120vh;
  background-color: #fff;

  background: url('@/assets/login_background.png') no-repeat center / cover;
  // url('@/assets/login_bg.png') no-repeat 60% center / 240px auto,
  // border-radius: 0 20px 20px 0;

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    z-index: 10;
    width: 400px;
    min-height: 420px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    box-shadow: #dddddd 0 0 100px;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .el-link {
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
}

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
    /* 微调颜色和透明度 */
  0 0 30px 15px rgba(200, 50, 50, 0.3),
  0 0 50px 30px rgba(200, 50, 55, 0.1);
  animation: animate 15s linear infinite;
  animation-duration: calc(200s / var(--i));
}

.rain span:nth-child(even) {
  background: #ff0000;
  /* 红色调 */
  box-shadow: 0 0 10px 5px rgba(255, 50, 50, 0.5),
    /* 颜色和透明度 */
  0 0 30px 15px rgba(200, 50, 50, 0.3),
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
</style>