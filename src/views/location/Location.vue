<template>
  <div class="wrapper">
  <Map/>
  <LocationSettings/>
  </div>
</template>

<script>
import Map from './Map'
import LocationSettings from './LocationSettings'
export default ({
  name: 'Location',
  components: { Map, LocationSettings },
  setup () {
  }
})
</script>

<style lang="scss" scoped>
.wrapper{
  display: flex;
  align-items: flex-start;
  min-height:calc(100vh-60px);
}
</style>
