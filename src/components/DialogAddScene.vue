<template>
  <el-dialog
    :title="type == 'add' ? '添加场景' : '修改场景'"
    v-model="visible"
    width="400px"
  >
      <el-form size="small" ref="formRef" :model="ruleForm" :rules="rules" label-width="100px" >
      <el-form-item label="背景地图" prop="imgUrl">
        <el-upload
          class="avatar-uploader"
          :action="uploadImgServer"
          accept="jpg,jpeg,png"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
          :on-success="handleUrlSuccess"
        >
          <img  v-if="ruleForm.imgUrl" :src="ruleForm.imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="场景名称" prop="sceneName" >
        <el-input type="text"  v-model="ruleForm.sceneName"></el-input>
      </el-form-item>
      <el-form-item label="蜂鸟地图配置" prop="fmapSettings" >
        <el-input type="text"  v-model="ruleForm.fmapSettings"></el-input>
      </el-form-item>
      <el-form-item label="基站配置" prop="beaconSettings">
        <el-input type="text"  v-model="ruleForm.beaconSettings"></el-input>
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
import { uploadImgServer, remoteImgAddress } from '../utils'
import { get, post } from '../utils/request.js'

import { ref, reactive, toRefs } from '@vue/reactivity'
import { ElMessage } from 'element-plus'
export default {
  name: 'DialogAddScene',
  props: {
    type: String, // add 为新增；edit 为编辑
    reload: Function
  },
  setup (props) {
    const formRef = ref(null)
    const state = reactive({
      uploadImgServer,
      visible: false,
      ruleForm: {
        imgUrl: '',
        sceneName: '',
        beaconSettings: '',
        fmapSettings: ''
      },
      rules: {
        imgUrl: [
          { required: 'true', message: '背景图片不能为空', trigger: ['change'] }
        ],
        sceneName: [
          { required: 'true', message: '场景名称不能为空', trigger: ['change'] }
        ]
      },
      id: ''
    })
    // 根据id获取场景详情
    const getDetail = async (id) => {
      const result = await get(`api/scene/detail?id=${id}`)
      if (result?.code === 200 && result?.data) {
        state.ruleForm = {
          imgUrl: result.data.imgUrl,
          sceneName: result.data.sceneName,
          beaconSettings: result.data.beaconSettings,
          fmapSettings: result.data.fmapSettings
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
          imgUrl: '',
          sceneName: '',
          beaconSettings: '',
          fmapSettings: ''
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
              sceneName: state.ruleForm.sceneName,
              imgUrl: state.ruleForm.imgUrl,
              fmapSettings: state.ruleForm.fmapSettings,
              beaconSettings: state.ruleForm.beaconSettings
            }
            const result = await post('/api/scene/add', data)
            if (result?.code === 200) {
              ElMessage.success('新增场景成功')
              state.visible = false
              if (props.reload) props.reload()
            }
          } else {
            // 修改场景
            const data = {
              id: state.id,
              sceneName: state.ruleForm.sceneName,
              imgUrl: state.ruleForm.imgUrl,
              fmapSettings: state.ruleForm.fmapSettings,
              beaconSettings: state.ruleForm.beaconSettings
            }
            const result = await post('/api/scene/update', data)
            if (result?.code === 200) {
              ElMessage.success('修改场景成功')
              state.visible = false
              if (props.reload) props.reload()
            }
          }
        }
      })
    }
    //
    const handleBeforeUpload = (file) => {
      const sufix = file.name.split('.')[1] || ''
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!['jpg', 'jpeg', 'png'].includes(sufix)) {
        ElMessage.error('请上传 jpg、jpeg、png 格式的图片')
        return false
      }
      if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB')
        return false
      }
    }
    //
    const handleUrlSuccess = (res) => {
      state.ruleForm.imgUrl = remoteImgAddress + res.data || ''
    }
    return {
      ...toRefs(state),
      formRef,
      open,
      submitForm,
      handleBeforeUpload,
      handleUrlSuccess
    }
  }
}
</script>
<style lang="scss" scoped>
 .avatar-uploader {
    width: 100px;
    height: 100px;
    color: #ddd;
    font-size: 30px;
  }
  .avatar-uploader-icon {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #e9e9e9;
    border-radius: 6px;
    padding: 32px 17px;
  }
  .avatar{
    display: block;
    width: 100px;
    height: 100px;
    border: 1px solid #e9e9e9;
    border-radius: 6px;
  }
</style>
