<template>
  <div class="layout-row plr15 pb15">
    <div class="layout-col flex3">
      <l1 class="flex2 mb15" />
      <l2 class="flex1" />
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
	import l1 from '@/views/async/control/l1'
	import l2 from '@/views/async/control/l2'
	import c1 from '@/views/async/control/c1'
	import c2 from '@/views/async/control/c2'
	import r1 from '@/views/async/control/r1'
	import r2 from '@/views/async/control/r2'
	import r3 from '@/views/async/control/r3'
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
  //   publicStore._public.wdData = [
  //     {name: '', data: [['00:00', 10], ['01:00', 20], ['02:00', 20], ['03:00', 40],['04:00', 40], ['05:00', 10], ['06:00', 15], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
  //   ]

  //   publicStore._public.loadData3 = [
  //     {name: '', data: [['00:00', 10], ['01:00', 20], ['02:00', 20], ['03:00', 40],['04:00', 40], ['05:00', 10], ['06:00', 15], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
  //   ]

  //   publicStore._public.rangeData = [
  //     {name: '可调上限', data: [['00:00', 60], ['01:00', 30], ['02:00', 10], ['03:00', 30],['04:00', 50], ['05:00', 20], ['06:00', 25], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
  //     {name: '可调下限', data: [['00:00', 50], ['01:00', 40], ['02:00', 20], ['03:00', 40],['04:00', 30], ['05:00', 10], ['06:00', 0], ['07:00', 30],['08:00', 30], ['09:00', 45], ['10:00', 25], ['11:00', 15],['12:00', 35]]},
  //     {name: '实时功率', data: [['00:00', 100], ['01:00', 50], ['02:00', 80], ['03:00', 90],['04:00', 20], ['05:00', 10], ['06:00', 0], ['07:00', 20],['08:00', 50], ['09:00', 65], ['10:00', 75], ['11:00', 15],['12:00', 55]]},
  //   ]

  //   publicStore._public.mainData = [
  //     {name: '制冷机1#', id: '123456', run: '1', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤C88888', car_type: '大奔BBBB', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'}, 
  //     {name: '制冷机2#', id: '123456', run: '2', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤C88888', car_type: '大奔BBBB', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
  //     {name: '制冷机3#', id: '123456', run: '1', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤C88888', car_type: '大奔BBBB', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
  //     {name: '制冷机4#', id: '123456', run: '1', capacity: 100, rated: 64, out: 62, soc: '40%', car_id: '粤C88888', car_type: '大奔BBBB', start_time: '2024-07-10 10:00:00', end_time: '2024-07-10 12:00:00'},
  //   ]

  //   publicStore._public.energyData1 = [
  //     {name: '', data: [['00:00', 10], ['01:00', 20], ['02:00', 20], ['03:00', 40],['04:00', 40], ['05:00', 10], ['06:00', 15], ['07:00', 30],['08:00', 50], ['09:00', 40], ['10:00', 35], ['11:00', 50],['12:00', 45]]}, 
  //   ]
  //   publicStore._public.energyData2 = [
  //     {name: '', data: [['00:00', 50], ['01:00', 40], ['02:00', 20], ['03:00', 40],['04:00', 30], ['05:00', 10], ['06:00', 0], ['07:00', 30],['08:00', 30], ['09:00', 45], ['10:00', 25], ['11:00', 15],['12:00', 35]]},
  //   ]
  //   publicStore._public.energyData3 = [
  //     {name: '', data: [['00:00', 60], ['01:00', 50], ['02:00', 30], ['03:00', 30],['04:00', 20], ['05:00', 20], ['06:00', 10], ['07:00', 20],['08:00', 50], ['09:00', 35], ['10:00', 15], ['11:00', 15],['12:00', 25]]},
  //   ]
	// }

  const init = async() => {
    publicStore._public.wdData = [
      {name: '', data: [['00:00', 12], ['02:00', 18], ['04:00', 14], ['06:00', 20],['08:00', 4], ['10:00', 20], ['12:00', 15], ['14:00', 10],['16:00', 50], ['18:00', 20], ['20:00', 45], ['22:00', 40],['23:00', 15]]}, 
    ]

    publicStore._public.loadData3 = [
      {name: '', data: [['00:00', 20], ['02:00', 20], ['04:00', 40], ['06:00', 30],['08:00', 40], ['10:00', 10], ['12:00', 25], ['14:00', 30],['16:00', 10], ['18:00', 30], ['20:00', 35], ['22:00', 30],['23:00', 45]]}, 
    ]

    publicStore._public.rangeData = [
      {name: '可调上限', data: [['00:00', 60], ['02:00', 30], ['04:00', 10], ['06:00', 30],['08:00', 50], ['10:00', 20], ['12:00', 25], ['14:00', 30],['16:00', 50], ['18:00', 40], ['20:00', 35], ['22:00', 50],['23:00', 45]]}, 
      {name: '可调下限', data: [['00:00', 50], ['02:00', 40], ['04:00', 20], ['06:00', 40],['08:00', 30], ['10:00', 10], ['12:00', 0], ['14:00', 30],['16:00', 30], ['18:00', 45], ['20:00', 25], ['22:00', 15],['23:00', 35]]},
      {name: '实时功率', data: [['00:00', 100], ['02:00', 50], ['04:00', 80], ['06:00', 90],['08:00', 20], ['10:00', 10], ['12:00', 0], ['14:00', 20],['16:00', 50], ['18:00', 65], ['20:00', 75], ['22:00', 15],['23:00', 55]]},
    ]

    publicStore._public.mainData = [
      {name: '制冷机1#', id: '123456', run: '1', capacity: 100, rated: 64, out: 62, soc: '41%', car_id: '粤CD12343', car_type: '比亚迪', start_time: '2024-07-10 20:00:00', end_time: '2024-07-10 23:00:00'}, 
      {name: '制冷机2#', id: '123456', run: '2', capacity: 100, rated: 65, out: 61, soc: '43%', car_id: '粤CD4F5T5', car_type: '特斯拉', start_time: '2024-07-10 20:00:00', end_time: '2024-07-10 24:00:00'},
      {name: '制冷机3#', id: '123456', run: '1', capacity: 100, rated: 62, out: 62, soc: '42%', car_id: '粤CF534SS', car_type: '长安', start_time: '2024-07-10 20:00:00', end_time: '2024-07-10 23:32:00'},
      {name: '制冷机4#', id: '123456', run: '1', capacity: 100, rated: 64, out: 60, soc: '39%', car_id: '粤CDFF123', car_type: '吉利', start_time: '2024-07-10 20:00:00', end_time: '2024-07-10 22:55:00'},
    ]

    publicStore._public.energyData1 = [
      {name: '', data: [['00:00', 10], ['02:00', 20], ['04:00', 20], ['06:00', 40],['08:00', 40], ['10:00', 10], ['12:00', 15], ['14:00', 30],['16:00', 50], ['18:00', 40], ['20:00', 35], ['22:00', 50],['23:00', 45]]}, 
    ]
    publicStore._public.energyData2 = [
      {name: '', data: [['00:00', 50], ['02:00', 40], ['04:00', 20], ['06:00', 40],['08:00', 30], ['10:00', 10], ['12:00', 0], ['14:00', 30],['16:00', 30], ['18:00', 45], ['20:00', 25], ['22:00', 15],['23:00', 35]]},
    ]
    publicStore._public.energyData3 = [
      {name: '', data: [['00:00', 60], ['02:00', 50], ['04:00', 30], ['06:00', 30],['08:00', 20], ['10:00', 20], ['12:00', 10], ['14:00', 20],['16:00', 50], ['18:00', 35], ['20:00', 15], ['22:00', 15],['23:00', 25]]},
    ]
  }

	const setInit = async() => {

	}
</script>

<style lang="scss">
 
</style>
