<template>
  <div>
    <div id="food">
      <div class="left" ref="menuWrapper">
        <ul>
          <li class="foodname" v-for="(food,index) in foodinfo"  @click="selectMenu(index)">
            {{food.name}}
          </li>
        </ul>
      </div>
      <div class="right" ref="foodsWrapper">
        <ul>
          <li v-for="(foodlist,indexp) in foodinfo">
            <ul>
              <li class="li-item-food  food-list-hook" v-for="(f,index) in foodlist.foods">
                <div class="li_childleft">
                  <router-link :to="{name:'details',params:{parindex:indexp,childindex:index}}"><img class="img-item-small" :src="f.icon" alt=""/></router-link>
                </div>
                <div class="li_childright">
                  <span class="name">{{f.name | souname}} {{f.description | souname}}</span>
                  <span class="price">￥{{f.price}}</span>
                  <span class="sell">月销（{{f.sellCount}}）</span>
                  <div class="cart">
                    <div>
                      <span v-show="alldata[indexp].content[index].btnshow" @click="btnnumjian(indexp,index)">-</span>
                    </div>
                    <div>
                      <span v-show="alldata[indexp].content[index].btnshow">{{alldata[indexp].content[index].number}}</span>
                    </div>
                    <div>
                      <span @click="btnnumadd(indexp,index)">+</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="cartdata">
       <div>总计：{{allprice}}￥</div>
       <div><router-link to="/cart">去结算</router-link></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import bScroll from "better-scroll";
  import datalistinfo from "@/components/datainfo/datalist"
  export default {
    name:"food",
    filters:{
      souname:function (value){
        if(value==undefined)return;
        if(value.length>5)
        {
          return value.substr(0,5)+"..";
        }
        return value;
      }
    },
    data(){
    return {
        foodinfo:[],
        leftmenuindex:0,
        rightmenuindex:0,
        listHeight: [],
        scrollY: 0,
        alldata:"",
        allprice:0
    }
    },
    created:function (){
      this.$http.get("static/data.json").then(function (res){
          this.foodinfo=res.data.goods;
         //计算总数据
        for(var i=0;i<this.foodinfo.length;i++)
        {
          datalistinfo.data.push({
             id:i,
             content:[]
          });
          for(var k=0;k<this.foodinfo[i].foods.length;k++)
          {
            datalistinfo.data[i].content.push(
              {
                 name:this.foodinfo[i].foods[k].name,
                 price:this.foodinfo[i].foods[k].price,
                 icon:this.foodinfo[i].foods[k].icon,
                 btnshow:false,
                 number:0
              }
            );
          }
        }
        this.alldata=datalistinfo.data;
      });
      this.$nextTick(function (){
        //发生更新后要执行的事件
        this._initScroll()
      })
    },
    methods:{
      selectMenu:function (index){
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el,300)
      },
      _initScroll:function (){
        this.meunScroll = new bScroll(this.$refs.menuWrapper, {
          click:true
        })
        this.foodsScroll = new bScroll(this.$refs.foodsWrapper, {
          click:true
        })
      },
      btnnumadd:function (pindex,index){
        this.alldata[pindex].content[index].btnshow=true;
        //数量++
        this.alldata[pindex].content[index].number++;

        this.savecart(this.alldata[pindex].content[index]);
        this.totlepricedata();
      },
      btnnumjian:function (pindex,index){
        //数量--
        this.alldata[pindex].content[index].number--;
        if(this.alldata[pindex].content[index].number<1)
        {
          this.alldata[pindex].content[index].btnshow=false;
        }
        this.savecart(this.alldata[pindex].content[index]);
        this.totlepricedata();
      },
      savecart:function (obj){
         for(var i=0;i<datalistinfo.usercart.length;i++)
         {
            if(datalistinfo.usercart[i].name==obj.name)
            {
              datalistinfo.usercart[i].number=obj.number;
              if(datalistinfo.usercart[i].number<=0)
              {
                datalistinfo.usercart.splice(i,i+1);
              }
              return;
            }
         }
         datalistinfo.usercart.push(obj);
      },
      totlepricedata:function (){
        datalistinfo.totleprice=0;
        for(var i=0;i<datalistinfo.usercart.length;i++){
          datalistinfo.totleprice+=datalistinfo.usercart[i].number*datalistinfo.usercart[i].price;
        }
        this.allprice=datalistinfo.totleprice;
      }
   }
  }
</script>
<style>
  #food {
    height: 300px;
    display: flex;
    flex-direction: row;
    border-top: 1px solid silver;
    border-bottom: 1px solid silver;
    overflow: hidden;
  }
  .left{
    flex: 1;
    height: 300px;
    overflow: hidden;
  }
  .right{
    flex: 3;
    height: 300px;
    overflow: hidden;
  }
  .foodname{
    border-bottom: 1px solid silver;
    white-space: nowrap;
    overflow: hidden;
    line-height: 40px;
    height: 40px;
    font-size: small;
    border-right: 1px solid silver;
  }
  .li-item-food{
     border-bottom: 1px solid silver;
     list-style: none;
     display: flex;
     flex-direction: row;
     padding: 5px 0;
     padding-left: 10px;
  }
  .img-item-small{
    width:50px;
  }
  .li_childleft{
    flex: 1;
    height: 50px;
  }
  .li_childright{
    flex: 4;
    height: 50px;
    margin-left: 10px;
  }
  .name{
    font-size: 13px;
    color: black;
    display: block;
  }
  .price{
    color: red;
    font-size: 12px;
  }
  .sell{
    font-size: 12px;
    color: black;
  }
  .right>ul li{
    list-style: none;
  }
  .cart{
    float: right;
    width: 60px;
    margin: 5px;
    overflow: hidden;
  }
  .cart>div{
    width: 18px;
    height: 18px;
    margin:0 1px;
    float: left;
    text-align: center;
  }
  .cart span{
     display: inline-block;
     width: 16px;
     height: 16px;
     border-radius: 50%;
     text-align: center;
     line-height: 16px;
  }
  .cart>div:nth-child(1) span{
     background-color: white;
    border: 1px solid silver;
  }
  .cart>div:nth-child(3) span{
    background-color: orange;
    border: 1px solid silver;
    color: black;
  }
  .cartdata{
     display: flex;
     flex-direction: row;
  }
  .cartdata>div{
      flex: 1;
      height: 45px;
      text-align: center;
      line-height: 45px;
      color: white;
  }
  .cartdata>div:nth-child(1){
    background-color: rgba(0, 0, 0, 0.61);
  }
  .cartdata>div:nth-child(2){
    background-color: rgba(253, 30, 10, 0.61);
  }
  .cartdata>div:nth-child(2) a{
    text-decoration: none;
    color: white;
  }

</style>
