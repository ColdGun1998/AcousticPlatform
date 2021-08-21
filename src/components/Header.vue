<template>
    <div class="wrapper">{{name}}</div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Header',
  setup () {
    const router = useRouter()
    const state = reactive({ name: 'Location' })
    const pathMap = {
      Location: 'Location',
      Beacon: 'Beacon',
      Scene: 'Scene',
      History: 'History'
    }
    router.afterEach((to) => {
      state.name = pathMap[to.name]
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  height: 60px;
  border-bottom: 2px  solid #f1f1f3;
  color: #2c333c;
  font-size: 20px;
  font-weight: bold;
  display :flex;
  justify-content: space-between;
  align-items: center;
  padding:0 5px;
}
</style>
