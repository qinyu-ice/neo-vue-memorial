<script setup>
import { ref, onMounted } from 'vue'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { cityHallList, getMapByip } from '@/api/cityHall';
import { allMessageList } from '@/api/martyrs'
import { allNewsList, getImgList } from '@/api/news';

const total = ref()
const newsImgArr = ref([])
const newsImgIndex = ref(0)
const imgIndex = ref(0)
const imgArr = [
    '/src/assets/newHomeOne3.486ce412.png',
    '/src/assets/newHomeOne.832a93f8.png',
]
var currentImg = null
var currentNewsImg = null

onMounted(() => {
    currentImg = document.querySelector('.img')
    currentNewsImg = document.querySelector('.img2')
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
const selectNewsImg = (e) => {
    currentNewsImg = document.querySelector('.img2')
    currentNewsImg.style.opacity = '0'
    setTimeout(() => {
        currentNewsImg.src = newsImgArr.value[e]
        newsImgIndex.value = e
        currentNewsImg.style.opacity = '1';
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
const newsNext = (e) => {
    e > 0 ? newsImgIndex.value += 1 : newsImgIndex.value -= 1
    if (newsImgIndex.value >= newsImgArr.value.length) {
        newsImgIndex.value = 0
    }
    if (newsImgIndex.value < 0) {
        newsImgIndex.value = newsImgArr.value.length - 1
    }
    selectNewsImg(newsImgIndex.value)
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

const hotNewsData = ref([{
    time: ''
}])

const router = useRouter()
// 四川文理学院（莲湖校区）IP
const ip = ref("14.19.23.128")
const addressA = ref("107.484767,31.211277")

const getCityHallList = async () => {
    //获取分类列表
    const res = await cityHallList()
    cityHalls.value = res.data
}

const getAllLeaveMessage = async () => {
    // 获取留言列表
    const res = await allMessageList()
    res.data.forEach((item, index) => {
        item.time = item.time.substring(0, 10)
    })
    leaveMessages.value = res.data
}

const getAllNewsList = async (page, pageSize) => {
    //获取分类列表
    const res = await allNewsList(page, pageSize, '')
    hotNewsData.value = res.data.data
    total.value = res.data.total
}

const fetchAddress = async () => {
    // 根据IP地址查询经纬度
    const result = await getMapByip(ip.value)
    addressA.value = result.data
}

const getImg = async () => {
    const res = await getImgList()
    newsImgArr.value = res.data
}

onMounted(() => {
    getImg()
    getAllNewsList(1, 6)
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

const goToHotNews = () => {
    router.push('/memorial/hotNews')
}
</script>
<template>
    <div class="banner">
        <img src="/src/assets/newHomeOne3.486ce412.png" class="img">
        <div class="dot-content">
            <div v-for="(item, index) in imgArr.length" :key="index" :class="index === imgIndex ? 'active' : 'dot-box'"
                @click="selectImg(index)">
            </div>
        </div>
        <el-icon size="20" class="left-btn" @click="next(-1)">
            <ArrowLeftBold />
        </el-icon>
        <el-icon size="20" class="right-btn" @click="next(1)">
            <ArrowRightBold />
        </el-icon>
    </div>
    <div class="page-container">
        <el-card class="page-container1">
            <template #header>
                <div class="header">
                    <span style="color: #c72624; font-weight: bolder; font-size: large;">烈士英名录</span>
                    <span class="span-link" @click="heroPage">查看更多 >></span>
                </div>
            </template>
            <div class="city">
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
                    <span style="color: #c72624; font-weight: bolder; font-size: large;">热点资讯</span>
                    <span class="span-link" @click="goToHotNews">查看更多 >></span>
                </div>
            </template>
            <div style="display:flex; justify-content: space-between;">
                <div class="news-banner">
                    <img src="https://www.sctyjrsw.com/image/tyjr-martymemo/202603/2b0d238786274dd89034bb6dc60785a0.png"
                        class="img2">
                    <div class="news-dot-content">
                        <div v-for="(item, index) in newsImgArr.length" :key="index"
                            :class="index === newsImgIndex ? 'active' : 'dot-box'" @click="selectNewsImg(index)">
                        </div>
                    </div>
                    <el-icon size="20" class="news-left-btn" @click="newsNext(-1)">
                        <ArrowLeftBold />
                    </el-icon>
                    <el-icon size="20" class="news-right-btn" @click="newsNext(1)">
                        <ArrowRightBold />
                    </el-icon>
                </div>
                <div style="width: 58%; margin-top: 10px;">
                    <el-row v-for="(item, index) in hotNewsData" :key="index" class="row-bg" justify="space-around"
                        style="border-bottom: 1px dashed #ccc; margin-bottom: 25px; padding-bottom: 20px;">
                        <div class="dynamic-tag">
                            <el-tag type="danger">动态</el-tag>
                        </div>
                        <div class="title" data-v-4a24b1d2="">
                            <router-link class="news-title"
                                :to="{ path: '/memorial/hotNewsDetail', query: { id: item.id } }">{{
                                    item.title }}</router-link>
                        </div>
                        <div class="time-tag">
                            <el-tag type="danger">{{ item.time.substring(0, 10) }}</el-tag>
                        </div>
                    </el-row>
                </div>
            </div>
        </el-card>
    </div>
    <div class="page-container" style="margin-top: 20px; height: 400px;">
        <el-card style="width: 75%;">
            <template #header>
                <div class="header">
                    <span style="color: #c72624; font-weight: bolder; font-size: large;">烈士纪念留言展示</span>
                </div>
            </template>
            <el-scrollbar height="400px">
                <el-table :data="leaveMessages" style="width: 100%;">
                    <el-table-column label="留言人" width="150" prop="username" />
                    <el-table-column label="烈士姓名" width="150" prop="martyrName" />
                    <el-table-column label="献花数量" width="150" prop="flower" />
                    <el-table-column label="留言内容" width="400" prop="message" show-overflow-tooltip />
                    <el-table-column label="留言时间" prop="time" />
                </el-table>
            </el-scrollbar>
        </el-card>
        <el-card style="width: 25%; margin-left: 20px;">
            <template #header>
                <div class="header">
                    <span style="color: #c72624; font-weight: bolder; font-size: large;">公共服务</span>
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
                    <span style="color: #c72624; font-weight: bolder; font-size: large;">烈士纪念设施</span>
                    <span class="span-link" @click="facilityPage">查看更多 >></span>
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
                    <span style="color: #c72624; font-weight: bolder; font-size: large;">烈士纪念设施保护中心</span>
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

.dynamic-tag {
    width: 5%;
}

.title {
    width: 76%;
    margin-top: 2px;

    // 标题样式（包含hover效果）
    .news-title {
        font-size: medium;
        text-decoration: none;
        color: #333;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        cursor: pointer; // 鼠标移上去显示手型，提示可点击
        transition: color 0.2s ease; // 颜色过渡动画，更丝滑

        // 鼠标悬浮时颜色变红
        &:hover {
            color: #f00; // 红色
        }
    }
}

.time-tag {
    width: 5%;
    margin-right: 40px;
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
    width: 100%;
    margin-top: 20px;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

.span-link {
    color: #c72624;
    font-size: large;
    font-weight: bold;

    &:hover {
        color: red;
        cursor: pointer;
        transition: all 0.2s ease;
    }
}

.city {
    height: 65vh;
    background-image: url('@/assets/city_bg.png');
    background-size: 100% 100%;
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
            left: 10px;
            width: auto;
            color: white;
        }

        .right-btn {
            position: absolute;
            cursor: pointer;
            top: 50%;
            right: 10px;
            width: auto;
            color: white;
        }
    }

    .img {
        display: none;

        &:first-child {
            display: block;
            height: auto;
            width: 100%;
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

.news-banner {
    position: relative;
    display: flex;
    justify-content: left;
    width: 40%;

    .news-left-btn,
    .news-right-btn {
        width: 0;
        color: #fff;
    }

    &:hover {
        .news-left-btn {
            position: absolute;
            cursor: pointer;
            top: 50%;
            left: 20px;
            width: auto;

        }

        .news-right-btn {
            position: absolute;
            cursor: pointer;
            top: 50%;
            right: 20px;
            width: auto;
        }
    }

    .img2 {
        display: none;
        width: 100%;
        height: 60vh;

        &:first-child {
            display: block;
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
}
</style>