import Vuex from 'vuex'

const locationSettings = {
  userId: 1,
  sceneId: 1
}

export default Vuex.createStore({
  state: {
    locationSettings: locationSettings
  },
  mutations: {
    changeLocationSettings (state, payload) {
      const { userId, sceneId } = payload
      state.locationSettings.userId = userId
      state.locationSettings.sceneId = sceneId
      console.log('mutations', userId)
    }
  },
  actions: {
  },
  modules: {
  }
})
