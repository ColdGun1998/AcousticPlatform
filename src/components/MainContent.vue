<template>
  <div class='wrapper'>
    <router-view />
  </div>
</template>
<script>
export default {
  setup () {

  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  height: calc(100vh - 60px);
  overflow:auto;
  padding:20px 0;
  box-sizing:border-box;
}
</style>
