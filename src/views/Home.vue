/**
* @name { 轮播图（完整源码） }
* @info { 自定义轮播图以及动画 }
* @author { 前端uio 2024-5-20 }
*
* @click funtion => 处理对应的点击事件
* @transition 组件 => 实现过渡动画
* @el-icon 组件 => 切换图片的左右箭头图标
*/

<script setup>
import { ref, onMounted } from 'vue'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'

const img = ref('https://www.scmartyrs.cn/static/img/bg03.0c252411.png')
const imgIndex = ref(0)
const imgArr = [
    '/src/assets/newHomeOne3.486ce412.png',
    '/src/assets/newHomeOne.832a93f8.png',
]
const titles = [
    //    '胡桃🍑🍑🍑🍑🍑🍑', '启动⚪⚪⚪⚪⚪⚪', '撒花❀❀❀❀❀❀'
]

//  var currentImg: HTMLImageElement | null = null

//  onMounted(() => {
//    currentImg = document.querySelector('.img') as HTMLImageElement
//  })
var currentImg = null

onMounted(() => {
    currentImg = document.querySelector('.img')
})
const selectImg = (e) => {
    currentImg = document.querySelector('.img')
    currentImg.style.opacity = '0'
    setTimeout(() => {
        currentImg.src = imgArr[e]
        imgIndex.value = e
        currentImg.style.opacity = '1';
    }, 500)
}
const next = (e) => {
    e > 0 ? imgIndex.value += 1 : imgIndex.value -= 1
    if (imgIndex.value >= imgArr.length) {
        imgIndex.value = 0
    }
    if (imgIndex.value < 0) {
        imgIndex.value = imgArr.length - 1
    }
    selectImg(imgIndex.value)
}

const protect = ref([
    {
        "name": "达州市烈士纪念设施保护中心",
        "address": "达州市通川区西城街道牌楼路115号",
        "phone": "0818-2240074",
    },
])

const cities = ref([
    {
        "id": 1,
        "name": "成都市",
    },
    {
        "id": 2,
        "name": "绵阳市",
    },
    {
        "id": 3,
        "name": "自贡市",
    },
    {
        "id": 4,
        "name": "攀枝花市",
    },
    {
        "id": 5,
        "name": "泸州市",
    },
    {
        "id": 6,
        "name": "德阳市",
    },
    {
        "id": 7,
        "name": "广元市",
    },
    {
        "id": 8,
        "name": "遂宁市",
    },
    {
        "id": 9,
        "name": "内江市",
    },
    {
        "id": 10,
        "name": "乐山市",
    },
    {
        "id": 11,
        "name": "资阳市",
    },
    {
        "id": 12,
        "name": "宜宾市",
    },
    {
        "id": 13,
        "name": "南充市",
    },
    {
        "id": 14,
        "name": "达州市",
    },
    {
        "id": 15,
        "name": "雅安市",
    },
    {
        "id": 16,
        "name": "广安市",
    },
    {
        "id": 17,
        "name": "巴中市",
    },
    {
        "id": 18,
        "name": "眉山市",
    },
    {
        "id": 19,
        "name": "阿坝藏族自治州",
    },
    {
        "id": 20,
        "name": "甘孜藏族自治州",
    },
    {
        "id": 21,
        "name": "凉山彝族自治州",
    }
])
const cityHalls = ref([
    {
        "fid": "0",
        "name": "达州市",
        "img": "#",
    },
])
const leaveMessages = ref([])

import { useTokenStore } from '@/stores/token'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus';
import { cityList } from '@/api/city';
import { cityHallList, getMapByip } from '@/api/cityHall';
import { martyrAllLeaveMessage } from '@/api/martyrs'
const router = useRouter()
const tokenStore = useTokenStore()
// 四川文理学院（莲湖小区）IP
const ip = ref("14.19.23.128")
const addressA = ref("107.484767,31.211277")

const getCityHallList = async () => {
    //获取分类列表
    const res = await cityHallList()
    console.log(res)
    cityHalls.value = res.data
}

