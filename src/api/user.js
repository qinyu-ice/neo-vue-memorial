//导入request.js工具
import request from '@/utils/request'


//提供调用登录接口的函数
export const userLoginService = (registerData) => {
    //借助于UrlSearchParams完成传递(x-www-form-urlencoded)
    // const params = new URLSearchParams()
    // for(let key in loginData){
    //     params.append(key,loginData[key])
    // }
    return request.post('user/login', { uname: registerData.username, passwd: registerData.password })
}

export const userUpdataService = (registerData) => {
    //借助于UrlSearchParams完成传递(x-www-form-urlencoded)
    // const params = new URLSearchParams()
    // for(let key in registerData){
    //     params.append(key,registerData[key])
    // }
    return request.put('user/reset', { uname: registerData.username, passwd: registerData.password, passwd2: registerData.repassword })
}

export const userRegisterService = (registerData) => {
    //借助于UrlSearchParams完成传递(x-www-form-urlencoded)
    // const params = new URLSearchParams()
    // for(let key in registerData){
    //     params.append(key,registerData[key])
    // }
    return request.post('user/register', { uname: registerData.username, passwd: registerData.password, passwd2: registerData.rePassword })
}

