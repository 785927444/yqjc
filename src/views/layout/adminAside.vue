<template>
  <el-aside :style="state.defaultHeight" :width="configStore.isCollapse?'3%':'inherit'">
    <el-menu router :default-active="$route.path" :collapse="configStore.isCollapse" :unique-opened="true" background-color="#053175" text-color="#FFFFFF" active-text-color="#FFFFFF">
      <div v-for="menu in configStore.isRoute?configStore.routes.filter(a=>a.meta.isroute):adminRoutes.filter(a=>a.meta.isroute)" :key="menu">
        <!-- 无下级 -->
        <el-menu-item v-if="menu.children && menu.children.length === 0" :index="menu.path">
          <img class="hh75" v-if="menu.meta.icon" :src="menu.meta.icon" />
          <template #title>
            {{menu.name}}
          </template>
        </el-menu-item>
        <!-- 有下级 -->
        <el-sub-menu v-else :index="menu.path">
          <template #title>
            <img class="hh75" v-if="menu.meta.icon" :src="menu.meta.icon" />
            <span v-if="!configStore.isCollapse" :class="[configStore.isCollapse ? 'is-collapse' : '']">{{menu.name}}</span>
          </template>
          <el-menu-item v-for="child in menu.children?menu.children.filter(a=>a.meta.isroute):[]" :key="child" :index="child.path">
            <img class="hh75" v-if="child.meta.icon" :src="child.meta.icon" />
            <template #title>
              {{child.name}}
            </template>
          </el-menu-item>
        </el-sub-menu>
      </div>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
  import { adminRoutes } from '@/router/routes'
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const state = reactive({
	  ...publicStore.$state,
    defaultHeight: { height: '' },
    menulist: [],
  })
  const router = useRouter()
  const route = useRoute()
  onBeforeMount(() => {
    state.defaultHeight.height = document.body.clientHeight + "px"
  })
</script>

<style lang="scss" scoped>
  .el-aside {
    height: 100% !important;
    transition: all .5s;
    overflow-y: auto;
    overflow-x: hidden;
    background: #053175 !important;
    width: 250px;
  }
  :deep(.el-aside::-webkit-scrollbar){
    width: 0px;
  }
  :deep(.el-menu){
    border-right: none;
    /* background: none; */
  }
  :deep(.el-menu-item){
    justify-content: flex-start;
    font-size: 14px;
    box-sizing: border-box;
    border-left: 4px solid transparent;
  }
  :deep(.el-menu-item.is-active){
    background: rgba(0, 101, 255, 0.5);
    border-left: 4px solid #0065FF;
    color: #fff;
  }
  :deep(.el-menu-item:focus, .el-menu-item:hover){
    background: rgba(0, 101, 255, 0.5);
    border-left: 4px solid #0065FF;
    color: #fff;
  }
  :deep(.el-menu-item:hover){
    background: rgba(0, 101, 255, 0.1);
  }
  :deep(.el-sub-menu__title){
    display: block;
    text-align: left;
    box-sizing: border-box;
  }
  :deep(.el-sub-menu .el-menu-item){
    padding: 0 0px;
    /* border-left: 4px solid rgba(255, 255, 255, 0); */
  }
  // :deep(.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-menu-item, .el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-menu-item-group__title, .el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-sub-menu__title){
  //   padding-left: 17px;
  // }
  :deep(.el-sub-menu .el-sub-menu__icon-arrow){
    font-weight: bold;
    font-size: 16px;
  }
  :deep(.el-sub-menu__title:hover){
    background: rgba(0, 101, 255, 0.5);
    color: #fff;
  }
  :deep(.el-sub-menu.is-active .el-sub-menu__title){
    box-sizing: border-box;
  }
</style>
