<script setup>
import { ref, onMounted, watch, defineEmits, defineProps, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

// 定义接收的 props（中心点、缩放级别）
const props = defineProps({
    center: {
        type: Array,
        default: () => [107.484767, 31.211277]
    },
    zoom: {
        type: Number,
        default: 16
    },
    // 接收弹窗显隐状态，用于销毁地图实例
    visible: {
        type: Boolean,
        default: false
    }
})

// 定义触发的事件（地图初始化完成）
const emit = defineEmits(['init'])

const map = ref(null)
// 存储标记点实例，便于销毁
const marker = ref(null)
window._AMapSecurityConfig = {
    securityJsCode: "f27caa65d8aa7dd7ec207568e99fb7e9",
};

// 销毁地图实例的方法
const destroyMap = () => {
    if (map.value) {
        // 清除所有标记点
        map.value.clearMap();
        // 移除所有事件监听
        map.value.off();
        // 销毁地图实例
        map.value.destroy();
        map.value = null;
    }
    if (marker.value) {
        marker.value = null;
    }
}

const initMap = () => {
    // 初始化前先销毁旧实例
    destroyMap();

    AMapLoader.load({
        key: "f08c4cfbf1e0c8b89e4e6c29c46b3a07",
        version: "2.0",
        plugins: ['AMap.Geocoder', 'AMap.PlaceSearch', 'AMap.Marker']
    }).then((AMap) => {
        const mapContainer = document.getElementById("container");
        if (!mapContainer) {
            console.error("地图容器不存在");
            return;
        }

        // 使用 props 中的 center 和 zoom 初始化地图
        map.value = new AMap.Map("container", {
            viewMode: "3D",
            zoom: props.zoom,
            center: props.center,
        })

        // 触发 init 事件，传递地图实例给父组件
        emit('init', map.value)

    }).catch(e => {
        console.error('高德地图加载失败：', e)
    })
}

// 优化 props 监听：确保地图实例存在再更新
watch([() => props.center, () => props.zoom], ([newCenter, newZoom]) => {
    if (map.value) {
        // 延迟更新，避免实例未完全初始化
        setTimeout(() => {
            map.value.setCenter(newCenter);
            map.value.setZoom(newZoom);
        }, 100);
    }
}, { deep: true, immediate: false })

// 监听弹窗显隐，关闭时销毁地图实例
watch(() => props.visible, (newVal) => {
    if (newVal) {
        // 弹窗打开时初始化地图（延迟确保DOM渲染）
        setTimeout(() => initMap(), 200);
    } else {
        // 弹窗关闭时销毁地图实例
        destroyMap();
    }
}, { immediate: true })

// 组件卸载时销毁地图实例
onUnmounted(() => {
    destroyMap();
})
</script>

<template>
    <div id="container" class="map" v-if="visible"></div>
</template>

<style lang="scss" scoped>
.map {
    width: 100%;
    height: 400px;
}
</style>