<template>
  <div class="login">
    <!-- LoginHeader 登陆组件头 -->
    <el-row
      :gutter="20"
      class="login_header"
      style="margin-left:0px; margin-right:0px;padding-top:10%;"
    >
      <el-col
        :xs="{ span: 22, offset: 1 }"
        :sm="{ span: 24, offset: 0 }"
        :md="{ span: 6, offset: 17 }"
        :lg="{ span: 6, offset: 17 }"
        :xl="{ span: 6, offset: 17 }"
      >
        <h2>CatBlog||登陆</h2>
        <p>一起分享你的新的吧!</p>
      </el-col>
    </el-row>

    <!-- LoginBody 登陆组件表单容器 -->
    <el-row
      :gutter="20"
      class="login_body"
      style="margin-left:0px; margin-right:0px;"
    >
      <el-col
        :xs="{ span: 22, offset: 1 }"
        :sm="{ span: 24, offset: 0 }"
        :md="{ span: 6, offset: 17 }"
        :lg="{ span: 6, offset: 17 }"
        :xl="{ span: 6, offset: 17 }"
        class="login_contianer"
      >
        <!-- 登陆表单 -->
        <el-form
          class="login_form"
          :model="login_form"
          :rules="rules"
          ref="login_form"
          status-icon
        >
          <!-- UID输入 -->
          <div class="input-label">
            <span>用户名:</span>
          </div>
          <el-form-item prop="uid">
            <el-input
              prefix-icon="el-icon-user"
              v-model="login_form.uid"
              placeholder="请输入用户名"
              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            ></el-input>
          </el-form-item>

          <!-- PWD输入 -->
          <div class="input-label">
            <span>密码:</span>
          </div>
          <el-form-item prop="pwd">
            <el-input
              prefix-icon="el-icon-lock"
              show-password
              v-model="login_form.pwd"
              placeholder="请输入密码"
              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            ></el-input>
          </el-form-item>

          <el-form-item style="margin-bottom:12px;">
            <el-button
              size="medium"
              type="primary"
              round
              class="login_btn"
              @click="login"
              >登陆</el-button
            >
            <el-tooltip content="前往注册" placement="bottom" effect="light">
              <el-button
                size="medium"
                icon="el-icon-right"
                type="success"
                class="to_login_btn"
                @click="toRegister"
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
    // 校验用户名合法性
    var checkUid = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("账号为空"));
      }

      var rep = /^\w\d{6,12}$/;
      if (!rep.test(value)) {
        return callback(new Error("输入的格式不正确"));
      }

      this.$http("/account/isUidExist?uid=" + value)
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 101) {
            callback();
          } else {
            callback(new Error("账号不存在或不合规范"));
          }
        })
        .catch(function(error) {
          console.log(new Date() + " " + error);
          callback(new Error("服务器错误,请联系管理员"));
        });
    };

    // 校验密码
    var checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码为空"));
      }
      callback();
    };

    return {
      login_form: {
        uid: "d123456",
        pwd: "19980325"
      },
      rules: {
        uid: [
          {
            validator: checkUid,
            trigger: "blur"
          }
        ],
        pwd: [
          {
            validator: checkPwd,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 跳转到注册界面
    toRegister() {
      this.$router.push("/register");
    },

    //提交注册表单,保存Token值
    login() {
      this.$refs.login_form.validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: "/account/login",
            data: this.login_form
          }).then(response => {
            var code = response.data.code;
            if (code == "0") {
              window.sessionStorage.setItem("token", response.data.data.token);
              this.$router.push("/home");
            } else if (code == "104") {
              this.$message({
                type: "error",
                message: "密码错误",
                showClose: true
              });
            }
          });
        } else {
          this.$message({
            type: "error",
            showClose: true,
            message: "请填写完整或检查网络"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/img/cat_cat.jpg");
}

.login_header {
  text-align: center;
}

.login_header > div > h2 {
  margin-bottom: 0px;
}

.login_header > div > p {
  margin-top: 0px;
  margin-bottom: 0px;
}

.login_body {
  margin-top: 2%;
}

.login_contianer {
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: 0 0 3px #444;
}

.login_form {
  margin-top: 20px;
}

.input-label {
  margin-bottom: 2px;
  margin-left: 2px;
  font-size: 14px;
  color: #aaa;
}

.login_btn {
  margin-left: 20%;
  width: 60%;
}

.to_login_btn {
  float: right;
  margin-top: 3px;
}

.footer {
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #ddd;
  text-align: center;
}
</style>
