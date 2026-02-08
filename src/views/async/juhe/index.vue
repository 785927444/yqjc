<template>
  <div class="juhe-container">

    <header class="juhe-header">
      <div class="header-left">
        <span class="cyg-tag"></span>
        <span class="header-title">聚合管理</span>
      </div>
      <div class="header-right">
        <el-input class="search_input" placeholder="请输入内容">
          <template #suffix>
            <img src="@/assets/imgs/search-icon.png" alt="搜索" class="search-icon" />
          </template>
        </el-input>
        <img src="@/assets/imgs/email.png" alt="邮箱" class="email-icon">
        <img src="@/assets/imgs/option.png" alt="设置" class="option-icon">
        <img src="@/assets/imgs/personal.png" alt="个人中心" class="personal-icon">
        <i-ep-back class="f20 c1 cursor" @click.stop="toPath('/home')" />
      </div>
    </header>
    <div class="juhe-body">
      <div class="juhe-sidebar">
        <el-menu
          default-active="/juhe/user/home"
          class="sidebar-menu"
          router
          mode="vertical"
          background-color="#1B76FF"
          text-color="#333"
          active-text-color="#fff"
        >
          <el-menu-item index="/juhe/user/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-sub-menu index="aggregate">
            <template #title>
              <i class="el-icon-menu"></i>
              <span>聚合管理</span>
            </template>
            <el-menu-item index="/juhe/user/user">用户管理</el-menu-item>
            <!-- <el-menu-item index="/juhe/equip">设备管理</el-menu-item> -->
          </el-sub-menu>
          <!-- <el-menu-item>
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>聚合管理</span>
            </template>
            <el-menu-item index="/juhe/user/load">负载管理</el-menu-item>
          </el-menu-item> -->
        </el-menu>
      </div>

      <div class="juhe-main">
        <div class="route-breadcrumb">
          <span>{{ currentBreadcrumb }}</span>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const routeNameMap = {
  '/juhe/user/home': '首页',
  '/juhe/user/user': '聚合管理/用户管理',
  '/juhe/user/load': '聚合管理/负载管理',
  '/juhe/user/demand': '聚合管理/需求管理',
  '/juhe/user/more': '聚合管理/用户管理/更多'
}
const currentBreadcrumb = computed(() => {
  // 匹配当前路由路径，返回对应的层级名称
  return routeNameMap[route.path] || '首页'
})
</script>

<style scoped>
.juhe-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.juhe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 72px;
  background-color: #fff;
  border-bottom: 1px solid #e5e9f2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
}

.cyg-tag {
  display: inline-block;
  background-image: url('../../../assets/imgs/cyg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  height: 20px;
  width: 112px;
  overflow: hidden;
}

.header-title {
  font-size: 20px;
  font-weight: 600;
  color: #313233;
  margin-left: 8px;
}

.juhe-manager {
  color: #313233;
}
:deep(.el-sub-menu) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-input {
  width: 240px;
}

.header-icon {
  font-size: 18px;
  color: #606266;
  cursor: pointer;
}

.juhe-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 侧边栏样式 */
.juhe-sidebar {
  width: 216px;
  background-color: #e5e9f2;
}

.sidebar-menu {
  border-right: none;
  height: 100%;
}

:deep(.el-menu-item) {
  color: black;
  border-radius: 0 4px 4px 0;
  margin: 4px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 34px;
  height: 34px;
  width: calc(100% - 16px);
}


:deep(.el-menu-item.is-active) {
  background-color: #1B76FF;
  color: #fff;
  width: calc(100% - 16px);
  height: 34px;
  align-items: center;
  line-height: 34px;
}
:deep(.el-menu) {
  background-color: #e5e9f2;
}
:deep(.el-menu-item:hover) {
  background-color: #1B76FF !important;
  color: #fff !important;
}
:deep(.el-sub-menu__title:hover){
  background-color: #1B76FF !important;
  color: #fff !important;
}
:deep(.el-sub-menu.is-active .el-sub-menu__title){
  box-sizing: border-box;
}

.juhe-main {
  flex: 1;
  padding: 20px;
  background-color: #f5f7fa;
  overflow: auto;
}
.search_input {
  width: 192px;
  height: 22px;
}
.search-icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
}
.email-icon {
  width: 20px;
  height: 15px;
  margin-left: 24px;
}
.option-icon {
  width: 20px;
  height: 22px;
  margin-left: 24px;
}
.personal-icon {
  width: 20px;
  height: 22px;
  margin-left: 24px;
}
.route-breadcrumb {
  font-size: 14px;
  color: #313233;
  font-weight: 500;
  height: 56px;
}
</style>