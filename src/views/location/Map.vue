<template>
    <div class="wrapper"></div>
</template>
<script>
import { wsMessage } from '../../utils/wsMessage'
export default {
  name: 'Map',
  setup () {
    wsMessage.connect('立即与服务器通信')
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
    position: absolute;
    left: 0;
    top:0;
    margin: 25px 25px;
    border-radius: 20px;
    width: 60%;
    height: 75%;
    border: 2px  solid #f1f1f3;
    background:url('../../assets/img/laboratory.jpg') no-repeat;
}

</style>