const getAllLeaveMessage = async () => {
    // 获取留言列表
    const res = await martyrAllLeaveMessage()
    res.data.forEach((item, index) => {
        item.time = item.time.substring(0, 10)
    })
    leaveMessages.value = res.data
}

const fetchAddress = async () => {
    // 根据IP地址查询经纬度
    const result = await getMapByip(ip.value)
    addressA.value = result.data
    console.log(addressA.value)
}

const tokenValue = () => {
    tokenStore.tokenIsExist()
}

onMounted(() => {
    tokenValue()
    getCityHallList();
    getAllLeaveMessage();
    fetchAddress();
})

const heroPage = () => {
    router.push('/memorial/martyrsMuni')
}

const facilityPage = () => {
    router.push('/memorial/cityHall')
}

const pushDaZhouCityHallInfo = () => {
    router.push('/memorial/martyrsMuni')
}

</script>
<template>
    <div>
        <div class="banner">
            <img src="/src/assets/newHomeOne3.486ce412.png" class="img">
            <div v-for="(title, titleIndex) in titles" :key="titleIndex" class="content">
                <transition name="scale">
                    <div v-show="imgIndex === titleIndex">
                        <span>{{ title }}</span>
                    </div>
                </transition>
            </div>
            <div class="dot-content">
                <div v-for="(item, index) in imgArr.length" :key="index"
                    :class="index === imgIndex ? 'active' : 'dot-box'" @click="selectImg(index)">
                </div>
            </div>
            <el-icon size="20" class="left-btn" @click="next(-1)">
                <ArrowLeftBold />
            </el-icon>
            <el-icon size="20" class="right-btn" @click="next(1)">
                <ArrowRightBold />
            </el-icon>
        </div>
    </div>
    <div class="page-container">
        <el-card class="page-container1">
            <template #header>
                <div class="header">
                    <span style="color: red;font-weight: bolder;">烈士英名录</span>
                    <div class="extra">
                        <el-button @click="heroPage" type="primary">查看更多>></el-button>
                    </div>
                </div>
            </template>
            <div style="height: 70vh;background-image: url('https://www.scmartyrs.cn/static/img/bg03.0c252411.png');">
                <div style="padding-left:90vh;height: 100%;padding-top:20px;">
                    <div style="display: flex;justify-content: space-around;flex-wrap: wrap;">
                        <el-col :span="8" v-for="city in cities" :key="city.id" style="margin-top: 20px;">
                            <el-button type="danger" v-if="city.name == '达州市'" plain @click="pushDaZhouCityHallInfo">
                                {{ city.name }}
                            </el-button>
                            <el-button type="warning" v-else plain>
                                {{ city.name }}
                            </el-button>
                        </el-col>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
    <div class="page-container">
        <el-card class="page-container1">
            <template #header>
                <div class="header">
                    <span style="color: red;font-weight: bolder;">热点资讯</span>
                    <div class="extra">
                        <el-button type="primary">查看更多>></el-button>
                    </div>
                </div>
            </template>
            <div style="display:flex;justify-content: space-around;">
                <img src="http://www.dzhjlsly.com/tupmulu/image/20241009/20241009113245_65596.jpg" class="img2">
                <div style="width: 50%;">
                    <el-row class="row-bg" justify="space-around"
                        style="border-bottom:1px solid #ccc;margin-bottom: 25px;">
                        <el-tag type="danger">动态</el-tag>
                        <div data-v-4a24b1d2="" class="title">
                            归期已定！志愿军烈士们，祖国接您回家
                        </div>
                        <el-tag type="danger">2024-11-27</el-tag>
                    </el-row>
                    <el-row class="row-bg" justify="space-around"
                        style="border-bottom:1px solid #ccc;margin-bottom: 25px;">
                        <el-tag type="danger">动态</el-tag>
                        <div data-v-4a24b1d2="" class="title">
                            四川省烈士纪念设施中心举办全省英烈讲解员培训班
                        </div>
                        <el-tag type="danger">2024-11-26</el-tag>
                    </el-row>
                    <el-row class="row-bg" justify="space-around"
                        style="border-bottom:1px solid #ccc;margin-bottom: 25px;">
                        <el-tag type="danger">动态</el-tag>
                        <div data-v-4a24b1d2="" class="title">
                            我省隆重举行向人民英雄敬献花篮仪式
                        </div>
                        <el-tag type="danger">2024-11-21</el-tag>
                    </el-row>
                    <el-row class="row-bg" justify="space-around"
                        style="border-bottom:1px solid #ccc;margin-bottom: 25px;">
                        <el-tag type="danger">动态</el-tag>
                        <div data-v-4a24b1d2="" class="title">
                            达州市举行向人民英雄敬献花篮仪式
                        </div>
                        <el-tag type="danger">2024-09-30</el-tag>
                    </el-row>
                    <el-row class="row-bg" justify="space-around"
                        style="border-bottom:1px solid #ccc;margin-bottom: 10px;">
                        <el-tag type="danger">动态</el-tag>
                        <div data-v-4a24b1d2="" class="title">
                            市退役军人局传达学习市委五届八次全会精神
                        </div>
                        <el-tag type="danger">2024-06-14</el-tag>
                    </el-row>
                    <el-row class="row-bg" justify="space-around"
                        style="border-bottom:1px solid #ccc;margin-bottom: 25px;">
                        <el-tag type="danger">动态</el-tag>
                        <div data-v-4a24b1d2="" class="title">
                            事务厅副厅长陈发清来达调研指导烈士褒扬工作
                        </div>
                        <el-tag type="danger">2024-06-02</el-tag>
                    </el-row>
                </div>
            </div>
        </el-card>
    </div>
    <div class="page-container" style="margin-top: 10px; height: 400px;">
        <el-card style="width: 127vh;">
            <template #header>
                <div class="header">
                    <span style="color: red; font-weight: bolder;">烈士纪念留言展示</span>
                </div>
            </template>
            <el-scrollbar height="400px">
                <el-table :data="leaveMessages" style="width: 100%;">
                    <el-table-column label="留言人" width="100" prop="username" />
                    <el-table-column label="烈士姓名" width="100" prop="name" />
                    <el-table-column label="留言内容" width="400" prop="message" />
                    <el-table-column label="留言时间" prop="time" />
                </el-table>
            </el-scrollbar>
        </el-card>
        <el-card style="width: 52vh; margin-left: 1vh;">
            <template #header>
                <div class="header">
                    <span style="color: red; font-weight: bolder;">公共服务</span>
                </div>
            </template>
            <p>地址：四川省达州市通川区陵园路158号</p>
            <p style="margin-top: 10px;">电话：0818-2240074</p>
            <img :src="`https://restapi.amap.com/v3/staticmap?location=107.481186,31.218771&zoom=12&size=750*750&markers=mid,,B:107.481186,31.218771|mid,0xFFFF00,A:` + `107.484706,31.211239` + `&traffic=1&scale=1&key=43b4c8b855538aa8afb4f7a4e2f0be60`"
                usemap="#mp" alt="地图走丢了" style="margin-top: 10px; width: 300px; height: 240px;">
            <map name="mp" id="mp">
                <area shape="rect" coords="0,0,300,240"
                    :href="`https://restapi.amap.com/v3/staticmap?location=107.481186,31.218771&zoom=12&size=750*750&markers=mid,,B:107.481186,31.218771|mid,0xFFFF00,A:` + `107.484706,31.211239` + `&traffic=1&scale=1&key=43b4c8b855538aa8afb4f7a4e2f0be60`"
                    alt="地图走丢了" target="_blank">
            </map>
        </el-card>
    </div>
    <div class="page-container">
        <el-card class="page-container1">
            <template #header>
                <div class="header">
                    <span style="color: red;font-weight: bolder;">烈士纪念设施</span>
                    <div class="extra">
                        <el-button @click="facilityPage" type="primary">查看更多>></el-button>
                    </div>
                </div>
            </template>
            <el-row>
                <div class="block text-center" m="t-4" style="width: 100%;">
                    <span class="demonstration"></span>
                    <el-carousel trigger="click" height="150px" width="100%">
                        <el-carousel-item v-for="item in 6" :key="item">
                            <div style="display: flex;justify-content: space-around;">
                                <img v-for="cityHall in cityHalls.slice((item - 1) * 7, item * 7)" :key="cityHall.pid"
                                    :src="cityHall.img" style="margin-top: 20px;" class="img3">
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-row>
        </el-card>
    </div>
    <div class="page-container">
        <el-card class="page-container1">
            <template #header>
                <div class="header">
                    <span style="color: red;font-weight: bolder;">烈士纪念设施保护中心</span>
                    <div class="extra">
                        <el-button type="primary">查看更多>></el-button>
                    </div>
                </div>
            </template>
            <el-table :data="protect" style="width: 100%">
                <el-table-column label="烈士纪念设施保护中心名称" width="400" prop="name"></el-table-column>
                <el-table-column label="烈士纪念设施保护中心地址" prop="address"></el-table-column>
                <el-table-column label="烈士纪念设施保护中心电话" prop="phone"> </el-table-column>
            </el-table>
        </el-card>
    </div>

