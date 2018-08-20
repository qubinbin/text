/**
 * Created by Administrator on 2018/8/10.
 */
var app=angular.module("myApp",[]);/* [] 里面写的是依赖的注入  ngRoute*/
//自定义过滤器  module 在这定义
/*自定义过滤器  传多个参数  ：值写法  不带参  直接写过滤器  带一参  直接一个：*/
//过滤器最终有返回值
app.filter("msort",function (){
    return function (value,args1){
        var newarr;
        if(args1==undefined)
        {
         return value;
        }
        if(args1=="大")
        {
            newarr=value.sort(function (n1,n2){
                return n2-n1;
            });
        }
        else{
            newarr=value.sort(function (n1,n2){
                return n1-n2;
            });
        }
      return newarr;
    }
});
//控制器
app.controller("myController",function ($scope){
    //自带过滤器  uppercase  转化大写的过滤器 lowercase 转化小写的过滤器
    //orderBy  根据某个列进行排序
    /*currency 数子转化为money形式*/
    //filter 过滤子集


    $scope.msg="你好 Angular";
    $scope.stringName="abcdefg";
    $scope.stringinfo="ABCDEFG";
    $scope.money=1000000;
    $scope.arrlist=[3,1,5,2,4,7,6];
    $scope.arr=[
        {id:2,name:"z1",sex:"男"},
        {id:3,name:"s1",sex:"女"},
        {id:1,name:"n1",sex:"男"},
        {id:4,name:"m1",sex:"女"}
    ];
    $scope.btnclick=function (){
        alert(1);
    }
});