<template>
  <div class="register">
    <el-row
      :gutter="20"
      class="register_header"
      style="margin-left:0px; margin-right:0px;"
    >
      <el-col
        :xs="{ span: 22, offset: 1 }"
        :sm="{ span: 24, offset: 0 }"
        :md="{ span: 6, offset: 17 }"
        :lg="{ span: 6, offset: 17 }"
        :xl="{ span: 6, offset: 17 }"
      >
        <h2>CatBlog||注册</h2>
        <p>注册你的账号吧!</p>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      class="register_body"
      style="margin-left:0px; margin-right:0px;"
    >
      <el-col
        :xs="{ span: 22, offset: 1 }"
        :sm="{ span: 24, offset: 0 }"
        :md="{ span: 6, offset: 17 }"
        :lg="{ span: 6, offset: 17 }"
        :xl="{ span: 6, offset: 17 }"
        class="register_container"
      >
        <!-- 注册表单 -->
        <el-form
          class="register_form"
          :model="register_form"
          :rules="rules"
          ref="register_form"
          status-icon
        >
          <!-- 用户名 -->
          <div class="input-label">
            <span>用户名(小写字母加6到12位数字):</span>
          </div>
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user"
              v-model="register_form.username"
              placeholder="请输入用户名"
              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            ></el-input>
          </el-form-item>

          <!-- 密码 -->
          <div class="input-label">
            <span>密码:</span>
          </div>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              show-password
              v-model="register_form.password"
              placeholder="请输入密码"
              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            ></el-input>
          </el-form-item>

          <!-- 二次确认密码 -->
          <div class="input-label">
            <span>确认密码:</span>
          </div>
          <el-form-item prop="passwordCheck">
            <el-input
              prefix-icon="el-icon-lock"
              show-password
              v-model="register_form.passwordCheck"
              placeholder="再次输入确认密码"
              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            ></el-input>
          </el-form-item>

          <!-- 昵称 -->
          <div class="input-label">
            <span>昵称:</span>
          </div>
          <el-form-item prop="nickname">
            <el-input
              prefix-icon="el-icon-user"
              placeholder="请输入昵称"
              v-model="register_form.nickname"
              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            ></el-input>
          </el-form-item>

          <!-- 邮箱 -->
          <div class="input-label">
            <span>邮箱:</span>
          </div>
          <el-form-item prop="email">
            <el-input
              prefix-icon="el-icon-message"
              placeholder="输入邮箱"
              v-model="register_form.email"
              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            ></el-input>
          </el-form-item>

          <!-- 验证码 -->
          <div class="input-label">
            <span>验证邮箱:</span>
          </div>
          <el-form-item>
            <el-input
              prefix-icon="el-icon-s-promotion"
              placeholder="输入验证码"
              v-model="register_form.verify"
            >
              <el-button
                slot="append"
                @click="sendVerifyEmail('register_form')"
                :loading="isSendBtnLoading"
                v-bind:text="sentBtnHtml"
                v-bind:disabled="isActive"
                >{{ sentBtnHtml }}</el-button
              >
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:12px;">
            <el-button
              size="medium"
              type="primary"
              round
              class="register_btn"
              @click="register"
              >注册</el-button
            >
            <el-tooltip content="返回登陆" placement="bottom" effect="light">
              <el-button
                size="medium"
                class="to_login_btn"
                icon="el-icon-back"
                type="info"
                @click="toLogin"
                circle
              ></el-button>
            </el-tooltip>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    /* 校验函数 */
    //校验用户名
    var checkUsername = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("输入不可以为空"));
      }

      var rep = /^\w\d{6,12}$/;
      if (!rep.test(value)) {
        return callback(new Error("输入的格式不正确"));
      }
      this.$http("/account/isUidExist?uid=" + value)
        .then(function(response) {
          if (response.data.code == 0) {
            callback();
          } else {
            callback(new Error(response.data.data));
          }
        })
        .catch(function(error) {
          console.log(new Date() + " " + error);
          callback(new Error("服务器错误,请联系管理员"));
        });
    };

    //校验密码
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码为空"));
      } else {
        if (this.register_form.passwordCheck !== "") {
          this.$refs.register_form.validateField("passwordCheck");
        }
        callback();
      }
    };

    //校验二次输入密码
    var checkPassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.register_form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    //校验邮箱
    var checkEmail = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("邮箱输入为空"));
      }
      this.$http("/account/isEmailLegal?email=" + value)
        .then(function(response) {
          if (response.data.code == 0) {
            callback();
          } else {
            callback(response.data.data);
          }
        })
        .catch(function(error) {
          console.log(new Date() + " " + error);
          callback(new Error("服务器错误,请联系管理员"));
        });
    };

    //校验昵称
    var checkNickname = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("昵称输入为空"));
      }
      this.$http("/account/isNicknameLegal?nickname=" + value)
        .then(function(response) {
          if (response.data.code == 0) {
            callback();
          } else {
            callback(response.data.data);
          }
        })
        .catch(function(error) {
          console.log(new Date() + " " + error);
          callback(new Error("服务器错误,请联系管理员"));
        });
    };

    return {
      isActive: false,
      isSendBtnLoading: false,
      sentBtnHtml: "发送验证邮件",
      timer: null,
      register_form: {
        username: "",
        password: "",
        passwordCheck: "",
        email: "",
        nickname: "",
        verify: ""
      },
      rules: {
        username: [
          {
            validator: checkUsername,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: checkPassword,
            trigger: "blur"
          }
        ],
        passwordCheck: [
          {
            validator: checkPassword2,
            trigger: "blur"
          }
        ],
        email: [
          {
            validator: checkEmail,
            trigger: "blur"
          }
        ],
        nickname: [
          {
            validator: checkNickname,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //发送验证邮件
    sendVerifyEmail() {
      this.$refs.register_form.validate(valid => {
        if (valid) {
          this.isSendBtnLoading = true;
          this.$http("/account/getVerifyCode?email=" + this.register_form.email)
            .then(response => {
              this.isSendBtnLoading = false;
              this.isActive = true;
              if (response.data.code == 0) {
                var timer_num = 60;
                this.timer = setInterval(() => {
                  timer_num--;
                  this.sentBtnHtml = "发送成功(" + timer_num + ")";
                  if (timer_num == 0) {
                    clearInterval(this.timer);
                    this.sentBtnHtml = "重新发送";
                    this.isActive = false;
                    this.isSendBtnLoading = false;
                  }
                }, 1000);
              } else {
                this.$message({
                  showClose: true,
                  message: "发送失败, 请检查邮箱是否存在或者联系管理员",
                  type: "error"
                });
                this.isActive = false;
                this.sentBtnHtml = "重新发送";
                this.isSendBtnLoading = false;
              }
            })
            .catch(function(error) {
              this.$message({
                showClose: true,
                message: "发送失败, 请检查邮箱是否存在或者联系管理员",
                type: "error"
              });
              this.isActive = false;
              this.sentBtnHtml = "重新发送";
              this.isSendBtnLoading = false;
              console.log(error);
            });
        } else {
          this.$message({
            showClose: true,
            message: "请输入邮箱",
            type: "error"
          });
          return false;
        }
      });
    },

    //提交注册表单
    register() {
      this.$refs.register_form.validate(valid => {
        if (valid) {
          if (this.register_form.verify == "") {
            this.$message({
              showClose: true,
              message: "请输入验证码",
              type: "error"
            });
          } else {
            this.$http({
              method: "post",
              url: "/account/register",
              data: {
                uid: this.register_form.username,
                pwd: this.register_form.password,
                email: this.register_form.email,
                nickname: this.register_form.nickname,
                verifyCode: this.register_form.verify
              }
            }).then(response => {
              console.log(response.data);
              if (response.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "注册成功",
                  showClose: true
                });
                this.$router.push("/login");
              } else {
                this.$message({
                  type: "error",
                  message: response.data.data,
                  showClose: true
                });
              }
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: "请检查信息是否填写完整",
            type: "error"
          });
        }
      });
    },

    toLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  margin-left: 0px;
  width: 100%;
  height: 100%;
  background: url("../assets/img/cat_cat.jpg");
}

.el-form-item {
  margin-bottom: 18px;
}

.register_form {
  margin-top: 20px;
}

.register_header {
  padding-left: 0px;
  text-align: center;
}

.register_header > div > h2 {
  margin-bottom: 0px;
}

.register_header > div > p {
  margin-top: 0px;
  margin-bottom: 0px;
}

.register_body {
  margin-top: 2%;
}

.register_container {
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: 0 0 3px #444;
}

.input-label {
  margin-bottom: 2px;
  margin-left: 2px;
  font-size: 14px;
  color: #aaa;
}

.register_btn {
  margin-left: 20%;
  width: 60%;
}

.to_login_btn {
  float: right;
  margin-top: 3px;
}
</style>
