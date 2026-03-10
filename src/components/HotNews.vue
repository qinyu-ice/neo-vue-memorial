<script setup>
import { ref } from 'vue';

const hotNewsData = ref([
    {
        id: 1,
        img: 'https://www.sctyjrsw.com/image/tyjr-martymemo/202603/2b0d238786274dd89034bb6dc60785a0.png',
        title: '【成都市】三力同心 铸魂育人：成都市烈士纪念设施保护中心圆满完成2026年度寒假红色研学活动',
        subtitle: '成都市烈士纪念设施保护中心圆满完成2026年度寒假红色研学活动',
        time: '2026-03-05'
    },
    {
        id: 2,
        img: 'https://www.sctyjrsw.com/image/tyjr-martymemo/202603/2b0d238786274dd89034bb6dc60785a0.png',
        title: '【成都市】三力同心 铸魂育人：成都市烈士纪念设施保护中心圆满完成2026年度寒假红色研学活动',
        subtitle: '成都市烈士纪念设施保护中心圆满完成2026年度寒假红色研学活动',
        time: '2026-03-05'
    },
    {
        id: 3,
        img: 'https://www.sctyjrsw.com/image/tyjr-martymemo/202603/2b0d238786274dd89034bb6dc60785a0.png',
        title: '【成都市】三力同心 铸魂育人：成都市烈士纪念设施保护中心圆满完成2026年度寒假红色研学活动',
        subtitle: '成都市烈士纪念设施保护中心圆满完成2026年度寒假红色研学活动',
        time: '2026-03-05'
    },
    {
        id: 4,
        img: 'https://www.sctyjrsw.com/image/tyjr-martymemo/202603/2b0d238786274dd89034bb6dc60785a0.png',
        title: '【成都市】三力同心 铸魂育人：成都市烈士纪念设施保护中心圆满完成2026年度寒假红色研学活动',
        subtitle: '成都市烈士纪念设施保护中心圆满完成2026年度寒假红色研学活动',
        time: '2026-03-05'
    },
    {
        id: 5,
        img: 'https://www.sctyjrsw.com/image/tyjr-martymemo/202603/2b0d238786274dd89034bb6dc60785a0.png',
        title: '【成都市】三力同心 铸魂育人：成都市烈士纪念设施保护中心圆满完成2026年度寒假红色研学活动',
        subtitle: '成都市烈士纪念设施保护中心圆满完成2026年度寒假红色研学活动',
        time: '2026-03-05'
    }
])
</script>
<template>
    <div style="margin: 20px;">
        <span>
            当前位置：热点资讯
        </span>
    </div>
    <el-card style="margin: 20px;">
        <div v-for="(item, index) in hotNewsData" :key="index">
            <div class="hot-news-contain">
                <div class="hot-news-img">
                    <img :src="item.img" />
                </div>
                <div class="hot-news-content">
                    <span>
                        <router-link class="news-title"
                            :to="{ path: '/memorial/hotNewsDetail', query: { id: item.id } }">{{
                                item.title }}</router-link>
                    </span>
                    <p>{{ item.subtitle }}</p>
                </div>
                <div class="hot-news-time">
                    <p>发布时间：{{ item.time }}</p>
                </div>
            </div>
            <div>
                --------------------------------------------------------------------------------------------------------------------------------------------------------------
                ---------------------------------------------------------------------------------------------------
            </div>
        </div>
    </el-card>
</template>
<style lang="scss" scoped>
.hot-news-contain {
    width: 100%;
    display: flex;
    justify-content: space-around
}

.hot-news-img {
    width: 15%;
}

.hot-news-img>img {
    width: 190px;
    height: 100px;
}

.hot-news-content {
    width: 70%;
    font-size: medium;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    // 标题样式（包含hover效果）
    .news-title {
        font-weight: 600;
        font-size: medium;
        text-decoration: none;
        color: #333;
        line-height: 1.4;
        margin-bottom: 5px;
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

.hot-news-content>span {
    font-weight: bold;
}

.hot-news-time {
    width: 12%;
}
</style>