import { defineStore } from "pinia";
import { ref } from "vue";

const useUserInfoStore = defineStore("userInfo", () => {
  const info = ref({
    id: '',
    realName: '',
    username: '',
    email: '',
    phone: '',
    permission: ''
  });

  const username = ref()
  // 定义修改状态的方法
  const setUserInfo = (newUserInfo) => {
    info.value = newUserInfo;
  };
  // 定义移除状态的方法
  const removeUserInfo = () => {
    info.value = {};
  };
  // 返回状态和修改状态的方法
  return {
    info,
    setUserInfo,
    removeUserInfo,
    username
  };
}, {
  persist: true
})

export default useUserInfoStore;