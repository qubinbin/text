import Vue from 'vue'
import Router from 'vue-router'
import detailed from '@/components/fooddetailed'
import face from "@/components/faceinfo"
import cartinfo from "@/components/cart"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'face',
      component: face
    },
    {
      path:"/details/:parindex/:childindex",
      name:"details",
      component:detailed
    },
    {
      path:"/cart",
      name:"cart",
      component:cartinfo
    }
  ]
})
