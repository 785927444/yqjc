<template>
   <!-- 面包屑 -->
   <div class="ww100 flex-sc ba9 h40 mb15">
      <div class="cursor hh100 ptb10 plr20 ba10" @click="toPath('/demand')">响应总览</div>
	  <div class="cursor hh100 ptb10 plr20 i21" @click="toPath('/demand2')">邀约下发</div>
	  <div class="cursor hh100 ptb10 plr20 i21" @click="toPath('/demand3')">客户管理</div>
	  <div class="flex1 hh100 flex-ec">
	  <img src="@/assets/imgs/uu1.png" />
	  <span class="ml5 cc">需求侧响应</span>
	  <span class="mlr10 cc">/</span>
	  <span class="mr5">响应总览</span>
	  <img src="@/assets/imgs/uu2.png" />
	  </div>
  </div>
  <div class="layout-row plr15 pb15">
    <div class="layout-col flex3">
      <l1 class="flex1 mb15" />
      <l2 class="flex1 mb15" />
      <l3 class="flex1" />
    </div>
    <!-- <div class="layout-col flex5 mlr15">
      <top-center />
    </div> -->
    <div class="layout-col flex3">
      <r1 class="flex1 mb15" />
      <r2 class="flex1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
	import l1 from '@/views/async/demand/l1'
	import l2 from '@/views/async/demand/l2'
	import l3 from '@/views/async/demand/l3'
	import topCenter from '@/views/async/demand/topCenter/index'
	import r1 from '@/views/async/demand/r1'
	import r2 from '@/views/async/demand/r2'
	import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
	})

	onMounted(async() => {
    setTimeout(() => {
	    init()
    }, 100);
	  createScheduled('home', 10*60*1000, () => { init() })
	})
	
	watch([
		()=>configStore.provinceId,
		()=>configStore.cityId,
		()=>configStore.districtId,
		()=>configStore.supplyId, 
		()=>configStore.distributId], (val) => {
	    init()
	}, {immediate: false, deep: true})

	const init = async() => {
		publicStore._public.mainData = [
			{name: '分布式电源资源', value: '2938'},
			{name: '分布式电源资源', value: '2938'},
			{name: '分布式电源资源', value: '2938'},
			{name: '分布式电源资源', value: '2938'},
			{name: '分布式电源资源', value: '2938'},
			{name: '分布式电源资源', value: '2938'},
			{name: '分布式电源资源', value: '2938'},
			{name: '分布式电源资源', value: '2938'},
			{name: '分布式电源资源', value: '2938'},
			{name: '分布式电源资源', value: '2938'},
			{name: '分布式电源资源', value: '2938'},
			{name: '分布式电源资源', value: '2938'},
		]
	}

	const setInit = async() => {

	}
</script>

<style lang="scss">
 
</style>
