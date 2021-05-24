<template>
  <div>
    <!-- 按钮 -->
    <!-- 5.点了添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 列表 -->
    <v-list  @edit="willEdit" ></v-list>

    <!-- 表单 -->
    <!-- 2.传递info -->
    <v-form :info="info"  ref="form"></v-form>
    
  </div>
</template>
<script>
import vList from "./components/list";
import vForm from "./components/form";

//混入
import {InfoManage} from "../../mixins/info"
export default {
  mixins:[InfoManage],
  components: {
    vList,
    vForm,
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
</style>