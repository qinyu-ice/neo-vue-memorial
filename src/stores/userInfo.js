import { defineStore } from "pinia";
import { ref } from "vue";

const useUserInfoStore=defineStore("userInfo", () => {
    // 定义状态相关内容
    // const info = ref({
    //     'id': '',
    //     'username': 'aaa',
    //     'nickname': '郭小易',
    //     'avatar': '',
    //     'email': '',
    //     'role': '',
    //     'status': '',
    //     'createTime': '',
    //     'updateTime': ''
    // });
    const info = ref({
      id: '2',
      username: 'aaa',
  });

  const username=ref('aaaaa')
    // 定义修改状态的方法
    const setUserInfo = (newUserInfo) => {
      info.value = newUserInfo;
    };
    // 定义移除状态的方法
    const removeUserInfo = () => {
      userInfo.value = {};
    };
    // 返回状态和修改状态的方法
    return { info,
         setUserInfo,
         removeUserInfo,
         username
    };
}, {
  persist: true
})

export default useUserInfoStore;