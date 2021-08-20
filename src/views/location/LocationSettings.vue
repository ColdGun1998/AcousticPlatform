<template>
  <div class="wrapper">
  <el-form  label-position="left" :model="settings" label-width="100px" size="mini" @submit.prevent>
      <el-form-item label="选择用户">
        <el-select v-model="settings.userName" placeholder="请选择">
          <el-option
            v-for="item in settings.userOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择场景">
        <el-select v-model="settings.sceneName" placeholder="请选择">
          <el-option
            v-for="item in settings.sceneOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开启连接">
        <el-switch v-model="settings.connectStatus" />
      </el-form-item>
      <el-form-item label="显示地图">
        <el-switch v-model="settings.displayMap" />
      </el-form-item>
      <el-form-item  label="轨迹点个数">
        <el-input-number v-model="settings.sampleNums" @change="handleSampleNumChange"  controls-position="right" :min="1" :max="50" precision="0"></el-input-number>
      </el-form-item>
      <el-form-item label="显示轨迹">
        <el-switch v-model="settings.displayTrack" />
      </el-form-item>
      <el-form-item label="清除轨迹">
        <el-switch v-model="settings.clearTrack" />
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
export default {
  name: 'LocationSettings',
  setup () {
    const store = useStore()
    const settings = reactive({
      userName: '',
      userOptions: [{
        value: '用户1',
        label: 'admin'
      },
      {
        value: '用户2',
        label: 'Mitchell'
      }],
      sceneName: '',
      sceneOptions: [{
        value: '场景1',
        label: '教九526实验室'
      },
      {
        value: '场景2',
        label: '教九一楼大厅'
      }],
      sampleNums: 2,
      connectStatus: true,
      displayMap: false,
      displayTrack: false,
      clearTrack: true,
      saveLog: false
    })
    watch(() => {
      return settings.userName
    }, (newVal, oldVal) => {
      const userId = 1
      const sceneId = 1
      store.commit('changeLocationSettings', { userId, sceneId })
    })
    return {
      settings
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  flex:auto;
  margin-left:20px;
  border-radius:6px;
  padding:20px ;
  border: 2px  solid #f1f1f3;
  max-height:calc(100vh-60px);
}

</style>
