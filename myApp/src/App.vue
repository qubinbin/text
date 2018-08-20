<template>
  <div id="app">
    <router-view></router-view>
    <!--给当前的主模板 挂载一个下边导航组件-->
    <foot></foot>
  </div>
</template>

<script>
  //子组件的导入方式
  import foot from "@/components/footmenu";
export default {
  name: 'App',
  components:{
    //子组件的注册方式
    foot:foot
  }
}
</script>
<style scoped>
</style>
