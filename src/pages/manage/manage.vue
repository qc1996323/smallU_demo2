<template>
  <div>
    <!-- 按钮 -->
    <!-- 5.点了添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 列表 -->
    <v-list :list="list" @edit="willEdit" @init="initPage"></v-list>

    <!-- 表单 -->
    <!-- 2.传递info -->
    <v-form :info="info" :list="list" @init="initPage" ref="form"></v-form>

    <!-- 分页 -->
    <!-- 分页组件 
    total:总数
    page-size：一页的条数
     @current-change:当前页码发生了改变，event就是新的页码
    -->

    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
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
import { requsercount, requserlist } from "../../request/api";

//混入
import { InfoManage } from "../../mixins/info";
export default {
  mixins: [InfoManage],
  components: {
    vList,
    vForm,
  },
  props: [],
  data() {
    return {
      //7-1列表数据
      list: [],
      //一页的个数?????????
      size: 2,
      //数据的总数
      total: 0,
      page: 1, //当前页码
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions({}),

    //请求列表加总数
    initPage() {
      this.init();
      this.getTotal();
    },

    //进去列表
    init() {
      //进来取列表数据
      requserlist({ page: this.page, size: this.size }).then((res) => {
        if (res.data.code == 200) {
          let list = res.data.list ? res.data.list : [];

          // 如果取得这页没有数据，并且他不是第1页，就要取上一页的数据
          if (list.length == 0 && this.page !== 1) {
            this.page--;
            this.init();
            return;
          }

          this.list = list;
        }
      });
    },
    //取列表数据的总数
    getTotal() {
      requsercount().then((res) => {
        this.total = res.data.list[0].total;
      });
    },
    //页码变化了
    changePage(page) {
      //修改当前页码
      this.page = page;
      //重新取list数据
      this.init();
    },
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
</style>