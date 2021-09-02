<template>
    <div class='chart' id='chart'></div>
</template>
<script>
import $ from 'jquery'
import { onMounted, onUnmounted } from 'vue'
let myChart = null
export default {
  name: 'ScatterChart',
  computed: {
  },
  watch: {
  },
  setup () {
    onMounted(() => {
      var option = {
        geo: [{
          map: 'laboratory',
          roam: true,
          layoutCenter: ['50%', '50%'],
          layoutSize: '100%'
        }],
        series: [
        ]
      }
      // 挂载echart
      if (window.echarts) {
        $.get('http://localhost:7001/public/upload/20210826/1629977783660.svg', function (svg) {
        // $.get('https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/geo/MacOdrum-LV5-floorplan-web.svg', function (svg) {
          // 首先向 echarts 注册 SVG 字符串或解析过的 SVG DOM
          console.log('加载svg文件', typeof (svg), svg)
          window.echarts.registerMap('laboratory', { svg: svg })
          myChart = window.echarts.init(document.getElementById('chart'))
          console.log('加载完成', myChart)
          myChart.setOption(option)
        }, 'xml')
      }
    })
    onUnmounted(() => {
      myChart.dispose()
    })
  }
}
</script>

<style lang="scss" scoped>
.chart{
  min-height:400px;
  border:1px solid black;
}
</style>
