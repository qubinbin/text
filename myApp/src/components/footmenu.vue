<template>
  <div id="footmenu">
    <ul class="ul_foot">
      <li v-for="(item,index) in bottommenu" @click="clickmenu(index)">
        <router-link :class="{colorFont:item.istrue}" :to="item.action">
          <i class="iconfont" v-html="item.icon"></i><br/>
          {{item.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name:"footmenu",
    data(){
      return {
          //声明变量 控制下边的菜单
          bottommenu:[
            {name:"首页",action:"/",icon:"&#xf012b;",istrue:false},
            {name:"闪购",action:"/sg",icon:"&#xf0139;",istrue:false},
            {name:"订单",action:"/dd",icon:"&#xf0178;",istrue:false},
            {name:"我的",action:"/my",icon:"&#xf012d;",istrue:false}
          ]
      }
    },
    methods:{
      clickmenu:function (index){
        //改回所有的状态
        for(var i=0;i<this.bottommenu.length;i++)
        {
          this.bottommenu[i].istrue=false;
        }
        this.bottommenu[index].istrue=true;
      }
    }
  }
</script>
<style>
#footmenu{
  position:fixed;
  bottom: 0;
  width:320px;
  background-color: white;
}
  .ul_foot{
    margin: 0;
    padding: 0;
    overflow: hidden;
    border-top: 1px solid black;
  }
  .ul_foot>li{
    list-style: none;
    float: left;
    width: 80px;
    text-align: center;
    padding:5px 0;
  }
  .ul_foot>li a i{
    font-size:20px;
  }
  .ul_foot>li a{
    text-decoration: none;
    color: #6c6c6c;
    font-size: 12px;
  }
  .colorFont{
    color: orange !important;
  }
</style>
