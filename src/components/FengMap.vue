<template>
    <div  id="fengMap"></div>
</template>
<script>
import fengmap from '../fengmap/fengmap.core.min.js'
import '../fengmap/fengmap.control.min.js' // 控件
// 导航需要引入以下两个包：
import '../fengmap/fengmap.analyzer.min.js' // 路径分析类
import '../fengmap/fengmap.navi.min.js' // 导航类
import { ElLoading } from 'element-plus'
import { onMounted, watch, onUnmounted } from 'vue'
// fengMap有关逻辑
const useFengMapEffect = () => {
  let map = null
  let loadingInstance = null
  // 初始化加载动画
  const initLoading = () => {
    const options = {
      target: document.getElementById('fengMap'),
      text: '加载蜂鸟地图中',
      fullscreen: false
    }
    loadingInstance = ElLoading.service(options)
  }
  // 打开地图
  const openMap = (fmapID, appName, appKey) => {
    initLoading()
    map = new fengmap.FMMap({
      container: document.getElementById('fengMap'), // 渲染dom
      appName: appName,
      key: appKey
    })
    map.on('loadComplete', function (event) {
      loadingInstance.close()
    })
    map.openMapById(fmapID)
  }
  // 销毁地图
  const disposeMap = () => {
    if (map != null) {
      map.dispose()
    }
  }
  return {
    openMap,
    disposeMap
  }
}
// 定时获取最新定位数据的逻辑
// const useLocationEffect = () => {
//   return {
//     0
//   }
// }
export default {
  name: 'FengMap',
  props: {
    fmapID: String,
    appName: String,
    appKey: String
  },
  setup (props) {
    const { openMap, disposeMap } = useFengMapEffect()
    onMounted(() => {
      openMap(props.fmapID, props.appName, props.appKey)
    })
    onUnmounted(() => {
      disposeMap()
    })
    watch(() => props, () => {
      disposeMap()
      openMap(props.fmapID, props.appName, props.appKey)
    }, { deep: true })
  }
}
</script>

<style lang="scss" scoped>
#fengMap {
  width:100%;
  height: 500px;
}

</style>
