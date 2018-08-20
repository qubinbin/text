<template>
   <div class="details">
      <div class="bigimage">
        <img class="imagebig" :src="oneinfo.image" alt=""/>
      </div>
      <p><b>{{oneinfo.name}}</b></p>
      <p>月售：{{oneinfo.sellCount}}</p>
      <p class="p_line"><span class="price">￥{{oneinfo.price}}</span><button class="btnadd">+购物车</button></p>
      <p>商品描述：</p>
      <p class="miaoshu">{{oneinfo.info}}</p>
      <p>外卖评价：</p>
      <div class="ratings">
          <div class="rat" v-for="rats in oneinfo.ratings">
            <img class="userlogo" :src="rats.avatar" alt=""/>
            <span>{{rats.username}}</span>
            <span class="time">{{rats.rateTime | showtime}}</span>
            <p>{{rats.text}}</p>
          </div>
      </div>
   </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name:"detailed",
    data(){
      return{
          p_index:0,
          c_index:0,
          detailinfo:null,
          oneinfo:""
      }
    },
    filters:{
      //局部注册过滤器
      showtime:function (value){
         //时间转化
        var time=new Date(value).toLocaleString();
        return time;
      }
    },
    created:function (){
      this.p_index=this.$route.params.parindex;
      this.c_index=this.$route.params.childindex;
      this.$http.get("static/data.json").then((res)=>{
        this.detailinfo=res.data.goods;
        this.oneinfo=this.detailinfo[this.p_index].foods[this.c_index];
      });
    }
  }
</script>
<style>
 .details{
   padding: 5px 15px;
 }
  .imagebig{
    max-width: 100%;
  }
  .price{
    color: red;
    font-weight: bold;
  }
  .btnadd{
    float: right;
    border-style: none;
    outline: none;
    border-radius: 5px;
    font-size: small;
    background-color: orange;
    color: white;
    padding: 4px 10px;
  }
  .p_line{
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 10px;
  }
  .miaoshu{
    font-size: small;
  }
  .ratings{
    margin-bottom: 50px;
  }
  .rat{
    height:auto;
    padding: 5px 0;
    border-bottom: 1px solid #d8d8d8;
  }
  .userlogo{
    width: 40px;
  }
  .time{
    font-size: 12px;
    color: grey;
  }
</style>
