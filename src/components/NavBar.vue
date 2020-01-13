<template>
  <div>
    <el-menu class="nav-bar" mode="horizontal">
      <el-menu-item style="margin-left:5%" title="主页">
        <img src="../assets/img/cat_logo.png" width="75" height="50" />
      </el-menu-item>
      <el-menu-item class="nav-item" style=" margin-right:5%">
        <i class="el-icon-setting nav-title">个人管理</i>
      </el-menu-item>
      <el-menu-item class="nav-item">
        <i class="el-icon-star-off nav-title">收藏</i>
      </el-menu-item>
      <el-menu-item class="nav-item">
        <i class="el-icon-chat-dot-round nav-title">动态</i>
      </el-menu-item>
      <el-menu-item class="nav-item">
        <img
          v-bind:src="head_img"
          style=" margin-bottom:2px;  border-radius:50%;"
          width="50"
          height="50"
        />
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      head_img: require("../assets/img/user-default.png")
    };
  }
};
</script>

<style lang="less" scoped>
.nav-bar {
  box-shadow: 0 1px 2px #ddd;
  height: 55px;
  line-height: 55px;
}
.nav-bar > li {
  height: 55px;
  line-height: 55px;
  vertical-align: center;
}

.nav-item {
  float: right;
  padding-left: 10px;
  padding-right: 10px;
}

.nav-title {
  font-size: 14px;
  width: 100%;
}

.nav-title:hover {
  color: #111;
}
</style>
