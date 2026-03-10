<script setup>
import { onMounted, ref, nextTick } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { cityHallList } from '@/api/cityHall'

const mapData = ref([])
const map = ref(null)
// 定义信息窗口实例，全局可复用
const infoWindow = ref(null)

// 获取接口数据
const getAllData = async () => {
    try {
        const res = await cityHallList()
        mapData.value = res.data
        console.log('地图数据：', mapData.value)
        // 数据获取后渲染标记（确保地图已初始化）
        if (map.value) {
            renderMarkers(map.value)
        }
    } catch (error) {
        console.error('获取地图数据失败：', error)
    }
}

// 渲染多个标记点
const renderMarkers = (AMapInstance) => {
    if (!mapData.value.length) {
        console.warn('暂无地图数据可渲染')
        return
    }

    // 创建标签图层（复用图层，避免重复创建）
    let labelsLayer = map.value.getLayers().find(layer => layer instanceof AMapInstance.LabelsLayer)
    if (!labelsLayer) {
        labelsLayer = new AMapInstance.LabelsLayer({
            zooms: [3, 20],
            zIndex: 1000,
            collision: false,
            allowCollision: false,
        })
        map.value.add(labelsLayer)
    }

    // 清空原有标记（避免重复渲染）
    labelsLayer.clear()

    // 遍历数据创建标记
    mapData.value.forEach((item, index) => {
        // 校验核心字段
        if (!item.longitude || !item.latitude) {
            console.warn(`第${index + 1}条数据缺少经纬度：`, item)
            return
        }

        // 图标配置
        const icon = {
            type: "image",
            image: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            size: [25, 34],
            anchor: "center",
        };

        // 文字配置
        const text = {
            content: item.name || `标注${index + 1}`, // 替换为接口返回的名称字段
            direction: "right",
            offset: [-40, 25],
            style: {
                fontSize: 12,
                fillColor: "#22886f",
                strokeColor: "#fff",
                strokeWidth: 2,
            },
        };

        // 创建单个标注点
        const labelMarker = new AMapInstance.LabelMarker({
            name: item.name || `标注${index + 1}`,
            position: [Number(item.longitude), Number(item.latitude)], // 确保是数字类型
            zIndex: 16,
            rank: 1,
            icon: icon,
            text: text,
            // 绑定原始数据到标记上，方便点击时获取
            extData: item
        });

        // 点击标记触发事件
        labelMarker.on('click', function (e) {
            const targetData = e.target.getExtData()
            // 打开信息窗口显示数据
            openInfoWindow(AMapInstance, e.target.getPosition(), targetData)
        });

        // 添加标记到图层
        labelsLayer.add(labelMarker)
    })
}

// 打开信息窗口（复用实例，避免重复创建）
const openInfoWindow = (AMapInstance, position, data) => {
    // 初始化信息窗口（仅第一次创建）
    if (!infoWindow.value) {
        infoWindow.value = new AMapInstance.InfoWindow({
            anchor: "top-left",
            offset: [0, 35],
            size: [300, 200] // 自定义窗口大小
        });
    }

    // 组装信息窗口内容
    const content = `
    <div style="padding: 10px; font-size: 14px;">
      <h3 style="margin: 0 0 10px 0; color: #22886f;">${data.name || '暂无名称'}</h3>
      <img style="width = "80px"; height = "80px";" src="${data.img}" />
      <p><strong>地址：</strong>${data.address || '暂无地址'}</p>
      <p><strong>乘车提示：</strong>${data.hint || '暂无乘车提示'}</p>
      <a href="/memorial/hallDetail?id=${data.id || ''}"
       style="text-decoration: none; 
              display: inline-block; 
              padding: 6px 16px; 
              background-color: #fff; 
              border: 1px solid #dcdfe6; 
              border-radius: 4px; 
              cursor: pointer; 
              font-size: 14px; 
              color: #333; 
              margin-top: 10px;
              transition: all 0.2s;"
       onmouseover="this.style.backgroundColor='#cddff9'; this.style.color='#3692f6'"
       onmouseout="this.style.backgroundColor='#fff'; this.style.color='#333'">
      查看详情
    </a>
    </div>
  `;

    // 更新窗口内容并打开
    infoWindow.value.setContent(content)
    infoWindow.value.open(map.value, position)
}

// 初始化地图
const initMap = () => {
    AMapLoader.load({
        key: "f08c4cfbf1e0c8b89e4e6c29c46b3a07",
        version: "2.0",
        plugins: [],
    }).then((AMap) => {
        // 创建地图实例
        map.value = new AMap.Map("container", {
            viewMode: "3D",
            zoom: 10, // 降低初始缩放级别，适配多个标记点
            zooms: [3, 20],
            center: [107.484767, 31.211277], // 可根据数据动态调整中心点
        })

        // 如果已有数据，直接渲染标记
        if (mapData.value.length) {
            renderMarkers(AMap)
        }

    }).catch(e => {
        console.log('高德地图加载失败：', e)
    })
}

onMounted(() => {
    // 确保DOM完全渲染后执行
    nextTick(async () => {
        await getAllData()
        initMap()
    })
})
</script>

<template>
    <div id="container" class="map"></div>
</template>

<style lang="scss" scoped>
.map {
    width: 100%;
    height: 600px;
    position: relative;
    overflow: hidden;
}
</style>