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
	import l1 from './l1'
	import l2 from './l2'
	import l3 from './l3'
	import c1 from './c1'
	import c2 from './c2'
	import r1 from './r1'
	import r2 from './r2'
	import r3 from './r3'
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
    // publicStore._public.loadData2 = [
    //   {name: '', data: [['00:00', 10], ['02:00', 20], ['04:00', 20], ['06:00', 40],['08:00', 40], ['10:00', 10], ['12:00', 15], ['14:00', 30],['16:00', 50], ['18:00', 40], ['20:00', 35], ['22:00', 50],['24:00', 45]]}, 
    // ]
    publicStore._public.loadData2 = [
      {name: '总负荷', data: [['00:00', 50.5], ['02:00', 50.5], ['04:00', 50.5], ['06:00', 50.5], ['08:00', 57], ['10:00', 57], ['12:00', 22], ['14:00', 22], ['16:00', 129.5], ['18:00', 129.5], ['20:00', 70.5], ['22:00', 70.5], ['24:00', 70.5]]},
    ]

    publicStore._public.mouthData2 = [
      // {name: '计划充电量', data: [['7-01', 10], ['7-02', 20], ['7-03', 20], ['7-04', 40],['7-05', 40], ['7-06', 10], ['7-07', 15], ['7-08', 30],['7-09', 50], ['7-10', 40], ['7-11', 35], ['7-12', 50],['7-13', 45]]}, 
      {name: '实际充电量', data: [['7-01', 10], ['7-02', 20], ['7-03', 20], ['7-04', 40],['7-05', 40], ['7-06', 10], ['7-07', 15], ['7-08', 30],['7-09', 50], ['7-10', 40], ['7-11', 35], ['7-12', 50],['7-13', 45]]},
    ]

    publicStore._public.fcstData = [
      {name: '充电功率预测', data: [['00:00', 29.5], ['02:00', 29.5], ['04:00', 29.5], ['06:00', 29.5],['08:00', 0], ['10:00', 0], ['12:00', 98], ['14:00', 98], ['16:00', 0], ['18:00', 0], ['20:00', 29.5], ['22:00', 29.5],  ['24:00', 29.5]]}, 
    ]

    publicStore._public.realData = [
      {name: '充电功率实时监测', data: [['00:00', 29.3], ['02:00', 29.7], ['04:00', 29.5], ['06:00', 29.1],['08:00', 0], ['10:00', 0], ['12:00', 97.5], ['14:00', 98.5], ['16:00', 0], ['18:00', 0], ['20:00', 29.5], ['22:00', 29.1],  ['24:00', 29.7]]}, 
    ]

    publicStore._public.usageData = [
      {name: '充电桩1#', value: 25, color: '#54CFF3', rate: '15%', key: 'count_A'},
      {name: '充电桩2#', value: 25, color: '#3E6AE3', rate: '22%', key: 'count_B'},
      {name: '充电桩3#', value: 25, color: '#F9B74A', rate: '21%', key: 'count_C'},
      {name: '充电桩4#', value: 25, color: '#F45C5C', rate: '18%', key: 'count_D'},
    ]

    publicStore._public.rangeData = [
      {name: '可调上限', data: [['00:00', 60], ['02:00', 30], ['04:00', 10], ['06:00', 30],['08:00', 50], ['10:00', 20], ['12:00', 25], ['14:00', 30],['16:00', 50], ['18:00', 40], ['20:00', 35], ['22:00', 50],['24:00', 45]]}, 
      {name: '可调下限', data: [['00:00', 50], ['02:00', 40], ['04:00', 20], ['06:00', 40],['08:00', 30], ['10:00', 10], ['12:00', 0], ['14:00', 30],['16:00', 30], ['18:00', 45], ['20:00', 25], ['22:00', 15],['24:00', 35]]},
      {name: '实时功率', data: [['00:00', 100], ['02:00', 50], ['04:00', 80], ['06:00', 90],['08:00', 20], ['10:00', 10], ['12:00', 0], ['14:00', 20],['16:00', 50], ['18:00', 65], ['20:00', 75], ['22:00', 15],['24:00', 55]]},
    ]

    publicStore._public.mainData = [
      {name: '储能机设备1#', id: '1', run: '1', capacity: 100, rated: 62, out: 45, soc: '20%', car_id: '粤C87854', car_type: '大奔B5234', start_time: '2024-07-10 10:00:00', end_time: '2024-07-11 12:00:00'}, 
      {name: '储能机设备2#', id: '2', run: '2', capacity: 100, rated: 61, out: 53, soc: '25%', car_id: '粤C88521', car_type: '大奔B4682', start_time: '2024-07-11 10:00:00', end_time: '2024-07-12 12:00:00'},
      {name: '储能机设备3#', id: '3', run: '1', capacity: 100, rated: 63, out: 42, soc: '30%', car_id: '粤C83652', car_type: '大奔B8621', start_time: '2024-07-12 10:00:00', end_time: '2024-07-13 12:00:00'},
      {name: '储能机设备4#', id: '4', run: '1', capacity: 100, rated: 64, out: 56, soc: '40%', car_id: '粤C89542', car_type: '大奔B4853', start_time: '2024-07-13 10:00:00', end_time: '2024-07-14 12:00:00'},
   ]
	}

	const setInit = async() => {

	}
</script>

<style lang="scss">
 
</style>
