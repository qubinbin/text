<template>
    <div id="cart">
        {{cartdatalist}}
    </div>
</template>
<script type="text/ecmascript-6">
  import cartdata from "@/components/datainfo/datalist"
  export default {
    name:"cart",
    created:function (){
      this.cartdatalist=cartdata.usercart
    },
    data(){
       return {
         cartdatalist:""
       }
    }
  }
</script>
<style>
  #cart{
    width: 100%;
  }
</style>
