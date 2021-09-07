<template>
<div class="docker">
  <div class="docker__icon">
    <div class="icon__wrapper" >
      <div class="iconfont icon-shengyin"></div>
    </div>
    <span class="docker__text">AcoutsticPlatform</span>
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
      { icon: 'icon-line-basestationjizhan', text: 'Beacon', to: { name: 'Beacon' } },
      { icon: 'icon-changdi', text: 'Scene', to: { name: 'Scene' } },
      { icon: 'icon-history', text: 'History', to: { name: 'History' } },
      { icon: 'icon-user_account', text: 'Account', to: { name: 'Account' } }
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
  padding:0 10px;
  &__icon{
    display: flex;
    align-items:center;
    justify-content:center;
    height: 60px;
    border-bottom: 2px  solid #f1f1f3;
  }
  .icon__wrapper{
    margin-right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #eaf6fd;
    .icon-shengyin{
    color: #0471d7 ;
    font-size: 15px;
    transform:  rotate(-30deg) translate(17%,40%);
    }
  }
  &__text{
    color: #2c333c;
    font-size: 18px;
    font-weight: bold;
  }
  &__item{
    line-height: 30px;
    height: 30px;
    margin:  20px 0px  0px 0px;
    a {
      display: flex;
      color: #474b53 ;
      padding: 0px 10px;
    }
    &--active{
      background-color: #fff;
      color: #0371d9 !important;
      border-radius: 3px;
      box-shadow:0 6px 6px 0px #f1f1f3 ;
    }
    &__icon{
      margin-right: 15px;
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
