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
      <el-form :model="loginForm" :rules="rules" ref="loginForm" status-icon>
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input
            class="username"
            v-model="loginForm.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            class="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <!-- 栅格系统 -->
        <!-- 图形码 -->
        <el-form-item prop="captcha">
          <el-row>
            <el-col :span="17">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="loginForm.captcha"></el-input>
            </el-col>
            <el-col :span="7">
              <img :src="captchaSrc" alt id="captcha" @click="changeCaptha" />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 复选框 -->
        <div class="checked">
          <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </div>
        <!-- 按钮 -->
        <div class="btn">
          <el-button class="btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button class="btn" type="primary" @click="isshow=true">注册</el-button>
        </div>
      </el-form>
    </div>
    <!--右边图片  -->
    <div>
      <img src="../assets/login_banner_ele.png" alt />
    </div>

    <!-- 注册登录框 -->
    <el-dialog title="用户注册" :visible.sync="isshow">
      <!-- 用户头像 -->
      <el-form :model="regForm" :rules="regRules" ref="regForm">
        <el-form-item label="头像" prop="icon" v-model="regForm.icon" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="regForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="regForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="regForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="regForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
              <el-input v-model="regForm.code" autocomplete="off" class="shot"></el-input>
            </el-form-item>
          </el-col>
          <!-- 图片 -->
          <el-col :span="6" :offset="0.5">
            <img :src="regCaptchaSrc" alt class="captcha" @click="addCap" />
          </el-col>
        </el-row>
        <!-- 验证码 -->
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="图形码" prop="rcode" :label-width="formLabelWidth">
              <el-input v-model="regForm.rcode" autocomplete="off" class="shot"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0.5">
            <!-- <div class="grid-content bg-purple" @click="getMSg">获取用户验证码</div> -->
            <input
              type="button"
              class="grid-content"
              @click="getMSg"
              ref="button"
              :disabled="isDisabled"
              v-model="buttonTex"
            />
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isshow = false">取 消</el-button>
        <el-button type="primary" @click="regUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>



<script>
// 导入axios
// import axios from "axios";
// 导入login  api 用名字的导入
import { login } from "../api/api.js";

