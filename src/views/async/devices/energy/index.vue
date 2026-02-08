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
    // publicStore._public.usageData = [
    //   {name: '充电桩1#', value: 25, color: '#54CFF3', rate: '25%', key: 'count_A'},
    //   {name: '充电桩2#', value: 25, color: '#3E6AE3', rate: '25%', key: 'count_B'},
    //   {name: '充电桩3#', value: 25, color: '#F9B74A', rate: '25%', key: 'count_C'},
    //   {name: '充电桩4#', value: 25, color: '#F45C5C', rate: '25%', key: 'count_D'},
    // ]

    publicStore._public.rangeData = [
      {name: '储能电站SOC', data: [['00:00', 80], ['00:30', 80], ['01:00', 80], ['01:30', 80],['02:00', 80], ['02:30', 80], ['03:00', 80], ['03:30', 80],['04:00', 80], ['04:30', 80], ['05:00', 80], ['05:30', 80],['06:00', 75], ['06:30', 70], ['07:00', 65], ['07:30', 60],['08:00', 55], ['08:30', 50], ['09:00', 45], ['09:30', 40],['10:00', 35], ['10:30', 30], ['11:00', 25], ['11:30', 20],['12:00', 15], ['12:30', 20], ['13:00', 25], ['13:30', 30],['14:00', 35], ['14:30', 40], ['15:00', 45], ['15:30', 50],['16:00', 55], ['16:30', 60], ['17:00', 65], ['17:30', 70],['18:00', 75], ['18:30', 80], ['19:00', 80], ['19:30', 80],['20:00', 80], ['20:30', 80], ['21:00', 80], ['21:30', 80],['22:00', 80], ['22:30', 80], ['23:00', 80], ['23:30', 80]]}, 
    ]

    publicStore._public.mainData = [
      {name: '储能机设备1', id: '10', run: '1', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤CD5824D', car_type: '比亚迪', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'}, 
      {name: '储能机设备2', id: '20', run: '2', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤CD223ER', car_type: '特斯拉', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
      {name: '储能机设备3', id: '30', run: '1', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤CF25465', car_type: '比亚迪', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
      {name: '储能机设备4', id: '40', run: '1', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤CD84D51', car_type: '小鹏', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
    ]

    publicStore._public.loadData = [
      {name: '负荷功率', data: [['00:00', 4.5], ['02:00', 2.4], ['04:00', 1.6], ['06:00', 3.6],['08:00', 4.6], ['10:00', 12.3], ['12:00', 10.5], ['14:00', 12.6],['16:00', 11.3], ['18:00', 8.6], ['20:00', 9.5], ['22:00',5.6 ],['23:00', 3.4]]}, 
    ]

    publicStore._public.mouthData = [
      {name: '日充电量', data: [['7-01', 10], ['7-02', 20], ['7-03', 20], ['7-04', 40],['7-05', 40], ['7-06', 10], ['7-07', 15], ['7-08', 30],['7-09', 50], ['7-10', 40], ['7-11', 35], ['7-12', 50],['7-13', 45]]}, 
      {name: '日放电量', data: [['7-01', 10], ['7-02', 20], ['7-03', 20], ['7-04', 40],['7-05', 40], ['7-06', 10], ['7-07', 15], ['7-08', 30],['7-09', 50], ['7-10', 40], ['7-11', 35], ['7-12', 50],['7-13', 45]]},
    ]

    publicStore._public.electricData = [
      {name: '充电量', data: [['00:00', -29.5], ['02:00', -29.5], ['04:00', -29.5], ['06:00', -29.5],['08:00', 0], ['10:00', 0], ['12:00', -98], ['14:00', -98],['16:00', 0], ['18:00', 0], ['20:00', -29.5], ['22:00', -29.5],['23:00', -29.5]]}, 
      {name: '放电量', data: [['00:00', 0], ['02:00', 0], ['04:00', 0], ['06:00', 0],['08:00', 103], ['10:00', 103], ['12:00', 0], ['14:00', 0], ['16:00', 50.5], ['18:00', 50.5], ['20:00', 0], ['22:00', 0], ['23:00', 0]]},
    ]
  }

	const setInit = async() => {

	}
</script>

<style lang="scss">
 
</style>
