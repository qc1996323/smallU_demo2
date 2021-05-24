<template>
  <div>
    <!-- 绘制form的静态页 -->
    <!-- 4.使用info -->
    <el-dialog :title="info.isAdd?'菜单添加':'菜单编辑'" :visible.sync="info.isshow" @closed="close">
      <el-form :model="form">
        {{form}}
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="form.pid" @change="changePid">
            <el-option disabled value>请选择</el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 遍历list  -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" disabled :label="1">目录</el-radio>
          <el-radio v-model="form.type" disabled :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="120px" v-if="form.type==1">
          <el-select v-model="form.icon">
            <el-option disabled value>请选择</el-option>
            <!-- 遍历图标 -->
            <el-option :value="item" v-for="item in icons" :key="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.url">
            <el-option disabled value>请选择</el-option>
            <el-option
              v-for="item in IndexRoutes"
              :key="item.path"
              :label="item.meta.title"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { IndexRoutes } from "../../../router";
import { reqmenuadd, reqmenuedit, reqmenuinfo } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
export default {
  // 3.收info
  props: ["info", "list"],
  data() {
    return {
      //表单数据
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      //图标集合
      icons: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-goods",
        "el-icon-help",
        "el-icon-s-operation",
      ],
      //路由集合
      IndexRoutes,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
    ...mapActions({}),
    //7.取消
    cancel() {
      this.info.isshow = false;
    },
    // 清空form
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    //添加
    add() {
      //发起添加请求
      reqmenuadd(this.form).then((res) => {
        //添加成功
        if (res.data.code == 200) {
          // 1.弹成功
          successAlert(res.data.msg);
          // 2.清空form
          this.empty();
          // 3.弹框消失
          this.info.isshow = false;
          // 4.列表重新请求
          this.$emit("init");
        }
      });
    },
    //修改了pid
    changePid() {
      // 上级菜单是0，类型是目录；否则是菜单
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    //获取一条数据
    getOne(id) {
      //取数据
      reqmenuinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          //form此时没有id
          this.form.id = id;
        }
      });
    },
    //修改
    update() {
      //修改请求
      reqmenuedit(this.form).then((res) => {
        //修改成功
        if (res.data.code == 200) {
          // 1.弹成功
          successAlert(res.data.msg);
          // 2.表单清空
          this.empty();
          // 3.弹框消失
          this.info.isshow = false;
          // 4.列表更新
          this.$emit("init");
        }
      });
    },
    //弹框关闭
    close(){
      // 是编辑，要清空表单
      !this.info.isAdd&&this.empty()
    }
  },
};
</script>
<style scoped lang="less">
@import "../../../less/index.less";
</style>