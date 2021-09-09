import Vuex from 'vuex'

const locationSettings = {
  userId: 1,
  sceneId: 1,
  sampleNum: 1000000
}

export default Vuex.createStore({
  state: {
    locationSettings: locationSettings,
    curLocation: [], // 最近位置 接口getCurLocation
    locationList: []// 最近历史轨迹 接口getLocationList
  },
  mutations: {
    changeLocationSettings (state, payload) {
      const { userId, sceneId, sampleNum } = payload
      state.locationSettings.userId = userId
      state.locationSettings.sceneId = sceneId
      state.locationSettings.sampleNum = sampleNum
    },
    changeLocationData (state, payload) {
      const { curLocation, locationList } = payload
      state.curLocation = curLocation
      state.locationList = locationList
      console.log(state.curLocation, state.locationList)
    }
  },
  actions: {
  },
  modules: {
  }
})
