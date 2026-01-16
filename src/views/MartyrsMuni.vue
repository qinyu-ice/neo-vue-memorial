<script setup>
import { ref } from 'vue'
import { useTokenStore } from '@/stores/token'
//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(70)//总条数
const pageSize = ref(40)//每页条数
const name = ref('')
const heroList = ref([{
    "id": 0,
    "name": '',
}
])
const heroList2 = ref([{
    "id": 0,
    "name": '',
}
])
// 响应式变量存储详情数据

const dept = ref('')
const position = ref('')
const campaign = ref('')
const deeds = ref('')
const tokenStore = useTokenStore()

const tokenValue = () => {
    tokenStore.tokenIsExist()
}

tokenValue()

import { heroPage } from '@/api/martyrs'
const getHeroList = async () => {
    // console.log("bbb", dept.value)
    //获取英雄列表
    const result = await heroPage({
        page: pageNum.value,
        pageSize: pageSize.value,
        name: name.value
    })
    heroList.value = result.data.data
    total.value = result.data.total

}
getHeroList()

const searchHeroList = async () => {
    if (!search.value) {
        //获取英雄列表
        await heroPage({
            page: pageNum.value,
            pageSize: pageSize.value,
            name: name.value
        }).then(res => {
            heroList.value = res.data.data
            total.value = res.data.total
        })
    } else {
        getMartyrsByAdvancedSearch()
    }
}

//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    if (search.value) {
        getMartyrsByAdvancedSearch()
    } else {
        searchHeroList()
    }
}


import { martyrAdvancedSearch } from '@/api/martyrs';
const getMartyrsByAdvancedSearch = async () => {
    const result = await martyrAdvancedSearch({
        page: pageNum.value,
        pageSize: pageSize.value,
        dept: dept.value,
        position: position.value,
        deathCampaign: campaign.value,
        deeds: name.value
    })
    heroList2.value = result.data.data
    total.value = result.data.total
    console.log("aaaaaaaaaaaaaaaa", total.value)
    console.log("bbbbbbbbbbbbbbbb", heroList2.value)
}

const getMartyrsScore = (score) => {
    score = score * 100
    return `${score}`.substring(0, 5)
}

import { useRouter } from 'vue-router'
const router = useRouter()
const detail_btn = (id) => {
    router.push({
        path: '/memorial/martyrDetail',
        query: { id: id }
    })
}

const search = ref(false)
const buttonValue = ref('智能搜索')

const showAdvancedSearch = () => {
    search.value = !search.value
    if (search.value) {
        buttonValue.value = '精确搜索'
        getMartyrsByAdvancedSearch()
    } else {
        buttonValue.value = '智能搜索'
        searchHeroList()
    }
}

// 新增方法，用于在单选框值改变时调用
const onRadioChange = () => {
    // console.log("aaa", dept.value)
    getMartyrsByAdvancedSearch()
}
</script>

<template>
    <div style="width: 100%;">
        <div style="margin: 20px;">
            <span>
                当前位置：达州烈士英名录
            </span>
        </div>
        <div class="horizontal" style="display: flex;justify-content: center;">
            <el-input v-model="name" style="width: 200px;" size="default" class="input" placeholder="请输入想查询的烈士名" />
            <el-button @click="searchHeroList" size="default" class="btn" type="success" plain
                style="margin: 10px;">查询烈士</el-button>
            <el-button @click="showAdvancedSearch" size="default" class="btn" type="success" plain
                style="margin: 10px;">{{ buttonValue }}</el-button>
        </div>

        <div v-show="search" class="advancedSearch" style="margin-left: 20px;">
            <el-radio-group v-model="dept" @change="onRadioChange">
                <el-radio-button value="" size="medium">全部</el-radio-button>
                <el-radio-button value="红三十三军" size="medium">红三十三军</el-radio-button>
                <el-radio-button value="红四军" size="medium">红四军</el-radio-button>
                <el-radio-button value="红九军" size="medium">红九军</el-radio-button>
                <el-radio-button value="川东游击队" size="medium">川东游击队</el-radio-button>
                <el-radio-button value="志愿军" size="medium">志愿军</el-radio-button>
                <el-radio-button value="解放军" size="medium">解放军</el-radio-button>
            </el-radio-group>
            <el-radio-group v-model="position" @change="onRadioChange">
                <el-radio-button value="" size="medium">全部</el-radio-button>
                <el-radio-button value="战士" size="medium">战士</el-radio-button>
                <el-radio-button value="班长" size="medium">班长</el-radio-button>
                <el-radio-button value="队员" size="medium">队员</el-radio-button>
                <el-radio-button value="游击队队员" size="medium">游击队队员</el-radio-button>
                <el-radio-button value="副班长" size="medium">副班长</el-radio-button>
                <el-radio-button value="武工队员" size="medium">武工队员</el-radio-button>
            </el-radio-group>
            <el-radio-group v-model="campaign" @change="onRadioChange">
                <el-radio-button value="" size="medium">全部</el-radio-button>
                <el-radio-button value="宣汉县作战" size="medium">宣汉县作战</el-radio-button>
                <el-radio-button value="抗美援朝" size="medium">抗美援朝</el-radio-button>
                <el-radio-button value="随红军出征后失踪" size="medium">随红军出征后失踪</el-radio-button>
                <el-radio-button value="宣汉县曾家山作战" size="medium">宣汉县曾家山作战</el-radio-button>
                <el-radio-button value="解放一江山岛战斗" size="medium">解放一江山岛战斗</el-radio-button>
                <el-radio-button value="宣汉县双河作战" size="medium">宣汉县双河作战</el-radio-button>
            </el-radio-group>
        </div>

        <div style="margin-left:20px; margin-top: 20px;">
            <span style="color: red;font-weight: bolder;font-size: medium;">烈士英名录</span>
            <span style="margin-left: 5px;font-size: smaller;">排名不分先后</span>
        </div>
        <div style="display: flex;justify-content: center;width: 100%;">
            <el-card style="margin: 20px;width: 100%;">
                <div style="display: flex;width: 100%;justify-content: left;flex-wrap: wrap;height: 200px;">
                    <div v-if="search" v-for="hero in heroList2" @click="detail_btn(hero.id)"
                        style="display: block;width: 145px;height:40px;">
                        <el-button text type="primary" plain
                            style="width: 100%;display: flex;justify-content: center;font-size: small;font-weight: bold;line-height: 40px;">{{
                                hero.name }} {{ getMartyrsScore(hero.score) }}%</el-button>
                    </div>
                    <div v-else v-for="hero in heroList" @click="detail_btn(hero.id)"
                        style="display: block;width: 145px;height:40px;">
                        <el-button text type="primary" plain
                            style="width: 100%;display: flex;justify-content: center;font-size: small;font-weight: bold;line-height: 40px;">{{
                                hero.name }}</el-button>
                    </div>

                </div>
                <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize"
                    layout="jumper, total, prev, pager, next" background :total="total" @size-change="onSizeChange"
                    @current-change="onCurrentChange" style="margin-top: 10px; justify-content:center" />
            </el-card>
        </div>
    </div>

</template>

<style scoped>
.el-radio-group {
    margin-top: 10px;
    display: flex;
}

.el-radio-button {
    margin-left: 20px;
    border-left: 1px solid #dcdfe6;
}
</style>