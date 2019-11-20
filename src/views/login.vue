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
      <el-input class="username" v-model="loginForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-user" ></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
      <el-input class="password" v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" ></el-input>
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
       <el-checkbox v-model="checked" >我已阅读并同意</el-checkbox>
      <el-link type="primary">用户协议</el-link>和
      <el-link type="primary">隐私条款</el-link>
      </div>
      <!-- 按钮 -->
      <div class="btn">
          <el-button class="btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button class="btn" type="primary">注册</el-button>
      </div>
      </el-form>
    </div>

     <!--右边图片  -->
    <div>
      <img src="../assets/login_banner_ele.png" alt />
    </div>
    
    <!-- 注册登录框 -->

  </div>
 
</template>



<script>
// 导入axios
import axios from 'axios';

export default {
  name: "login",
  data(){
    // 定义表单验证规则
    const checkPhone = (rules,value,callback)=>{
      if(!value){
        callback(new Error('手机号不能为空'));
      }else{
        //格式验证
        const reg =  /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
       if( reg.test(value)){//正则表达式
        //  验证成功
        callback();
       }else{
         callback(new Error('手机号格式不对哦!'));
       }
      }
    };
    return {
      // 登录验证
     loginForm:{
       phone:'',
       password:'',
       captcha:'',
     },
     rules:{
      //  登录表单验证规则
       phone:[{validator:checkPhone}],
       password:[{required:true,message:'密码不能为空'},
                {min:6,max:12,message:'密码强度不够'}],
       captcha:[{required:true,message:'密码不能为空'},
                {min:4,max:4,message:'验证码只能有四位哦!'}],
     },
    //  隐私协议勾选框
    checked:true,
    // 登录图形码路径
    captchaSrc:'http://183.237.67.218:3002/captcha?type=login'
    }
  
  },
  // 方法
  methods: {
    submitForm(formName){
      // 判断是否勾选隐私协议勾选框
      if(!this.checked){
        this.$message.warning("未勾选用户协议");
        return;
      }
      // 获取饿了么的表单
      this.$refs[formName].validate(valid=>{
        if(valid){
          //验证成功,发送axios
          axios({
            url:'http://183.237.67.218:3002/login',
            method:'post',
            data: {
              phone:this.loginForm.phone,
              password:this.loginForm.password,
              code:this.loginForm.captcha
            },
           withCredentials:true
          }).then(res=>{
            //成功回调
            window.console.log(res);
            if(res.data.code==200){
              this.$message.success('你可算是回来了');
            }else{
              this.$message.warning('登录失败');
            }
          });
        }
      })
    },
    // 点击图片获取验证码
    changeCaptha(){
      this.captchaSrc =`http://183.237.67.218:3002/captcha?type=login&${Date.now()}`//时间戳
    }
  },

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