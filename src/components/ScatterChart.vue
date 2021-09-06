<template>
    <div class='chart' id='chart'></div>
</template>
<script>

import { get } from '../utils/request.js'
import { onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

let myChart = null
const updateChart = async (userId, sceneId, sampleNum, chart) => {
  const result = await get(`api/location/get?scene_id=${sceneId}&user_id=${userId}&frame_size=${sampleNum}`)
  // 过滤器
  if (result?.code === 200 && result?.data && result?.data?.list) {
    // const locations = result.data.list[0]?.locations.map((item) => {
    //   return item.coordinate.split(',').map(Number)
    // })
    // chart.setOption({
    //   series: [{
    //     name: '最近位置',
    //     data: [locations[0]]
    //   }, {
    //     name: '历史轨迹',
    //     data: locations
    //   }
    //   ]
    // })
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
      max: 100
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100
    },
    dataZoom: [
      { // 这个dataZoom组件，默认控制x轴。
        type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        start: 0, // 左边在 10% 的位置。
        end: 10 // 右边在 60% 的位置。
      },
      { // 这个dataZoom组件，也控制x轴。
        type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
        start: 0, // 左边在 10% 的位置。
        end: 10 // 右边在 60% 的位置。
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        start: 0,
        end: 10
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        start: 0,
        end: 10
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
        data: []
      },
      {
        name: '历史轨迹',
        type: 'line',
        smooth: true,
        data: []
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
  },
  watch: {
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
      const { userId, sceneId, sampleNum } = store.state.locationSettings
      console.log('获取最新的位置信息', userId, sceneId, sampleNum)
      updateChart(userId, sceneId, sampleNum, myChart)
    }, 1000)
    onBeforeUnmount(() => {
      clearInterval(timer)
    })
  }
}
</script>

<style lang="scss" scoped>
.chart{
  min-height:500px;
}
</style>
