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
      <el-form-item label="显示蜂鸟地图">
        <el-switch v-model="settings.displayFengMap" ></el-switch>
      </el-form-item>
      </el-form>
    </div>
  </template>
  <ScatterChart v-if="!settings.displayFengMap"/>
  <FengMap v-else/>
</el-card>
</template>

<script>
import { reactive, watch, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
import ScatterChart from '../../components/ScatterChart'
import FengMap from '../../components/FengMap'
export default {
  name: 'Location',
  components: { ScatterChart, FengMap },
  setup () {
    const state = reactive({
      settings: {
        userId: 1,
        userOptions: [{
          id: 1,
          name: 'admin'
        },
        {
          id: 2,
          name: 'Mitchell'
        }],
        sceneId: 1,
        sceneOptions: [{
          id: 1,
          name: '邵逸夫体育馆'
        },
        {
          id: 2,
          name: '教九一楼大厅'
        }],
        sampleNum: 1000000,
        displayFengMap: false
      }
    })
    onMounted(() => {

    })
    const store = useStore()
    watch([() => state.settings.userId, () => state.settings.sceneId, () => state.settings.sampleNum], ([userId, sceneId, sampleNum], [oldUserId, oldSceneId, oldSampleNum]) => {
      store.commit('changeLocationSettings', { userId, sceneId, sampleNum })
    })
    return {
      ...toRefs(state)
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
