<template>
  <Docker :currentIndex="1"/>
  <RightHead />
  <MainContent/>
</template>

<script>
import Docker from './components/Docker'
import MainContent from './components/MainContent'
import RightHead from './components/RightHead'
export default ({
  name: 'App',
  components: { Docker, MainContent, RightHead }
})
</script>

<style lang="scss">

</style>