</template>

<style scoped lang="less">
.img3 {
    width: 10%;
    height: 15vh;
}

.img2 {
    width: 40%;
    height: 50vh;
}

.el-row {
    margin-bottom: 20px;

    .el-button {
        width: 120px;
    }
}

.page-container {
    display: flex;
    justify-content: center;
}

.page-container1 {
    min-height: 100%;
    box-sizing: border-box;
    width: 180vh;
    margin-top: 10px;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

.banner {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;

    .left-btn,
    .right-btn {
        width: 0;
    }

    &:hover {
        .left-btn {
            position: absolute;
            cursor: pointer;
            top: 50%;
            left: 95px;
            width: auto;

        }

        .right-btn {
            position: absolute;
            cursor: pointer;
            top: 50%;
            right: 95px;
            width: auto;
        }
    }

    .img {
        display: none;

        &:first-child {
            display: block;
            height: 30vh;
            width: 180vh;
            opacity: 1;
            transition: opacity 0.5s ease;
        }

    }

    .scale-enter-active {
        transition: all 1s ease-in-out;
    }

    .scale-leave-active {
        transition: all 1s linear;
    }

    .scale-enter-from {
        margin-right: 300px;
        opacity: 0;
    }

    .scale-leave-to {
        opacity: 0;
    }

    .content {
        position: absolute;
        top: 50%;
        font-size: 40px;
        color: #fff;
    }

    .dot-content {
        display: flex;
        position: absolute;
        bottom: 10px;
        justify-content: space-around;
        align-items: center;
        width: 100px;
        height: 10px;

        .dot-box {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #fff;
            cursor: pointer;
        }

        .active {
            cursor: pointer;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgb(0, 0, 0);
        }
    }

}

.banner1 {
    position: relative;
    display: flex;
    justify-content: left;
    width: 100%;

    .left-btn,
    .right-btn {
        width: 0;
    }

    &:hover {
        .left-btn {
            position: absolute;
            cursor: pointer;
            top: 50%;
            left: 95px;
            width: auto;

        }

        .right-btn {
            position: absolute;
            cursor: pointer;
            top: 50%;
            right: 95px;
            width: auto;
        }
    }

    .img {
        display: none;

        &:first-child {
            padding: 10px;
            margin-bottom: 10px;
            display: block;
            height: 70vh;
            width: 80vh;
            opacity: 1;
            transition: opacity 0.5s ease;
        }

    }

    .scale-enter-active {
        transition: all 1s ease-in-out;
    }

    .scale-leave-active {
        transition: all 1s linear;
    }

    .scale-enter-from {
        margin-right: 300px;
        opacity: 0;
    }

    .scale-leave-to {
        opacity: 0;
    }

    .content {
        position: absolute;
        top: 50%;
        font-size: 40px;
        color: #fff;
    }

    .dot-content {
        display: flex;
        position: absolute;
        bottom: 10px;
        justify-content: space-around;
        align-items: center;
        width: 100px;
        height: 10px;

        .dot-box {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #fff;
            cursor: pointer;
        }

        .active {
            cursor: pointer;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgb(0, 0, 0);
        }
    }

}
</style>