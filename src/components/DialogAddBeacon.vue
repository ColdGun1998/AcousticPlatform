<template>
  <el-dialog
    :title="type == 'add' ? '添加基站' : '修改基站'"
    v-model="visible"
    width="400px"
  >
      <el-form size="small" ref="formRef" :model="ruleForm" :rules="rules" label-width="100px" >
      <el-form-item label="基站个数" prop="size" >
        <el-input-number type="number"  :min="1" :max="10"  v-model="ruleForm.size" ></el-input-number>
      </el-form-item>
      <template
        v-for="index in +ruleForm.size"
        :key="index" >
      <el-form-item
        prop="coordinate"
        :label="'基站'+index+'坐标'">
        <el-input type="text" v-model = "ruleForm.coordinate[index-1]"></el-input>
      </el-form-item>
      </template>
      <el-form-item label="备注" prop="remark">
        <el-input type="text"  v-model="ruleForm.remark"></el-input>
      </el-form-item>
    </el-form>
 <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
 </template>
  </el-dialog>
</template>

<script>
import { get, post } from '../utils/request.js'
import { ref, reactive, toRefs, watch } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'DialogAddBeacon',
  props: {
    type: String, // add 为新增；edit 为编辑
    reload: Function
  },
  setup (props) {
    const formRef = ref(null)
    const state = reactive({
      visible: false,
      ruleForm: {
        size: 2,
        coordinate: new Array(2),
        remark: ''
      },
      rules: {
        size: [
          { required: 'true', message: '基站个数不能为空，在1到10之间', trigger: ['blur'] }
        ],
        coordinate: [
          { required: 'true', trigger: ['blur', 'change'] }
        ]
      },
      id: ''
    })
    watch(() => state.size, () => { // 通过一个函数返回要监听的属性
      if (state.size > 0 && state.size < 10) {
        state.coordinate = new Array(state.size)
      }
    })
    // 根据id获取基站详情
    const getDetail = async (id) => {
      const result = await get(`api/beacon/detail?id=${id}`)
      if (result?.code === 200 && result?.data) {
        state.ruleForm = {
          size: result.data.size,
          coordinate: result.data.coordinate.split(';'),
          remark: result.data.remark
        }
      }
    }
    // 开启弹窗
    const open = (id) => {
      state.visible = true
      if (id) {
        state.id = id
        getDetail(id)
      } else {
        state.ruleForm = {
          size: 2,
          coordinate: new Array(2),
          remark: ''
        }
      }
    }
    // 提交表单
    const submitForm = () => {
      formRef.value.validate(async (valid) => {
        // valid 为是否通过表单验证的变量
        if (valid) {
          if (props.type === 'add') {
            const data = {
              size: state.ruleForm.size,
              coordinate: state.ruleForm.coordinate,
              remark: state.ruleForm.remark
            }
            const result = await post('/api/beacon/add', data)
            if (result?.code === 200) {
              ElMessage.success('新增基站成功')
              state.visible = false
              if (props.reload) props.reload()
            }
          } else {
            // 修改基站
            const data = {
              id: state.id,
              size: state.ruleForm.size,
              coordinate: state.ruleForm.coordinate,
              remark: state.ruleForm.remark
            }
            console.log(data)
            const result = await post('/api/beacon/update', data)
            if (result?.code === 200) {
              ElMessage.success('修改场景成功')
              state.visible = false
              if (props.reload) props.reload()
            }
          }
        }
      })
    }
    return {
      ...toRefs(state),
      formRef,
      open,
      submitForm
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
