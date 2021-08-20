<template>
    <div :body-style="{padding:'0px'}" class="wrapper">
        <ScatterChart/>
    </div>
</template>
<script>
import ScatterChart from '../../components/ScatterChart'
export default {
  name: 'Map',
  data () {
    return {
    }
  },
  components: { ScatterChart },
  setup () {

  }
}
</script>
<style lang="scss" scoped>
.wrapper{
    flex:none;
    border-radius:6px;
    border: 2px  solid #f1f1f3;
    width: 600px;
    height: 600px;
}

</style>
