<template>
    <div id="fengMap"></div>
</template>
<script>
import fengmap from '../fengmap/fengmap.core.min.js'
import '../fengmap/fengmap.control.min.js' // 控件
// 导航需要引入以下两个包：
import '../fengmap/fengmap.analyzer.min.js' // 路径分析类
import '../fengmap/fengmap.navi.min.js' // 导航类

export default {
  name: 'FengMap',
  data () {
    return {

    }
  },
  mounted () {
    this.openMap()
  },
  methods: {
    openMap () {
      var fmapID = '1428340410440929282' // mapId
      var map = new fengmap.FMMap({
        container: document.getElementById('fengMap'), // 渲染dom
        // 必要，地图应用名称，通过蜂鸟云后台创建
        appName: '体育馆',
        // 必要，地图应用密钥，通过蜂鸟云后台获取
        key: '76a8f0460bf5902d34a293b3533c99b5'
      })
      // 打开Fengmap服务器的地图数据和主题
      map.on('loaded', function (event) {
        console.log('Map loaded!')
      })
      map.openMapById(fmapID)
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
