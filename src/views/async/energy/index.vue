<template>
  <div class="layout-row plr15 pb15">
    <div class="layout-col flex3">
      <l1 class="flex1 mb15" />
      <l2 class="flex1 mb15" />
      <l3 class="flex1" />
    </div>
    <div class="layout-col flex5 mlr15">
      <c1 class="flex1 mb15" />
      <c2 class="flex2" />
    </div>
    <div class="layout-col flex3">
      <r1 class="flex1 mb15" />
      <r2 class="flex1 mb15" />
      <r3 class="flex1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
	import l1 from '@/views/async/energy/l1'
	import l2 from '@/views/async/energy/l2'
	import l3 from '@/views/async/energy/l3'
	import c1 from '@/views/async/energy/c1'
	import c2 from '@/views/async/energy/c2'
	import r1 from '@/views/async/energy/r1'
	import r2 from '@/views/async/energy/r2'
	import r3 from '@/views/async/energy/r3'
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
  //   publicStore._public.usageData = [
  //     {name: '充电桩1#', value: 25, color: '#54CFF3', rate: '25%', key: 'count_A'},
  //     {name: '充电桩2#', value: 25, color: '#3E6AE3', rate: '25%', key: 'count_B'},
  //     {name: '充电桩3#', value: 25, color: '#F9B74A', rate: '25%', key: 'count_C'},
  //     {name: '充电桩4#', value: 25, color: '#F45C5C', rate: '25%', key: 'count_D'},
  //   ]

  //   publicStore._public.rangeData = [
  //     {name: '可调上限', data: [['00:00', 60], ['01:00', 30], ['02:00', 10], ['03:00', 30],['04:00', 50], ['05:00', 20], ['06:00', 25], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
  //     {name: '可调下限', data: [['00:00', 50], ['01:00', 40], ['02:00', 20], ['03:00', 40],['04:00', 30], ['05:00', 10], ['06:00', 0], ['07:00', 30],['08:00', 30], ['09:00', 45], ['10:00', 25], ['11:00', 15],['12:00', 35]]},
  //     {name: '实时功率', data: [['00:00', 100], ['01:00', 50], ['02:00', 80], ['03:00', 90],['04:00', 20], ['05:00', 10], ['06:00', 0], ['07:00', 20],['08:00', 50], ['09:00', 65], ['10:00', 75], ['11:00', 15],['12:00', 55]]},
  //   ]

  //   publicStore._public.mainData = [
  //     {name: '储能机设备1', id: '10', run: '1', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤C88888', car_type: '大奔BBBB', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'}, 
  //     {name: '储能机设备2', id: '20', run: '2', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤C88888', car_type: '大奔BBBB', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
  //     {name: '储能机设备3', id: '30', run: '1', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤C88888', car_type: '大奔BBBB', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
  //     {name: '储能机设备4', id: '40', run: '1', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤C88888', car_type: '大奔BBBB', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
  //   ]

  //   publicStore._public.loadData = [
  //     {name: '', data: [['00:00', 10], ['01:00', 20], ['02:00', 20], ['03:00', 40],['04:00', 40], ['05:00', 10], ['06:00', 15], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
  //   ]

  //   publicStore._public.mouthData = [
  //     {name: '', data: [['7-01', 10], ['7-02', 20], ['7-03', 20], ['7-04', 40],['7-05', 40], ['7-06', 10], ['7-07', 15], ['7-08', 30],['7-09', 50], ['7-10', 40], ['7-11', 35], ['7-12', 50],['7-13', 45]]}, 
  //     {name: '', data: [['7-01', 10], ['7-02', 20], ['7-03', 20], ['7-04', 40],['7-05', 40], ['7-06', 10], ['7-07', 15], ['7-08', 30],['7-09', 50], ['7-10', 40], ['7-11', 35], ['7-12', 50],['7-13', 45]]},
  //   ]

  //   publicStore._public.electricData = [
  //     {name: '充电量', data: [['00:00', 60], ['01:00', 30], ['02:00', 10], ['03:00', 30],['04:00', 50], ['05:00', 20], ['06:00', 25], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
  //     {name: '放电量', data: [['00:00', 50], ['01:00', 40], ['02:00', 20], ['03:00', 40],['04:00', 30], ['05:00', 10], ['06:00', 0], ['07:00', 30],['08:00', 30], ['09:00', 45], ['10:00', 25], ['11:00', 15],['12:00', 35]]},
  //   ]
	// }

  const init = async() => {
    publicStore._public.usageData = [
      {name: '充电桩1#', value: 25, color: '#54CFF3', rate: '25%', key: 'count_A'},
      {name: '充电桩2#', value: 25, color: '#3E6AE3', rate: '25%', key: 'count_B'},
      {name: '充电桩3#', value: 25, color: '#F9B74A', rate: '25%', key: 'count_C'},
      {name: '充电桩4#', value: 25, color: '#F45C5C', rate: '25%', key: 'count_D'},
    ]

    publicStore._public.rangeData = [
      {name: '可调上限', data: [['00:00', 60], ['02:00', 30], ['04:00', 10], ['06:00', 30],['08:00', 50], ['10:00', 20], ['12:00', 25], ['14:00', 30],['16:00', 50], ['18:00', 40], ['20:00', 35], ['22:00', 50],['23:00', 45]]}, 
      {name: '可调下限', data: [['00:00', 50], ['02:00', 40], ['04:00', 20], ['06:00', 40],['08:00', 30], ['10:00', 10], ['12:00', 0], ['14:00', 30],['16:00', 30], ['18:00', 45], ['20:00', 25], ['22:00', 15],['23:00', 35]]},
      {name: '实时功率', data: [['00:00', 100], ['02:00', 50], ['04:00', 80], ['06:00', 90],['08:00', 20], ['10:00', 10], ['12:00', 0], ['14:00', 20],['16:00', 50], ['18:00', 65], ['20:00', 75], ['22:00', 15],['23:00', 55]]},
    ]

    publicStore._public.mainData = [
      {name: '储能机设备1', id: '10', run: '1', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤CD5824D', car_type: '比亚迪', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'}, 
      {name: '储能机设备2', id: '20', run: '2', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤CD223ER', car_type: '特斯拉', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
      {name: '储能机设备3', id: '30', run: '1', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤CF25465', car_type: '比亚迪', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
      {name: '储能机设备4', id: '40', run: '1', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤CD84D51', car_type: '小鹏', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
    ]

    publicStore._public.loadData = [
      {name: '', data: [['00:00', 10], ['02:00', 20], ['04:00', 20], ['06:00', 40],['08:00', 40], ['10:00', 10], ['12:00', 15], ['14:00', 30],['16:00', 50], ['18:00', 40], ['20:00', 35], ['22:00', 50],['23:00', 45]]}, 
    ]

    publicStore._public.mouthData = [
      {name: '', data: [['7-01', 10], ['7-02', 20], ['7-03', 20], ['7-04', 40],['7-05', 40], ['7-06', 10], ['7-07', 15], ['7-08', 30],['7-09', 50], ['7-10', 40], ['7-11', 35], ['7-12', 50],['7-13', 45]]}, 
      {name: '', data: [['7-01', 10], ['7-02', 20], ['7-03', 20], ['7-04', 40],['7-05', 40], ['7-06', 10], ['7-07', 15], ['7-08', 30],['7-09', 50], ['7-10', 40], ['7-11', 35], ['7-12', 50],['7-13', 45]]},
    ]

    publicStore._public.electricData = [
      {name: '充电量', data: [['00:00', 60], ['02:00', 30], ['04:00', 10], ['06:00', 30],['08:00', 50], ['10:00', 20], ['12:00', 25], ['14:00', 30],['16:00', 50], ['18:00', 40], ['20:00', 35], ['22:00', 50],['23:00', 45]]}, 
      {name: '放电量', data: [['00:00', 50], ['02:00', 40], ['04:00', 20], ['06:00', 40],['08:00', 30], ['10:00', 10], ['12:00', 0], ['14:00', 30],['16:00', 30], ['18:00', 45], ['20:00', 25], ['22:00', 15],['23:00', 35]]},
    ]
  }

	const setInit = async() => {

	}
</script>

<style lang="scss">
 
</style>
