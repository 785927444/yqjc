<template>
   <!-- 面包屑 -->
   <div class="ww100 flex-sc ba9 h40 mb15">
      <div class="cursor hh100 ptb10 plr20 ba10" @click="toPath('/gather')">负荷聚合商</div>
	  <div class="cursor hh100 ptb10 plr20 i21" @click="toPath('/gather2')">负荷管理</div>
	  <div class="flex1 hh100 flex-ec">
	  <img src="@/assets/imgs/uu1.png" />
	  <span class="ml5 cc">负荷聚合商</span>
	  <span class="mlr10 cc">/</span>
	  <span class="mr5">负荷聚合商</span>
	  <img src="@/assets/imgs/uu2.png" />
	  </div>
  </div>
  <div class="layout-row plr15 pb15">
    <div class="layout-col flex1">
      <l1 class="flex5 mb15" />
      <l2 class="flex3 mb15" />
      <l3 class="flex4" />
    </div>
    <div class="layout-col flex3 ml15">
		<div class="layout-row flex2 mb15">
			<c1 class="hh100 flex2" />
			<div class="hh100 flex1 flex-col ml15">
				<r1 class="flex1 mb15" />
				<r2 class="flex1" />
			</div>
		</div>
		<r3 class="flex1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
	import l1 from '@/views/async/gather/l1'
	import l2 from '@/views/async/gather/l2'
    import l3 from '@/views/async/gather/l3'
	import c1 from '@/views/async/gather/c1'
	import r1 from '@/views/async/gather/r1'
	import r2 from '@/views/async/gather/r2'
	import r3 from '@/views/async/gather/r3'
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

	// const init = async() => {
	// 	publicStore._public.loadRateData = [
	// 		{value: 20, name: '负载率', rate: '0.5', key: 'count_ABCD'},
	// 	]
		
	// 	publicStore._public.controlData = [
	// 	    {name: '总负荷出力', data: [['00:00', 60], ['01:00', 30], ['02:00', 10], ['03:00', 30],['04:00', 50], ['05:00', 20], ['06:00', 25], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
	// 	]

	// 	publicStore._public.mainData = [
	// 		{name: '1###', id: '123456', run: '1', area: '某某1区', attr: '电力辅助服务', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤C88888', car_type: '大奔BBBB', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'}, 
	// 		{name: '2###', id: '123456', run: '2', area: '某某2区', attr: '电力辅助服务', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤C88888', car_type: '大奔BBBB', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
	// 		{name: '3###', id: '123456', run: '1', area: '某某3区', attr: '电力辅助服务', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤C88888', car_type: '大奔BBBB', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
	// 		{name: '4###', id: '123456', run: '1', area: '某某4区', attr: '电力辅助服务', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤C88888', car_type: '大奔BBBB', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
	// 	]

	// 	publicStore._public.monitorData = [
	// 	  {name: '日功率预测上限', data: [['00:00', 60], ['01:00', 30], ['02:00', 10], ['03:00', 30],['04:00', 50], ['05:00', 20], ['06:00', 25], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
	// 	  {name: '日功率预测下限', data: [['00:00', 50], ['01:00', 40], ['02:00', 20], ['03:00', 40],['04:00', 30], ['05:00', 10], ['06:00', 0], ['07:00', 30],['08:00', 30], ['09:00', 45], ['10:00', 25], ['11:00', 15],['12:00', 35]]},
	// 	]

	// 	publicStore._public.monitorData2 = [
	// 	  {name: '实时功率', data: [['00:00', 60], ['01:00', 30], ['02:00', 10], ['03:00', 30],['04:00', 50], ['05:00', 20], ['06:00', 25], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
	// 	  {name: '预测功率', data: [['00:00', 50], ['01:00', 40], ['02:00', 20], ['03:00', 40],['04:00', 30], ['05:00', 10], ['06:00', 0], ['07:00', 30],['08:00', 30], ['09:00', 45], ['10:00', 25], ['11:00', 15],['12:00', 35]]},
	// 	]

	// 	publicStore._public.mainList = [
	// 		{name: '1###', id: '123456', run: '1', area: '某某1区', user_name: '张三', load_type: '电源类型', address: 'xxxxxxx', capacity: 100, rated: 64, out: 62, soc: '40%', }, 
	// 		{name: '2###', id: '123456', run: '2', area: '某某2区', user_name: '张三', load_type: '电源类型', address: 'xxxxxxx', capacity: 100, rated: 64, out: 62, soc: '40%', },
	// 		{name: '3###', id: '123456', run: '1', area: '某某3区', user_name: '张三', load_type: '电源类型', address: 'xxxxxxx', capacity: 100, rated: 64, out: 62, soc: '40%', },
	// 		{name: '4###', id: '123456', run: '1', area: '某某4区', user_name: '张三', load_type: '电源类型', address: 'xxxxxxx', capacity: 100, rated: 64, out: 62, soc: '40%', },
	// 		{name: '5###', id: '123456', run: '1', area: '某某5区', user_name: '张三', load_type: '电源类型', address: 'xxxxxxx', capacity: 100, rated: 64, out: 62, soc: '40%', },
	// 		{name: '6###', id: '123456', run: '1', area: '某某6区', user_name: '张三', load_type: '电源类型', address: 'xxxxxxx', capacity: 100, rated: 64, out: 62, soc: '40%', },
	// 	]
	// }

		const init = async() => {
			publicStore._public.loadRateData = [
							{value: 20, name: '负载率', rate: '0.5', key: 'count_ABCD'},
			]
			
			publicStore._public.controlData = [
					{name: '总负荷出力', data: [['00:00', 60], ['02:00', 30], ['04:00', 10], ['06:00', 30],['08:00', 50], ['10:00', 20], ['12:00', 25], ['14:00', 30],['16:00', 50], ['18:00', 40], ['20:00', 35], ['22:00', 50],['23:00', 45]]}, 
			]

			publicStore._public.mainData = [
							{name: '1###', id: '123456', run: '1', area: '某某1区', attr: '电力辅助服务', capacity: 100, rated: 64, out: 62.3, soc: '41%', car_id: '粤CD25480', car_type: '比亚迪', start_time: '2024-07-10 20:00:00', end_time: '2024-07-10 23:00:00'}, 
							{name: '2###', id: '123456', run: '2', area: '某某2区', attr: '电力辅助服务', capacity: 100, rated: 64, out: 62.2, soc: '42%', car_id: '粤CDD4241', car_type: '比亚迪', start_time: '2024-07-10 20:00:00', end_time: '2024-07-10 23:00:00'},
							{name: '3###', id: '123456', run: '1', area: '某某3区', attr: '电力辅助服务', capacity: 100, rated: 64, out: 62.4, soc: '45%', car_id: '粤CDF454D', car_type: '特斯拉', start_time: '2024-07-10 20:00:00', end_time: '2024-07-10 23:00:00'},
							{name: '4###', id: '123456', run: '1', area: '某某4区', attr: '电力辅助服务', capacity: 100, rated: 64, out: 62.6, soc: '40%', car_id: '粤CD84576', car_type: '特斯拉', start_time: '2024-07-10 20:00:00', end_time: '2024-07-10 23:00:00'},
			]

			publicStore._public.monitorData = [
				{name: '日功率预测上限', data: [['00:00', 60], ['02:00', 30], ['04:00', 10], ['06:00', 30],['08:00', 50], ['10:00', 20], ['12:00', 25], ['14:00', 30],['16:00', 50], ['18:00', 40], ['20:00', 35], ['22:00', 50],['23:00', 45]]}, 
				{name: '日功率预测下限', data: [['00:00', 50], ['02:00', 40], ['04:00', 20], ['06:00', 40],['08:00', 30], ['10:00', 10], ['12:00', 0], ['14:00', 30],['16:00', 30], ['18:00', 45], ['20:00', 25], ['22:00', 15],['23:00', 35]]},
			]

			publicStore._public.monitorData2 = [
				{name: '实时功率', data: [['00:00', 10], ['02:00', 30], ['04:00', 15], ['06:00', 50],['08:00', 50], ['10:00', 20], ['12:00', 15], ['14:00', 30],['16:00', 10], ['18:00', 40], ['20:00', 15], ['22:00', 30],['23:00', 25]]}, 
				{name: '预测功率', data: [['00:00', 40], ['02:00', 40], ['04:00', 29], ['06:00', 10],['08:00', 30], ['10:00', 10], ['12:00', 20], ['14:00', 30],['16:00', 40], ['18:00', 45], ['20:00', 25], ['22:00', 25],['23:00', 35]]},
			]

			publicStore._public.mainList = [
							{name: '1###', id: '123456', run: '1', area: '某某1区', user_name: '张三', load_type: '电源类型', address: 'xxxxxxx', capacity: 100, rated: 64, out: 62, soc: '40%', }, 
							{name: '2###', id: '123456', run: '2', area: '某某2区', user_name: '李四', load_type: '电源类型', address: 'xxxxxxx', capacity: 100, rated: 64, out: 62, soc: '40%', },
							{name: '3###', id: '123456', run: '1', area: '某某3区', user_name: '王五', load_type: '电源类型', address: 'xxxxxxx', capacity: 100, rated: 64, out: 62, soc: '40%', },
							{name: '4###', id: '123456', run: '1', area: '某某4区', user_name: '张二', load_type: '电源类型', address: 'xxxxxxx', capacity: 100, rated: 64, out: 62, soc: '40%', },
							{name: '5###', id: '123456', run: '1', area: '某某5区', user_name: '小张', load_type: '电源类型', address: 'xxxxxxx', capacity: 100, rated: 64, out: 62, soc: '40%', },
							{name: '6###', id: '123456', run: '1', area: '某某6区', user_name: '张张', load_type: '电源类型', address: 'xxxxxxx', capacity: 100, rated: 64, out: 62, soc: '40%', },
			]
		}

	const setInit = async() => {

	}
</script>

<style lang="scss">
 
</style>
