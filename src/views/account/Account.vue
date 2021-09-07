<template>
  <el-card  style="margin-bottom:20px;">
    <el-form  label-width="80px" size="small" label-position="right" >
      <el-form-item label="登录名：" >
        <el-input style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="昵称：" >
        <el-input style="width: 200px" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" >确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-form label-width="80px" size="small" label-position="right" >
      <el-form-item label="原密码：" >
        <el-input style="width: 200px" ></el-input>
      </el-form-item>
      <el-form-item label="新密码：" >
        <el-input style="width: 200px" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" >确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  name: 'Account',
  data () {
    return {
    }
  },
  setup () {

  }
}
</script>
<style lang="scss" scoped>

</style>
