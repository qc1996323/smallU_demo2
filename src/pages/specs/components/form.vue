<template>
  <div>
    <!-- 绘制form的静态页 -->
    <!-- 4.使用info -->
    <el-dialog :title="info.isAdd?'规格添加':'规格编辑'" :visible.sync="info.isshow" @closed="close">
      <el-form :model="form">
        {{form}}
        <div>{{attrArr}}</div>
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in attrArr" :key="index">
          <div class="box">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
          </div>
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
import {
  
  reqspecsadd,
  reqspecsedit,
  reqspecsinfo,
} from "../../../request/api";
import {  successAlert } from "../../../utils/alert";
export default {
  // 3.收info
  props: ["info"],
  data() {
    return {
      //表单数据
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      //数组控制规格属性
      attrArr: [
        {
          value: "",
        },
      ],
    };
  },
  computed: {
   
  },
  mounted() {},
  methods: {
    //点击了新增规格属性
    addAttr() {
      this.attrArr.push({ value: "" });
    },
    //删除了规格属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },

    ...mapActions({
      //获取分类list
      reqList: "specs/reqList",
      //总数
      reqTotal:"specs/reqTotal"
    }),
    //7.取消
    cancel() {
      this.info.isshow = false;
    },
    // 清空form
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      //清空属性数组
      this.attrArr = [{ value: "" }];
    },
    //添加
    add() {
      // 将attrArr上的数据赋值给form.attrs
      //[ { "value": "S" }, { "value": "M" }, { "value": "L" } ]-->"S,M,L"
      let str = this.attrArr.reduce(
        (val, item) => (val += item.value + ","),
        ""
      );
      this.form.attrs = str.slice(0, str.length - 1);
      // 2.将form发送给后端添加
      //发起添加请求
      reqspecsadd(this.form).then((res) => {
        //添加成功
        if (res.data.code == 200) {
          // 1.弹成功
          successAlert(res.data.msg);
          // 2.清空form
          this.empty();
          // 3.弹框消失
          this.info.isshow = false;
          // 4.列表重新请求
          this.reqList();
          //请总数
          this.reqTotal()
        }
      });
    },

    //获取一条数据
    getOne(id) {
      //取数据
      reqspecsinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];

          // 属性数组展示规格 [ "S", "M" ] -->[{value:"S"},{value:"M"}]
          this.attrArr = this.form.attrs.map(item => ({ value: item }));
        }
      });
    },
    //修改
    update() {
      // [ { "value": "S" }, { "value": "M" }, { "value": "L" } ]--["S","M","L"]-->"S,M,L"
      this.form.attrs=this.attrArr.map(item=>item.value).join(",")  

      // 2.将form发送给后端修改
      //修改请求
      reqspecsedit(this.form).then((res) => {
        //修改成功
        if (res.data.code == 200) {
          // 1.弹成功
          successAlert(res.data.msg);
          // 2.表单清空
          this.empty();
          // 3.弹框消失
          this.info.isshow = false;
          // 4.列表更新
          this.reqList();
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
.box {
  display: flex;
}
.el-input {
  flex: 1;
}
</style>