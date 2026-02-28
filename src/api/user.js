//导入request.js工具
import request from '@/utils/request'


//提供调用登录接口的函数
export const userLoginService = (registerData) => {
    //借助于UrlSearchParams完成传递(x-www-form-urlencoded)
    // const params = new URLSearchParams()
    // for(let key in loginData){
    //     params.append(key,loginData[key])
    // }
    return request.post('user/login', { username: registerData.username, password: registerData.password })
}

export const userUpdataService = (registerData) => {
    //借助于UrlSearchParams完成传递(x-www-form-urlencoded)
    // const params = new URLSearchParams()
    // for(let key in registerData){
    //     params.append(key,registerData[key])
    // }
    return request.put('user/reset', { username: registerData.username, password: registerData.password, password2: registerData.repassword })
}

export const userRegisterService = (registerData) => {
    //借助于UrlSearchParams完成传递(x-www-form-urlencoded)
    // const params = new URLSearchParams()
    // for(let key in registerData){
    //     params.append(key,registerData[key])
    // }
    return request.post('user/register', { username: registerData.username, password: registerData.password, password2: registerData.rePassword, email: registerData.email })
}

export const userAllService = () => {
    return request.get('user/all')
}

export const userAddService = (addData) => {
    return request.post('user/add', addData)
}

export const userDeleteService = (id) => {
    return request.delete(`user/delete/${id}`)
}

export const userInfoUpdateService = (updateData) => {
    return request.post('user/update', updateData)
}
