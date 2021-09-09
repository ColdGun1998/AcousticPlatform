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
import useLocationTimerEffect from '../effects/locationEffects'
// fengMap有关逻辑
const useFengMapEffect = (props) => {
  let map = null
  let loadingInstance = null
  let locationMarker = null

  const initLoading = () => {
    const options = {
      target: document.getElementById('fengMap'),
      text: '加载蜂鸟地图中',
      fullscreen: false
    }
    loadingInstance = ElLoading.service(options)
  }
  const openMap = (fmapID, appName, appKey) => {
    initLoading()
    map = new fengmap.FMMap({
      container: document.getElementById('fengMap'), // 渲染dom
      appName: appName,
      key: appKey
    })
    locationMarker = new fengmap.FMLocationMarker({
      url: require('@/assets/pointer.png'),
      size: 24, // 设置图片显示尺寸
      height: 3 // marker标注高度
    })
    map.on('loadComplete', function (event) {
      loadingInstance.close()
      map.addLocationMarker(locationMarker)
      locationMarker.setPosition({
        x: 13372916.325701144, // 设置定位点的x坐标
        y: 3516683.1795740128, // 设置定位点的y坐标
        grouID: 1
      })
    })
    map.on('mapClickNode', function (event) {
      // 打印出点击处的地图坐标
      console.log(event.eventInfo.coord)
    })
    map.openMapById(fmapID)
  }
  const disposeMap = () => {
    if (map != null) {
      map.dispose()
    }
  }
  const updataLocationMarker = (curLocation) => {
    console.log(curLocation)
    watch(() => curLocation.value, (newVal, oldVal) => {
      console.log('监听到curLocation值发生变化', newVal)
      // const locArr = newVal.split(',').map(Number)
      // locationMarker.moveTo({
      //   x: locArr[0], // 设置定位点的x坐标
      //   y: locArr[1], // 设置定位点的y坐标
      //   grouID: 1
      // })
    })
  }
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

  return {
    updataLocationMarker
  }
}
// 定时获取最新定位数据的逻辑

export default {
  name: 'FengMap',
  props: {
    fmapID: String,
    appName: String,
    appKey: String
  },
  setup (props) {
    const { updataLocationMarker } = useFengMapEffect(props)
    const { curLocation, locationList } = useLocationTimerEffect()
    updataLocationMarker(curLocation) // 响应式更新定位数据

    return {
      curLocation,
      locationList
    }
  }
}
</script>

<style lang="scss" scoped>
#fengMap {
  width:100%;
  height: 500px;
}

</style>
