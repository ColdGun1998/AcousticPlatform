<template>
  <el-card class="card">
    <template #header>
      <div class="header">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">增加</el-button>
        <el-popconfirm
          title="确定删除吗？"
          confirmButtonText='确定'
          cancelButtonText='取消'
          @confirm="handleDelete"
        >
          <template #reference>
            <el-button type="danger" size="small" icon="el-icon-delete">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-table
      :data="tableData"
      style="width: 100% "
     >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="sceneId"
        label="场景ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sceneName"
        label="场景名称"
        width="150"
      >
      </el-table-column>
      <el-table-column
        label="背景地图"
        width="200"
        >
        <template #default="scope">
          <img style="width: 150px;height: 150px" :src="scope.row.imgUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="fmapSettings"
        label="蜂鸟地图配置"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="beaconSettings"
        label="基站配置"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间"
      >
      </el-table-column>
    </el-table>
  </el-card>
  <DialogAddScene ref='addScene' :type="actionType"/>
</template>
<script>
import DialogAddScene from '../../components/DialogAddScene'
import { onMounted, ref, reactive, toRefs } from 'vue'
export default {
  components: { DialogAddScene },
  name: 'Secne',
  setup () {
    const state = reactive({
      loading: false, // 控制加载动画
      tableData: [], // 数据列表
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页请求数
      actionType: 'add' // 操作类型
    })
    const addScene = ref(null)
    const handleAdd = () => {
      state.actionType = 'add'
      console.log(addScene)
      addScene.value.open()
    }
    const handleDelete = () => {
    }
    onMounted(() => {
      getSceneList()
    })
    const getSceneList = () => {
      // 模拟从后端拿到场景列表
      state.loading = true
      // 请求后端数据
      const sceneList = [{
        sceneId: 1,
        sceneName: '教九实验室',
        imgUrl: '',
        fmapSettings: '464435434',
        beaconSettings: '1.2-2.3-4.5&1.4-7.6-4.7',
        createTime: '2021-8-20'
      }, {
        sceneId: 2,
        sceneName: '教九一楼大厅',
        imgUrl: '',
        fmapSettings: '4444453487',
        beaconSettings: '基站配置',
        createTime: '2021-8-19'
      }
      ]
      // 赋值
      state.tableData = sceneList
    }
    return {
      ...toRefs(state),
      addScene,
      handleAdd,
      handleDelete
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
