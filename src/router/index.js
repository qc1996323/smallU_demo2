import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//导出二级路由规则给menu/form.vue 使用
export const IndexRoutes=[
  {
    path:"menu",
    component:()=>import("../pages/menu/menu.vue"),
    meta:{
      title:"菜单管理"
    }
  },
  {
    path:"role",
    component:()=>import("../pages/role/role.vue"),
    meta:{
      title:"角色管理"
    }
  },
  {
    path:"manage",
    component:()=>import("../pages/manage/manage.vue"),
    meta:{
      title:"管理员管理"
    }
  },{
    path:"cate",
    component:()=>import("../pages/cate/cate.vue"),
    meta:{
      title:"商品分类"
    }
  },
  {
    path:"specs",
    component:()=>import("../pages/specs/specs.vue"),
    meta:{
      title:"商品规格"
    }
  },
  {
    path:"goods",
    component:()=>import("../pages/goods/goods.vue"),
    meta:{
      title:"商品管理"
    }
  },
  {
    path:"banner",
    component:()=>import("../pages/banner/banner.vue"),
    meta:{
      title:"轮播图管理"
    }
  },
  {
    path:"seckill",
    component:()=>import("../pages/seckill/seckill.vue"),
    meta:{
      title:"秒杀活动"
    }
  },
  {
    path:"member",
    component:()=>import("../pages/member/member.vue"),
    meta:{
      title:"会员管理"
    }
  },
]

const routes = [
  //配置一级路由规则
  {
    path:"/login",
    component:()=>import("../pages/login/login.vue")
  },
  {
    path:"/",
    component:()=>import("../pages/index/index.vue"),
    children:[
      {
        path:"home",
        component:()=>import("../pages/home/home.vue")
      },
      // 遍历IndexRoutes
      ...IndexRoutes,
      {
        path:"",
        redirect: "home"
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
