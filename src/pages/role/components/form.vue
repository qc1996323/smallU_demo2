<template>
  <div>
    <!-- 绘制form的静态页 -->
    <!-- 4.使用info -->
    <el-dialog :title="info.isAdd?'角色添加':'角色编辑'" :visible.sync="info.isshow" @closed="close">
      <el-form :model="form">
        {{form}}
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <!-- 树形控件
    data:数据
    show-checkbox:输入框
    node-key:节点唯一标识
    default-expanded-keys：默认展开的key的集合 [2,3]
    default-checked-keys:默认选中的key的集合 [5]
    props:{children:"判断是否有子节点的字段",label:"展示在页面的字段"}
          -->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title',}"
          ></el-tree>
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
import { reqmenuadd, reqmenuedit, reqmenuinfo, reqmenulist, reqroleadd, reqroleedit, reqroleinfo } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
export default {
  // 3.收info
  props: ["info", "list"],
  data() {
    return {
      //表单数据
      form: {
       rolename:"",
       menus:"",
       status:1
      },
      //菜单的数据
      menuList:[]
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    // 请求菜单数据
    reqmenulist({istree:true}).then(res=>{
      if(res.data.code==200){
        this.menuList=res.data.list?res.data.list:[]
        console.log(this.menuList);
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
      this.$refs.tree.setCheckedKeys([])
    },
    //添加
    add() {
      // form.menus 没有数据，数据在tree
      // 1.将tree上的数据赋值给form.menus 
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      
      // 2.将form发送给后端添加
      
      //发起添加请求
      reqroleadd(this.form).then((res) => {
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
      reqroleinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;//{rolename: "管理员", menus: "[21,23,24,22,25,26]", status: 1}
          // //form此时没有id
          this.form.id = id;
          //将form上的menus赋值给tree展示
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
        }
      });
    },
    //修改
    update() {
       // 1.将tree上的数据赋值给form.menus 
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      
      // 2.将form发送给后端修改
      //修改请求
      reqroleedit(this.form).then((res) => {
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