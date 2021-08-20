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
    width:800px;
    height:600px;
    border: 2px  solid #f1f1f3;
}

</style>
