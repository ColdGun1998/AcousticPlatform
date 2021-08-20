<template>
  <div class="wrapper">
  <el-form  label-position="left" :model="settings" label-width="100px" size="mini" @submit.prevent>
      <el-form-item label="选择用户">
        <el-select v-model="settings.userId" placeholder="请选择">
          <el-option
            v-for="item in settings.userOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择场景">
        <el-select v-model="settings.sceneId" placeholder="请选择">
          <el-option
            v-for="item in settings.sceneOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="更新状态">
        <el-switch v-model="settings.connectStatus" />
      </el-form-item>
      <el-form-item label="显示地图">
        <el-switch v-model="settings.displayMap" />
      </el-form-item>
      <el-form-item  label="轨迹点个数">
        <el-input-number v-model="settings.sampleNum"  controls-position="right" :min="1" :max="120" :precision="0"></el-input-number>
      </el-form-item>
      <el-form-item label="轨迹连线">
        <el-switch v-model="settings.displayTrack" />
      </el-form-item>
      <el-form-item label="保存日志">
        <el-switch v-model="settings.saveLog"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { watch, reactive } from 'vue'
import { useStore } from 'vuex'
// 从服务器拉取用户和场景信息
// 默认选择第一个用户和第一个场景
// sampleNum，需要多少，请求多少
export default {
  name: 'LocationSettings',
  setup () {
    const store = useStore()
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
        name: '教九526实验室'
      },
      {
        id: 2,
        name: '教九一楼大厅'
      }],
      sampleNum: 10,
      connectStatus: true,
      displayMap: false,
      displayTrack: false,
      clearTrack: true,
      saveLog: false
    })
    watch([() => settings.userId, () => settings.sceneId, () => settings.sampleNum, () => settings.connectStatus], ([userId, sceneId, sampleNum, connectStatus], [oldUserId, oldSceneId, oldSampleNum, oldConnectStatus]) => {
      store.commit('changeLocationSettings', { userId, sceneId, sampleNum, connectStatus })
    })
    watch(() => settings.displayTrack, (displayTrack, oldDisplayTrack) => {
      store.commit('changeDisplaySettings', { displayTrack })
    })
    return {
      settings
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  flex:none;
  margin-left:20px;
  border-radius:6px;
  padding:20px ;
  border: 2px  solid #f1f1f3;
  width: 260px;
  max-height:calc(100vh-60px);
}

</style>
