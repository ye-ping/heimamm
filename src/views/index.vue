<template>
  <!-- 布局容器 -->
  <el-container class="content">
    <!-- 头部 -->
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold" :class="{rotate:isCollapse}" @click="isCollapse=!isCollapse"></i>
        <img src="../assets/indexlogo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="avatar" alt />
        <span>{{name}}您好</span>
        <el-button class="primary" type="primary" size="mini" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto" class="Aside">
        <el-menu :collapse="isCollapse" default-active="2" router class="el-menu-vertical-demo">
          <el-menu-item index="/index/data">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="/index/qiye">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main class="main">
        <!-- 路由出口 -->
        <!-- <router-link to="/index/subject"></router-link> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入获取token的函数
import { getToken,removeToken } from "../utils/token.js";

// 导入axios  api
import { userInfo } from "../api/api.js";
export default {
  name: "index",
  data() {
    return {
      isCollapse: false,
      // 用户头像
      avatar: "",
      // 用户名字
      name: ""
    };
  },
  // 事件
  methods: {
    logout() {
      this.$confirm("您确定要退出首页吗", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          removeToken();
          this.$router.push('/login');
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "爱你呦!么么哒!!"
          });
        });
    }
  },
  // 生命周期钩子
  beforeCreate() {
    // 判断token是否存在
    const token = getToken();
    if (!token) {
      // 提示用户
      this.$message.error("小老弟,你木有登录哦");
      // 不存在退回登录页
      this.$router.push("/login");
    }
  },
  // 创建钩子,获取用户信息,渲染页面
  created() {
    userInfo().then(res => {
      // // 判断token
      // if (res.data.code == 0) {
      //   // token有问题
      //   this.$message.error("小老弟伪造token,牛逼啊!");
      //   // 删除token
      //   removeToken();
      //   // 跳转到登录页
      //   this.$router.push("/login");
      //   // 不在往后执行
      //   return;
      // }
      // 如果token是真的,就获取返回的头像和名字,渲染页面
      this.avatar = `http://183.237.67.218:3002/${res.data.data.avatar}`;
      window.console.log(this.avatar);
      this.name = res.data.data.name;
    });
  }
};
</script>

<style lang="less">
// 布局容器
.content {
  height: 100%;
  .header {
    height: 100%;
    // background-color: pink;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      i {
        //
        font-weight: 700;

        display: inline-block;
      }
      img {
        width: 33px;
        height: 28px;
        margin-left: 22px;
        margin-right: 11px;
      }
      span {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      span {
        font-size: 14px;
      }
      .primary {
        margin-left: 38px;
      }
    }
  }
  .Aside {
    height: 100%;
  }
  .main {
    height: 100%;
    background-color: skyblue;
  }
  // 折叠菜单样式
  .rotate {
    transform: rotate(-90deg);
  }
  .el-icon-s-fold {
    font-size: 40px;
    transition: 0.5s;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>