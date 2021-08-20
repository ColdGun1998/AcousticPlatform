import Vuex from 'vuex'

const locationSettings = {
  userId: 1,
  sceneId: 1,
  sampleNum: 10,
  connectStatus: true
}

export default Vuex.createStore({
  state: {
    locationSettings: locationSettings,
    displaySettings: { displayTrack: false }
  },
  mutations: {
    changeLocationSettings (state, payload) {
      const { userId, sceneId, sampleNum, connectStatus } = payload
      state.locationSettings.userId = userId
      state.locationSettings.sceneId = sceneId
      state.locationSettings.sampleNum = sampleNum
      state.locationSettings.connectStatus = connectStatus
    },
    changeDisplaySettings (state, payload) {
      const { displayTrack } = payload
      state.displaySettings.displayTrack = displayTrack
    }
  },
  actions: {
  },
  modules: {
  }
})
