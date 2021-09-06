<template>
    <el-card  class="header">
      <el-image
      style="width: 200px; height: 200px"
      :src="imgUrl"
      fit="contain">
        <template #error>
            <div class="image-slot">
            <i class="el-icon-picture-outline"></i>
            </div>
        </template>
      </el-image>
    </el-card>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'ImageTag',
  props: {
    imgUrl: String // 图片网址
  },
  setup (props) {
    const state = reactive({
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss" scoped>
.header{
    align-items:center;
}

</style>
