<template>
<div class="content">
  <div class="left" ref="left">
    <ul>
      <li v-for="(item,index) in left" :class="{current:currentindex==index}" @click="selectItem(index,$event)">
        <span class="left-item">{{item}}</span>
      </li>
    </ul>
  </div>
  <div class="right" ref="right">
    <ul>
      <li v-for="(item,index) in right" class="right-item right-item-hook">
        {{item.name}}
        <ul>
          <li v-for="a in item.content">
            {{item.name+a}}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
  import bscroll from "better-scroll"
  export default {
    name: 'HelloWorld',
    data(){
      return {
        left:["大肉","凉菜","主食","炒菜","饮料"],
        right:[
          {
            name:"大肉",
            content:[1,2,3,4,5,6,7]
          },
          {
            name:"凉菜",
            content:[1,2,3,4,5,6,7]
          },
          {
            name:"主食",
            content:[1,2,3,4,5,6,7]
          },
          {
            name:"炒菜",
            content:[1,2,3,4,5,6,7]
          }, {
            name:"饮料",
            content:[1,2,3,4,5,6,7]
          }
        ],
        listHeight:[],
        scrollY:0,
        clickEvent:false
      }
    },
    mounted(){
      this.$nextTick(function (){
          this._initScroll();
          this._getHeight();
      });
    },
    methods:{
      _initScroll:function (){
        this.lefts=new bscroll(this.$refs.left,{
          click:true
        });
        this.rights=new bscroll(this.$refs.right,{
          click:true,
        });
        this.rights.on("scroll",function (pos){
          this.scrollY=Math.abs(Math.round(pos.y));
        });
      },
      _getHeight:function (){
        let rightItems=this.$refs.right.getElementsByClassName("right-item-hook");
        let height=0;
        this.listHeight.push(height);
        for(var i=0;i<rightItems.length;i++)
        {
          let item=rightItems[i];
          height+=item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectItem:function (index,event){
        this.clickEvent=true;
        if(!event._constructed)
        {
          return
        }
        else{
          let  rightItems=this.$refs.right.getElementsByClassName("right-item-hook");
          let el=rightItems[index];
          this.rights.scrollToElement(el,300);
        }
      }
    },
  computed:{
    currentindex:function(){
      for(var i=0;i<this.listHeight.length;i++)
      {
        let height=this.listHeight[i];
        let height2=this.listHeight[i+1];
        if(!height2||(this.scrollY>=height)&&this.scrollY<height2)
        {
          if(this.clickEvent)
          {
            return i+1;
          }
          else{
            return i;
          }
        }
      }
      return 0;
    }
  }
  }
</script>
<style scoped>
  .content{
    display: flex;
    flex-direction: row;
    height: 500px;
    overflow: hidden;
    border-bottom: 1px solid red;
    position: relative;
    bottom: 100px;
    top: 10px;
  }
  .left{
    flex: 2;
    height: 80px;
    background-color:white;
    list-style: none;
  }
  .left li{
    width: 100%;
    height: 100%;
    list-style: none;
  }
  .current{
    background-color: red;
  }
  .left-item{
    display: block;
    width: 100%;
    height: 100px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid silver;
  }
  .right
  {
    flex: 5;
    height: 500px;
    background-color: silver;
  }
  .right-item li{
    list-style: none;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border-bottom: 1px solid blue;
  }
</style>
