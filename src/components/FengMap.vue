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
var map = null
var loadingInstance = null
export default {
  name: 'FengMap',
  props: {
    fmapID: String,
    appName: String,
    appKey: String
  },
  mounted () {
    this.openMap(this.fmapID, this.appName, this.appKey)
  },
  watch: {
    fmapID: function (newVal, oldVal) {
      if (map != null) {
        map.dispose()
      }
      this.openMap(this.fmapID, this.appName, this.appKey)
    }
  },
  methods: {
    initLoading () {
      const options = {
        target: document.getElementById('fengMap'),
        text: '加载蜂鸟地图中',
        fullscreen: false
      }
      loadingInstance = ElLoading.service(options)
    },
    openMap (fmapID, appName, appKey) {
      this.initLoading()
      map = new fengmap.FMMap({
        container: document.getElementById('fengMap'), // 渲染dom
        // 必要，地图应用名称，通过蜂鸟云后台创建
        appName: appName,
        // 必要，地图应用密钥，通过蜂鸟云后台获取
        key: appKey
      })
      map.on('loadComplete', function (event) {
        loadingInstance.close()
      })
      // 打开Fengmap服务器的地图数据和主题
      map.openMapById(fmapID, () => {
      })
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
