<template>
  <div>
    <!-- 绘制form的静态页 -->
    <!-- 4.使用info -->
    <el-dialog :title="info.isAdd?'管理员添加':'管理员编辑'" :visible.sync="info.isshow" @closed="close">
      <el-form :model="form">
        {{form}}
         <el-form-item label="所属角色" label-width="120px">
           <el-select v-model="form.roleid">
             <el-option label="请选择" value="" disabled></el-option>
             <!-- 遍历roleList -->
             <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
import {  reqroleadd, reqroleedit, reqroleinfo, reqrolelist, requseradd, requseredit, requserinfo } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
export default {
  // 3.收info
  props: ["info", "list"],
  data() {
    return {
      //表单数据
      form: {
       roleid:"",
       username:"",
       password:"",
       status:1
      },
      //角色的数据
      roleList:[]
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    // 请求角色数据
    reqrolelist().then(res=>{
      if(res.data.code==200){
        this.roleList=res.data.list?res.data.list:[]
        console.log(this.roleList);
      }
    })
  },
  methods: {
    ...mapActions({}),
    //7.取消
    cancel() {
      this.info.isshow = false;
    },
    // 清空form
    empty() {
      this.form = {
       rolename:"",
       menus:"",
       status:1
      }
    },
    //添加
    add() {
      
      //发起添加请求
      requseradd(this.form).then((res) => {
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

    //获取一条数据
    getOne(id) {
      //取数据
      requserinfo({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;//form上是有uid
          //密码置空
          this.form.password=""
        }
      });
    },
    //修改
    update() {
       
      //修改请求
      requseredit(this.form).then((res) => {
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
    close() {
      // 是编辑，要清空表单
      !this.info.isAdd && this.empty();
    },
  },
};
</script>
<style scoped lang="less">
@import "../../../less/index.less";
</style>