<template>
  <div class="layout">
    <el-container class="container">
      <el-aside class="aside">
      <Docker :currentIndex="1"/>
      </el-aside>
      <el-container class="content">
        <Header/>
        <div class ="main">
          <router-view />
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Docker from './components/Docker'
import Header from './components/Header'
export default ({
  name: 'App',
  components: { Docker, Header },
  setup () {

  }
})
</script>

<style lang="scss" scoped>
.layout{
  min-height:100vh;
  background-color: #fff;
}
.container{
  height: 100vh;
}
.aside{
  width: 240px!important;
  border-right: 2px  solid #f1f1f3;
}

.content{
    display:flex;
    flex-direction:column;
    max-height: 100vh;
    overflow:hidden;
}
.main{
  height: calc(100vh - 60px);
  overflow:auto;
  padding:20px;
  box-sizing: border-box;
}

</style>
