<template>
  <el-card>
      <el-form size="small" ref="formRef" :model="ruleForm" :rules="rules" label-width="120px" >
      <el-form-item label="场景名称" prop="sceneName" >
        <el-input type="text" style="width: 300px"  v-model="ruleForm.sceneName"></el-input>
      </el-form-item>
      <el-form-item label="背景地图" prop="imgUrl">
        <el-upload
          :action="uploadImgServer"
          accept="jpg,jpeg,png"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
          :on-success="handleUrlSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item required  label="背景调整" >
         <ImageTag  :imgUrl="ruleForm.imgUrl" />
      </el-form-item>
      <el-form-item label="蜂鸟fmapID" prop="fengMapId" >
        <el-input type="text" style="width: 300px"  v-model="ruleForm.fengMapId"></el-input>
      </el-form-item>
      <el-form-item label="蜂鸟appName" prop="fengAppName" >
        <el-input type="text" style="width: 300px"  v-model="ruleForm.fengAppName"></el-input>
      </el-form-item>
      <el-form-item label="蜂鸟key" prop="fengKey" >
        <el-input type="text" style="width: 300px"  v-model="ruleForm.fengKey"></el-input>
      </el-form-item>
      <el-form-item label="基站配置" prop="beaconSettings">
        <el-select v-model="ruleForm.beaconSettings" placeholder="请选择">
          <el-option v-for="item in beaconOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
         <el-button @click="handleCancle">取 消</el-button>
        <el-button type="primary" @click="submitForm()">{{ id ? '修改' : '创建' }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { uploadImgServer, remoteImgAddress } from '../../utils'
import { get, post } from '../../utils/request.js'
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, toRefs, onMounted } from 'vue'
import ImageTag from '../../components/ImageTag'
import { ElMessage } from 'element-plus'
export default {
  name: 'AddScene',
  components: { ImageTag },
  props: {
    type: String, // add 为新增；edit 为编辑
    reload: Function
  },
  setup (props) {
    const formRef = ref(null)
    const route = useRoute()
    const router = useRouter()
    const { id } = route.query // 编辑时传入的商品 id
    const state = reactive({
      uploadImgServer,
      ruleForm: {
        imgUrl: '',
        sceneName: '',
        beaconSettings: '',
        fmapSettings: '',
        fengMapId: '',
        fengAppName: '',
        fengKey: ''
      },
      beaconOptions: [
        {
          value: 12,
          label: '基站(群ID：12)'
        },
        {
          value: 34,
          label: '基站(群ID：34)'
        }
      ],
      beaconProps: { expandTrigger: 'hover' },
      rules: {
        imgUrl: [
          { required: 'true', message: '背景图片不能为空', trigger: ['change'] }
        ],
        sceneName: [
          { required: 'true', message: '场景名称不能为空', trigger: ['change'] }
        ]
      },
      id: id
    })
    onMounted(() => {
      getBeaconList()
      if (id) {
        getDetail(id)
      } else {
        state.ruleForm = {
          imgUrl: '',
          sceneName: '',
          beaconSettings: '',
          fmapSettings: '',
          fengMapId: '',
          fengAppName: '',
          fengKey: ''
        }
      }
    })
    // 获取所有的基站列表
    const getBeaconList = async () => {
      // 从后端拿到所有的基站，默认基站群不会超过100
      const result = await get('api/beacon/get_list?pageSize=100&pageNumber=1')
      if (result?.code === 200 && result?.data) {
        console.log(result.data.beaconList)
        state.beaconOptions = result.data.beaconList.map((item) => {
          return {
            value: item.id,
            label: '群ID：' + item.id + ''
          }
        })
      }
    }
    // 根据id获取场景详情
    const getDetail = async (id) => {
      const result = await get(`api/scene/detail?id=${id}`)
      if (result?.code === 200 && result?.data) {
        state.ruleForm = {
          imgUrl: result.data.imgUrl,
          sceneName: result.data.sceneName,
          beaconSettings: result.data.beaconSettings,
          fmapSettings: result.data.fmapSettings,
          fengMapId: result.data.fengMapId,
          fengAppName: result.data.fengAppName,
          fengKey: result.data.fengKey
        }
      }
    }
    // 提交表单
    const submitForm = () => {
      formRef.value.validate(async (valid) => {
        // valid 为是否通过表单验证的变量
        if (valid) {
          if (!id) {
            // 添加场景
            const data = {
              sceneName: state.ruleForm.sceneName,
              imgUrl: state.ruleForm.imgUrl,
              fmapSettings: state.ruleForm.fmapSettings,
              fengMapId: state.ruleForm.fengMapId,
              fengAppName: state.ruleForm.fengAppName,
              fengKey: state.ruleForm.fengKey,
              beaconSettings: state.ruleForm.beaconSettings
            }
            const result = await post('/api/scene/add', data)
            if (result?.code === 200) {
              ElMessage.success('新增场景成功')
              router.push({ path: '/scene' })
            }
          } else {
            // 修改场景
            const data = {
              id: state.id,
              sceneName: state.ruleForm.sceneName,
              imgUrl: state.ruleForm.imgUrl,
              fmapSettings: state.ruleForm.fmapSettings,
              fengMapId: state.ruleForm.fengMapId,
              fengAppName: state.ruleForm.fengAppName,
              fengKey: state.ruleForm.fengKey,
              beaconSettings: state.ruleForm.beaconSettings
            }
            console.log(data)
            const result = await post('/api/scene/update', data)
            if (result?.code === 200) {
              ElMessage.success('修改场景成功')
              router.push({ path: '/scene' })
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
        ElMessage.error('请上传 jpg，jpeg，png 格式的图片')
        return false
      }
      if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB')
        return false
      }
    }
    //
    const handleUrlSuccess = (res, file, fileList) => {
      state.ruleForm.imgUrl = remoteImgAddress + res.data || ''
    }
    //
    const handleCancle = () => {
      router.push({ path: '/scene' })
    }

    return {
      ...toRefs(state),
      formRef,
      submitForm,
      handleBeforeUpload,
      handleUrlSuccess,
      handleCancle
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
