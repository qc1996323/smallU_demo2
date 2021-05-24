<template>
  <div>
    <!-- 绘制form的静态页 -->
    <!-- 4.使用info -->
    <el-dialog :title="info.isAdd?'分类添加':'分类编辑'" :visible.sync="info.isshow" @closed="close">
      <el-form :model="form">
        <!-- {{form}} -->
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid">
            <el-option label="请选择" value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <!-- 1.原生js -->
          <!-- <div class="my-upload">
            <h3>+</h3>
            <img v-if="imgUrl" :src="imgUrl" alt />
            <input type="file" @change="getFile" />
          </div>-->

          <!-- 2.element-ui -->
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  reqcateadd,
  reqcateedit,
  reqcateinfo,
  
} from "../../../request/api";
import { errorAlert, successAlert } from "../../../utils/alert";
import path from "path";
export default {
  // 3.收info
  props: ["info"],
  data() {
    return {
      //表单数据
      form: {
        pid: "",
        catename: "",
        status: 1,
        img: null,
      },
      imgUrl: "", //图片选中的路径
    };
  },
  computed: {
    ...mapGetters({
      //分类list
      cateList:"cate/list"
    }),
  },
  mounted() {
   
  },
  methods: {
    //获取文件
    getFile(e) {
      //文件
      let file = e.target.files[0];

      //判断大小 file.size 单位是B 1M=1024KB  1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件最大2M");
        return;
      }

      // 判断文件类型 file.name="12.3.3.3.3.33.png"
      let imgArr = [".png", ".jpg", ".jpeg", ".gif"];
      // let extname = file.name.slice(file.name.lastIndexOf("."));//2
      let extname = path.extname(file.name); //3

      if (!imgArr.find((item) => item == extname)) {
        errorAlert("请上传正确格式的文件");
        return;
      }

      // 将文件生成一个地址，给imgUrl进行展示
      this.imgUrl = URL.createObjectURL(file);

      //将文件给form.img
      this.form.img = file;
    },

    //element-ui 上传之前
    beforeAvatarUpload(file) {
      //判断大小 file.size 单位是B 1M=1024KB  1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件最大2M");
        return;
      }

      // 判断文件类型 file.name="12.3.3.3.3.33.png"
      let imgArr = [".png", ".jpg", ".jpeg", ".gif"];
      // let extname = file.name.slice(file.name.lastIndexOf("."));//2
      let extname = path.extname(file.name); //3

      if (!imgArr.find((item) => item == extname)) {
        errorAlert("请上传正确格式的文件");
        return;
      }
      // 将文件生成一个地址，给imgUrl进行展示
      this.imgUrl = URL.createObjectURL(file);

      //将文件给form.img
      this.form.img = file;
    },

    ...mapActions({
      //获取分类list
      reqList:"cate/reqList"
    }),
    //7.取消
    cancel() {
      this.info.isshow = false;
    },
    // 清空form
    empty() {
      this.form = {
        pid: "",
        catename: "",
        status: 1,
        img: null,
      };
      //清空图片
      this.imgUrl=""
    },
    //添加
    add() {
      // 2.将form发送给后端添加

      //发起添加请求
      reqcateadd(this.form).then((res) => {
        //添加成功
        if (res.data.code == 200) {
          // 1.弹成功
          successAlert(res.data.msg);
          // 2.清空form
          this.empty();
          // 3.弹框消失
          this.info.isshow = false;
          // 4.列表重新请求???????
          this.reqList()
        }
      });
    },

    //获取一条数据
    getOne(id) {
      //取数据
      reqcateinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list; //{rolename: "管理员", menus: "[21,23,24,22,25,26]", status: 1}
          //form此时没有id
          this.form.id = id;
          //图片展示
          this.imgUrl=this.$pre+this.form.img;
          
        }
      });
    },
    //修改
    update() {
      

      // 2.将form发送给后端修改
      //修改请求
      reqcateedit(this.form).then((res) => {
        //修改成功
        if (res.data.code == 200) {
          // 1.弹成功
          successAlert(res.data.msg);
          // 2.表单清空
          this.empty();
          // 3.弹框消失
          this.info.isshow = false;
          // 4.列表更新
          this.reqList()
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
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed @primary;
  position: relative;
}
.my-upload h3 {
  text-align: center;
  height: 100px;
  line-height: 100px;
  color: @header-color;
}
.my-upload input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.my-upload img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
// element-ui
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>