// 导入注册api
import {res} from "../api/api.js";
export default {
  name: "login",
  data() {
    // 定义表单验证规则
    const checkPhone = (rules, value, callback) => {
      if (!value) {
        callback(new Error("手机号不能为空"));
      } else {
        //格式验证
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value)) {
          //正则表达式
          //  验证成功
          callback();
        } else {
          callback(new Error("手机号格式不对哦!"));
        }
      }
    };

    return {
      // 登录验证变量
      loginForm: {
        phone: "",
        password: "",
        captcha: ""
      },
      //注册页面是否显示
      isshow: false,
      // 取消确定按钮
      // dialogFormVisible:false,
      // 注册页面表单变量
      regForm: {
        name: "",
        region: "",
        phone: "",
        email: "",
        password: "",
        rcode: "", //手机验证码
        code: "" //图形验证码
      },
      rules: {
        //  登录表单验证规则
        phone: [{ validator: checkPhone }],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 12, message: "密码强度不够" }
        ],
        captcha: [
          { required: true, message: "密码不能为空" },
          { min: 4, max: 4, message: "验证码只能有四位哦!" }
        ]
      },
      // 注册页面表单验证,验证规则
      regRules: {
        icon: [{ required: true, message: "头像不能为空" }],
        name: [{ required: true, message: "昵称不能为空" }],
        email: [{ required: true, message: "邮箱不能为空" }],
        phone: [
          { validator: checkPhone },
          { required: true, message: "手机号能不能为空" }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 12, message: "密码强度不够" }
        ],
        code: [
          { required: true, message: "图形码不能为空" },
          { min: 4, max: 4, message: "图形码只能有4位" }
        ],
        rcode: [{ required: true, message: "验证码不能为空" }]
      },

      //  隐私协议勾选框
      checked: true,
      // 登录图形码路径
      captchaSrc: "http://183.237.67.218:3002/captcha?type=login",
      // 对话框宽度
      formLabelWidth: "70px",
      // 用户头像路径
      imageUrl: "",
      //  注册图形码地址
      regCaptchaSrc: "http://183.237.67.218:3002/captcha?type=sendsms",
      //按钮是否禁用
      isDisabled: false,
      // 按钮输入框的值
      buttonTex: "获取用户验证码"
    };
  },

  // 方法
  methods: {
    // 登录
    submitForm(formName) {
      // 判断是否勾选隐私协议勾选框
      if (!this.checked) {
        this.$message.warning("未勾选用户协议");
        return;
      }
      // 获取饿了么的表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证成功,发送axios
          // axios({
          //   url: "http://183.237.67.218:3002/login",
          //   method: "post",
          //   data: {
          //     phone: this.loginForm.phone,
          //     password: this.loginForm.password,
          //     code: this.loginForm.captcha
          //   },
          //   withCredentials: true
          // })
          login({
            phone: this.loginForm.phone,
            password: this.loginForm.password,
            code: this.loginForm.captcha
          }).then(res => {
            //成功回调
            window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("你可算是回来了");
            } else {
              this.$message.warning("登录失败");
            }
          });
        }
      });
    },
    // 点击登录图片获取验证码
    changeCaptha() {
      this.captchaSrc = `http://183.237.67.218:3002/captcha?type=login&${Date.now()}`; //时间戳
    },
    // 获取注册图形码
    addCap() {
      this.regCaptchaSrc = `http://183.237.67.218:3002/captcha?type=sendsms${Date.now()}`;
      window.console.log("hahhahaha");
    },
    // 用户头像上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 获取验证码
    getMSg() {
      // 非空判断
      if (this.regForm.phone.trim() == "") {
        this.$message.warning("手机号没写哦!");
        return;
      } else if (this.regForm.code.trim() == "") {
        this.$message.warning("验证码没填哦!");
        return;
      }
      // 手机格式验证
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.regForm.phone)) {
        this.$message.warning("手机号是不是写错了");
        return;
      }
      // 说明格式都正确,发送axios
      // axios({
      //   url:'http://183.237.67.218:3002/sendsms',
      //   method:'post',
      //   data: {
      //     code:this.regForm.code,
      //     phone:this.regForm.phone
      //   },
      // // 跨域携带请求头,携带cookin
      // withCredentials:true
      // })
      res({
        code: this.regForm.code,
        phone: this.regForm.phone
      }).then(res => {
        //成功回调
        window.console.log(res);
      });
      // 判断60s之后才能再次发送验证码
      // 设置一个计时器,把按钮设置为禁用
      let time = 60;
      let timeID = setInterval(() => {
        this.isDisabled = true;
        this.buttonTex = `${time}之后再次获取`;
        time--;
        window.console.log(time);
        if (time == 0) {
          this.isDisabled = false;
          this.buttonTex = "获取用户验证码";
          clearInterval(timeID);
        }
      }, 1000);
    },
    // 用户注册
    regUser() {}
  }
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

  // 注册表单样式
  .avatar-uploader .el-upload {
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
  .el-dialog__wrapper .el-dialog {
    //注册框大盒子
    width: 603px;
    height: 786px;
    margin: 0 auto;
    .el-dialog__header {
      background: linear-gradient(to right, #01c5fa, #1395fa);
    }

    .el-dialog__title {
      display: block;
      text-align: center;
      color: #fff;
    }
    .el-dialog__headerbtn {
      display: none;
    }
    .avatar-uploader {
      text-align: center;
    }
    .dialog-footer {
      text-align: center;
    }
    .captcha {
      width: 100%;
      height: 41px;
    }
    .grid-content {
      text-align: center;
      border: 1px solid #ccc;
      height: 40px;
      line-height: 40px;
      width: 100%;
      background-color: #fff;
      cursor: pointer;
    }
  }
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