import { get } from '../utils/request.js'
import { reactive, onMounted, onBeforeUnmount, toRefs } from 'vue'
import { useStore } from 'vuex'
const useLocationTimerEffect = () => {
  let timer = null
  const store = useStore()
  const locationData = reactive({ curLocation: [], locationList: [] })
  // 请求最新的定位数据
  const getLocations = async (userId, sceneId, sampleNum) => {
    const result = await get(`api/location/get?scene_id=${sceneId}&user_id=${userId}&frame_size=${sampleNum}`)
    if (result?.code === 200 && result?.data && result?.data.list.length !== 0) {
      const list = result.data.list[0].locations.map((item) => {
        return item.coordinate.split(',').map(Number)
      })
      locationData.curLocation = list[0].join(',')
      locationData.locationList = list
    }
  }

  onMounted(() => {
    timer = setInterval(() => {
      const { userId, sceneId, sampleNum } = store.state.locationSettings
      //   console.log('每隔1s向后台获取最新的位置信息', userId, sceneId, sampleNum)
      getLocations(userId, sceneId, sampleNum)
    }, 1000)
  })
  onBeforeUnmount(() => {
    clearInterval(timer)
  })
  return {
    ...toRefs(locationData)
  }
}

export default useLocationTimerEffect
