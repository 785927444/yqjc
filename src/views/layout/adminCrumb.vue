<template>
  <div class="flex-sc plr15 h54 f14 ww100 bgi22 ml1">
    <span class="flex1">{{configStore.crumbList}}</span>
    <span class="mr15" v-if="configStore.main || configStore.config.main"><span class="i21">主站：</span>{{configStore.main?configStore.main:configStore.config.main}}</span>
    <span class="mr5" v-if="configStore.stationIp"><span class="i21">当前：</span>{{configStore.stationIp}} - </span>
    <span class="flex-sc" v-if="!isNull(publicStore._public.stations)&&!isNull(configStore.token)&&!isNull(configStore.user)">
      <span class="flex-sc" v-if="isNull(configStore.user.station_num) || (!isNull(configStore.user.role_id) && configStore.user.role_id==1)">
        <span>厂站：</span>
        <span class="w50x4">
          <el-select v-model="configStore.distributId" placeholder="请选择厂站" style="width:100%" clearable filterable >
            <el-option label="全部" value="0" />
            <el-option v-for="v in publicStore._public.stations" :key="v.id" :value="String(v.id)" :label="v.station_name" />
          </el-select>
        </span>
      </span>
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { adminRoutes } from '@/router/routes'
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const state = reactive({
	  ...publicStore.$state,
    distributId: ''
  })
  const route = useRoute()
  const defaultProps = {
    children: 'children',
    label: 'name',
  } 

  // onMounted(async() => {
  //   state.distributId = publicStore.distributId
  // })

  // 在这里使用 watch 监听路由变化
  watch(() => route.path, (to, from) => {
    let crumb = ''
    proxy.parentNodes(configStore.isRoute?configStore.routes:adminRoutes, route.path, 'path').reverse().forEach(item => {
      crumb = crumb + item.name + ' / '
    })
    crumb  = crumb + route.name
    configStore.crumbList = crumb
  }, {immediate: true, deep: true});
  
</script>

<style lang="scss" scoped>

</style>
