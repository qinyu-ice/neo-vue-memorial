<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref(0)
const hotNewsDetailData = ref({
    id: 1,
    img: 'https://www.sctyjrsw.com/image/tyjr-martymemo/202603/2b0d238786274dd89034bb6dc60785a0.png',
    title: '【成都市】三力同心 铸魂育人：成都市烈士纪念设施保护中心圆满完成2026年度寒假红色研学活动',
    subtitle: '成都市烈士纪念设施保护中心圆满完成2026年度寒假红色研学活动',
    source: '成都市烈士纪念设施保护中心',
    content: '为充分发挥烈士纪念设施红色阵地作用，深化青少年思想政治引领，成都市烈士纪念设施保护中心精心组织开展 “追寻英烈足迹 感悟红色精神”2026年度寒假研学系列活动4场，吸引100余名青少年参与。活动自2月3日启动、2月27日落幕，以系统化策划、沉浸式体验、长效化推进为抓手，将纪念场馆转化为思政课堂，引导青少年在感悟历史中赓续红色血脉，取得良好育人成效。一是周密部署“强力”，夯实研学服务根基。立足宣传弘扬英烈事迹职能定位，提前谋划、精心统筹，确保研学活动安全有序、高质高效开展。紧扣“纪念设施+教育实践”融合路径，精准定位青少年群体特点，科学设计活动流程，打造主题鲜明、内容充实、形式新颖的寒假红色教育实践项目。面向青少年配备专业讲解队伍，提供规范细致的引导服务。精心编制研学手册，设置任务模块与互动环节，为活动有序开展提供坚实保障。通过标准化组织、精细化服务，筑牢研学活动基础，实现红色教育有力推进。二是沉浸课堂“聚力”，厚植红色文化底色。打破传统参观模式，以沉浸式、互动式学习为核心，将静态展陈转化为动态思政课堂。在讲解员引导下，青少年走进成都市烈士纪念馆，在雕塑、家书、历史照片、革命遗物等载体前，近距离聆听革命故事、感悟信仰力量。以“红色侦查员”为角色设定，设置破译历史暗号、匹配英烈事迹、展馆问答探秘、现场互动交流等环节，让青少年带着问题研学、带着思考感悟，认真记录、踊跃分享实现“游中学、学中悟、悟中行”，从英烈事迹中汲取精神养分，深刻理解英雄形象的时代内涵，厚植爱党爱国爱家乡的红色底色。三是长效传承“助力”，赓续英烈精神血脉。本次活动既是阶段性实践，更是常态化传承英烈精神的重要起点。活动贯穿整个寒假，从启幕到收官，持续引导青少年在历史回眸中找准青春坐标、确立人生航向，推动红色精神入脑入心。市烈保中心将持续发挥阵地育人功能，深化与学校及共建单位合作，不断完善课程体系，推出更多常态化、系统化、多元化的红色研学项目，以更鲜活的形式、更丰富的载体，让英烈精神代代传承，引导广大青少年扣好人生第一粒扣子，努力打造红色资源活化利用的“成都样本”。',
    time: '2026-03-05'
})
const init = async () => {
    console.log(route.query)
    if (route.query) {
        id.value = route.query.id
    } else {
        console.log('没有id')
    }
    console.log(id)
}

init()
</script>
<template>
    <div style="margin: 20px;">
        <span>
            当前位置：热点资讯 > {{ hotNewsDetailData.title }}
        </span>
        <el-card style="margin: 20px;">
            <span class="title">{{ hotNewsDetailData.title }}</span>
            <div class="info">
                <p style="margin-right: 40px;">信息来源：{{ hotNewsDetailData.source }}</p>
                <p>时间：{{ hotNewsDetailData.time }}</p>
            </div>
            <div class="content">
                <div style="display: flex;justify-content: center;">
                    <div
                        style="border-style: none; border-bottom: 1px solid #666;height: 1px;width: 100%;background-color: #dcdfe6;margin-top: 20px;margin-bottom: 20px;">
                    </div>
                </div>
                <div>{{ hotNewsDetailData.content }}</div>
            </div>
        </el-card>
    </div>
</template>
<style lang="scss" scoped>
.title {
    font-size: 1.5em;
    font-weight: bold;
    display: flex;
    justify-content: center;
}

.info {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.content {
    text-align: justify;
    line-height: 3;
    font-family: '宋体';
    font-size: 20px;
}
</style>