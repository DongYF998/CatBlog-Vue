<template>
  <div>
    用户个人中心
    <el-upload
      class="avatar-uploader"
      action="none"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    updateFile(file) {
      let param = new FormData();
      //创建form对象
      param.append("file", file);
      //通知后台文件格式
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };

      this.$http.post("/acount/upload", param, config).then(respone => {
        console.log(respone.data.data);
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
