<template>
  <div class="layout">
      <Docker :currentIndex="1"/>
      <div class="content">
        <RightHead/>
        <div class ="main">
          <router-view />
        </div>
      </div>
  </div>
</template>

<script>
// import { reactive, toRefs } from 'vue'
// import { useRouter } from 'vue-router'
import Docker from './components/Docker'
import RightHead from './components/RightHead'
export default ({
  name: 'App',
  components: { Docker, RightHead },
  setup () {

  }
})
</script>

<style lang="scss">
.layout{
  display : flex;
  align-items: flex-start;
  min-height:100vh;
}
.content{
    flex: auto;
    max-height: 100vh;
    display:flex;
    flex-direction:column;
    overflow:hidden;
    padding:0 20px;
}
.main{
  height: calc(100vh - 60px);
  overflow:auto;
  padding:20px 0;
  box-sizing:border-box;
}

</style>
