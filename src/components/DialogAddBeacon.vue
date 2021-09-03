<template>
  <el-dialog
    :title="type == 'add' ? '添加基站' : '修改基站'"
    v-model="visible"
    width="400px"
  >
      <el-form size="small" ref="beaconForm" :model="beaconForm" label-width="100px" >
      <el-form-item
        label="基站个数"
        prop="size"
        :rules="{ required: 'true', message: '基站个数不能为空，在1到10之间', trigger: ['blur'] }"
      >
        <el-input-number type="number" @change="sizeChange" :min="1" :max="10"  v-model="beaconForm.size" ></el-input-number>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in beaconForm.coordinate"
        :label="'基站' + (index+1)"
        :key="index"
        :prop="'coordinate.' + index + '.value'"
        :rules="[
          {required: true, message: '基站坐标不能为空', trigger: 'blur'},
         { validator: validateCoordinate, trigger: 'blur' }]"
      >
        <el-input v-model="item.value"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="text"  v-model="beaconForm.remark"></el-input>
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
import { ElMessage } from 'element-plus'

export default {
  name: 'DialogAddBeacon',
  props: {
    type: String, // add 为新增；edit 为编辑
    reload: Function
  },
  data () {
    return {
      visible: false,
      beaconForm: {
        size: 1,
        coordinate: [{ value: '' }],
        remark: ''
      },
      id: ''
    }
  },
  methods: {
    validateCoordinate (rule, value, callback) {
      if (value === '') {
        callback(new Error('基站地址不为空'))
      }
      const strArr = value.split(',')
      if (strArr && strArr.length === 3 && strArr.find((item) => !(isFinite(item) && item !== '')) === undefined) {
        callback()
      } else {
        callback(new Error('格式错误！请输入三维坐标,用英文逗号隔开'))
      }
    },
    sizeChange (newVal, oldVal) {
      const oldCoordinate = this.beaconForm.coordinate
      this.beaconForm.coordinate = new Array(newVal).fill('').map(() => { return { value: '' } })
      const minSize = Math.min(newVal, oldVal)
      for (let i = 0; i < minSize; i++) {
        this.beaconForm.coordinate[i] = oldCoordinate[i]
      }
    },
    // 根据ID获取基站群详情
    getDetail: async function (id) {
      const result = await get(`api/beacon/detail?id=${id}`)
      if (result?.code === 200 && result?.data) {
        this.beaconForm = {
          size: result.data.size,
          coordinate: result.data.coordinate.split(';').map(item => { return { value: item } }),
          remark: result.data.remark
        }
      }
    },
    // 开启弹窗
    open: function (id) {
      this.visible = true
      if (id) {
        this.id = id
        this.getDetail(id)
      } else {
        this.beaconForm = {
          size: 1,
          coordinate: [{
            value: ''
          }],
          remark: ''
        }
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    },
    // 提交表单
    submitForm: function () {
      this.$refs.beaconForm.validate(async (valid) => {
        // valid 为是否通过表单验证的变量
        if (valid) {
          if (this.type === 'add') {
            const data = {
              size: this.beaconForm.size,
              coordinate: this.beaconForm.coordinate.map((item) => {
                return item.value.split(',').map((str) => Number(str).toFixed(2)).join(',')
              }),
              remark: this.beaconForm.remark
            }
            const result = await post('/api/beacon/add', data)
            if (result?.code === 200) {
              ElMessage.success('新增基站成功')
              this.visible = false
              if (this.reload) this.reload()
            }
          } else {
            // 修改基站
            const data = {
              id: this.id,
              size: this.beaconForm.size,
              coordinate: this.beaconForm.coordinate.map((item) => {
                return item.value.split(',').map((str) => Number(str).toFixed(2)).join(',')
              }),
              remark: this.beaconForm.remark
            }
            const result = await post('/api/beacon/update', data)
            if (result?.code === 200) {
              ElMessage.success('修改场景成功')
              this.visible = false
              if (this.reload) this.reload()
            }
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
