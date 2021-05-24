<template>
  <div>
    <el-container class="con">
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 
          default-active：默认激活，对每个上的index
          background-color:背景色
          text-color:文本颜色
          active-text-color:激活的文本颜色
          router:启用路由模式，index设置为要跳转的路径path
          unique-opened:只保持一个子菜单展开
        -->
        <el-menu
          class="el-menu-vertical-demo"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/cate">商品分类</el-menu-item>
              <el-menu-item index="/specs">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.meta.title">
            <!-- 面包屑 -->
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view class="view"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
    ...mapActions({}),
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
.el-aside,.el-menu-vertical-demo,.el-menu-item-group {
  background: @primary2;
}
.el-header,.el-menu-item:focus, .el-menu-item:hover,/deep/ .el-submenu__title:hover {
  background: @header-color !important;
}
.con {
  height: 100vh;
}
.view{
  margin-top: 20px;
}

</style>