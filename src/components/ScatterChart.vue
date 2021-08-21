<template>
    <div class='chart' id='chart'></div>
</template>
<script>

import { get } from '../utils/request.js'
import { onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

let myChart = null
const updateChart = async (userId, sceneId, sampleNum, displayTrack, chart) => {
  const result = await get(`/api/location/get?time_stamp=1621581570000&scene_id=${sceneId}&user_id=${userId}&frame_size=${sampleNum}`)
  // 过滤器
  if (result?.code === 200 && result?.data) {
    const locations = result.data.list[0].locations.map((item) => {
      return item.coordinate.split(',').map(Number)
    })
    chart.setOption({
      series: [{
        name: '最近位置',
        data: locations
      }, {
        name: '历史轨迹',
        data: locations
      }
      ]
    })
  }
}
const initChart = (chart) => {
  var option = {
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { title: '' }
      }
    },
    legend: {
      top: 10
    },
    xAxis: {
      type: 'value',
      splitLine: {
        show: true
      },
      min: 0,
      max: 50
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 50
    },
    dataZoom: [
      { // 这个dataZoom组件，默认控制x轴。
        type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        start: 0, // 左边在 10% 的位置。
        end: 20 // 右边在 60% 的位置。
      },
      { // 这个dataZoom组件，也控制x轴。
        type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
        start: 0, // 左边在 10% 的位置。
        end: 20 // 右边在 60% 的位置。
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        start: 0,
        end: 20
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        start: 0,
        end: 20
      }
    ],
    series: [
      {
        name: '最近位置',
        type: 'scatter',
        itemStyle: {
          opacity: 0.8
        },
        symbol: 'pin',
        symbolSize: 25,
        data: [[1.1, 1.2],
          [3.4, 5.6]]
      },
      {
        name: '历史轨迹',
        type: 'line',
        smooth: true,
        data: [[1.1, 1.2],
          [3.4, 5.6]]
      }
    ]
  }
  chart.setOption(option)
  // 随着屏幕大小调节图表
  window.addEventListener('resize', () => {
    chart.resize()
  })
}

export default {
  name: 'ScatterChart',
  computed: {
    displayTrack () {
      console.log('computed')
      return this.$store.state.displaySettings.displayTrack
    }
  },
  watch: {
    displayTrack (newVal, oldVal) {
      console.log('displayTrack改变', newVal, oldVal)
    }
  },
  setup () {
    onMounted(() => {
      if (window.echarts) {
        myChart = window.echarts.init(document.getElementById('chart'))
        initChart(myChart)
      }
    })
    onUnmounted(() => {
      myChart.dispose()
    })
    const store = useStore()
    let timer = null
    timer = setInterval(() => {
      const { userId, sceneId, sampleNum, connectStatus } = store.state.locationSettings
      const { displayTrack } = store.state.displaySettings
      console.log('获取最新的位置信息', userId, sceneId, sampleNum, connectStatus, displayTrack)
      if (connectStatus) {
        updateChart(userId, sceneId, sampleNum, displayTrack, myChart)
      }
    }, 1000)
    onBeforeUnmount(() => {
      clearInterval(timer)
    })
  }
}
</script>

<style lang="scss" scoped>
.chart{
  width:100%;
  height:100%;
}
</style>
