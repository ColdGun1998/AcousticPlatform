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
      @selection-change="handleSelectionChange"
     >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
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
      >
      </el-table-column>
      <el-table-column
        prop="beaconSettings"
        label="基站配置"
        width="120"
      >
      </el-table-column>
      <el-table-column
        label="添加时间"
        width="200"
      >
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.ctime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.id)">修改</a>
          <el-popconfirm
            title="确定删除吗？"
            confirmButtonText='确定'
            cancelButtonText='取消'
            @confirm="handleDeleteOne(scope.row.id)"
          >
            <template #reference>
              <a style="cursor: pointer" >删除</a>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    class = "pagination"
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    :current-page="currentPage"
    @current-change="changePage">
    </el-pagination>
  </el-card>
</template>
<script>
import { get, post } from '../../utils/request.js'
import { onMounted, ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export default {
  name: 'Scene',
  setup () {
    const router = useRouter()
    const state = reactive({
      loading: false, // 控制加载动画
      tableData: [], // 数据列表
      currentPage: 1, // 当前页数
      pageSize: 2, // 每页请求数
      total: 0, // 总页数
      actionType: 'add', // 操作类型
      multipleSelection: [] // 选中项
    })
    const addScene = ref(null)
    const handleAdd = () => {
      router.push({ path: '/addScene' })
    }
    const handleDelete = async () => {
      if (!state.multipleSelection.length) {
        ElMessage.error('请选择至少一项场景')
        return
      }
      const data = {
        id: state.multipleSelection.map(item => item.id)
      }
      const result = await post('/api/scene/delete', data)
      if (result?.code === 200) {
        ElMessage.success('删除成功')
        getSceneList()
      }
    }

    const handleDeleteOne = async (id) => {
      const data = {
        id
      }
      const result = await post('/api/scene/delete', data)
      if (result?.code === 200) {
        ElMessage.success('删除成功')
        getSceneList()
      }
    }
    const handleSelectionChange = (val) => {
      state.multipleSelection = val
    }
    const handleEdit = (id) => {
      router.push({ path: '/addScene', query: { id } })
    }
    onMounted(() => {
      getSceneList()
    })
    const getSceneList = async () => {
      // 模拟从后端拿到场景列表
      state.loading = true
      // 请求后端数据
      const result = await get(`api/scene/get_list?pageSize=${state.pageSize}&pageNumber=${state.currentPage}`)
      if (result?.code === 200 && result?.data) {
        state.tableData = result.data.sceneList
        state.total = result.data.total
        state.loading = false
      }
    }
    const changePage = (val) => {
      state.currentPage = val
      getSceneList()
    }
    return {
      ...toRefs(state),
      addScene,
      getSceneList,
      handleAdd,
      handleDelete,
      handleEdit,
      handleDeleteOne,
      handleSelectionChange,
      changePage
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination{
 text-align:center;
 margin-top:10px;
}
</style>
