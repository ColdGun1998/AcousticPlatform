<template>
<el-card class="wrapper">
  <template #header>
    <div class="settings">
      <el-form class="settings__form" :inline="true"  :model="settings"  @submit.prevent>
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
      </el-form>
    </div>
  </template>
  <ScatterChart/>
</el-card>
</template>

<script>
import { reactive, watch } from 'vue'
import { useStore } from 'vuex'
import ScatterChart from '../../components/ScatterChart'
export default {
  name: 'Location',
  components: { ScatterChart },
  setup () {
    const settings = reactive({
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
      sampleNum: 1000000
    })
    const store = useStore()
    watch([() => settings.userId, () => settings.sceneId, () => settings.sampleNum], ([userId, sceneId, sampleNum], [oldUserId, oldSceneId, oldSampleNum]) => {
      store.commit('changeLocationSettings', { userId, sceneId, sampleNum })
    })
    return {
      settings
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
