<template>
  <div id="app">
    <HeaderHome></HeaderHome>
    <router-view></router-view>
    <FooterHome v-show="$route.meta.isShow"></FooterHome>
  </div>
</template>

<script>
// 引入头部、尾部非路由组件
import HeaderHome from './components/Header'
import FooterHome from './components/Footer'

export default {
  name: 'App',
  components: {
    HeaderHome,
    FooterHome,
  },
  mounted(){
    // 派发一个action || 获取商品分类中的三级列表的数据
    this.$store.dispatch("home/categoryList");
  }
}
</script>

<style>
</style>
