<template>
  <el-dialog
    :title="type == 'add' ? '添加轮播图' : '修改轮播图'"
    v-model="visible"
    width="400px"
  >
 <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
 </template>
  </el-dialog>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
export default {
  name: 'DialogAddScene',
  props: {
    type: String // add 为新增；edit 为编辑
  },
  setup (props) {
    const state = reactive({
      visible: false
    })
    // 开启弹窗
    const open = () => {
      state.visible = true
    }
    // 提交表单
    const submitForm = () => {
      state.visible = false
    }
    return {
      ...toRefs(state),
      open,
      submitForm
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
