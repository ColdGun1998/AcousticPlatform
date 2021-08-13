<template>
<div class="docker">
  <div class="docker__title">
    <div class="icon__wrapper" >
      <div class="iconfont icon-shengyin"></div>
    </div>
    <div class="docker__name">SonicPlatform</div>
  </div>
  <div
  v-for="item in dockerList"
  :class="{'docker__item':true}"
  :key="item.icon"
  >
    <router-link :to='item.to' active-class='docker__item--active'>
      <div :class="['docker__item__icon','iconfont',item.icon]"></div>
      <div class="docker__item__text">{{item.text}}</div>
    </router-link>
  </div>

</div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: 'icon-local', text: 'Location', to: { name: 'Location' } },
      { icon: 'icon-line-basestationjizhan', text: 'Beacon', to: { name: 'Beacon' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/iconfont/iconfont.css';
.docker {
  display: flex;
  flex-direction: column;
  position: absolute;
  left:0;
  top:0;
  height: 100%;
  width: 220px;
  border-right: 2px  solid #f1f1f3;
  &__title{
    display: flex;
    height: 60px;
    border-bottom: 2px  solid #f1f1f3;
    margin: 15px 15px 5px;
    padding-left: 8px;
  }
  .icon__wrapper{
    margin-right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #eaf6fd;
    transform: translateY(30%);
    .icon-shengyin{
    color: #0471d7 ;
    font-size: 15px;
    transform:  rotate(-30deg) translate(17%,40%);
    }
  }
  &__name{
    flex:1;
    color: #2c333c;
    font-size: 18px;
    font-weight: bold;
    transform:  translateY(20%);
  }
  &__item{
    line-height: 30px;
    height: 30px;
    margin:  10px 15px ;
    padding: 0px 10px;
    a {
      display: flex;
      color: #474b53 ;
      text-decoration: none;
    }
    &--active{
      background-color: #fff;
      color: #0371d9 !important;
      border-radius: 3px;
      box-shadow:0 3px 2px #f9f9f9 ;
    }
    &__icon{
      margin-right: 10px;
      font-size: 20px;
    }
    &__text{
      flex: 1;
      font-size: 12px;
      font-weight: bolder;
    }

  }

}

</style>
