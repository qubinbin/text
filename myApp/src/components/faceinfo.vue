<template>
  <div>
    <div class="titleimg">
      <div class="logo">
        <img :src="seller.avatar" alt=""/>
      </div>
      <div class="logotext">
        <p class="p_name"><b>{{seller.name}}</b><span>{{seller.description}}</span></p>
        <p class="p_content">{{seller.bulletin | soutext}}</p>
        <p><span class="sorce">{{seller.score}}</span></p>
      </div>
    </div>
    <div :class="{sup:true,isheight:addclass}">
      <div class="youhui">
        <ul class="ul_list">
          <li v-for="item in seller.supports">
            {{item.description}}
          </li>
        </ul>
      </div>
      <i @click="btnaddclass()" class="iconfont jian">&#xf0170;</i>
    </div>
    <food></food>
  </div>
</template>
<script>
  //使用子组件  导入
  import food from "@/components/food"
  export default  {
    name:"face",
    components:{
      food:food
    },
    data(){
       return {
         seller:[],
         addclass:false
       }
    },
    //生命周期加载之后
    created:function (){
    this.$http.get("static/data.json").then(function (res){
      this.seller=res.data.seller;
     });
    },
    methods:{
      btnaddclass:function (){
        this.addclass=!this.addclass;
      }
   }
  }
</script>
<style>
  .titleimg{
    width: 300px;
    height:80px;
    padding: 0px 10px;
    padding-top: 50px;
    padding-bottom: 10px;
    background-color: #696969;
    display: flex;
    flex-direction: row;
  }
  .logo{
    flex: 2;
    height: 80px;
  }
  .logotext{
    flex: 5;
    height: 80px;
    padding-left: 15px;
  }
  .logo img{
    width: 100%;
    height: 100%;
  }
  .p_name{
    color: white;
    font-size: 15px;
  }
  .p_name span{
    font-size: 13px;
  }
  .p_content{
    color: white;
    font-size: 13px;
    margin: 5px 0;
  }
  .sorce{
    color: white;
    font-size: small;
  }
  .sup{
    position: relative;
    z-index: 5;
    height: 30px;
    background-color: white;
    /*border-bottom: 1px solid #e0e0e0;*/
    overflow: hidden;
    transition: all 0.3s linear;
  }
  .ul_list{
    margin: 5px 10px;
    padding: 0;
  }
  .ul_list>li{
    list-style: none;
    font-size: 12px;
    color: gray;
    line-height: 25px;
  }
  .jian{
    position: absolute;
    z-index: 4;
    top: 10px;
    right: 20px;
    font-size: 12px;
    color: grey;
  }
  .isheight{
    height: 110px;
  }
</style>
