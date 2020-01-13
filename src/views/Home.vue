<template>
  <el-container style="height:100%; width:100%">
    <el-header style="padding:0px;"><nav-bar></nav-bar></el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="curPath">
          <!-- 一级菜单 -->
          <el-menu-item index="/zone" @click="saveMenuPath('/zone')">
            <i class="el-icon-location"></i>
            <span>账号管理</span>
          </el-menu-item>
          <el-menu-item index="/safe" @click="saveMenuPath('/safe')">
            <i class="el-icon-location"></i>
            <span>账号安全</span>
          </el-menu-item>
          <el-menu-item index="/level" @click="saveMenuPath('/level')">
            <i class="el-icon-location"></i>
            <span>等级系统</span>
          </el-menu-item>
          <el-menu-item index="/setting" @click="saveMenuPath('/setting')">
            <i class="el-icon-location"></i>
            <span>常规设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from "../components/NavBar.vue";
export default {
  components: {
    NavBar
  },
  data() {
    return {};
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      window.sessionStorage.setItem("menu_path", to.path);
      next();
    });
  },
  methods: {
    saveMenuPath(curPath) {
      window.sessionStorage.setItem("menu_path", curPath);
      this.$router.push(curPath);
    }
  },
  computed: {
    curPath: function() {
      return window.sessionStorage.getItem("menu_path");
    }
  }
};
</script>

<style lang="scss" scoped></style>
