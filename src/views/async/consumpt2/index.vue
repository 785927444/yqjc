<template>
  <div class="layout-col">
    <myMenu :mainMainName="'数据能耗'" :menuData="state.menuData" :defalutActive="'1-1'"></myMenu>
	<router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
	import myMenu from '@/views/async/menu/index.vue';
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
		menuData:[
			{ 
				name: '数据查询',
				children:[
					{name:"实时数据",value:"1-1",path:"/consumpt2/current"},
					{name:"历史数据",value:"1-2",path:"/consumpt2/history"},
					{name:"报表数据",value:"1-3",path:"/consumpt2/report"}
				]
			},
			{ 
				name: '能耗监测',
				children:[
					{name:"用能概括",value:"2-1",path:"/consumpt2/energysum"},
					{name:"能流图",value:"2-2",path:"/consumpt2/energygraph"},
					{name:"用电监测",value:"2-3",path:"/consumpt2/electcheck"},
					{name:"用水监测",value:"2-4",path:"/consumpt2/watercheck"},
					{name:"产线监测",value:"2-5",path:"/consumpt2/productcheck"},
					{name:"空调监测",value:"2-6",path:"/consumpt2/aircheck"},
					// {name:"照明监测",value:"2-7",path:"/consumpt2/lightcheck"},
					// {name:"能耗考核",value:"2-8",path:"/consumpt2/energyexam"},
					{name:"用能诊断",value:"2-7",path:"/consumpt2/energydiagnosis"},
				]
			},
			{value: '3', name: '能耗一次图',path:"/consumpt2/graphdata"},
		]
	})
</script>

<style lang="scss">
 
</style>
