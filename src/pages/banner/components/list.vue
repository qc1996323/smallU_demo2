<template>
  <div>
    <!-- 绘制表格 -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="编号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" sortable width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$pre+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="willEdit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqbannerdelete, reqroledelete } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
export default {
  
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      //轮播图列表
      list:"banner/list"
    }),
  },
  mounted() {
    //发起请求
    this.reqList();
  },
  methods: {
    ...mapActions({
      //获取轮播图列表
      reqList:"banner/reqList"
    }),
    //点了编辑
    willEdit(id) {
      //通知menu 编辑
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      //即将做删除
      reqbannerdelete({ id: id }).then((res) => {
        //删除成功
        if (res.data.code == 200) {
          //  1.弹成功
          successAlert(res.data.msg);
          // 2.重新请求list
         this.reqList()
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
@import "../../../less/index.less";
img{
  width: 80px;
  height: 80px;
}
</style>