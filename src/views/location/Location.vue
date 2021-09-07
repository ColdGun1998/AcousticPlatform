<template>
<el-card class="wrapper">
  <template #header>
    <div class="settings">
      <el-form size="small" class="settings__form" :inline="true"  :model="settings"  @submit.prevent>
      <el-form-item  label="选择用户">
        <el-select v-model="settings.userId" placeholder="请选择">
          <el-option
            v-for="item in settings.userOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="选择场景">
        <el-select v-model="settings.sceneId" placeholder="请选择">
          <el-option
            v-for="item in settings.sceneOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="历史轨迹点个数">
        <el-input-number v-model="settings.sampleNum"  controls-position="right" :min="1" :max="100000000" :precision="0"></el-input-number>
      </el-form-item>
      <el-form-item label="切换蜂鸟地图">
        <el-switch v-model="settings.displayFengMap" :beforeChange="beforeDisplayFmap"></el-switch>
      </el-form-item>
      </el-form>
    </div>
  </template>
  <ScatterChart v-if="!settings.displayFengMap" />
  <FengMap v-else v-bind="fengSettings" />
</el-card>
</template>

<script>
import { get } from '../../utils/request.js'
import { reactive, watch, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
import ScatterChart from '../../components/ScatterChart'
import FengMap from '../../components/FengMap'
import { ElMessage } from 'element-plus'

export default {
  name: 'Location',
  components: { ScatterChart, FengMap },
  setup () {
    const state = reactive({
      settings: {
        userId: '',
        userName: '',
        userOptions: [],
        sceneId: '',
        sceneOptions: [],
        sampleNum: 1000000,
        displayFengMap: false
      },
      fengSettings: {
        fmapID: '',
        appName: '',
        appKey: ''
      }
    })
    onMounted(() => {
      getUserOptions()
      getSceneOptions()
    })

    const getUserOptions = async () => {
      // 请求后端数据
      const result = await get('api/user/get_list?pageSize=1000&pageNumber=1')
      if (result?.code === 200 && result?.data) {
        state.settings.userOptions = result.data.sceneList.map((item) => {
          return {
            id: item.id,
            name: item.username
          }
        })
      }
    }
    const getSceneOptions = async () => {
      // 请求后端数据
      const result = await get('api/scene/get_list?pageSize=1000&pageNumber=1')
      if (result?.code === 200 && result?.data) {
        state.settings.sceneOptions = result.data.sceneList.map((item) => {
          return {
            id: item.id,
            name: item.sceneName,
            fmapID: item.fengMapId,
            appName: item.fengAppName,
            appKey: item.fengKey
          }
        })
      }
    }
    const store = useStore()
    watch([() => state.settings.userId, () => state.settings.sceneId, () => state.settings.sampleNum], ([userId, sceneId, sampleNum], [oldUserId, oldSceneId, oldSampleNum]) => {
      store.commit('changeLocationSettings', { userId, sceneId, sampleNum })
      const curSceneSettings = state.settings.sceneOptions.find((item) => {
        return item.id === sceneId
      })
      console.log('change')
      if (curSceneSettings) {
        state.fengSettings.fmapID = curSceneSettings.fmapID
        state.fengSettings.appName = curSceneSettings.appName
        state.fengSettings.appKey = curSceneSettings.appKey
      }
    })
    const beforeDisplayFmap = () => {
      if (state.settings.sceneId === '') {
        ElMessage.error('请选择场景')
        return false
      }
      return true
    }

    return {
      ...toRefs(state),
      beforeDisplayFmap
    }
  }
}
</script>
<style lang="scss" scoped>
.settings__form{
  // height:50px;
  // line-height:50px;
}
</style>
