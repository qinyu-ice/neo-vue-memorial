//导入request.js工具
import request from '@/utils/request'

// 发送验证码
export const sendCode = (email) => {
    return request.post('email/code', { email: email })
}

// 注册邮箱登录用户
export const emailRegister = (registerEmailData) => {
    return request.post('email/register', { email: registerEmailData.email, emailPassword: registerEmailData.emailPassword, code: registerEmailData.code })
}

// 邮箱验证码登录
export const codeLogin = (codeLoginData) => {
    return request.post('email/code-login', { email: codeLoginData.email, code: codeLoginData.code })
}

// 邮箱密码登录
export const passwordLogin = (passwordLoginData) => {
    return request.post('email/password-login', { email: passwordLoginData.email, emailPassword: passwordLoginData.emailPassword })
}

// 登出
export const logout = () => {
    return request.put('email/logout')
}