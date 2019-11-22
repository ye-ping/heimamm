<template>
  <!-- 布局容器 -->
  <el-container class="content">
    <!-- 头部 -->
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold"></i>
        <img src="../assets/indexlogo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img src="../assets/login_icon.png" alt />
        <span>您好</span>
        <el-button class="primary" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="Aside">Aside</el-aside>
      <!-- 主题 -->
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
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
        color: #49A1FF;
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
    background-color: yellow;
  }
  .main {
    height: 100%;
    background-color: skyblue;
  }
}
</style>