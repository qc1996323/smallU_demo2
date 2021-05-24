<template>
  <div>
    <!-- 按钮 -->
    <!-- 5.点了添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 列表 -->
    <v-list :list="list" @edit="willEdit" @init="init"></v-list>

    <!-- 表单 -->
    <!-- 2.传递info -->
    <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
// 1.拆分组件：划分了list和form组件，引入、注册、调用
// 2.绘制表格
// 3.绘制form的静态页
// 4.弹框的状态 [1-7]
// 5.数据交互的api
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { reqmenulist } from "../../request/api";
export default {
  components: {
    vList,
    vForm,
  },
  props: [],
  data() {
    return {
      // 1.初始化数据 isshow控制弹框的状态
      info: {
        isshow: false,
        isAdd:true
      },

      //7-1列表数据
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions({}),
    //6.添加弹框出现
    willAdd() {
      this.info.isshow = true;
      this.info.isAdd=true
    },
    //进去列表
    init() {
      // 7-2 请求list数据 没有传istree
      reqmenulist({istree:true}).then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list ? res.data.list : [];
        }
      });
    },
    //将要编辑
    willEdit(id){
      //弹框出现
      this.info.isshow=true;
      this.info.isAdd=false
      //通知form取数据
      this.$refs.form.getOne(id)
    }
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
</style>