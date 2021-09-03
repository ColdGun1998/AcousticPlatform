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
        label="基站群ID"
        >
      </el-table-column>
      <el-table-column
        prop="size"
        label="基站个数"
        width="150"
      >
      </el-table-column>
       <el-table-column
        label="基站坐标(x,y,z)/m"
        width = '300'
        >
        <template #default="scope">
         <el-form label-position="left" size="mini">
          <el-form-item
          v-for="(item,index) in  scope.row.coordinate"
          style = "margin:0px"
          :key="index"
          label-width="50"
          :label="'基站'+(index+1)+':'">
            <span>{{item}}</span>
          </el-form-item>
         </el-form>
        </template>
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
        prop="remark"
        label="备注"
        width="150"
      >
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
  <DialogAddBeacon ref='addBeacon' :reload="getBeaconList" :type="actionType"/>
</template>
<script>
import { get, post } from '../../utils/request.js'
import DialogAddBeacon from '../../components/DialogAddBeacon'
import { onMounted, ref, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
export default {
  components: { DialogAddBeacon },
  name: 'Beacon',
  setup () {
    const state = reactive({
      loading: false, // 控制加载动画
      tableData: [], // 数据列表
      currentPage: 1, // 当前页数
      pageSize: 5, // 每页请求数
      total: 0, // 总页数
      actionType: 'add', // 操作类型
      multipleSelection: [] // 选中项
    })
    const addBeacon = ref(null)
    const handleAdd = () => {
      state.actionType = 'add'
      addBeacon.value.open()
    }
    const handleDelete = async () => {
      if (!state.multipleSelection.length) {
        ElMessage.error('请选择至少一个基站')
        return
      }
      const data = {
        id: state.multipleSelection.map(item => item.id)
      }
      const result = await post('/api/beacon/delete', data)
      if (result?.code === 200) {
        ElMessage.success('删除成功')
        getBeaconList()
      }
    }

    const handleDeleteOne = async (id) => {
      const data = {
        id
      }
      const result = await post('/api/beacon/delete', data)
      if (result?.code === 200) {
        ElMessage.success('删除成功')
        getBeaconList()
      }
    }
    const handleSelectionChange = (val) => {
      state.multipleSelection = val
    }
    const handleEdit = (id) => {
      state.actionType = 'edit'
      addBeacon.value.open(id)
    }
    onMounted(() => {
      getBeaconList()
    })
    const getBeaconList = async () => {
      // 模拟从后端拿到基站列表
      state.loading = true
      // 请求后端数据
      const result = await get(`api/beacon/get_list?pageSize=${state.pageSize}&pageNumber=${state.currentPage}`)
      if (result?.code === 200 && result?.data) {
        state.tableData = result.data.beaconList
        state.total = result.data.total
        state.loading = false
      }
    }
    const changePage = (val) => {
      state.currentPage = val
      getBeaconList()
    }
    return {
      ...toRefs(state),
      addBeacon,
      getBeaconList,
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
