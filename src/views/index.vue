<template>
  <!-- 布局容器 -->
  <el-container class="content">
    <!-- 头部 -->
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold " :class="{rotate:isCollapse}" @click="isCollapse=!isCollapse"></i>
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
      <el-aside width="auto" class="Aside">
        <el-menu
        :collapse="isCollapse"
      default-active="2"
      class="el-menu-vertical-demo">
    
      <el-menu-item index="2">
        <i class="el-icon-pie-chart"></i>
        <span slot="title">数据概览</span>
      </el-menu-item>

      <el-menu-item index="2">
        <i class="el-icon-user"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>

      <el-menu-item index="2">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">题库列表</span>
      </el-menu-item>

      <el-menu-item index="2">
        <i class="el-icon-office-building"></i>
        <span slot="title">企业列表</span>
      </el-menu-item>

      <el-menu-item index="2">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">学科列表</span>
      </el-menu-item>
     
    </el-menu>
      </el-aside>
      <!-- 主题 -->
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      isCollapse:true,
    }
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