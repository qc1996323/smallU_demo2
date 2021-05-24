<template>
  <div class="login">
    <div class="con">
      <h3 class="center">登录</h3>
      <div class="input">
        <el-input></el-input>
      </div>
      <div class="input">
        <el-input></el-input>
      </div>
     <div class="center">
          <el-button type="primary" @click="login">登录</el-button>
     </div>
    </div>
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
    //跳转页面
    login(){
        this.$router.push("/")
    }
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(@primary, @primary2);
  position: relative;
}
.con {
  width: 300px;
  padding: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
}
.center{
    text-align: center;
     margin-bottom: 20px;
}
.input{
    margin-bottom: 20px;
}
</style>