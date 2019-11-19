<template>
  <div class="login-box">
    <!-- 左边登录框 -->
    <div class="login-input">
      <div class="title">
        <img src="../assets/login_icon.png" alt />
        <span class="title1">黑马面面</span>
        <span class="line"></span>
        <span class="title2">用户登录</span>
      </div>
      <!-- 输入框 -->
      <el-input class="username" placeholder="请输入内容" prefix-icon="el-icon-user" v-model="input2"></el-input>
      <el-input class="password" placeholder="请输入内容" prefix-icon="el-icon-lock" v-model="input2"></el-input>
      <!-- 栅格系统 -->
      <el-row>
        <el-col :span="17">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-lock" v-model="input2"></el-input>
        </el-col>
        <el-col :span="7">
          <img src="../assets/captcha.png" alt id="captcha" />
        </el-col>
      </el-row>
      <!-- 复选框 -->
      <div class="checked">
       <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
      <el-link type="primary">用户协议</el-link>和
      <el-link type="primary">隐私条款</el-link>
      </div>
      <!-- 按钮 -->
      <div class="btn">
          <el-button class="btn" type="primary">登录</el-button>
          <el-button class="btn" type="primary">注册</el-button>
      </div>
    </div>
    <div>
      <img src="../assets/login_banner_ele.png" alt />
    </div>
  </div>
  <!--右边图片  -->
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang="less">
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  align-items: center;
  justify-content: space-around;
}
.login-input {
  width: 478px;
  height: 550px;
  background: rgba(245, 245, 245, 1);
  padding-top: 48px;
  padding-left: 43px;
  padding-right: 41px;
  box-sizing: border-box;
  .title {
    display: flex;
    align-items: center;
    img {
      width: 22px;
      height: 17px;
      margin-right: 16px;
    }
    .title1 {
      font-size: 24px;
    }
    .title2 {
      font-size: 22px;
    }
    .line {
      width: 1px;
      height: 28px;
      background: rgba(199, 199, 199, 1);
      margin: 0 12px;
    }
  }
  #captcha {
      width: 100%;
      height: 42px;
  }
  .username {
      margin-top: 29px;
  }
  .password {
      margin-top: 25px;
      margin-bottom: 25px;
  }

  .btn.btn {
      display: block;
      width: 100%;
      margin-left: 0;
      margin-top: 27px;

  }
  .checked {
      display: flex;
      margin-top: 33px;
      align-items: center;
  }
}
</style>